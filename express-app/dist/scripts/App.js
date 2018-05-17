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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/App.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/typings-for-css-modules-loader/lib/index.js??ref--6-1!./src/components/Icon/Icon.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/typings-for-css-modules-loader/lib??ref--6-1!./src/components/Icon/Icon.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ENDLESS ROTATE */\r\n.Icon__rotate--XRMe2{\r\n    animation: Icon__rotate--XRMe2 1.5s linear infinite; \r\n}\r\n@keyframes         Icon__rotate--XRMe2{ to{        transform: rotate(360deg); } }", ""]);

// exports
exports.locals = {
	"rotate": "Icon__rotate--XRMe2"
};

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const Todos_1 = __webpack_require__(/*! ./components/Todos */ "./src/components/Todos.tsx");
ReactDOM.render(React.createElement(Todos_1.default, null), document.getElementById('app'));

/***/ }),

/***/ "./src/components/AddTodo.tsx/AddTodo.tsx":
/*!************************************************!*\
  !*** ./src/components/AddTodo.tsx/AddTodo.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ListItem_1 = __webpack_require__(/*! ../ListItem */ "./src/components/ListItem/index.tsx");
const Button_1 = __webpack_require__(/*! ../Button */ "./src/components/Button/index.tsx");
const Icon_1 = __webpack_require__(/*! ../Icon */ "./src/components/Icon/index.tsx");
class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.toggleActive = active => {
            this.setState({ active });
        };
        this.onChange = caller => {
            this.props.onInputChange(caller.target.value);
        };
        this.onClick = () => {
            if (this.props.input.length > 0) {
                this.props.onClick();
            }
        };
        this.onEnter = obj => {
            if (obj.key === "Enter") {
                if (this.props.input.length > 0) {
                    this.props.onClick();
                }
            }
        };
        this.state = {
            active: false
        };
    }
    render() {
        let styles = {
            input: {
                outline: 'none',
                border: 'none',
                height: 'auto',
                width: '85%',
                fontSize: '20px',
                marginLeft: '10px',
                marginRight: '10px',
                background: '#eee'
            },
            icon: {
                display: 'inline-block',
                zIndex: 10
            }
        };
        return React.createElement(ListItem_1.default, { active: this.state.active }, React.createElement("span", null, React.createElement("input", { placeholder: "Enter a new todo...", style: Object.assign({}, styles.input), type: 'text', onFocus: () => this.toggleActive(true), onBlur: () => this.toggleActive(false), value: this.props.input, onChange: this.onChange, ref: this.props.reference, onKeyPress: this.onEnter })), React.createElement("span", { style: Object.assign({}, styles.icon) }, React.createElement(Button_1.IconButton, { onClick: this.onClick }, React.createElement(Icon_1.default, { icon: 'plus', size: 'small' }))));
    }
}
exports.default = AddTodo;

/***/ }),

/***/ "./src/components/AddTodo.tsx/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/AddTodo.tsx/index.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var AddTodo_1 = __webpack_require__(/*! ./AddTodo */ "./src/components/AddTodo.tsx/AddTodo.tsx");
exports.default = AddTodo_1.default;

/***/ }),

