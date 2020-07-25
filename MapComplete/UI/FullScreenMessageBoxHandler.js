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
      return this;
    }

    var self = this;
    source.addCallback(function () {
      self.Update();
    });
    return this;
  };

  UIElement.prototype.onClick = function (f) {
    this._onClick = f;
    this.Update();
    return this;
  };

  UIElement.prototype.Update = function () {
    if (UIElement.runningFromConsole) {
      return;
    }

    var element = document.getElementById(this.id);

    if (element === undefined || element === null) {
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

      element.onclick = function (e) {
        // @ts-ignore
        if (e.consumed) {
          return;
        }

        self_1._onClick(); // @ts-ignore


        e.consumed = true;
      };

      element.style.pointerEvents = "all";
      element.style.cursor = "pointer";
    }

    this.InnerUpdate(element);

    for (var i in this) {
      var child = this[i];

      if (child instanceof UIElement) {
        child.Update();
      } else if (child instanceof Array) {
        for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
          var ch = child_1[_i];

          if (ch instanceof UIElement) {
            ch.Update();
          }
        }
      }
    }
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
      throw "SEVERE: could not attach UIElement to " + divId;
    }

    element.innerHTML = this.Render();
    this.Update();
    return this;
  };

  UIElement.prototype.Activate = function () {
    for (var i in this) {
      var child = this[i];

      if (child instanceof UIElement) {
        child.Activate();
      } else if (child instanceof Array) {
        for (var _i = 0, child_2 = child; _i < child_2.length; _i++) {
          var ch = child_2[_i];

          if (ch instanceof UIElement) {
            ch.Activate();
          }
        }
      }
    }
  };

  ;

  UIElement.prototype.IsEmpty = function () {
    return this.InnerRender() === "";
  };

  UIElement.nextId = 0; // WOrkaround as document is not defined

  UIElement.runningFromConsole = false;
  return UIElement;
}();

exports.UIElement = UIElement;
},{}],"UI/UIEventSource.ts":[function(require,module,exports) {
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

  UIEventSource.flatten = function (source, possibleSources) {
    var _a;

    var sink = new UIEventSource((_a = source.data) === null || _a === void 0 ? void 0 : _a.data);
    source.addCallback(function (latestData) {
      sink.setData(latestData === null || latestData === void 0 ? void 0 : latestData.data);
    });

    for (var _i = 0, possibleSources_1 = possibleSources; _i < possibleSources_1.length; _i++) {
      var possibleSource = possibleSources_1[_i];
      possibleSource.addCallback(function () {
        var _a;

        sink.setData((_a = source.data) === null || _a === void 0 ? void 0 : _a.data);
      });
    }

    return sink;
  };

  UIEventSource.prototype.map = function (f, extraSources) {
    if (extraSources === void 0) {
      extraSources = [];
    }

    var self = this;

    var update = function update() {
      newSource.setData(f(self.data));
      newSource.ping();
    };

    this.addCallback(update);

    for (var _i = 0, extraSources_1 = extraSources; _i < extraSources_1.length; _i++) {
      var extraSource = extraSources_1[_i];
      extraSource.addCallback(update);
    }

    var newSource = new UIEventSource(f(this.data));
    return newSource;
  };

  UIEventSource.prototype.syncWith = function (otherSource) {
    this.addCallback(function (latest) {
      return otherSource.setData(latest);
    });
    var self = this;
    otherSource.addCallback(function (latest) {
      return self.setData(latest);
    });

    if (this.data === undefined) {
      this.setData(otherSource.data);
    } else {
      otherSource.setData(this.data);
    }

    return this;
  };

  return UIEventSource;
}();

exports.UIEventSource = UIEventSource;
},{}],"Logic/LocalStorageSource.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageSource = void 0;

var UIEventSource_1 = require("../UI/UIEventSource");

var LocalStorageSource =
/** @class */
function () {
  function LocalStorageSource() {}

  LocalStorageSource.Get = function (key, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = undefined;
    } //*
    // ignore when running from the console


    return new UIEventSource_1.UIEventSource(defaultValue);
    /*/
    const saved = localStorage.getItem(key);
    const source = new UIEventSource<string>(saved ?? defaultValue);
    source.addCallback((data) => {
    localStorage.setItem(key, data);
    console.log("Wriging ", key, data)
    });
    return source;
    //*/
  };

  return LocalStorageSource;
}();

