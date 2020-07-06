// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Logic/TagsFilter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagUtils = exports.And = exports.Or = exports.Tag = exports.Regex = void 0;

var Regex =
/** @class */
function () {
  function Regex(k, r) {
    this._k = k;
    this._r = r;
  }

  Regex.prototype.asOverpass = function () {
    return ["['" + this._k + "'~'" + this._r + "']"];
  };

  Regex.prototype.matches = function (tags) {
    for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
      var tag = tags_1[_i];

      if (tag.k === this._k) {
        if (tag.v === "") {
          // This tag has been removed
          return false;
        }

        if (this._r === "*") {
          // Any is allowed
          return true;
        }

        return tag.v.match(this._r).length > 0;
      }
    }

    return false;
  };

  Regex.prototype.substituteValues = function (tags) {
    throw "Substituting values is not supported on regex tags";
  };

  return Regex;
}();

exports.Regex = Regex;

var Tag =
/** @class */
function () {
  function Tag(key, value) {
    this.key = key;
    this.value = value;
  }

  Tag.prototype.matches = function (tags) {
    for (var _i = 0, tags_2 = tags; _i < tags_2.length; _i++) {
      var tag = tags_2[_i];

      if (tag.k === this.key) {
        if (tag.v === "") {
          // This tag has been removed
          return this.value === "";
        }

        if (this.value === "*") {
          // Any is allowed
          return true;
        }

        return this.value === tag.v;
      }
    }

    if (this.value === "") {
      return true;
    }

    return false;
  };

  Tag.prototype.asOverpass = function () {
    if (this.value === "*") {
      return ['["' + this.key + '"]'];
    }

    if (this.value === "") {
      // NOT having this key
      return ['[!"' + this.key + '"]'];
    }

    return ['["' + this.key + '"="' + this.value + '"]'];
  };

  Tag.prototype.substituteValues = function (tags) {
    return new Tag(this.key, TagUtils.ApplyTemplate(this.value, tags));
  };

  return Tag;
}();

exports.Tag = Tag;

var Or =
/** @class */
function () {
  function Or(or) {
    this.or = or;
  }

  Or.prototype.matches = function (tags) {
    for (var _i = 0, _a = this.or; _i < _a.length; _i++) {
      var tagsFilter = _a[_i];

      if (tagsFilter.matches(tags)) {
        return true;
      }
    }

    return false;
  };

  Or.prototype.asOverpass = function () {
    var choices = [];

    for (var _i = 0, _a = this.or; _i < _a.length; _i++) {
      var tagsFilter = _a[_i];
      var subChoices = tagsFilter.asOverpass();

      for (var _b = 0, subChoices_1 = subChoices; _b < subChoices_1.length; _b++) {
        var subChoice = subChoices_1[_b];
        choices.push(subChoice);
      }
    }

    return choices;
  };

  Or.prototype.substituteValues = function (tags) {
    var newChoices = [];

    for (var _i = 0, _a = this.or; _i < _a.length; _i++) {
      var c = _a[_i];
      newChoices.push(c.substituteValues(tags));
    }

    return new Or(newChoices);
  };

  return Or;
}();

exports.Or = Or;

var And =
/** @class */
function () {
  function And(and) {
    this.and = and;
  }

  And.prototype.matches = function (tags) {
    for (var _i = 0, _a = this.and; _i < _a.length; _i++) {
      var tagsFilter = _a[_i];

      if (!tagsFilter.matches(tags)) {
        return false;
      }
    }

    return true;
  };

  And.prototype.combine = function (filter, choices) {
    var values = [];

    for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
      var or = choices_1[_i];
      values.push(filter + or);
    }

    return values;
  };

  And.prototype.asOverpass = function () {
    var allChoices = null;

    for (var _i = 0, _a = this.and; _i < _a.length; _i++) {
      var andElement = _a[_i];
      var andElementFilter = andElement.asOverpass();

      if (allChoices === null) {
        allChoices = andElementFilter;
        continue;
      }

      var newChoices = [];

      for (var _b = 0, allChoices_1 = allChoices; _b < allChoices_1.length; _b++) {
        var choice = allChoices_1[_b];
        newChoices.push(this.combine(choice, andElementFilter));
      }

      allChoices = newChoices;
    }

    return allChoices;
  };

  And.prototype.substituteValues = function (tags) {
    var newChoices = [];

    for (var _i = 0, _a = this.and; _i < _a.length; _i++) {
      var c = _a[_i];
      newChoices.push(c.substituteValues(tags));
    }

    return new And(newChoices);
  };

  return And;
}();

exports.And = And;

var TagUtils =
/** @class */
function () {
  function TagUtils() {}

  TagUtils.proprtiesToKV = function (properties) {
    var result = [];

    for (var k in properties) {
      result.push({
        k: k,
        v: properties[k]
      });
    }

    return result;
  };

  TagUtils.ApplyTemplate = function (template, tags) {
    for (var k in tags) {
      while (template.indexOf("{" + k + "}") >= 0) {
        template = template.replace("{" + k + "}", tags[k]);
      }
    }

    return template;
  };

  return TagUtils;
}();

exports.TagUtils = TagUtils;
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44455" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","Logic/TagsFilter.ts"], null)
//# sourceMappingURL=/Logic/TagsFilter.js.map