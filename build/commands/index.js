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
})({"../components/Header.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const jsx_runtime_1 = require("react/jsx-runtime");

const ink_1 = require("ink");

function Header({
  children
}) {
  return (0, jsx_runtime_1.jsxs)(ink_1.Text, {
    children: [(0, jsx_runtime_1.jsx)(ink_1.Newline, {}, void 0), (0, jsx_runtime_1.jsx)(ink_1.Text, Object.assign({
      bold: true
    }, {
      children: "DPC Nordics CLI"
    }), void 0), (0, jsx_runtime_1.jsx)(ink_1.Newline, {}, void 0), children ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
      children: [children, (0, jsx_runtime_1.jsx)(ink_1.Newline, {}, void 0)]
    }, void 0) : null]
  }, void 0);
}

exports.default = Header;
},{}],"next.tsx":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const jsx_runtime_1 = require("react/jsx-runtime");

const react_1 = require("react");

const ink_1 = require("ink");

const prop_types_1 = __importDefault(require("prop-types"));

const child_process_1 = require("child_process");

const Header_1 = __importDefault(require("../components/Header"));

function Next({
  name = "dpc-next"
}) {
  (0, react_1.useEffect)(() => {
    const cloneSpawn = (0, child_process_1.spawn)("git", ["clone", "https://github.com/DPC-Nordics/dpc-next.git", name], {
      stdio: "inherit"
    });
    cloneSpawn.addListener("message", message => console.log(message));
    return () => {
      cloneSpawn.removeAllListeners("message");
    };
  }, [name]);
  return (0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({
    flexDirection: "column"
  }, {
    children: (0, jsx_runtime_1.jsx)(Header_1.default, {
      children: `NextJS E-commerce project ${name ? `as "${name}"` : ""}`
    }, void 0)
  }), void 0);
}

exports.default = Next;
Next.propTypes = {
  /// Name of the project after cloning
  name: prop_types_1.default.string
};
Next.positionalArgs = ["name"];
},{"../components/Header":"../components/Header.tsx"}],"index.tsx":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const jsx_runtime_1 = require("react/jsx-runtime");

const ink_1 = require("ink");

const ink_select_input_1 = __importDefault(require("ink-select-input"));

const react_1 = require("react");

const next_1 = __importDefault(require("./next"));

const Header_1 = __importDefault(require("../components/Header"));

const commands = [{
  value: "next",
  label: "NextJS E-commerce",
  component: (0, jsx_runtime_1.jsx)(next_1.default, {}, void 0)
}];

function Index() {
  const [commandComponent, setCommandComponent] = (0, react_1.useState)(null);

  const handleSelect = item => {
    const {
      component
    } = commands.find(command => command.value === item.value) || {};
    if (component) setCommandComponent(component);
  };

  return (0, jsx_runtime_1.jsxs)(ink_1.Box, Object.assign({
    flexDirection: "column"
  }, {
    children: [(0, jsx_runtime_1.jsx)(Header_1.default, {
      children: "The following commands are available:"
    }, void 0), (0, jsx_runtime_1.jsx)(ink_select_input_1.default, {
      items: commands,
      onSelect: handleSelect,
      isFocused: true
    }, void 0), commandComponent]
  }), void 0);
}

exports.default = Index;
},{"./next":"next.tsx","../components/Header":"../components/Header.tsx"}]},{},["index.tsx"], null)
//# sourceMappingURL=/index.js.map