exports.LocalStorageSource = LocalStorageSource;
},{"../UI/UIEventSource":"UI/UIEventSource.ts"}],"UI/Input/InputElement.ts":[function(require,module,exports) {
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
exports.InputElement = void 0;

var UIElement_1 = require("../UIElement");

var InputElement =
/** @class */
function (_super) {
  __extends(InputElement, _super);

  function InputElement() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return InputElement;
}(UIElement_1.UIElement);

exports.InputElement = InputElement;
},{"../UIElement":"UI/UIElement.ts"}],"UI/Input/DropDown.ts":[function(require,module,exports) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDown = void 0;

var UIEventSource_1 = require("../UIEventSource");

var InputElement_1 = require("./InputElement");

var Translations_1 = __importDefault(require("../i18n/Translations"));

var DropDown =
/** @class */
function (_super) {
  __extends(DropDown, _super);

  function DropDown(label, values, value) {
    if (value === void 0) {
      value = undefined;
    }

    var _this = _super.call(this, undefined) || this;

    _this._value = value !== null && value !== void 0 ? value : new UIEventSource_1.UIEventSource(undefined);
    _this._label = Translations_1.default.W(label);
    _this._values = values.map(function (v) {
      return {
        value: v.value,
        shown: Translations_1.default.W(v.shown)
      };
    });

    for (var _i = 0, _a = _this._values; _i < _a.length; _i++) {
      var v = _a[_i];

      _this.ListenTo(v.shown._source);
    }

    _this.ListenTo(_this._value);

    _this.onClick(function () {}); // by registering a click, the click event is consumed and doesn't bubble furter to other elements, e.g. checkboxes


    return _this;
  }

  DropDown.prototype.GetValue = function () {
    return this._value;
  };

  DropDown.prototype.ShowValue = function (t) {
    if (!this.IsValid(t)) {
      return false;
    }

    this._value.setData(t);
  };

  DropDown.prototype.IsValid = function (t) {
    for (var _i = 0, _a = this._values; _i < _a.length; _i++) {
      var value = _a[_i];

      if (value.value === t) {
        return true;
      }
    }

    return false;
  };

  DropDown.prototype.InnerRender = function () {
    if (this._values.length <= 1) {
      return "";
    }

    var options = "";

    for (var i = 0; i < this._values.length; i++) {
      options += "<option value='" + i + "'>" + this._values[i].shown.InnerRender() + "</option>";
    }

    return "<form>" + "<label for='dropdown-" + this.id + "'>" + this._label.Render() + " </label>" + "<select name='dropdown-" + this.id + "' id='dropdown-" + this.id + "'>" + options + "</select>" + "</form>";
  };

  DropDown.prototype.InnerUpdate = function (element) {
    var e = document.getElementById("dropdown-" + this.id);

    if (e === null) {
      return;
    }

    var self = this;

    e.onchange = function () {
      // @ts-ignore
      var index = parseInt(e.selectedIndex);

      self._value.setData(self._values[index].value);
    };

    var t = this._value.data;

    for (var i = 0; i < this._values.length; i++) {
      var value = this._values[i].value;

      if (value === t) {
        // @ts-ignore
        e.selectedIndex = i;
      }
    }
  };

  return DropDown;
}(InputElement_1.InputElement);

exports.DropDown = DropDown;
},{"../UIEventSource":"UI/UIEventSource.ts","./InputElement":"UI/Input/InputElement.ts","../i18n/Translations":"UI/i18n/Translations.ts"}],"UI/i18n/Locale.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LocalStorageSource_1 = require("../../Logic/LocalStorageSource");

var DropDown_1 = require("../Input/DropDown");

var Locale =
/** @class */
function () {
  function Locale() {}

  Locale.CreateLanguagePicker = function (layoutToUse, label) {
    if (label === void 0) {
      label = "";
    }

    return new DropDown_1.DropDown(label, layoutToUse.supportedLanguages.map(function (lang) {
      return {
        value: lang,
        shown: lang
      };
    }), Locale.language);
  };

  Locale.language = LocalStorageSource_1.LocalStorageSource.Get('language', "en");
  return Locale;
}();