/***/ "./src/components/Button/Button.tsx":
/*!******************************************!*\
  !*** ./src/components/Button/Button.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Ripple_1 = __webpack_require__(/*! ../Ripple */ "./src/components/Ripple/index.tsx");
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = event => {
            this.setState({ active: false });
            this.props.onClick();
        };
        this.isHovering = hovering => {
            let active = this.state.active;
            if (!hovering) active = false;
            this.setState({ hovering, active });
        };
        this.isActive = active => {
            this.setState({ active });
        };
        this.renderChildren = () => {
            return React.Children.map(this.props.children, (child, index) => {
                if (child.type === undefined) {
                    // Text
                    return React.createElement(ButtonContent, null, child);
                } else {
                    if (child.type.name === 'Icon') {
                        return React.cloneElement(child, {
                            styles: {
                                root: {
                                    height: 17,
                                    position: 'relative',
                                    top: '1px'
                                }
                            }
                        });
                    }
                }
            });
        };
        this.state = {
            hovering: false,
            active: false
        };
    }
    render() {
        let defaultStyles = {
            root: {
                padding: '5px 10px',
                color: 'rgba(0,0,0,.6)',
                border: 'none',
                borderRadius: 2,
                background: '#F4F4F4',
                fontFamily: 'Arial',
                fontWeight: 700,
                position: 'relative',
                cursor: 'pointer',
                outline: 'none',
                margin: '5px 0px'
            },
            rootHovered: {
                background: '#EAEAEA'
            },
            rootActive: {
                background: '#C8C8C8'
            },
            rootPermActive: {
                background: '#002145',
                color: '#fff'
            }
        };
        let userStyles = this.props.styles !== undefined ? this.props.styles : {};
        //let styles:IButtonStyles = Object.assign({}, defaultStyles, userStyles);
        let styles = {
            root: Object.assign({}, defaultStyles.root, userStyles.root),
            rootHovered: Object.assign({}, defaultStyles.rootHovered, userStyles.rootHovered),
            rootActive: Object.assign({}, defaultStyles.rootActive, userStyles.rootActive),
            rootPermActive: Object.assign({}, defaultStyles.rootPermActive, userStyles.rootPermActive)
        };
        let rootHovered = this.state.hovering ? styles.rootHovered : {};
        let rootActive = this.state.active ? styles.rootActive : {};
        let rootPermActive = this.props.active ? styles.rootPermActive : {};
        return React.createElement("button", { type: "button", style: Object.assign({}, styles.root, rootHovered, rootActive, rootPermActive), onMouseEnter: () => this.isHovering(true), onMouseLeave: () => this.isHovering(false), onMouseDown: () => this.isActive(true), onMouseUp: this.onClick, ref: this.props.buttonRef }, this.props.children);
    }
}
exports.Button = Button;
function ButtonContent(props) {
    let contentStyle = {
        root: {
            position: 'relative',
            top: '-2',
            margin: '0px 5px 0px 5px',
            fontSize: '.8rem',
            fontWeight: 400
        }
    };
    return React.createElement("span", { style: contentStyle.root }, props.children);
}
exports.ButtonContent = ButtonContent;
function ActionButton(props) {
    const styles = {
        root: {
            background: 'transparent'
        },
        rootActive: {
            background: 'transparent',
            color: '#000'
        },
        rootHovered: {
            background: 'transparent',
            color: '#0078D4'
        }
    };
    return React.createElement(Button, { styles: styles, active: props.active, onClick: props.onClick }, props.children);
}
exports.ActionButton = ActionButton;
let iconButtonElement;
let iconButtonContainerElement;
class IconButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            this.props.onClick();
            this.doRipple(event);
        };
        this.doRipple = event => {
            this.setState({
                ripple: []
            }, () => {
                this.setState({
                    ripple: [{
                        left: this.state.position.x,
                        top: this.state.position.y
                    }]
                });
            });
        };
        this.setButtonContainerRef = element => {
            iconButtonContainerElement = element;
        };
        this.state = {
            position: {
                x: 0,
                y: 0
            },
            ripple: []
        };
    }
    componentDidMount() {
        let iconButtonPosition = { y: 0, x: 0, height: 0, width: 0 };
        let iconButtonContainerPosition = { y: 0, x: 0, height: 0, width: 0 };
        iconButtonPosition = iconButtonElement.getBoundingClientRect();
        iconButtonContainerPosition = iconButtonContainerElement.getBoundingClientRect();
        //console.log(iconButtonPosition.x-iconButtonContainerPosition.x)
        this.setState({
            position: {
                x: iconButtonPosition.x - iconButtonContainerPosition.x + iconButtonPosition.width / 2 - 1,
                y: iconButtonPosition.y - iconButtonContainerPosition.y + iconButtonPosition.height / 2
            }
        });
    }
    render() {
        const styles = {
            root: {
                background: 'transparent',
                fill: '#555'
            },
            rootActive: {
                background: 'transparent',
                fill: '#555'
            },
            rootHovered: {
                background: 'transparent',
                fill: '#0078D4'
            }
        };
        let Ripples = this.state.ripple.map(ripple => {
            return React.createElement(Ripple_1.default, { top: ripple.top, left: ripple.left, size: "small", onComplete: () => {}, color: "#aaa" });
        });
        return React.createElement("span", { style: { position: 'relative' }, ref: this.setButtonContainerRef }, React.createElement(Button, { styles: styles, active: this.props.active, onClick: this.onClick, buttonRef: el => iconButtonElement = el }, this.props.children), Ripples);
    }
}
exports.IconButton = IconButton;

