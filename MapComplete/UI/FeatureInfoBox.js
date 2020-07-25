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
},{}],"UI/Base/VerticalCombine.ts":[function(require,module,exports) {
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
exports.VerticalCombine = void 0;

var UIElement_1 = require("../UIElement");

var VerticalCombine =
/** @class */
function (_super) {
  __extends(VerticalCombine, _super);

  function VerticalCombine(elements, className) {
    if (className === void 0) {
      className = undefined;
    }

    var _this = _super.call(this, undefined) || this;

    _this._elements = elements;
    _this._className = className;
    return _this;
  }

  VerticalCombine.prototype.InnerRender = function () {
    var html = "";

    for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
      var element = _a[_i];

      if (!element.IsEmpty()) {
        html += "<div>" + element.Render() + "</div>";
      }
    }

    if (html === "") {
      return "";
    }

    if (this._className === undefined) {
      return html;
    }

    return "<div class='" + this._className + "'>" + html + "</div>";
  };

  return VerticalCombine;
}(UIElement_1.UIElement);

exports.VerticalCombine = VerticalCombine;
},{"../UIElement":"UI/UIElement.ts"}],"UI/UIEventSource.ts":[function(require,module,exports) {
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
},{}],"Logic/TagsFilter.ts":[function(require,module,exports) {
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
exports.TagUtils = exports.Not = exports.And = exports.Or = exports.Tag = exports.Regex = exports.TagsFilter = void 0;

var TagsFilter =
/** @class */
function () {
  function TagsFilter() {}

  TagsFilter.prototype.matchesProperties = function (properties) {
    return this.matches(TagUtils.proprtiesToKV(properties));
  };

  return TagsFilter;
}();

exports.TagsFilter = TagsFilter;

var Regex =
/** @class */
function (_super) {
  __extends(Regex, _super);

  function Regex(k, r) {
    var _this = _super.call(this) || this;

    _this._k = k;
    _this._r = r;
    return _this;
  }

  Regex.prototype.asOverpass = function () {
    return ["['" + this._k + "'~'" + this._r + "']"];
  };

  Regex.prototype.matches = function (tags) {
    var _a;

    if (!(tags instanceof Array)) {
      throw "You used 'matches' on something that is not a list. Did you mean to use 'matchesProperties'?";
    }

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

        var matchCount = (_a = tag.v.match(this._r)) === null || _a === void 0 ? void 0 : _a.length;
        return (matchCount !== null && matchCount !== void 0 ? matchCount : 0) > 0;
      }
    }

    return false;
  };

  Regex.prototype.substituteValues = function (tags) {
    throw "Substituting values is not supported on regex tags";
  };

  return Regex;
}(TagsFilter);

exports.Regex = Regex;

