"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports.pmfl = exports.ignore = exports.data_set = exports.num_set = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var type_of = function type_of(obj) {
  var class2type = {};
  "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (e) {
    class2type["[object " + e + "]"] = e.toLowerCase();
  });
  if (obj == null) {
    return String(obj);
  }
  return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[class2type.toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

var make = function make() {
  var obj = {};
  var key_data = _immutable2.default.Map({});
  var condition_data = _immutable2.default.Map({});
  var function_data = _immutable2.default.Map({});
  var neither_data = null;
  var add = function add(key, condition, func) {
    key_data = key_data.set(key, key);
    condition_data = condition_data.set(key, condition);
    function_data = function_data.set(key, func);
    return obj;
  };
  var neither = function neither(func) {
    neither_data = func;
    return obj;
  };
  var remove = function remove(key) {
    if (key === undefined) {
      neither_data = null;
    }
    if (key_data.has(key)) {
      key_data = key_data.delete(key);
      condition_data = condition_data.delete(key);
      function_data = function_data.delete(key);
    }
    return obj;
  };
  var clear = function clear() {
    key_data = _immutable2.default.Map({});
    condition_data = _immutable2.default.Map({});
    function_data = _immutable2.default.Map({});
    neither_data = null;
    return obj;
  };
  var load = function load() {
    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    rest.map(function (data) {
      var _data = _slicedToArray(data, 3),
          key = _data[0],
          condition = _data[1],
          func = _data[2];

      key_data = key_data.set(key, key);
      condition_data = condition_data.set(key, condition);
      function_data = function_data.set(key, func);
      return null;
    });
    return obj;
  };
  var unload = function unload() {
    for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      rest[_key2] = arguments[_key2];
    }

    if (rest.length === 0) {
      neither_data = null;
    }
    rest.map(function (data) {
      if (key_data.has(data)) {
        key_data = key_data.delete(data);
        condition_data = condition_data.delete(data);
        function_data = function_data.delete(data);
      }
      return null;
    });
    return obj;
  };
  var match = function match(args, other_args) {
    var key = null;
    var key_list = [];
    key_data.map(function (data) {
      return key_list.push(data);
    });
    for (var i = 0; i < key_list.length; i++) {
      if (key !== null) {
        break;
      }
      if (type_of(condition_data.get(key_list[i])) === "function") {
        if (condition_data.get(key_list[i])(args) === true) {
          key = key_list[i];
        }
      } else if (type_of(condition_data.get(key_list[i])) === "array") {
        var count = 0;
        for (var j = 0; j < condition_data.get(key_list[i]).length; j++) {
          if (condition_data.get(key_list[i])[j] === undefined) {
            if (args[j] === undefined) count++;
          } else if (condition_data.get(key_list[i])[j] === args[j]) {
            count++;
          } else if (condition_data.get(key_list[i])[j].is_data_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++;
          } else if (condition_data.get(key_list[i])[j].is_ignore) {
            count++;
          } else if (condition_data.get(key_list[i])[j].is_num_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++;
          } else if (type_of(condition_data.get(key_list[i])[j]) === "regexp" && condition_data.get(key_list[i])[j].test(args[j])) {
            count++;
          }
        }
        if (count === condition_data.get(key_list[i]).length) {
          key = key_list[i];
          break;
        }
      }
    }
    if (other_args !== undefined) {
      if (key !== null) {
        function_data.get(key)(other_args);
      } else if (key === null && neither_data !== null) {
        neither_data(other_args);
      }
    } else {
      if (key !== null) {
        function_data.get(key)(args);
      } else if (key === null && neither_data !== null) {
        neither_data(args);
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
  var key_data = _immutable2.default.Map({});
  var condition_data = _immutable2.default.Map({});
  var function_data = _immutable2.default.Map({});
  var neither_data = null;
  var add = function add(condition, func) {
    var tempMut = Symbol();
    key_data = key_data.set(tempMut, tempMut);
    condition_data = condition_data.set(tempMut, condition);
    function_data = function_data.set(tempMut, func);
    return obj;
  };
  var neither = function neither(func) {
    neither_data = func;
    return obj;
  };
  var clear = function clear() {
    key_data = _immutable2.default.Map({});
    condition_data = _immutable2.default.Map({});
    function_data = _immutable2.default.Map({});
    neither_data = null;
    return obj;
  };
  var load = function load() {
    for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      rest[_key3] = arguments[_key3];
    }

    rest.map(function (data) {
      var tempMut = Symbol();

      var _data2 = _slicedToArray(data, 2),
          condition = _data2[0],
          func = _data2[1];

      key_data = key_data.set(tempMut, tempMut);
      condition_data = condition_data.set(tempMut, condition);
      function_data = function_data.set(tempMut, func);
      return null;
    });
    return obj;
  };
  var match = function match(args, other_args) {
    var key = null;
    var key_list = [];
    key_data.map(function (data) {
      return key_list.push(data);
    });
    for (var i = 0; i < key_list.length; i++) {
      if (key !== null) {
        break;
      }
      if (type_of(condition_data.get(key_list[i])) === "function") {
        if (condition_data.get(key_list[i])(args) === true) {
          key = key_list[i];
        }
      } else if (type_of(condition_data.get(key_list[i])) === "array") {
        var count = 0;
        for (var j = 0; j < condition_data.get(key_list[i]).length; j++) {
          if (condition_data.get(key_list[i])[j] === undefined) {
            if (args[j] === undefined) count++;
          } else if (condition_data.get(key_list[i])[j] === args[j]) {
            count++;
          } else if (condition_data.get(key_list[i])[j].is_ignore) {
            count++;
          } else if (condition_data.get(key_list[i])[j].is_data_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++;
          } else if (condition_data.get(key_list[i])[j].is_num_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++;
          } else if (type_of(condition_data.get(key_list[i])[j]) === "regexp" && condition_data.get(key_list[i])[j].test(args[j])) {
            count++;
          }
        }
        if (count === condition_data.get(key_list[i]).length) {
          key = key_list[i];
          break;
        }
      }
    }
    if (other_args !== undefined) {
      if (key !== null) {
        function_data.get(key)(other_args);
      } else if (key === null && neither_data !== null) {
        neither_data(other_args);
      }
    } else {
      if (key !== null) {
        function_data.get(key)(args);
      } else if (key === null && neither_data !== null) {
        neither_data(args);
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
var num_set = exports.num_set = function num_set(str) {
  var obj = {
    is_num_set: true
  };
  var mt = null;
  var mte = null;
  var lt = null;
  var lte = null;
  var temp_str = str.replace(/\s+/g, "");
  var temp_array = temp_str.split(",");
  if (/^\[-?\d+,-?\d+\]$/.test(temp_str) || /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(temp_str) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str)) {
    mte = temp_array[0].replace(/[^0-9.-]/ig, "");
    lte = temp_array[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(-?\d+,-?\d+\)$/.test(temp_str) || /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(temp_str) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str)) {
    mt = temp_array[0].replace(/[^0-9.-]/ig, "");
    lt = temp_array[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\[-?\d+,-?\d+\)$/.test(temp_str) || /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(temp_str) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str)) {
    mte = temp_array[0].replace(/[^0-9.-]/ig, "");
    lt = temp_array[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(-?\d+,-?\d+\]$/.test(temp_str) || /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(temp_str) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str)) {
    mt = temp_array[0].replace(/[^0-9.-]/ig, "");
    lte = temp_array[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\[-?\d+,\)$/.test(temp_str) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(temp_str)) {
    mte = temp_array[0].replace(/[^0-9.-]/ig, "");
  } else if (/^\(-?\d+,\)$/.test(temp_str) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(temp_str)) {
    mt = temp_array[0].replace(/[^0-9.-]/ig, "");
  } else if (/^\(,-?\d+\]$/.test(temp_str) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str)) {
    lte = temp_array[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(,-?\d+\)$/.test(temp_str) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str)) {
    lt = temp_array[1].replace(/[^0-9.-]/ig, "");
  } else if (/^\(,\)$/.test(str)) {}
  var play = function play(num) {
    if (type_of(num) !== 'number') {
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
var data_set = exports.data_set = function data_set() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  var obj = {
    is_data_set: true
  };
  var play = function play(str) {
    for (var i = 0; i < args.length; i++) {
      if (str === args[i]) {
        return true;
      }
    }
    return false;
  };
  obj.play = play;
  return obj;
};
var ignore = exports.ignore = {
  is_ignore: true
};
var pmfl = exports.pmfl = {
  make: make,
  m: make,
  make2: make2,
  m2: make2
};
var type = exports.type = {
  of: type_of,
  boolean: "boolean",
  number: "number",
  string: "string",
  function: "function",
  array: "array",
  date: "date",
  regexp: "regexp",
  object: "object",
  error: "error",
  symbol: "symbol",
  null: "null",
  undefined: "undefined"
};