/***/ }),

/***/ "./src/components/Button/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Button/index.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __webpack_require__(/*! ./Button */ "./src/components/Button/Button.tsx");
exports.Button = Button_1.Button;
exports.ButtonContent = Button_1.ButtonContent;
exports.ActionButton = Button_1.ActionButton;
exports.IconButton = Button_1.IconButton;

/***/ }),

/***/ "./src/components/DataConnection/DataConnection.tsx":
/*!**********************************************************!*\
  !*** ./src/components/DataConnection/DataConnection.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
function DataConnection() {
    return function DataConnectionParent(WrappedComponent) {
        return class SPConnectionWrapper extends React.Component {
            constructor(props) {
                super(props);
                this.getTodos = () => __awaiter(this, void 0, void 0, function* () {
                    let data = yield fetch('http://cawsp.com:3000/todos');
                    return data.json();
                });
                this.addTodo = newTodo => __awaiter(this, void 0, void 0, function* () {
                    let response = yield fetch('http://cawsp.com:3000/todos', {
                        body: JSON.stringify(newTodo),
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'POST',
                        mode: 'cors'
                    });
                    return response.json();
                });
                this.deleteTodo = todoId => {
                    let deleteIt = () => __awaiter(this, void 0, void 0, function* () {
                        return yield fetch('http://cawsp.com:3000/todos/' + todoId, {
                            headers: {
                                'content-type': 'application/json'
                            },
                            method: 'DELETE',
                            mode: 'cors'
                        });
                    });
                    return deleteIt();
                };
            }
            render() {
                return React.createElement(WrappedComponent, Object.assign({}, this.props, { get: this.getTodos, create: this.addTodo, delete: this.deleteTodo }));
            }
        };
    };
}
exports.default = DataConnection;

/***/ }),

/***/ "./src/components/DataConnection/index.tsx":
/*!*************************************************!*\
  !*** ./src/components/DataConnection/index.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var DataConnection_1 = __webpack_require__(/*! ./DataConnection */ "./src/components/DataConnection/DataConnection.tsx");
exports.default = DataConnection_1.default;

/***/ }),

/***/ "./src/components/Icon/Icon.css":
/*!**************************************!*\
  !*** ./src/components/Icon/Icon.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/typings-for-css-modules-loader/lib??ref--6-1!./Icon.css */ "./node_modules/typings-for-css-modules-loader/lib/index.js??ref--6-1!./src/components/Icon/Icon.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Icon/Icon.fn.tsx":