var Tag =
/** @class */
function (_super) {
  __extends(Tag, _super);

  function Tag(key, value) {
    var _this = _super.call(this) || this;

    _this.key = key;
    _this.value = value;
    return _this;
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
}(TagsFilter);

exports.Tag = Tag;

var Or =
/** @class */
function (_super) {
  __extends(Or, _super);

  function Or(or) {
    var _this = _super.call(this) || this;

    _this.or = or;
    return _this;
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
}(TagsFilter);

exports.Or = Or;

var And =
/** @class */
function (_super) {
  __extends(And, _super);

  function And(and) {
    var _this = _super.call(this) || this;

    _this.and = and;
    return _this;
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
}(TagsFilter);

exports.And = And;

var Not =
/** @class */
function (_super) {
  __extends(Not, _super);

  function Not(not) {
    var _this = _super.call(this) || this;

    _this.not = not;
    return _this;
  }

  Not.prototype.asOverpass = function () {
    throw "Not supported yet";
  };

  Not.prototype.matches = function (tags) {
    return !this.not.matches(tags);
  };

  Not.prototype.substituteValues = function (tags) {
    return new Not(this.not.substituteValues(tags));
  };

  return Not;
}(TagsFilter);

exports.Not = Not;

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

    _this._html = html !== null && html !== void 0 ? html : "";
    return _this;
  }

  FixedUiElement.prototype.InnerRender = function () {
    return this._html;
  };

  return FixedUiElement;
}(UIElement_1.UIElement);

exports.FixedUiElement = FixedUiElement;
},{"../UIElement":"UI/UIElement.ts"}],"Logic/LocalStorageSource.ts":[function(require,module,exports) {
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
},{"../UIElement":"UI/UIElement.ts","./Locale":"UI/i18n/Locale.ts","../Base/Combine":"UI/Base/Combine.ts"}],"UI/i18n/Translations.ts":[function(require,module,exports) {
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
},{"./Translation":"UI/i18n/Translation.ts","../UIElement":"UI/UIElement.ts","../Base/FixedUiElement":"UI/Base/FixedUiElement.ts"}],"UI/SaveButton.ts":[function(require,module,exports) {
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
exports.SaveButton = void 0;

var UIElement_1 = require("./UIElement");

var Translations_1 = __importDefault(require("./i18n/Translations"));

var SaveButton =
/** @class */
function (_super) {
  __extends(SaveButton, _super);

  function SaveButton(value) {
    var _this = _super.call(this, value) || this;

    if (value === undefined) {
      throw "No event source for savebutton, something is wrong";
    }

    _this._value = value;
    return _this;
  }

  SaveButton.prototype.InnerRender = function () {
    if (this._value.data === undefined || this._value.data === null || this._value.data === "") {
      return "<span class='save-non-active'>" + Translations_1.default.t.general.save.Render() + "</span>";
    }

    return "<span class='save'>" + Translations_1.default.t.general.save.Render() + "</span>";
  };

  return SaveButton;
}(UIElement_1.UIElement);

exports.SaveButton = SaveButton;
},{"./UIElement":"UI/UIElement.ts","./i18n/Translations":"UI/i18n/Translations.ts"}],"UI/Base/VariableUIElement.ts":[function(require,module,exports) {
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
exports.VariableUiElement = void 0;

var UIElement_1 = require("../UIElement");

var VariableUiElement =
/** @class */
function (_super) {
  __extends(VariableUiElement, _super);

  function VariableUiElement(html, innerUpdate) {
    if (innerUpdate === void 0) {
      innerUpdate = undefined;
    }

    var _this = _super.call(this, html) || this;

    _this._html = html;
    _this._innerUpdate = innerUpdate;
    return _this;
  }

  VariableUiElement.prototype.InnerRender = function () {
    return this._html.data;
  };

  return VariableUiElement;
}(UIElement_1.UIElement);

exports.VariableUiElement = VariableUiElement;
},{"../UIElement":"UI/UIElement.ts"}],"Customizations/OnlyShowIf.ts":[function(require,module,exports) {
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
exports.OnlyShowIfConstructor = void 0;

var TagsFilter_1 = require("../Logic/TagsFilter");

var UIElement_1 = require("../UI/UIElement");

var OnlyShowIfConstructor =
/** @class */
function () {
  function OnlyShowIfConstructor(tagsFilter, embedded) {
    this._tagsFilter = tagsFilter;
    this._embedded = embedded;
  }

  OnlyShowIfConstructor.prototype.construct = function (dependencies) {
    return new OnlyShowIf(dependencies.tags, this._embedded.construct(dependencies), this._tagsFilter);
  };

  OnlyShowIfConstructor.prototype.IsKnown = function (properties) {
    if (!this.Matches(properties)) {
      return true;
    }

    return this._embedded.IsKnown(properties);
  };

  OnlyShowIfConstructor.prototype.IsQuestioning = function (properties) {
    if (!this.Matches(properties)) {
      return false;
    }

    return this._embedded.IsQuestioning(properties);
  };

  OnlyShowIfConstructor.prototype.Priority = function () {
    return this._embedded.Priority();
  };

  OnlyShowIfConstructor.prototype.Matches = function (properties) {
    return this._tagsFilter.matches(TagsFilter_1.TagUtils.proprtiesToKV(properties));
  };

  return OnlyShowIfConstructor;
}();

exports.OnlyShowIfConstructor = OnlyShowIfConstructor;

var OnlyShowIf =
/** @class */
function (_super) {
  __extends(OnlyShowIf, _super);

  function OnlyShowIf(tags, embedded, filter) {
    var _this = _super.call(this, tags) || this;

    _this._filter = filter;
    _this._embedded = embedded;
    return _this;
  }

  OnlyShowIf.prototype.Matches = function () {
    return this._filter.matches(TagsFilter_1.TagUtils.proprtiesToKV(this._source.data));
  };

  OnlyShowIf.prototype.InnerRender = function () {
    if (this.Matches()) {
      return this._embedded.Render();
    } else {
      return "";
    }
  };

  OnlyShowIf.prototype.Priority = function () {
    return this._embedded.Priority();
  };

  OnlyShowIf.prototype.IsKnown = function () {
    if (!this.Matches()) {
      return false;
    }

    return this._embedded.IsKnown();
  };

  OnlyShowIf.prototype.IsSkipped = function () {
    if (!this.Matches()) {
      return false;
    }

    return this._embedded.IsSkipped();
  };

  OnlyShowIf.prototype.IsQuestioning = function () {
    if (!this.Matches()) {
      return false;
    }

    return this._embedded.IsQuestioning();
  };

  OnlyShowIf.prototype.Activate = function () {
    this._embedded.Activate();
  };

  OnlyShowIf.prototype.Update = function () {
    this._embedded.Update();
  };

  return OnlyShowIf;
}(UIElement_1.UIElement);
},{"../Logic/TagsFilter":"Logic/TagsFilter.ts","../UI/UIElement":"UI/UIElement.ts"}],"UI/Input/TextField.ts":[function(require,module,exports) {
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
exports.TextField = void 0;

var UIEventSource_1 = require("../UIEventSource");

var InputElement_1 = require("./InputElement");

var Translations_1 = __importDefault(require("../i18n/Translations"));

var TextField =
/** @class */
function (_super) {
  __extends(TextField, _super);

  function TextField(options) {
    var _a, _b, _c, _d;

    var _this = _super.call(this, undefined) || this;
    /**
     * Pings and has the value data
     */


    _this.enterPressed = new UIEventSource_1.UIEventSource(undefined);
    var self = _this;
    _this.value = new UIEventSource_1.UIEventSource("");
    _this.mappedValue = (_a = options === null || options === void 0 ? void 0 : options.value) !== null && _a !== void 0 ? _a : new UIEventSource_1.UIEventSource(undefined);

    _this.mappedValue.addCallback(function () {
      return self.InnerUpdate();
    }); // @ts-ignore


    _this._fromString = (_b = options.fromString) !== null && _b !== void 0 ? _b : function (str) {
      return str;
    };

    _this.value.addCallback(function (str) {
      return _this.mappedValue.setData(options.fromString(str));
    });

    _this.mappedValue.addCallback(function (t) {
      return _this.value.setData(options.toString(t));
    });

    _this._placeholder = Translations_1.default.W((_c = options.placeholder) !== null && _c !== void 0 ? _c : "");

    _this.ListenTo(_this._placeholder._source);

    _this._toString = (_d = options.toString) !== null && _d !== void 0 ? _d : function (t) {
      return "" + t;
    };

    _this.mappedValue.addCallback(function (t) {
      if (t === undefined || t === null) {
        return;
      }

      var field = document.getElementById('text-' + _this.id);

      if (field === undefined || field === null) {
        return;
      } // @ts-ignore


      field.value = options.toString(t);
    });

    return _this;
  }

  TextField.prototype.GetValue = function () {
    return this.mappedValue;
  };

  TextField.prototype.ShowValue = function (t) {
    if (!this.IsValid(t)) {
      return false;
    }

    this.mappedValue.setData(t);
  };

  TextField.prototype.InnerRender = function () {
    return "<form onSubmit='return false' class='form-text-field'>" + ("<input type='text' placeholder='" + this._placeholder.InnerRender() + "' id='text-" + this.id + "'>") + "</form>";
  };

  TextField.prototype.InnerUpdate = function () {
    var _this = this;

    var field = document.getElementById('text-' + this.id);

    if (field === null) {
      return;
    }

    this.mappedValue.addCallback(function (data) {
      field.className = _this.mappedValue.data !== undefined ? "valid" : "invalid";
    });
    var self = this;

    field.oninput = function () {
      // @ts-ignore
      self.value.setData(field.value);
    };

    field.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        // @ts-ignore
        self.enterPressed.setData(field.value);
      }
    });

    if (this.IsValid(this.mappedValue.data)) {
      var expected = this._toString(this.mappedValue.data); // @ts-ignore


      if (field.value !== expected) {
        // @ts-ignore
        field.value = expected;
      }
    }
  };

  TextField.prototype.IsValid = function (t) {
    if (t === undefined || t === null) {
      return false;
    }

    var result = this._toString(t);

    return result !== undefined && result !== null;
  };

  TextField.prototype.Clear = function () {
    var field = document.getElementById('text-' + this.id);

    if (field !== undefined) {
      // @ts-ignore
      field.value = "";
    }
  };

  return TextField;
}(InputElement_1.InputElement);

