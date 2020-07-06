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
})({"UI/UIElement.ts":[function(require,module,exports) {
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
},{}],"UI/Base/FixedUiElement.ts":[function(require,module,exports) {
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
exports.FixedUiElement = void 0;

var UIElement_1 = require("../UIElement");

var FixedUiElement =
/** @class */
function (_super) {
  __extends(FixedUiElement, _super);

  function FixedUiElement(html) {
    var _this = _super.call(this, undefined) || this;

    _this._html = html;
    return _this;
  }

  FixedUiElement.prototype.InnerRender = function () {
    return this._html;
  };

  return FixedUiElement;
}(UIElement_1.UIElement);

exports.FixedUiElement = FixedUiElement;
},{"../UIElement":"UI/UIElement.ts"}],"UI/Base/Button.ts":[function(require,module,exports) {
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
exports.Button = void 0;

var UIElement_1 = require("../UIElement");

var Button =
/** @class */
function (_super) {
  __extends(Button, _super);

  function Button(text, onclick, clss) {
    if (clss === void 0) {
      clss = "";
    }

    var _this = _super.call(this, undefined) || this;

    _this._text = text;
    _this._onclick = onclick;

    if (clss !== "") {
      _this._clss = "class='" + clss + "'";
    } else {
      _this._clss = "";
    }

    return _this;
  }

  Button.prototype.InnerRender = function () {
    return "<form>" + "<button id='button-" + this.id + "' type='button' " + this._clss + ">" + this._text.Render() + "</button>" + "</form>";
  };

  Button.prototype.InnerUpdate = function (htmlElement) {
    _super.prototype.InnerUpdate.call(this, htmlElement);

    var self = this;
    console.log("Update for ", htmlElement);

    document.getElementById("button-" + this.id).onclick = function () {
      console.log("Clicked");

      self._onclick();
    };
  };

  return Button;
}(UIElement_1.UIElement);

exports.Button = Button;
},{"../UIElement":"UI/UIElement.ts"}],"UI/SimpleAddUI.ts":[function(require,module,exports) {
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
exports.SimpleAddUI = void 0;

var UIElement_1 = require("./UIElement");

var FixedUiElement_1 = require("./Base/FixedUiElement");

var Button_1 = require("./Base/Button");
/**
 * Asks to add a feature at the last clicked location, at least if zoom is sufficient
 */


var SimpleAddUI =
/** @class */
function (_super) {
  __extends(SimpleAddUI, _super);

  function SimpleAddUI(zoomlevel, lastClickLocation, changes, selectedElement, dataIsLoading, userDetails, addButtons) {
    var _this = _super.call(this, zoomlevel) || this;

    _this._zoomlevel = zoomlevel;
    _this._lastClickLocation = lastClickLocation;
    _this._changes = changes;
    _this._selectedElement = selectedElement;
    _this._dataIsLoading = dataIsLoading;
    _this._userDetails = userDetails;

    _this.ListenTo(userDetails);

    _this.ListenTo(dataIsLoading);

    _this._addButtons = [];

    for (var _i = 0, addButtons_1 = addButtons; _i < addButtons_1.length; _i++) {
      var option = addButtons_1[_i]; // <button type='button'> looks SO retarded
      // the default type of button is 'submit', which performs a POST and page reload

      var button = new Button_1.Button(new FixedUiElement_1.FixedUiElement("Voeg hier een " + option.name + " toe"), _this.CreatePoint(option));

      _this._addButtons.push(button);
    }

    return _this;
  }

  SimpleAddUI.prototype.CreatePoint = function (option) {
    var self = this;
    return function () {
      console.log("Creating a new ", option.name, " at last click location");
      var loc = self._lastClickLocation.data;

      var feature = self._changes.createElement(option.tags, loc.lat, loc.lon);

      option.layerToAddTo.AddNewElement(feature);

      self._selectedElement.setData(feature.properties);
    };
  };

  SimpleAddUI.prototype.InnerRender = function () {
    var header = "<h2>Geen selectie</h2>" + "Je klikte ergens waar er nog geen gezochte data is.<br/>";

    if (this._zoomlevel.data.zoom < 19) {
      return header + "Zoom verder in om een element toe te voegen.";
    }

    if (this._dataIsLoading.data) {
      return header + "De data is nog aan het laden. Nog even geduld, dan kan je een punt toevoegen";
    }

    if (!this._userDetails.data.loggedIn) {
      return header + "<a class='activate-osm-authentication'>Gelieve je aan te melden om een nieuw punt toe te voegen</a>";
    }

    var html = "";

    for (var _i = 0, _a = this._addButtons; _i < _a.length; _i++) {
      var button = _a[_i];
      html += button.Render();
    }

    return header + html;
  };

  SimpleAddUI.prototype.InnerUpdate = function (htmlElement) {
    _super.prototype.InnerUpdate.call(this, htmlElement);

    for (var _i = 0, _a = this._addButtons; _i < _a.length; _i++) {
      var button = _a[_i];
      button.Update();
    }

    this._userDetails.data.osmConnection.registerActivateOsmAUthenticationClass();
  };

  return SimpleAddUI;
}(UIElement_1.UIElement);

exports.SimpleAddUI = SimpleAddUI;
},{"./UIElement":"UI/UIElement.ts","./Base/FixedUiElement":"UI/Base/FixedUiElement.ts","./Base/Button":"UI/Base/Button.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","UI/SimpleAddUI.ts"], null)
//# sourceMappingURL=/UI/SimpleAddUI.js.map