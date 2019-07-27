/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/blocks/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/e-accordion/elements/short.js":
/*!**************************************************!*\
  !*** ./src/blocks/e-accordion/elements/short.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n    if (!document || !document.body) {\r\n        return;\r\n    }\r\n    document.body.addEventListener('click', function (e) {\r\n        let {target} = e;\r\n\r\n        while (target !== this) {\r\n            if (target.classList.contains('e-accordion__short')) {\r\n                let parent = target.closest('.e-accordion');\r\n                parent.querySelectorAll('.e-accordion__more').forEach((node) => {\r\n                    node.classList.toggle('history__hide');\r\n                    node.classList.toggle('history__show');\r\n                });\r\n                break;\r\n            }\r\n            target = target.parentNode;\r\n        }\r\n    })\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/blocks/e-accordion/elements/short.js?");

/***/ }),

/***/ "./src/blocks/onoffswitch/onoffswitch.js":
/*!***********************************************!*\
  !*** ./src/blocks/onoffswitch/onoffswitch.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n    if (!document || !document.body) {\r\n        return;\r\n    }\r\n    const themeClasses = [\r\n        'theme_color_project-default',\r\n        'theme_color_project-brand',\r\n        'theme_color_project-inverse',\r\n        'theme_color_project-warning',\r\n        'theme_color_megafon-brand',\r\n    ];\r\n\r\n    document.body.addEventListener('click', function (e) {\r\n        let {target} = e;\r\n\r\n        while (target !== this) {\r\n            if (target.classList.contains('onoffswitch')) {\r\n                let classList = target.querySelector('.onoffswitch__button').classList;\r\n                classList.toggle('onoffswitch__button_status_on');\r\n                classList.toggle('onoffswitch__button_status_off');\r\n\r\n                let theme = target.closest('.theme');\r\n                toggleTheme(theme);\r\n\r\n                break;\r\n            }\r\n            target = target.parentNode;\r\n        }\r\n    });\r\n\r\n    /**\r\n     * @param {Element} theme\r\n     */\r\n    function toggleTheme(theme) {\r\n        const currentThemeIndex = getCurrentIndexTheme(theme);\r\n        theme.classList.remove(themeClasses[currentThemeIndex]);\r\n        theme.classList.add(getNextTheme(currentThemeIndex));\r\n    }\r\n\r\n    /**\r\n     * @param {Element} theme\r\n     * @return {number}\r\n     */\r\n    let getCurrentIndexTheme = function (theme) {\r\n        let className = '';\r\n        theme.classList.forEach((item) => {\r\n            if (item.match(/^theme_color_[a-z0-9\\-]{1,}$/i)) {\r\n                className = item;\r\n            }\r\n        });\r\n        return themeClasses.indexOf(className);\r\n    };\r\n    /**\r\n     * @param {number} currentIndex\r\n     * @return {string}\r\n     */\r\n    let getNextTheme = function (currentIndex) {\r\n        currentIndex++;\r\n        if (currentIndex >= themeClasses.length) {\r\n            currentIndex = 0;\r\n        }\r\n        return themeClasses[currentIndex];\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/blocks/onoffswitch/onoffswitch.js?");

/***/ }),

/***/ "./src/blocks/script.js":
/*!******************************!*\
  !*** ./src/blocks/script.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./e-accordion/elements/short.js */ \"./src/blocks/e-accordion/elements/short.js\");\r\n__webpack_require__(/*! ./onoffswitch/onoffswitch.js */ \"./src/blocks/onoffswitch/onoffswitch.js\");\r\n\n\n//# sourceURL=webpack:///./src/blocks/script.js?");

/***/ })

/******/ });