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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* global require, module, console, Promise */

(function() {

  'use strict';

  window.RMR = __webpack_require__(1);

})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* global require, module, console, Promise */

(function() {

  'use strict';

  if (! Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }

  const

  /**
    Determine if a string is a valid internet URL

    @param {String} str - the string to be tested
    @return {Bool} - `true` of `false`
   */
  isURL = function(str) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
  },

  /**
   * Determine if we're in a touch-based browser (phone/tablet)
   *
   * @return {Bool} `true` or `false`
   */
  isTouch = function() {

    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    return typeof window.orientation !== 'undefined';

//    return 'ontouchstart' in window || navigator.msMaxTouchPoints;
  },

  /*
   * Generate a unique string suitable for id attributes
   *
   * @param basename (String)
   * @return string
   */
  guid = function(basename) {
    return (basename ? basename : 'rmr-guid-') + parseInt(Math.random() * 100, 10) + '-' + parseInt(Math.random() * 1000, 10);
  },

  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}

   * @return Object
   */
  merge = function(a, b) {
    const o = {};
    let i = null;
    for (i in a) {
      if (a.hasOwnProperty(i)) {
        o[i] = a[i];
      }
    }
    if (! b) {
      return o;
    }
    for (i in b) {
      if (b.hasOwnProperty(i)) {
        o[i] = b[i];
      }
    }
    return o;
  },

  /*
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = function(list) {

    const ret = [];
    let i = 0;

    if (list instanceof Array) {
      return list;
    }

    if (! list.length) {
      return ret;
    }

    for (i = 0; i < list.length; i++) {
      ret.push(list[i]);
    }

    return ret;
  },

  /**
   * Retrieve an element via query selector
   *
   * @param {Mixed} arg the element to retrieve
   * @return {Element} element corresponding to the selector (or null if none exists)
   */
  getElement = function(arg) {
    if (typeof arg === 'string') {
      return document.querySelector(arg);
    }

    return arg;
  },

  /*
   * Create an element with a set of attributes/values
   *
   * @param type (String)
   * @param attrs {Object}
   *
   * @return HTMLElement
   */
  makeElement = function(type, attrs) {

     const n = document.createElement(type);

     for (const i in attrs) {
       if (attrs.hasOwnProperty(i) && attrs[i]) {
         n.setAttribute(i, attrs[i]);
       }
     }
     return n;
  },

  /**
   * Make loader
   *
   * @return {Element} SVG element
   */
  loader = function() {

/*
    const svg = makeElement('svg', {
      version: '1.1',
      class: 'rmr-loader',
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      x: '0px',
      y: '0px',
      width: '40px',
      height: '40px',
      viewBox: '0 0 40 40',
      'enable-background': 'new 0 0 40 40',
      'xml:space': 'preserve'
    });

    svg.innerHTML = 
    '<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>' +
    '<path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z">' +
    '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.8s" repeatCount="indefinite"></animateTransform>' +
    '</path>';
*/

    return '<svg version="1.1" class="rmr-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">' +
    '<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>' +
    '<path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z">' +
    '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.8s" repeatCount="indefinite"></animateTransform>' +
    '</path>' +
    '</svg>';

//    return svg;
  },

  /**
   * Retrieve an object containing browser/screen coordinates for a DOM element
   *
   * @param {Element} node the element whose coordinates should be retrieved
   * @return {Object} An object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   */
  getRect = function(node) {

    node = getElement(node);

    const
    rect = node.getBoundingClientRect(),
    ret = { top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right }; // create a new object that is not read-only

    ret.top += window.pageYOffset;
    ret.left += window.pageXOffset;

    ret.bottom += window.pageYOffset;
    ret.right += window.pageYOffset;

    ret.width = rect.right - rect.left;
    ret.height = rect.bottom - rect.top;

    return ret;
  },


  /**
   * Localize a string
   *
   * {
   *   'en' : {
   *      'key' : 'neighbor'
   *    },
   *    'en-ca' : {
   *      'key' : 'neighbour'
   *    }
   *  }
   *
   * @param {Object} lookup dictionary
   * @param {String} key the to localize
   * @return {String} string
   */
  localize = function(lookup, key) {

    if (typeof navigator === 'undefined') {
      return key;
    }

    let i, lang;

    for (i in navigator.languages) {
      if (! navigator.languages.hasOwnProperty(i)) {
        continue;
      }
      lang = navigator.languages[i].toLowerCase();
      if (lookup.hasOwnProperty(lang) && lookup[lang].hasOwnProperty(key)) {
        return lookup[lang][key];
      }
    }

    for (i in navigator.languages) {
      if (! navigator.languages.hasOwnProperty(i)) {
        continue;
      }
      lang = navigator.languages[i].split('-')[0].toLowerCase();
      if (lookup.hasOwnProperty(lang) && lookup[lang].hasOwnProperty(key)) {
        return lookup[lang][key];
      }
    }

//    console.warn('No localization for ' + key);
    return key;
  },

  /**
   * Apply styles to a node
   *
   * @param {HTMLElement} node that should have styles applied
   * @param {Object} styles key/value pairs for styles and values
   * @return {Element} node
   */
  setStyles = function(node, styles) {

    node = getElement(node);
    if (! node) {
      return false;
    }

    for (const i in styles) {
      if (styles.hasOwnProperty(i) && styles[i]) {
        node.style[i] = styles[i];
      }
    }

    return node;
  },

  /**
   * Build a query string from an object
   *
   * @param {Object} obj the object to be passed via URL
   * @return {String} str query string corresponding to the object
   */
  queryString = function(obj) {

    if (Object.keys(obj).length === 0) {
      return '';
    }

    return Object.keys(obj).reduce(function(a,k) {
      a.push(k + '=' + encodeURIComponent(obj[k]));
      return a;
    },[]).join('&');
  },

  /**
   * Generate an object containing keys/values corresponding to form elements
   *
   * @param {Element} form element
   * @return {Object} the key/value pairs for the form
   */
  objectFromForm = function(form) {

    form = getElement(form);
    if (! form) {
      return {};
    }

    const
    inputs = form.querySelectorAll('select,input,textarea'),
    params = {};

    for (const i in inputs) {
      if (! inputs.hasOwnProperty(i)) {
        continue;
      }
      const
        name = inputs[i].getAttribute('name'),
        type = inputs[i].type ? inputs[i].type : 'text';

      if (inputs[i].hasAttribute('disabled')) {
        continue;
      }

      if (type === 'radio' || type === 'checkbox') {
        if (inputs[i].checked) {
          params[name] = inputs[i].value;
        }
      } else {
        params[name] = inputs[i].value;
      }
    }

    return params;
  },

  /**
   * 
   *
   * @param {Element} node starting point of search
   * @param {String} ancestor the selector for the ancestor we're looking for
   * @return {Element} or `null` if no such ancestor exists
   */
  ancestor = function(node, ancestor, includeSelf) {

    node = getElement(node);
    if (! node) {
      return null;
    }

    if (includeSelf && node.matches(ancestor)) {
      return node;
    }

    let parent = node;

    while (parent = parent.parentNode) {
      if (parent.matches(ancestor)) {
        return parent;
      }
    }

    return null;
  },
  
  /**
   * 
   *
   * @param {Element} node the node to be removed
   */
  removeNode = function(node) {

    node = getElement(node);
    if (! node) {
      return null;
    }

    node.parentNode.removeChild(node);

    return true;
  },

  /**
   * Make an XHR request
   *
   * @param {Object} config url, method, params, form
   * @param {Function} handler invoked on completion
   * @return {XMLHttpRequest} object making the request
   */
  xhrRequest = function(config, handler) {

    if (typeof XMLHttpRequest === 'undefined') {
      return null;
    }

    const defaults = {
      form: null,
      url: '/',
      method: 'get',
      params: null
    };

    config = merge(defaults, config);

    if (config.form) {
      config.form = getElement(config.form);
      config.url = config.form.getAttribute('action'),
      config.method = config.form.getAttribute('method') ? config.form.getAttribute('method') : 'get',
      config.params = objectFromForm(config.form);
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

      if (this.readyState === 4) {
        if (handler) {
          handler(xhttp);
        }
      }
    };

    let url = config.url;
    if (config.method.toUpperCase() === 'GET' && config.params) {
      url = url + '?' + queryString(config.params);
    }

    xhttp.open(config.method, url, true);
    xhttp.send();

    return xhttp;
  },


  /**
   * Retrieve the last non-empty element of an array
   *
   * @param {Array} list - array to be iterated through
   * @param {Function} func (optional) function used to evaluate items in the array
   * @return {Mixed} the last non-empty value in the array (or `null` if no such value exists)
   */
  lastValue = function(list, func) {

    list = arr(list);

    let i = list.length - 1;
    while (i >= 0) {
      if (func ? func(list[i]) : list[i]) {
        return list[i];
      }
      i--;
    }

    return null;
  };

  module.exports = {
    Browser: {
      isTouch: isTouch
    },
    String: {
      isURL: isURL,
      guid: guid,
      localize: localize
    },
    Array: {
      coerce: arr,
      last: lastValue
    },
    Object: {
      merge: merge,
      queryString: queryString
    },
    XHR: {
      request: xhrRequest
    },
    Node: {
      ancestor: ancestor,
      remove: removeNode,
      loader: loader,
      get: getElement,
      make: makeElement,
      getRect: getRect,
      setStyles: setStyles
    }
  };

})();


/*
if (require.main === module) {

  if (process.argv.length === 3) {
    retrieveMetadata(process.argv[2]).then(function(meta) {
      console.log(JSON.stringify(meta));
    }).catch(function(err) {
      console.log('🚫  ' + err);
    });
  } else {
    console.log('🚫  No URL provided');
  }
}
*/



/***/ })
/******/ ]);