exports.TextField = TextField;
},{"../UIEventSource":"UI/UIEventSource.ts","./InputElement":"UI/Input/InputElement.ts","../i18n/Translations":"UI/i18n/Translations.ts"}],"UI/Input/InputElementWrapper.ts":[function(require,module,exports) {
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
exports.InputElementWrapper = void 0;

var InputElement_1 = require("./InputElement");

var FixedUiElement_1 = require("../Base/FixedUiElement");

var InputElementWrapper =
/** @class */
function (_super) {
  __extends(InputElementWrapper, _super);

  function InputElementWrapper(pre, input, post) {
    var _this = _super.call(this, undefined) || this;

    _this.pre = typeof pre === 'string' ? new FixedUiElement_1.FixedUiElement(pre) : pre;
    _this.input = input;
    _this.post = typeof post === 'string' ? new FixedUiElement_1.FixedUiElement(post) : post;
    return _this;
  }

  InputElementWrapper.prototype.GetValue = function () {
    return this.input.GetValue();
  };

  InputElementWrapper.prototype.InnerRender = function () {
    return this.pre.Render() + this.input.Render() + this.post.Render();
  };

  InputElementWrapper.prototype.IsValid = function (t) {
    return this.input.IsValid(t);
  };

  return InputElementWrapper;
}(InputElement_1.InputElement);

exports.InputElementWrapper = InputElementWrapper;
},{"./InputElement":"UI/Input/InputElement.ts","../Base/FixedUiElement":"UI/Base/FixedUiElement.ts"}],"UI/Input/FixedInputElement.ts":[function(require,module,exports) {
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
exports.FixedInputElement = void 0;

var InputElement_1 = require("./InputElement");

var UIEventSource_1 = require("../UIEventSource");

var FixedUiElement_1 = require("../Base/FixedUiElement");

var FixedInputElement =
/** @class */
function (_super) {
  __extends(FixedInputElement, _super);

  function FixedInputElement(rendering, value) {
    var _this = _super.call(this, undefined) || this;

    _this.value = new UIEventSource_1.UIEventSource(value);
    _this.rendering = typeof rendering === 'string' ? new FixedUiElement_1.FixedUiElement(rendering) : rendering;
    return _this;
  }

  FixedInputElement.prototype.GetValue = function () {
    return this.value;
  };

  FixedInputElement.prototype.ShowValue = function (t) {
    return false;
  };

  FixedInputElement.prototype.InnerRender = function () {
    return this.rendering.Render();
  };

  FixedInputElement.prototype.IsValid = function (t) {
    return t == this.value.data;
  };

  return FixedInputElement;
}(InputElement_1.InputElement);

exports.FixedInputElement = FixedInputElement;
},{"./InputElement":"UI/Input/InputElement.ts","../UIEventSource":"UI/UIEventSource.ts","../Base/FixedUiElement":"UI/Base/FixedUiElement.ts"}],"UI/Input/RadioButton.ts":[function(require,module,exports) {
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
exports.RadioButton = void 0;

var UIEventSource_1 = require("../UIEventSource");

var InputElement_1 = require("./InputElement");

var RadioButton =
/** @class */
function (_super) {
  __extends(RadioButton, _super);

  function RadioButton(elements, selectFirstAsDefault) {
    if (selectFirstAsDefault === void 0) {
      selectFirstAsDefault = true;
    }

    var _this = _super.call(this, undefined) || this;

    _this._selectedElementIndex = new UIEventSource_1.UIEventSource(null);
    _this._elements = elements;
    _this._selectFirstAsDefault = selectFirstAsDefault;
    var self = _this;
    _this.value = UIEventSource_1.UIEventSource.flatten(_this._selectedElementIndex.map(function (selectedIndex) {
      if (selectedIndex !== undefined && selectedIndex !== null) {
        return elements[selectedIndex].GetValue();
      }
    }), elements.map(function (e) {
      return e.GetValue();
    }));

    _this.value.addCallback(function (t) {
      self.ShowValue(t);
    });

    var _loop_1 = function _loop_1(i) {
      // If an element is clicked, the radio button corresponding with it should be selected as well
      elements[i].onClick(function () {
        self._selectedElementIndex.setData(i);
      });
    };

    for (var i = 0; i < elements.length; i++) {
      _loop_1(i);
    }

    return _this;
  }

  RadioButton.prototype.IsValid = function (t) {
    for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
      var inputElement = _a[_i];

      if (inputElement.IsValid(t)) {
        return true;
      }
    }

    return false;
  };

  RadioButton.prototype.GetValue = function () {
    return this.value;
  };

  RadioButton.prototype.IdFor = function (i) {
    return 'radio-' + this.id + '-' + i;
  };

  RadioButton.prototype.InnerRender = function () {
    var body = "";
    var i = 0;

    for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
      var el = _a[_i];
      var htmlElement = '<input type="radio" id="' + this.IdFor(i) + '" name="radiogroup-' + this.id + '">' + '<label for="' + this.IdFor(i) + '">' + el.Render() + '</label>' + '<br>';
      body += htmlElement;
      i++;
    }

    return "<form id='" + this.id + "-form'>" + body + "</form>";
  };

  RadioButton.prototype.ShowValue = function (t) {
    if (t === undefined) {
      return false;
    }

    if (!this.IsValid(t)) {
      return false;
    } // We check that what is selected matches the previous rendering


    for (var i = 0; i < this._elements.length; i++) {
      var e = this._elements[i];

      if (e.IsValid(t)) {
        this._selectedElementIndex.setData(i);

        e.GetValue().setData(t);
        var radio = document.getElementById(this.IdFor(i)); // @ts-ignore

        radio === null || radio === void 0 ? void 0 : radio.checked = true;
        return;
      }
    }
  };

  RadioButton.prototype.InnerUpdate = function (htmlElement) {
    var self = this;

    function checkButtons() {
      for (var i = 0; i < self._elements.length; i++) {
        var el_1 = document.getElementById(self.IdFor(i)); // @ts-ignore

        if (el_1.checked) {
          self._selectedElementIndex.setData(i);
        }
      }
    }

    var el = document.getElementById(this.id);
    el.addEventListener("change", function () {
      checkButtons();
    });

    if (this._selectedElementIndex.data !== null) {
      var el_2 = document.getElementById(this.IdFor(this._selectedElementIndex.data));

      if (el_2) {
        // @ts-ignore
        el_2.checked = true;
        checkButtons();
      }
    } else if (this._selectFirstAsDefault) {
      this.ShowValue(this.value.data);

      if (this._selectedElementIndex.data === null || this._selectedElementIndex.data === undefined) {
        var el_3 = document.getElementById(this.IdFor(0));

        if (el_3) {
          // @ts-ignore
          el_3.checked = true;
          checkButtons();
        }
      }
    }
  };

  ;
  return RadioButton;
}(InputElement_1.InputElement);

