import {
    createConnection,
    ProposedFeatures,
    TextDocuments,
    InitializeParams,
    TextDocument,
    Diagnostic,
    DiagnosticSeverity,
    DidChangeConfigurationParams
} from 'vscode-languageserver';

import {basename} from 'path';

import * as jsonToAst from 'json-to-ast';

import {makeLint, LinterProblem} from './linter';
import { ExampleConfiguration, Severity, RuleKeys } from './configuration';

const lint = require('yndx-shri-task_2');

let conn = createConnection(ProposedFeatures.all);
let docs = new TextDocuments();
let conf: ExampleConfiguration | undefined = undefined; 

const PROP_BLOCK = 'block';
const PROP_ELEM = 'elem';
const PROP_CONTENT = 'content';
const PROP_ELEMMODS = 'elemMods';
const PROP_MODS = 'mods';
const PROP_MIX = 'mix';
const PROPS_BEM = [PROP_BLOCK,PROP_ELEM,PROP_CONTENT,PROP_MODS,PROP_ELEMMODS,PROP_MIX];

conn.onInitialize((params: InitializeParams) => {
    return {
        capabilities: {
            textDocumentSync: docs.syncKind
        }
    };
});

conn.onDidChangeConfiguration(({ settings }: DidChangeConfigurationParams) => {
    conf = settings.example;
    validateAll();
});

function GetDiagnosticMessage(key: RuleKeys): string {
    switch (key) {
        case RuleKeys.UppercaseNamesIsForbidden:
            return 'Uppercase properties are forbidden!';
        case RuleKeys.BlockNameIsRequired:
            return 'Field named \'block\' is required!';
        default:
            return `Unknown problem type '${key}'`;
    }
}

function GetDiagnosticSeverity(key: RuleKeys): DiagnosticSeverity | undefined {
    if (!conf || !conf.severity) {
        return undefined;
    }

    const severity: Severity = conf.severity[key];

    switch (severity) {
        case Severity.Error:
            return DiagnosticSeverity.Error;
        case Severity.Warning:
            return DiagnosticSeverity.Warning;
        case Severity.Information:
            return DiagnosticSeverity.Information;
        case Severity.Hint:
            return DiagnosticSeverity.Hint;
        default:
            return undefined;
    }
}

async function validateAll() {
	for (const document of docs.all()) {
		await validateTextDocument(document);
	}
}

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
    const source = basename(textDocument.uri);
    const json = textDocument.getText();
    let diagnostics: Diagnostic[] = [];
    if (conf === undefined || conf.enable === false) {
        conn.sendDiagnostics({ uri: textDocument.uri, diagnostics });
        return;
    }
    
    diagnostics = lint(json).reduce((list: Diagnostic[], problem: LinterError):Diagnostic[]=>{
        list.push({
            range: {
                start: {
                    line: problem.location.start.line - 1,
                    character: problem.location.start.column - 1
                },
                end: {
                    line: problem.location.end.line - 1,
                    character: problem.location.end.column - 1
                },
            },
            severity: DiagnosticSeverity.Error,
            message: problem.error,
            source
        });
        return list;
    }, []);
    
    const validateProperty = (property: jsonToAst.AstProperty): LinterProblem<RuleKeys>[] =>
        /^[A-Z]+$/.test(property.key.value) 
            ? [{ key: RuleKeys.UppercaseNamesIsForbidden, loc: property.key.loc }] 
            : [];

    const validateObject = (obj: jsonToAst.AstObject): LinterProblem<RuleKeys>[] => {
        if (obj.children.length === 0 || 
            (obj.children.some(p => PROPS_BEM.indexOf(p.key.value) !== -1) && 
                !obj.children.some(p => p.key.value === PROP_BLOCK))
            ) {
            return [{ key: RuleKeys.BlockNameIsRequired, loc: obj.loc }];
        }
        return [];
    };
        
    diagnostics = makeLint(json, validateProperty, validateObject)
        .reduce((list: Diagnostic[], problem: LinterProblem<RuleKeys>): Diagnostic[] => {
            const severity = GetDiagnosticSeverity(problem.key);

            if (severity) {
                const message = GetDiagnosticMessage(problem.key);

                let diagnostic: Diagnostic = {
                    range: {
                        start: textDocument.positionAt(problem.loc.start.offset),
                        end: textDocument.positionAt(problem.loc.end.offset)
                    },
                    severity,
                    message,
                    source
                };

                list.push(diagnostic);
            }

            return list;
        }, diagnostics);
    
    conn.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

docs.onDidChangeContent(change => {
    validateTextDocument(change.document);
});

docs.listen(conn);
conn.listen();
