"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports.pmfl = exports.ignore = exports.numSet = undefined;

var _slicedToArray = function() { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) { return typeof obj; } : function(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//函数typeOf
var typeOf = function typeOf(obj) {
  var class2type = {};
  "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, i) {
    class2type["[object " + e + "]"] = e.toLowerCase();
  });
  if (obj == null) {
    return String(obj);
  }
  return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[class2type.toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

var make = function make() {
  var obj = {};
  var keyData = _immutable2.default.Map({});
  var conditionData = _immutable2.default.Map({});
  var functionData = _immutable2.default.Map({});
  var neitherData = null;
  var add = function add(key, condition, func) {
    keyData = keyData.set(key, key);
    conditionData = conditionData.set(key, condition);
    functionData = functionData.set(key, func);
    return obj;
  };
  var neither = function neither(func) {
    neitherData = func;
    return obj;
  };
  var remove = function remove(key) {
    if (key === undefined) {
      neitherData = null;
    }
    if (keyData.has(key)) {
      keyData = keyData.delete(key);
      conditionData = conditionData.delete(key);
      functionData = functionData.delete(key);
    }
    return obj;
  };
  var clear = function clear() {
    keyData = _immutable2.default.Map({});
    conditionData = _immutable2.default.Map({});
    functionData = _immutable2.default.Map({});
    neitherData = null;
    return obj;
  };
  var load = function load() {
    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    rest.map(function(data) {
      var _data = _slicedToArray(data, 3),
        key = _data[0],
        condition = _data[1],
        func = _data[2];

      keyData = keyData.set(key, key);
      conditionData = conditionData.set(key, condition);
      functionData = functionData.set(key, func);
      return null;
    });
    return obj;
  };
  var unload = function unload() {
    for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      rest[_key2] = arguments[_key2];
    }

    if (rest.length === 0) {
      neitherData = null;
    }
    rest.map(function(data) {
      if (keyData.has(data)) {
        keyData = keyData.delete(data);
        conditionData = conditionData.delete(data);
        functionData = functionData.delete(data);
      }
      return null;
    });
    return obj;
  };
  var match = function match(args, otherArgs) {
    var key = null;
    var keyList = [];
    keyData.map(function(data) {
      return keyList.push(data);
    });
    for (var i = 0; i < keyList.length; i++) {
      if (key !== null) {
        break;
      }
      if (typeOf(conditionData.get(keyList[i])) === "function") {
        if (conditionData.get(keyList[i])(args) === true) {
          key = keyList[i];
        }
      } else if (typeOf(conditionData.get(keyList[i])) === "array") {
        var count = 0;
        for (var j = 0; j < conditionData.get(keyList[i]).length; j++) {
          if (conditionData.get(keyList[i])[j].isIgnore) {
            count++;
          } else if (conditionData.get(keyList[i])[j].isNumSet && conditionData.get(keyList[i])[j].play(args[j])) {
            count++;
          } else if (typeOf(conditionData.get(keyList[i])[j]) === "regexp" && conditionData.get(keyList[i])[j].test(args[j])) {
            count++;
          } else if (conditionData.get(keyList[i])[j] === args[j]) {
            count++;
          }
        }
        if (count === conditionData.get(keyList[i]).length) {
          key = keyList[i];
          break;
        }
      }
    }
    if (otherArgs !== undefined) {
      if (key !== null) {
        functionData.get(key)(otherArgs);
      } else if (key === null && neitherData !== null) {
        neitherData(otherArgs);
      }
    } else {
      if (key !== null) {
        functionData.get(key)(args);
      } else if (key === null && neitherData !== null) {
        neitherData(args);
      }
    }

    return obj;
  };
  obj.add = add;
  obj.neither = neither;
  obj.remove = remove;
  obj.clear = clear;
  obj.load = load;
  obj.unload = unload;
  obj.match = match;
  obj.a = add;
  obj.n = neither;
  obj.r = remove;
  obj.c = clear;
  obj.l = load;
  obj.u = unload;
  obj.m = match;
  return obj;
};
var make2 = function make2() {
  var obj = {};
  var keyData = _immutable2.default.Map({});
  var conditionData = _immutable2.default.Map({});
  var functionData = _immutable2.default.Map({});
  var neitherData = null;
  var add = function add(condition, func) {
    var tempMut = Symbol();
    keyData = keyData.set(tempMut, tempMut);
    conditionData = conditionData.set(tempMut, condition);
    functionData = functionData.set(tempMut, func);
    return obj;
  };
  var neither = function neither(func) {
    neitherData = func;
    return obj;
  };
  var clear = function clear() {
    keyData = _immutable2.default.Map({});
    conditionData = _immutable2.default.Map({});
    functionData = _immutable2.default.Map({});
    neitherData = null;
    return obj;
  };
  var load = function load() {
    for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      rest[_key3] = arguments[_key3];
    }

    rest.map(function(data) {
      var tempMut = Symbol();

      var _data2 = _slicedToArray(data, 2),
        condition = _data2[0],
        func = _data2[1];

      keyData = keyData.set(tempMut, tempMut);
      conditionData = conditionData.set(tempMut, condition);
      functionData = functionData.set(tempMut, func);
      return null;
    });
    return obj;
  };
  var match = function match(args, otherArgs) {
    var key = null;
    var keyList = [];
    keyData.map(function(data) {
      return keyList.push(data);
    });
    for (var i = 0; i < keyList.length; i++) {
      if (key !== null) {
        break;
      }
      if (typeOf(conditionData.get(keyList[i])) === "function") {
        if (conditionData.get(keyList[i])(args) === true) {
          key = keyList[i];
        }
      } else if (typeOf(conditionData.get(keyList[i])) === "array") {
        var count = 0;
        for (var j = 0; j < conditionData.get(keyList[i]).length; j++) {
          if (conditionData.get(keyList[i])[j].isIgnore) {
            count++;
          } else if (conditionData.get(keyList[i])[j].isNumSet && conditionData.get(keyList[i])[j].play(args[j])) {
            count++;
          } else if (typeOf(conditionData.get(keyList[i])[j]) === "regexp" && conditionData.get(keyList[i])[j].test(args[j])) {
            count++;
          } else if (conditionData.get(keyList[i])[j] === args[j]) {
            count++;
          }
        }
        if (count === conditionData.get(keyList[i]).length) {
          key = keyList[i];
          break;
        }
      }
    }
    if (otherArgs !== undefined) {
      if (key !== null) {
        functionData.get(key)(otherArgs);
      } else if (key === null && neitherData !== null) {
        neitherData(otherArgs);
      }
    } else {
      if (key !== null) {
        functionData.get(key)(args);
      } else if (key === null && neitherData !== null) {
        neitherData(args);
      }
    }
    return obj;
  };
  obj.add = add;
  obj.neither = neither;
  obj.clear = clear;
  obj.load = load;
  obj.match = match;
  obj.a = add;
  obj.n = neither;
  obj.c = clear;
  obj.l = load;
  obj.m = match;
  return obj;
};
var numSet = exports.numSet = function numSet(str) {
  var obj = {
    isNumSet: true
  };
  var mt = null;
  var mte = null;
  var lt = null;
  var lte = null;
  var tempStr = str.replace(/\s+/g, "");
  var tempArray = tempStr.split(",");
  if (/^\[-?\d+,-?\d+\]$/.test(tempStr) || /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(tempStr) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr)) {
    mte = tempArray[0].replace(/[^0-9.-]/ig, "");
    lte = tempArray[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(-?\d+,-?\d+\)$/.test(tempStr) || /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(tempStr) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr)) {
    mt = tempArray[0].replace(/[^0-9.-]/ig, "");
    lt = tempArray[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\[-?\d+,-?\d+\)$/.test(tempStr) || /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(tempStr) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr)) {
    mte = tempArray[0].replace(/[^0-9.-]/ig, "");
    lt = tempArray[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(-?\d+,-?\d+\]$/.test(tempStr) || /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(tempStr) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr)) {
    mt = tempArray[0].replace(/[^0-9.-]/ig, "");
    lte = tempArray[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\[-?\d+,\)$/.test(tempStr) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(tempStr)) {
    mte = tempArray[0].replace(/[^0-9.-]/ig, "");
  } else if (/^\(-?\d+,\)$/.test(tempStr) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(tempStr)) {
    mt = tempArray[0].replace(/[^0-9.-]/ig, "");
  } else if (/^\(,-?\d+\]$/.test(tempStr) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr)) {
    lte = tempArray[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(,-?\d+\)$/.test(tempStr) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr)) {
    lt = tempArray[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(,\)$/.test(str)) { }
  var play = function play(num) {
    if (typeOf(num) !== 'number') {
      return false;
    }
    var count = -4;
    if (mt === null) {
      count++;
    } else {
      if (num > mt) {
        count++;
      }
    }
    if (mte === null) {
      count++;
    } else {
      if (num >= mte) {
        count++;
      }
    }
    if (lt === null) {
      count++;
    } else {
      if (num < lt) {
        count++;
      }
    }
    if (lte === null) {
      count++;
    } else {
      if (num <= lte) {
        count++;
      }
    }
    if (count) {
      return false;
    } else {
      return true;
    }
  };
  obj.play = play;
  return obj;
};
var ignore = exports.ignore = {
  isIgnore: true
};
var pmfl = exports.pmfl = {
  make: make,
  m: make,
  make2: make2,
  m2: make2
};
var type = exports.type = {
  of: typeOf,
  boolean: "boolean",
  number: "number",
  string: "string",
  function: "function",
  array: "array",
  date: "date",
  regexp: "regexp",
  object: "object",
  error: "error"
};
