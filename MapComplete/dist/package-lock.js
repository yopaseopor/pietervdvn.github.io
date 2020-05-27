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
})({"package-lock.json":[function(require,module,exports) {
module.exports = {
  "name": "mapcomplete",
  "version": "0.0.1",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "@babel/code-frame": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.8.3.tgz",
      "integrity": "sha512-a9gxpmdXtZEInkCSHUJDLHZVBgb1QS0jhss4cPP93EW7s+uC5bikET2twEF3KV+7rDblJcmNvTR7VJejqd2C2g==",
      "requires": {
        "@babel/highlight": "^7.8.3"
      }
    },
    "@babel/compat-data": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.9.6.tgz",
      "integrity": "sha512-5QPTrNen2bm7RBc7dsOmcA5hbrS4O2Vhmk5XOL4zWW/zD/hV0iinpefDlkm+tBBy8kDtFaaeEvmAqt+nURAV2g==",
      "requires": {
        "browserslist": "^4.11.1",
        "invariant": "^2.2.4",
        "semver": "^5.5.0"
      }
    },
    "@babel/core": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.9.6.tgz",
      "integrity": "sha512-nD3deLvbsApbHAHttzIssYqgb883yU/d9roe4RZymBCDaZryMJDbptVpEpeQuRh4BJ+SYI8le9YGxKvFEvl1Wg==",
      "requires": {
        "@babel/code-frame": "^7.8.3",
        "@babel/generator": "^7.9.6",
        "@babel/helper-module-transforms": "^7.9.0",
        "@babel/helpers": "^7.9.6",
        "@babel/parser": "^7.9.6",
        "@babel/template": "^7.8.6",
        "@babel/traverse": "^7.9.6",
        "@babel/types": "^7.9.6",
        "convert-source-map": "^1.7.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.1",
        "json5": "^2.1.2",
        "lodash": "^4.17.13",
        "resolve": "^1.3.2",
        "semver": "^5.4.1",
        "source-map": "^0.5.0"
      },
      "dependencies": {
        "json5": {
          "version": "2.1.3",
          "resolved": "https://registry.npmjs.org/json5/-/json5-2.1.3.tgz",
          "integrity": "sha512-KXPvOm8K9IJKFM0bmdn8QXh7udDh1g/giieX0NLCaMnb4hEiVFqnop2ImTXCc5e0/oHz3LTqmHGtExn5hfMkOA==",
          "requires": {
            "minimist": "^1.2.5"
          }
        },
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
        }
      }
    },
    "@babel/generator": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.9.6.tgz",
      "integrity": "sha512-+htwWKJbH2bL72HRluF8zumBxzuX0ZZUFl3JLNyoUjM/Ho8wnVpPXM6aUz8cfKDqQ/h7zHqKt4xzJteUosckqQ==",
      "requires": {
        "@babel/types": "^7.9.6",
        "jsesc": "^2.5.1",
        "lodash": "^4.17.13",
        "source-map": "^0.5.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
        }
      }
    },
    "@babel/helper-annotate-as-pure": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.8.3.tgz",
      "integrity": "sha512-6o+mJrZBxOoEX77Ezv9zwW7WV8DdluouRKNY/IR5u/YTMuKHgugHOzYWlYvYLpLA9nPsQCAAASpCIbjI9Mv+Uw==",
      "requires": {
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-builder-binary-assignment-operator-visitor": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-builder-binary-assignment-operator-visitor/-/helper-builder-binary-assignment-operator-visitor-7.8.3.tgz",
      "integrity": "sha512-5eFOm2SyFPK4Rh3XMMRDjN7lBH0orh3ss0g3rTYZnBQ+r6YPj7lgDyCvPphynHvUrobJmeMignBr6Acw9mAPlw==",
      "requires": {
        "@babel/helper-explode-assignable-expression": "^7.8.3",
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-builder-react-jsx": {
      "version": "7.9.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-builder-react-jsx/-/helper-builder-react-jsx-7.9.0.tgz",
      "integrity": "sha512-weiIo4gaoGgnhff54GQ3P5wsUQmnSwpkvU0r6ZHq6TzoSzKy4JxHEgnxNytaKbov2a9z/CVNyzliuCOUPEX3Jw==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.8.3",
        "@babel/types": "^7.9.0"
      }
    },
    "@babel/helper-builder-react-jsx-experimental": {
      "version": "7.9.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-builder-react-jsx-experimental/-/helper-builder-react-jsx-experimental-7.9.5.tgz",
      "integrity": "sha512-HAagjAC93tk748jcXpZ7oYRZH485RCq/+yEv9SIWezHRPv9moZArTnkUNciUNzvwHUABmiWKlcxJvMcu59UwTg==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.8.3",
        "@babel/helper-module-imports": "^7.8.3",
        "@babel/types": "^7.9.5"
      }
    },
    "@babel/helper-compilation-targets": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.9.6.tgz",
      "integrity": "sha512-x2Nvu0igO0ejXzx09B/1fGBxY9NXQlBW2kZsSxCJft+KHN8t9XWzIvFxtPHnBOAXpVsdxZKZFbRUC8TsNKajMw==",
      "requires": {
        "@babel/compat-data": "^7.9.6",
        "browserslist": "^4.11.1",
        "invariant": "^2.2.4",
        "levenary": "^1.1.1",
        "semver": "^5.5.0"
      }
    },
    "@babel/helper-create-regexp-features-plugin": {
      "version": "7.8.8",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-regexp-features-plugin/-/helper-create-regexp-features-plugin-7.8.8.tgz",
      "integrity": "sha512-LYVPdwkrQEiX9+1R29Ld/wTrmQu1SSKYnuOk3g0CkcZMA1p0gsNxJFj/3gBdaJ7Cg0Fnek5z0DsMULePP7Lrqg==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.8.3",
        "@babel/helper-regex": "^7.8.3",
        "regexpu-core": "^4.7.0"
      }
    },
    "@babel/helper-define-map": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-define-map/-/helper-define-map-7.8.3.tgz",
      "integrity": "sha512-PoeBYtxoZGtct3md6xZOCWPcKuMuk3IHhgxsRRNtnNShebf4C8YonTSblsK4tvDbm+eJAw2HAPOfCr+Q/YRG/g==",
      "requires": {
        "@babel/helper-function-name": "^7.8.3",
        "@babel/types": "^7.8.3",
        "lodash": "^4.17.13"
      }
    },
    "@babel/helper-explode-assignable-expression": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-explode-assignable-expression/-/helper-explode-assignable-expression-7.8.3.tgz",
      "integrity": "sha512-N+8eW86/Kj147bO9G2uclsg5pwfs/fqqY5rwgIL7eTBklgXjcOJ3btzS5iM6AitJcftnY7pm2lGsrJVYLGjzIw==",
      "requires": {
        "@babel/traverse": "^7.8.3",
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-function-name": {
      "version": "7.9.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-function-name/-/helper-function-name-7.9.5.tgz",
      "integrity": "sha512-JVcQZeXM59Cd1qanDUxv9fgJpt3NeKUaqBqUEvfmQ+BCOKq2xUgaWZW2hr0dkbyJgezYuplEoh5knmrnS68efw==",
      "requires": {
        "@babel/helper-get-function-arity": "^7.8.3",
        "@babel/template": "^7.8.3",
        "@babel/types": "^7.9.5"
      }
    },
    "@babel/helper-get-function-arity": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-get-function-arity/-/helper-get-function-arity-7.8.3.tgz",
      "integrity": "sha512-FVDR+Gd9iLjUMY1fzE2SR0IuaJToR4RkCDARVfsBBPSP53GEqSFjD8gNyxg246VUyc/ALRxFaAK8rVG7UT7xRA==",
      "requires": {
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-hoist-variables": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-hoist-variables/-/helper-hoist-variables-7.8.3.tgz",
      "integrity": "sha512-ky1JLOjcDUtSc+xkt0xhYff7Z6ILTAHKmZLHPxAhOP0Nd77O+3nCsd6uSVYur6nJnCI029CrNbYlc0LoPfAPQg==",
      "requires": {
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-member-expression-to-functions": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.8.3.tgz",
      "integrity": "sha512-fO4Egq88utkQFjbPrSHGmGLFqmrshs11d46WI+WZDESt7Wu7wN2G2Iu+NMMZJFDOVRHAMIkB5SNh30NtwCA7RA==",
      "requires": {
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-module-imports": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.8.3.tgz",
      "integrity": "sha512-R0Bx3jippsbAEtzkpZ/6FIiuzOURPcMjHp+Z6xPe6DtApDJx+w7UYyOLanZqO8+wKR9G10s/FmHXvxaMd9s6Kg==",
      "requires": {
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-module-transforms": {
      "version": "7.9.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.9.0.tgz",
      "integrity": "sha512-0FvKyu0gpPfIQ8EkxlrAydOWROdHpBmiCiRwLkUiBGhCUPRRbVD2/tm3sFr/c/GWFrQ/ffutGUAnx7V0FzT2wA==",
      "requires": {
        "@babel/helper-module-imports": "^7.8.3",
        "@babel/helper-replace-supers": "^7.8.6",
        "@babel/helper-simple-access": "^7.8.3",
        "@babel/helper-split-export-declaration": "^7.8.3",
        "@babel/template": "^7.8.6",
        "@babel/types": "^7.9.0",
        "lodash": "^4.17.13"
      }
    },
    "@babel/helper-optimise-call-expression": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.8.3.tgz",
      "integrity": "sha512-Kag20n86cbO2AvHca6EJsvqAd82gc6VMGule4HwebwMlwkpXuVqrNRj6CkCV2sKxgi9MyAUnZVnZ6lJ1/vKhHQ==",
      "requires": {
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-plugin-utils": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.8.3.tgz",
      "integrity": "sha512-j+fq49Xds2smCUNYmEHF9kGNkhbet6yVIBp4e6oeQpH1RUs/Ir06xUKzDjDkGcaaokPiTNs2JBWHjaE4csUkZQ=="
    },
    "@babel/helper-regex": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-regex/-/helper-regex-7.8.3.tgz",
      "integrity": "sha512-BWt0QtYv/cg/NecOAZMdcn/waj/5P26DR4mVLXfFtDokSR6fyuG0Pj+e2FqtSME+MqED1khnSMulkmGl8qWiUQ==",
      "requires": {
        "lodash": "^4.17.13"
      }
    },
    "@babel/helper-remap-async-to-generator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-remap-async-to-generator/-/helper-remap-async-to-generator-7.8.3.tgz",
      "integrity": "sha512-kgwDmw4fCg7AVgS4DukQR/roGp+jP+XluJE5hsRZwxCYGg+Rv9wSGErDWhlI90FODdYfd4xG4AQRiMDjjN0GzA==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.8.3",
        "@babel/helper-wrap-function": "^7.8.3",
        "@babel/template": "^7.8.3",
        "@babel/traverse": "^7.8.3",
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-replace-supers": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.9.6.tgz",
      "integrity": "sha512-qX+chbxkbArLyCImk3bWV+jB5gTNU/rsze+JlcF6Nf8tVTigPJSI1o1oBow/9Resa1yehUO9lIipsmu9oG4RzA==",
      "requires": {
        "@babel/helper-member-expression-to-functions": "^7.8.3",
        "@babel/helper-optimise-call-expression": "^7.8.3",
        "@babel/traverse": "^7.9.6",
        "@babel/types": "^7.9.6"
      }
    },
    "@babel/helper-simple-access": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-simple-access/-/helper-simple-access-7.8.3.tgz",
      "integrity": "sha512-VNGUDjx5cCWg4vvCTR8qQ7YJYZ+HBjxOgXEl7ounz+4Sn7+LMD3CFrCTEU6/qXKbA2nKg21CwhhBzO0RpRbdCw==",
      "requires": {
        "@babel/template": "^7.8.3",
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-split-export-declaration": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.8.3.tgz",
      "integrity": "sha512-3x3yOeyBhW851hroze7ElzdkeRXQYQbFIb7gLK1WQYsw2GWDay5gAJNw1sWJ0VFP6z5J1whqeXH/WCdCjZv6dA==",
      "requires": {
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helper-validator-identifier": {
      "version": "7.9.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.9.5.tgz",
      "integrity": "sha512-/8arLKUFq882w4tWGj9JYzRpAlZgiWUJ+dtteNTDqrRBz9Iguck9Rn3ykuBDoUwh2TO4tSAJlrxDUOXWklJe4g=="
    },
    "@babel/helper-wrap-function": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-wrap-function/-/helper-wrap-function-7.8.3.tgz",
      "integrity": "sha512-LACJrbUET9cQDzb6kG7EeD7+7doC3JNvUgTEQOx2qaO1fKlzE/Bf05qs9w1oXQMmXlPO65lC3Tq9S6gZpTErEQ==",
      "requires": {
        "@babel/helper-function-name": "^7.8.3",
        "@babel/template": "^7.8.3",
        "@babel/traverse": "^7.8.3",
        "@babel/types": "^7.8.3"
      }
    },
    "@babel/helpers": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.9.6.tgz",
      "integrity": "sha512-tI4bUbldloLcHWoRUMAj4g1bF313M/o6fBKhIsb3QnGVPwRm9JsNf/gqMkQ7zjqReABiffPV6RWj7hEglID5Iw==",
      "requires": {
        "@babel/template": "^7.8.3",
        "@babel/traverse": "^7.9.6",
        "@babel/types": "^7.9.6"
      }
    },
    "@babel/highlight": {
      "version": "7.9.0",
      "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.9.0.tgz",
      "integrity": "sha512-lJZPilxX7Op3Nv/2cvFdnlepPXDxi29wxteT57Q965oc5R9v86ztx0jfxVrTcBk8C2kcPkkDa2Z4T3ZsPPVWsQ==",
      "requires": {
        "@babel/helper-validator-identifier": "^7.9.0",
        "chalk": "^2.0.0",
        "js-tokens": "^4.0.0"
      }
    },
    "@babel/parser": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.9.6.tgz",
      "integrity": "sha512-AoeIEJn8vt+d/6+PXDRPaksYhnlbMIiejioBZvvMQsOjW/JYK6k/0dKnvvP3EhK5GfMBWDPtrxRtegWdAcdq9Q=="
    },
    "@babel/plugin-proposal-async-generator-functions": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-async-generator-functions/-/plugin-proposal-async-generator-functions-7.8.3.tgz",
      "integrity": "sha512-NZ9zLv848JsV3hs8ryEh7Uaz/0KsmPLqv0+PdkDJL1cJy0K4kOCFa8zc1E3mp+RHPQcpdfb/6GovEsW4VDrOMw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/helper-remap-async-to-generator": "^7.8.3",
        "@babel/plugin-syntax-async-generators": "^7.8.0"
      }
    },
    "@babel/plugin-proposal-dynamic-import": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-dynamic-import/-/plugin-proposal-dynamic-import-7.8.3.tgz",
      "integrity": "sha512-NyaBbyLFXFLT9FP+zk0kYlUlA8XtCUbehs67F0nnEg7KICgMc2mNkIeu9TYhKzyXMkrapZFwAhXLdnt4IYHy1w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-dynamic-import": "^7.8.0"
      }
    },
    "@babel/plugin-proposal-json-strings": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-json-strings/-/plugin-proposal-json-strings-7.8.3.tgz",
      "integrity": "sha512-KGhQNZ3TVCQG/MjRbAUwuH+14y9q0tpxs1nWWs3pbSleRdDro9SAMMDyye8HhY1gqZ7/NqIc8SKhya0wRDgP1Q==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-json-strings": "^7.8.0"
      }
    },
    "@babel/plugin-proposal-nullish-coalescing-operator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-nullish-coalescing-operator/-/plugin-proposal-nullish-coalescing-operator-7.8.3.tgz",
      "integrity": "sha512-TS9MlfzXpXKt6YYomudb/KU7nQI6/xnapG6in1uZxoxDghuSMZsPb6D2fyUwNYSAp4l1iR7QtFOjkqcRYcUsfw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.0"
      }
    },
    "@babel/plugin-proposal-numeric-separator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-numeric-separator/-/plugin-proposal-numeric-separator-7.8.3.tgz",
      "integrity": "sha512-jWioO1s6R/R+wEHizfaScNsAx+xKgwTLNXSh7tTC4Usj3ItsPEhYkEpU4h+lpnBwq7NBVOJXfO6cRFYcX69JUQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-numeric-separator": "^7.8.3"
      }
    },
    "@babel/plugin-proposal-object-rest-spread": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-object-rest-spread/-/plugin-proposal-object-rest-spread-7.9.6.tgz",
      "integrity": "sha512-Ga6/fhGqA9Hj+y6whNpPv8psyaK5xzrQwSPsGPloVkvmH+PqW1ixdnfJ9uIO06OjQNYol3PMnfmJ8vfZtkzF+A==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-object-rest-spread": "^7.8.0",
        "@babel/plugin-transform-parameters": "^7.9.5"
      }
    },
    "@babel/plugin-proposal-optional-catch-binding": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-optional-catch-binding/-/plugin-proposal-optional-catch-binding-7.8.3.tgz",
      "integrity": "sha512-0gkX7J7E+AtAw9fcwlVQj8peP61qhdg/89D5swOkjYbkboA2CVckn3kiyum1DE0wskGb7KJJxBdyEBApDLLVdw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-optional-catch-binding": "^7.8.0"
      }
    },
    "@babel/plugin-proposal-optional-chaining": {
      "version": "7.9.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-optional-chaining/-/plugin-proposal-optional-chaining-7.9.0.tgz",
      "integrity": "sha512-NDn5tu3tcv4W30jNhmc2hyD5c56G6cXx4TesJubhxrJeCvuuMpttxr0OnNCqbZGhFjLrg+NIhxxC+BK5F6yS3w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-optional-chaining": "^7.8.0"
      }
    },
    "@babel/plugin-proposal-unicode-property-regex": {
      "version": "7.8.8",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-unicode-property-regex/-/plugin-proposal-unicode-property-regex-7.8.8.tgz",
      "integrity": "sha512-EVhjVsMpbhLw9ZfHWSx2iy13Q8Z/eg8e8ccVWt23sWQK5l1UdkoLJPN5w69UA4uITGBnEZD2JOe4QOHycYKv8A==",
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.8.8",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-syntax-async-generators": {
      "version": "7.8.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-async-generators/-/plugin-syntax-async-generators-7.8.4.tgz",
      "integrity": "sha512-tycmZxkGfZaxhMRbXlPXuVFpdWlXpir2W4AMhSJgRKzk/eDlIXOhb2LHWoLpDF7TEHylV5zNhykX6KAgHJmTNw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-dynamic-import": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-dynamic-import/-/plugin-syntax-dynamic-import-7.8.3.tgz",
      "integrity": "sha512-5gdGbFon+PszYzqs83S3E5mpi7/y/8M9eC90MRTZfduQOYW76ig6SOSPNe41IG5LoP3FGBn2N0RjVDSQiS94kQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-flow": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-flow/-/plugin-syntax-flow-7.8.3.tgz",
      "integrity": "sha512-innAx3bUbA0KSYj2E2MNFSn9hiCeowOFLxlsuhXzw8hMQnzkDomUr9QCD7E9VF60NmnG1sNTuuv6Qf4f8INYsg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-syntax-json-strings": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-json-strings/-/plugin-syntax-json-strings-7.8.3.tgz",
      "integrity": "sha512-lY6kdGpWHvjoe2vk4WrAapEuBR69EMxZl+RoGRhrFGNYVK8mOPAW8VfbT/ZgrFbXlDNiiaxQnAtgVCZ6jv30EA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-jsx": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.8.3.tgz",
      "integrity": "sha512-WxdW9xyLgBdefoo0Ynn3MRSkhe5tFVxxKNVdnZSh318WrG2e2jH+E9wd/++JsqcLJZPfz87njQJ8j2Upjm0M0A==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-syntax-nullish-coalescing-operator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-nullish-coalescing-operator/-/plugin-syntax-nullish-coalescing-operator-7.8.3.tgz",
      "integrity": "sha512-aSff4zPII1u2QD7y+F8oDsz19ew4IGEJg9SVW+bqwpwtfFleiQDMdzA/R+UlWDzfnHFCxxleFT0PMIrR36XLNQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-numeric-separator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-numeric-separator/-/plugin-syntax-numeric-separator-7.8.3.tgz",
      "integrity": "sha512-H7dCMAdN83PcCmqmkHB5dtp+Xa9a6LKSvA2hiFBC/5alSHxM5VgWZXFqDi0YFe8XNGT6iCa+z4V4zSt/PdZ7Dw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-syntax-object-rest-spread": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-object-rest-spread/-/plugin-syntax-object-rest-spread-7.8.3.tgz",
      "integrity": "sha512-XoqMijGZb9y3y2XskN+P1wUGiVwWZ5JmoDRwx5+3GmEplNyVM2s2Dg8ILFQm8rWM48orGy5YpI5Bl8U1y7ydlA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-optional-catch-binding": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-catch-binding/-/plugin-syntax-optional-catch-binding-7.8.3.tgz",
      "integrity": "sha512-6VPD0Pc1lpTqw0aKoeRTMiB+kWhAoT24PA+ksWSBrFtl5SIRVpZlwN3NNPQjehA2E/91FV3RjLWoVTglWcSV3Q==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-optional-chaining": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-chaining/-/plugin-syntax-optional-chaining-7.8.3.tgz",
      "integrity": "sha512-KoK9ErH1MBlCPxV0VANkXW2/dw4vlbGDrFgz8bmUsBGYkFRcbRwMh6cIJubdPrkxRwuGdtCk0v/wPTKbQgBjkg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-top-level-await": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-top-level-await/-/plugin-syntax-top-level-await-7.8.3.tgz",
      "integrity": "sha512-kwj1j9lL/6Wd0hROD3b/OZZ7MSrZLqqn9RAZ5+cYYsflQ9HZBIKCUkr3+uL1MEJ1NePiUbf98jjiMQSv0NMR9g==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-arrow-functions": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-arrow-functions/-/plugin-transform-arrow-functions-7.8.3.tgz",
      "integrity": "sha512-0MRF+KC8EqH4dbuITCWwPSzsyO3HIWWlm30v8BbbpOrS1B++isGxPnnuq/IZvOX5J2D/p7DQalQm+/2PnlKGxg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-async-to-generator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-to-generator/-/plugin-transform-async-to-generator-7.8.3.tgz",
      "integrity": "sha512-imt9tFLD9ogt56Dd5CI/6XgpukMwd/fLGSrix2httihVe7LOGVPhyhMh1BU5kDM7iHD08i8uUtmV2sWaBFlHVQ==",
      "requires": {
        "@babel/helper-module-imports": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/helper-remap-async-to-generator": "^7.8.3"
      }
    },
    "@babel/plugin-transform-block-scoped-functions": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoped-functions/-/plugin-transform-block-scoped-functions-7.8.3.tgz",
      "integrity": "sha512-vo4F2OewqjbB1+yaJ7k2EJFHlTP3jR634Z9Cj9itpqNjuLXvhlVxgnjsHsdRgASR8xYDrx6onw4vW5H6We0Jmg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-block-scoping": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoping/-/plugin-transform-block-scoping-7.8.3.tgz",
      "integrity": "sha512-pGnYfm7RNRgYRi7bids5bHluENHqJhrV4bCZRwc5GamaWIIs07N4rZECcmJL6ZClwjDz1GbdMZFtPs27hTB06w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "lodash": "^4.17.13"
      }
    },
    "@babel/plugin-transform-classes": {
      "version": "7.9.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-classes/-/plugin-transform-classes-7.9.5.tgz",
      "integrity": "sha512-x2kZoIuLC//O5iA7PEvecB105o7TLzZo8ofBVhP79N+DO3jaX+KYfww9TQcfBEZD0nikNyYcGB1IKtRq36rdmg==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.8.3",
        "@babel/helper-define-map": "^7.8.3",
        "@babel/helper-function-name": "^7.9.5",
        "@babel/helper-optimise-call-expression": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/helper-replace-supers": "^7.8.6",
        "@babel/helper-split-export-declaration": "^7.8.3",
        "globals": "^11.1.0"
      }
    },
    "@babel/plugin-transform-computed-properties": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-computed-properties/-/plugin-transform-computed-properties-7.8.3.tgz",
      "integrity": "sha512-O5hiIpSyOGdrQZRQ2ccwtTVkgUDBBiCuK//4RJ6UfePllUTCENOzKxfh6ulckXKc0DixTFLCfb2HVkNA7aDpzA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-destructuring": {
      "version": "7.9.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-destructuring/-/plugin-transform-destructuring-7.9.5.tgz",
      "integrity": "sha512-j3OEsGel8nHL/iusv/mRd5fYZ3DrOxWC82x0ogmdN/vHfAP4MYw+AFKYanzWlktNwikKvlzUV//afBW5FTp17Q==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-dotall-regex": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-dotall-regex/-/plugin-transform-dotall-regex-7.8.3.tgz",
      "integrity": "sha512-kLs1j9Nn4MQoBYdRXH6AeaXMbEJFaFu/v1nQkvib6QzTj8MZI5OQzqmD83/2jEM1z0DLilra5aWO5YpyC0ALIw==",
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-duplicate-keys": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-keys/-/plugin-transform-duplicate-keys-7.8.3.tgz",
      "integrity": "sha512-s8dHiBUbcbSgipS4SMFuWGqCvyge5V2ZeAWzR6INTVC3Ltjig/Vw1G2Gztv0vU/hRG9X8IvKvYdoksnUfgXOEQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-exponentiation-operator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-exponentiation-operator/-/plugin-transform-exponentiation-operator-7.8.3.tgz",
      "integrity": "sha512-zwIpuIymb3ACcInbksHaNcR12S++0MDLKkiqXHl3AzpgdKlFNhog+z/K0+TGW+b0w5pgTq4H6IwV/WhxbGYSjQ==",
      "requires": {
        "@babel/helper-builder-binary-assignment-operator-visitor": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-flow-strip-types": {
      "version": "7.9.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-flow-strip-types/-/plugin-transform-flow-strip-types-7.9.0.tgz",
      "integrity": "sha512-7Qfg0lKQhEHs93FChxVLAvhBshOPQDtJUTVHr/ZwQNRccCm4O9D79r9tVSoV8iNwjP1YgfD+e/fgHcPkN1qEQg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-flow": "^7.8.3"
      }
    },
    "@babel/plugin-transform-for-of": {
      "version": "7.9.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-for-of/-/plugin-transform-for-of-7.9.0.tgz",
      "integrity": "sha512-lTAnWOpMwOXpyDx06N+ywmF3jNbafZEqZ96CGYabxHrxNX8l5ny7dt4bK/rGwAh9utyP2b2Hv7PlZh1AAS54FQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-function-name": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-function-name/-/plugin-transform-function-name-7.8.3.tgz",
      "integrity": "sha512-rO/OnDS78Eifbjn5Py9v8y0aR+aSYhDhqAwVfsTl0ERuMZyr05L1aFSCJnbv2mmsLkit/4ReeQ9N2BgLnOcPCQ==",
      "requires": {
        "@babel/helper-function-name": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-literals": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-literals/-/plugin-transform-literals-7.8.3.tgz",
      "integrity": "sha512-3Tqf8JJ/qB7TeldGl+TT55+uQei9JfYaregDcEAyBZ7akutriFrt6C/wLYIer6OYhleVQvH/ntEhjE/xMmy10A==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-member-expression-literals": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-member-expression-literals/-/plugin-transform-member-expression-literals-7.8.3.tgz",
      "integrity": "sha512-3Wk2EXhnw+rP+IDkK6BdtPKsUE5IeZ6QOGrPYvw52NwBStw9V1ZVzxgK6fSKSxqUvH9eQPR3tm3cOq79HlsKYA==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-modules-amd": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-amd/-/plugin-transform-modules-amd-7.9.6.tgz",
      "integrity": "sha512-zoT0kgC3EixAyIAU+9vfaUVKTv9IxBDSabgHoUCBP6FqEJ+iNiN7ip7NBKcYqbfUDfuC2mFCbM7vbu4qJgOnDw==",
      "requires": {
        "@babel/helper-module-transforms": "^7.9.0",
        "@babel/helper-plugin-utils": "^7.8.3",
        "babel-plugin-dynamic-import-node": "^2.3.3"
      }
    },
    "@babel/plugin-transform-modules-commonjs": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.9.6.tgz",
      "integrity": "sha512-7H25fSlLcn+iYimmsNe3uK1at79IE6SKW9q0/QeEHTMC9MdOZ+4bA+T1VFB5fgOqBWoqlifXRzYD0JPdmIrgSQ==",
      "requires": {
        "@babel/helper-module-transforms": "^7.9.0",
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/helper-simple-access": "^7.8.3",
        "babel-plugin-dynamic-import-node": "^2.3.3"
      }
    },
    "@babel/plugin-transform-modules-systemjs": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-systemjs/-/plugin-transform-modules-systemjs-7.9.6.tgz",
      "integrity": "sha512-NW5XQuW3N2tTHim8e1b7qGy7s0kZ2OH3m5octc49K1SdAKGxYxeIx7hiIz05kS1R2R+hOWcsr1eYwcGhrdHsrg==",
      "requires": {
        "@babel/helper-hoist-variables": "^7.8.3",
        "@babel/helper-module-transforms": "^7.9.0",
        "@babel/helper-plugin-utils": "^7.8.3",
        "babel-plugin-dynamic-import-node": "^2.3.3"
      }
    },
    "@babel/plugin-transform-modules-umd": {
      "version": "7.9.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-umd/-/plugin-transform-modules-umd-7.9.0.tgz",
      "integrity": "sha512-uTWkXkIVtg/JGRSIABdBoMsoIeoHQHPTL0Y2E7xf5Oj7sLqwVsNXOkNk0VJc7vF0IMBsPeikHxFjGe+qmwPtTQ==",
      "requires": {
        "@babel/helper-module-transforms": "^7.9.0",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-named-capturing-groups-regex": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-named-capturing-groups-regex/-/plugin-transform-named-capturing-groups-regex-7.8.3.tgz",
      "integrity": "sha512-f+tF/8UVPU86TrCb06JoPWIdDpTNSGGcAtaD9mLP0aYGA0OS0j7j7DHJR0GTFrUZPUU6loZhbsVZgTh0N+Qdnw==",
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.8.3"
      }
    },
    "@babel/plugin-transform-new-target": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-new-target/-/plugin-transform-new-target-7.8.3.tgz",
      "integrity": "sha512-QuSGysibQpyxexRyui2vca+Cmbljo8bcRckgzYV4kRIsHpVeyeC3JDO63pY+xFZ6bWOBn7pfKZTqV4o/ix9sFw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-object-super": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-super/-/plugin-transform-object-super-7.8.3.tgz",
      "integrity": "sha512-57FXk+gItG/GejofIyLIgBKTas4+pEU47IXKDBWFTxdPd7F80H8zybyAY7UoblVfBhBGs2EKM+bJUu2+iUYPDQ==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/helper-replace-supers": "^7.8.3"
      }
    },
    "@babel/plugin-transform-parameters": {
      "version": "7.9.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-parameters/-/plugin-transform-parameters-7.9.5.tgz",
      "integrity": "sha512-0+1FhHnMfj6lIIhVvS4KGQJeuhe1GI//h5uptK4PvLt+BGBxsoUJbd3/IW002yk//6sZPlFgsG1hY6OHLcy6kA==",
      "requires": {
        "@babel/helper-get-function-arity": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-property-literals": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-property-literals/-/plugin-transform-property-literals-7.8.3.tgz",
      "integrity": "sha512-uGiiXAZMqEoQhRWMK17VospMZh5sXWg+dlh2soffpkAl96KAm+WZuJfa6lcELotSRmooLqg0MWdH6UUq85nmmg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-react-jsx": {
      "version": "7.9.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx/-/plugin-transform-react-jsx-7.9.4.tgz",
      "integrity": "sha512-Mjqf3pZBNLt854CK0C/kRuXAnE6H/bo7xYojP+WGtX8glDGSibcwnsWwhwoSuRg0+EBnxPC1ouVnuetUIlPSAw==",
      "requires": {
        "@babel/helper-builder-react-jsx": "^7.9.0",
        "@babel/helper-builder-react-jsx-experimental": "^7.9.0",
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-syntax-jsx": "^7.8.3"
      }
    },
    "@babel/plugin-transform-regenerator": {
      "version": "7.8.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.8.7.tgz",
      "integrity": "sha512-TIg+gAl4Z0a3WmD3mbYSk+J9ZUH6n/Yc57rtKRnlA/7rcCvpekHXe0CMZHP1gYp7/KLe9GHTuIba0vXmls6drA==",
      "requires": {
        "regenerator-transform": "^0.14.2"
      }
    },
    "@babel/plugin-transform-reserved-words": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-reserved-words/-/plugin-transform-reserved-words-7.8.3.tgz",
      "integrity": "sha512-mwMxcycN3omKFDjDQUl+8zyMsBfjRFr0Zn/64I41pmjv4NJuqcYlEtezwYtw9TFd9WR1vN5kiM+O0gMZzO6L0A==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-shorthand-properties": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-shorthand-properties/-/plugin-transform-shorthand-properties-7.8.3.tgz",
      "integrity": "sha512-I9DI6Odg0JJwxCHzbzW08ggMdCezoWcuQRz3ptdudgwaHxTjxw5HgdFJmZIkIMlRymL6YiZcped4TTCB0JcC8w==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-spread": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.8.3.tgz",
      "integrity": "sha512-CkuTU9mbmAoFOI1tklFWYYbzX5qCIZVXPVy0jpXgGwkplCndQAa58s2jr66fTeQnA64bDox0HL4U56CFYoyC7g==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-sticky-regex": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-sticky-regex/-/plugin-transform-sticky-regex-7.8.3.tgz",
      "integrity": "sha512-9Spq0vGCD5Bb4Z/ZXXSK5wbbLFMG085qd2vhL1JYu1WcQ5bXqZBAYRzU1d+p79GcHs2szYv5pVQCX13QgldaWw==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/helper-regex": "^7.8.3"
      }
    },
    "@babel/plugin-transform-template-literals": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-template-literals/-/plugin-transform-template-literals-7.8.3.tgz",
      "integrity": "sha512-820QBtykIQOLFT8NZOcTRJ1UNuztIELe4p9DCgvj4NK+PwluSJ49we7s9FB1HIGNIYT7wFUJ0ar2QpCDj0escQ==",
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-typeof-symbol": {
      "version": "7.8.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typeof-symbol/-/plugin-transform-typeof-symbol-7.8.4.tgz",
      "integrity": "sha512-2QKyfjGdvuNfHsb7qnBBlKclbD4CfshH2KvDabiijLMGXPHJXGxtDzwIF7bQP+T0ysw8fYTtxPafgfs/c1Lrqg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-transform-unicode-regex": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-regex/-/plugin-transform-unicode-regex-7.8.3.tgz",
      "integrity": "sha512-+ufgJjYdmWfSQ+6NS9VGUR2ns8cjJjYbrbi11mZBTaWm+Fui/ncTLFF28Ei1okavY+xkojGr1eJxNsWYeA5aZw==",
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/preset-env": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/preset-env/-/preset-env-7.9.6.tgz",
      "integrity": "sha512-0gQJ9RTzO0heXOhzftog+a/WyOuqMrAIugVYxMYf83gh1CQaQDjMtsOpqOwXyDL/5JcWsrCm8l4ju8QC97O7EQ==",
      "requires": {
        "@babel/compat-data": "^7.9.6",
        "@babel/helper-compilation-targets": "^7.9.6",
        "@babel/helper-module-imports": "^7.8.3",
        "@babel/helper-plugin-utils": "^7.8.3",
        "@babel/plugin-proposal-async-generator-functions": "^7.8.3",
        "@babel/plugin-proposal-dynamic-import": "^7.8.3",
        "@babel/plugin-proposal-json-strings": "^7.8.3",
        "@babel/plugin-proposal-nullish-coalescing-operator": "^7.8.3",
        "@babel/plugin-proposal-numeric-separator": "^7.8.3",
        "@babel/plugin-proposal-object-rest-spread": "^7.9.6",
        "@babel/plugin-proposal-optional-catch-binding": "^7.8.3",
        "@babel/plugin-proposal-optional-chaining": "^7.9.0",
        "@babel/plugin-proposal-unicode-property-regex": "^7.8.3",
        "@babel/plugin-syntax-async-generators": "^7.8.0",
        "@babel/plugin-syntax-dynamic-import": "^7.8.0",
        "@babel/plugin-syntax-json-strings": "^7.8.0",
        "@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.0",
        "@babel/plugin-syntax-numeric-separator": "^7.8.0",
        "@babel/plugin-syntax-object-rest-spread": "^7.8.0",
        "@babel/plugin-syntax-optional-catch-binding": "^7.8.0",
        "@babel/plugin-syntax-optional-chaining": "^7.8.0",
        "@babel/plugin-syntax-top-level-await": "^7.8.3",
        "@babel/plugin-transform-arrow-functions": "^7.8.3",
        "@babel/plugin-transform-async-to-generator": "^7.8.3",
        "@babel/plugin-transform-block-scoped-functions": "^7.8.3",
        "@babel/plugin-transform-block-scoping": "^7.8.3",
        "@babel/plugin-transform-classes": "^7.9.5",
        "@babel/plugin-transform-computed-properties": "^7.8.3",
        "@babel/plugin-transform-destructuring": "^7.9.5",
        "@babel/plugin-transform-dotall-regex": "^7.8.3",
        "@babel/plugin-transform-duplicate-keys": "^7.8.3",
        "@babel/plugin-transform-exponentiation-operator": "^7.8.3",
        "@babel/plugin-transform-for-of": "^7.9.0",
        "@babel/plugin-transform-function-name": "^7.8.3",
        "@babel/plugin-transform-literals": "^7.8.3",
        "@babel/plugin-transform-member-expression-literals": "^7.8.3",
        "@babel/plugin-transform-modules-amd": "^7.9.6",
        "@babel/plugin-transform-modules-commonjs": "^7.9.6",
        "@babel/plugin-transform-modules-systemjs": "^7.9.6",
        "@babel/plugin-transform-modules-umd": "^7.9.0",
        "@babel/plugin-transform-named-capturing-groups-regex": "^7.8.3",
        "@babel/plugin-transform-new-target": "^7.8.3",
        "@babel/plugin-transform-object-super": "^7.8.3",
        "@babel/plugin-transform-parameters": "^7.9.5",
        "@babel/plugin-transform-property-literals": "^7.8.3",
        "@babel/plugin-transform-regenerator": "^7.8.7",
        "@babel/plugin-transform-reserved-words": "^7.8.3",
        "@babel/plugin-transform-shorthand-properties": "^7.8.3",
        "@babel/plugin-transform-spread": "^7.8.3",
        "@babel/plugin-transform-sticky-regex": "^7.8.3",
        "@babel/plugin-transform-template-literals": "^7.8.3",
        "@babel/plugin-transform-typeof-symbol": "^7.8.4",
        "@babel/plugin-transform-unicode-regex": "^7.8.3",
        "@babel/preset-modules": "^0.1.3",
        "@babel/types": "^7.9.6",
        "browserslist": "^4.11.1",
        "core-js-compat": "^3.6.2",
        "invariant": "^2.2.2",
        "levenary": "^1.1.1",
        "semver": "^5.5.0"
      }
    },
    "@babel/preset-modules": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/@babel/preset-modules/-/preset-modules-0.1.3.tgz",
      "integrity": "sha512-Ra3JXOHBq2xd56xSF7lMKXdjBn3T772Y1Wet3yWnkDly9zHvJki029tAFzvAAK5cf4YV3yoxuP61crYRol6SVg==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-proposal-unicode-property-regex": "^7.4.4",
        "@babel/plugin-transform-dotall-regex": "^7.4.4",
        "@babel/types": "^7.4.4",
        "esutils": "^2.0.2"
      }
    },
    "@babel/runtime": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.9.6.tgz",
      "integrity": "sha512-64AF1xY3OAkFHqOb9s4jpgk1Mm5vDZ4L3acHvAml+53nO1XbXLuDodsVpO4OIUsmemlUHMxNdYMNJmsvOwLrvQ==",
      "requires": {
        "regenerator-runtime": "^0.13.4"
      }
    },
    "@babel/template": {
      "version": "7.8.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.8.6.tgz",
      "integrity": "sha512-zbMsPMy/v0PWFZEhQJ66bqjhH+z0JgMoBWuikXybgG3Gkd/3t5oQ1Rw2WQhnSrsOmsKXnZOx15tkC4qON/+JPg==",
      "requires": {
        "@babel/code-frame": "^7.8.3",
        "@babel/parser": "^7.8.6",
        "@babel/types": "^7.8.6"
      }
    },
    "@babel/traverse": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.9.6.tgz",
      "integrity": "sha512-b3rAHSjbxy6VEAvlxM8OV/0X4XrG72zoxme6q1MOoe2vd0bEc+TwayhuC1+Dfgqh1QEG+pj7atQqvUprHIccsg==",
      "requires": {
        "@babel/code-frame": "^7.8.3",
        "@babel/generator": "^7.9.6",
        "@babel/helper-function-name": "^7.9.5",
        "@babel/helper-split-export-declaration": "^7.8.3",
        "@babel/parser": "^7.9.6",
        "@babel/types": "^7.9.6",
        "debug": "^4.1.0",
        "globals": "^11.1.0",
        "lodash": "^4.17.13"
      }
    },
    "@babel/types": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.9.6.tgz",
      "integrity": "sha512-qxXzvBO//jO9ZnoasKF1uJzHd2+M6Q2ZPIVfnFps8JJvXy0ZBbwbNOmE6SGIY5XOY6d1Bo5lb9d9RJ8nv3WSeA==",
      "requires": {
        "@babel/helper-validator-identifier": "^7.9.5",
        "lodash": "^4.17.13",
        "to-fast-properties": "^2.0.0"
      }
    },
    "@iarna/toml": {
      "version": "2.2.5",
      "resolved": "https://registry.npmjs.org/@iarna/toml/-/toml-2.2.5.tgz",
      "integrity": "sha512-trnsAYxU3xnS1gPHPyU961coFyLkh4gAD/0zQ5mymY4yOZ+CYvsPqUbOFSw0aDM4y0tV7tiFxL/1XfXPNC6IPg=="
    },
    "@mapbox/geojson-area": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/@mapbox/geojson-area/-/geojson-area-0.2.2.tgz",
      "integrity": "sha1-GNeBSqNr8j+7zDefjiaiKSfevxA=",
      "requires": {
        "wgs84": "0.0.0"
      }
    },
    "@mapbox/geojson-rewind": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@mapbox/geojson-rewind/-/geojson-rewind-0.4.0.tgz",
      "integrity": "sha512-b+1uPWBERW4Pet/969BNu61ZPDyH2ilIxBjJDFzxyS9TyszF9UrTQyYIl/G38clux3rtpAGGFSGTCSF/qR6UjA==",
      "requires": {
        "@mapbox/geojson-area": "0.2.2",
        "concat-stream": "~1.6.0",
        "minimist": "1.2.0",
        "sharkdown": "^0.1.0"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
        }
      }
    },
    "@mrmlnc/readdir-enhanced": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/@mrmlnc/readdir-enhanced/-/readdir-enhanced-2.2.1.tgz",
      "integrity": "sha512-bPHp6Ji8b41szTOcaP63VlnbbO5Ny6dwAATtY6JTjh5N2OLrb5Qk/Th5cRkRQhkWCt+EJsYrNB0MiL+Gpn6e3g==",
      "requires": {
        "call-me-maybe": "^1.0.1",
        "glob-to-regexp": "^0.3.0"
      }
    },
    "@nodelib/fs.stat": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-1.1.3.tgz",
      "integrity": "sha512-shAmDyaQC4H92APFoIaVDHCx5bStIocgvbwQyxPRrbUY20V1EYTbSDchWbuwlMG3V17cprZhA6+78JfB+3DTPw=="
    },
    "@parcel/fs": {
      "version": "1.11.0",
      "resolved": "https://registry.npmjs.org/@parcel/fs/-/fs-1.11.0.tgz",
      "integrity": "sha512-86RyEqULbbVoeo8OLcv+LQ1Vq2PKBAvWTU9fCgALxuCTbbs5Ppcvll4Vr+Ko1AnmMzja/k++SzNAwJfeQXVlpA==",
      "requires": {
        "@parcel/utils": "^1.11.0",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.6.2"
      }
    },
    "@parcel/logger": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@parcel/logger/-/logger-1.11.1.tgz",
      "integrity": "sha512-9NF3M6UVeP2udOBDILuoEHd8VrF4vQqoWHEafymO1pfSoOMfxrSJZw1MfyAAIUN/IFp9qjcpDCUbDZB+ioVevA==",
      "requires": {
        "@parcel/workers": "^1.11.0",
        "chalk": "^2.1.0",
        "grapheme-breaker": "^0.3.2",
        "ora": "^2.1.0",
        "strip-ansi": "^4.0.0"
      }
    },
    "@parcel/utils": {
      "version": "1.11.0",
      "resolved": "https://registry.npmjs.org/@parcel/utils/-/utils-1.11.0.tgz",
      "integrity": "sha512-cA3p4jTlaMeOtAKR/6AadanOPvKeg8VwgnHhOyfi0yClD0TZS/hi9xu12w4EzA/8NtHu0g6o4RDfcNjqN8l1AQ=="
    },
    "@parcel/watcher": {
      "version": "1.12.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher/-/watcher-1.12.1.tgz",
      "integrity": "sha512-od+uCtCxC/KoNQAIE1vWx1YTyKYY+7CTrxBJPRh3cDWw/C0tCtlBMVlrbplscGoEpt6B27KhJDCv82PBxOERNA==",
      "requires": {
        "@parcel/utils": "^1.11.0",
        "chokidar": "^2.1.5"
      }
    },
    "@parcel/workers": {
      "version": "1.11.0",
      "resolved": "https://registry.npmjs.org/@parcel/workers/-/workers-1.11.0.tgz",
      "integrity": "sha512-USSjRAAQYsZFlv43FUPdD+jEGML5/8oLF0rUzPQTtK4q9kvaXr49F5ZplyLz5lox78cLZ0TxN2bIDQ1xhOkulQ==",
      "requires": {
        "@parcel/utils": "^1.11.0",
        "physical-cpu-count": "^2.0.0"
      }
    },
    "@types/geojson": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/@types/geojson/-/geojson-1.0.6.tgz",
      "integrity": "sha512-Xqg/lIZMrUd0VRmSRbCAewtwGZiAk3mEUDvV4op1tGl+LvyPcb/MIOSxTl9z+9+J+R4/vpjiCAT4xeKzH9ji1w==",
      "optional": true
    },
    "@types/q": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/@types/q/-/q-1.5.4.tgz",
      "integrity": "sha512-1HcDas8SEj4z1Wc696tH56G8OlRaH/sqZOynNNB+HF0WOeXPaxTtbYzJY2oEfiUxjSKjhCKr+MvR7dCHcEelug=="
    },
    "abab": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/abab/-/abab-2.0.3.tgz",
      "integrity": "sha512-tsFzPpcttalNjFBCFMqsKYQcWxxen1pgJR56by//QwvJc4/OUS3kPOOttx2tSIfjsylB0pYu7f5D3K1RCxUnUg=="
    },
    "acorn": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-7.2.0.tgz",
      "integrity": "sha512-apwXVmYVpQ34m/i71vrApRrRKCWQnZZF1+npOD0WV5xZFfwWOmKGQ2RWlfdy9vWITsenisM8M0Qeq8agcFHNiQ=="
    },
    "acorn-globals": {
      "version": "4.3.4",
      "resolved": "https://registry.npmjs.org/acorn-globals/-/acorn-globals-4.3.4.tgz",
      "integrity": "sha512-clfQEh21R+D0leSbUdWf3OcfqyaCSAQ8Ryq00bofSekfr9W8u1jyYZo6ir0xu9Gtcf7BjcHJpnbZH7JOCpP60A==",
      "requires": {
        "acorn": "^6.0.1",
        "acorn-walk": "^6.0.1"
      },
      "dependencies": {
        "acorn": {
          "version": "6.4.1",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.4.1.tgz",
          "integrity": "sha512-ZVA9k326Nwrj3Cj9jlh3wGFutC2ZornPNARZwsNYqQYgN0EsV2d53w5RN/co65Ohn4sUAUtb1rSUAOD6XN9idA=="
        }
      }
    },
    "acorn-walk": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-6.2.0.tgz",
      "integrity": "sha512-7evsyfH1cLOCdAzZAd43Cic04yKydNx0cF+7tiA19p1XnLLPU4dpCQOqpjqwokFe//vS0QqfqqjCS2JkiIs0cA=="
    },
    "ajv": {
      "version": "6.12.2",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.2.tgz",
      "integrity": "sha512-k+V+hzjm5q/Mr8ef/1Y9goCmlsK4I6Sm74teeyGvFk1XrOsbsKLjEdrvny42CZ+a8sXbk8KWpY/bDwS+FLL2UQ==",
      "requires": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      }
    },
    "alphanum-sort": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/alphanum-sort/-/alphanum-sort-1.0.2.tgz",
      "integrity": "sha1-l6ERlkmyEa0zaR2fn0hqjsn74KM="
    },
    "ansi-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
      "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
    },
    "ansi-styles": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
      "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
      "requires": {
        "color-convert": "^1.9.0"
      }
    },
    "ansi-to-html": {
      "version": "0.6.14",
      "resolved": "https://registry.npmjs.org/ansi-to-html/-/ansi-to-html-0.6.14.tgz",
      "integrity": "sha512-7ZslfB1+EnFSDO5Ju+ue5Y6It19DRnZXWv8jrGHgIlPna5Mh4jz7BV5jCbQneXNFurQcKoolaaAjHtgSBfOIuA==",
      "requires": {
        "entities": "^1.1.2"
      }
    },
    "ansicolors": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/ansicolors/-/ansicolors-0.2.1.tgz",
      "integrity": "sha1-vgiVmQl7dKXJxKhKDNvNtivYeu8="
    },
    "anymatch": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
      "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
      "requires": {
        "micromatch": "^3.1.4",
        "normalize-path": "^2.1.1"
      },
      "dependencies": {
        "normalize-path": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
          "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
          "requires": {
            "remove-trailing-separator": "^1.0.1"
          }
        }
      }
    },
    "argparse": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
      "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
      "requires": {
        "sprintf-js": "~1.0.2"
      }
    },
    "arr-diff": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
      "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA="
    },
    "arr-flatten": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
      "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg=="
    },
    "arr-union": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
      "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ="
    },
    "array-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/array-equal/-/array-equal-1.0.0.tgz",
      "integrity": "sha1-jCpe8kcv2ep0KwTHenUJO6J1fJM="
    },
    "array-unique": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
      "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg="
    },
    "asn1": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.4.tgz",
      "integrity": "sha512-jxwzQpLQjSmWXgwaCZE9Nz+glAG01yF1QnWgbhGwHI5A6FRIEY6IVqtHhIepHqI7/kyEyQEagBC5mBEFlIYvdg==",
      "requires": {
        "safer-buffer": "~2.1.0"
      }
    },
    "asn1.js": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
      "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
      "requires": {
        "bn.js": "^4.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw=="
        }
      }
    },
    "assert": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/assert/-/assert-1.5.0.tgz",
      "integrity": "sha512-EDsgawzwoun2CZkCgtxJbv392v4nbk9XDD06zI+kQYoBM/3RBWLlEyJARDOmhAAosBjWACEkKL6S+lIZtcAubA==",
      "requires": {
        "object-assign": "^4.1.1",
        "util": "0.10.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
          "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE="
        },
        "util": {
          "version": "0.10.3",
          "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
          "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
          "requires": {
            "inherits": "2.0.1"
          }
        }
      }
    },
    "assert-plus": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
      "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU="
    },
    "assign-symbols": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
      "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c="
    },
    "async-each": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.3.tgz",
      "integrity": "sha512-z/WhQ5FPySLdvREByI2vZiTWwCnF0moMJ1hK9YQwDTHKh6I7/uSckMetoRGb5UBZPC1z0jlw+n/XCgjeH7y1AQ=="
    },
    "async-limiter": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/async-limiter/-/async-limiter-1.0.1.tgz",
      "integrity": "sha512-csOlWGAcRFJaI6m+F2WKdnMKr4HhdhFVBk0H/QbJFMCr+uO2kwohwXQPxw/9OCxp05r5ghVBFSyioixx3gfkNQ=="
    },
    "asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
    },
    "atob": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
      "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg=="
    },
    "aws-sign2": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
      "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg="
    },
    "aws4": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.10.0.tgz",
      "integrity": "sha512-3YDiu347mtVtjpyV3u5kVqQLP242c06zwDOgpeRnybmXlYYsLbtTrUBUm8i8srONt+FWobl5aibnU1030PeeuA=="
    },
    "babel-plugin-dynamic-import-node": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/babel-plugin-dynamic-import-node/-/babel-plugin-dynamic-import-node-2.3.3.tgz",
      "integrity": "sha512-jZVI+s9Zg3IqA/kdi0i6UDCybUI3aSBLnglhYbSSjKlV7yF1F/5LWv8MakQmvYpnbJDS6fcBL2KzHSxNCMtWSQ==",
      "requires": {
        "object.assign": "^4.1.0"
      }
    },
    "babel-runtime": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
      "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
      "requires": {
        "core-js": "^2.4.0",
        "regenerator-runtime": "^0.11.0"
      },
      "dependencies": {
        "regenerator-runtime": {
          "version": "0.11.1",
          "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
          "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg=="
        }
      }
    },
    "babel-types": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-types/-/babel-types-6.26.0.tgz",
      "integrity": "sha1-o7Bz+Uq0nrb6Vc1lInozQ4BjJJc=",
      "requires": {
        "babel-runtime": "^6.26.0",
        "esutils": "^2.0.2",
        "lodash": "^4.17.4",
        "to-fast-properties": "^1.0.3"
      },
      "dependencies": {
        "to-fast-properties": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-1.0.3.tgz",
          "integrity": "sha1-uDVx+k2MJbguIxsG46MFXeTKGkc="
        }
      }
    },
    "babylon-walk": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/babylon-walk/-/babylon-walk-1.0.2.tgz",
      "integrity": "sha1-OxWl3btIKni0zpwByLoYFwLZ1s4=",
      "requires": {
        "babel-runtime": "^6.11.6",
        "babel-types": "^6.15.0",
        "lodash.clone": "^4.5.0"
      }
    },
    "balanced-match": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
      "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c="
    },
    "base": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
      "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
      "requires": {
        "cache-base": "^1.0.1",
        "class-utils": "^0.3.5",
        "component-emitter": "^1.2.1",
        "define-property": "^1.0.0",
        "isobject": "^3.0.1",
        "mixin-deep": "^1.2.0",
        "pascalcase": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "base64-js": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.1.tgz",
      "integrity": "sha512-mLQ4i2QO1ytvGWFWmcngKO//JXAQueZvwEKtjgQFM4jIK0kU+ytMfplL8j+n5mspOfjHwoAg+9yhb7BwAHm36g=="
    },
    "bcrypt-pbkdf": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
      "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
      "requires": {
        "tweetnacl": "^0.14.3"
      }
    },
    "binary-extensions": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.13.1.tgz",
      "integrity": "sha512-Un7MIEDdUC5gNpcGDV97op1Ywk748MpHcFTHoYs6qnj1Z3j7I53VG3nwZhKzoBZmbdRNnb6WRdFlwl7tSDuZGw=="
    },
    "bindings": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
      "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
      "requires": {
        "file-uri-to-path": "1.0.0"
      }
    },
    "bn.js": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-5.1.2.tgz",
      "integrity": "sha512-40rZaf3bUNKTVYu9sIeeEGOg7g14Yvnj9kH7b50EiwX0Q7A6umbvfI5tvHaOERH0XigqKkfLkFQxzb4e6CIXnA=="
    },
    "boolbase": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
      "integrity": "sha1-aN/1++YMUes3cl6p4+0xDcwed24="
    },
    "brace-expansion": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
      "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
      "requires": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "braces": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
      "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
      "requires": {
        "arr-flatten": "^1.1.0",
        "array-unique": "^0.3.2",
        "extend-shallow": "^2.0.1",
        "fill-range": "^4.0.0",
        "isobject": "^3.0.1",
        "repeat-element": "^1.1.2",
        "snapdragon": "^0.8.1",
        "snapdragon-node": "^2.0.1",
        "split-string": "^3.0.2",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "brfs": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/brfs/-/brfs-1.6.1.tgz",
      "integrity": "sha512-OfZpABRQQf+Xsmju8XE9bDjs+uU4vLREGolP7bDgcpsI17QREyZ4Bl+2KLxxx1kCgA0fAIhKQBaBYh+PEcCqYQ==",
      "requires": {
        "quote-stream": "^1.0.1",
        "resolve": "^1.1.5",
        "static-module": "^2.2.0",
        "through2": "^2.0.0"
      }
    },
    "brorand": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
      "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8="
    },
    "browser-process-hrtime": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/browser-process-hrtime/-/browser-process-hrtime-1.0.0.tgz",
      "integrity": "sha512-9o5UecI3GhkpM6DrXr69PblIuWxPKk9Y0jHBRhdocZ2y7YECBFCsHm79Pr3OyR2AvjhDkabFJaDJMYRazHgsow=="
    },
    "browserify-aes": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
      "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
      "requires": {
        "buffer-xor": "^1.0.3",
        "cipher-base": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.3",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "browserify-cipher": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
      "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
      "requires": {
        "browserify-aes": "^1.0.4",
        "browserify-des": "^1.0.0",
        "evp_bytestokey": "^1.0.0"
      }
    },
    "browserify-des": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
      "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
      "requires": {
        "cipher-base": "^1.0.1",
        "des.js": "^1.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "browserify-rsa": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
      "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
      "requires": {
        "bn.js": "^4.1.0",
        "randombytes": "^2.0.1"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw=="
        }
      }
    },
    "browserify-sign": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.2.0.tgz",
      "integrity": "sha512-hEZC1KEeYuoHRqhGhTy6gWrpJA3ZDjFWv0DE61643ZnOXAKJb3u7yWcrU0mMc9SwAqK1n7myPGndkp0dFG7NFA==",
      "requires": {
        "bn.js": "^5.1.1",
        "browserify-rsa": "^4.0.1",
        "create-hash": "^1.2.0",
        "create-hmac": "^1.1.7",
        "elliptic": "^6.5.2",
        "inherits": "^2.0.4",
        "parse-asn1": "^5.1.5",
        "readable-stream": "^3.6.0",
        "safe-buffer": "^5.2.0"
      },
      "dependencies": {
        "readable-stream": {
          "version": "3.6.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
          "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        },
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="
        }
      }
    },
    "browserify-zlib": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
      "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
      "requires": {
        "pako": "~1.0.5"
      },
      "dependencies": {
        "pako": {
          "version": "1.0.11",
          "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.11.tgz",
          "integrity": "sha512-4hLB8Py4zZce5s4yd9XzopqwVv/yGNhV1Bl8NTmCq1763HeK2+EwVTv+leGeL13Dnh2wfbqowVPXCIO0z4taYw=="
        }
      }
    },
    "browserslist": {
      "version": "4.12.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.12.0.tgz",
      "integrity": "sha512-UH2GkcEDSI0k/lRkuDSzFl9ZZ87skSy9w2XAn1MsZnL+4c4rqbBd3e82UWHbYDpztABrPBhZsTEeuxVfHppqDg==",
      "requires": {
        "caniuse-lite": "^1.0.30001043",
        "electron-to-chromium": "^1.3.413",
        "node-releases": "^1.1.53",
        "pkg-up": "^2.0.0"
      }
    },
    "buffer": {
      "version": "4.9.2",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.2.tgz",
      "integrity": "sha512-xq+q3SRMOxGivLhBNaUdC64hDTQwejJ+H0T/NB1XMtTVEwNTrfFF3gAxiyW0Bu/xWEGhjVKgUcMhCrUy2+uCWg==",
      "requires": {
        "base64-js": "^1.0.2",
        "ieee754": "^1.1.4",
        "isarray": "^1.0.0"
      }
    },
    "buffer-equal": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal/-/buffer-equal-0.0.1.tgz",
      "integrity": "sha1-kbx0sR6kBbyRa8aqkI+q+ltKrEs="
    },
    "buffer-from": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.1.tgz",
      "integrity": "sha512-MQcXEUbCKtEo7bhqEs6560Hyd4XaovZlO/k9V3hjVUF/zwW7KBVdSK4gIt/bzwS9MbR5qob+F5jusZsb0YQK2A=="
    },
    "buffer-xor": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
      "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk="
    },
    "builtin-status-codes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
      "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug="
    },
    "cache-base": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
      "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
      "requires": {
        "collection-visit": "^1.0.0",
        "component-emitter": "^1.2.1",
        "get-value": "^2.0.6",
        "has-value": "^1.0.0",
        "isobject": "^3.0.1",
        "set-value": "^2.0.0",
        "to-object-path": "^0.3.0",
        "union-value": "^1.0.0",
        "unset-value": "^1.0.0"
      }
    },
    "call-me-maybe": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/call-me-maybe/-/call-me-maybe-1.0.1.tgz",
      "integrity": "sha1-JtII6onje1y95gJQoV8DHBak1ms="
    },
    "caller-callsite": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/caller-callsite/-/caller-callsite-2.0.0.tgz",
      "integrity": "sha1-hH4PzgoiN1CpoCfFSzNzGtMVQTQ=",
      "requires": {
        "callsites": "^2.0.0"
      }
    },
    "caller-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/caller-path/-/caller-path-2.0.0.tgz",
      "integrity": "sha1-Ro+DBE42mrIBD6xfBs7uFbsssfQ=",
      "requires": {
        "caller-callsite": "^2.0.0"
      }
    },
    "callsites": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-2.0.0.tgz",
      "integrity": "sha1-BuuE8A7qQT2oav/vrL/7Ngk7PFA="
    },
    "camelcase": {
      "version": "5.3.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
      "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
    },
    "caniuse-api": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/caniuse-api/-/caniuse-api-3.0.0.tgz",
      "integrity": "sha512-bsTwuIg/BZZK/vreVTYYbSWoe2F+71P7K5QGEX+pT250DZbfU1MQ5prOKpPR+LL6uWKK3KMwMCAS74QB3Um1uw==",
      "requires": {
        "browserslist": "^4.0.0",
        "caniuse-lite": "^1.0.0",
        "lodash.memoize": "^4.1.2",
        "lodash.uniq": "^4.5.0"
      }
    },
    "caniuse-lite": {
      "version": "1.0.30001066",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001066.tgz",
      "integrity": "sha512-Gfj/WAastBtfxLws0RCh2sDbTK/8rJuSeZMecrSkNGYxPcv7EzblmDGfWQCFEQcSqYE2BRgQiJh8HOD07N5hIw=="
    },
    "cardinal": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/cardinal/-/cardinal-0.4.4.tgz",
      "integrity": "sha1-ylu2iltRG5D+k7ms6km97lwyv+I=",
      "requires": {
        "ansicolors": "~0.2.1",
        "redeyed": "~0.4.0"
      }
    },
    "caseless": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
      "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw="
    },
    "chalk": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
      "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
      "requires": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      }
    },
    "chokidar": {
      "version": "2.1.8",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.1.8.tgz",
      "integrity": "sha512-ZmZUazfOzf0Nve7duiCKD23PFSCs4JPoYyccjUFF3aQkQadqBhfzhjkwBH2mNOG9cTBwhamM37EIsIkZw3nRgg==",
      "requires": {
        "anymatch": "^2.0.0",
        "async-each": "^1.0.1",
        "braces": "^2.3.2",
        "fsevents": "^1.2.7",
        "glob-parent": "^3.1.0",
        "inherits": "^2.0.3",
        "is-binary-path": "^1.0.0",
        "is-glob": "^4.0.0",
        "normalize-path": "^3.0.0",
        "path-is-absolute": "^1.0.0",
        "readdirp": "^2.2.1",
        "upath": "^1.1.1"
      }
    },
    "cipher-base": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
      "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "class-utils": {
      "version": "0.3.6",
      "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
      "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
      "requires": {
        "arr-union": "^3.1.0",
        "define-property": "^0.2.5",
        "isobject": "^3.0.0",
        "static-extend": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        }
      }
    },
    "cli-cursor": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-2.1.0.tgz",
      "integrity": "sha1-s12sN2R5+sw+lHR9QdDQ9SOP/LU=",
      "requires": {
        "restore-cursor": "^2.0.0"
      }
    },
    "cli-spinners": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-1.3.1.tgz",
      "integrity": "sha512-1QL4544moEsDVH9T/l6Cemov/37iv1RtoKf7NJ04A60+4MREXNfx/QvavbH6QoGdsD4N4Mwy49cmaINR/o2mdg=="
    },
    "cliui": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
      "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
      "requires": {
        "string-width": "^3.1.0",
        "strip-ansi": "^5.2.0",
        "wrap-ansi": "^5.1.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        }
      }
    },
    "clone": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/clone/-/clone-2.1.2.tgz",
      "integrity": "sha1-G39Ln1kfHo+DZwQBYANFoCiHQ18="
    },
    "coa": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/coa/-/coa-2.0.2.tgz",
      "integrity": "sha512-q5/jG+YQnSy4nRTV4F7lPepBJZ8qBNJJDBuJdoejDyLXgmL7IEo+Le2JDZudFTFt7mrCqIRaSjws4ygRCTCAXA==",
      "requires": {
        "@types/q": "^1.5.1",
        "chalk": "^2.4.1",
        "q": "^1.1.2"
      }
    },
    "collection-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
      "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
      "requires": {
        "map-visit": "^1.0.0",
        "object-visit": "^1.0.0"
      }
    },
    "color": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/color/-/color-3.1.2.tgz",
      "integrity": "sha512-vXTJhHebByxZn3lDvDJYw4lR5+uB3vuoHsuYA5AKuxRVn5wzzIfQKGLBmgdVRHKTJYeK5rvJcHnrd0Li49CFpg==",
      "requires": {
        "color-convert": "^1.9.1",
        "color-string": "^1.5.2"
      }
    },
    "color-convert": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
      "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
      "requires": {
        "color-name": "1.1.3"
      }
    },
    "color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU="
    },
    "color-string": {
      "version": "1.5.3",
      "resolved": "https://registry.npmjs.org/color-string/-/color-string-1.5.3.tgz",
      "integrity": "sha512-dC2C5qeWoYkxki5UAXapdjqO672AM4vZuPGRQfO8b5HKuKGBbKWpITyDYN7TOFKvRW7kOgAn3746clDBMDJyQw==",
      "requires": {
        "color-name": "^1.0.0",
        "simple-swizzle": "^0.2.2"
      }
    },
    "combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "requires": {
        "delayed-stream": "~1.0.0"
      }
    },
    "command-exists": {
      "version": "1.2.9",
      "resolved": "https://registry.npmjs.org/command-exists/-/command-exists-1.2.9.tgz",
      "integrity": "sha512-LTQ/SGc+s0Xc0Fu5WaKnR0YiygZkm9eKFvyS+fRsU7/ZWFF8ykFM6Pc9aCVf1+xasOOZpO3BAVgVrKvsqKHV7w=="
    },
    "commander": {
      "version": "2.20.3",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
      "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ=="
    },
    "component-emitter": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz",
      "integrity": "sha512-Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg=="
    },
    "concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s="
    },
    "concat-stream": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
      "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
      "requires": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^2.2.2",
        "typedarray": "^0.0.6"
      }
    },
    "console-browserify": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.2.0.tgz",
      "integrity": "sha512-ZMkYO/LkF17QvCPqM0gxw8yUzigAOZOSWSHg91FH6orS7vcEj5dVZTidN2fQ14yBSdg97RqhSNwLUXInd52OTA=="
    },
    "constants-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
      "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U="
    },
    "convert-source-map": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.7.0.tgz",
      "integrity": "sha512-4FJkXzKXEDB1snCFZlLP4gpC3JILicCpGbzG9f9G7tGqGCzETQ2hWPrcinA9oU4wtf2biUaEH5065UnMeR33oA==",
      "requires": {
        "safe-buffer": "~5.1.1"
      }
    },
    "copy-descriptor": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
      "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40="
    },
    "core-js": {
      "version": "2.6.11",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.11.tgz",
      "integrity": "sha512-5wjnpaT/3dV+XB4borEsnAYQchn00XSgTAWKDkEqv+K8KevjbzmofK6hfJ9TZIlpj2N0xQpazy7PiRQiWHqzWg=="
    },
    "core-js-compat": {
      "version": "3.6.5",
      "resolved": "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.6.5.tgz",
      "integrity": "sha512-7ItTKOhOZbznhXAQ2g/slGg1PJV5zDO/WdkTwi7UEOJmkvsE32PWvx6mKtDjiMpjnR2CNf6BAD6sSxIlv7ptng==",
      "requires": {
        "browserslist": "^4.8.5",
        "semver": "7.0.0"
      },
      "dependencies": {
        "semver": {
          "version": "7.0.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-7.0.0.tgz",
          "integrity": "sha512-+GB6zVA9LWh6zovYQLALHwv5rb2PHGlJi3lfiqIHxR0uuwCgefcOJc59v9fv1w8GbStwxuuqqAjI9NMAOOgq1A=="
        }
      }
    },
    "core-util-is": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
      "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac="
    },
    "cosmiconfig": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-5.2.1.tgz",
      "integrity": "sha512-H65gsXo1SKjf8zmrJ67eJk8aIRKV5ff2D4uKZIBZShbhGSpEmsQOPW/SKMKYhSTrqR7ufy6RP69rPogdaPh/kA==",
      "requires": {
        "import-fresh": "^2.0.0",
        "is-directory": "^0.3.1",
        "js-yaml": "^3.13.1",
        "parse-json": "^4.0.0"
      }
    },
    "create-ecdh": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.3.tgz",
      "integrity": "sha512-GbEHQPMOswGpKXM9kCWVrremUcBmjteUaQ01T9rkKCPDXfUHX0IoP9LpHYo2NPFampa4e+/pFDc3jQdxrxQLaw==",
      "requires": {
        "bn.js": "^4.1.0",
        "elliptic": "^6.0.0"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw=="
        }
      }
    },
    "create-hash": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz",
      "integrity": "sha512-z00bCGNHDG8mHAkP7CtT1qVu+bFQUPjYq/4Iv3C3kWjTFV10zIjfSoeqXo9Asws8gwSHDGj/hl2u4OGIjapeCg==",
      "requires": {
        "cipher-base": "^1.0.1",
        "inherits": "^2.0.1",
        "md5.js": "^1.3.4",
        "ripemd160": "^2.0.1",
        "sha.js": "^2.4.0"
      }
    },
    "create-hmac": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz",
      "integrity": "sha512-MJG9liiZ+ogc4TzUwuvbER1JRdgvUFSB5+VR/g5h82fGaIRWMWddtKBHi7/sVhfjQZ6SehlyhvQYrcYkaUIpLg==",
      "requires": {
        "cipher-base": "^1.0.3",
        "create-hash": "^1.1.0",
        "inherits": "^2.0.1",
        "ripemd160": "^2.0.0",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "cross-spawn": {
      "version": "6.0.5",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
      "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
      "requires": {
        "nice-try": "^1.0.4",
        "path-key": "^2.0.1",
        "semver": "^5.5.0",
        "shebang-command": "^1.2.0",
        "which": "^1.2.9"
      }
    },
    "crypto-browserify": {
      "version": "3.12.0",
      "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
      "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
      "requires": {
        "browserify-cipher": "^1.0.0",
        "browserify-sign": "^4.0.0",
        "create-ecdh": "^4.0.0",
        "create-hash": "^1.1.0",
        "create-hmac": "^1.1.0",
        "diffie-hellman": "^5.0.0",
        "inherits": "^2.0.1",
        "pbkdf2": "^3.0.3",
        "public-encrypt": "^4.0.0",
        "randombytes": "^2.0.0",
        "randomfill": "^1.0.3"
      }
    },
    "css-color-names": {
      "version": "0.0.4",
      "resolved": "https://registry.npmjs.org/css-color-names/-/css-color-names-0.0.4.tgz",
      "integrity": "sha1-gIrcLnnPhHOAabZGyyDsJ762KeA="
    },
    "css-declaration-sorter": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/css-declaration-sorter/-/css-declaration-sorter-4.0.1.tgz",
      "integrity": "sha512-BcxQSKTSEEQUftYpBVnsH4SF05NTuBokb19/sBt6asXGKZ/6VP7PLG1CBCkFDYOnhXhPh0jMhO6xZ71oYHXHBA==",
      "requires": {
        "postcss": "^7.0.1",
        "timsort": "^0.3.0"
      }
    },
    "css-modules-loader-core": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/css-modules-loader-core/-/css-modules-loader-core-1.1.0.tgz",
      "integrity": "sha1-WQhmgpShvs0mGuCkziGwtVHyHRY=",
      "requires": {
        "icss-replace-symbols": "1.1.0",
        "postcss": "6.0.1",
        "postcss-modules-extract-imports": "1.1.0",
        "postcss-modules-local-by-default": "1.2.0",
        "postcss-modules-scope": "1.1.0",
        "postcss-modules-values": "1.3.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8="
        },
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4="
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "requires": {
            "ansi-styles": "^2.2.1",
            "escape-string-regexp": "^1.0.2",
            "has-ansi": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "supports-color": "^2.0.0"
          },
          "dependencies": {
            "supports-color": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
              "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc="
            }
          }
        },
        "has-flag": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-1.0.0.tgz",
          "integrity": "sha1-nZ55MWXOAXoA8AQYxD+UKnsdEfo="
        },
        "postcss": {
          "version": "6.0.1",
          "resolved": "https://registry.npmjs.org/postcss/-/postcss-6.0.1.tgz",
          "integrity": "sha1-AA29H47vIXqjaLmiEsX8QLKo8/I=",
          "requires": {
            "chalk": "^1.1.3",
            "source-map": "^0.5.6",
            "supports-color": "^3.2.3"
          }
        },
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
        },
        "strip-ansi": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
          "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "supports-color": {
          "version": "3.2.3",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-3.2.3.tgz",
          "integrity": "sha1-ZawFBLOVQXHYpklGsq48u4pfVPY=",
          "requires": {
            "has-flag": "^1.0.0"
          }
        }
      }
    },
    "css-select": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/css-select/-/css-select-2.1.0.tgz",
      "integrity": "sha512-Dqk7LQKpwLoH3VovzZnkzegqNSuAziQyNZUcrdDM401iY+R5NkGBXGmtO05/yaXQziALuPogeG0b7UAgjnTJTQ==",
      "requires": {
        "boolbase": "^1.0.0",
        "css-what": "^3.2.1",
        "domutils": "^1.7.0",
        "nth-check": "^1.0.2"
      }
    },
    "css-select-base-adapter": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/css-select-base-adapter/-/css-select-base-adapter-0.1.1.tgz",
      "integrity": "sha512-jQVeeRG70QI08vSTwf1jHxp74JoZsr2XSgETae8/xC8ovSnL2WF87GTLO86Sbwdt2lK4Umg4HnnwMO4YF3Ce7w=="
    },
    "css-selector-tokenizer": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/css-selector-tokenizer/-/css-selector-tokenizer-0.7.2.tgz",
      "integrity": "sha512-yj856NGuAymN6r8bn8/Jl46pR+OC3eEvAhfGYDUe7YPtTPAYrSSw4oAniZ9Y8T5B92hjhwTBLUen0/vKPxf6pw==",
      "requires": {
        "cssesc": "^3.0.0",
        "fastparse": "^1.1.2",
        "regexpu-core": "^4.6.0"
      }
    },
    "css-tree": {
      "version": "1.0.0-alpha.37",
      "resolved": "https://registry.npmjs.org/css-tree/-/css-tree-1.0.0-alpha.37.tgz",
      "integrity": "sha512-DMxWJg0rnz7UgxKT0Q1HU/L9BeJI0M6ksor0OgqOnF+aRCDWg/N2641HmVyU9KVIu0OVVWOb2IpC9A+BJRnejg==",
      "requires": {
        "mdn-data": "2.0.4",
        "source-map": "^0.6.1"
      }
    },
    "css-what": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/css-what/-/css-what-3.2.1.tgz",
      "integrity": "sha512-WwOrosiQTvyms+Ti5ZC5vGEK0Vod3FTt1ca+payZqvKuGJF+dq7bG63DstxtN0dpm6FxY27a/zS3Wten+gEtGw=="
    },
    "cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg=="
    },
    "cssnano": {
      "version": "4.1.10",
      "resolved": "https://registry.npmjs.org/cssnano/-/cssnano-4.1.10.tgz",
      "integrity": "sha512-5wny+F6H4/8RgNlaqab4ktc3e0/blKutmq8yNlBFXA//nSFFAqAngjNVRzUvCgYROULmZZUoosL/KSoZo5aUaQ==",
      "requires": {
        "cosmiconfig": "^5.0.0",
        "cssnano-preset-default": "^4.0.7",
        "is-resolvable": "^1.0.0",
        "postcss": "^7.0.0"
      }
    },
    "cssnano-preset-default": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/cssnano-preset-default/-/cssnano-preset-default-4.0.7.tgz",
      "integrity": "sha512-x0YHHx2h6p0fCl1zY9L9roD7rnlltugGu7zXSKQx6k2rYw0Hi3IqxcoAGF7u9Q5w1nt7vK0ulxV8Lo+EvllGsA==",
      "requires": {
        "css-declaration-sorter": "^4.0.1",
        "cssnano-util-raw-cache": "^4.0.1",
        "postcss": "^7.0.0",
        "postcss-calc": "^7.0.1",
        "postcss-colormin": "^4.0.3",
        "postcss-convert-values": "^4.0.1",
        "postcss-discard-comments": "^4.0.2",
        "postcss-discard-duplicates": "^4.0.2",
        "postcss-discard-empty": "^4.0.1",
        "postcss-discard-overridden": "^4.0.1",
        "postcss-merge-longhand": "^4.0.11",
        "postcss-merge-rules": "^4.0.3",
        "postcss-minify-font-values": "^4.0.2",
        "postcss-minify-gradients": "^4.0.2",
        "postcss-minify-params": "^4.0.2",
        "postcss-minify-selectors": "^4.0.2",
        "postcss-normalize-charset": "^4.0.1",
        "postcss-normalize-display-values": "^4.0.2",
        "postcss-normalize-positions": "^4.0.2",
        "postcss-normalize-repeat-style": "^4.0.2",
        "postcss-normalize-string": "^4.0.2",
        "postcss-normalize-timing-functions": "^4.0.2",
        "postcss-normalize-unicode": "^4.0.1",
        "postcss-normalize-url": "^4.0.1",
        "postcss-normalize-whitespace": "^4.0.2",
        "postcss-ordered-values": "^4.1.2",
        "postcss-reduce-initial": "^4.0.3",
        "postcss-reduce-transforms": "^4.0.2",
        "postcss-svgo": "^4.0.2",
        "postcss-unique-selectors": "^4.0.1"
      }
    },
    "cssnano-util-get-arguments": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/cssnano-util-get-arguments/-/cssnano-util-get-arguments-4.0.0.tgz",
      "integrity": "sha1-7ToIKZ8h11dBsg87gfGU7UnMFQ8="
    },
    "cssnano-util-get-match": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/cssnano-util-get-match/-/cssnano-util-get-match-4.0.0.tgz",
      "integrity": "sha1-wOTKB/U4a7F+xeUiULT1lhNlFW0="
    },
    "cssnano-util-raw-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/cssnano-util-raw-cache/-/cssnano-util-raw-cache-4.0.1.tgz",
      "integrity": "sha512-qLuYtWK2b2Dy55I8ZX3ky1Z16WYsx544Q0UWViebptpwn/xDBmog2TLg4f+DBMg1rJ6JDWtn96WHbOKDWt1WQA==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "cssnano-util-same-parent": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/cssnano-util-same-parent/-/cssnano-util-same-parent-4.0.1.tgz",
      "integrity": "sha512-WcKx5OY+KoSIAxBW6UBBRay1U6vkYheCdjyVNDm85zt5K9mHoGOfsOsqIszfAqrQQFIIKgjh2+FDgIj/zsl21Q=="
    },
    "csso": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/csso/-/csso-4.0.3.tgz",
      "integrity": "sha512-NL3spysxUkcrOgnpsT4Xdl2aiEiBG6bXswAABQVHcMrfjjBisFOKwLDOmf4wf32aPdcJws1zds2B0Rg+jqMyHQ==",
      "requires": {
        "css-tree": "1.0.0-alpha.39"
      },
      "dependencies": {
        "css-tree": {
          "version": "1.0.0-alpha.39",
          "resolved": "https://registry.npmjs.org/css-tree/-/css-tree-1.0.0-alpha.39.tgz",
          "integrity": "sha512-7UvkEYgBAHRG9Nt980lYxjsTrCyHFN53ky3wVsDkiMdVqylqRt+Zc+jm5qw7/qyOvN2dHSYtX0e4MbCCExSvnA==",
          "requires": {
            "mdn-data": "2.0.6",
            "source-map": "^0.6.1"
          }
        },
        "mdn-data": {
          "version": "2.0.6",
          "resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.0.6.tgz",
          "integrity": "sha512-rQvjv71olwNHgiTbfPZFkJtjNMciWgswYeciZhtvWLO8bmX3TnhyA62I6sTWOyZssWHJJjY6/KiWwqQsWWsqOA=="
        }
      }
    },
    "cssom": {
      "version": "0.3.8",
      "resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.8.tgz",
      "integrity": "sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg=="
    },
    "cssstyle": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-1.4.0.tgz",
      "integrity": "sha512-GBrLZYZ4X4x6/QEoBnIrqb8B/f5l4+8me2dkom/j1Gtbxy0kBv6OGzKuAsGM75bkGwGAFkt56Iwg28S3XTZgSA==",
      "requires": {
        "cssom": "0.3.x"
      }
    },
    "dashdash": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
      "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "data-urls": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/data-urls/-/data-urls-1.1.0.tgz",
      "integrity": "sha512-YTWYI9se1P55u58gL5GkQHW4P6VJBJ5iBT+B5a7i2Tjadhv52paJG0qHX4A0OR6/t52odI64KP2YvFpkDOi3eQ==",
      "requires": {
        "abab": "^2.0.0",
        "whatwg-mimetype": "^2.2.0",
        "whatwg-url": "^7.0.0"
      }
    },
    "deasync": {
      "version": "0.1.20",
      "resolved": "https://registry.npmjs.org/deasync/-/deasync-0.1.20.tgz",
      "integrity": "sha512-E1GI7jMI57hL30OX6Ht/hfQU8DO4AuB9m72WFm4c38GNbUD4Q03//XZaOIHZiY+H1xUaomcot5yk2q/qIZQkGQ==",
      "requires": {
        "bindings": "^1.5.0",
        "node-addon-api": "^1.7.1"
      }
    },
    "debug": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
      "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
      "requires": {
        "ms": "^2.1.1"
      }
    },
    "decamelize": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
      "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA="
    },
    "decode-uri-component": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
      "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU="
    },
    "deep-is": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.3.tgz",
      "integrity": "sha1-s2nW+128E+7PUk+RsHD+7cNXzzQ="
    },
    "defaults": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/defaults/-/defaults-1.0.3.tgz",
      "integrity": "sha1-xlYFHpgX2f8I7YgUd/P+QBnz730=",
      "requires": {
        "clone": "^1.0.2"
      },
      "dependencies": {
        "clone": {
          "version": "1.0.4",
          "resolved": "https://registry.npmjs.org/clone/-/clone-1.0.4.tgz",
          "integrity": "sha1-2jCcwmPfFZlMaIypAheco8fNfH4="
        }
      }
    },
    "define-properties": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.1.3.tgz",
      "integrity": "sha512-3MqfYKj2lLzdMSf8ZIZE/V+Zuy+BgD6f164e8K2w7dgnpKArBDerGYpM46IYYcjnkdPNMjPk9A6VFB8+3SKlXQ==",
      "requires": {
        "object-keys": "^1.0.12"
      }
    },
    "define-property": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
      "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
      "requires": {
        "is-descriptor": "^1.0.2",
        "isobject": "^3.0.1"
      },
      "dependencies": {
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk="
    },
    "depd": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
      "integrity": "sha1-m81S4UwJd2PnSbJ0xDRu0uVgtak="
    },
    "des.js": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.1.tgz",
      "integrity": "sha512-Q0I4pfFrv2VPd34/vfLrFOoRmlYj3OV50i7fskps1jZWK1kApMWWT9G6RRUeYedLcBDIhnSDaUvJMb3AhUlaEA==",
      "requires": {
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      }
    },
    "destroy": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.0.4.tgz",
      "integrity": "sha1-l4hXRCxEdJ5CBmE+N5RiBYJqvYA="
    },
    "diffie-hellman": {
      "version": "5.0.3",
      "resolved": "https://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz",
      "integrity": "sha512-kqag/Nl+f3GwyK25fhUMYj81BUOrZ9IuJsjIcDE5icNM9FJHAVm3VcUDxdLPoQtTuUylWm6ZIknYJwwaPxsUzg==",
      "requires": {
        "bn.js": "^4.1.0",
        "miller-rabin": "^4.0.0",
        "randombytes": "^2.0.0"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw=="
        }
      }
    },
    "dom-serializer": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/dom-serializer/-/dom-serializer-0.2.2.tgz",
      "integrity": "sha512-2/xPb3ORsQ42nHYiSunXkDjPLBaEj/xTwUO4B7XCZQTRk7EBtTOPaygh10YAAh2OI1Qrp6NWfpAhzswj0ydt9g==",
      "requires": {
        "domelementtype": "^2.0.1",
        "entities": "^2.0.0"
      },
      "dependencies": {
        "domelementtype": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-2.0.1.tgz",
          "integrity": "sha512-5HOHUDsYZWV8FGWN0Njbr/Rn7f/eWSQi1v7+HsUVwXgn8nWWlL64zKDkS0n8ZmQ3mlWOMuXOnR+7Nx/5tMO5AQ=="
        },
        "entities": {
          "version": "2.0.2",
          "resolved": "https://registry.npmjs.org/entities/-/entities-2.0.2.tgz",
          "integrity": "sha512-dmD3AvJQBUjKpcNkoqr+x+IF0SdRtPz9Vk0uTy4yWqga9ibB6s4v++QFWNohjiUGoMlF552ZvNyXDxz5iW0qmw=="
        }
      }
    },
    "domain-browser": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
      "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA=="
    },
    "domelementtype": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-1.3.1.tgz",
      "integrity": "sha512-BSKB+TSpMpFI/HOxCNr1O8aMOTZ8hT3pM3GQ0w/mWRmkhEDSFJkkyzz4XQsBV44BChwGkrDfMyjVD0eA2aFV3w=="
    },
    "domexception": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/domexception/-/domexception-1.0.1.tgz",
      "integrity": "sha512-raigMkn7CJNNo6Ihro1fzG7wr3fHuYVytzquZKX5n0yizGsTcYgzdIUwj1X9pK0VvjeihV+XiclP+DjwbsSKug==",
      "requires": {
        "webidl-conversions": "^4.0.2"
      }
    },
    "domhandler": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/domhandler/-/domhandler-2.4.2.tgz",
      "integrity": "sha512-JiK04h0Ht5u/80fdLMCEmV4zkNh2BcoMFBmZ/91WtYZ8qVXSKjiw7fXMgFPnHcSZgOo3XdinHvmnDUeMf5R4wA==",
      "requires": {
        "domelementtype": "1"
      }
    },
    "domutils": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/domutils/-/domutils-1.7.0.tgz",
      "integrity": "sha512-Lgd2XcJ/NjEw+7tFvfKxOzCYKZsdct5lczQ2ZaQY8Djz7pfAD3Gbp8ySJWtreII/vDlMVmxwa6pHmdxIYgttDg==",
      "requires": {
        "dom-serializer": "0",
        "domelementtype": "1"
      }
    },
    "dot-prop": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/dot-prop/-/dot-prop-5.2.0.tgz",
      "integrity": "sha512-uEUyaDKoSQ1M4Oq8l45hSE26SnTxL6snNnqvK/VWx5wJhmff5z0FUVJDKDanor/6w3kzE3i7XZOk+7wC0EXr1A==",
      "requires": {
        "is-obj": "^2.0.0"
      }
    },
    "dotenv": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-5.0.1.tgz",
      "integrity": "sha512-4As8uPrjfwb7VXC+WnLCbXK7y+Ueb2B3zgNCePYfhxS1PYeaO1YTeplffTEcbfLhvFNGLAz90VvJs9yomG7bow=="
    },
    "dotenv-expand": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/dotenv-expand/-/dotenv-expand-5.1.0.tgz",
      "integrity": "sha512-YXQl1DSa4/PQyRfgrv6aoNjhasp/p4qs9FjJ4q4cQk+8m4r6k4ZSiEyytKG8f8W9gi8WsQtIObNmKd+tMzNTmA=="
    },
    "duplexer2": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/duplexer2/-/duplexer2-0.1.4.tgz",
      "integrity": "sha1-ixLauHjA1p4+eJEFFmKjL8a93ME=",
      "requires": {
        "readable-stream": "^2.0.2"
      }
    },
    "ecc-jsbn": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
      "integrity": "sha1-OoOpBOVDUyh4dMVkt1SThoSamMk=",
      "requires": {
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.1.0"
      }
    },
    "ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha1-WQxhFWsK4vTwJVcyoViyZrxWsh0="
    },
    "electron-to-chromium": {
      "version": "1.3.451",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.3.451.tgz",
      "integrity": "sha512-2fvco0F2bBIgqzO8GRP0Jt/91pdrf9KfZ5FsmkYkjERmIJG585cFeFZV4+CO6oTmU3HmCTgfcZuEa7kW8VUh3A=="
    },
    "elliptic": {
      "version": "6.5.2",
      "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.2.tgz",
      "integrity": "sha512-f4x70okzZbIQl/NSRLkI/+tteV/9WqL98zx+SQ69KbXxmVrmjwsNUPn/gYJJ0sHvEak24cZgHIPegRePAtA/xw==",
      "requires": {
        "bn.js": "^4.4.0",
        "brorand": "^1.0.1",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.0"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw=="
        }
      }
    },
    "emoji-regex": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
      "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
    },
    "encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha1-rT/0yG7C0CkyL1oCw6mmBslbP1k="
    },
    "entities": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/entities/-/entities-1.1.2.tgz",
      "integrity": "sha512-f2LZMYl1Fzu7YSBKg+RoROelpOaNrcGmE9AZubeDfrCEia483oW4MI4VyFd5VNHIgQ/7qm1I0wUHK1eJnn2y2w=="
    },
    "envinfo": {
      "version": "7.5.1",
      "resolved": "https://registry.npmjs.org/envinfo/-/envinfo-7.5.1.tgz",
      "integrity": "sha512-hQBkDf2iO4Nv0CNHpCuSBeaSrveU6nThVxFGTrq/eDlV716UQk09zChaJae4mZRsos1x4YLY2TaH3LHUae3ZmQ=="
    },
    "error-ex": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz",
      "integrity": "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==",
      "requires": {
        "is-arrayish": "^0.2.1"
      }
    },
    "es-abstract": {
      "version": "1.17.5",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.5.tgz",
      "integrity": "sha512-BR9auzDbySxOcfog0tLECW8l28eRGpDpU3Dm3Hp4q/N+VtLTmyj4EUN088XZWQDW/hzj6sYRDXeOFsaAODKvpg==",
      "requires": {
        "es-to-primitive": "^1.2.1",
        "function-bind": "^1.1.1",
        "has": "^1.0.3",
        "has-symbols": "^1.0.1",
        "is-callable": "^1.1.5",
        "is-regex": "^1.0.5",
        "object-inspect": "^1.7.0",
        "object-keys": "^1.1.1",
        "object.assign": "^4.1.0",
        "string.prototype.trimleft": "^2.1.1",
        "string.prototype.trimright": "^2.1.1"
      },
      "dependencies": {
        "object-inspect": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.7.0.tgz",
          "integrity": "sha512-a7pEHdh1xKIAgTySUGgLMx/xwDZskN1Ud6egYYN3EdRW4ZMPNEDUTF+hwy2LUC+Bl+SyLXANnwz/jyh/qutKUw=="
        }
      }
    },
    "es-to-primitive": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.2.1.tgz",
      "integrity": "sha512-QCOllgZJtaUo9miYBcLChTUaHNjJF3PYs1VidD7AwiEj1kYxKeQTctLAezAOH5ZKRH0g2IgPn6KwB4IT8iRpvA==",
      "requires": {
        "is-callable": "^1.1.4",
        "is-date-object": "^1.0.1",
        "is-symbol": "^1.0.2"
      }
    },
    "escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg="
    },
    "escape-string-regexp": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
      "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ="
    },
    "escodegen": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.9.1.tgz",
      "integrity": "sha512-6hTjO1NAWkHnDk3OqQ4YrCuwwmGHL9S3nPlzBOUG/R44rda3wLNrfvQ5fkSGjyhHFKM7ALPKcKGrwvCLe0lC7Q==",
      "requires": {
        "esprima": "^3.1.3",
        "estraverse": "^4.2.0",
        "esutils": "^2.0.2",
        "optionator": "^0.8.1",
        "source-map": "~0.6.1"
      }
    },
    "esprima": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-3.1.3.tgz",
      "integrity": "sha1-/cpRzuYTOJXjyI1TXOSdv/YqRjM="
    },
    "estraverse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
      "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw=="
    },
    "esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g=="
    },
    "etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha1-Qa4u62XvpiJorr/qg6x9eSmbCIc="
    },
    "events": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.1.0.tgz",
      "integrity": "sha512-Rv+u8MLHNOdMjTAFeT3nCjHn2aGlx435FP/sDHNaRhDEMwyI/aB22Kj2qIN8R0cw3z28psEQLYwxVKLsKrMgWg=="
    },
    "evp_bytestokey": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
      "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
      "requires": {
        "md5.js": "^1.3.4",
        "safe-buffer": "^5.1.1"
      }
    },
    "expand-brackets": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
      "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
      "requires": {
        "debug": "^2.3.3",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "posix-character-classes": "^0.1.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "requires": {
            "ms": "2.0.0"
          }
        },
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
        }
      }
    },
    "extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="
    },
    "extend-shallow": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
      "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
      "requires": {
        "assign-symbols": "^1.0.0",
        "is-extendable": "^1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "requires": {
            "is-plain-object": "^2.0.4"
          }
        }
      }
    },
    "extglob": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
      "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
      "requires": {
        "array-unique": "^0.3.2",
        "define-property": "^1.0.0",
        "expand-brackets": "^2.1.4",
        "extend-shallow": "^2.0.1",
        "fragment-cache": "^0.2.1",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "extsprintf": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
      "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU="
    },
    "falafel": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/falafel/-/falafel-2.2.4.tgz",
      "integrity": "sha512-0HXjo8XASWRmsS0X1EkhwEMZaD3Qvp7FfURwjLKjG1ghfRm/MGZl2r4cWUTv41KdNghTw4OUMmVtdGQp3+H+uQ==",
      "requires": {
        "acorn": "^7.1.1",
        "foreach": "^2.0.5",
        "isarray": "^2.0.1",
        "object-keys": "^1.0.6"
      },
      "dependencies": {
        "isarray": {
          "version": "2.0.5",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.5.tgz",
          "integrity": "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw=="
        }
      }
    },
    "fast-deep-equal": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.1.tgz",
      "integrity": "sha512-8UEa58QDLauDNfpbrX55Q9jrGHThw2ZMdOky5Gl1CDtVeJDPVrG4Jxx1N8jw2gkWaff5UUuX1KJd+9zGe2B+ZA=="
    },
    "fast-glob": {
      "version": "2.2.7",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-2.2.7.tgz",
      "integrity": "sha512-g1KuQwHOZAmOZMuBtHdxDtju+T2RT8jgCC9aANsbpdiDDTSnjgfuVsIBNKbUeJI3oKMRExcfNDtJl4OhbffMsw==",
      "requires": {
        "@mrmlnc/readdir-enhanced": "^2.2.1",
        "@nodelib/fs.stat": "^1.1.2",
        "glob-parent": "^3.1.0",
        "is-glob": "^4.0.0",
        "merge2": "^1.2.3",
        "micromatch": "^3.1.10"
      }
    },
    "fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw=="
    },
    "fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha1-PYpcZog6FqMMqGQ+hR8Zuqd5eRc="
    },
    "fastparse": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/fastparse/-/fastparse-1.1.2.tgz",
      "integrity": "sha512-483XLLxTVIwWK3QTrMGRqUfUpoOs/0hbQrl2oz4J0pAcm3A3bu84wxTFqGqkJzewCLdME38xJLJAxBABfQT8sQ=="
    },
    "file-uri-to-path": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
      "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw=="
    },
    "filesize": {
      "version": "3.6.1",
      "resolved": "https://registry.npmjs.org/filesize/-/filesize-3.6.1.tgz",
      "integrity": "sha512-7KjR1vv6qnicaPMi1iiTcI85CyYwRO/PSFCu6SvqL8jN2Wjt/NIYQTFtFs7fSDCYOstUkEWIQGFUg5YZQfjlcg=="
    },
    "fill-range": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
      "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1",
        "to-regex-range": "^2.1.0"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "find-up": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
      "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
      "requires": {
        "locate-path": "^2.0.0"
      }
    },
    "for-in": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
      "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA="
    },
    "foreach": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/foreach/-/foreach-2.0.5.tgz",
      "integrity": "sha1-C+4AUBiusmDQo6865ljdATbsG5k="
    },
    "forever-agent": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
      "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE="
    },
    "form-data": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
      "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
      "requires": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.6",
        "mime-types": "^2.1.12"
      }
    },
    "fragment-cache": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
      "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
      "requires": {
        "map-cache": "^0.2.2"
      }
    },
    "fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha1-PYyt2Q2XZWn6g1qx+OSyOhBWBac="
    },
    "fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8="
    },
    "fsevents": {
      "version": "1.2.13",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.13.tgz",
      "integrity": "sha512-oWb1Z6mkHIskLzEJ/XWX0srkpkTQ7vaopMQkyaEIoq0fmtFVxOthb8cCxeT+p3ynTdkk/RZwbgG4brR5BeWECw==",
      "optional": true,
      "requires": {
        "bindings": "^1.5.0",
        "nan": "^2.12.1"
      }
    },
    "function-bind": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
      "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
    },
    "gensync": {
      "version": "1.0.0-beta.1",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.1.tgz",
      "integrity": "sha512-r8EC6NO1sngH/zdD9fiRDLdcgnbayXah+mLgManTaIZJqEC1MZstmnox8KpnI2/fxQwrp5OpCOYWLp4rBl4Jcg=="
    },
    "geojson-numeric": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/geojson-numeric/-/geojson-numeric-0.2.1.tgz",
      "integrity": "sha512-rvItMp3W7pe16o2EQTnRw54v6WHdiE4bYjUsdr3FZskFb6oPC7gjLe4zginP+Wd1B/HLl2acTukfn16Lmwn7lg==",
      "requires": {
        "concat-stream": "2.0.0",
        "optimist": "~0.3.5"
      },
      "dependencies": {
        "concat-stream": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-2.0.0.tgz",
          "integrity": "sha512-MWufYdFw53ccGjCA+Ol7XJYpAlW6/prSMzuPOTRnJGcGzuhLn4Scrz7qf6o8bROZ514ltazcIFJZevcfbo0x7A==",
          "requires": {
            "buffer-from": "^1.0.0",
            "inherits": "^2.0.3",
            "readable-stream": "^3.0.2",
            "typedarray": "^0.0.6"
          }
        },
        "readable-stream": {
          "version": "3.6.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
          "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        }
      }
    },
    "get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg=="
    },
    "get-port": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/get-port/-/get-port-3.2.0.tgz",
      "integrity": "sha1-3Xzn3hh8Bsi/NTeWrHHgmfCYDrw="
    },
    "get-value": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
      "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg="
    },
    "getpass": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
      "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "glob": {
      "version": "7.1.6",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
      "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
      "requires": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.0.4",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      }
    },
    "glob-parent": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
      "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
      "requires": {
        "is-glob": "^3.1.0",
        "path-dirname": "^1.0.0"
      },
      "dependencies": {
        "is-glob": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
          "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
          "requires": {
            "is-extglob": "^2.1.0"
          }
        }
      }
    },
    "glob-to-regexp": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/glob-to-regexp/-/glob-to-regexp-0.3.0.tgz",
      "integrity": "sha1-jFoUlNIGbFcMw7/kSWF1rMTVAqs="
    },
    "globals": {
      "version": "11.12.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
      "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA=="
    },
    "graceful-fs": {
      "version": "4.2.4",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.4.tgz",
      "integrity": "sha512-WjKPNJF79dtJAVniUlGGWHYGz2jWxT6VhN/4m1NdkbZ2nOsEF+cI1Edgql5zCRhs/VsQYRvrXctxktVXZUkixw=="
    },
    "grapheme-breaker": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/grapheme-breaker/-/grapheme-breaker-0.3.2.tgz",
      "integrity": "sha1-W55reMODJFLSuiuxy4MPlidkEKw=",
      "requires": {
        "brfs": "^1.2.0",
        "unicode-trie": "^0.3.1"
      }
    },
    "har-schema": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
      "integrity": "sha1-qUwiJOvKwEeCoNkDVSHyRzW37JI="
    },
    "har-validator": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.3.tgz",
      "integrity": "sha512-sNvOCzEQNr/qrvJgc3UG/kD4QtlHycrzwS+6mfTrrSq97BvaYcPZZI1ZSqGSPR73Cxn4LKTD4PttRwfU7jWq5g==",
      "requires": {
        "ajv": "^6.5.5",
        "har-schema": "^2.0.0"
      }
    },
    "has": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
      "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
      "requires": {
        "function-bind": "^1.1.1"
      }
    },
    "has-ansi": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/has-ansi/-/has-ansi-2.0.0.tgz",
      "integrity": "sha1-NPUEnOHs3ysGSa8+8k5F7TVBbZE=",
      "requires": {
        "ansi-regex": "^2.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8="
        }
      }
    },
    "has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0="
    },
    "has-symbols": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
      "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg=="
    },
    "has-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
      "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
      "requires": {
        "get-value": "^2.0.6",
        "has-values": "^1.0.0",
        "isobject": "^3.0.0"
      }
    },
    "has-values": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
      "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
      "requires": {
        "is-number": "^3.0.0",
        "kind-of": "^4.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
          "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "hash-base": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.1.0.tgz",
      "integrity": "sha512-1nmYp/rhMDiE7AYkDw+lLwlAzz0AntGIe51F3RfFfEqyQ3feY2eI/NcwC6umIQVOASPMsWJLJScWKSSvzL9IVA==",
      "requires": {
        "inherits": "^2.0.4",
        "readable-stream": "^3.6.0",
        "safe-buffer": "^5.2.0"
      },
      "dependencies": {
        "readable-stream": {
          "version": "3.6.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
          "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        },
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="
        }
      }
    },
    "hash.js": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
      "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
      "requires": {
        "inherits": "^2.0.3",
        "minimalistic-assert": "^1.0.1"
      }
    },
    "hex-color-regex": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/hex-color-regex/-/hex-color-regex-1.1.0.tgz",
      "integrity": "sha512-l9sfDFsuqtOqKDsQdqrMRk0U85RZc0RtOR9yPI7mRVOa4FsR/BVnZ0shmQRM96Ji99kYZP/7hn1cedc1+ApsTQ=="
    },
    "hmac-drbg": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
      "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
      "requires": {
        "hash.js": "^1.0.3",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    },
    "hsl-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/hsl-regex/-/hsl-regex-1.0.0.tgz",
      "integrity": "sha1-1JMwx4ntgZ4nakwNJy3/owsY/m4="
    },
    "hsla-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/hsla-regex/-/hsla-regex-1.0.0.tgz",
      "integrity": "sha1-wc56MWjIxmFAM6S194d/OyJfnDg="
    },
    "html-comment-regex": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/html-comment-regex/-/html-comment-regex-1.1.2.tgz",
      "integrity": "sha512-P+M65QY2JQ5Y0G9KKdlDpo0zK+/OHptU5AaBwUfAIDJZk1MYf32Frm84EcOytfJE0t5JvkAnKlmjsXDnWzCJmQ=="
    },
    "html-encoding-sniffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-1.0.2.tgz",
      "integrity": "sha512-71lZziiDnsuabfdYiUeWdCVyKuqwWi23L8YeIgV9jSSZHCtb6wB1BKWooH7L3tn4/FuZJMVWyNaIDr4RGmaSYw==",
      "requires": {
        "whatwg-encoding": "^1.0.1"
      }
    },
    "html-tags": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/html-tags/-/html-tags-1.2.0.tgz",
      "integrity": "sha1-x43mW1Zjqll5id0rerSSANfk25g="
    },
    "htmlnano": {
      "version": "0.2.5",
      "resolved": "https://registry.npmjs.org/htmlnano/-/htmlnano-0.2.5.tgz",
      "integrity": "sha512-X1iPSwXG/iF9bVs+/obt2n6F64uH0ETkA8zp7qFDmLW9/+A6ueHGeb/+qD67T21qUY22owZPMdawljN50ajkqA==",
      "requires": {
        "cssnano": "^4.1.10",
        "normalize-html-whitespace": "^1.0.0",
        "posthtml": "^0.12.0",
        "posthtml-render": "^1.1.5",
        "purgecss": "^1.4.0",
        "svgo": "^1.3.2",
        "terser": "^4.3.9",
        "uncss": "^0.17.2"
      },
      "dependencies": {
        "posthtml": {
          "version": "0.12.3",
          "resolved": "https://registry.npmjs.org/posthtml/-/posthtml-0.12.3.tgz",
          "integrity": "sha512-Fbpi95+JJyR0tqU7pUy1zTSQFjAsluuwB9pJ1h0jtnGk7n/O2TBtP5nDl9rV0JVACjQ1Lm5wSp4ppChr8u3MhA==",
          "requires": {
            "posthtml-parser": "^0.4.2",
            "posthtml-render": "^1.2.2"
          }
        },
        "terser": {
          "version": "4.7.0",
          "resolved": "https://registry.npmjs.org/terser/-/terser-4.7.0.tgz",
          "integrity": "sha512-Lfb0RiZcjRDXCC3OSHJpEkxJ9Qeqs6mp2v4jf2MHfy8vGERmVDuvjXdd/EnP5Deme5F2yBRBymKmKHCBg2echw==",
          "requires": {
            "commander": "^2.20.0",
            "source-map": "~0.6.1",
            "source-map-support": "~0.5.12"
          }
        }
      }
    },
    "htmlparser2": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.10.1.tgz",
      "integrity": "sha512-IgieNijUMbkDovyoKObU1DUhm1iwNYE/fuifEoEHfd1oZKZDaONBSkal7Y01shxsM49R4XaMdGez3WnF9UfiCQ==",
      "requires": {
        "domelementtype": "^1.3.1",
        "domhandler": "^2.3.0",
        "domutils": "^1.5.1",
        "entities": "^1.1.1",
        "inherits": "^2.0.1",
        "readable-stream": "^3.1.1"
      },
      "dependencies": {
        "readable-stream": {
          "version": "3.6.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
          "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        }
      }
    },
    "http-errors": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.7.3.tgz",
      "integrity": "sha512-ZTTX0MWrsQ2ZAhA1cejAwDLycFsd7I7nVtnkT3Ol0aqodaKW+0CTZDQ1uBv5whptCnc8e8HeRRJxRs0kmm/Qfw==",
      "requires": {
        "depd": "~1.1.2",
        "inherits": "2.0.4",
        "setprototypeof": "1.1.1",
        "statuses": ">= 1.5.0 < 2",
        "toidentifier": "1.0.0"
      }
    },
    "http-signature": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
      "integrity": "sha1-muzZJRFHcvPZW2WmCruPfBj7rOE=",
      "requires": {
        "assert-plus": "^1.0.0",
        "jsprim": "^1.2.2",
        "sshpk": "^1.7.0"
      }
    },
    "https-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
      "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM="
    },
    "iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "requires": {
        "safer-buffer": ">= 2.1.2 < 3"
      }
    },
    "icss-replace-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/icss-replace-symbols/-/icss-replace-symbols-1.1.0.tgz",
      "integrity": "sha1-Bupvg2ead0njhs/h/oEq5dsiPe0="
    },
    "ieee754": {
      "version": "1.1.13",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.13.tgz",
      "integrity": "sha512-4vf7I2LYV/HaWerSo3XmlMkp5eZ83i+/CDluXi/IGTs/O1sejBNhTtnxzmRZfvOUqj7lZjqHkeTvpgSFDlWZTg=="
    },
    "import-fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-2.0.0.tgz",
      "integrity": "sha1-2BNVwVYS04bGH53dOSLUMEgipUY=",
      "requires": {
        "caller-path": "^2.0.0",
        "resolve-from": "^3.0.0"
      }
    },
    "indexes-of": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/indexes-of/-/indexes-of-1.0.1.tgz",
      "integrity": "sha1-8w9xbI4r00bHtn0985FVZqfAVgc="
    },
    "inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
      "requires": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="
    },
    "invariant": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
      "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
      "requires": {
        "loose-envify": "^1.0.0"
      }
    },
    "is-absolute-url": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-absolute-url/-/is-absolute-url-2.1.0.tgz",
      "integrity": "sha1-UFMN+4T8yap9vnhS6Do3uTufKqY="
    },
    "is-accessor-descriptor": {
      "version": "0.1.6",
      "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
      "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0="
    },
    "is-binary-path": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
      "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
      "requires": {
        "binary-extensions": "^1.0.0"
      }
    },
    "is-buffer": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
      "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w=="
    },
    "is-callable": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.1.5.tgz",
      "integrity": "sha512-ESKv5sMCJB2jnHTWZ3O5itG+O128Hsus4K4Qh1h2/cgn2vbgnLSVqfV46AeJA9D5EeeLa9w81KUXMtn34zhX+Q=="
    },
    "is-color-stop": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-color-stop/-/is-color-stop-1.1.0.tgz",
      "integrity": "sha1-z/9HGu5N1cnhWFmPvhKWe1za00U=",
      "requires": {
        "css-color-names": "^0.0.4",
        "hex-color-regex": "^1.1.0",
        "hsl-regex": "^1.0.0",
        "hsla-regex": "^1.0.0",
        "rgb-regex": "^1.0.1",
        "rgba-regex": "^1.0.0"
      }
    },
    "is-data-descriptor": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
      "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-date-object": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.0.2.tgz",
      "integrity": "sha512-USlDT524woQ08aoZFzh3/Z6ch9Y/EWXEHQ/AaRN0SkKq4t2Jw2R2339tSXmwuVoY7LLlBCbOIlx2myP/L5zk0g=="
    },
    "is-descriptor": {
      "version": "0.1.6",
      "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
      "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
      "requires": {
        "is-accessor-descriptor": "^0.1.6",
        "is-data-descriptor": "^0.1.4",
        "kind-of": "^5.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
        }
      }
    },
    "is-directory": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/is-directory/-/is-directory-0.3.1.tgz",
      "integrity": "sha1-YTObbyR1/Hcv2cnYP1yFddwVSuE="
    },
    "is-extendable": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
      "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik="
    },
    "is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
    },
    "is-fullwidth-code-point": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
      "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8="
    },
    "is-glob": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
      "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
      "requires": {
        "is-extglob": "^2.1.1"
      }
    },
    "is-html": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-html/-/is-html-1.1.0.tgz",
      "integrity": "sha1-4E8cGNOUhRETlvmgJz6rUa8hhGQ=",
      "requires": {
        "html-tags": "^1.0.0"
      }
    },
    "is-number": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
      "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-obj": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-2.0.0.tgz",
      "integrity": "sha512-drqDG3cbczxxEJRoOXcOjtdp1J/lyp1mNn0xaznRs8+muBhgQcrnbspox5X5fOw0HnMnbfDzvnEMEtqDEJEo8w=="
    },
    "is-plain-object": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
      "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "is-regex": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.0.5.tgz",
      "integrity": "sha512-vlKW17SNq44owv5AQR3Cq0bQPEb8+kF3UKZ2fiZNOWtztYE5i0CzCZxFDwO58qAOWtxdBRVO/V5Qin1wjCqFYQ==",
      "requires": {
        "has": "^1.0.3"
      }
    },
    "is-resolvable": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-resolvable/-/is-resolvable-1.1.0.tgz",
      "integrity": "sha512-qgDYXFSR5WvEfuS5dMj6oTMEbrrSaM0CrFk2Yiq/gXnBvD9pMa2jGXxyhGLfvhZpuMZe18CJpFxAt3CRs42NMg=="
    },
    "is-svg": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-svg/-/is-svg-3.0.0.tgz",
      "integrity": "sha512-gi4iHK53LR2ujhLVVj+37Ykh9GLqYHX6JOVXbLAucaG/Cqw9xwdFOjDM2qeifLs1sF1npXXFvDu0r5HNgCMrzQ==",
      "requires": {
        "html-comment-regex": "^1.1.0"
      }
    },
    "is-symbol": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.3.tgz",
      "integrity": "sha512-OwijhaRSgqvhm/0ZdAcXNZt9lYdKFpcRDT5ULUuYXPoT794UNOdU+gpT6Rzo7b4V2HUl/op6GqY894AZwv9faQ==",
      "requires": {
        "has-symbols": "^1.0.1"
      }
    },
    "is-typedarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
      "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo="
    },
    "is-url": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/is-url/-/is-url-1.2.4.tgz",
      "integrity": "sha512-ITvGim8FhRiYe4IQ5uHSkj7pVaPDrCTkNd3yq3cV7iZAcJdHTUMPMEHcqSOy9xZ9qFenQCvi+2wjH9a1nXqHww=="
    },
    "is-windows": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
      "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA=="
    },
    "is-wsl": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
      "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0="
    },
    "isarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
      "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE="
    },
    "isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA="
    },
    "isobject": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
      "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
    },
    "isstream": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
      "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo="
    },
    "jquery": {
      "version": "3.5.1",
      "resolved": "https://registry.npmjs.org/jquery/-/jquery-3.5.1.tgz",
      "integrity": "sha512-XwIBPqcMn57FxfT+Go5pzySnm4KWkT1Tv7gjrpT1srtf8Weynl6R273VJ5GjkRb51IzMp5nbaPjJXMWeju2MKg=="
    },
    "js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
    },
    "js-yaml": {
      "version": "3.14.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.14.0.tgz",
      "integrity": "sha512-/4IbIeHcD9VMHFqDR/gQ7EdZdLimOvW2DdcxFjdyyZ9NsbS+ccrXqVWDtab/lRl5AlUqmpBx8EhPaWR+OtY17A==",
      "requires": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      },
      "dependencies": {
        "esprima": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
          "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A=="
        }
      }
    },
    "jsbn": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
      "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM="
    },
    "jsdom": {
      "version": "14.1.0",
      "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-14.1.0.tgz",
      "integrity": "sha512-O901mfJSuTdwU2w3Sn+74T+RnDVP+FuV5fH8tcPWyqrseRAb0s5xOtPgCFiPOtLcyK7CLIJwPyD83ZqQWvA5ng==",
      "requires": {
        "abab": "^2.0.0",
        "acorn": "^6.0.4",
        "acorn-globals": "^4.3.0",
        "array-equal": "^1.0.0",
        "cssom": "^0.3.4",
        "cssstyle": "^1.1.1",
        "data-urls": "^1.1.0",
        "domexception": "^1.0.1",
        "escodegen": "^1.11.0",
        "html-encoding-sniffer": "^1.0.2",
        "nwsapi": "^2.1.3",
        "parse5": "5.1.0",
        "pn": "^1.1.0",
        "request": "^2.88.0",
        "request-promise-native": "^1.0.5",
        "saxes": "^3.1.9",
        "symbol-tree": "^3.2.2",
        "tough-cookie": "^2.5.0",
        "w3c-hr-time": "^1.0.1",
        "w3c-xmlserializer": "^1.1.2",
        "webidl-conversions": "^4.0.2",
        "whatwg-encoding": "^1.0.5",
        "whatwg-mimetype": "^2.3.0",
        "whatwg-url": "^7.0.0",
        "ws": "^6.1.2",
        "xml-name-validator": "^3.0.0"
      },
      "dependencies": {
        "acorn": {
          "version": "6.4.1",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.4.1.tgz",
          "integrity": "sha512-ZVA9k326Nwrj3Cj9jlh3wGFutC2ZornPNARZwsNYqQYgN0EsV2d53w5RN/co65Ohn4sUAUtb1rSUAOD6XN9idA=="
        },
        "escodegen": {
          "version": "1.14.1",
          "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.14.1.tgz",
          "integrity": "sha512-Bmt7NcRySdIfNPfU2ZoXDrrXsG9ZjvDxcAlMfDUgRBjLOWTuIACXPBFJH7Z+cLb40JeQco5toikyc9t9P8E9SQ==",
          "requires": {
            "esprima": "^4.0.1",
            "estraverse": "^4.2.0",
            "esutils": "^2.0.2",
            "optionator": "^0.8.1",
            "source-map": "~0.6.1"
          }
        },
        "esprima": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
          "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A=="
        },
        "ws": {
          "version": "6.2.1",
          "resolved": "https://registry.npmjs.org/ws/-/ws-6.2.1.tgz",
          "integrity": "sha512-GIyAXC2cB7LjvpgMt9EKS2ldqr0MTrORaleiOno6TweZ6r3TKtoFQWay/2PceJ3RuBasOHzXNn5Lrw1X0bEjqA==",
          "requires": {
            "async-limiter": "~1.0.0"
          }
        }
      }
    },
    "jsesc": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz",
      "integrity": "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA99wd9aWd05NCtC5pWOkShK2mkL6HXQR6/Cy2lbNdPlZBpuQHXE63gA=="
    },
    "jshashes": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/jshashes/-/jshashes-1.0.8.tgz",
      "integrity": "sha512-btmQZ/w1rj8Lb6nEwvhjM7nBYoj54yaEFo2PWh3RkxZ8qNwuvOxvQYN/JxVuwoMmdIluL+XwYVJ+pEEZoSYybQ=="
    },
    "json-parse-better-errors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
      "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw=="
    },
    "json-schema": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
      "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM="
    },
    "json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
    },
    "json-stringify-safe": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
      "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus="
    },
    "json5": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
      "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
      "requires": {
        "minimist": "^1.2.0"
      }
    },
    "jsprim": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
      "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
      "requires": {
        "assert-plus": "1.0.0",
        "extsprintf": "1.3.0",
        "json-schema": "0.2.3",
        "verror": "1.10.0"
      }
    },
    "kind-of": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
      "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
    },
    "leaflet": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/leaflet/-/leaflet-1.6.0.tgz",
      "integrity": "sha512-CPkhyqWUKZKFJ6K8umN5/D2wrJ2+/8UIpXppY7QDnUZW5bZL5+SEI2J7GBpwh4LIupOKqbNSQXgqmrEJopHVNQ=="
    },
    "leven": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/leven/-/leven-3.1.0.tgz",
      "integrity": "sha512-qsda+H8jTaUaN/x5vzW2rzc+8Rw4TAQ/4KjB46IwK5VH+IlVeeeje/EoZRpiXvIqjFgK84QffqPztGI3VBLG1A=="
    },
    "levenary": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/levenary/-/levenary-1.1.1.tgz",
      "integrity": "sha512-mkAdOIt79FD6irqjYSs4rdbnlT5vRonMEvBVPVb3XmevfS8kgRXwfes0dhPdEtzTWD/1eNE/Bm/G1iRt6DcnQQ==",
      "requires": {
        "leven": "^3.1.0"
      }
    },
    "levn": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.3.0.tgz",
      "integrity": "sha1-OwmSTt+fCDwEkP3UwLxEIeBHZO4=",
      "requires": {
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2"
      }
    },
    "locate-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
      "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
      "requires": {
        "p-locate": "^2.0.0",
        "path-exists": "^3.0.0"
      }
    },
    "lodash": {
      "version": "4.17.15",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.15.tgz",
      "integrity": "sha512-8xOcRHvCjnocdS5cpwXQXVzmmh5e5+saE2QGoeQmbKmRS6J3VQppPOIt0MnmE+4xlZoumy0GPG0D0MVIQbNA1A=="
    },
    "lodash.clone": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.clone/-/lodash.clone-4.5.0.tgz",
      "integrity": "sha1-GVhwRQ9aExkkeN9Lw9I9LeoZB7Y="
    },
    "lodash.memoize": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/lodash.memoize/-/lodash.memoize-4.1.2.tgz",
      "integrity": "sha1-vMbEmkKihA7Zl/Mj6tpezRguC/4="
    },
    "lodash.sortby": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/lodash.sortby/-/lodash.sortby-4.7.0.tgz",
      "integrity": "sha1-7dFMgk4sycHgsKG0K7UhBRakJDg="
    },
    "lodash.uniq": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.uniq/-/lodash.uniq-4.5.0.tgz",
      "integrity": "sha1-0CJTc662Uq3BvILklFM5qEJ1R3M="
    },
    "log-symbols": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-2.2.0.tgz",
      "integrity": "sha512-VeIAFslyIerEJLXHziedo2basKbMKtTw3vfn5IzG0XTjhAVEJyNHnL2p7vc+wBDSdQuUpNw3M2u6xb9QsAY5Eg==",
      "requires": {
        "chalk": "^2.0.1"
      }
    },
    "loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "requires": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      }
    },
    "magic-string": {
      "version": "0.22.5",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.22.5.tgz",
      "integrity": "sha512-oreip9rJZkzvA8Qzk9HFs8fZGF/u7H/gtrE8EN6RjKJ9kh2HlC+yQ2QezifqTZfGyiuAV0dRv5a+y/8gBb1m9w==",
      "requires": {
        "vlq": "^0.2.2"
      }
    },
    "map-cache": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
      "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8="
    },
    "map-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
      "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
      "requires": {
        "object-visit": "^1.0.0"
      }
    },
    "md5.js": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.5.tgz",
      "integrity": "sha512-xitP+WxNPcTTOgnTJcrhM0xvdPepipPSf3I8EIpGKeFLjt3PlJLIDG3u8EX53ZIubkb+5U2+3rELYpEhHhzdkg==",
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "mdn-data": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.0.4.tgz",
      "integrity": "sha512-iV3XNKw06j5Q7mi6h+9vbx23Tv7JkjEVgKHW4pimwyDGWm0OIQntJJ+u1C6mg6mK1EaTv42XQ7w76yuzH7M2cA=="
    },
    "merge-source-map": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/merge-source-map/-/merge-source-map-1.0.4.tgz",
      "integrity": "sha1-pd5GU42uhNQRTMXqArR3KmNGcB8=",
      "requires": {
        "source-map": "^0.5.6"
      },
      "dependencies": {
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
        }
      }
    },
    "merge2": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.3.0.tgz",
      "integrity": "sha512-2j4DAdlBOkiSZIsaXk4mTE3sRS02yBHAtfy127xRV3bQUFqXkjHCHLW6Scv7DwNRbIWNHH8zpnz9zMaKXIdvYw=="
    },
    "micromatch": {
      "version": "3.1.10",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
      "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "braces": "^2.3.1",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "extglob": "^2.0.4",
        "fragment-cache": "^0.2.1",
        "kind-of": "^6.0.2",
        "nanomatch": "^1.2.9",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.2"
      }
    },
    "miller-rabin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
      "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
      "requires": {
        "bn.js": "^4.0.0",
        "brorand": "^1.0.1"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw=="
        }
      }
    },
    "mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg=="
    },
    "mime-db": {
      "version": "1.44.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.44.0.tgz",
      "integrity": "sha512-/NOTfLrsPBVeH7YtFPgsVWveuL+4SjjYxaQ1xtM1KMFj7HdxlBlxeyNLzhyJVx7r4rZGJAZ/6lkKCitSc/Nmpg=="
    },
    "mime-types": {
      "version": "2.1.27",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.27.tgz",
      "integrity": "sha512-JIhqnCasI9yD+SsmkquHBxTSEuZdQX5BuQnS2Vc7puQQQ+8yiP5AY5uWhpdv4YL4VM5c6iliiYWPgJ/nJQLp7w==",
      "requires": {
        "mime-db": "1.44.0"
      }
    },
    "mimic-fn": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-1.2.0.tgz",
      "integrity": "sha512-jf84uxzwiuiIVKiOLpfYk7N46TSy8ubTonmneY9vrpHNAnp0QBt2BxWV9dO3/j+BoVAb+a5G6YDPW3M5HOdMWQ=="
    },
    "minimalistic-assert": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
      "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A=="
    },
    "minimalistic-crypto-utils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
      "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo="
    },
    "minimatch": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz",
      "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
      "requires": {
        "brace-expansion": "^1.1.7"
      }
    },
    "minimist": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.5.tgz",
      "integrity": "sha512-FM9nNUYrRBAELZQT3xeZQ7fmMOBg6nWNmJKTcgsJeaLstP/UODVpGsr5OhXhhXg6f+qtJ8uiZ+PUxkDWcgIXLw=="
    },
    "mixin-deep": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.2.tgz",
      "integrity": "sha512-WRoDn//mXBiJ1H40rqa3vH0toePwSsGb45iInWlTySa+Uu4k3tYUSxa2v1KqAiLtvlrSzaExqS1gtk96A9zvEA==",
      "requires": {
        "for-in": "^1.0.2",
        "is-extendable": "^1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "requires": {
            "is-plain-object": "^2.0.4"
          }
        }
      }
    },
    "mkdirp": {
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.5.tgz",
      "integrity": "sha512-NKmAlESf6jMGym1++R0Ra7wvhV+wFW63FaSOFPwRahvea0gMUcGUhVeAg/0BC0wiv9ih5NYPB1Wn1UEI1/L+xQ==",
      "requires": {
        "minimist": "^1.2.5"
      }
    },
    "ms": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
      "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
    },
    "nan": {
      "version": "2.14.1",
      "resolved": "https://registry.npmjs.org/nan/-/nan-2.14.1.tgz",
      "integrity": "sha512-isWHgVjnFjh2x2yuJ/tj3JbwoHu3UC2dX5G/88Cm24yB6YopVgxvBObDY7n5xW6ExmFhJpSEQqFPvq9zaXc8Jw==",
      "optional": true
    },
    "nanomatch": {
      "version": "1.2.13",
      "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.13.tgz",
      "integrity": "sha512-fpoe2T0RbHwBTBUOftAfBPaDEi06ufaUai0mE6Yn1kacc3SnTErfb/h+X94VXzI64rKFHYImXSvdwGGCmwOqCA==",
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "fragment-cache": "^0.2.1",
        "is-windows": "^1.0.2",
        "kind-of": "^6.0.2",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      }
    },
    "nice-try": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/nice-try/-/nice-try-1.0.5.tgz",
      "integrity": "sha512-1nh45deeb5olNY7eX82BkPO7SSxR5SSYJiPTrTdFUVYwAl8CKMA5N9PjTYkHiRjisVcxcQ1HXdLhx2qxxJzLNQ=="
    },
    "node-addon-api": {
      "version": "1.7.1",
      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-1.7.1.tgz",
      "integrity": "sha512-2+DuKodWvwRTrCfKOeR24KIc5unKjOh8mz17NCzVnHWfjAdDqbfbjqh7gUT+BkXBRQM52+xCHciKWonJ3CbJMQ=="
    },
    "node-forge": {
      "version": "0.7.6",
      "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-0.7.6.tgz",
      "integrity": "sha512-sol30LUpz1jQFBjOKwbjxijiE3b6pjd74YwfD0fJOKPjF+fONKb2Yg8rYgS6+bK6VDl+/wfr4IYpC7jDzLUIfw=="
    },
    "node-libs-browser": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.2.1.tgz",
      "integrity": "sha512-h/zcD8H9kaDZ9ALUWwlBUDo6TKF8a7qBSCSEGfjTVIYeqsioSKaAX+BN7NgiMGp6iSIXZ3PxgCu8KS3b71YK5Q==",
      "requires": {
        "assert": "^1.1.1",
        "browserify-zlib": "^0.2.0",
        "buffer": "^4.3.0",
        "console-browserify": "^1.1.0",
        "constants-browserify": "^1.0.0",
        "crypto-browserify": "^3.11.0",
        "domain-browser": "^1.1.1",
        "events": "^3.0.0",
        "https-browserify": "^1.0.0",
        "os-browserify": "^0.3.0",
        "path-browserify": "0.0.1",
        "process": "^0.11.10",
        "punycode": "^1.2.4",
        "querystring-es3": "^0.2.0",
        "readable-stream": "^2.3.3",
        "stream-browserify": "^2.0.1",
        "stream-http": "^2.7.2",
        "string_decoder": "^1.0.0",
        "timers-browserify": "^2.0.4",
        "tty-browserify": "0.0.0",
        "url": "^0.11.0",
        "util": "^0.11.0",
        "vm-browserify": "^1.0.1"
      },
      "dependencies": {
        "punycode": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
          "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
        }
      }
    },
    "node-releases": {
      "version": "1.1.56",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-1.1.56.tgz",
      "integrity": "sha512-EVo605FhWLygH8a64TjgpjyHYOihkxECwX1bHHr8tETJKWEiWS2YJjPbvsX2jFjnjTNEgBCmk9mLjKG1Mf11cw=="
    },
    "normalize-html-whitespace": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/normalize-html-whitespace/-/normalize-html-whitespace-1.0.0.tgz",
      "integrity": "sha512-9ui7CGtOOlehQu0t/OhhlmDyc71mKVlv+4vF+me4iZLPrNtRL2xoquEdfZxasC/bdQi/Hr3iTrpyRKIG+ocabA=="
    },
    "normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA=="
    },
    "normalize-url": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/normalize-url/-/normalize-url-3.3.0.tgz",
      "integrity": "sha512-U+JJi7duF1o+u2pynbp2zXDW2/PADgC30f0GsHZtRh+HOcXHnw137TrNlyxxRvWW5fjKd3bcLHPxofWuCjaeZg=="
    },
    "nth-check": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/nth-check/-/nth-check-1.0.2.tgz",
      "integrity": "sha512-WeBOdju8SnzPN5vTUJYxYUxLeXpCaVP5i5e0LF8fg7WORF2Wd7wFX/pk0tYZk7s8T+J7VLy0Da6J1+wCT0AtHg==",
      "requires": {
        "boolbase": "~1.0.0"
      }
    },
    "nwsapi": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/nwsapi/-/nwsapi-2.2.0.tgz",
      "integrity": "sha512-h2AatdwYH+JHiZpv7pt/gSX1XoRGb7L/qSIeuqA6GwYoF9w1vP1cw42TO0aI2pNyshRK5893hNSl+1//vHK7hQ=="
    },
    "oauth-sign": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
      "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ=="
    },
    "object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM="
    },
    "object-copy": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
      "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
      "requires": {
        "copy-descriptor": "^0.1.0",
        "define-property": "^0.2.5",
        "kind-of": "^3.0.3"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "object-inspect": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.4.1.tgz",
      "integrity": "sha512-wqdhLpfCUbEsoEwl3FXwGyv8ief1k/1aUdIPCqVnupM6e8l63BEJdiF/0swtn04/8p05tG/T0FrpTlfwvljOdw=="
    },
    "object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
    },
    "object-visit": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
      "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
      "requires": {
        "isobject": "^3.0.0"
      }
    },
    "object.assign": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.0.tgz",
      "integrity": "sha512-exHJeq6kBKj58mqGyTQ9DFvrZC/eR6OwxzoM9YRoGBqrXYonaFyGiFMuc9VZrXf7DarreEwMpurG3dd+CNyW5w==",
      "requires": {
        "define-properties": "^1.1.2",
        "function-bind": "^1.1.1",
        "has-symbols": "^1.0.0",
        "object-keys": "^1.0.11"
      }
    },
    "object.getownpropertydescriptors": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/object.getownpropertydescriptors/-/object.getownpropertydescriptors-2.1.0.tgz",
      "integrity": "sha512-Z53Oah9A3TdLoblT7VKJaTDdXdT+lQO+cNpKVnya5JDe9uLvzu1YyY1yFDFrcxrlRgWrEFH0jJtD/IbuwjcEVg==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.0-next.1"
      }
    },
    "object.pick": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
      "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "object.values": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.1.1.tgz",
      "integrity": "sha512-WTa54g2K8iu0kmS/us18jEmdv1a4Wi//BZ/DTVYEcH0XhLM5NYdpDHja3gt57VrZLcNAO2WGA+KpWsDBaHt6eA==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.0-next.1",
        "function-bind": "^1.1.1",
        "has": "^1.0.3"
      }
    },
    "ohauth": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/ohauth/-/ohauth-1.0.0.tgz",
      "integrity": "sha1-wui/877wrkkUR5IiQ+G6cFEX3ks=",
      "requires": {
        "jshashes": "~1.0.0",
        "xtend": "~4.0.0"
      }
    },
    "on-finished": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",
      "integrity": "sha1-IPEzZIGwg811M3mSoWlxqi2QaUc=",
      "requires": {
        "ee-first": "1.1.1"
      }
    },
    "once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
      "requires": {
        "wrappy": "1"
      }
    },
    "onetime": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-2.0.1.tgz",
      "integrity": "sha1-BnQoIw/WdEOyeUsiu6UotoZ5YtQ=",
      "requires": {
        "mimic-fn": "^1.0.0"
      }
    },
    "opn": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/opn/-/opn-5.5.0.tgz",
      "integrity": "sha512-PqHpggC9bLV0VeWcdKhkpxY+3JTzetLSqTCWL/z/tFIbI6G8JCjondXklT1JinczLz2Xib62sSp0T/gKT4KksA==",
      "requires": {
        "is-wsl": "^1.1.0"
      }
    },
    "optimist": {
      "version": "0.3.7",
      "resolved": "https://registry.npmjs.org/optimist/-/optimist-0.3.7.tgz",
      "integrity": "sha1-yQlBrVnkJzMokjB00s8ufLxuwNk=",
      "requires": {
        "wordwrap": "~0.0.2"
      }
    },
    "optionator": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.3.tgz",
      "integrity": "sha512-+IW9pACdk3XWmmTXG8m3upGUJst5XRGzxMRjXzAuJ1XnIFNvfhjjIuYkDvysnPQ7qzqVzLt78BCruntqRhWQbA==",
      "requires": {
        "deep-is": "~0.1.3",
        "fast-levenshtein": "~2.0.6",
        "levn": "~0.3.0",
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2",
        "word-wrap": "~1.2.3"
      }
    },
    "ora": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/ora/-/ora-2.1.0.tgz",
      "integrity": "sha512-hNNlAd3gfv/iPmsNxYoAPLvxg7HuPozww7fFonMZvL84tP6Ox5igfk5j/+a9rtJJwqMgKK+JgWsAQik5o0HTLA==",
      "requires": {
        "chalk": "^2.3.1",
        "cli-cursor": "^2.1.0",
        "cli-spinners": "^1.1.0",
        "log-symbols": "^2.2.0",
        "strip-ansi": "^4.0.0",
        "wcwidth": "^1.0.1"
      }
    },
    "os-browserify": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
      "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc="
    },
    "osm-auth": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/osm-auth/-/osm-auth-1.0.2.tgz",
      "integrity": "sha1-Waq3/vGq+DyBPOaAKPxlCmECc0I=",
      "requires": {
        "ohauth": "~1.0.0",
        "resolve-url": "~0.2.1",
        "store": "~2.0.4",
        "xtend": "~4.0.0"
      }
    },
    "osm-polygon-features": {
      "version": "0.9.2",
      "resolved": "https://registry.npmjs.org/osm-polygon-features/-/osm-polygon-features-0.9.2.tgz",
      "integrity": "sha1-IK5BEwxIbkmjsqPCtYoUGcSYZ3g="
    },
    "osmtogeojson": {
      "version": "3.0.0-beta.4",
      "resolved": "https://registry.npmjs.org/osmtogeojson/-/osmtogeojson-3.0.0-beta.4.tgz",
      "integrity": "sha512-GwNy2w5JKOplOBspagcNhCDhBRV6Du2BCvcLkaA7nX12U86Dl2Ciw9zs/VzFFTXfyZlaK+7bGCWN2SNlfn/jOA==",
      "requires": {
        "@mapbox/geojson-rewind": "0.4.0",
        "@types/geojson": "^1.0.2",
        "JSONStream": "0.8.0",
        "concat-stream": "2.0.0",
        "geojson-numeric": "0.2.1",
        "htmlparser2": "3.5.1",
        "optimist": "~0.3.5",
        "osm-polygon-features": "^0.9.1",
        "tiny-osmpbf": "^0.1.0",
        "xmldom": "~0.1.16"
      },
      "dependencies": {
        "JSONStream": {
          "version": "0.8.0",
          "resolved": "https://registry.npmjs.org/JSONStream/-/JSONStream-0.8.0.tgz",
          "integrity": "sha1-78Ri1aW8lOwAf0siVxrNf28q4BM=",
          "requires": {
            "jsonparse": "0.0.5",
            "through": "~2.2.7"
          }
        },
        "concat-stream": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-2.0.0.tgz",
          "integrity": "sha512-MWufYdFw53ccGjCA+Ol7XJYpAlW6/prSMzuPOTRnJGcGzuhLn4Scrz7qf6o8bROZ514ltazcIFJZevcfbo0x7A==",
          "requires": {
            "buffer-from": "^1.0.0",
            "inherits": "^2.0.3",
            "readable-stream": "^3.0.2",
            "typedarray": "^0.0.6"
          }
        },
        "domhandler": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/domhandler/-/domhandler-2.2.1.tgz",
          "integrity": "sha1-Wd+dzSJ+gIs2Wuc+H2aErD2Ub8I=",
          "requires": {
            "domelementtype": "1"
          }
        },
        "domutils": {
          "version": "1.3.0",
          "resolved": "https://registry.npmjs.org/domutils/-/domutils-1.3.0.tgz",
          "integrity": "sha1-mtTVm1r2ymhMYv5tdo7xcOcN8ZI=",
          "requires": {
            "domelementtype": "1"
          }
        },
        "htmlparser2": {
          "version": "3.5.1",
          "resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.5.1.tgz",
          "integrity": "sha1-b0L3ZX3RnBP31l3pEYQXOUoL5tA=",
          "requires": {
            "domelementtype": "1",
            "domhandler": "2.2",
            "domutils": "1.3",
            "readable-stream": "1.1"
          },
          "dependencies": {
            "readable-stream": {
              "version": "1.1.14",
              "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-1.1.14.tgz",
              "integrity": "sha1-fPTFTvZI44EwhMY23SB54WbAgdk=",
              "requires": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.1",
                "isarray": "0.0.1",
                "string_decoder": "~0.10.x"
              }
            },
            "string_decoder": {
              "version": "0.10.31",
              "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-0.10.31.tgz",
              "integrity": "sha1-YuIDvEF2bGwoyfyEMB2rHFMQ+pQ="
            }
          }
        },
        "isarray": {
          "version": "0.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-0.0.1.tgz",
          "integrity": "sha1-ihis/Kmo9Bd+Cav8YDiTmwXR7t8="
        },
        "jsonparse": {
          "version": "0.0.5",
          "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-0.0.5.tgz",
          "integrity": "sha1-MwVCrT8KZUZlt3jz6y2an6UHrGQ="
        },
        "readable-stream": {
          "version": "3.6.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
          "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        },
        "through": {
          "version": "2.2.7",
          "resolved": "https://registry.npmjs.org/through/-/through-2.2.7.tgz",
          "integrity": "sha1-bo4hIAGR1OtqmfbwEN9Gqhxusr0="
        }
      }
    },
    "p-limit": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
      "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
      "requires": {
        "p-try": "^1.0.0"
      }
    },
    "p-locate": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
      "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
      "requires": {
        "p-limit": "^1.1.0"
      }
    },
    "p-try": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
      "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M="
    },
    "pako": {
      "version": "0.2.9",
      "resolved": "https://registry.npmjs.org/pako/-/pako-0.2.9.tgz",
      "integrity": "sha1-8/dSL073gjSNqBYbrZ7P1Rv4OnU="
    },
    "parcel": {
      "version": "1.12.4",
      "resolved": "https://registry.npmjs.org/parcel/-/parcel-1.12.4.tgz",
      "integrity": "sha512-qfc74e2/R4pCoU6L/ZZnK9k3iDS6ir4uHea0e9th9w52eehcAGf2ido/iABq9PBXdsIOe4NSY3oUm7Khe7+S3w==",
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "@babel/core": "^7.4.4",
        "@babel/generator": "^7.4.4",
        "@babel/parser": "^7.4.4",
        "@babel/plugin-transform-flow-strip-types": "^7.4.4",
        "@babel/plugin-transform-modules-commonjs": "^7.4.4",
        "@babel/plugin-transform-react-jsx": "^7.0.0",
        "@babel/preset-env": "^7.4.4",
        "@babel/runtime": "^7.4.4",
        "@babel/template": "^7.4.4",
        "@babel/traverse": "^7.4.4",
        "@babel/types": "^7.4.4",
        "@iarna/toml": "^2.2.0",
        "@parcel/fs": "^1.11.0",
        "@parcel/logger": "^1.11.1",
        "@parcel/utils": "^1.11.0",
        "@parcel/watcher": "^1.12.1",
        "@parcel/workers": "^1.11.0",
        "ansi-to-html": "^0.6.4",
        "babylon-walk": "^1.0.2",
        "browserslist": "^4.1.0",
        "chalk": "^2.1.0",
        "clone": "^2.1.1",
        "command-exists": "^1.2.6",
        "commander": "^2.11.0",
        "core-js": "^2.6.5",
        "cross-spawn": "^6.0.4",
        "css-modules-loader-core": "^1.1.0",
        "cssnano": "^4.0.0",
        "deasync": "^0.1.14",
        "dotenv": "^5.0.0",
        "dotenv-expand": "^5.1.0",
        "envinfo": "^7.3.1",
        "fast-glob": "^2.2.2",
        "filesize": "^3.6.0",
        "get-port": "^3.2.0",
        "htmlnano": "^0.2.2",
        "is-glob": "^4.0.0",
        "is-url": "^1.2.2",
        "js-yaml": "^3.10.0",
        "json5": "^1.0.1",
        "micromatch": "^3.0.4",
        "mkdirp": "^0.5.1",
        "node-forge": "^0.7.1",
        "node-libs-browser": "^2.0.0",
        "opn": "^5.1.0",
        "postcss": "^7.0.11",
        "postcss-value-parser": "^3.3.1",
        "posthtml": "^0.11.2",
        "posthtml-parser": "^0.4.0",
        "posthtml-render": "^1.1.3",
        "resolve": "^1.4.0",
        "semver": "^5.4.1",
        "serialize-to-js": "^3.0.0",
        "serve-static": "^1.12.4",
        "source-map": "0.6.1",
        "terser": "^3.7.3",
        "v8-compile-cache": "^2.0.0",
        "ws": "^5.1.1"
      }
    },
    "parse-asn1": {
      "version": "5.1.5",
      "resolved": "https://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.5.tgz",
      "integrity": "sha512-jkMYn1dcJqF6d5CpU689bq7w/b5ALS9ROVSpQDPrZsqqesUJii9qutvoT5ltGedNXMO2e16YUWIghG9KxaViTQ==",
      "requires": {
        "asn1.js": "^4.0.0",
        "browserify-aes": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.0",
        "pbkdf2": "^3.0.3",
        "safe-buffer": "^5.1.1"
      }
    },
    "parse-json": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-4.0.0.tgz",
      "integrity": "sha1-vjX1Qlvh9/bHRxhPmKeIy5lHfuA=",
      "requires": {
        "error-ex": "^1.3.1",
        "json-parse-better-errors": "^1.0.1"
      }
    },
    "parse5": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/parse5/-/parse5-5.1.0.tgz",
      "integrity": "sha512-fxNG2sQjHvlVAYmzBZS9YlDp6PTSSDwa98vkD4QgVDDCAo84z5X1t5XyJQ62ImdLXx5NdIIfihey6xpum9/gRQ=="
    },
    "parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ=="
    },
    "pascalcase": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
      "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ="
    },
    "path-browserify": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.1.tgz",
      "integrity": "sha512-BapA40NHICOS+USX9SN4tyhq+A2RrN/Ws5F0Z5aMHDp98Fl86lX8Oti8B7uN93L4Ifv4fHOEA+pQw87gmMO/lQ=="
    },
    "path-dirname": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
      "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA="
    },
    "path-exists": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
      "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU="
    },
    "path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18="
    },
    "path-key": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-2.0.1.tgz",
      "integrity": "sha1-QRyttXTFoUDTpLGRDUDYDMn0C0A="
    },
    "path-parse": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.6.tgz",
      "integrity": "sha512-GSmOT2EbHrINBf9SR7CDELwlJ8AENk3Qn7OikK4nFYAu3Ote2+JYNVvkpAEQm3/TLNEJFD/xZJjzyxg3KBWOzw=="
    },
    "pbf": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/pbf/-/pbf-3.2.1.tgz",
      "integrity": "sha512-ClrV7pNOn7rtmoQVF4TS1vyU0WhYRnP92fzbfF75jAIwpnzdJXf8iTd4CMEqO4yUenH6NDqLiwjqlh6QgZzgLQ==",
      "requires": {
        "ieee754": "^1.1.12",
        "resolve-protobuf-schema": "^2.1.0"
      }
    },
    "pbkdf2": {
      "version": "3.0.17",
      "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.0.17.tgz",
      "integrity": "sha512-U/il5MsrZp7mGg3mSQfn742na2T+1/vHDCG5/iTI3X9MKUuYUZVLQhyRsg06mCgDBTd57TxzgZt7P+fYfjRLtA==",
      "requires": {
        "create-hash": "^1.1.2",
        "create-hmac": "^1.1.4",
        "ripemd160": "^2.0.1",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "performance-now": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
      "integrity": "sha1-Ywn04OX6kT7BxpMHrjZLSzd8nns="
    },
    "physical-cpu-count": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/physical-cpu-count/-/physical-cpu-count-2.0.0.tgz",
      "integrity": "sha1-GN4vl+S/epVRrXURlCtUlverpmA="
    },
    "pkg-up": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/pkg-up/-/pkg-up-2.0.0.tgz",
      "integrity": "sha1-yBmscoBZpGHKscOImivjxJoATX8=",
      "requires": {
        "find-up": "^2.1.0"
      }
    },
    "pn": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/pn/-/pn-1.1.0.tgz",
      "integrity": "sha512-2qHaIQr2VLRFoxe2nASzsV6ef4yOOH+Fi9FBOVH6cqeSgUnoyySPZkxzLuzd+RYOQTRpROA0ztTMqxROKSb/nA=="
    },
    "posix-character-classes": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
      "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs="
    },
    "postcss": {
      "version": "7.0.30",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-7.0.30.tgz",
      "integrity": "sha512-nu/0m+NtIzoubO+xdAlwZl/u5S5vi/y6BCsoL8D+8IxsD3XvBS8X4YEADNIVXKVuQvduiucnRv+vPIqj56EGMQ==",
      "requires": {
        "chalk": "^2.4.2",
        "source-map": "^0.6.1",
        "supports-color": "^6.1.0"
      },
      "dependencies": {
        "supports-color": {
          "version": "6.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
          "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "postcss-calc": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/postcss-calc/-/postcss-calc-7.0.2.tgz",
      "integrity": "sha512-rofZFHUg6ZIrvRwPeFktv06GdbDYLcGqh9EwiMutZg+a0oePCCw1zHOEiji6LCpyRcjTREtPASuUqeAvYlEVvQ==",
      "requires": {
        "postcss": "^7.0.27",
        "postcss-selector-parser": "^6.0.2",
        "postcss-value-parser": "^4.0.2"
      },
      "dependencies": {
        "postcss-value-parser": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.1.0.tgz",
          "integrity": "sha512-97DXOFbQJhk71ne5/Mt6cOu6yxsSfM0QGQyl0L25Gca4yGWEGJaig7l7gbCX623VqTBNGLRLaVUCnNkcedlRSQ=="
        }
      }
    },
    "postcss-colormin": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/postcss-colormin/-/postcss-colormin-4.0.3.tgz",
      "integrity": "sha512-WyQFAdDZpExQh32j0U0feWisZ0dmOtPl44qYmJKkq9xFWY3p+4qnRzCHeNrkeRhwPHz9bQ3mo0/yVkaply0MNw==",
      "requires": {
        "browserslist": "^4.0.0",
        "color": "^3.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-convert-values": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-convert-values/-/postcss-convert-values-4.0.1.tgz",
      "integrity": "sha512-Kisdo1y77KUC0Jmn0OXU/COOJbzM8cImvw1ZFsBgBgMgb1iL23Zs/LXRe3r+EZqM3vGYKdQ2YJVQ5VkJI+zEJQ==",
      "requires": {
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-discard-comments": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-discard-comments/-/postcss-discard-comments-4.0.2.tgz",
      "integrity": "sha512-RJutN259iuRf3IW7GZyLM5Sw4GLTOH8FmsXBnv8Ab/Tc2k4SR4qbV4DNbyyY4+Sjo362SyDmW2DQ7lBSChrpkg==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-discard-duplicates": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-discard-duplicates/-/postcss-discard-duplicates-4.0.2.tgz",
      "integrity": "sha512-ZNQfR1gPNAiXZhgENFfEglF93pciw0WxMkJeVmw8eF+JZBbMD7jp6C67GqJAXVZP2BWbOztKfbsdmMp/k8c6oQ==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-discard-empty": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-discard-empty/-/postcss-discard-empty-4.0.1.tgz",
      "integrity": "sha512-B9miTzbznhDjTfjvipfHoqbWKwd0Mj+/fL5s1QOz06wufguil+Xheo4XpOnc4NqKYBCNqqEzgPv2aPBIJLox0w==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-discard-overridden": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-discard-overridden/-/postcss-discard-overridden-4.0.1.tgz",
      "integrity": "sha512-IYY2bEDD7g1XM1IDEsUT4//iEYCxAmP5oDSFMVU/JVvT7gh+l4fmjciLqGgwjdWpQIdb0Che2VX00QObS5+cTg==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-merge-longhand": {
      "version": "4.0.11",
      "resolved": "https://registry.npmjs.org/postcss-merge-longhand/-/postcss-merge-longhand-4.0.11.tgz",
      "integrity": "sha512-alx/zmoeXvJjp7L4mxEMjh8lxVlDFX1gqWHzaaQewwMZiVhLo42TEClKaeHbRf6J7j82ZOdTJ808RtN0ZOZwvw==",
      "requires": {
        "css-color-names": "0.0.4",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0",
        "stylehacks": "^4.0.0"
      }
    },
    "postcss-merge-rules": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/postcss-merge-rules/-/postcss-merge-rules-4.0.3.tgz",
      "integrity": "sha512-U7e3r1SbvYzO0Jr3UT/zKBVgYYyhAz0aitvGIYOYK5CPmkNih+WDSsS5tvPrJ8YMQYlEMvsZIiqmn7HdFUaeEQ==",
      "requires": {
        "browserslist": "^4.0.0",
        "caniuse-api": "^3.0.0",
        "cssnano-util-same-parent": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-selector-parser": "^3.0.0",
        "vendors": "^1.0.0"
      },
      "dependencies": {
        "postcss-selector-parser": {
          "version": "3.1.2",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.2.tgz",
          "integrity": "sha512-h7fJ/5uWuRVyOtkO45pnt1Ih40CEleeyCHzipqAZO2e5H20g25Y48uYnFUiShvY4rZWNJ/Bib/KVPmanaCtOhA==",
          "requires": {
            "dot-prop": "^5.2.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-minify-font-values": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-font-values/-/postcss-minify-font-values-4.0.2.tgz",
      "integrity": "sha512-j85oO6OnRU9zPf04+PZv1LYIYOprWm6IA6zkXkrJXyRveDEuQggG6tvoy8ir8ZwjLxLuGfNkCZEQG7zan+Hbtg==",
      "requires": {
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-minify-gradients": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-gradients/-/postcss-minify-gradients-4.0.2.tgz",
      "integrity": "sha512-qKPfwlONdcf/AndP1U8SJ/uzIJtowHlMaSioKzebAXSG4iJthlWC9iSWznQcX4f66gIWX44RSA841HTHj3wK+Q==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "is-color-stop": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-minify-params": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-params/-/postcss-minify-params-4.0.2.tgz",
      "integrity": "sha512-G7eWyzEx0xL4/wiBBJxJOz48zAKV2WG3iZOqVhPet/9geefm/Px5uo1fzlHu+DOjT+m0Mmiz3jkQzVHe6wxAWg==",
      "requires": {
        "alphanum-sort": "^1.0.0",
        "browserslist": "^4.0.0",
        "cssnano-util-get-arguments": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0",
        "uniqs": "^2.0.0"
      }
    },
    "postcss-minify-selectors": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-minify-selectors/-/postcss-minify-selectors-4.0.2.tgz",
      "integrity": "sha512-D5S1iViljXBj9kflQo4YutWnJmwm8VvIsU1GeXJGiG9j8CIg9zs4voPMdQDUmIxetUOh60VilsNzCiAFTOqu3g==",
      "requires": {
        "alphanum-sort": "^1.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-selector-parser": "^3.0.0"
      },
      "dependencies": {
        "postcss-selector-parser": {
          "version": "3.1.2",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.2.tgz",
          "integrity": "sha512-h7fJ/5uWuRVyOtkO45pnt1Ih40CEleeyCHzipqAZO2e5H20g25Y48uYnFUiShvY4rZWNJ/Bib/KVPmanaCtOhA==",
          "requires": {
            "dot-prop": "^5.2.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "postcss-modules-extract-imports": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-extract-imports/-/postcss-modules-extract-imports-1.1.0.tgz",
      "integrity": "sha1-thTJcgvmgW6u41+zpfqh26agXds=",
      "requires": {
        "postcss": "^6.0.1"
      },
      "dependencies": {
        "postcss": {
          "version": "6.0.23",
          "resolved": "https://registry.npmjs.org/postcss/-/postcss-6.0.23.tgz",
          "integrity": "sha512-soOk1h6J3VMTZtVeVpv15/Hpdl2cBLX3CAw4TAbkpTJiNPk9YP/zWcD1ND+xEtvyuuvKzbxliTOIyvkSeSJ6ag==",
          "requires": {
            "chalk": "^2.4.1",
            "source-map": "^0.6.1",
            "supports-color": "^5.4.0"
          }
        }
      }
    },
    "postcss-modules-local-by-default": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-local-by-default/-/postcss-modules-local-by-default-1.2.0.tgz",
      "integrity": "sha1-99gMOYxaOT+nlkRmvRlQCn1hwGk=",
      "requires": {
        "css-selector-tokenizer": "^0.7.0",
        "postcss": "^6.0.1"
      },
      "dependencies": {
        "postcss": {
          "version": "6.0.23",
          "resolved": "https://registry.npmjs.org/postcss/-/postcss-6.0.23.tgz",
          "integrity": "sha512-soOk1h6J3VMTZtVeVpv15/Hpdl2cBLX3CAw4TAbkpTJiNPk9YP/zWcD1ND+xEtvyuuvKzbxliTOIyvkSeSJ6ag==",
          "requires": {
            "chalk": "^2.4.1",
            "source-map": "^0.6.1",
            "supports-color": "^5.4.0"
          }
        }
      }
    },
    "postcss-modules-scope": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-scope/-/postcss-modules-scope-1.1.0.tgz",
      "integrity": "sha1-1upkmUx5+XtipytCb75gVqGUu5A=",
      "requires": {
        "css-selector-tokenizer": "^0.7.0",
        "postcss": "^6.0.1"
      },
      "dependencies": {
        "postcss": {
          "version": "6.0.23",
          "resolved": "https://registry.npmjs.org/postcss/-/postcss-6.0.23.tgz",
          "integrity": "sha512-soOk1h6J3VMTZtVeVpv15/Hpdl2cBLX3CAw4TAbkpTJiNPk9YP/zWcD1ND+xEtvyuuvKzbxliTOIyvkSeSJ6ag==",
          "requires": {
            "chalk": "^2.4.1",
            "source-map": "^0.6.1",
            "supports-color": "^5.4.0"
          }
        }
      }
    },
    "postcss-modules-values": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-values/-/postcss-modules-values-1.3.0.tgz",
      "integrity": "sha1-7P+p1+GSUYOJ9CrQ6D9yrsRW6iA=",
      "requires": {
        "icss-replace-symbols": "^1.1.0",
        "postcss": "^6.0.1"
      },
      "dependencies": {
        "postcss": {
          "version": "6.0.23",
          "resolved": "https://registry.npmjs.org/postcss/-/postcss-6.0.23.tgz",
          "integrity": "sha512-soOk1h6J3VMTZtVeVpv15/Hpdl2cBLX3CAw4TAbkpTJiNPk9YP/zWcD1ND+xEtvyuuvKzbxliTOIyvkSeSJ6ag==",
          "requires": {
            "chalk": "^2.4.1",
            "source-map": "^0.6.1",
            "supports-color": "^5.4.0"
          }
        }
      }
    },
    "postcss-normalize-charset": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-normalize-charset/-/postcss-normalize-charset-4.0.1.tgz",
      "integrity": "sha512-gMXCrrlWh6G27U0hF3vNvR3w8I1s2wOBILvA87iNXaPvSNo5uZAMYsZG7XjCUf1eVxuPfyL4TJ7++SGZLc9A3g==",
      "requires": {
        "postcss": "^7.0.0"
      }
    },
    "postcss-normalize-display-values": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-display-values/-/postcss-normalize-display-values-4.0.2.tgz",
      "integrity": "sha512-3F2jcsaMW7+VtRMAqf/3m4cPFhPD3EFRgNs18u+k3lTJJlVe7d0YPO+bnwqo2xg8YiRpDXJI2u8A0wqJxMsQuQ==",
      "requires": {
        "cssnano-util-get-match": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-positions": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-positions/-/postcss-normalize-positions-4.0.2.tgz",
      "integrity": "sha512-Dlf3/9AxpxE+NF1fJxYDeggi5WwV35MXGFnnoccP/9qDtFrTArZ0D0R+iKcg5WsUd8nUYMIl8yXDCtcrT8JrdA==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-repeat-style": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-repeat-style/-/postcss-normalize-repeat-style-4.0.2.tgz",
      "integrity": "sha512-qvigdYYMpSuoFs3Is/f5nHdRLJN/ITA7huIoCyqqENJe9PvPmLhNLMu7QTjPdtnVf6OcYYO5SHonx4+fbJE1+Q==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "cssnano-util-get-match": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-string": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-string/-/postcss-normalize-string-4.0.2.tgz",
      "integrity": "sha512-RrERod97Dnwqq49WNz8qo66ps0swYZDSb6rM57kN2J+aoyEAJfZ6bMx0sx/F9TIEX0xthPGCmeyiam/jXif0eA==",
      "requires": {
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-timing-functions": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-timing-functions/-/postcss-normalize-timing-functions-4.0.2.tgz",
      "integrity": "sha512-acwJY95edP762e++00Ehq9L4sZCEcOPyaHwoaFOhIwWCDfik6YvqsYNxckee65JHLKzuNSSmAdxwD2Cud1Z54A==",
      "requires": {
        "cssnano-util-get-match": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-unicode": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-normalize-unicode/-/postcss-normalize-unicode-4.0.1.tgz",
      "integrity": "sha512-od18Uq2wCYn+vZ/qCOeutvHjB5jm57ToxRaMeNuf0nWVHaP9Hua56QyMF6fs/4FSUnVIw0CBPsU0K4LnBPwYwg==",
      "requires": {
        "browserslist": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-url": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-normalize-url/-/postcss-normalize-url-4.0.1.tgz",
      "integrity": "sha512-p5oVaF4+IHwu7VpMan/SSpmpYxcJMtkGppYf0VbdH5B6hN8YNmVyJLuY9FmLQTzY3fag5ESUUHDqM+heid0UVA==",
      "requires": {
        "is-absolute-url": "^2.0.0",
        "normalize-url": "^3.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-normalize-whitespace": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-normalize-whitespace/-/postcss-normalize-whitespace-4.0.2.tgz",
      "integrity": "sha512-tO8QIgrsI3p95r8fyqKV+ufKlSHh9hMJqACqbv2XknufqEDhDvbguXGBBqxw9nsQoXWf0qOqppziKJKHMD4GtA==",
      "requires": {
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-ordered-values": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/postcss-ordered-values/-/postcss-ordered-values-4.1.2.tgz",
      "integrity": "sha512-2fCObh5UanxvSxeXrtLtlwVThBvHn6MQcu4ksNT2tsaV2Fg76R2CV98W7wNSlX+5/pFwEyaDwKLLoEV7uRybAw==",
      "requires": {
        "cssnano-util-get-arguments": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-reduce-initial": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/postcss-reduce-initial/-/postcss-reduce-initial-4.0.3.tgz",
      "integrity": "sha512-gKWmR5aUulSjbzOfD9AlJiHCGH6AEVLaM0AV+aSioxUDd16qXP1PCh8d1/BGVvpdWn8k/HiK7n6TjeoXN1F7DA==",
      "requires": {
        "browserslist": "^4.0.0",
        "caniuse-api": "^3.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0"
      }
    },
    "postcss-reduce-transforms": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-reduce-transforms/-/postcss-reduce-transforms-4.0.2.tgz",
      "integrity": "sha512-EEVig1Q2QJ4ELpJXMZR8Vt5DQx8/mo+dGWSR7vWXqcob2gQLyQGsionYcGKATXvQzMPn6DSN1vTN7yFximdIAg==",
      "requires": {
        "cssnano-util-get-match": "^4.0.0",
        "has": "^1.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0"
      }
    },
    "postcss-selector-parser": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.2.tgz",
      "integrity": "sha512-36P2QR59jDTOAiIkqEprfJDsoNrvwFei3eCqKd1Y0tUsBimsq39BLp7RD+JWny3WgB1zGhJX8XVePwm9k4wdBg==",
      "requires": {
        "cssesc": "^3.0.0",
        "indexes-of": "^1.0.1",
        "uniq": "^1.0.1"
      }
    },
    "postcss-svgo": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-svgo/-/postcss-svgo-4.0.2.tgz",
      "integrity": "sha512-C6wyjo3VwFm0QgBy+Fu7gCYOkCmgmClghO+pjcxvrcBKtiKt0uCF+hvbMO1fyv5BMImRK90SMb+dwUnfbGd+jw==",
      "requires": {
        "is-svg": "^3.0.0",
        "postcss": "^7.0.0",
        "postcss-value-parser": "^3.0.0",
        "svgo": "^1.0.0"
      }
    },
    "postcss-unique-selectors": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-unique-selectors/-/postcss-unique-selectors-4.0.1.tgz",
      "integrity": "sha512-+JanVaryLo9QwZjKrmJgkI4Fn8SBgRO6WXQBJi7KiAVPlmxikB5Jzc4EvXMT2H0/m0RjrVVm9rGNhZddm/8Spg==",
      "requires": {
        "alphanum-sort": "^1.0.0",
        "postcss": "^7.0.0",
        "uniqs": "^2.0.0"
      }
    },
    "postcss-value-parser": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
      "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
    },
    "posthtml": {
      "version": "0.11.6",
      "resolved": "https://registry.npmjs.org/posthtml/-/posthtml-0.11.6.tgz",
      "integrity": "sha512-C2hrAPzmRdpuL3iH0TDdQ6XCc9M7Dcc3zEW5BLerY65G4tWWszwv6nG/ksi6ul5i2mx22ubdljgktXCtNkydkw==",
      "requires": {
        "posthtml-parser": "^0.4.1",
        "posthtml-render": "^1.1.5"
      }
    },
    "posthtml-parser": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/posthtml-parser/-/posthtml-parser-0.4.2.tgz",
      "integrity": "sha512-BUIorsYJTvS9UhXxPTzupIztOMVNPa/HtAm9KHni9z6qEfiJ1bpOBL5DfUOL9XAc3XkLIEzBzpph+Zbm4AdRAg==",
      "requires": {
        "htmlparser2": "^3.9.2"
      }
    },
    "posthtml-render": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/posthtml-render/-/posthtml-render-1.2.2.tgz",
      "integrity": "sha512-MbIXTWwAfJ9qET6Zl29UNwJcDJEEz9Zkr5oDhiujitJa7YBJwEpbkX2cmuklCDxubTMoRWpid3q8DrSyGnUUzQ=="
    },
    "prelude-ls": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.1.2.tgz",
      "integrity": "sha1-IZMqVJ9eUv/ZqCf1cOBL5iqX2lQ="
    },
    "private": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/private/-/private-0.1.8.tgz",
      "integrity": "sha512-VvivMrbvd2nKkiG38qjULzlc+4Vx4wm/whI9pQD35YrARNnhxeiRktSOhSukRLFNlzg6Br/cJPet5J/u19r/mg=="
    },
    "process": {
      "version": "0.11.10",
      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
      "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI="
    },
    "process-nextick-args": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
      "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag=="
    },
    "protocol-buffers-schema": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/protocol-buffers-schema/-/protocol-buffers-schema-3.4.0.tgz",
      "integrity": "sha512-G/2kcamPF2S49W5yaMGdIpkG6+5wZF0fzBteLKgEHjbNzqjZQ85aAs1iJGto31EJaSTkNvHs5IXuHSaTLWBAiA=="
    },
    "psl": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/psl/-/psl-1.8.0.tgz",
      "integrity": "sha512-RIdOzyoavK+hA18OGGWDqUTsCLhtA7IcZ/6NCs4fFJaHBDab+pDDmDIByWFRQJq2Cd7r1OoQxBGKOaztq+hjIQ=="
    },
    "public-encrypt": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.3.tgz",
      "integrity": "sha512-zVpa8oKZSz5bTMTFClc1fQOnyyEzpl5ozpi1B5YcvBrdohMjH2rfsBtyXcuNuwjsDIXmBYlF2N5FlJYhR29t8Q==",
      "requires": {
        "bn.js": "^4.1.0",
        "browserify-rsa": "^4.0.0",
        "create-hash": "^1.1.0",
        "parse-asn1": "^5.0.0",
        "randombytes": "^2.0.1",
        "safe-buffer": "^5.1.2"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw=="
        }
      }
    },
    "punycode": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.1.1.tgz",
      "integrity": "sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A=="
    },
    "purgecss": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/purgecss/-/purgecss-1.4.2.tgz",
      "integrity": "sha512-hkOreFTgiyMHMmC2BxzdIw5DuC6kxAbP/gGOGd3MEsF3+5m69rIvUEPaxrnoUtfODTFKe9hcXjGwC6jcjoyhOw==",
      "requires": {
        "glob": "^7.1.3",
        "postcss": "^7.0.14",
        "postcss-selector-parser": "^6.0.0",
        "yargs": "^14.0.0"
      }
    },
    "q": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/q/-/q-1.5.1.tgz",
      "integrity": "sha1-fjL3W0E4EpHQRhHxvxQQmsAGUdc="
    },
    "qs": {
      "version": "6.5.2",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.2.tgz",
      "integrity": "sha512-N5ZAX4/LxJmF+7wN74pUD6qAh9/wnvdQcjq9TZjevvXzSUo7bfmw91saqMjzGS2xq91/odN2dW/WOl7qQHNDGA=="
    },
    "querystring": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
      "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA="
    },
    "querystring-es3": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
      "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM="
    },
    "quote-stream": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/quote-stream/-/quote-stream-1.0.2.tgz",
      "integrity": "sha1-hJY/jJwmuULhU/7rU6rnRlK34LI=",
      "requires": {
        "buffer-equal": "0.0.1",
        "minimist": "^1.1.3",
        "through2": "^2.0.0"
      }
    },
    "randombytes": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
      "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
      "requires": {
        "safe-buffer": "^5.1.0"
      }
    },
    "randomfill": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
      "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
      "requires": {
        "randombytes": "^2.0.5",
        "safe-buffer": "^5.1.0"
      }
    },
    "range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg=="
    },
    "readable-stream": {
      "version": "2.3.7",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
      "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
      "requires": {
        "core-util-is": "~1.0.0",
        "inherits": "~2.0.3",
        "isarray": "~1.0.0",
        "process-nextick-args": "~2.0.0",
        "safe-buffer": "~5.1.1",
        "string_decoder": "~1.1.1",
        "util-deprecate": "~1.0.1"
      }
    },
    "readdirp": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.2.1.tgz",
      "integrity": "sha512-1JU/8q+VgFZyxwrJ+SVIOsh+KywWGpds3NTqikiKpDMZWScmAYyKIgqkO+ARvNWJfXeXR1zxz7aHF4u4CyH6vQ==",
      "requires": {
        "graceful-fs": "^4.1.11",
        "micromatch": "^3.1.10",
        "readable-stream": "^2.0.2"
      }
    },
    "redeyed": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/redeyed/-/redeyed-0.4.4.tgz",
      "integrity": "sha1-N+mQpvKyGyoRwuakj9QTVpjLqX8=",
      "requires": {
        "esprima": "~1.0.4"
      },
      "dependencies": {
        "esprima": {
          "version": "1.0.4",
          "resolved": "https://registry.npmjs.org/esprima/-/esprima-1.0.4.tgz",
          "integrity": "sha1-n1V+CPw7TSbs6d00+Pv0drYlha0="
        }
      }
    },
    "regenerate": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.4.0.tgz",
      "integrity": "sha512-1G6jJVDWrt0rK99kBjvEtziZNCICAuvIPkSiUFIQxVP06RCVpq3dmDo2oi6ABpYaDYaTRr67BEhL8r1wgEZZKg=="
    },
    "regenerate-unicode-properties": {
      "version": "8.2.0",
      "resolved": "https://registry.npmjs.org/regenerate-unicode-properties/-/regenerate-unicode-properties-8.2.0.tgz",
      "integrity": "sha512-F9DjY1vKLo/tPePDycuH3dn9H1OTPIkVD9Kz4LODu+F2C75mgjAJ7x/gwy6ZcSNRAAkhNlJSOHRe8k3p+K9WhA==",
      "requires": {
        "regenerate": "^1.4.0"
      }
    },
    "regenerator-runtime": {
      "version": "0.13.5",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.5.tgz",
      "integrity": "sha512-ZS5w8CpKFinUzOwW3c83oPeVXoNsrLsaCoLtJvAClH135j/R77RuymhiSErhm2lKcwSCIpmvIWSbDkIfAqKQlA=="
    },
    "regenerator-transform": {
      "version": "0.14.4",
      "resolved": "https://registry.npmjs.org/regenerator-transform/-/regenerator-transform-0.14.4.tgz",
      "integrity": "sha512-EaJaKPBI9GvKpvUz2mz4fhx7WPgvwRLY9v3hlNHWmAuJHI13T4nwKnNvm5RWJzEdnI5g5UwtOww+S8IdoUC2bw==",
      "requires": {
        "@babel/runtime": "^7.8.4",
        "private": "^0.1.8"
      }
    },
    "regex-not": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
      "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
      "requires": {
        "extend-shallow": "^3.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "regexpu-core": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-4.7.0.tgz",
      "integrity": "sha512-TQ4KXRnIn6tz6tjnrXEkD/sshygKH/j5KzK86X8MkeHyZ8qst/LZ89j3X4/8HEIfHANTFIP/AbXakeRhWIl5YQ==",
      "requires": {
        "regenerate": "^1.4.0",
        "regenerate-unicode-properties": "^8.2.0",
        "regjsgen": "^0.5.1",
        "regjsparser": "^0.6.4",
        "unicode-match-property-ecmascript": "^1.0.4",
        "unicode-match-property-value-ecmascript": "^1.2.0"
      }
    },
    "regjsgen": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.5.2.tgz",
      "integrity": "sha512-OFFT3MfrH90xIW8OOSyUrk6QHD5E9JOTeGodiJeBS3J6IwlgzJMNE/1bZklWz5oTg+9dCMyEetclvCVXOPoN3A=="
    },
    "regjsparser": {
      "version": "0.6.4",
      "resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.6.4.tgz",
      "integrity": "sha512-64O87/dPDgfk8/RQqC4gkZoGyyWFIEUTTh80CU6CWuK5vkCGyekIx+oKcEIYtP/RAxSQltCZHCNu/mdd7fqlJw==",
      "requires": {
        "jsesc": "~0.5.0"
      },
      "dependencies": {
        "jsesc": {
          "version": "0.5.0",
          "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz",
          "integrity": "sha1-597mbjXW/Bb3EP6R1c9p9w8IkR0="
        }
      }
    },
    "remove-trailing-separator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
      "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8="
    },
    "repeat-element": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.3.tgz",
      "integrity": "sha512-ahGq0ZnV5m5XtZLMb+vP76kcAM5nkLqk0lpqAuojSKGgQtn4eRi4ZZGm2olo2zKFH+sMsWaqOCW1dqAnOru72g=="
    },
    "repeat-string": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
      "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc="
    },
    "request": {
      "version": "2.88.2",
      "resolved": "https://registry.npmjs.org/request/-/request-2.88.2.tgz",
      "integrity": "sha512-MsvtOrfG9ZcrOwAW+Qi+F6HbD0CWXEh9ou77uOb7FM2WPhwT7smM833PzanhJLsgXjN89Ir6V2PczXNnMpwKhw==",
      "requires": {
        "aws-sign2": "~0.7.0",
        "aws4": "^1.8.0",
        "caseless": "~0.12.0",
        "combined-stream": "~1.0.6",
        "extend": "~3.0.2",
        "forever-agent": "~0.6.1",
        "form-data": "~2.3.2",
        "har-validator": "~5.1.3",
        "http-signature": "~1.2.0",
        "is-typedarray": "~1.0.0",
        "isstream": "~0.1.2",
        "json-stringify-safe": "~5.0.1",
        "mime-types": "~2.1.19",
        "oauth-sign": "~0.9.0",
        "performance-now": "^2.1.0",
        "qs": "~6.5.2",
        "safe-buffer": "^5.1.2",
        "tough-cookie": "~2.5.0",
        "tunnel-agent": "^0.6.0",
        "uuid": "^3.3.2"
      }
    },
    "request-promise-core": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/request-promise-core/-/request-promise-core-1.1.3.tgz",
      "integrity": "sha512-QIs2+ArIGQVp5ZYbWD5ZLCY29D5CfWizP8eWnm8FoGD1TX61veauETVQbrV60662V0oFBkrDOuaBI8XgtuyYAQ==",
      "requires": {
        "lodash": "^4.17.15"
      }
    },
    "request-promise-native": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/request-promise-native/-/request-promise-native-1.0.8.tgz",
      "integrity": "sha512-dapwLGqkHtwL5AEbfenuzjTYg35Jd6KPytsC2/TLkVMz8rm+tNt72MGUWT1RP/aYawMpN6HqbNGBQaRcBtjQMQ==",
      "requires": {
        "request-promise-core": "1.1.3",
        "stealthy-require": "^1.1.1",
        "tough-cookie": "^2.3.3"
      }
    },
    "require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I="
    },
    "require-main-filename": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
      "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg=="
    },
    "resolve": {
      "version": "1.17.0",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.17.0.tgz",
      "integrity": "sha512-ic+7JYiV8Vi2yzQGFWOkiZD5Z9z7O2Zhm9XMaTxdJExKasieFCr+yXZ/WmXsckHiKl12ar0y6XiXDx3m4RHn1w==",
      "requires": {
        "path-parse": "^1.0.6"
      }
    },
    "resolve-from": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
      "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g="
    },
    "resolve-protobuf-schema": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/resolve-protobuf-schema/-/resolve-protobuf-schema-2.1.0.tgz",
      "integrity": "sha512-kI5ffTiZWmJaS/huM8wZfEMer1eRd7oJQhDuxeCLe3t7N7mX3z94CN0xPxBQxFYQTSNz9T0i+v6inKqSdK8xrQ==",
      "requires": {
        "protocol-buffers-schema": "^3.3.1"
      }
    },
    "resolve-url": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
      "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo="
    },
    "restore-cursor": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-2.0.0.tgz",
      "integrity": "sha1-n37ih/gv0ybU/RYpI9YhKe7g368=",
      "requires": {
        "onetime": "^2.0.0",
        "signal-exit": "^3.0.2"
      }
    },
    "ret": {
      "version": "0.1.15",
      "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
      "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg=="
    },
    "rgb-regex": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/rgb-regex/-/rgb-regex-1.0.1.tgz",
      "integrity": "sha1-wODWiC3w4jviVKR16O3UGRX+rrE="
    },
    "rgba-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/rgba-regex/-/rgba-regex-1.0.0.tgz",
      "integrity": "sha1-QzdOLiyglosO8VI0YLfXMP8i7rM="
    },
    "rimraf": {
      "version": "2.7.1",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
      "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
      "requires": {
        "glob": "^7.1.3"
      }
    },
    "ripemd160": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.2.tgz",
      "integrity": "sha512-ii4iagi25WusVoiC4B4lq7pbXfAp3D9v5CwfkY33vffw2+pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA==",
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1"
      }
    },
    "safe-buffer": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
    },
    "safe-regex": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
      "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
      "requires": {
        "ret": "~0.1.10"
      }
    },
    "safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
    },
    "sax": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
      "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw=="
    },
    "saxes": {
      "version": "3.1.11",
      "resolved": "https://registry.npmjs.org/saxes/-/saxes-3.1.11.tgz",
      "integrity": "sha512-Ydydq3zC+WYDJK1+gRxRapLIED9PWeSuuS41wqyoRmzvhhh9nc+QQrVMKJYzJFULazeGhzSV0QleN2wD3boh2g==",
      "requires": {
        "xmlchars": "^2.1.1"
      }
    },
    "semver": {
      "version": "5.7.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
      "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
    },
    "send": {
      "version": "0.17.1",
      "resolved": "https://registry.npmjs.org/send/-/send-0.17.1.tgz",
      "integrity": "sha512-BsVKsiGcQMFwT8UxypobUKyv7irCNRHk1T0G680vk88yf6LBByGcZJOTJCrTP2xVN6yI+XjPJcNuE3V4fT9sAg==",
      "requires": {
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "destroy": "~1.0.4",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "0.5.2",
        "http-errors": "~1.7.2",
        "mime": "1.6.0",
        "ms": "2.1.1",
        "on-finished": "~2.3.0",
        "range-parser": "~1.2.1",
        "statuses": "~1.5.0"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "requires": {
            "ms": "2.0.0"
          },
          "dependencies": {
            "ms": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
              "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
            }
          }
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg=="
        }
      }
    },
    "serialize-to-js": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/serialize-to-js/-/serialize-to-js-3.1.1.tgz",
      "integrity": "sha512-F+NGU0UHMBO4Q965tjw7rvieNVjlH6Lqi2emq/Lc9LUURYJbiCzmpi4Cy1OOjjVPtxu0c+NE85LU6968Wko5ZA=="
    },
    "serve-static": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.14.1.tgz",
      "integrity": "sha512-JMrvUwE54emCYWlTI+hGrGv5I8dEwmco/00EvkzIIsR7MqrHonbD9pO2MOfFnpFntl7ecpZs+3mW+XbQZu9QCg==",
      "requires": {
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "0.17.1"
      }
    },
    "set-blocking": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
      "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc="
    },
    "set-value": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.1.tgz",
      "integrity": "sha512-JxHc1weCN68wRY0fhCoXpyK55m/XPHafOmK4UWD7m2CI14GMcFypt4w/0+NV5f/ZMby2F6S2wwA7fgynh9gWSw==",
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-extendable": "^0.1.1",
        "is-plain-object": "^2.0.3",
        "split-string": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "setimmediate": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
      "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU="
    },
    "setprototypeof": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.1.tgz",
      "integrity": "sha512-JvdAWfbXeIGaZ9cILp38HntZSFSo3mWg6xGcJJsd+d4aRMOqauag1C63dJfDw7OaMYwEbHMOxEZ1lqVRYP2OAw=="
    },
    "sha.js": {
      "version": "2.4.11",
      "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
      "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "shallow-copy": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/shallow-copy/-/shallow-copy-0.0.1.tgz",
      "integrity": "sha1-QV9CcC1z2BAzApLMXuhurhoRoXA="
    },
    "sharkdown": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/sharkdown/-/sharkdown-0.1.1.tgz",
      "integrity": "sha512-exwooSpmo5s45lrexgz6Q0rFQM574wYIX3iDZ7RLLqOb7IAoQZu9nxlZODU972g19sR69OIpKP2cpHTzU+PHIg==",
      "requires": {
        "cardinal": "~0.4.2",
        "minimist": "0.0.5",
        "split": "~0.2.10"
      },
      "dependencies": {
        "minimist": {
          "version": "0.0.5",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-0.0.5.tgz",
          "integrity": "sha1-16oye87PUY+RBqxrjwA/o7zqhWY="
        }
      }
    },
    "shebang-command": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-1.2.0.tgz",
      "integrity": "sha1-RKrGW2lbAzmJaMOfNj/uXer98eo=",
      "requires": {
        "shebang-regex": "^1.0.0"
      }
    },
    "shebang-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-1.0.0.tgz",
      "integrity": "sha1-2kL0l0DAtC2yypcoVxyxkMmO/qM="
    },
    "signal-exit": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.3.tgz",
      "integrity": "sha512-VUJ49FC8U1OxwZLxIbTTrDvLnf/6TDgxZcK8wxR8zs13xpx7xbG60ndBlhNrFi2EMuFRoeDoJO7wthSLq42EjA=="
    },
    "simple-swizzle": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/simple-swizzle/-/simple-swizzle-0.2.2.tgz",
      "integrity": "sha1-pNprY1/8zMoz9w0Xy5JZLeleVXo=",
      "requires": {
        "is-arrayish": "^0.3.1"
      },
      "dependencies": {
        "is-arrayish": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.3.2.tgz",
          "integrity": "sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ=="
        }
      }
    },
    "snapdragon": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",
      "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",
      "requires": {
        "base": "^0.11.1",
        "debug": "^2.2.0",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "map-cache": "^0.2.2",
        "source-map": "^0.5.6",
        "source-map-resolve": "^0.5.0",
        "use": "^3.1.0"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "requires": {
            "ms": "2.0.0"
          }
        },
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
        },
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
        }
      }
    },
    "snapdragon-node": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
      "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
      "requires": {
        "define-property": "^1.0.0",
        "isobject": "^3.0.0",
        "snapdragon-util": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "snapdragon-util": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
      "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
      "requires": {
        "kind-of": "^3.2.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
    },
    "source-map-resolve": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.3.tgz",
      "integrity": "sha512-Htz+RnsXWk5+P2slx5Jh3Q66vhQj1Cllm0zvnaY98+NFx+Dv2CF/f5O/t8x+KaNdrdIAsruNzoh/KpialbqAnw==",
      "requires": {
        "atob": "^2.1.2",
        "decode-uri-component": "^0.2.0",
        "resolve-url": "^0.2.1",
        "source-map-url": "^0.4.0",
        "urix": "^0.1.0"
      }
    },
    "source-map-support": {
      "version": "0.5.19",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.19.tgz",
      "integrity": "sha512-Wonm7zOCIJzBGQdB+thsPar0kYuCIzYvxZwlBa87yi/Mdjv7Tip2cyVbLj5o0cFPN4EVkuTwb3GDDyUx2DGnGw==",
      "requires": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      }
    },
    "source-map-url": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.0.tgz",
      "integrity": "sha1-PpNdfd1zYxuXZZlW1VEo6HtQhKM="
    },
    "split": {
      "version": "0.2.10",
      "resolved": "https://registry.npmjs.org/split/-/split-0.2.10.tgz",
      "integrity": "sha1-Zwl8YB1pfOE2j0GPBs0gHPBSGlc=",
      "requires": {
        "through": "2"
      }
    },
    "split-string": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
      "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
      "requires": {
        "extend-shallow": "^3.0.0"
      }
    },
    "sprintf-js": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
      "integrity": "sha1-BOaSb2YolTVPPdAVIDYzuFcpfiw="
    },
    "sshpk": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.16.1.tgz",
      "integrity": "sha512-HXXqVUq7+pcKeLqqZj6mHFUMvXtOJt1uoUx09pFW6011inTMxqI8BA8PM95myrIyyKwdnzjdFjLiE6KBPVtJIg==",
      "requires": {
        "asn1": "~0.2.3",
        "assert-plus": "^1.0.0",
        "bcrypt-pbkdf": "^1.0.0",
        "dashdash": "^1.12.0",
        "ecc-jsbn": "~0.1.1",
        "getpass": "^0.1.1",
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.0.2",
        "tweetnacl": "~0.14.0"
      }
    },
    "stable": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/stable/-/stable-0.1.8.tgz",
      "integrity": "sha512-ji9qxRnOVfcuLDySj9qzhGSEFVobyt1kIOSkj1qZzYLzq7Tos/oUUWvotUPQLlrsidqsK6tBH89Bc9kL5zHA6w=="
    },
    "static-eval": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/static-eval/-/static-eval-2.0.5.tgz",
      "integrity": "sha512-nNbV6LbGtMBgv7e9LFkt5JV8RVlRsyJrphfAt9tOtBBW/SfnzZDf2KnS72an8e434A+9e/BmJuTxeGPvrAK7KA==",
      "requires": {
        "escodegen": "^1.11.1"
      },
      "dependencies": {
        "escodegen": {
          "version": "1.14.1",
          "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.14.1.tgz",
          "integrity": "sha512-Bmt7NcRySdIfNPfU2ZoXDrrXsG9ZjvDxcAlMfDUgRBjLOWTuIACXPBFJH7Z+cLb40JeQco5toikyc9t9P8E9SQ==",
          "requires": {
            "esprima": "^4.0.1",
            "estraverse": "^4.2.0",
            "esutils": "^2.0.2",
            "optionator": "^0.8.1",
            "source-map": "~0.6.1"
          }
        },
        "esprima": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
          "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A=="
        }
      }
    },
    "static-extend": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
      "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
      "requires": {
        "define-property": "^0.2.5",
        "object-copy": "^0.1.0"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        }
      }
    },
    "static-module": {
      "version": "2.2.5",
      "resolved": "https://registry.npmjs.org/static-module/-/static-module-2.2.5.tgz",
      "integrity": "sha512-D8vv82E/Kpmz3TXHKG8PPsCPg+RAX6cbCOyvjM6x04qZtQ47EtJFVwRsdov3n5d6/6ynrOY9XB4JkaZwB2xoRQ==",
      "requires": {
        "concat-stream": "~1.6.0",
        "convert-source-map": "^1.5.1",
        "duplexer2": "~0.1.4",
        "escodegen": "~1.9.0",
        "falafel": "^2.1.0",
        "has": "^1.0.1",
        "magic-string": "^0.22.4",
        "merge-source-map": "1.0.4",
        "object-inspect": "~1.4.0",
        "quote-stream": "~1.0.2",
        "readable-stream": "~2.3.3",
        "shallow-copy": "~0.0.1",
        "static-eval": "^2.0.0",
        "through2": "~2.0.3"
      }
    },
    "statuses": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.5.0.tgz",
      "integrity": "sha1-Fhx9rBd2Wf2YEfQ3cfqZOBR4Yow="
    },
    "stealthy-require": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/stealthy-require/-/stealthy-require-1.1.1.tgz",
      "integrity": "sha1-NbCYdbT/SfJqd35QmzCQoyJr8ks="
    },
    "store": {
      "version": "2.0.12",
      "resolved": "https://registry.npmjs.org/store/-/store-2.0.12.tgz",
      "integrity": "sha1-jFNOKguDH3K3X8XxEZhXxE711ZM="
    },
    "stream-browserify": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.2.tgz",
      "integrity": "sha512-nX6hmklHs/gr2FuxYDltq8fJA1GDlxKQCz8O/IM4atRqBH8OORmBNgfvW5gG10GT/qQ9u0CzIvr2X5Pkt6ntqg==",
      "requires": {
        "inherits": "~2.0.1",
        "readable-stream": "^2.0.2"
      }
    },
    "stream-http": {
      "version": "2.8.3",
      "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.3.tgz",
      "integrity": "sha512-+TSkfINHDo4J+ZobQLWiMouQYB+UVYFttRA94FpEzzJ7ZdqcL4uUUQ7WkdkI4DSozGmgBUE/a47L+38PenXhUw==",
      "requires": {
        "builtin-status-codes": "^3.0.0",
        "inherits": "^2.0.1",
        "readable-stream": "^2.3.6",
        "to-arraybuffer": "^1.0.0",
        "xtend": "^4.0.0"
      }
    },
    "string-width": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
      "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
      "requires": {
        "emoji-regex": "^7.0.1",
        "is-fullwidth-code-point": "^2.0.0",
        "strip-ansi": "^5.1.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        }
      }
    },
    "string.prototype.trimend": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.1.tgz",
      "integrity": "sha512-LRPxFUaTtpqYsTeNKaFOw3R4bxIzWOnbQ837QfBylo8jIxtcbK/A/sMV7Q+OAV/vWo+7s25pOE10KYSjaSO06g==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5"
      }
    },
    "string.prototype.trimleft": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/string.prototype.trimleft/-/string.prototype.trimleft-2.1.2.tgz",
      "integrity": "sha512-gCA0tza1JBvqr3bfAIFJGqfdRTyPae82+KTnm3coDXkZN9wnuW3HjGgN386D7hfv5CHQYCI022/rJPVlqXyHSw==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5",
        "string.prototype.trimstart": "^1.0.0"
      }
    },
    "string.prototype.trimright": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/string.prototype.trimright/-/string.prototype.trimright-2.1.2.tgz",
      "integrity": "sha512-ZNRQ7sY3KroTaYjRS6EbNiiHrOkjihL9aQE/8gfQ4DtAC/aEBRHFJa44OmoWxGGqXuJlfKkZW4WcXErGr+9ZFg==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5",
        "string.prototype.trimend": "^1.0.0"
      }
    },
    "string.prototype.trimstart": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.1.tgz",
      "integrity": "sha512-XxZn+QpvrBI1FOcg6dIpxUPgWCPuNXvMD72aaRaUQv1eD4e/Qy8i/hFTe0BUmD60p/QA6bh1avmuPTfNjqVWRw==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5"
      }
    },
    "string_decoder": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
      "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
      "requires": {
        "safe-buffer": "~5.1.0"
      }
    },
    "strip-ansi": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
      "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
      "requires": {
        "ansi-regex": "^3.0.0"
      }
    },
    "stylehacks": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/stylehacks/-/stylehacks-4.0.3.tgz",
      "integrity": "sha512-7GlLk9JwlElY4Y6a/rmbH2MhVlTyVmiJd1PfTCqFaIBEGMYNsrO/v3SeGTdhBThLg4Z+NbOk/qFMwCa+J+3p/g==",
      "requires": {
        "browserslist": "^4.0.0",
        "postcss": "^7.0.0",
        "postcss-selector-parser": "^3.0.0"
      },
      "dependencies": {
        "postcss-selector-parser": {
          "version": "3.1.2",
          "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.2.tgz",
          "integrity": "sha512-h7fJ/5uWuRVyOtkO45pnt1Ih40CEleeyCHzipqAZO2e5H20g25Y48uYnFUiShvY4rZWNJ/Bib/KVPmanaCtOhA==",
          "requires": {
            "dot-prop": "^5.2.0",
            "indexes-of": "^1.0.1",
            "uniq": "^1.0.1"
          }
        }
      }
    },
    "supports-color": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
      "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
      "requires": {
        "has-flag": "^3.0.0"
      }
    },
    "svgo": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/svgo/-/svgo-1.3.2.tgz",
      "integrity": "sha512-yhy/sQYxR5BkC98CY7o31VGsg014AKLEPxdfhora76l36hD9Rdy5NZA/Ocn6yayNPgSamYdtX2rFJdcv07AYVw==",
      "requires": {
        "chalk": "^2.4.1",
        "coa": "^2.0.2",
        "css-select": "^2.0.0",
        "css-select-base-adapter": "^0.1.1",
        "css-tree": "1.0.0-alpha.37",
        "csso": "^4.0.2",
        "js-yaml": "^3.13.1",
        "mkdirp": "~0.5.1",
        "object.values": "^1.1.0",
        "sax": "~1.2.4",
        "stable": "^0.1.8",
        "unquote": "~1.1.1",
        "util.promisify": "~1.0.0"
      }
    },
    "symbol-tree": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.4.tgz",
      "integrity": "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw=="
    },
    "terser": {
      "version": "3.17.0",
      "resolved": "https://registry.npmjs.org/terser/-/terser-3.17.0.tgz",
      "integrity": "sha512-/FQzzPJmCpjAH9Xvk2paiWrFq+5M6aVOf+2KRbwhByISDX/EujxsK+BAvrhb6H+2rtrLCHK9N01wO014vrIwVQ==",
      "requires": {
        "commander": "^2.19.0",
        "source-map": "~0.6.1",
        "source-map-support": "~0.5.10"
      }
    },
    "through": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
      "integrity": "sha1-DdTJ/6q8NXlgsbckEV1+Doai4fU="
    },
    "through2": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.5.tgz",
      "integrity": "sha512-/mrRod8xqpA+IHSLyGCQ2s8SPHiCDEeQJSep1jqLYeEUClOFG2Qsh+4FU6G9VeqpZnGW/Su8LQGc4YKni5rYSQ==",
      "requires": {
        "readable-stream": "~2.3.6",
        "xtend": "~4.0.1"
      }
    },
    "timers-browserify": {
      "version": "2.0.11",
      "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.11.tgz",
      "integrity": "sha512-60aV6sgJ5YEbzUdn9c8kYGIqOubPoUdqQCul3SBAsRCZ40s6Y5cMcrW4dt3/k/EsbLVJNl9n6Vz3fTc+k2GeKQ==",
      "requires": {
        "setimmediate": "^1.0.4"
      }
    },
    "timsort": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/timsort/-/timsort-0.3.0.tgz",
      "integrity": "sha1-QFQRqOfmM5/mTbmiNN4R3DHgK9Q="
    },
    "tiny-inflate": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/tiny-inflate/-/tiny-inflate-1.0.3.tgz",
      "integrity": "sha512-pkY1fj1cKHb2seWDy0B16HeWyczlJA9/WW3u3c4z/NiWDsO3DOU5D7nhTLE9CF0yXv/QZFY7sEJmj24dK+Rrqw=="
    },
    "tiny-osmpbf": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/tiny-osmpbf/-/tiny-osmpbf-0.1.0.tgz",
      "integrity": "sha1-ColXFxE+vmquNjxL5e76js2vuSc=",
      "requires": {
        "pbf": "^3.0.4",
        "tiny-inflate": "^1.0.2"
      }
    },
    "to-arraybuffer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
      "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M="
    },
    "to-fast-properties": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz",
      "integrity": "sha1-3F5pjL0HkmW8c+A3doGk5Og/YW4="
    },
    "to-object-path": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
      "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "to-regex": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
      "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
      "requires": {
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "regex-not": "^1.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "to-regex-range": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
      "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
      "requires": {
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1"
      }
    },
    "toidentifier": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.0.tgz",
      "integrity": "sha512-yaOH/Pk/VEhBWWTlhI+qXxDFXlejDGcQipMlyxda9nthulaxLZUNcUqFxokp0vcYnvteJln5FNQDRrxj3YcbVw=="
    },
    "tough-cookie": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
      "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
      "requires": {
        "psl": "^1.1.28",
        "punycode": "^2.1.1"
      }
    },
    "tr46": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-1.0.1.tgz",
      "integrity": "sha1-qLE/1r/SSJUZZ0zN5VujaTtwbQk=",
      "requires": {
        "punycode": "^2.1.0"
      }
    },
    "tty-browserify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
      "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY="
    },
    "tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
      "requires": {
        "safe-buffer": "^5.0.1"
      }
    },
    "tweetnacl": {
      "version": "0.14.5",
      "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
      "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q="
    },
    "type-check": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.3.2.tgz",
      "integrity": "sha1-WITKtRLPHTVeP7eE8wgEsrUg23I=",
      "requires": {
        "prelude-ls": "~1.1.2"
      }
    },
    "typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c="
    },
    "typescript": {
      "version": "3.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-3.9.3.tgz",
      "integrity": "sha512-D/wqnB2xzNFIcoBG9FG8cXRDjiqSTbG2wd8DMZeQyJlP1vfTkIxH4GKveWaEBYySKIg+USu+E+EDIR47SqnaMQ==",
      "dev": true
    },
    "uncss": {
      "version": "0.17.3",
      "resolved": "https://registry.npmjs.org/uncss/-/uncss-0.17.3.tgz",
      "integrity": "sha512-ksdDWl81YWvF/X14fOSw4iu8tESDHFIeyKIeDrK6GEVTQvqJc1WlOEXqostNwOCi3qAj++4EaLsdAgPmUbEyog==",
      "requires": {
        "commander": "^2.20.0",
        "glob": "^7.1.4",
        "is-absolute-url": "^3.0.1",
        "is-html": "^1.1.0",
        "jsdom": "^14.1.0",
        "lodash": "^4.17.15",
        "postcss": "^7.0.17",
        "postcss-selector-parser": "6.0.2",
        "request": "^2.88.0"
      },
      "dependencies": {
        "is-absolute-url": {
          "version": "3.0.3",
          "resolved": "https://registry.npmjs.org/is-absolute-url/-/is-absolute-url-3.0.3.tgz",
          "integrity": "sha512-opmNIX7uFnS96NtPmhWQgQx6/NYFgsUXYMllcfzwWKUMwfo8kku1TvE6hkNcH+Q1ts5cMVrsY7j0bxXQDciu9Q=="
        }
      }
    },
    "unicode-canonical-property-names-ecmascript": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/unicode-canonical-property-names-ecmascript/-/unicode-canonical-property-names-ecmascript-1.0.4.tgz",
      "integrity": "sha512-jDrNnXWHd4oHiTZnx/ZG7gtUTVp+gCcTTKr8L0HjlwphROEW3+Him+IpvC+xcJEFegapiMZyZe02CyuOnRmbnQ=="
    },
    "unicode-match-property-ecmascript": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/unicode-match-property-ecmascript/-/unicode-match-property-ecmascript-1.0.4.tgz",
      "integrity": "sha512-L4Qoh15vTfntsn4P1zqnHulG0LdXgjSO035fEpdtp6YxXhMT51Q6vgM5lYdG/5X3MjS+k/Y9Xw4SFCY9IkR0rg==",
      "requires": {
        "unicode-canonical-property-names-ecmascript": "^1.0.4",
        "unicode-property-aliases-ecmascript": "^1.0.4"
      }
    },
    "unicode-match-property-value-ecmascript": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/unicode-match-property-value-ecmascript/-/unicode-match-property-value-ecmascript-1.2.0.tgz",
      "integrity": "sha512-wjuQHGQVofmSJv1uVISKLE5zO2rNGzM/KCYZch/QQvez7C1hUhBIuZ701fYXExuufJFMPhv2SyL8CyoIfMLbIQ=="
    },
    "unicode-property-aliases-ecmascript": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unicode-property-aliases-ecmascript/-/unicode-property-aliases-ecmascript-1.1.0.tgz",
      "integrity": "sha512-PqSoPh/pWetQ2phoj5RLiaqIk4kCNwoV3CI+LfGmWLKI3rE3kl1h59XpX2BjgDrmbxD9ARtQobPGU1SguCYuQg=="
    },
    "unicode-trie": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/unicode-trie/-/unicode-trie-0.3.1.tgz",
      "integrity": "sha1-1nHd3YkQGgi6w3tqUWEBBgIFIIU=",
      "requires": {
        "pako": "^0.2.5",
        "tiny-inflate": "^1.0.0"
      }
    },
    "union-value": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.1.tgz",
      "integrity": "sha512-tJfXmxMeWYnczCVs7XAEvIV7ieppALdyepWMkHkwciRpZraG/xwT+s2JN8+pr1+8jCRf80FFzvr+MpQeeoF4Xg==",
      "requires": {
        "arr-union": "^3.1.0",
        "get-value": "^2.0.6",
        "is-extendable": "^0.1.1",
        "set-value": "^2.0.1"
      }
    },
    "uniq": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/uniq/-/uniq-1.0.1.tgz",
      "integrity": "sha1-sxxa6CVIRKOoKBVBzisEuGWnNP8="
    },
    "uniqs": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/uniqs/-/uniqs-2.0.0.tgz",
      "integrity": "sha1-/+3ks2slKQaW5uFl1KWe25mOawI="
    },
    "unquote": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/unquote/-/unquote-1.1.1.tgz",
      "integrity": "sha1-j97XMk7G6IoP+LkF58CYzcCG1UQ="
    },
    "unset-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
      "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
      "requires": {
        "has-value": "^0.3.1",
        "isobject": "^3.0.0"
      },
      "dependencies": {
        "has-value": {
          "version": "0.3.1",
          "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
          "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
          "requires": {
            "get-value": "^2.0.3",
            "has-values": "^0.1.4",
            "isobject": "^2.0.0"
          },
          "dependencies": {
            "isobject": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
              "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
              "requires": {
                "isarray": "1.0.0"
              }
            }
          }
        },
        "has-values": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
          "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E="
        }
      }
    },
    "upath": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/upath/-/upath-1.2.0.tgz",
      "integrity": "sha512-aZwGpamFO61g3OlfT7OQCHqhGnW43ieH9WZeP7QxN/G/jS4jfqUkZxoryvJgVPEcrl5NL/ggHsSmLMHuH64Lhg=="
    },
    "uri-js": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.2.2.tgz",
      "integrity": "sha512-KY9Frmirql91X2Qgjry0Wd4Y+YTdrdZheS8TFwvkbLWf/G5KNJDCh6pKL5OZctEW4+0Baa5idK2ZQuELRwPznQ==",
      "requires": {
        "punycode": "^2.1.0"
      }
    },
    "urix": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
      "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI="
    },
    "url": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
      "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
      "requires": {
        "punycode": "1.3.2",
        "querystring": "0.2.0"
      },
      "dependencies": {
        "punycode": {
          "version": "1.3.2",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
          "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0="
        }
      }
    },
    "use": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/use/-/use-3.1.1.tgz",
      "integrity": "sha512-cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ/gGpj7vbvFrAY/eIioQ6Dw23KjZhYgiIo8HOs1nQ2vr/oQ=="
    },
    "util": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/util/-/util-0.11.1.tgz",
      "integrity": "sha512-HShAsny+zS2TZfaXxD9tYj4HQGlBezXZMZuM/S5PKLLoZkShZiGk9o5CzukI1LVHZvjdvZ2Sj1aW/Ndn2NB/HQ==",
      "requires": {
        "inherits": "2.0.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.3",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
          "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4="
        }
      }
    },
    "util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8="
    },
    "util.promisify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/util.promisify/-/util.promisify-1.0.1.tgz",
      "integrity": "sha512-g9JpC/3He3bm38zsLupWryXHoEcS22YHthuPQSJdMy6KNrzIRzWqcsHzD/WUnqe45whVou4VIsPew37DoXWNrA==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.2",
        "has-symbols": "^1.0.1",
        "object.getownpropertydescriptors": "^2.1.0"
      }
    },
    "uuid": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.4.0.tgz",
      "integrity": "sha512-HjSDRw6gZE5JMggctHBcjVak08+KEVhSIiDzFnT9S9aegmp85S/bReBVTb4QTFaRNptJ9kuYaNhnbNEOkbKb/A=="
    },
    "v8-compile-cache": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/v8-compile-cache/-/v8-compile-cache-2.1.0.tgz",
      "integrity": "sha512-usZBT3PW+LOjM25wbqIlZwPeJV+3OSz3M1k1Ws8snlW39dZyYL9lOGC5FgPVHfk0jKmjiDV8Z0mIbVQPiwFs7g=="
    },
    "vendors": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/vendors/-/vendors-1.0.4.tgz",
      "integrity": "sha512-/juG65kTL4Cy2su4P8HjtkTxk6VmJDiOPBufWniqQ6wknac6jNiXS9vU+hO3wgusiyqWlzTbVHi0dyJqRONg3w=="
    },
    "verror": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
      "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
      "requires": {
        "assert-plus": "^1.0.0",
        "core-util-is": "1.0.2",
        "extsprintf": "^1.2.0"
      }
    },
    "vlq": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/vlq/-/vlq-0.2.3.tgz",
      "integrity": "sha512-DRibZL6DsNhIgYQ+wNdWDL2SL3bKPlVrRiBqV5yuMm++op8W4kGFtaQfCs4KEJn0wBZcHVHJ3eoywX8983k1ow=="
    },
    "vm-browserify": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-1.1.2.tgz",
      "integrity": "sha512-2ham8XPWTONajOR0ohOKOHXkm3+gaBmGut3SRuu75xLd/RRaY6vqgh8NBYYk7+RW3u5AtzPQZG8F10LHkl0lAQ=="
    },
    "w3c-hr-time": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/w3c-hr-time/-/w3c-hr-time-1.0.2.tgz",
      "integrity": "sha512-z8P5DvDNjKDoFIHK7q8r8lackT6l+jo/Ye3HOle7l9nICP9lf1Ci25fy9vHd0JOWewkIFzXIEig3TdKT7JQ5fQ==",
      "requires": {
        "browser-process-hrtime": "^1.0.0"
      }
    },
    "w3c-xmlserializer": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/w3c-xmlserializer/-/w3c-xmlserializer-1.1.2.tgz",
      "integrity": "sha512-p10l/ayESzrBMYWRID6xbuCKh2Fp77+sA0doRuGn4tTIMrrZVeqfpKjXHY+oDh3K4nLdPgNwMTVP6Vp4pvqbNg==",
      "requires": {
        "domexception": "^1.0.1",
        "webidl-conversions": "^4.0.2",
        "xml-name-validator": "^3.0.0"
      }
    },
    "wcwidth": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/wcwidth/-/wcwidth-1.0.1.tgz",
      "integrity": "sha1-8LDc+RW8X/FSivrbLA4XtTLaL+g=",
      "requires": {
        "defaults": "^1.0.3"
      }
    },
    "webidl-conversions": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-4.0.2.tgz",
      "integrity": "sha512-YQ+BmxuTgd6UXZW3+ICGfyqRyHXVlD5GtQr5+qjiNW7bF0cqrzX500HVXPBOvgXb5YnzDd+h0zqyv61KUD7+Sg=="
    },
    "wgs84": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/wgs84/-/wgs84-0.0.0.tgz",
      "integrity": "sha1-NP3FVZF7blfPKigu0ENxDASc3HY="
    },
    "whatwg-encoding": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-1.0.5.tgz",
      "integrity": "sha512-b5lim54JOPN9HtzvK9HFXvBma/rnfFeqsic0hSpjtDbVxR3dJKLc+KB4V6GgiGOvl7CY/KNh8rxSo9DKQrnUEw==",
      "requires": {
        "iconv-lite": "0.4.24"
      }
    },
    "whatwg-mimetype": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/whatwg-mimetype/-/whatwg-mimetype-2.3.0.tgz",
      "integrity": "sha512-M4yMwr6mAnQz76TbJm914+gPpB/nCwvZbJU28cUD6dR004SAxDLOOSUaB1JDRqLtaOV/vi0IC5lEAGFgrjGv/g=="
    },
    "whatwg-url": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-7.1.0.tgz",
      "integrity": "sha512-WUu7Rg1DroM7oQvGWfOiAK21n74Gg+T4elXEQYkOhtyLeWiJFoOGLXPKI/9gzIie9CtwVLm8wtw6YJdKyxSjeg==",
      "requires": {
        "lodash.sortby": "^4.7.0",
        "tr46": "^1.0.1",
        "webidl-conversions": "^4.0.2"
      }
    },
    "which": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
      "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
      "requires": {
        "isexe": "^2.0.0"
      }
    },
    "which-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
      "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho="
    },
    "word-wrap": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.3.tgz",
      "integrity": "sha512-Hz/mrNwitNRh/HUAtM/VT/5VH+ygD6DV7mYKZAtHOrbs8U7lvPS6xf7EJKMF0uW1KJCl0H701g3ZGus+muE5vQ=="
    },
    "wordwrap": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.3.tgz",
      "integrity": "sha1-o9XabNXAvAAI03I0u68b7WMFkQc="
    },
    "wrap-ansi": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
      "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
      "requires": {
        "ansi-styles": "^3.2.0",
        "string-width": "^3.0.0",
        "strip-ansi": "^5.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        }
      }
    },
    "wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8="
    },
    "ws": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/ws/-/ws-5.2.2.tgz",
      "integrity": "sha512-jaHFD6PFv6UgoIVda6qZllptQsMlDEJkTQcybzzXDYM1XO9Y8em691FGMPmM46WGyLU4z9KMgQN+qrux/nhlHA==",
      "requires": {
        "async-limiter": "~1.0.0"
      }
    },
    "xml-name-validator": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-3.0.0.tgz",
      "integrity": "sha512-A5CUptxDsvxKJEU3yO6DuWBSJz/qizqzJKOMIfUJHETbBw/sFaDxgd6fxm1ewUaM0jZ444Fc5vC5ROYurg/4Pw=="
    },
    "xmlchars": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/xmlchars/-/xmlchars-2.2.0.tgz",
      "integrity": "sha512-JZnDKK8B0RCDw84FNdDAIpZK+JuJw+s7Lz8nksI7SIuU3UXJJslUthsi+uWBUYOwPFwW7W7PRLRfUKpxjtjFCw=="
    },
    "xmldom": {
      "version": "0.1.31",
      "resolved": "https://registry.npmjs.org/xmldom/-/xmldom-0.1.31.tgz",
      "integrity": "sha512-yS2uJflVQs6n+CyjHoaBmVSqIDevTAWrzMmjG1Gc7h1qQ7uVozNhEPJAwZXWyGQ/Gafo3fCwrcaokezLPupVyQ=="
    },
    "xtend": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
      "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ=="
    },
    "y18n": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
      "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
    },
    "yargs": {
      "version": "14.2.3",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-14.2.3.tgz",
      "integrity": "sha512-ZbotRWhF+lkjijC/VhmOT9wSgyBQ7+zr13+YLkhfsSiTriYsMzkTUFP18pFhWwBeMa5gUc1MzbhrO6/VB7c9Xg==",
      "requires": {
        "cliui": "^5.0.0",
        "decamelize": "^1.2.0",
        "find-up": "^3.0.0",
        "get-caller-file": "^2.0.1",
        "require-directory": "^2.1.1",
        "require-main-filename": "^2.0.0",
        "set-blocking": "^2.0.0",
        "string-width": "^3.0.0",
        "which-module": "^2.0.0",
        "y18n": "^4.0.0",
        "yargs-parser": "^15.0.1"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
          "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        }
      }
    },
    "yargs-parser": {
      "version": "15.0.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-15.0.1.tgz",
      "integrity": "sha512-0OAMV2mAZQrs3FkNpDQcBk1x5HXb8X4twADss4S0Iuk+2dGnLOE/fRHrsYm542GduMveyA77OF4wrNJuanRCWw==",
      "requires": {
        "camelcase": "^5.0.0",
        "decamelize": "^1.2.0"
      }
    }
  }
};
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45909" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","package-lock.json"], null)
//# sourceMappingURL=/package-lock.js.map