exports.default = Locale;
},{"../../Logic/LocalStorageSource":"Logic/LocalStorageSource.ts","../Input/DropDown":"UI/Input/DropDown.ts"}],"UI/Base/Combine.ts":[function(require,module,exports) {
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

var UIElement_1 = require("../UIElement");

var Combine =
/** @class */
function (_super) {
  __extends(Combine, _super);

  function Combine(uiElements) {
    var _this = _super.call(this, undefined) || this;

    _this.clas = undefined;
    _this.uiElements = uiElements;
    return _this;
  }

  Combine.prototype.InnerRender = function () {
    var elements = "";

    for (var _i = 0, _a = this.uiElements; _i < _a.length; _i++) {
      var element = _a[_i];

      if (element instanceof UIElement_1.UIElement) {
        elements += element.Render();
      } else {
        elements += element;
      }
    }

    return elements;
  };

  Combine.prototype.InnerUpdate = function (htmlElement) {
    for (var _i = 0, _a = this.uiElements; _i < _a.length; _i++) {
      var element = _a[_i];

      if (element instanceof UIElement_1.UIElement) {
        element.Update();
      }
    }
  };

  return Combine;
}(UIElement_1.UIElement);

exports.default = Combine;
},{"../UIElement":"UI/UIElement.ts"}],"UI/i18n/Translation.ts":[function(require,module,exports) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var UIElement_1 = require("../UIElement");

var Locale_1 = __importDefault(require("./Locale"));

var Combine_1 = __importDefault(require("../Base/Combine"));

var Translation =
/** @class */
function (_super) {
  __extends(Translation, _super);

  function Translation(translations) {
    var _this = _super.call(this, Locale_1.default.language) || this;

    _this.translations = translations;
    return _this;
  }

  Translation.prototype.Subs = function (text
  /*Map<string, string | UIElement>*/
  ) {
    var newTranslations = {};

    for (var lang in this.translations) {
      var template = this.translations[lang];

      for (var k in text) {
        var combined = [];
        var parts = template.split("{" + k + "}");
        var el = text[k];
        var rtext = "";
        console.log(parts);

        if (typeof el === "string") {
          rtext = el;
        } else {
          Translation.forcedLanguage = lang; // This is a very dirty hack - it'll bite me one day

          rtext = el.InnerRender();
          console.log(rtext);
        }

        for (var i = 0; i < parts.length - 1; i++) {
          combined.push(parts[i]);
          combined.push(rtext);
        }

        combined.push(parts[parts.length - 1]);
        template = new Combine_1.default(combined).InnerRender();
      }

      newTranslations[lang] = template;
    }

    Translation.forcedLanguage = undefined;
    return new Translation(newTranslations);
  };

  Object.defineProperty(Translation.prototype, "txt", {
    get: function get() {
      var _a;

      var txt = this.translations[(_a = Translation.forcedLanguage) !== null && _a !== void 0 ? _a : Locale_1.default.language.data];

      if (txt !== undefined) {
        return txt;
      }

      var en = this.translations["en"];
      console.warn("No translation for language ", Locale_1.default.language.data, "for", en);

      if (en !== undefined) {
        return en;
      }

      for (var i in this.translations) {
        return this.translations[i]; // Return a random language
      }

      return "Missing translation";
    },
    enumerable: false,
    configurable: true
  });

  Translation.prototype.InnerRender = function () {
    return this.txt;
  };

  Translation.prototype.R = function () {
    return new Translation(this.translations).Render();
  };

  Translation.prototype.Clone = function () {
    return new Translation(this.translations);
  };

  Translation.forcedLanguage = undefined;
  return Translation;
}(UIElement_1.UIElement);

exports.default = Translation;
},{"../UIElement":"UI/UIElement.ts","./Locale":"UI/i18n/Locale.ts","../Base/Combine":"UI/Base/Combine.ts"}],"UI/Base/FixedUiElement.ts":[function(require,module,exports) {
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

    _this._html = html !== null && html !== void 0 ? html : "";
    return _this;
  }

  FixedUiElement.prototype.InnerRender = function () {
    return this._html;
  };

  return FixedUiElement;
}(UIElement_1.UIElement);

exports.FixedUiElement = FixedUiElement;
},{"../UIElement":"UI/UIElement.ts"}],"UI/i18n/Translations.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Translation_1 = __importDefault(require("./Translation"));

var Translation_2 = __importDefault(require("./Translation"));

var UIElement_1 = require("../UIElement");

var FixedUiElement_1 = require("../Base/FixedUiElement");

