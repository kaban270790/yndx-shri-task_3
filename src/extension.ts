import { readFileSync, readFile } from 'fs';
import { join, resolve, basename } from 'path';
import { bemhtml } from 'bem-xjst';

import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
    SettingMonitor
} from 'vscode-languageclient';

const previewDir: string = resolve(__dirname, '../preview/');
const previewPath: string = resolve(previewDir, 'index.html');
const previewHtml: string = readFileSync(previewPath).toString();
const template = bemhtml.compile();

let client: LanguageClient;
const PANELS: Record<string, vscode.WebviewPanel> = {};

const createLanguageClient = (context: vscode.ExtensionContext): LanguageClient => {
    const serverModulePath = context.asAbsolutePath(join('out', 'server.js'));

    const serverOptions: ServerOptions = {
        run: {
            module: serverModulePath,
            transport: TransportKind.ipc
        },
        debug: {
            module: serverModulePath,
            transport: TransportKind.ipc,
            options: { execArgv: ['--nolazy', '--inspect=6009'] }
        }
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: 'json'
            }
        ],
        synchronize: {
            configurationSection: 'example'
        }
    };

    client = new LanguageClient(
        'languageServerExample',
        'Language Server Example',
        serverOptions,
        clientOptions
    );

    return client;
};

const setPreviewContent = (document: vscode.TextDocument, context: vscode.ExtensionContext) => {
    const panel = PANELS[document.uri.toString()];

    if (panel) {
        const mediaPath = vscode.Uri.file(previewDir).with({
            scheme: "vscode-resource"
        }).toString() + "/";//todo не нравится это добавление слеша, но без него не работает

        try {
            const json = document.getText();
            const data = JSON.parse(json);
            const html = template.apply(data);
            panel.webview.html = previewHtml
                .replace('{{content}}', html)
                .replace('{{mediaPath}}', mediaPath);
            
        } catch(e) {
            console.error(e);
        }
    }
};

const initPreviewPanel = (document: vscode.TextDocument) => {
    const fileName = basename(document.fileName);

    const panel = vscode.window.createWebviewPanel(
        'example.preview',
        `Preview: ${fileName}`,
        vscode.ViewColumn.Beside,
        {
            enableScripts: true
        }
    );

    PANELS[document.uri.toString()] = panel;

    const e = panel.onDidDispose(() => {
        delete PANELS[document.uri.toString()];
        e.dispose();
    });

    return panel;
};

const openPreview = (context: vscode.ExtensionContext) => {
    const editor = vscode.window.activeTextEditor;

    if (editor !== undefined) {
        const document: vscode.TextDocument = editor.document;

        const path = document.uri.toString();
        const panel = PANELS[path];

        if (panel) {
            panel.reveal();
        } else {
            const panel = initPreviewPanel(document);
            setPreviewContent(document, context);
            context.subscriptions.push(panel);
        }
    }
};

export function activate(context: vscode.ExtensionContext) {

    console.info('Congratulations, your extension is now active!');

    client = createLanguageClient(context);

    client.start();

    const eventChange: vscode.Disposable = vscode.workspace
        .onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => setPreviewContent(e.document, context));

    const previewCommand = vscode.commands.registerCommand('example.showPreviewToSide', () => openPreview(context));

    context.subscriptions.push(previewCommand, eventChange);
}

export function deactivate() {
    client.stop();
}
