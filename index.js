/* global */

(() => {

  'use strict';

  /**
   * rmr-util
   *
   * JS for your browser
   *
   *
   *
   */


  const

  /**
   *
   *
   */
   Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
      let t="";
      let n,r,i,s,o,u,a;
      let f=0;
      e = Base64._utf8_encode(e);
      while (f <e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n&3)<<4|r>>4;
        u=(r&15)<<2|i>>6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64;
        } else if (isNaN(i)) {
          a =64;
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
      }
      return t;
    },

    decode: function(e) {

      let t = "";
      let n,r,i, s,o,u,a;
      let f = 0;

      e = e.replace(/[^A-Za-z0-9\+\/\=]/g,"");

      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o>>4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u !== 64) {
          t = t+String.fromCharCode(r);
        }
        if (a !== 64) {
          t = t+String.fromCharCode(i);
        }
      }
      t = Base64._utf8_decode(t);
      return t;
    },
    _utf8_encode: function(e) {
      e = e.replace(/\r\n/g,"\n");
      let t="",
      n = 0;
      for (n = 0; n < e.length;n++) {
        const r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r>>6|192);
          t += String.fromCharCode(r&63|128);
        } else {
          t += String.fromCharCode(r>>12|224);
          t += String.fromCharCode(r>>6&63|128);
          t += String.fromCharCode(r&63|128);
        }
      }
      return t;
    },

    _utf8_decode: function(e) {
      let
      t = "",
      n = 0,
      r = 0,
      c2 = 0,
      c3 = 0;

      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r<128) {
          t += String.fromCharCode(r);
          n++;
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n+1);
          t += String.fromCharCode((r&31)<<6|c2&63);
          n += 2;
        } else {
          c2 = e.charCodeAt(n+1);
          c3 = e.charCodeAt(n+2);
          t += String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);
          n += 3;
        }
      }
      return t;
    }
  },

  /**
   * Retrieve an element via query selector, or
   *
   * @param {Mixed} arg the element to retrieve, or null if no such element exists
   * @return {Element} element corresponding to the selector (or null if none exists)
   */
  getElement = function(arg) {
    if (typeof arg === 'string') {
      return document.querySelector(arg);
    } else if (arg instanceof HTMLElement) {
      return arg;
    }

    return null;
  },

  /**
   * Determine if a variable/object is an HTML element
   *
   * @param {Mixed}
   * @return {Bool}
   */
  isAnElement = function(arg) {
    return arg instanceof HTMLElement;
  },

  /**
   * Determine if a string is a valid internet URL
   *
   * @param {String} str - the string to be tested
   * @return {Bool} - `true` of `false`
   */
  isURL = function(str) {
    // ???
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
  },


  /**
    Format a latitude coordinate value into a human-friendly string

    @param {Float} lat  value to be formatted
    @return {String} formatted latitude string
   */
  formatLatitude = function(lat) {

    let value = parseFloat(lat);

    const dir = value <  0 ? 'S' : 'N';

    let degrees = 0, minutes = 0, seconds = 0;

    degrees = parseInt(value);
    value = (value - degrees) * 60;

    minutes = parseInt(value);
    seconds = (value - minutes) * 60;

    if (seconds < 0) {
      seconds *= -1;
    }

    return Math.abs(degrees) + 'º' + Math.abs(minutes) + '’' + seconds.toFixed(2) + '”' + dir;
  },

  /**
    Format a longitude coordinate value into a human-friendly string

    @param {Float} lon  value to be formatted
    @return {String} formatted longitude string
   */
  formatLongitude = function(lon) {

    let value = parseFloat(lon);

    const dir = value <  0 ? 'W' : 'E';

    let degrees = 0, minutes = 0, seconds = 0;

    degrees = parseInt(value);
    value = (value - degrees) * 60;

    minutes = parseInt(value);
    seconds = (value - minutes) * 60;

    return Math.abs(degrees) + 'º' + Math.abs(minutes) + '’' + Math.abs(seconds.toFixed(2)) + '”' + dir;
  },


  /**
   * Determine if a node matches a provided selector
   *
   * @param {HTMLElement} node  the element to be tested
   * @param {String} selector the selector string to test
   * @return {Bool} `true` or `false`
   */
  selectorMatches = function (node, selector) {

    const
    p = Element.prototype,
    f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function matches() {
      return [].indexOf.call(document.querySelectorAll(selector), this) !== -1;
    };
    try {
      return f.call(node, selector);
    } catch (e) {
      return false;
    }
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
  },

  /**
   * Determine if we're in Safari
   *
   * @return {Bool} `true` or `false`
   */
  isSafari = function() {

    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  },

  /**
   * Determine if we're in Firefox
   *
   * @return {Bool} `true` or `false`
   */
  isFirefox = function() {

    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return navigator.userAgent.indexOf("Firefox") > 0;
  },

  /**
   * Is the browser capable of opening new windows/tabs with "data:" protocol
   *
   * @see https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/GbVcuwg_QjM%5B1-25%5D
   * @return {Bool} `true` if the browser opens `data:` URLs; `false` if not
   */
  opensData = function() {
    return isFirefox() || isSafari();
  },

  /**
   * Retrieve an object containing browser/screen coordinates for a DOM element
   *
   * @param {Element} node the element whose coordinates should be retrieved
   * @return {Object} An object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   */
  getRect = function(node) {

    node = getElement(node);
    if (!node) {
      return { top: 0, left: 0, right: 0, width: 0, height: 0 };
    }

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
   * Scroll to an element
   *
   * @param {Mixed} y - vertical offset to scroll to, or selector/node references for the Element to scroll to
   * @param {Integer} duration - # of milliseconds animation should run
   */
  scrollTo = function(y, duration) {

    const
//     linear = function(fraction) {
//       return fraction;
//     },
    quad = function(timeFraction) {
      return Math.pow(timeFraction, 5)
    },
    timing = quad;
//     circ = func(timeFraction) {
//       return 1 - Math.sin(Math.acos(timeFraction));
//     };

//    if (! timing) {
     
//    }

    if (arguments.length === 1) {
      duration = 200;
    }

    if (typeof y === 'string' || y instanceof Element) {
      y = getRect(y).top;
    }

    const
    startingY = window.pageYOffset,
    diff = y - startingY;

    let start = performance.now();

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {

      const
      time = timestamp - start,
      percent = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * timing(percent));

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
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
  objectMerge = function(a, b) {
    const o = {};
    let i = null;
    for (i in a) {
      if (objectHas(a, i)) {
        o[i] = a[i];
      }
    }
    if (! b) {
      return o;
    }
    for (i in b) {
      if (objectHas(b, i)) {
        o[i] = b[i];
      }
    }
    return o;
  },

  /**
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array, or convert a scalar into a single-element array
   *
   * @param {Mixed} list an array-like thing or a scalar
   * @return {Array} the param as an array
   */
  arr = function(list) {

    const ret = [];
    let i = 0;

    if (list instanceof Array) {
      return list;
    }

    if (typeof list.length !== 'number') {
      return [list];
    }

    for (i = 0; i < list.length; i++) {
      if (objectHas(list, i)) {
        ret.push(list[i]);
      }
    }

    return ret;
  },


  /**
   * Remove an object from an array
   *
   * @param {Array} array containing object to be removed
   * @param {Any} item to be removed
   * @return {Array} array for chaining
   */
  arrayRemove = function(array, item) {
    return arr(array).filter(e => e !== item);
  },

  /**
   * Return the index of an item in an array
   *
   * @param {Array} list that should be searched
   * @param {Function} func comparator function that takes on argument
   * @return {Integer} index of the item in the array, or -1 if it doesn't exist
   */
  arrayFind = function(list, func) {

    const array = arr(list);

    if (typeof func !== 'function') {

      const
      target = func,
      lookup = function(param) {

        if (typeof param === 'object' && objectHas(param, 'id')) {
          if (typeof target === 'object' && objectHas(target, 'id')) {
            return param.id === target.id;
          }
          return param.id === target;
        }

        return param === target;
       };
      func = lookup;
    }
    for (const i in array) {
      if (! objectHas(array, i)) {
        continue;
      }

      if (array[i] === func || func(array[i])) {
        return parseInt(i, 10);
      }
    }
    return -1;
  },

  /**
   * Shift the objects within an array so that a given item is first
   *
   * @param {Array} array containing object to be removed
   * @param {Any} item to be made the first
   * @return {Array} array for chaining
   */
  arrayReorder = function(array, item) {

    const
      list = arr(array),
      reordered = [];

    const index = arrayFind(list, item);
    if (index === -1) {
      return list;
    }

    reordered.push(list[index]);

    for (let i = index + 1; i < list.length; i++) {
      reordered.push(array[i]);
    }

    for (let i = 0; i < index; i++) {
      reordered.push(array[i]);
    }

    return reordered;
  },


  /**
   * Remove all children from a node (optionally matching a selector)
   *
   * @param {Mixed} arg - node or selector whose children should be removed
   * @param {String,optional} selector - query selector that children must match in order to be removed
   * @return {HTMLElement} - for chaining
   */
  pruneElement = function(arg, selector) {

    const node = getElement(arg);
    if (! node) {
      return null;
    }
    if (selector) {
      let n = arr(arg.querySelectorAll(selector));
      for (let i = 0; i < n.length; i++) {
        removeNode(n[i]);
      }
    }
    else {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }

    return node;
  },


  /**
   * Retrieve an element via query selector
   *
   * @param {Mixed} arg selector, or an array of elements to attach
   * @param {Mixed,optional} scope the parent node
   * @return {[Element]} array of elements
   */
  getElements = function(arg, scope) {

    if (! scope) {
      scope = document;
    }
    else {
      scope = getElement(scope);
    }

    if (typeof arg === 'string') {
      return arr(scope.querySelectorAll(arg));
    }

    return arr(arg);
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
       if (objectHas(attrs, i) && attrs[i]) {
         n.setAttribute(i, attrs[i]);
       }
     }
     return n;
  },

  /**
   * Make loader
   *
   * @return {String} SVG element
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
      if (! objectHas(navigator.languages, i)) {
        continue;
      }
      lang = navigator.languages[i].toLowerCase();
      if (objectHas(lookup, lang) && objectHas(lookup[lang], key)) {
        return lookup[lang][key];
      }
    }
    console.warn('No localization for ' + key);
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
      if (objectHas(styles, i) && styles[i]) {
        node.style[i] = styles[i];
      }
    }

    return node;
  },

  /**
   * Apply attributes to a node
   *
   * @param {HTMLElement} node that should have styles applied
   * @param {Object} styles key/value pairs for styles and values
   * @return {Element} node
   */
  setAttributes = function(node, attrs) {

    node = getElement(node);
    if (! node) {
      return false;
    }

    for (const i in attrs) {
      if (objectHas(attrs, i) && attrs[i]) {
        if (attrs[i]) {
          node.setAttribute([i], attrs[i]);
        } else {
          node.removeAttribute([i], attrs[i]);
        }
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

    return Object.keys(obj).reduce((a,k) => {
      a.push(k + '=' + encodeURIComponent(obj[k]));
      return a;
    },[]).join('&');
  },


  /**
   * Return an array of all keys in an object (polyfill for Object.keys)
   *
   * @param {Object} obj object whose keys should be retrieved
   * @return {Array} key list
   */
  objectKeys = function(obj) {

    if (typeof Object !== "undefined" && typeof(Object.keys) !== "undefined") {
      return Object.keys(obj);
    }

    const a = [];
    for (const i in obj) {
      if (objectHas(obj, i)) {
        a.push(i);
      }
    }

    return a;
  },

  /**
   * Retrieve (potentially nested) value from object
   *
   * @param {Object} object - target object to be inspected
   * @param {String} path - nested paths
   * @param {Mixed} fallback - value to return if path not found (default to `null`)
   * @return {Mixed} - value found at path, or `null` if no such path exists
   */
  objectGet = function(object, path, fallback) {

    const bits = path.split('.');
    let target = object;

    for (let i = 0; i < bits.length; i++) {
      if (! objectHas(target, bits[i])) {
        return fallback ? fallback : null;
      }
      target = target[bits[i]];
    }

    return target;
  },

  objectHas = function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  },


  /**
   * Generate an object containing keys/values corresponding to form elements
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
   * @param {Element} form element
   * @return {Object} the key/value pairs for the form
   */
  objectFromForm = function(form) {

    form = getElement(form);
    if (! form) {
      return {};
    }

    if (typeof FormData !== 'undefined') {
//      const f = new FormData(form);
//      console.log(f);
//      return f;
    }

    const
    inputs = form.querySelectorAll('select,input,textarea'),
    params = {};

    for (const i in inputs) {
      if (! objectHas(inputs, i)) {
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
   * Add event listener to >= 1 node
   *
   * @param {String} selector to match nodes
   * @param {String} eventName the event which should be listened for
   * @param {Function} func the method to invoke when eventName occurs
   */
  addListener = function(selector, eventName, func) {
    const nodes = getElements(selector);
    let i = 0;

    for (i in nodes) {
      if (objectHas(nodes, i)) {
        nodes[i].addEventListener(eventName, func);
      }
    }
  },

  /**
   * Get a node's ancestor
   *
   * @param {Element} node starting point of search
   * @param {String} ancestor the selector for the ancestor we're looking for
   * @param {Bool} includeSelf optionally include starting point in search
   * @return {Element} or `null` if no such ancestor exists
   */
  ancestor = function(node, ancestor, includeSelf) {

    node = getElement(node);
    if (! node) {
      return null;
    }

    if (includeSelf && selectorMatches(node, ancestor)) {
      return node;
    }

    let parent = node;

    if (! parent.parentNode) {
      return null;
    }

    while ((parent = parent.parentNode) !== null) {

//       if (! parent instanceof Element) {
//         return null;
//       }

      if (selectorMatches(parent, ancestor)) {
        return parent;
      }
    }

    return null;
  },

  /**
   * Remove a DOM node from the document
   *
   * @param {Element} node the node to be removed
   * @return {Bool} `true` if removed'; `false` if the node doesn't exist
   */
  removeNode = function(node) {

    node = getElement(node);
    if (! node) {
      return false;
    }

    node.parentNode.removeChild(node);

    return true;
  },

  /**
   * Make an XHR request
   *
   * {
   *   form: {selector} - form element to serialize and submit via xhr
   *   url: '{string}',
   *   method: '{GET|POST}',
   *   headers: [],
   *   params: {}
   * }
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
   * @param {Object} config url, method, params, form
   * @param {Function} handler invoked on completion
   * @return {XMLHttpRequest} object making the request
   */
  xhrRequest = function(config, handler) {

    if (typeof XMLHttpRequest === 'undefined') {
      return null;
    }

    const
    defaults = {
      form: null,
      url: '/',
      headers: {},
      method: 'get',
      params: {}
    };

    config = objectMerge(defaults, config);

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

    let
    url = config.url,
    params = '';

    if (config.form) {
      const type = config.form.getAttribute('enctype');
      if (type) {
        config.headers['Content-Type'] = type;
      }
    }

    if (config.method.toUpperCase() === 'GET') {
      url = Object.keys(config.params).length > 0 ? (url + '?' + queryString(config.params)) : url;
    } else { // post
      params = queryString(config.params);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    xhttp.open(config.method, url, true);

    for (const h in config.headers) {
      if (objectHas(config.headers, h)) {
        xhttp.setRequestHeader(h, config.headers[h]);
      }
    }

    xhttp.send(params);

    return xhttp;
  },

  /**
   *
   *
   *

  dataFromNode = function(node) {

  },
   */

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

  const subs = {
  
  };


  module.exports = {

    Base64: Base64,

    Tools: {
      externalLinks: function(root) {
        let parent = (root ? getElement(root) : document.body);
        if (! parent) {
          console.error('Node doesn\'t exist RMR.Tools.externalLinks', root);
          return;
        }

        const
          links = parent.querySelectorAll('a'),
          location = document.location;

        for (let i = 0; i < links.length; i++) {
          const a = links[i];
          if (a.protocol === 'mailto:') {
            continue;
          }
//          console.log(a.host, location.host)
          if (a.host !== location.host) {
            a.classList.add('rmr-external');
            a.setAttribute('target', '_blank');
          }
        }
      }
    },

    // document.body.addEventListener('keyup', function(e){ console.log(e.keyCode); });
    Keyboard: {
      next: 39,
      previous: 37,
      up: 38,
      down: 40,
      escape: 27,
      enter: 13,
      space: 32,
      digits: [ 49, 50, 51, 52, 53, 54, 55, 56, 57, 48  ], // treat 0 zero as the last ordinal

      /**
       * Determine if a keyboardEvent has a modifier key associated
       *
       * @param {KeyboardEvent} e the event
       * @return {Bool} `true` if event has a modifier key attached (control, shift, command, alt, etc.); `false` if not
       */
      hasModifier: function(e) {
        return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
      },

      /**
       * Return the ordinal (0-9) of a keypress; -1 if N/A, key "0" return ordinal 9
       *
       * @param {Integer|Event} keyCode either the key code or the window event for a `keypress`
       * @return {Integer} ordinal for the key, or -1 if N/A
       */
      ordinal: function(keyCode) {

        keyCode = parseInt(typeof keyCode !== 'number' ? keyCode.keyCode : keyCode, 10);

        if (keyCode === 48) {
          return 9;
        } else if (keyCode >= 49 && keyCode <= 57) {
          return keyCode - 49;
        }

        return -1;
      }
    },

    Date: {

      /**
       * Convert a Date instance to RFC 3339 format, ex: `2019-01-17T17:55:48Z`
       *
       * @param {Date} date to be formatted, optional
       * @return {String} Date in RFC 3339 format
       * @see https://tools.ietf.org/html/rfc3339
       */
      toRFC3339: function(date) {

        if (! date) { date = new Date(); }

        const pad = function(n) {
          return n < 10 ? '0' + n : n;
        };

         return date.getUTCFullYear() + '-'
              + pad(date.getUTCMonth()+1) + '-'
              + pad(date.getUTCDate()) + 'T'
              + pad(date.getUTCHours()) + ':'
              + pad(date.getUTCMinutes()) + ':'
              + pad(date.getUTCSeconds()) + 'Z';
      },

      fromRFC3339: function(dString) {

        if (! dString) {
          return null;
        }

        return new Date(dString);
/*
        const ret = new Date();

        let utcOffset, offsetSplitChar;
        let offsetMultiplier = 1;
        const dateTime = dString.split("T");
        const date = dateTime[0].split("-");
        const time = dateTime[1].split(":");
        const offsetField = time[time.length - 1];
        let offsetString;

        const offsetFieldIdentifier = offsetField.charAt(offsetField.length - 1);
        if (offsetFieldIdentifier === "Z") {
            utcOffset = 0;
            time[time.length - 1] = offsetField.substr(0, offsetField.length - 2);
        } else {
            if (offsetField[offsetField.length - 1].indexOf("+") !== -1) {
                offsetSplitChar = "+";
                offsetMultiplier = 1;
            } else {
                offsetSplitChar = "-";
                offsetMultiplier = -1;
            }
            offsetString = offsetField.split(offsetSplitChar);
            time[time.length - 1] === offsetString[0];
            offsetString = offsetString[1].split(":");
            utcOffset = (offsetString[0] * 60) + offsetString[1];
            utcOffset = utcOffset * 60 * 1000;
        }

        ret.setTime(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) + (utcOffset * offsetMultiplier));
        return ret;
*/
      }
    },

    OS: {
      isApple: function() {
        const agent = window.navigator.userAgent;
        return agent.match('iPhone;') || agent.match('iPad;') || agent.match('iPod;')  || agent.match('Mac OS X');
      }
    },
    Browser: {
      isTouch: isTouch,
      isSafari: isSafari,
      isFirefox: isFirefox,
      scrollTo: scrollTo,
      opensData: opensData
    },
    String: {
      isURL: isURL,
      guid: guid,
      localize: localize
    },
    Array: {
      coerce: arr,
      last: lastValue,
      remove: arrayRemove,
      find: arrayFind,
      reorder: arrayReorder
    },
    Notify: {
      post: (name, obj) => {

        const special = '*';

        if (objectHas(subs, special)) {
          for (const i in subs[special]) {
            if (! objectHas(subs[special], i)) {
              continue;
            }
            subs[special][i](obj);
          }
        }

        if (! objectHas(subs, name)) {
          return;
        }

        for (const i in subs[name]) {
          if (! objectHas(subs[name], i)) {
            continue;
          }
          subs[name][i](obj);
        }
      },
      subscribe: (name, f) => {
        if (! subs.hasOwnProperty(name)) {
          subs[name] = [];
        }
        subs[name].push(f);
      }
    },
    Object: {
      keys: objectKeys,
      merge: objectMerge,
      value: objectGet,
      fromForm: objectFromForm,
      queryString: queryString,
      has: objectHas
    },
    XHR: {
      request: xhrRequest
    },
    Map: {
      formatLatitude: formatLatitude,
      formatLongitude: formatLongitude
    },
    Node: {
      isa: isAnElement,
      ancestor: ancestor,
      matches: selectorMatches,
      remove: removeNode,
      loader: loader,
      get: getElement,
      getAll: getElements,
      prune: pruneElement,
      listen: addListener,
      create: makeElement,
      getRect: getRect,
      setStyles: setStyles,
      setAttributes: setAttributes
    }
  };

  if (typeof window !== 'undefined') {

    window.addEventListener('load', () => {
      document.body.classList.add('rmr-load');
    });

    window.document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('rmr-nojs');
      document.body.classList.add('rmr-js');

      if (isTouch()) {
        document.body.classList.add('rmr-touch');

        const resizer = function() {

          const
          body = document.body,
          cls = window.innerWidth > window.innerHeight ? 'rmr-landscape' : 'rmr-portrait';

          body.classList.remove('rmr-landscape');
          body.classList.remove('rmr-portrait');

          body.classList.add(cls);
        };

        window.addEventListener('orientationchange', () => {
          resizer();
        });

        resizer();

      } else {
        const
        body = document.body,
        hover = 'rmr-hover',
        out = 'rmr-nohover';

        body.addEventListener('mouseenter', () => {
          body.classList.add(hover);
          body.classList.remove(out);
        });

        body.addEventListener('mouseleave', () => {
          body.classList.remove(hover);
          body.classList.add(out);
        });
      }
    });
  }


/*
  (function() {
    var elements = ['section', 'article', 'aside', 'header', 'footer', 'nav', 'figure', 'figcaption', 'time', 'mark', 'main'];
    for (const i in elements) {
      if (elements.hasOwnProperty(i)) {
        console.log(elements[i]);
        document.createElement(elements[i]);
      }
    }
  })();
*/
})();
