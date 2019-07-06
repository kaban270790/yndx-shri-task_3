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

eval("(function () {\n  document.body.addEventListener('click', function (e) {\n    let {\n      target\n    } = e;\n\n    while (target !== this) {\n      if (target.classList.contains('e-accordion__short')) {\n        let parent = target.closest('.e-accordion');\n        parent.querySelectorAll('.e-accordion__more').forEach(node => {\n          node.classList.toggle('history__hide');\n          node.classList.toggle('history__show');\n        });\n        break;\n      }\n\n      target = target.parentNode;\n    }\n  });\n})();\n\n//# sourceURL=webpack:///./src/blocks/e-accordion/elements/short.js?");

/***/ }),

/***/ "./src/blocks/onoffswitch/onoffswitch.js":
/*!***********************************************!*\
  !*** ./src/blocks/onoffswitch/onoffswitch.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n  const themeClasses = ['theme_color_project-default', 'theme_color_project-brand', 'theme_color_project-inverse', 'theme_color_project-warning', 'theme_color_megafon-brand'];\n  document.body.addEventListener('click', function (e) {\n    let {\n      target\n    } = e;\n\n    while (target !== this) {\n      if (target.classList.contains('onoffswitch')) {\n        let classList = target.querySelector('.onoffswitch__switcher').classList;\n        classList.toggle('onoffswitch__switcher_status_on');\n        classList.toggle('onoffswitch__switcher_status_off');\n        let theme = target.closest('.theme');\n        toggleTheme(theme);\n        break;\n      }\n\n      target = target.parentNode;\n    }\n  });\n  /**\r\n   * @param {Element} theme\r\n   */\n\n  function toggleTheme(theme) {\n    const currentThemeIndex = getCurrentIndexTheme(theme);\n    theme.classList.remove(themeClasses[currentThemeIndex]);\n    theme.classList.add(getNextTheme(currentThemeIndex));\n  }\n  /**\r\n   * @param {Element} theme\r\n   * @return {number}\r\n   */\n\n\n  let getCurrentIndexTheme = function (theme) {\n    let className = '';\n    theme.classList.forEach(item => {\n      if (item.match(/^theme_color_[a-z0-9\\-]{1,}$/i)) {\n        className = item;\n      }\n    });\n    return themeClasses.indexOf(className);\n  };\n  /**\r\n   * @param {number} currentIndex\r\n   * @return {string}\r\n   */\n\n\n  let getNextTheme = function (currentIndex) {\n    currentIndex++;\n\n    if (currentIndex >= themeClasses.length) {\n      currentIndex = 0;\n    }\n\n    return themeClasses[currentIndex];\n  };\n})();\n\n//# sourceURL=webpack:///./src/blocks/onoffswitch/onoffswitch.js?");

/***/ }),

/***/ "./src/blocks/script.js":
/*!******************************!*\
  !*** ./src/blocks/script.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./e-accordion/elements/short.js */ \"./src/blocks/e-accordion/elements/short.js\");\n\n__webpack_require__(/*! ./onoffswitch/onoffswitch.js */ \"./src/blocks/onoffswitch/onoffswitch.js\");\n\n//# sourceURL=webpack:///./src/blocks/script.js?");

/***/ })

/******/ });