var Translations =
/** @class */
function () {
  function Translations() {
    throw "Translations is static. If you want to intitialize a new translation, use the singular form";
  }

  Translations.W = function (s) {
    if (s instanceof UIElement_1.UIElement) {
      return s;
    }

    return new FixedUiElement_1.FixedUiElement(s);
  };

  Translations.t = {
    cyclofix: {
      title: new Translation_2.default({
        en: 'Cyclofix - an open map for cyclists',
        nl: 'Cyclofix - een open kaart voor fietsers',
        fr: 'TODO: FRENCH TRANSLATION'
      }),
      description: new Translation_2.default({
        en: "On this map we want to collect data about the whereabouts of bicycle pumps and public racks in Brussels and everywhere else." + "As a result, cyclists will be able to quickly find the nearest infrastructure for their needs.",
        nl: "Op deze kaart willen we gegevens verzamelen over de locatie van fietspompen en openbare stelplaatsen in Brussel en overal ter wereld." + "Hierdoor kunnen fietsers snel de dichtstbijzijnde infrastructuur vinden die voldoet aan hun behoeften.",
        fr: "Sur cette carte, nous voulons collecter des données sur la localisation des pompes à vélo et des supports publics à Bruxelles." + "Les cyclistes pourront ainsi trouver rapidement l'infrastructure la plus proche de leurs besoins."
      }),
      freeFormPlaceholder: new Translation_2.default({
        en: 'specify',
        nl: 'specifieer',
        fr: 'TODO: fr'
      }),
      parking: {
        name: new Translation_2.default({
          en: 'bike parking',
          nl: 'fietsparking',
          fr: 'TODO: fr'
        }),
        title: new Translation_2.default({
          en: 'Bike parking',
          nl: 'Fietsparking',
          fr: 'TODO: fr'
        }),
        type: {
          render: new Translation_2.default({
            en: 'This is a bicycle parking of the type: {bicycle_parking}',
            nl: 'Dit is een fietsenparking van het type: {bicycle_parking}',
            fr: 'TODO: fr'
          }),
          template: new Translation_2.default({
            en: 'Some other type: $$$',
            nl: 'Een ander type: $$$',
            fr: 'TODO: fr'
          }),
          question: new Translation_2.default({
            en: 'What is the type of this bicycle parking?',
            nl: 'Van welk type is deze fietsenparking?',
            fr: 'TODO: fr'
          }),
          eg: new Translation_2.default({
            en: ", for example",
            nl: ", bijvoorbeeld"
          }),
          stands: new Translation_2.default({
            en: 'Staple racks',
            nl: 'Nietjes',
            fr: 'TODO: fr'
          }),
          wall_loops: new Translation_2.default({
            en: 'Wheel rack/loops',
            nl: 'Wielrek/lussen',
            fr: 'TODO: fr'
          }),
          handlebar_holder: new Translation_2.default({
            en: 'Handlebar holder',
            nl: 'Stuurhouder',
            fr: 'TODO: fr'
          }),
          shed: new Translation_2.default({
            en: 'Shed',
            nl: 'Schuur',
            fr: 'TODO: fr'
          }),
          rack: new Translation_2.default({
            en: 'Rack',
            nl: 'Rek',
            fr: 'TODO: fr'
          }),
          "two-tier": new Translation_2.default({
            en: 'Two-tiered',
            nl: 'Dubbel (twee verdiepingen)',
            fr: 'TODO: fr'
          })
        },
        operator: {
          render: new Translation_2.default({
            en: 'This bike parking is operated by {operator}',
            nl: 'Deze fietsenparking wordt beheerd door {operator}',
            fr: 'TODO: fr'
          }),
          template: new Translation_2.default({
            en: 'A different operator: $$$',
            nl: 'Een andere beheerder: $$$',
            fr: 'TODO: fr'
          }),
          question: new Translation_2.default({
            en: 'Who operates this bike station (name of university, shop, city...)?',
            nl: 'Wie beheert deze fietsenparking (naam universiteit, winkel, stad...)?',
            fr: 'TODO: fr'
          }),
          private: new Translation_2.default({
            en: 'Operated by a private person',
            nl: 'Wordt beheerd door een privépersoon',
            fr: 'TODO: fr'
          })
        }
      },
      station: {
        name: new Translation_2.default({
          en: 'bike station (repair, pump or both)',
          nl: 'fietsstation (herstel, pomp of allebei)',
          fr: 'TODO: fr'
        }),
        title: new Translation_2.default({
          en: 'Bike station',
          nl: 'Fietsstation',
          fr: 'TODO: fr'
        }),
        manometer: {
          question: new Translation_2.default({
            en: 'Does the pump have a pressure indicator or manometer?',
            nl: 'Heeft deze pomp een luchtdrukmeter?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'There is a manometer',
            nl: 'Er is een luchtdrukmeter',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'There is no manometer',
            nl: 'Er is geen luchtdrukmeter',
            fr: 'TODO: fr'
          }),
          broken: new Translation_2.default({
            en: 'There is manometer but it is broken',
            nl: 'Er is een luchtdrukmeter maar die is momenteel defect',
            fr: 'TODO: fr'
          })
        },
        electric: {
          question: new Translation_2.default({
            en: 'Is this an electric bike pump?',
            nl: 'Is dit een electrische fietspomp?',
            fr: 'TODO: fr'
          }),
          manual: new Translation_2.default({
            en: 'Manual pump',
            nl: 'Manuele pomp',
            fr: 'TODO: fr'
          }),
          electric: new Translation_2.default({
            en: 'Electrical pump',
            nl: 'Electrische pomp',
            fr: 'TODO: fr'
          })
        },
        operational: {
          question: new Translation_2.default({
            en: 'Is the bike pump still operational?',
            nl: 'Werkt de fietspomp nog?',
            fr: 'TODO: fr'
          }),
          operational: new Translation_2.default({
            en: 'The bike pump is operational',
            nl: 'De fietspomp werkt nog',
            fr: 'TODO: fr'
          }),
          broken: new Translation_2.default({
            en: 'The bike pump is broken',
            nl: 'De fietspomp is kapot',
            fr: 'TODO: fr'
          })
        },
        valves: {
          question: new Translation_2.default({
            en: 'What valves are supported?',
            nl: 'Welke ventielen werken er met de pomp?',
            fr: 'TODO: fr'
          }),
          default: new Translation_2.default({
            en: 'There is a default head, so Dunlop, Sclaverand and auto',
            nl: 'Er is een standaard aansluiting, die dus voor Dunlop, Sclaverand en auto\'s werkt',
            fr: 'TODO: fr'
          }),
          dunlop: new Translation_2.default({
            en: 'Only Dunlop',
            nl: 'Enkel Dunlop',
            fr: 'TODO: fr'
          }),
          sclaverand: new Translation_2.default({
            en: 'Only Sclaverand (also known as Presta)',
            nl: 'Enkel Sclaverand (ook gekend als Presta)',
            fr: 'TODO: fr'
          }),
          auto: new Translation_2.default({
            en: 'Only for cars',
            nl: 'Enkel voor auto\'s',
            fr: 'TODO: fr'
          }),
          render: new Translation_2.default({
            en: 'This pump supports the following valves: {valves}',
            nl: 'Deze pomp werkt met de volgende ventielen: {valves}',
            fr: 'TODO: fr'
          }),
          template: new Translation_2.default({
            en: 'Some other valve(s): $$$',
            nl: 'Een ander type ventiel(en): $$$',
            fr: 'TODO: fr'
          })
        },
        chain: {
          question: new Translation_2.default({
            en: 'Does this bike station have a special tool to repair your bike chain?',
            nl: 'Heeft dit fietsstation een speciale reparatieset voor je ketting?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'There is a chain tool',
            nl: 'Er is een reparatieset voor je ketting',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'There is no chain tool',
            nl: 'Er is geen reparatieset voor je ketting',
            fr: 'TODO: fr'
          })
        },
        operator: {
          render: new Translation_2.default({
            en: 'This bike station is operated by {operator}',
            nl: 'Dit fietsstation wordt beheerd door {operator}',
            fr: 'TODO: fr'
          }),
          template: new Translation_2.default({
            en: 'A different operator: $$$',
            nl: 'Een andere beheerder: $$$',
            fr: 'TODO: fr'
          }),
          question: new Translation_2.default({
            en: 'Who operates this bike station (name of university, shop, city...)?',
            nl: 'Wie beheert dit fietsstation (naam universiteit, winkel, stad...)?',
            fr: 'TODO: fr'
          }),
          private: new Translation_2.default({
            en: 'Operated by a private person',
            nl: 'Wordt beheerd door een privépersoon',
            fr: 'TODO: fr'
          })
        },
        services: {
          question: new Translation_2.default({
            en: 'Which services are available at this bike station?',
            nl: 'Welke functies biedt dit fietsstation?',
            fr: 'TODO: fr'
          }),
          pump: new Translation_2.default({
            // Note: this previously read: a pump is available. It is not because the pump is present, that it is available (e.g. broken)
            en: 'There is only a pump present',
            nl: 'Er is enkel een pomp aanwezig',
            fr: 'TODO: fr'
          }),
          tools: new Translation_2.default({
            en: 'There are only tools (screwdrivers, pliers...) aanwezig',
            nl: 'Er is enkel gereedschap aanwezig (schroevendraaier, tang...)',
            fr: 'TODO: fr'
          }),
          both: new Translation_2.default({
            en: 'There are both tools and a pump present',
            nl: 'Er is zowel een pomp als gereedschap aanwezig',
            fr: 'TODO: fr'
          })
        },
        stand: {
          question: new Translation_2.default({
            en: 'Does this bike station have a hook to suspend your bike with or a stand to elevate it?',
            nl: 'Heeft dit fietsstation een haak of standaard om je fiets op te hangen/zetten?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'There is a hook or stand',
            nl: 'Er is een haak of standaard',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'There is no hook or stand',
            nl: 'Er is geen haak of standaard',
            fr: 'TODO: fr'
          })
        }
      },
      shop: {
        name: new Translation_2.default({
          en: 'bike shop',
          nl: 'fietswinkel',
          fr: 'TODO: fr'
        }),
        title: new Translation_2.default({
          en: 'Bike shop',
          nl: 'Fietszaak',
          fr: 'TODO: fr'
        }),
        titleRepair: new Translation_2.default({
          en: 'Bike repair',
          nl: 'Fietsenmaker',
          fr: 'TODO: fr'
        }),
        titleShop: new Translation_2.default({
          en: 'Bike repair/shop',
          nl: 'Fietswinkel',
          fr: 'TODO: fr'
        }),
        titleNamed: new Translation_2.default({
          en: 'Bike repair/shop',
          nl: 'Fietszaak {name}',
          fr: 'TODO: fr'
        }),
        titleRepairNamed: new Translation_2.default({
          en: 'Bike shop',
          nl: 'Fietsenmaker {name}',
          fr: 'TODO: fr'
        }),
        titleShopNamed: new Translation_2.default({
          en: 'Bike repair/shop',
          nl: 'Fietswinkel {name}',
          fr: 'TODO: fr'
        }),
        retail: {
          question: new Translation_2.default({
            en: 'Does this shop sell bikes?',
            nl: 'Verkoopt deze winkel fietsen?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'This shop sells bikes',
            nl: 'Deze winkel verkoopt fietsen',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'This shop doesn\'t sell bikes',
            nl: 'Deze winkel verkoopt geen fietsen',
            fr: 'TODO: fr'
          })
        },
        repair: {
          question: new Translation_2.default({
            en: 'Does this shop repair bikes?',
            nl: 'Verkoopt deze winkel fietsen?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'This shop repairs bikes',
            nl: 'Deze winkel herstelt fietsen',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'This shop doesn\'t repair bikes',
            nl: 'Deze winkel herstelt geen fietsen',
            fr: 'TODO: fr'
          }),
          sold: new Translation_2.default({
            en: 'This shop only repairs bikes bought here',
            nl: 'Deze winkel herstelt enkel fietsen die hier werden gekocht',
            fr: 'TODO: fr'
          }),
          brand: new Translation_2.default({
            en: 'This shop only repairs bikes of a certain brand',
            nl: 'Deze winkel herstelt enkel fietsen van een bepaald merk',
            fr: 'TODO: fr'
          })
        },
        rental: {
          question: new Translation_2.default({
            en: 'Does this shop rent out bikes?',
            nl: 'Verhuurt deze winkel fietsen?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'This shop rents out bikes',
            nl: 'Deze winkel verhuurt fietsen',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'This shop doesn\'t rent out bikes',
            nl: 'Deze winkel verhuurt geen fietsen',
            fr: 'TODO: fr'
          })
        },
        pump: {
          question: new Translation_2.default({
            en: 'Does this shop offer a bike pump for use by anyone?',
            nl: 'Biedt deze winkel een fietspomp aan voor iedereen?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'This shop offers a bike pump for anyone',
            nl: 'Deze winkel biedt geen fietspomp aan voor eender wie',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'This shop doesn\'t offer a bike pump for anyone',
            nl: 'Deze winkel biedt een fietspomp aan voor iedereen',
            fr: 'TODO: fr'
          })
        },
        qName: {
          question: new Translation_2.default({
            en: 'What is the name of this bicycle shop?',
            nl: 'Wat is de naam van deze fietszaak?',
            fr: 'TODO: fr'
          }),
          render: new Translation_2.default({
            en: 'This bicycle shop is called {name}',
            nl: 'Deze fietszaak heet <b>{name}</b>',
            fr: 'TODO: fr'
          }),
          template: new Translation_2.default({
            en: 'This bicycle shop is called: $$$',
            nl: 'Deze fietszaak heet: <b>$$$</b>',
            fr: 'TODO: fr'
          })
        },
        secondHand: {
          question: new Translation_2.default({
            en: 'Does this shop sell second-hand bikes?',
            nl: 'Verkoopt deze winkel tweedehands fietsen?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'This shop sells second-hand bikes',
            nl: 'Deze winkel verkoopt tweedehands fietsen',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'This shop doesn\'t sell second-hand bikes',
            nl: 'Deze winkel verkoopt geen tweedehands fietsen',
            fr: 'TODO: fr'
          }),
          only: new Translation_2.default({
            en: 'This shop only sells second-hand bikes',
            nl: 'Deze winkel verkoopt enkel tweedehands fietsen',
            fr: 'TODO: fr'
          })
        },
        diy: {
          question: new Translation_2.default({
            en: 'Are there tools here to repair your own bike?',
            nl: 'Biedt deze winkel gereedschap aan om je fiets zelf te herstellen?',
            fr: 'TODO: fr'
          }),
          yes: new Translation_2.default({
            en: 'This shop offers tools for DIY repair',
            nl: 'Deze winkel biedt gereedschap aan om je fiets zelf te herstellen',
            fr: 'TODO: fr'
          }),
          no: new Translation_2.default({
            en: 'This shop doesn\'t offer tools for DIY repair',
            nl: 'Deze winkel biedt geen gereedschap aan om je fiets zelf te herstellen',
            fr: 'TODO: fr'
          })
        }
      },
      drinking_water: {
        title: new Translation_2.default({
          en: 'Drinking water',
          nl: "Drinkbaar water"
        })
      }
    },
    image: {
      addPicture: new Translation_2.default({
        en: 'Add picture',
        nl: 'Voeg foto toe',
        fr: 'TODO: fr'
      }),
      uploadingPicture: new Translation_2.default({
        en: 'Uploading your picture...',
        nl: 'Bezig met een foto te uploaden...',
        fr: 'TODO: fr'
      }),
      pleaseLogin: new Translation_2.default({
        en: 'Please login to add a picure or to answer questions',
        nl: 'Gelieve je aan te melden om een foto toe te voegen of vragen te beantwoorden',
        fr: 'TODO: fr'
      }),
      willBePublished: new Translation_2.default({
        en: 'Your picture will be published: ',
        nl: 'Jouw foto wordt gepubliceerd: ',
        fr: 'TODO: fr'
      }),
      cco: new Translation_2.default({
        en: 'in the public domain',
        nl: 'in het publiek domein',
        fr: 'TODO: fr'
      }),
      ccbs: new Translation_2.default({
        en: 'under the CC-BY-SA-license',
        nl: 'onder de CC-BY-SA-licentie',
        fr: 'TODO: fr'
      }),
      ccb: new Translation_2.default({
        en: 'under the CC-BY-license',
        nl: 'onder de CC-BY-licentie',
        fr: 'TODO: fr'
      })
    },
    centerMessage: {
      loadingData: new Translation_2.default({
        en: 'Loading data...',
        nl: 'Data wordt geladen...',
        fr: 'TODO: fr'
      }),
      zoomIn: new Translation_2.default({
        en: 'Zoom in to view or edit the data',
        nl: 'Zoom in om de data te zien en te bewerken',
        fr: 'TODO: fr'
      }),
      ready: new Translation_2.default({
        en: 'Done!',
        nl: 'Klaar!',
        fr: 'TODO: fr'
      })
    },
    general: {
      loginWithOpenStreetMap: new Translation_2.default({
        en: "Login with OpenStreetMap",
        nl: "Aanmelden met OpenStreetMap"
      }),
      getStarted: new Translation_2.default({
        en: "<span class='activate-osm-authentication'>Login with OpenStreetMap</span> or <a href='https://www.openstreetmap.org/user/new' target='_blank'>make a free account to get started</a>",
        nl: "<span class='activate-osm-authentication'>Meld je aan met je OpenStreetMap-account</span> of <a href='https://www.openstreetmap.org/user/new' target='_blank'>maak snel en gratis een account om te beginnen</a>"
      }),
      welcomeBack: new Translation_2.default({
        en: "You are logged in, welcome back!",
        nl: "Je bent aangemeld. Welkom terug!"
      }),
      search: {
        search: new Translation_1.default({
          en: "Search a location",
          nl: "Zoek naar een locatie"
        }),
        searching: new Translation_1.default({
          en: "Searching...",
          nl: "Aan het zoeken..."
        }),
        nothing: new Translation_1.default({
          en: "Nothing found...",
          nl: "Niet gevonden..."
        }),
        error: new Translation_1.default({
          en: "Something went wrong...",
          nl: "Niet gelukt..."
        })
      },
      returnToTheMap: new Translation_2.default({
        en: "Return to the map",
        nl: "Naar de kaart"
      }),
      save: new Translation_2.default({
        en: "Save",
        nl: "Opslaan"
      }),
      cancel: new Translation_2.default({
        en: "Cancel",
        nl: "Annuleren"
      }),
      skip: new Translation_2.default({
        en: "Skip this question",
        nl: "Vraag overslaan"
      }),
      oneSkippedQuestion: new Translation_2.default({
        en: "One question is skipped",
        nl: "Een vraag is overgeslaan"
      }),
      skippedQuestions: new Translation_2.default({
        en: "Some questions are skipped",
        nl: "Sommige vragen zijn overgeslaan"
      }),
      number: new Translation_2.default({
        en: "number",
        nl: "getal"
      }),
      osmLinkTooltip: new Translation_2.default({
        en: "See this object on OpenStreetMap for history and more editing options",
        nl: "Bekijk dit object op OpenStreetMap waar geschiedenis en meer aanpasopties zijn"
      }),
      add: {
        addNew: new Translation_2.default({
          en: "Add a new {category} here",
          nl: "Voeg hier een {category} toe"
        }),
        header: new Translation_2.default({
          en: "<h2>No data</h2>You clicked somewhere where no data is known yet.<br/>",
          nl: "<h2>Geen selectie</h2>Je klikte ergens waar er nog geen data is.<br/>"
        }),
        pleaseLogin: new Translation_2.default({
          en: "<a class='activate-osm-authentication'>Please log in to add a new point</a>",
          nl: "<a class='activate-osm-authentication'>Gelieve je aan te melden om een punt to te voegen</a>"
        }),
        zoomInFurther: new Translation_2.default({
          en: "Zoom in further to add a point.",
          nl: "Gelieve verder in te zoomen om een punt toe te voegen"
        }),
        stillLoading: new Translation_2.default({
          en: "The data is still loading. Please wait a bit before you add a new point",
          nl: "De data wordt nog geladen. Nog even geduld en dan kan je een punt toevoegen."
        })
      },
      pickLanguage: new Translation_2.default({
        en: "Choose a language",
        nl: "Kies je taal"
      }),
      about: new Translation_2.default({
        en: "Easily edit and add OpenStreetMap for a certain theme",
        nl: "Easily edit and add OpenStreetMap for a certain theme"
      })
    }
  };
  return Translations;
}();