/*!*****************************************!*\
  !*** ./src/components/Icon/Icon.fn.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.Icons = {
    'plus-light': {
        svgCode: 'M436 238H242V44c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v194H12c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h194v194c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12V274h194c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z',
        viewBox: '0 0 448 512'
    },
    'plus': {
        svgCode: 'M436 228H252V44c0-6.6-5.4-12-12-12h-32c-6.6 0-12 5.4-12 12v184H12c-6.6 0-12 5.4-12 12v32c0 6.6 5.4 12 12 12h184v184c0 6.6 5.4 12 12 12h32c6.6 0 12-5.4 12-12V284h184c6.6 0 12-5.4 12-12v-32c0-6.6-5.4-12-12-12z',
        viewBox: '0 0 448 512'
    },
    'plus-solid': {
        svgCode: 'M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z',
        viewBox: '0 0 448 512'
    },
    'spinner': {
        svgCode: 'M288 32c0 17.673-14.327 32-32 32s-32-14.327-32-32 14.327-32 32-32 32 14.327 32 32zm-32 416c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm256-192c0-17.673-14.327-32-32-32s-32 14.327-32 32 14.327 32 32 32 32-14.327 32-32zm-448 0c0-17.673-14.327-32-32-32S0 238.327 0 256s14.327 32 32 32 32-14.327 32-32zm33.608 126.392c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm316.784 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zM97.608 65.608c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32z',
        viewBox: '0 0 512 512'
    },
    'cog': {
        svgCode: 'M482.696 299.276l-32.61-18.827a195.168 195.168 0 0 0 0-48.899l32.61-18.827c9.576-5.528 14.195-16.902 11.046-27.501-11.214-37.749-31.175-71.728-57.535-99.595-7.634-8.07-19.817-9.836-29.437-4.282l-32.562 18.798a194.125 194.125 0 0 0-42.339-24.48V38.049c0-11.13-7.652-20.804-18.484-23.367-37.644-8.909-77.118-8.91-114.77 0-10.831 2.563-18.484 12.236-18.484 23.367v37.614a194.101 194.101 0 0 0-42.339 24.48L105.23 81.345c-9.621-5.554-21.804-3.788-29.437 4.282-26.36 27.867-46.321 61.847-57.535 99.595-3.149 10.599 1.47 21.972 11.046 27.501l32.61 18.827a195.168 195.168 0 0 0 0 48.899l-32.61 18.827c-9.576 5.528-14.195 16.902-11.046 27.501 11.214 37.748 31.175 71.728 57.535 99.595 7.634 8.07 19.817 9.836 29.437 4.283l32.562-18.798a194.08 194.08 0 0 0 42.339 24.479v37.614c0 11.13 7.652 20.804 18.484 23.367 37.645 8.909 77.118 8.91 114.77 0 10.831-2.563 18.484-12.236 18.484-23.367v-37.614a194.138 194.138 0 0 0 42.339-24.479l32.562 18.798c9.62 5.554 21.803 3.788 29.437-4.283 26.36-27.867 46.321-61.847 57.535-99.595 3.149-10.599-1.47-21.972-11.046-27.501zm-65.479 100.461l-46.309-26.74c-26.988 23.071-36.559 28.876-71.039 41.059v53.479a217.145 217.145 0 0 1-87.738 0v-53.479c-33.621-11.879-43.355-17.395-71.039-41.059l-46.309 26.74c-19.71-22.09-34.689-47.989-43.929-75.958l46.329-26.74c-6.535-35.417-6.538-46.644 0-82.079l-46.329-26.74c9.24-27.969 24.22-53.869 43.929-75.969l46.309 26.76c27.377-23.434 37.063-29.065 71.039-41.069V44.464a216.79 216.79 0 0 1 87.738 0v53.479c33.978 12.005 43.665 17.637 71.039 41.069l46.309-26.76c19.709 22.099 34.689 47.999 43.929 75.969l-46.329 26.74c6.536 35.426 6.538 46.644 0 82.079l46.329 26.74c-9.24 27.968-24.219 53.868-43.929 75.957zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z',
        viewBox: '0 0 512 512'
    },
    'edit-light': {
        svgCode: 'M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z',
        viewBox: '0 0 576 512'
    },
    'pencil-light': {
        svgCode: 'M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z',
        viewBox: '0 0 512 512'
    },
    'pencil': {
        svgCode: 'M491.609 73.625l-53.861-53.839c-26.378-26.379-69.076-26.383-95.46-.001L24.91 335.089.329 484.085c-2.675 16.215 11.368 30.261 27.587 27.587l148.995-24.582 315.326-317.378c26.33-26.331 26.581-68.879-.628-96.087zM120.644 302l170.259-169.155 88.251 88.251L210 391.355V350h-48v-48h-41.356zM82.132 458.132l-28.263-28.263 12.14-73.587L84.409 338H126v48h48v41.59l-18.282 18.401-73.586 12.141zm378.985-319.533l-.051.051-.051.051-48.03 48.344-88.03-88.03 48.344-48.03.05-.05.05-.05c9.147-9.146 23.978-9.259 33.236-.001l53.854 53.854c9.878 9.877 9.939 24.549.628 33.861z',
        viewBox: '0 0 512 512'
    },
    'pencil-solid': {
        svgCode: 'M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z',
        viewBox: '0 0 512 512'
    },
    'sync-light': {
        svgCode: 'M492 8h-10c-6.627 0-12 5.373-12 12v110.627C426.929 57.261 347.224 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h10.016c6.353 0 11.646-4.949 11.977-11.293C48.157 132.216 141.097 42 256 42c82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12zm-.301 248h-10.015c-6.352 0-11.647 4.949-11.977 11.293C463.841 380.158 370.546 470 256 470c-82.608 0-154.672-46.952-190.299-116H180c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H20c-6.627 0-12 5.373-12 12v160c0 6.627 5.373 12 12 12h10c6.627 0 12-5.373 12-12V381.373C85.071 454.739 164.777 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z',
        viewBox: '0 0 512 512'
    },
    'sync': {
        svgCode: 'M500 8h-27.711c-6.739 0-12.157 5.548-11.997 12.286l2.347 98.575C418.212 52.043 342.256 8 256 8 134.813 8 33.933 94.924 12.296 209.824 10.908 217.193 16.604 224 24.103 224h28.576c5.674 0 10.542-3.982 11.737-9.529C83.441 126.128 161.917 60 256 60c79.545 0 147.942 47.282 178.676 115.302l-126.39-3.009c-6.737-.16-12.286 5.257-12.286 11.997V212c0 6.627 5.373 12 12 12h192c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12zm-12.103 280h-28.576c-5.674 0-10.542 3.982-11.737 9.529C428.559 385.872 350.083 452 256 452c-79.546 0-147.942-47.282-178.676-115.302l126.39 3.009c6.737.16 12.286-5.257 12.286-11.997V300c0-6.627-5.373-12-12-12H12c-6.627 0-12 5.373-12 12v192c0 6.627 5.373 12 12 12h27.711c6.739 0 12.157-5.548 11.997-12.286l-2.347-98.575C93.788 459.957 169.744 504 256 504c121.187 0 222.067-86.924 243.704-201.824 1.388-7.369-4.308-14.176-11.807-14.176z',
        viewBox: '0 0 512 512'
    },
    'sync-sold': {
        svgCode: 'M440.935 12.574l3.966 82.766C399.416 41.904 331.674 8 256 8 134.813 8 33.933 94.924 12.296 209.824 10.908 217.193 16.604 224 24.103 224h49.084c5.57 0 10.377-3.842 11.676-9.259C103.407 137.408 172.931 80 256 80c60.893 0 114.512 30.856 146.104 77.801l-101.53-4.865c-6.845-.328-12.574 5.133-12.574 11.986v47.411c0 6.627 5.373 12 12 12h200.333c6.627 0 12-5.373 12-12V12c0-6.627-5.373-12-12-12h-47.411c-6.853 0-12.315 5.729-11.987 12.574zM256 432c-60.895 0-114.517-30.858-146.109-77.805l101.868 4.871c6.845.327 12.573-5.134 12.573-11.986v-47.412c0-6.627-5.373-12-12-12H12c-6.627 0-12 5.373-12 12V500c0 6.627 5.373 12 12 12h47.385c6.863 0 12.328-5.745 11.985-12.599l-4.129-82.575C112.725 470.166 180.405 504 256 504c121.187 0 222.067-86.924 243.704-201.824 1.388-7.369-4.308-14.176-11.807-14.176h-49.084c-5.57 0-10.377 3.842-11.676 9.259C408.593 374.592 339.069 432 256 432z',
        viewBox: '0 0 512 512'
    },
    'check-light': {
        svgCode: 'M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z',
        viewBox: '0 0 448 512'
    },
    'check': {
        svgCode: 'M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z',
        viewBox: '0 0 448 512'
    },
    'trash': {
        svgCode: 'M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z',
        viewBox: '0 0 512 512'
    }
};

/***/ }),

