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
})({"UI/Img.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Img = void 0;

var Img =
/** @class */
function () {
  function Img() {}

  Img.osmAbstractLogo = "<svg class='osm-logo' xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" width=\"24px\" version=\"1.1\" viewBox=\"0 0 66 64\">" + "    <g transform=\"translate(-0.849, -61)\">\n" + "    <path d=\"M0.849,61 L6.414,75.609 L0.849,90.217 L6.414,104.826 L0.849,119.435 L4.266,120.739 L22.831,102.183 L26.162,102.696 L30.205,98.652 C27.819,95.888 26.033,92.59 25.057,88.948 L26.953,87.391 C26.627,85.879 26.449,84.313 26.449,82.704 C26.449,74.67 30.734,67.611 37.136,63.696 L30.066,61 L15.457,66.565 L0.849,61 z\"></path>" + "        <path d=\"M48.71,64.617 C48.406,64.617 48.105,64.629 47.805,64.643 C47.52,64.657 47.234,64.677 46.953,64.704 C46.726,64.726 46.499,64.753 46.275,64.783 C46.039,64.814 45.811,64.847 45.579,64.887 C45.506,64.9 45.434,64.917 45.362,64.93 C45.216,64.958 45.072,64.987 44.927,65.017 C44.812,65.042 44.694,65.06 44.579,65.087 C44.442,65.119 44.307,65.156 44.17,65.191 C43.943,65.25 43.716,65.315 43.492,65.383 C43.323,65.433 43.155,65.484 42.988,65.539 C42.819,65.595 42.65,65.652 42.483,65.713 C42.475,65.716 42.466,65.719 42.457,65.722 C35.819,68.158 31.022,74.369 30.649,81.774 C30.633,82.083 30.622,82.391 30.622,82.704 C30.622,83.014 30.631,83.321 30.649,83.626 C30.649,83.629 30.648,83.632 30.649,83.635 C30.662,83.862 30.681,84.088 30.701,84.313 C31.466,93.037 38.377,99.948 47.101,100.713 C47.326,100.733 47.552,100.754 47.779,100.765 C47.782,100.765 47.785,100.765 47.788,100.765 C48.093,100.783 48.399,100.791 48.709,100.791 C53.639,100.791 58.096,98.833 61.353,95.652 C61.532,95.477 61.712,95.304 61.883,95.122 C61.913,95.09 61.941,95.058 61.97,95.026 C61.98,95.015 61.987,95.002 61.996,94.991 C62.132,94.845 62.266,94.698 62.396,94.548 C62.449,94.487 62.501,94.426 62.553,94.365 C62.594,94.316 62.634,94.267 62.675,94.217 C62.821,94.04 62.961,93.861 63.101,93.678 C63.279,93.444 63.456,93.199 63.622,92.956 C63.956,92.471 64.267,91.97 64.553,91.452 C64.661,91.257 64.757,91.06 64.857,90.861 C64.89,90.796 64.93,90.735 64.962,90.67 C64.98,90.633 64.996,90.594 65.014,90.556 C65.125,90.324 65.234,90.09 65.336,89.852 C65.349,89.82 65.365,89.789 65.379,89.756 C65.48,89.517 65.575,89.271 65.666,89.026 C65.678,88.994 65.689,88.962 65.701,88.93 C65.792,88.679 65.881,88.43 65.962,88.174 C65.97,88.148 65.98,88.122 65.988,88.096 C66.069,87.832 66.144,87.564 66.214,87.296 C66.219,87.275 66.226,87.255 66.231,87.235 C66.301,86.962 66.365,86.686 66.423,86.409 C66.426,86.391 66.428,86.374 66.431,86.356 C66.445,86.291 66.453,86.223 66.466,86.156 C66.511,85.925 66.552,85.695 66.588,85.461 C66.632,85.169 66.671,84.878 66.701,84.583 C66.701,84.574 66.701,84.565 66.701,84.556 C66.731,84.258 66.755,83.955 66.77,83.652 C66.77,83.646 66.77,83.641 66.77,83.635 C66.786,83.326 66.797,83.017 66.797,82.704 C66.797,72.69 58.723,64.617 48.71,64.617 z\"></path>" + "        <path d=\"M62.936,99.809 C59.074,103.028 54.115,104.965 48.71,104.965 C47.101,104.965 45.535,104.787 44.023,104.461 L42.466,106.357 C39.007,105.43 35.855,103.781 33.179,101.574 L28.996,105.765 L29.51,108.861 L13.953,124.426 L15.457,125 L30.066,119.435 L44.675,125 L59.283,119.435 L64.849,104.826 L62.936,99.809 z\"></path>" + "        </g>" + "</svg>";
  return Img;
}();

exports.Img = Img;
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33221" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","UI/Img.ts"], null)
//# sourceMappingURL=/UI/Img.js.map