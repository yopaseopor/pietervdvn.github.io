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
},{}],"Logic/Question.ts":[function(require,module,exports) {
var global = arguments[3];
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
exports.Question = exports.QuestionDefinition = exports.QuestionUI = void 0;

var UIElement_1 = require("../UI/UIElement");

var QuestionUI =
/** @class */
function (_super) {
  __extends(QuestionUI, _super);

  function QuestionUI(q, qid, tags) {
    var _this = _super.call(this, tags) || this;

    _this._q = q;
    _this._tags = tags;
    _this._qid = qid;
    return _this;
  }

  QuestionUI.prototype.RenderRadio = function () {
    var radios = "";
    var c = 0;

    for (var _i = 0, _a = this._q.question.answers; _i < _a.length; _i++) {
      var answer = _a[_i];
      var human = answer.text;
      var ansId = "q" + this._qid + "-answer" + c;
      radios += "<input type='radio' name='q" + this._qid + "' id='" + ansId + "' value='" + c + "' />" + "<label for='" + ansId + "'>" + human + "</label>" + "<br />";
      c++;
    }

    return radios;
  };

  QuestionUI.prototype.RenderRadioText = function () {
    var radios = "";
    var c = 0;

    for (var _i = 0, _a = this._q.question.answers; _i < _a.length; _i++) {
      var answer = _a[_i];
      var human = answer.text;
      var ansId_1 = "q" + this._qid + "-answer" + c;
      radios += "<input type='radio' name='q" + this._qid + "' id='" + ansId_1 + "' value='" + c + "' />" + "<label for='" + ansId_1 + "'>" + human + "</label>" + "<br />";
      c++;
    }

    var ansId = "q" + this._qid + "-answer" + c;
    radios += "<input type='radio' name='q" + this._qid + "' id='" + ansId + "' value='" + c + "' />" + "<label for='" + ansId + "'><input type='text' id='q-" + this._qid + "-textbox' onclick='checkRadioButton(\"" + ansId + "\")'/></label>" + "<br />";
    return radios;
  };

  QuestionUI.prototype.InnerRender = function () {
    if (!this._q.Applicable(this._tags.data)) {
      return "";
    }

    var q = this._q.question;
    var answers = "";

    if (q.type == "radio") {
      answers += this.RenderRadio();
    } else if (q.type == "text") {
      answers += "<input type='text' id='q-" + this._qid + "-textbox'/><br/>";
    } else if (q.type == "radio+text") {
      answers += this.RenderRadioText();
    } else {
      alert("PLZ RENDER TYPE " + q.type);
    }

    var embeddedScriptSave = 'questionAnswered(' + this._qid + ', "' + this._tags.data.id + '", false )';
    var embeddedScriptSkip = 'questionAnswered(' + this._qid + ', "' + this._tags.data.id + '", true )';
    var saveButton = "<input class='save-button' type='button' onclick='" + embeddedScriptSave + "' value='Opslaan' />";
    var skip = "<input class='skip-button' type='button' onclick='" + embeddedScriptSkip + "' value='Ik ben niet zeker (vraag overslaan)' />";
    return q.question + "<br/>  " + answers + saveButton + skip;
  };

  QuestionUI.prototype.InnerUpdate = function (htmlElement) {};

  return QuestionUI;
}(UIElement_1.UIElement);

exports.QuestionUI = QuestionUI;

var QuestionDefinition =
/** @class */
function () {
  function QuestionDefinition(question) {
    /**
     * 'type' indicates how the answers are rendered and must be one of:
     * 'text' for a free to fill text field
     * 'radio' for radiobuttons
     * 'radio+text' for radiobuttons and a freefill text field
     * 'dropdown' for a dropdown menu
     * 'number' for a number field
     *
     * If 'text' or 'number' is specified, 'key' is used as tag for the answer.
     * If 'radio' or 'dropdown' is specified, the answers are used from 'tags'
     *
     */
    this.type = 'radio';
    /**
     * Only used for 'text' or 'number' questions
     */

    this.key = null;
    /**
     * Indicates that the element must have _all_ the tags defined below
     * Dictionary 'key' => [values]; empty list is wildcard
     */

    this.mustHaveAllTags = [];
    /**
     * Indicates that the element must _not_ have any of the tags defined below.
     * Dictionary 'key' => [values]
     */

    this.mustNotHaveTags = [];
    /**
     * Severity: how important the question is
     * The higher, the sooner it'll be shown
     */

    this.severity = 0;
    this.question = question;
  }

  QuestionDefinition.noNameOrNameQuestion = function (question, noExplicitName, severity) {
    var q = new QuestionDefinition(question);
    q.type = 'radio+text';
    q.addAnwser(noExplicitName, "noname", "yes");
    q.addUnrequiredTag("name", "*");
    q.addUnrequiredTag("noname", "yes");
    q.key = "name";
    q.severity = severity;
    return q;
  };

  QuestionDefinition.textQuestion = function (question, key, severity) {
    var q = new QuestionDefinition(question);
    q.type = 'text';
    q.key = key;
    q.severity = severity;
    q.addUnrequiredTag(key, '*');
    return q;
  };

  QuestionDefinition.radioQuestionSimple = function (question, severity, key, answers) {
    var answers0 = [];

    for (var i in answers) {
      var answer = answers[i];
      answers0.push({
        text: answer.text,
        tags: [{
          k: key,
          v: answer.value
        }]
      });
    }

    var q = this.radioQuestion(question, severity, answers0);
    q.key = key;
    q.addUnrequiredTag(key, '*');
    return q;
  };

  QuestionDefinition.radioAndTextQuestion = function (question, severity, key, answers) {
    var q = this.radioQuestionSimple(question, severity, key, answers);
    q.type = 'radio+text';
    return q;
  };

  QuestionDefinition.radioQuestion = function (question, severity, answers) {
    var q = new QuestionDefinition(question);
    q.severity = severity;
    q.type = 'radio';
    q.answers = answers;

    for (var i in answers) {
      var answer = answers[i];

      for (var j in answer.tags) {
        var tag = answer.tags[j];
        q.addUnrequiredTag(tag.k, tag.v);
      }
    }

    return q;
  };

  QuestionDefinition.GrbNoNumberQuestion = function () {
    var q = new QuestionDefinition("Heeft dit gebouw een huisnummer?");
    q.type = "radio";
    q.severity = 10;
    q.answers = [{
      text: "Ja, het OSM-huisnummer is correct",
      tags: [{
        k: "fixme",
        v: ""
      }]
    }, {
      text: "Nee, het is een enkele garage",
      tags: [{
        k: "building",
        v: "garage"
      }, {
        k: "fixme",
        v: ""
      }]
    }, {
      text: "Nee, het zijn meerdere garages",
      tags: [{
        k: "building",
        v: "garages"
      }, {
        k: "fixme",
        v: ""
      }]
    }];
    q.addRequiredTag("fixme", "GRB thinks that this has number no number");
    return q;
  };

  QuestionDefinition.GrbHouseNumberQuestion = function () {
    var q = new QuestionDefinition("Wat is het huisnummer?");
    q.type = "radio+text";
    q.severity = 10;
    q.answers = [{
      text: "Het OSM-huisnummer is correct",
      tags: [{
        k: "fixme",
        v: ""
      }]
    }];
    q.key = "addr:housenumber";
    q.addRequiredTag("fixme", "*");
    return q;
  };

  QuestionDefinition.prototype.addRequiredTag = function (key, value) {
    if (this.mustHaveAllTags[key] === undefined) {
      this.mustHaveAllTags[key] = [value];
    } else {
      if (this.mustHaveAllTags[key] === []) {
        // Wildcard
        return;
      }

      this.mustHaveAllTags[key].push(value);
    }

    if (value === '*') {
      this.mustHaveAllTags[key] = [];
    }

    return this;
  };

  QuestionDefinition.prototype.addUnrequiredTag = function (key, value) {
    var valueList = this.mustNotHaveTags[key];

    if (valueList === undefined) {
      valueList = [value];
      this.mustNotHaveTags[key] = valueList;
    } else {
      if (valueList === []) {
        return;
      }

      valueList.push(value);
    }

    if (value === '*') {
      this.mustNotHaveTags[key] = [];
    }

    return this;
  };

  QuestionDefinition.prototype.addAnwser = function (anwser, key, value) {
    if (this.answers === undefined) {
      this.answers = [{
        text: anwser,
        tags: [{
          k: key,
          v: value
        }]
      }];
    } else {
      this.answers.push({
        text: anwser,
        tags: [{
          k: key,
          v: value
        }]
      });
    }

    this.addUnrequiredTag(key, value);
  };

  QuestionDefinition.prototype.isApplicable = function (alreadyExistingTags) {
    for (var k_1 in this.mustHaveAllTags) {
      var actual = alreadyExistingTags[k_1];

      if (actual === undefined) {
        return false;
      }

      var possibleVals = this.mustHaveAllTags[k_1];

      if (possibleVals.length == 0) {
        // Wildcard
        continue;
      }

      var index = possibleVals.indexOf(actual);

      if (index < 0) {
        return false;
      }
    }

    for (var k in this.mustNotHaveTags) {
      var actual = alreadyExistingTags[k];

      if (actual === undefined) {
        continue;
      }

      var impossibleVals = this.mustNotHaveTags[k];

      if (impossibleVals.length == 0) {
        // Wildcard
        return false;
      }

      var index = impossibleVals.indexOf(actual);

      if (index >= 0) {
        return false;
      }
    }

    return true;
  };

  return QuestionDefinition;
}();

exports.QuestionDefinition = QuestionDefinition;

var Question =
/** @class */
function () {
  function Question(changeHandler, question) {
    this.skippedElements = [];
    this.question = question;
    this._qId = Question.questions.length;
    this._changeHandler = changeHandler;
    Question.questions.push(this);
  }

  Question.InitCallbackFunction = function () {
    // This needs some explanation, as it is a workaround
    Question.questions = []; // The html in a popup is only created when the user actually clicks to open it
    // This means that we can not bind code to an HTML-element (as it doesn't exist yet)
    // We work around this, by letting the 'save' button just call the function 'questionAnswered' with the ID of the question
    // THis defines and registers this global function

    /**
     * Calls back to the question with either the answer or 'skip'
     * @param questionId
     * @param elementId
     */

    function questionAnswered(questionId, elementId, dontKnow) {
      if (dontKnow) {
        Question.questions[questionId].Skip(elementId);
      } else {
        Question.questions[questionId].OnSave(elementId);
      }
    }

    function checkRadioButton(id) {
      // @ts-ignore
      document.getElementById(id).checked = true;
    } // must cast as any to set property on window
    // @ts-ignore


    var _global = window
    /* browser */
    || global
    /* node */
    ;

    _global.questionAnswered = questionAnswered;
    _global.checkRadioButton = checkRadioButton;
    return [];
  };
  /**
   * SHould this question be asked?
   * Returns false if question is already there or if a premise is missing
   */


  Question.prototype.Applicable = function (tags) {
    if (this.skippedElements.indexOf(tags.id) >= 0) {
      return false;
    }

    return this.question.isApplicable(tags);
  };
  /**
   *
   * @param elementId: the OSM-id of the element to perform the change on, format 'way/123', 'node/456' or 'relation/789'
   * @constructor
   */


  Question.prototype.OnSave = function (elementId) {
    var tagsToApply = [];
    var q = this.question;
    var tp = this.question.type;

    if (tp === "radio") {
      var selected = document.querySelector('input[name="q' + this._qId + '"]:checked');

      if (selected === null) {
        console.log("No answer selected");
        return;
      }

      var index = selected.value;
      tagsToApply = q.answers[index].tags;
    } else if (tp === "text") {
      // @ts-ignore
      var value = document.getElementById("q-" + this._qId + "-textbox").value;

      if (value === undefined || value.length == 0) {
        console.log("Answer too short");
        return;
      }

      tagsToApply = [{
        k: q.key,
        v: value
      }];
    } else if (tp === "radio+text") {
      var selected = document.querySelector('input[name="q' + this._qId + '"]:checked');

      if (selected === null) {
        console.log("No answer selected");
        return;
      }

      var index = selected.value;

      if (index < q.answers.length) {
        // A 'proper' answer was selected
        tagsToApply = q.answers[index].tags;
      } else {
        // The textfield was selected 
        // @ts-ignore
        var value = document.getElementById("q-" + this._qId + "-textbox").value;

        if (value === undefined || value.length < 3) {
          console.log("Answer too short");
          return;
        }

        tagsToApply = [{
          k: q.key,
          v: value
        }];
      }
    }

    console.log("Question.ts: Applying tags", tagsToApply, " to element ", elementId);

    for (var _i = 0, tagsToApply_1 = tagsToApply; _i < tagsToApply_1.length; _i++) {
      var toApply = tagsToApply_1[_i];

      this._changeHandler.addChange(elementId, toApply.k, toApply.v);
    }
  };
  /**
   * Creates the HTML question for this tag collection
   */


  Question.prototype.CreateHtml = function (tags) {
    return new QuestionUI(this, this._qId, tags);
  };

  Question.prototype.Skip = function (elementId) {
    this.skippedElements.push(elementId);
    console.log("SKIP"); // Yeah, this is cheating below
    // It is an easy way to notify the UIElement that something has changed

    this._changeHandler._allElements.getElement(elementId).ping();
  }; // All the questions are stored in here, to be able to retrieve them globaly. This is a workaround, see below


  Question.questions = Question.InitCallbackFunction();
  return Question;
}();

exports.Question = Question;
},{"../UI/UIElement":"UI/UIElement.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","Logic/Question.ts"], null)
//# sourceMappingURL=/Logic/Question.js.map