/***/ "./src/components/Icon/Icon.tsx":
/*!**************************************!*\
  !*** ./src/components/Icon/Icon.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const css = __webpack_require__(/*! ./Icon.css */ "./src/components/Icon/Icon.css");
const Icon_fn_1 = __webpack_require__(/*! ./Icon.fn */ "./src/components/Icon/Icon.fn.tsx");
/**
 * @render react
 * @name Icon
 * @description Easy to use SVG Icons
 * @example
 * <Icon icon="sync-regular"></Icon>
 */
var IconTypes;
(function (IconTypes) {
    IconTypes["plusLight"] = "plus-light";
    IconTypes["plus"] = "plus";
    IconTypes["plusSolid"] = "plus-solid";
    IconTypes["spinner"] = "spinner";
    IconTypes["cog"] = "cog";
    IconTypes["editLight"] = "edit-light";
    IconTypes["pencilLight"] = "pencil-light";
    IconTypes["pencil"] = "pencil";
    IconTypes["pencilSolid"] = "pencil-solid";
    IconTypes["syncLight"] = "sync-light";
    IconTypes["sync"] = "sync";
    IconTypes["syncSolid"] = "sync-solid";
    IconTypes["checkLight"] = "check-light";
    IconTypes["check"] = "check";
})(IconTypes = exports.IconTypes || (exports.IconTypes = {}));
class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { icon, color, size } = this.props;
        let height = 30;
        switch (size) {
            case 'small':
                height = 16;
                break;
            case 'medium':
                height = 22;
                break;
            case 'large':
                height = 28;
                break;
        }
        let defaultStyles = {
            root: {
                height: height,
                width: 'auto',
                strokeWidth: 3,
                fill: '#000',
                position: 'relative',
                top: '1px'
            }
        };
        let oSvg = typeof icon === 'string' ? Icon_fn_1.Icons[icon] : icon;
        let styles = Object.assign({}, defaultStyles, this.props.styles);
        color != undefined ? styles.root.fill = color : null;
        let rotate = this.props.rotate ? css.rotate : '';
        return React.createElement("svg", { className: rotate, style: styles.root, xmlns: "http://www.w3.org/2000/svg", viewBox: oSvg.viewBox, ref: this.props.iconRef }, React.createElement("path", { d: oSvg.svgCode }));
    }
}
exports.default = Icon;

