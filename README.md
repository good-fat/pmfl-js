# pmfl
### [中文文档](/README_CN.md)
A `Javascript`-specific pattern matching function library for implementing the `if` and `else` functions.
## `pmfl` means `pattern matching function library`
- Implement the `if/else` function with a functional pattern matching API.
- Freely increase or decrease conditions, the code is more flexible.
- Not a substitute, but a supplement.
- Multiple complementary APIs for more powerful pattern matching.
- Depend on `Immutable.js`.
# Sample program
```javascript
import { pmfl } from 'pmfl'
pmfl.make().add("one",[1],(data)=>{console.log("it is one")})
.add("two",[2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.match([2])
//log "it is two"
```
---
# installation
It is recommended to use yarn for installation.
```
yarn add pmfl
```
or
```
npm i pmfl --save
```
---
# API
---
## Object
### pmfl
##### The object used to create the `pmfl` instance.
#### contain
- pmfl.make()
- pmfl.make2()
- pmfl.m()
- pmfl.m2()
---
### ignore
##### An object that can match any value.
#### contain
- ignore.isIgnore: Boolean
#### example
```javascript
import { pmfl, ignore } from 'pmfl'
pmfl.make().add("one",[ignore],(data)=>{console.log("it is ignore")})
.add("two",[2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.match([100])
//log "it is ignore"
```
---
### type
##### The object used for type matching.
#### contain
- type.boolean: String
- type.number: String
- type.string: String
- type.function: String
- type.array: String
- type.date: String
- type.regexp: String
- type.object: String
- type.error: String
- type.symbol: String
- type.null: String
- type.undefined: String
- type.of(data)
#### example
```javascript
import { pmfl, type } from 'pmfl'
pmfl.make().add("string",[type.string],(data)=>{console.log("it is string")})
.add("array",[type.array],(data)=>{console.log("it is array")})
.neither((data)=>{"it is neither"})
.match([type.of("str")])
//log "it is string"
```
---
### pmflObject
##### One of the instance objects of `pmfl` is the return value of the `pmfl.make()` function.
#### contain
- pmflObject.add(key, condition, func)
- pmflObject.neither(func)
- pmflObject.remove(key)
- pmflObject.clear()
- pmflObject.load(...rest)
- pmflObject.unload(...rest)
- pmflObject.match(args, otherArgs)
---
### pmflObject2
##### Another instance of 'pmfl' is the return value of the `pmfl.make2()` function. Unlike `pmflObject`, the matching data for this object cannot be removed.
#### contain
- pmflObject2.add(condition, func)
- pmflObject2.neither(func)
- pmflObject2.clear()
- pmflObject2.load(...rest)
- pmflObject2.match(args,otherArgs)
---
## method
### pmfl.make()
##### Call this function to return the instance object `pmflObject` of `pmfl`.
#### return：pmflObject
---
### pmfl.m()
##### Short for `pmfl.make()`.
#### return：pmflObject
---
### pmfl.make2()
##### Call this function to return the instance object `pmflObject2` of `pmfl`.
#### return：pmflObject2
---
### pmfl.m2()
##### Short for `pmfl.make2()`.
#### return：pmflObject2
---
### pmflObject.add(key, condition, func)
##### Add matching names, conditions, and callback functions to the `pmflObject` object. Abbreviated as `pmflObject.a(key, condition, func)`.
#### parameter
- `key: String` The name of the data to match.
- `condition: Array/Function` The conditions for matching data.
- `func: Function` A callback function that is executed when the matching data succeeds.
#### return：pmflObject
---
### pmflObject.neither(func)
##### The option that is executed when all conditions fail to match. Abbreviated as `pmflObject.n(func)`.
#### parameter
- `func: Function` A callback function that is executed when all conditions do not match.
#### return：pmflObject
---
### pmflObject.remove(key)
##### Remove the matching data that has been added to the `pmflObject` object. Abbreviated as `pmflObject.r(key)`.
#### parameter
- `key: String` The name of the matching data that needs to be removed. When `key` does not exist, remove the `neither` data.
#### return：pmflObject
---
### pmflObject.clear()
##### Remove all matching data, including `neither` data. Abbreviated as `pmflObject.c()`.
#### return：pmflObject
---
### pmflObject.load(...rest)
##### Add matching names, conditions, and callback functions to the `pmflObject` object in bulk. Abbreviated as `pmflObject.l(...rest)`.
#### parameter
- `rest: Array<Array>` Each element is an array of arrays. The data of 1, 2, and 3 of each element is the matching name, condition, and callback function added for the `pmflObject` object.
#### return：pmflObject
---
### pmflObject.unload(...rest)
##### The matching data that has been added in the `pmflObject` object is removed in batches. Abbreviated as `pmflObject.u(...rest)`.
#### parameter
- `rest: Array<String>` Each element of the array is a string and is the name of the matching data to be removed. When the length of the array is 0, it means that the `neither` data is removed.
#### return：pmflObject
---
### pmflObject.match(args, otherArgs)
##### Perform a match. Abbreviated as `pmflObject.m(args, otherArgs)`.
#### parameter
- `args: Array` The actual data that needs to be matched corresponds to the `condition` parameter of the `pmflObject.add(key, condition, func)` function.
- `otherArgs: Any` The data of the matching callback function needs to be passed in. If this parameter does not exist, `args` is passed as a parameter to the matching callback function.
#### return：pmflObject
---
#### Example of using `pmflObject`
```javascript
import { pmfl } from 'pmfl'
pmfl.make().add("one",[1],(data)=>{console.log("it is one")})
.add("two",[2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.match([2])
//log "it is two"
pmfl.make().add("one",[1],(data)=>{console.log("it is one")})
.add("two",[2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.remove("two")
.match([2])
//log "it is neither"
pmfl.make().add("one",[1],(data)=>{console.log("it is one")})
.add("two",[2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.clear()
.match([2])
//no log
pmfl.make().load(
  ["one",[1],(data)=>{console.log("it is one")}],
  ["two",[2],(data)=>{console.log("it is two")}]
).neither((data)=>{"it is neither"})
.match([2])
//log "it is two"
pmfl.make().load(
  ["one",[1],(data)=>{console.log("it is one")}],
  ["two",[2],(data)=>{console.log("it is two")}]
).neither((data)=>{"it is neither"})
.unload("one","two")
.match([2])
//log "it is neither"
pmfl.make().add("one",(data)=>{return data[0]===1},(data)=>{console.log("it is one")})
.add("two",[2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.match([1])
//log "it is one"
```
---
### pmflObject2.add(condition, func)
##### Add matching conditions and callback functions to the `pmflObject2` object. Abbreviated as `pmflObject2.a(condition, func)`.
#### parameter
- `condition: Array/Function` The conditions for matching data.
- `func: Function` The callback function executed after the match is successful.
#### return：pmflObject2
---
### pmflObject2.neither(func)
##### The option that is executed when all conditions fail to match. Abbreviated as `pmflObject2.n(func)`.
#### parameter
- `func: Function` A callback function that is executed when all conditions do not match.
#### return：pmflObject2
---
### pmflObject2.clear()
##### Remove all matching data, including `neither` data. Abbreviated as `pmflObject2.c()`.
#### return：pmflObject2
---
### pmflObject2.load(...rest)
##### Add matching conditions and callback functions to the `pmflObject2` object in batches. Abbreviated as `pmflObject2.l(...rest)`.
#### parameter
- `rest: Array<Array>` Each element is an array of arrays. The data of No. 1 and No. 2 of each element are the matching conditions and callback functions added for the `pmflObject2` object.
#### return：pmflObject2
---
### pmflObject2.match(args,otherArgs)
##### Perform a match. Abbreviated as `pmflObject2.m(args, otherArgs)`.
#### parameter
- `args: Array` The actual data that needs to be matched corresponds to the `condition` parameter of the `pmflObject2.add(condition, func)` function.
- `otherArgs: Any` The data of the matching callback function needs to be passed in. If this parameter does not exist, `args` is passed as a parameter to the matching callback function.
#### return：pmflObject2
---
#### Example of using `pmflObject2`
```javascript
import { pmfl } from 'pmfl'
pmfl.make2().add([1],(data)=>{console.log("it is one")})
.add([2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.match([2])
//log "it is two"
pmfl.make2().add([1],(data)=>{console.log("it is one")})
.add([2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.clear()
.match([2])
//no log
pmfl.make2().load(
  [[1],(data)=>{console.log("it is one")}],
  [[2],(data)=>{console.log("it is two")}]
).neither((data)=>{"it is neither"})
.match([2])
//log "it is two"
pmfl.make2().add((data)=>{return data[0]===1},(data)=>{console.log("it is one")})
.add([2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.match([1])
//log "it is one"
```
---
### numSet(str)
##### Used to match mathematical intervals.
#### parameter
- `str: String` The mathematical interval representation of the `String` type. There are 9 ways to represent:
1. closed interval： [1,2]  1<=n<=2
2. Open interval： (1,2)  1<n<2
3. Left closed right open interval： [1,2)  1<=n<2
4. Left open right closed interval： (1,2]  1<n<=2
5. Left closed interval： [1,)  1<=n
6. Left open interval： (1,)  1<n
7. Right closed interval： (,2]  n<=2
8. Right open interval： (,2)  n<2
9. Unbounded interval： (,)  Infinity, can match any object
---
#### Example used by `numSet(str)`
```javascript
import { pmfl, numSet } from 'pmfl'
pmfl.make2().add([numSet("[1,20]")], (data) => { console.log("it is 1~20") })
  .add([numSet("(-20,-5)")], (data) => { console.log("it is -20~-5") })
  .neither((data) => { console.log("it is neither") })
  .match([2])  //log "it is 1~20"
  .match([-20]) //log "it is neither"
  .match([-10]) //log "it is -20~-5"
```
---
### dataSet(...args)
##### Used to match one of multiple data.
#### parameter
- `args: Array<Any>` A data set that needs to be matched.
---
#### Example used by `dataSet(...args)`
```javascript
import { pmfl, dataSet } from 'pmfl'
pmfl.make2().add([dataSet(1,2,3,4,5)], (data) => { console.log("it is 1-5 numbers") })
  .add([dataSet("1","2")], (data) => { console.log("it is 1 and 2 string") })
  .neither((data) => { console.log("it is neither") })
  .match([2])  //log "it is 1-5 numbers"
  .match(["2"]) //log "it is 1 and 2 string"
  .match([-10]) //log "it is neither"
```
---
# License: MIT
