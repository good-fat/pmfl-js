import Immutable from 'immutable'
const type_of = (obj) => {
  let class2type = {};
  "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e) {
    class2type["[object " + e + "]"] = e.toLowerCase();
  });
  if (obj == null) {
    return String(obj);
  }
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[class2type.toString.call(obj)] || "object"
    : typeof obj;
}

const make = () => {
  let obj = {}
  let key_data = Immutable.Map({})
  let condition_data = Immutable.Map({})
  let function_data = Immutable.Map({})
  let neither_data = null
  const add = (key, condition, func) => {
    key_data = key_data.set(key, key)
    condition_data = condition_data.set(key, condition)
    function_data = function_data.set(key, func)
    return obj
  }
  const neither = (func) => {
    neither_data = func
    return obj
  }
  const remove = (key) => {
    if (key === undefined) {
      neither_data = null
    }
    if (key_data.has(key)) {
      key_data = key_data.delete(key)
      condition_data = condition_data.delete(key)
      function_data = function_data.delete(key)
    }
    return obj
  }
  const clear = () => {
    key_data = Immutable.Map({})
    condition_data = Immutable.Map({})
    function_data = Immutable.Map({})
    neither_data = null
    return obj
  }
  const load = (...rest) => {
    rest.map((data) => {
      let [key, condition, func] = data
      key_data = key_data.set(key, key)
      condition_data = condition_data.set(key, condition)
      function_data = function_data.set(key, func)
      return null
    })
    return obj
  }
  const unload = (...rest) => {
    if (rest.length === 0) {
      neither_data = null
    }
    rest.map((data) => {
      if (key_data.has(data)) {
        key_data = key_data.delete(data)
        condition_data = condition_data.delete(data)
        function_data = function_data.delete(data)
      }
      return null
    })
    return obj
  }
  const match = (args, other_args) => {
    let key = null
    let key_list = []
    key_data.map(data => key_list.push(data))
    for (let i = 0; i < key_list.length; i++) {
      if (key !== null) {
        break
      }
      if (type_of(condition_data.get(key_list[i])) === "function") {
        if (condition_data.get(key_list[i])(args) === true) {
          key = key_list[i]
        }
      } else if (type_of(condition_data.get(key_list[i])) === "array") {
        let count = 0
        for (let j = 0; j < condition_data.get(key_list[i]).length; j++) {
          if (condition_data.get(key_list[i])[j] === undefined) {
            if (args[j] === undefined)
              count++
          } else if (condition_data.get(key_list[i])[j] === args[j]) {
            count++
          } else if (condition_data.get(key_list[i])[j].is_data_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++
          } else if (condition_data.get(key_list[i])[j].is_ignore) {
            count++
          } else if (condition_data.get(key_list[i])[j].is_num_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++
          } else if (type_of(condition_data.get(key_list[i])[j]) === "regexp" && condition_data.get(key_list[i])[j].test(args[j])) {
            count++
          }
        }
        if (count === condition_data.get(key_list[i]).length) {
          key = key_list[i]
          break
        }
      }
    }
    if (other_args !== undefined) {
      if (key !== null) {
        function_data.get(key)(other_args)
      } else if (key === null && neither_data !== null) {
        neither_data(other_args)
      }
    }
    else {
      if (key !== null) {
        function_data.get(key)(args)
      } else if (key === null && neither_data !== null) {
        neither_data(args)
      }
    }

    return obj
  }
  obj.add = add
  obj.neither = neither
  obj.remove = remove
  obj.clear = clear
  obj.load = load
  obj.unload = unload
  obj.match = match
  obj.a = add
  obj.n = neither
  obj.r = remove
  obj.c = clear
  obj.l = load
  obj.u = unload
  obj.m = match
  return obj
}
const make2 = () => {
  let obj = {}
  let key_data = Immutable.Map({})
  let condition_data = Immutable.Map({})
  let function_data = Immutable.Map({})
  let neither_data = null
  const add = (condition, func) => {
    let tempMut = Symbol()
    key_data = key_data.set(tempMut, tempMut)
    condition_data = condition_data.set(tempMut, condition)
    function_data = function_data.set(tempMut, func)
    return obj
  }
  const neither = (func) => {
    neither_data = func
    return obj
  }
  const clear = () => {
    key_data = Immutable.Map({})
    condition_data = Immutable.Map({})
    function_data = Immutable.Map({})
    neither_data = null
    return obj
  }
  const load = (...rest) => {
    rest.map((data) => {
      let tempMut = Symbol()
      let [condition, func] = data
      key_data = key_data.set(tempMut, tempMut)
      condition_data = condition_data.set(tempMut, condition)
      function_data = function_data.set(tempMut, func)
      return null
    })
    return obj
  }
  const match = (args, other_args) => {
    let key = null
    let key_list = []
    key_data.map(data => key_list.push(data))
    for (let i = 0; i < key_list.length; i++) {
      if (key !== null) {
        break
      }
      if (type_of(condition_data.get(key_list[i])) === "function") {
        if (condition_data.get(key_list[i])(args) === true) {
          key = key_list[i]
        }
      } else if (type_of(condition_data.get(key_list[i])) === "array") {
        let count = 0
        for (let j = 0; j < condition_data.get(key_list[i]).length; j++) {
          if (condition_data.get(key_list[i])[j] === undefined) {
            if (args[j] === undefined)
              count++
          } else if (condition_data.get(key_list[i])[j] === args[j]) {
            count++
          } else if (condition_data.get(key_list[i])[j].is_ignore) {
            count++
          } else if (condition_data.get(key_list[i])[j].is_data_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++
          } else if (condition_data.get(key_list[i])[j].is_num_set && condition_data.get(key_list[i])[j].play(args[j])) {
            count++
          } else if (type_of(condition_data.get(key_list[i])[j]) === "regexp" && condition_data.get(key_list[i])[j].test(args[j])) {
            count++
          }
        }
        if (count === condition_data.get(key_list[i]).length) {
          key = key_list[i]
          break
        }
      }
    }
    if (other_args !== undefined) {
      if (key !== null) {
        function_data.get(key)(other_args)
      } else if (key === null && neither_data !== null) {
        neither_data(other_args)
      }
    }
    else {
      if (key !== null) {
        function_data.get(key)(args)
      } else if (key === null && neither_data !== null) {
        neither_data(args)
      }
    }
    return obj
  }
  obj.add = add
  obj.neither = neither
  obj.clear = clear
  obj.load = load
  obj.match = match
  obj.a = add
  obj.n = neither
  obj.c = clear
  obj.l = load
  obj.m = match
  return obj
}
export const num_set = (str) => {
  let obj = {
    is_num_set: true
  }
  let mt = null
  let mte = null
  let lt = null
  let lte = null
  let temp_str = str.replace(/\s+/g, "");
  let temp_array = temp_str.split(",")
  if (/^\[-?\d+,-?\d+\]$/.test(temp_str) ||
    /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(temp_str) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str)) {
    mte = temp_array[0].replace(/[^0-9.-]/ig, "")
    lte = temp_array[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(-?\d+,-?\d+\)$/.test(temp_str) ||
    /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(temp_str) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str)) {
    mt = temp_array[0].replace(/[^0-9.-]/ig, "")
    lt = temp_array[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\[-?\d+,-?\d+\)$/.test(temp_str) ||
    /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(temp_str) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str)) {
    mte = temp_array[0].replace(/[^0-9.-]/ig, "")
    lt = temp_array[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(-?\d+,-?\d+\]$/.test(temp_str) ||
    /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(temp_str) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str)) {
    mt = temp_array[0].replace(/[^0-9.-]/ig, "")
    lte = temp_array[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\[-?\d+,\)$/.test(temp_str) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(temp_str)) {
    mte = temp_array[0].replace(/[^0-9.-]/ig, "")
  } else if (/^\(-?\d+,\)$/.test(temp_str) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(temp_str)) {
    mt = temp_array[0].replace(/[^0-9.-]/ig, "")
  } else if (/^\(,-?\d+\]$/.test(temp_str) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(temp_str)) {
    lte = temp_array[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(,-?\d+\)$/.test(temp_str) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(temp_str)) {
    lt = temp_array[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(,\)$/.test(str)) {
  }
  const play = (num) => {
    if (type_of(num) !== 'number') {
      return false
    }
    let count = -4
    if (mt === null) {
      count++
    } else {
      if (num > mt) {
        count++
      }
    }
    if (mte === null) {
      count++
    } else {
      if (num >= mte) {
        count++
      }
    }
    if (lt === null) {
      count++
    } else {
      if (num < lt) {
        count++
      }
    }
    if (lte === null) {
      count++
    } else {
      if (num <= lte) {
        count++
      }
    }
    if (count) {
      return false
    } else {
      return true
    }
  }
  obj.play = play
  return obj
}
export const data_set = (...args) => {
  let obj = {
    is_data_set: true
  }
  const play = (str) => {
    for (let i = 0; i < args.length; i++) {
      if (str === args[i]) {
        return true
      }
    }
    return false
  }
  obj.play = play
  return obj
}
export const ignore = {
  is_ignore: true
}
export const pmfl = {
  make: make
  , m: make
  , make2: make2
  , m2: make2
}
export const type = {
  of: type_of
  , boolean: "boolean"
  , number: "number"
  , string: "string"
  , function: "function"
  , array: "array"
  , date: "date"
  , regexp: "regexp"
  , object: "object"
  , error: "error"
  , symbol: "symbol"
  , null: "null"
  , undefined: "undefined"
}