/***/ }),

/***/ "./src/components/Icon/index.tsx":
/*!***************************************!*\
  !*** ./src/components/Icon/index.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Icon_1 = __webpack_require__(/*! ./Icon */ "./src/components/Icon/Icon.tsx");
exports.default = Icon_1.default;
var Icon_2 = __webpack_require__(/*! ./Icon */ "./src/components/Icon/Icon.tsx");
exports.IconTypes = Icon_2.IconTypes;

/***/ }),

/***/ "./src/components/ListItem/ListItem.tsx":
/*!**********************************************!*\
  !*** ./src/components/ListItem/ListItem.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
function ListItem(props) {
    let hovering = props.isHovering !== undefined ? props.isHovering : false;
    let styles = {
        todoItem: {
            boxShadow: props.active ? '0px 0px 5px #679D69' : '0px 0px 1px #aaa',
            display: 'block',
            padding: '17px 5px',
            margin: '0px 5px 1px 5px',
            width: '400px',
            textTransform: 'uppercase',
            position: 'relative',
            background: hovering ? '#ccc' : '#eee'
        }
    };
    let mEnter = props.hovering !== undefined ? () => props.hovering(true) : () => {};
    let mLeave = props.hovering !== undefined ? () => props.hovering(false) : () => {};
    return React.createElement("li", { style: Object.assign({}, styles.todoItem), onMouseEnter: mEnter, onMouseLeave: mLeave }, props.children);
}
exports.default = ListItem;

/***/ }),

/***/ "./src/components/ListItem/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/ListItem/index.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ListItem_1 = __webpack_require__(/*! ./ListItem */ "./src/components/ListItem/ListItem.tsx");
exports.default = ListItem_1.default;

/***/ }),

