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
})({"UI/UIEventSource.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIEventSource = void 0;

var UIEventSource =
/** @class */
function () {
  function UIEventSource(data) {
    this._callbacks = [];
    this.data = data;
  }

  UIEventSource.prototype.addCallback = function (callback) {
    this._callbacks.push(callback);

    return this;
  };

  UIEventSource.prototype.setData = function (t) {
    if (this.data === t) {
      return;
    }

    this.data = t;
    this.ping();
  };

  UIEventSource.prototype.ping = function () {
    for (var _i = 0, _a = this._callbacks; _i < _a.length; _i++) {
      var callback = _a[_i];
      callback(this.data);
    }
  };

  UIEventSource.prototype.map = function (f) {
    var self = this;
    this.addCallback(function () {
      newSource.setData(f(self.data));
      newSource.ping();
    });
    var newSource = new UIEventSource(f(this.data));
    return newSource;
  };

  return UIEventSource;
}();

exports.UIEventSource = UIEventSource;
},{}],"UI/UIElement.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIElement = void 0;

var UIElement =
/** @class */
function () {
  function UIElement(source) {
    this._hideIfEmpty = false;
    this.id = "ui-element-" + UIElement.nextId;
    this._source = source;
    UIElement.nextId++;
    this.ListenTo(source);
  }

  UIElement.prototype.ListenTo = function (source) {
    if (source === undefined) {
      return;
    }

    var self = this;
    source.addCallback(function () {
      self.Update();
    });
  };

  UIElement.prototype.onClick = function (f) {
    this._onClick = f;
    this.Update();
    return this;
  };

  UIElement.prototype.Update = function () {
    var element = document.getElementById(this.id);

    if (element === null || element === undefined) {
      // The element is not painted
      return;
    }

    element.innerHTML = this.InnerRender();

    if (this._hideIfEmpty) {
      if (element.innerHTML === "") {
        element.parentElement.style.display = "none";
      } else {
        element.parentElement.style.display = undefined;
      }
    }

    if (this._onClick !== undefined) {
      var self_1 = this;

      element.onclick = function () {
        self_1._onClick();
      };

      element.style.pointerEvents = "all";
      element.style.cursor = "pointer";
    }

    this.InnerUpdate(element);
  };

  UIElement.prototype.HideOnEmpty = function (hide) {
    this._hideIfEmpty = hide;
    this.Update();
    return this;
  }; // Called after the HTML has been replaced. Can be used for css tricks


  UIElement.prototype.InnerUpdate = function (htmlElement) {};

  UIElement.prototype.Render = function () {
    return "<span class='uielement' id='" + this.id + "'>" + this.InnerRender() + "</span>";
  };

  UIElement.prototype.AttachTo = function (divId) {
    var element = document.getElementById(divId);

    if (element === null) {
      console.log("SEVERE: could not attach UIElement to ", divId);
      return;
    }

    element.innerHTML = this.Render();
    this.Update();
    return this;
  };

  UIElement.prototype.Activate = function () {};

  ;

  UIElement.prototype.IsEmpty = function () {
    return this.InnerRender() === "";
  };

  UIElement.nextId = 0;
  return UIElement;
}();

exports.UIElement = UIElement;
},{}],"UI/AddButton.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddButton = void 0;

var UIEventSource_1 = require("./UIEventSource");

var UIElement_1 = require("./UIElement");

var AddButton =
/** @class */
function (_super) {
  __extends(AddButton, _super);

  function AddButton(basemap, changes, options) {
    var _this = _super.call(this, undefined) || this;

    _this.curentAddSelection = new UIEventSource_1.UIEventSource("");
    _this.SELECTING_POI = "selecting_POI";
    _this.PLACING_POI = "placing_POI";
    /*State is one of:
     * "": the default stated
     * "select_POI": show a 'select which POI to add' query (skipped if only one option exists)
     * "placing_point": shown while adding a point
     * ""
     */

    _this.state = new UIEventSource_1.UIEventSource("");
    _this.zoomlevel = basemap.Location;

    _this.ListenTo(_this.zoomlevel);

    _this._options = options;

    _this.ListenTo(_this.curentAddSelection);

    _this.ListenTo(_this.state);

    _this.state.setData(_this.SELECTING_POI);

    _this.changes = changes;
    var self = _this;
    basemap.map.on("click", function (e) {
      var location = e.latlng;
      console.log("Clicked at ", location);
      self.HandleClick(location.lat, location.lng);
    });
    basemap.map.on("mousemove", function () {
      if (self.state.data === self.PLACING_POI) {
        var icon = "crosshair";

        for (var _i = 0, _a = self._options; _i < _a.length; _i++) {
          var option = _a[_i];

          if (option.name === self.curentAddSelection.data && option.icon !== undefined) {
            icon = 'url("' + option.icon + '") 32 32 ,crosshair';
            console.log("Cursor icon: ", icon);
          }
        }

        document.getElementById('leafletDiv').style.cursor = icon;
      } else {
        // @ts-ignore
        document.getElementById('leafletDiv').style.cursor = '';
      }
    });
    return _this;
  }

  AddButton.prototype.HandleClick = function (lat, lon) {
    this.state.setData(this.SELECTING_POI);
    console.log("Handling click", lat, lon, this.curentAddSelection.data);

    for (var _i = 0, _a = this._options; _i < _a.length; _i++) {
      var option = _a[_i];

      if (this.curentAddSelection.data === option.name) {
        console.log("PLACING a ", option);
        var feature = this.changes.createElement(option.tags, lat, lon);
        option.layerToAddTo.AddNewElement(feature);
        return;
      }
    }
  };

  AddButton.prototype.InnerRender = function () {
    if (this.zoomlevel.data.zoom < 19) {
      return "Zoom in om een punt toe te voegen";
    }

    if (this.state.data === this.SELECTING_POI) {
      var html = "<form>";

      for (var _i = 0, _a = this._options; _i < _a.length; _i++) {
        var option = _a[_i]; // <button type='button'> looks SO retarded
        // the default type of button is 'submit', which performs a POST and page reload

        html += "<button type='button' class='addPOIoption' value='" + option.name + "'>Voeg een " + option.name + " toe</button><br/>";
      }

      html += "</form>";
      return html;
    }

    if (this.state.data === this.PLACING_POI) {
      return "<div id='clickOnMapInstruction'>Klik op de kaart om een nieuw punt toe te voegen<div>" + "<div id='cancelInstruction'>Klik hier om toevoegen te annuleren</div>";
    }

    if (this.curentAddSelection.data === "") {
      return "<span onclick>Voeg een punt toe...</span>";
    }

    return "Annuleer";
  };

  AddButton.prototype.InnerUpdate = function (htmlElement) {
    var self = this;

    htmlElement.onclick = function (event) {
      if (event.consumed) {
        return;
      }

      if (self.state.data === self.PLACING_POI) {
        self.state.setData(self.SELECTING_POI);
      }
    };

    var buttons = htmlElement.getElementsByClassName('addPOIoption');

    var _loop_1 = function _loop_1(button) {
      button.onclick = function (event) {
        self.curentAddSelection.setData(button.value);
        self.state.setData(self.PLACING_POI);
        event.consumed = true;
      };
    }; // @ts-ignore


    for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
      var button = buttons_1[_i];

      _loop_1(button);
    }
  };

  return AddButton;
}(UIElement_1.UIElement);

exports.AddButton = AddButton;
},{"./UIEventSource":"UI/UIEventSource.ts","./UIElement":"UI/UIElement.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","UI/AddButton.ts"], null)
//# sourceMappingURL=/UI/AddButton.js.map