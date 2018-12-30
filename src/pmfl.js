import Immutable from 'immutable'
//函数typeOf
const typeOf = (obj) => {
  let class2type = {};
  "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, i) {
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
  let keyData = Immutable.Map({})
  let conditionData = Immutable.Map({})
  let functionData = Immutable.Map({})
  let neitherData = null
  const add = (key, condition, func) => {
    keyData = keyData.set(key, key)
    conditionData = conditionData.set(key, condition)
    functionData = functionData.set(key, func)
    return obj
  }
  const neither = (func) => {
    neitherData = func
    return obj
  }
  const remove = (key) => {
    if (key === undefined) {
      neitherData = null
    }
    if (keyData.has(key)) {
      keyData = keyData.delete(key)
      conditionData = conditionData.delete(key)
      functionData = functionData.delete(key)
    }
    return obj
  }
  const clear = () => {
    keyData = Immutable.Map({})
    conditionData = Immutable.Map({})
    functionData = Immutable.Map({})
    neitherData = null
    return obj
  }
  const load = (...rest) => {
    rest.map((data) => {
      let [key, condition, func] = data
      keyData = keyData.set(key, key)
      conditionData = conditionData.set(key, condition)
      functionData = functionData.set(key, func)
      return null
    })
    return obj
  }
  const unload = (...rest) => {
    if (rest.length === 0) {
      neitherData = null
    }
    rest.map((data) => {
      if (keyData.has(data)) {
        keyData = keyData.delete(data)
        conditionData = conditionData.delete(data)
        functionData = functionData.delete(data)
      }
      return null
    })
    return obj
  }
  const match = (args, otherArgs) => {
    let key = null
    let keyList = []
    keyData.map(data => keyList.push(data))
    for (let i = 0; i < keyList.length; i++) {
      if (key !== null) {
        break
      }
      if (typeOf(conditionData.get(keyList[i])) === "function") {
        if (conditionData.get(keyList[i])(args) === true) {
          key = keyList[i]
        }
      } else if (typeOf(conditionData.get(keyList[i])) === "array") {
        let count = 0
        for (let j = 0; j < conditionData.get(keyList[i]).length; j++) {
          if (conditionData.get(keyList[i])[j] === undefined) {
            if (args[j] === undefined)
              count++
          } else if (conditionData.get(keyList[i])[j] === args[j]) {
            count++
          } else if (conditionData.get(keyList[i])[j].isIgnore) {
            count++
          } else if (conditionData.get(keyList[i])[j].isNumSet && conditionData.get(keyList[i])[j].play(args[j])) {
            count++
          } else if (typeOf(conditionData.get(keyList[i])[j]) === "regexp" && conditionData.get(keyList[i])[j].test(args[j])) {
            count++
          }
        }
        if (count === conditionData.get(keyList[i]).length) {
          key = keyList[i]
          break
        }
      }
    }
    if (otherArgs !== undefined) {
      if (key !== null) {
        functionData.get(key)(otherArgs)
      } else if (key === null && neitherData !== null) {
        neitherData(otherArgs)
      }
    }
    else {
      if (key !== null) {
        functionData.get(key)(args)
      } else if (key === null && neitherData !== null) {
        neitherData(args)
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
  let keyData = Immutable.Map({})
  let conditionData = Immutable.Map({})
  let functionData = Immutable.Map({})
  let neitherData = null
  const add = (condition, func) => {
    let tempMut = Symbol()
    keyData = keyData.set(tempMut, tempMut)
    conditionData = conditionData.set(tempMut, condition)
    functionData = functionData.set(tempMut, func)
    return obj
  }
  const neither = (func) => {
    neitherData = func
    return obj
  }
  const clear = () => {
    keyData = Immutable.Map({})
    conditionData = Immutable.Map({})
    functionData = Immutable.Map({})
    neitherData = null
    return obj
  }
  const load = (...rest) => {
    rest.map((data) => {
      let tempMut = Symbol()
      let [condition, func] = data
      keyData = keyData.set(tempMut, tempMut)
      conditionData = conditionData.set(tempMut, condition)
      functionData = functionData.set(tempMut, func)
      return null
    })
    return obj
  }
  const match = (args, otherArgs) => {
    let key = null
    let keyList = []
    keyData.map(data => keyList.push(data))
    for (let i = 0; i < keyList.length; i++) {
      if (key !== null) {
        break
      }
      if (typeOf(conditionData.get(keyList[i])) === "function") {
        if (conditionData.get(keyList[i])(args) === true) {
          key = keyList[i]
        }
      } else if (typeOf(conditionData.get(keyList[i])) === "array") {
        let count = 0
        for (let j = 0; j < conditionData.get(keyList[i]).length; j++) {
          if (conditionData.get(keyList[i])[j] === undefined) {
            if (args[j] === undefined)
              count++
          } else if (conditionData.get(keyList[i])[j] === args[j]) {
            count++
          } else if (conditionData.get(keyList[i])[j].isIgnore) {
            count++
          } else if (conditionData.get(keyList[i])[j].isNumSet && conditionData.get(keyList[i])[j].play(args[j])) {
            count++
          } else if (typeOf(conditionData.get(keyList[i])[j]) === "regexp" && conditionData.get(keyList[i])[j].test(args[j])) {
            count++
          }
        }
        if (count === conditionData.get(keyList[i]).length) {
          key = keyList[i]
          break
        }
      }
    }
    if (otherArgs !== undefined) {
      if (key !== null) {
        functionData.get(key)(otherArgs)
      } else if (key === null && neitherData !== null) {
        neitherData(otherArgs)
      }
    }
    else {
      if (key !== null) {
        functionData.get(key)(args)
      } else if (key === null && neitherData !== null) {
        neitherData(args)
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
export const numSet = (str) => {
  let obj = {
    isNumSet: true
  }
  let mt = null
  let mte = null
  let lt = null
  let lte = null
  let tempStr = str.replace(/\s+/g, "");
  let tempArray = tempStr.split(",")
  if (/^\[-?\d+,-?\d+\]$/.test(tempStr) ||
    /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(tempStr) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr)) {
    mte = tempArray[0].replace(/[^0-9.-]/ig, "")
    lte = tempArray[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(-?\d+,-?\d+\)$/.test(tempStr) ||
    /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(tempStr) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr)) {
    mt = tempArray[0].replace(/[^0-9.-]/ig, "")
    lt = tempArray[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\[-?\d+,-?\d+\)$/.test(tempStr) ||
    /^\[-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\)$/.test(tempStr) ||
    /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr)) {
    mte = tempArray[0].replace(/[^0-9.-]/ig, "")
    lt = tempArray[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(-?\d+,-?\d+\]$/.test(tempStr) ||
    /^\(-?\d+,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?\d+\]$/.test(tempStr) ||
    /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr)) {
    mt = tempArray[0].replace(/[^0-9.-]/ig, "")
    lte = tempArray[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\[-?\d+,\)$/.test(tempStr) || /^\[-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(tempStr)) {
    mte = tempArray[0].replace(/[^0-9.-]/ig, "")
  } else if (/^\(-?\d+,\)$/.test(tempStr) || /^\(-?([1-9]\d*.\d*|0\.\d*[1-9]\d*),\)$/.test(tempStr)) {
    mt = tempArray[0].replace(/[^0-9.-]/ig, "")
  } else if (/^\(,-?\d+\]$/.test(tempStr) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\]$/.test(tempStr)) {
    lte = tempArray[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(,-?\d+\)$/.test(tempStr) || /^\(,-?([1-9]\d*.\d*|0\.\d*[1-9]\d*)\)$/.test(tempStr)) {
    lt = tempArray[1].replace(/[^0-9.-]/ig, "")
  } else if (/^\(,\)$/.test(str)) {
  }
  const play = (num) => {
    if (typeOf(num) !== 'number') {
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
export const ignore = {
  isIgnore: true
}
export const pmfl = {
  make: make
  , m: make
  , make2: make2
  , m2: make2
}
export const type = {
  of: typeOf
  , boolean: "boolean"
  , number: "number"
  , string: "string"
  , function: "function"
  , array: "array"
  , date: "date"
  , regexp: "regexp"
  , object: "object"
  , error: "error"
}