/***/ "./src/components/Ripple/Ripple.tsx":
/*!******************************************!*\
  !*** ./src/components/Ripple/Ripple.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
class Ripple extends React.Component {
    constructor(props) {
        super(props);
        this.setActive = () => {
            this.setState({ active: true }, () => {
                setTimeout(() => {
                    this.setFading();
                }, 200);
            });
        };
        this.setFading = () => {
            this.setState({ fading: true }, () => {
                setTimeout(() => {
                    this.setComplete();
                }, 1000);
            });
        };
        this.setComplete = () => {
            this.props.onComplete();
        };
        this.state = {
            active: false,
            fading: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setActive();
        }, 50);
    }
    render() {
        let sizeNum = 50;
        switch (this.props.size) {
            case "small":
                sizeNum = 50;
                break;
            case "medium":
                sizeNum = 100;
                break;
            case "large":
                sizeNum = 200;
                break;
        }
        let styles = {
            root: {
                position: 'absolute',
                opacity: .13,
                width: 0,
                height: 0,
                background: this.props.color !== undefined ? this.props.color : '#ccc',
                borderRadius: '50%',
                transition: 'width .2s, height .2s, left .2s, top .2s, opacity 1s',
                left: this.props.left,
                top: this.props.top,
                zIndex: -1
            },
            expanded: {
                height: sizeNum,
                width: sizeNum,
                left: this.props.left - sizeNum / 2,
                top: this.props.top - sizeNum / 2,
                opacity: 0
            },
            faded: {
                opacity: 0
            }
        };
        let style = this.state.active ? this.state.fading ? Object.assign({}, styles.expanded, styles.faded) : Object.assign({}, styles.expanded) : {};
        return React.createElement("div", { style: Object.assign({}, styles.root, style) });
    }
}
exports.default = Ripple;

/***/ }),

/***/ "./src/components/Ripple/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Ripple/index.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Ripple_1 = __webpack_require__(/*! ./Ripple */ "./src/components/Ripple/Ripple.tsx");
exports.default = Ripple_1.default;

/***/ }),

/***/ "./src/components/Todo/Todo.tsx":
/*!**************************************!*\
  !*** ./src/components/Todo/Todo.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Icon_1 = __webpack_require__(/*! ../Icon */ "./src/components/Icon/index.tsx");
const Button_1 = __webpack_require__(/*! ../Button */ "./src/components/Button/index.tsx");
const ListItem_1 = __webpack_require__(/*! ../ListItem */ "./src/components/ListItem/index.tsx");
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.hovering = hovering => {
            this.setState({ hovering });
        };
        this.state = {
            hovering: false
        };
    }
    render() {
        let styles = {
            todoText: {
                marginLeft: '10px'
            },
            actions: {
                position: 'absolute',
                right: '10px',
                top: '7px'
            }
        };
        let actions = this.props.synced ? React.createElement(Button_1.IconButton, { onClick: this.props.onDelete }, React.createElement(Icon_1.default, { icon: "trash", size: 'small' })) : React.createElement(Button_1.IconButton, { onClick: () => {} }, React.createElement(Icon_1.default, { icon: "spinner", size: "small", rotate: true }));
        return React.createElement(ListItem_1.default, { hovering: hovering => this.hovering(hovering), isHovering: this.state.hovering }, React.createElement("span", { className: "text-block", style: Object.assign({}, styles.todoText) }, this.props.title), React.createElement("span", { style: Object.assign({}, styles.actions) }, actions));
    }
}
exports.default = Todo;

/***/ }),

/***/ "./src/components/Todo/index.tsx":
/*!***************************************!*\
  !*** ./src/components/Todo/index.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Todo_1 = __webpack_require__(/*! ./Todo */ "./src/components/Todo/Todo.tsx");
exports.default = Todo_1.default;

/***/ }),

/***/ "./src/components/TodoList/TodoList.tsx":
/*!**********************************************!*\
  !*** ./src/components/TodoList/TodoList.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Todo_1 = __webpack_require__(/*! ../Todo */ "./src/components/Todo/index.tsx");