exports.default = Translations;
},{"./Translation":"UI/i18n/Translation.ts","../UIElement":"UI/UIElement.ts","../Base/FixedUiElement":"UI/Base/FixedUiElement.ts"}],"UI/FullScreenMessageBoxHandler.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreenMessageBoxHandler = void 0;

var Translations_1 = __importDefault(require("./i18n/Translations"));
/**
 * Handles the full screen popup on mobile
 */


var FullScreenMessageBoxHandler =
/** @class */
function () {
  function FullScreenMessageBoxHandler(uielement, onClear) {
    this._uielement = uielement;
    this.listenTo(uielement);
    this.update();

    if (window !== undefined) {
      window.onhashchange = function () {
        if (location.hash === "") {
          // No more element: back to the map!
          uielement.setData(undefined);
          onClear();
        }
      };
    }

    Translations_1.default.t.general.returnToTheMap.onClick(function () {
      uielement.setData(undefined);
      onClear();
    }).AttachTo("to-the-map");
  }

  FullScreenMessageBoxHandler.prototype.listenTo = function (uiEventSource) {
    var self = this;
    uiEventSource.addCallback(function () {
      self.update();
    });
  };

  FullScreenMessageBoxHandler.prototype.update = function () {
    var _a, _b;

    var wrapper = document.getElementById("messagesboxmobilewrapper");
    var gen = this._uielement.data;

    if (gen === undefined) {
      wrapper.classList.add("hidden");

      if (location.hash !== "") {
        location.hash = "";
      }

      return;
    }

    location.hash = "#element";
    wrapper.classList.remove("hidden");
    (_b = (_a = gen === null || gen === void 0 ? void 0 : gen.HideOnEmpty(true)) === null || _a === void 0 ? void 0 : _a.AttachTo("messagesboxmobile")) === null || _b === void 0 ? void 0 : _b.Activate();
  };

  return FullScreenMessageBoxHandler;
}();

exports.FullScreenMessageBoxHandler = FullScreenMessageBoxHandler;
},{"./i18n/Translations":"UI/i18n/Translations.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45937" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","UI/FullScreenMessageBoxHandler.ts"], null)
//# sourceMappingURL=/UI/FullScreenMessageBoxHandler.js.map