exports.RadioButton = RadioButton;
},{"../UIEventSource":"UI/UIEventSource.ts","./InputElement":"UI/Input/InputElement.ts"}],"Customizations/TagRendering.ts":[function(require,module,exports) {
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
exports.TagRenderingOptions = void 0;

var UIElement_1 = require("../UI/UIElement");

var UIEventSource_1 = require("../UI/UIEventSource");

var TagsFilter_1 = require("../Logic/TagsFilter");

var FixedUiElement_1 = require("../UI/Base/FixedUiElement");

var SaveButton_1 = require("../UI/SaveButton");

var VariableUIElement_1 = require("../UI/Base/VariableUIElement");

var OnlyShowIf_1 = require("./OnlyShowIf");

var TextField_1 = require("../UI/Input/TextField");

var InputElementWrapper_1 = require("../UI/Input/InputElementWrapper");

var FixedInputElement_1 = require("../UI/Input/FixedInputElement");

var RadioButton_1 = require("../UI/Input/RadioButton");

var Translations_1 = __importDefault(require("../UI/i18n/Translations"));

var Locale_1 = __importDefault(require("../UI/i18n/Locale"));

var TagRenderingOptions =
/** @class */
function () {
  function TagRenderingOptions(options) {
    this.options = options;
  }

  TagRenderingOptions.prototype.OnlyShowIf = function (tagsFilter) {
    return new OnlyShowIf_1.OnlyShowIfConstructor(tagsFilter, this);
  };

  TagRenderingOptions.prototype.IsQuestioning = function (tags) {
    var _a;

    var tagsKV = TagsFilter_1.TagUtils.proprtiesToKV(tags);

    for (var _i = 0, _b = (_a = this.options.mappings) !== null && _a !== void 0 ? _a : []; _i < _b.length; _i++) {
      var oneOnOneElement = _b[_i];

      if (oneOnOneElement.k === null || oneOnOneElement.k.matches(tagsKV)) {
        return false;
      }
    }

    if (this.options.freeform !== undefined && tags[this.options.freeform.key] !== undefined) {
      return false;
    }

    if (this.options.question === undefined) {
      return false;
    }

    return true;
  };

  TagRenderingOptions.prototype.construct = function (dependencies) {
    return new TagRendering(dependencies.tags, dependencies.changes, this.options);
  };

  TagRenderingOptions.prototype.IsKnown = function (properties) {
    return !this.IsQuestioning(properties);
  };

  TagRenderingOptions.prototype.Priority = function () {
    var _a;

    return (_a = this.options.priority) !== null && _a !== void 0 ? _a : 0;
  };

  TagRenderingOptions.inputValidation = {
    "$": function $(str) {
      return true;
    },
    "string": function string(str) {
      return true;
    },
    "int": function int(str) {
      return str.indexOf(".") < 0 && !isNaN(Number(str));
    },
    "nat": function nat(str) {
      return str.indexOf(".") < 0 && !isNaN(Number(str)) && Number(str) > 0;
    },
    "float": function float(str) {
      return !isNaN(Number(str));
    }
  };
  return TagRenderingOptions;
}();

exports.TagRenderingOptions = TagRenderingOptions;

var TagRendering =
/** @class */
function (_super) {
  __extends(TagRendering, _super);

  function TagRendering(tags, changes, options) {
    var _a, _b;

    var _this = _super.call(this, tags) || this;

    _this._questionSkipped = new UIEventSource_1.UIEventSource(false);
    _this._editMode = new UIEventSource_1.UIEventSource(false);

    _this.ListenTo(Locale_1.default.language);

    var self = _this;

    _this.ListenTo(_this._questionSkipped);

    _this.ListenTo(_this._editMode);

    _this._userDetails = changes.login.userDetails;

    _this.ListenTo(_this._userDetails);

    if (options.question !== undefined) {
      _this._question = Translations_1.default.W(options.question);
    }

    _this._priority = (_a = options.priority) !== null && _a !== void 0 ? _a : 0;

    _this._tagsPreprocessor = function (properties) {
      if (options.tagsPreprocessor === undefined) {
        return properties;
      }

      var newTags = {};

      for (var k in properties) {
        newTags[k] = properties[k];
      }

      options.tagsPreprocessor(newTags);
      return newTags;
    };

    _this._mapping = [];
    _this._freeform = options.freeform;

    for (var _i = 0, _c = (_b = options.mappings) !== null && _b !== void 0 ? _b : []; _i < _c.length; _i++) {
      var choice = _c[_i];
      var choiceSubbed = {
        k: choice.k,
        txt: choice.txt,
        priority: choice.priority
      };

      if (choice.substitute) {
        choiceSubbed = {
          k: choice.k.substituteValues(options.tagsPreprocessor(_this._source.data)),
          txt: choice.txt,
          priority: choice.priority
        };
      }

      _this._mapping.push({
        k: choiceSubbed.k,
        txt: choiceSubbed.txt
      });
    } // Prepare the actual input element -> pick an appropriate implementation


    _this._questionElement = _this.InputElementFor(options);

    var save = function save() {
      var selection = self._questionElement.GetValue().data;

      if (selection) {
        changes.addTag(tags.data.id, selection);
      }

      self._editMode.setData(false);
    };

    var cancel = function cancel() {
      self._questionSkipped.setData(true);

      self._editMode.setData(false);

      self._source.ping(); // Send a ping upstream to render the next question

    }; // Setup the save button and it's action


    _this._saveButton = new SaveButton_1.SaveButton(_this._questionElement.GetValue()).onClick(save);
    _this._editButton = new FixedUiElement_1.FixedUiElement("");

    if (_this._question !== undefined) {
      _this._editButton = new FixedUiElement_1.FixedUiElement("<img class='editbutton' src='./assets/pencil.svg' alt='edit'>").onClick(function () {
        self._editMode.setData(true);

        self._questionElement.GetValue().setData(self.CurrentValue());
      });
    }

    var cancelContents = _this._editMode.map(function (isEditing) {
      if (isEditing) {
        return "<span class='skip-button'>" + Translations_1.default.t.general.cancel.R() + "</span>";
      } else {
        return "<span class='skip-button'>" + Translations_1.default.t.general.skip.R() + "</span>";
      }
    }, [Locale_1.default.language]); // And at last, set up the skip button


    _this._skipButton = new VariableUIElement_1.VariableUiElement(cancelContents).onClick(cancel);
    return _this;
  }

  TagRendering.prototype.InputElementFor = function (options) {
    var elements = [];

    if (options.mappings !== undefined) {
      var previousTexts = [];

      for (var _i = 0, _a = options.mappings; _i < _a.length; _i++) {
        var mapping = _a[_i];

        if (mapping.k === null) {
          continue;
        }

        if (previousTexts.indexOf(mapping.txt) >= 0) {
          continue;
        }

        previousTexts.push(mapping.txt);
        elements.push(this.InputElementForMapping(mapping));
      }
    }

    if (options.freeform !== undefined) {
      elements.push(this.InputForFreeForm(options.freeform));
    }

    if (elements.length == 0) {
      console.warn("WARNING: no tagrendering with following options:", options);
      return new FixedInputElement_1.FixedInputElement("This should not happen: no tag renderings defined", undefined);
    }

    if (elements.length == 1) {
      return elements[0];
    }

    return new RadioButton_1.RadioButton(elements, false);
  };

  TagRendering.prototype.InputElementForMapping = function (mapping) {
    return new FixedInputElement_1.FixedInputElement(mapping.txt, mapping.k);
  };

  TagRendering.prototype.InputForFreeForm = function (freeform) {
    if (freeform === undefined) {
      return undefined;
    }

    var prepost = Translations_1.default.W(freeform.template).InnerRender().split("$");
    var type = prepost[1];
    var isValid = TagRenderingOptions.inputValidation[type];

    var pickString = function pickString(string) {
      if (string === "" || string === undefined) {
        return undefined;
      }

      if (!isValid(string)) {
        return undefined;
      }

      var tag = new TagsFilter_1.Tag(freeform.key, string);

      if (freeform.extraTags === undefined) {
        return tag;
      }

      return new TagsFilter_1.And([tag, freeform.extraTags]);
    };

    var toString = function toString(tag) {
      if (tag instanceof TagsFilter_1.And) {
        return toString(tag.and[0]);
      } else if (tag instanceof TagsFilter_1.Tag) {
        return tag.value;
      }

      return undefined;
    };

    var inputElement;
    var textField = new TextField_1.TextField({
      placeholder: this._freeform.placeholder,
      fromString: pickString,
      toString: toString
    });
    return new InputElementWrapper_1.InputElementWrapper(prepost[0], textField, prepost[2]);
  };

  TagRendering.prototype.IsKnown = function () {
    var tags = TagsFilter_1.TagUtils.proprtiesToKV(this._source.data);

    for (var _i = 0, _a = this._mapping; _i < _a.length; _i++) {
      var oneOnOneElement = _a[_i];

      if (oneOnOneElement.k === null || oneOnOneElement.k.matches(tags)) {
        return true;
      }
    }

    return this._freeform !== undefined && this._source.data[this._freeform.key] !== undefined;
  };

  TagRendering.prototype.IsSkipped = function () {
    return this._questionSkipped.data;
  };

  TagRendering.prototype.CurrentValue = function () {
    var tags = TagsFilter_1.TagUtils.proprtiesToKV(this._source.data);

    for (var _i = 0, _a = this._mapping; _i < _a.length; _i++) {
      var oneOnOneElement = _a[_i];

      if (oneOnOneElement.k !== null && oneOnOneElement.k.matches(tags)) {
        return oneOnOneElement.k;
      }
    }

    if (this._freeform === undefined) {
      return undefined;
    }

    return new TagsFilter_1.Tag(this._freeform.key, this._source.data[this._freeform.key]);
  };

  TagRendering.prototype.IsQuestioning = function () {
    if (this.IsKnown()) {
      return false;
    }

    if (this._question === undefined) {
      // We don't ask this question in the first place
      return false;
    }

    if (this._questionSkipped.data) {
      // We don't ask for this question anymore, skipped by user
      return false;
    }

    return true;
  };

  TagRendering.prototype.RenderAnwser = function () {
    var _a;

    var tags = TagsFilter_1.TagUtils.proprtiesToKV(this._source.data);
    var freeform = new FixedUiElement_1.FixedUiElement("");
    var freeformScore = -10;

    if (this._freeform !== undefined && this._source.data[this._freeform.key] !== undefined) {
      freeform = this.ApplyTemplate(this._freeform.renderTemplate);
      freeformScore = 0;
    }

    var highestScore = -100;
    var highestTemplate = undefined;

    for (var _i = 0, _b = this._mapping; _i < _b.length; _i++) {
      var oneOnOneElement = _b[_i];

      if (oneOnOneElement.k == null || oneOnOneElement.k.matches(tags)) {
        // We have found a matching key -> we use the template, but only if it scores better
        var score = (_a = oneOnOneElement.priority) !== null && _a !== void 0 ? _a : oneOnOneElement.k === null ? -1 : 0;

        if (score > highestScore) {
          highestScore = score;
          highestTemplate = oneOnOneElement.txt;
        }
      }
    }

    if (freeformScore > highestScore) {
      return freeform;
    }

    if (highestTemplate !== undefined) {
      // we render the found template
      return this.ApplyTemplate(highestTemplate);
    }
  };

  TagRendering.prototype.InnerRender = function () {
    if (this.IsQuestioning() || this._editMode.data) {
      // Not yet known or questioning, we have to ask a question
      var question = this._question.Render();

      return "<div class='question'>" + "<span class='question-text'>" + question + "</span>" + (this._question.IsEmpty() ? "" : "<br/>") + "<div>" + this._questionElement.Render() + "</div>" + this._skipButton.Render() + this._saveButton.Render() + "</div>";
    }

    if (this.IsKnown()) {
      var answer = this.RenderAnwser();

      if (answer.IsEmpty()) {
        return "";
      }

      var html = answer.Render();
      var editButton = "";

      if (this._userDetails.data.loggedIn && this._question !== undefined) {
        editButton = this._editButton.Render();
      }

      return "<span class='answer'>" + "<span class='answer-text'>" + html + "</span>" + editButton + "</span>";
    }

    return "";
  };

  TagRendering.prototype.Priority = function () {
    return this._priority;
  };

  TagRendering.prototype.ApplyTemplate = function (template) {
    if (template === undefined || template === null) {
      throw "Trying to apply a template, but the template is null/undefined";
    }

    var tags = this._tagsPreprocessor(this._source.data);

    if (template instanceof UIElement_1.UIElement) {
      template = template.Render();
    }

    return new FixedUiElement_1.FixedUiElement(TagsFilter_1.TagUtils.ApplyTemplate(template, tags));
  };

  TagRendering.prototype.InnerUpdate = function (htmlElement) {
    _super.prototype.InnerUpdate.call(this, htmlElement);

    this._questionElement.Update(); // Another manual update for them

  };

  return TagRendering;
}(UIElement_1.UIElement);
},{"../UI/UIElement":"UI/UIElement.ts","../UI/UIEventSource":"UI/UIEventSource.ts","../Logic/TagsFilter":"Logic/TagsFilter.ts","../UI/Base/FixedUiElement":"UI/Base/FixedUiElement.ts","../UI/SaveButton":"UI/SaveButton.ts","../UI/Base/VariableUIElement":"UI/Base/VariableUIElement.ts","./OnlyShowIf":"Customizations/OnlyShowIf.ts","../UI/Input/TextField":"UI/Input/TextField.ts","../UI/Input/InputElementWrapper":"UI/Input/InputElementWrapper.ts","../UI/Input/FixedInputElement":"UI/Input/FixedInputElement.ts","../UI/Input/RadioButton":"UI/Input/RadioButton.ts","../UI/i18n/Translations":"UI/i18n/Translations.ts","../UI/i18n/Locale":"UI/i18n/Locale.ts"}],"UI/Img.ts":[function(require,module,exports) {
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
  Img.closedFilterButton = "<svg width=\"27\" height=\"27\" viewBox=\"0 0 27 27\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M26.5353 8.13481C26.4422 8.35428 26.2683 8.47598 26.0632 8.58537C21.9977 10.7452 17.935 12.9085 13.8758 15.0799C13.6475 15.2016 13.4831 15.1962 13.2568 15.0751C9.19822 12.903 5.13484 10.7404 1.07215 8.5758C0.490599 8.26608 0.448478 7.52562 0.991303 7.13796C1.0803 7.07438 1.17813 7.0231 1.2746 6.97045C5.15862 4.86462 9.04536 2.7629 12.9246 0.648187C13.3805 0.399316 13.7779 0.406837 14.2311 0.65434C18.0954 2.76153 21.9658 4.85779 25.8383 6.94926C26.1569 7.12155 26.411 7.32872 26.5353 7.67604C26.5353 7.82919 26.5353 7.98166 26.5353 8.13481Z\" fill=\"#003B8B\"/>\n        <path d=\"M13.318 26.535C12.1576 25.9046 10.9972 25.2736 9.83614 24.6439C6.96644 23.0877 4.09674 21.533 1.22704 19.9762C0.694401 19.6876 0.466129 19.2343 0.669943 18.7722C0.759621 18.5691 0.931505 18.3653 1.11969 18.2512C1.66659 17.9182 2.23727 17.6228 2.80863 17.3329C2.89423 17.2892 3.04981 17.3206 3.14493 17.3712C6.40799 19.1031 9.66969 20.837 12.9239 22.5845C13.3703 22.8238 13.7609 22.83 14.208 22.59C17.4554 20.8472 20.7117 19.1202 23.9605 17.3801C24.1493 17.2789 24.2838 17.283 24.4632 17.3876C24.8926 17.6386 25.3301 17.8772 25.7751 18.1001C26.11 18.2683 26.3838 18.4857 26.5346 18.8385C26.5346 18.9916 26.5346 19.1441 26.5346 19.2972C26.4049 19.6528 26.1399 19.8613 25.8152 20.0363C22.9964 21.5549 20.1831 23.0829 17.3684 24.609C16.1863 25.2496 15.0055 25.893 13.8248 26.535C13.6556 26.535 13.4865 26.535 13.318 26.535Z\" fill=\"#003B8B\"/>\n        <path d=\"M26.3988 13.7412C26.2956 13.9661 26.1026 14.081 25.8927 14.1924C21.8198 16.3577 17.749 18.5258 13.6815 20.7013C13.492 20.8025 13.3602 20.7902 13.1795 20.6938C9.09638 18.5114 5.01059 16.3359 0.924798 14.1582C0.399637 13.8786 0.307921 13.2646 0.735251 12.838C0.829005 12.7443 0.947217 12.6705 1.06407 12.6055C1.56545 12.3279 2.07635 12.0654 2.57297 11.7789C2.74214 11.6812 2.86579 11.6921 3.03291 11.7817C6.27492 13.5155 9.52303 15.2378 12.761 16.9792C13.2352 17.2343 13.6394 17.2322 14.1129 16.9772C17.3509 15.2358 20.5996 13.5142 23.8416 11.7796C24.0095 11.69 24.1338 11.6818 24.3016 11.7789C24.7384 12.0339 25.1821 12.2794 25.6352 12.5037C25.9701 12.6691 26.2426 12.8831 26.3995 13.2304C26.3988 13.4014 26.3988 13.5716 26.3988 13.7412Z\" fill=\"#003B8B\"/>\n        </svg>  ";
  Img.openFilterButton = "<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M20 2L2 20M20 20L2 2\" stroke=\"#003B8B\" stroke-width=\"4\"/>\n</svg>  ";
  return Img;
}();

exports.Img = Img;
},{}],"Customizations/Questions/OsmLink.ts":[function(require,module,exports) {
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
exports.OsmLink = void 0;

var TagRendering_1 = require("../TagRendering");

var Img_1 = require("../../UI/Img");

var TagsFilter_1 = require("../../Logic/TagsFilter");

var OsmLink =
/** @class */
function (_super) {
  __extends(OsmLink, _super);

  function OsmLink() {
    return _super.call(this, OsmLink.options) || this;
  }

  OsmLink.options = {
    freeform: {
      key: "id",
      template: "$$$",
      renderTemplate: "<span class='osmlink'><a href='https://osm.org/{id}' target='_blank'>" + Img_1.Img.osmAbstractLogo + "</a></span>",
      placeholder: ""
    },
    mappings: [{
      k: new TagsFilter_1.Tag("id", "node/-1"),
      txt: "<span class='alert'>Uploading</span>"
    }]
  };
  return OsmLink;
}(TagRendering_1.TagRenderingOptions);

exports.OsmLink = OsmLink;
},{"../TagRendering":"Customizations/TagRendering.ts","../../UI/Img":"UI/Img.ts","../../Logic/TagsFilter":"Logic/TagsFilter.ts"}],"Customizations/Questions/WikipediaLink.ts":[function(require,module,exports) {
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
exports.WikipediaLink = void 0;

var TagRendering_1 = require("../TagRendering");

var WikipediaLink =
/** @class */
function (_super) {
  __extends(WikipediaLink, _super);

  function WikipediaLink() {
    return _super.call(this, WikipediaLink.options) || this;
  }

  WikipediaLink.FixLink = function (value) {
    if (value === undefined) {
      return undefined;
    } // @ts-ignore


    if (value.startsWith("https")) {
      return value;
    } else {
      var splitted = value.split(":");
      var language = splitted[0];
      splitted.shift();
      var page = splitted.join(":");
      return 'https://' + language + '.wikipedia.org/wiki/' + page;
    }
  };

  WikipediaLink.options = {
    priority: 10,
    // question: "Wat is het overeenstemmende wkipedia-artikel?",
    tagsPreprocessor: function tagsPreprocessor(tags) {
      if (tags.wikipedia !== undefined) {
        tags.wikipedia = WikipediaLink.FixLink(tags.wikipedia);
      }
    },
    freeform: {
      key: "wikipedia",
      template: "$$$",
      renderTemplate: "<span class='wikipedialink'>" + "<a href='{wikipedia}' target='_blank'>" + "<img width='64px' src='./assets/wikipedia.svg' alt='wikipedia'>" + "</a></span>",
      placeholder: ""
    }
  };
  return WikipediaLink;
}(TagRendering_1.TagRenderingOptions);

exports.WikipediaLink = WikipediaLink;
},{"../TagRendering":"Customizations/TagRendering.ts"}],"UI/FeatureInfoBox.ts":[function(require,module,exports) {
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
exports.FeatureInfoBox = void 0;

var UIElement_1 = require("./UIElement");

var VerticalCombine_1 = require("./Base/VerticalCombine");

var TagRendering_1 = require("../Customizations/TagRendering");

var OsmLink_1 = require("../Customizations/Questions/OsmLink");

var WikipediaLink_1 = require("../Customizations/Questions/WikipediaLink");

var TagsFilter_1 = require("../Logic/TagsFilter");

var Translations_1 = __importDefault(require("./i18n/Translations"));

var FeatureInfoBox =
/** @class */
function (_super) {
  __extends(FeatureInfoBox, _super);

  function FeatureInfoBox(feature, tagsES, title, elementsToShow, changes, userDetails) {
    var _this = _super.call(this, tagsES) || this;

    _this._oneSkipped = Translations_1.default.t.general.oneSkippedQuestion.Clone();
    _this._someSkipped = Translations_1.default.t.general.skippedQuestions.Clone();
    _this._feature = feature;
    _this._tagsES = tagsES;
    _this._changes = changes;
    _this._userDetails = userDetails;

    _this.ListenTo(userDetails);

    var deps = {
      tags: _this._tagsES,
      changes: _this._changes
    };
    _this._infoboxes = [];
    elementsToShow = elementsToShow !== null && elementsToShow !== void 0 ? elementsToShow : [];
    var self = _this;

    for (var _i = 0, elementsToShow_1 = elementsToShow; _i < elementsToShow_1.length; _i++) {
      var tagRenderingOption = elementsToShow_1[_i];

      self._infoboxes.push(tagRenderingOption.construct(deps));
    }

    function initTags() {
      self._infoboxes = [];

      for (var _i = 0, elementsToShow_2 = elementsToShow; _i < elementsToShow_2.length; _i++) {
        var tagRenderingOption = elementsToShow_2[_i];

        self._infoboxes.push(tagRenderingOption.construct(deps));
      }

      self.Update();
    }

    _this._someSkipped.onClick(initTags);

    _this._oneSkipped.onClick(initTags);

    title = title !== null && title !== void 0 ? title : new TagRendering_1.TagRenderingOptions({
      mappings: [{
        k: new TagsFilter_1.And([]),
        txt: ""
      }]
    });

    if (title instanceof UIElement_1.UIElement) {
      _this._title = title;
    } else {
      _this._title = new TagRendering_1.TagRenderingOptions(title.options).construct(deps);
    }

    _this._osmLink = new OsmLink_1.OsmLink().construct(deps);
    _this._wikipedialink = new WikipediaLink_1.WikipediaLink().construct(deps);
    return _this;
  }

  FeatureInfoBox.prototype.InnerRender = function () {
    var info = [];
    var questions = [];
    var skippedQuestions = 0;

    for (var _i = 0, _a = this._infoboxes; _i < _a.length; _i++) {
      var infobox = _a[_i];

      if (infobox.IsKnown()) {
        info.push(infobox);
      } else if (infobox.IsQuestioning()) {
        questions.push(infobox);
      } else if (infobox.IsSkipped()) {
        // This question is neither known nor questioning -> it was skipped
        skippedQuestions++;
      }
    }

    var questionsHtml = "";

    if (this._userDetails.data.loggedIn && questions.length > 0) {
      // We select the most important question and render that one
      var mostImportantQuestion = void 0;
      var score = -1000;

      for (var _b = 0, questions_1 = questions; _b < questions_1.length; _b++) {
        var question = questions_1[_b];

        if (mostImportantQuestion === undefined || question.Priority() > score) {
          mostImportantQuestion = question;
          score = question.Priority();
        }
      }

      questionsHtml = mostImportantQuestion.Render();
    } else if (skippedQuestions == 1) {
      questionsHtml = this._oneSkipped.Render();
    } else if (skippedQuestions > 0) {
      questionsHtml = this._someSkipped.Render();
    }

    return "<div class='featureinfobox'>" + "<div class='featureinfoboxtitle'>" + "<span>" + this._title.Render() + "</span>" + this._wikipedialink.Render() + this._osmLink.Render() + "</div>" + "<div class='infoboxcontents'>" + new VerticalCombine_1.VerticalCombine(info, "infobox-information ").Render() + questionsHtml + "</div>" + "" + "</div>";
  };

  return FeatureInfoBox;
}(UIElement_1.UIElement);

exports.FeatureInfoBox = FeatureInfoBox;
},{"./UIElement":"UI/UIElement.ts","./Base/VerticalCombine":"UI/Base/VerticalCombine.ts","../Customizations/TagRendering":"Customizations/TagRendering.ts","../Customizations/Questions/OsmLink":"Customizations/Questions/OsmLink.ts","../Customizations/Questions/WikipediaLink":"Customizations/Questions/WikipediaLink.ts","../Logic/TagsFilter":"Logic/TagsFilter.ts","./i18n/Translations":"UI/i18n/Translations.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","UI/FeatureInfoBox.ts"], null)
//# sourceMappingURL=/UI/FeatureInfoBox.js.map