const AddTodo_tsx_1 = __webpack_require__(/*! ../AddTodo.tsx */ "./src/components/AddTodo.tsx/index.tsx");
const DataConnection_1 = __webpack_require__(/*! ../DataConnection */ "./src/components/DataConnection/index.tsx");
var tbRef;
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.getTodos = () => {
            this.props.get().then(data => {
                let syncedData = data.map(todo => {
                    return Object.assign({}, todo, { synced: true });
                });
                // .sort((a,b)=>{
                //     let aTitle = a.title.toLowerCase();
                //     let bTitle = b.title.toLowerCase();
                //
                //     if(aTitle > bTitle) return 1;
                //     if(aTitle < bTitle) return 0;
                //     if(aTitle === bTitle) return -1;
                // });
                this.setState({ todos: syncedData });
                tbRef.focus();
            });
        };
        this.setTodoRef = element => {
            tbRef = element;
        };
        this.changeInput = input => {
            this.setState({ inputValue: input });
        };
        this.deleteTodo = (index, id) => {
            let todos = JSON.parse(JSON.stringify(this.state.todos));
            todos[index].synced = false;
            this.setState({ todos: todos });
            tbRef.focus();
            this.props.delete(id).then(response => {
                if (response.ok) {
                    todos.splice(index, 1);
                    this.setState({ todos });
                    // We assumed success so lets mark the item as success
                    // now that is has been confirmed
                } else {
                    console.log("Couldn't Delete");
                    // We assumed success and it failed
                    // so we need to inform the user.
                    // maybe mark the item as failed with a retry?
                }
            });
        };
        this.createTodo = () => {
            let newTodo = { created_by: "1", title: this.state.inputValue };
            let newTodos = JSON.parse(JSON.stringify(this.state.todos));
            newTodos.push(newTodo);
            var newIndex = newTodos.length - 1;
            tbRef.focus();
            this.props.create(newTodo).then(data => {
                let newTodos = JSON.parse(JSON.stringify(this.state.todos));
                newTodos[newIndex] = data;
                newTodos[newIndex].synced = true;
                this.setState({ todos: newTodos });
                // We assumed success so now lets confirm it with
                // an icon or display
            }).catch(error => {
                console.log("Couldn't created the new todo!");
                // Since we assumed the item would create
                // successfully we need to show that the
                // creation process failed
            });
            this.setState({ inputValue: '', todos: newTodos });
        };
        this.state = {
            todos: [],
            inputValue: ''
        };
    }
    componentDidMount() {
        this.getTodos();
    }
    render() {
        let styles = {
            todoList: {
                listStyle: 'none',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                paddingLeft: '5px',
                fontWeight: 400
            }
        };
        let todos = this.state.todos.map((todo, index) => {
            return React.createElement(Todo_1.default, Object.assign({}, todo, { onDelete: () => this.deleteTodo(index, todo.id) }));
        });
        return React.createElement("ul", { style: Object.assign({}, styles.todoList) }, React.createElement(AddTodo_tsx_1.default, { onClick: this.createTodo, input: this.state.inputValue, onInputChange: this.changeInput, reference: this.setTodoRef }), todos);
    }
}
exports.default = DataConnection_1.default()(TodoList);

/***/ }),

/***/ "./src/components/TodoList/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/TodoList/index.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var TodoList_1 = __webpack_require__(/*! ./TodoList */ "./src/components/TodoList/TodoList.tsx");
exports.default = TodoList_1.default;

/***/ }),

/***/ "./src/components/Todos.tsx":
/*!**********************************!*\
  !*** ./src/components/Todos.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const TodoList_1 = __webpack_require__(/*! ./TodoList */ "./src/components/TodoList/index.tsx");
class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.isClientOrServer = () => {
            return typeof window !== 'undefined' && window.document ? 'client' : 'server';
        };
        this.state = {};
    }
    render() {
        let styles = {
            root: {
                fontFamily: 'Arial'
            },
            heading: {
                marginLeft: '10px'
            }
        };
        return React.createElement("div", { style: Object.assign({}, styles.root) }, React.createElement("h2", { style: Object.assign({}, styles.heading) }, "Todo List"), this.isClientOrServer(), React.createElement(TodoList_1.default, null));
    }
}
exports.default = Todos;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=App.js.map