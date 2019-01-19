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
- ignore.is_ignore: Boolean
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
### pmfl_object
##### One of the instance objects of `pmfl` is the return value of the `pmfl.make()` function.
#### contain
- pmfl_object.add(key, condition, func)
- pmfl_object.neither(func)
- pmfl_object.remove(key)
- pmfl_object.clear()
- pmfl_object.load(...rest)
- pmfl_object.unload(...rest)
- pmfl_object.match(args, other_args)
---
### pmfl_object2
##### Another instance of 'pmfl' is the return value of the `pmfl.make2()` function. Unlike `pmfl_object`, the matching data for this object cannot be removed.
#### contain
- pmfl_object2.add(condition, func)
- pmfl_object2.neither(func)
- pmfl_object2.clear()
- pmfl_object2.load(...rest)
- pmfl_object2.match(args,other_args)
---
## method
### pmfl.make()
##### Call this function to return the instance object `pmfl_object` of `pmfl`.
#### return：pmfl_object
---
### pmfl.m()
##### Short for `pmfl.make()`.
#### return：pmfl_object
---
### pmfl.make2()
##### Call this function to return the instance object `pmfl_object2` of `pmfl`.
#### return：pmfl_object2
---
### pmfl.m2()
##### Short for `pmfl.make2()`.
#### return：pmfl_object2
---
### pmfl_object.add(key, condition, func)
##### Add matching names, conditions, and callback functions to the `pmfl_object` object. Abbreviated as `pmfl_object.a(key, condition, func)`.
#### parameter
- `key: String` The name of the data to match.
- `condition: Array/Function` The conditions for matching data.
- `func: Function` A callback function that is executed when the matching data succeeds.
#### return：pmfl_object
---
### pmfl_object.neither(func)
##### The option that is executed when all conditions fail to match. Abbreviated as `pmfl_object.n(func)`.
#### parameter
- `func: Function` A callback function that is executed when all conditions do not match.
#### return：pmfl_object
---
### pmfl_object.remove(key)
##### Remove the matching data that has been added to the `pmfl_object` object. Abbreviated as `pmfl_object.r(key)`.
#### parameter
- `key: String` The name of the matching data that needs to be removed. When `key` does not exist, remove the `neither` data.
#### return：pmfl_object
---
### pmfl_object.clear()
##### Remove all matching data, including `neither` data. Abbreviated as `pmfl_object.c()`.
#### return：pmfl_object
---
### pmfl_object.load(...rest)
##### Add matching names, conditions, and callback functions to the `pmfl_object` object in bulk. Abbreviated as `pmfl_object.l(...rest)`.
#### parameter
- `rest: Array<Array>` Each element is an array of arrays. The data of 1, 2, and 3 of each element is the matching name, condition, and callback function added for the `pmfl_object` object.
#### return：pmfl_object
---
### pmfl_object.unload(...rest)
##### The matching data that has been added in the `pmfl_object` object is removed in batches. Abbreviated as `pmfl_object.u(...rest)`.
#### parameter
- `rest: Array<String>` Each element of the array is a string and is the name of the matching data to be removed. When the length of the array is 0, it means that the `neither` data is removed.
#### return：pmfl_object
---
### pmfl_object.match(args, other_args)
##### Perform a match. Abbreviated as `pmfl_object.m(args, other_args)`.
#### parameter
- `args: Array` The actual data that needs to be matched corresponds to the `condition` parameter of the `pmfl_object.add(key, condition, func)` function.
- `other_args: Any` The data of the matching callback function needs to be passed in. If this parameter does not exist, `args` is passed as a parameter to the matching callback function.
#### return：pmfl_object
---
#### Example of using `pmfl_object`
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
### pmfl_object2.add(condition, func)
##### Add matching conditions and callback functions to the `pmfl_object2` object. Abbreviated as `pmfl_object2.a(condition, func)`.
#### parameter
- `condition: Array/Function` The conditions for matching data.
- `func: Function` The callback function executed after the match is successful.
#### return：pmfl_object2
---
### pmfl_object2.neither(func)
##### The option that is executed when all conditions fail to match. Abbreviated as `pmfl_object2.n(func)`.
#### parameter
- `func: Function` A callback function that is executed when all conditions do not match.
#### return：pmfl_object2
---
### pmfl_object2.clear()
##### Remove all matching data, including `neither` data. Abbreviated as `pmfl_object2.c()`.
#### return：pmfl_object2
---
### pmfl_object2.load(...rest)
##### Add matching conditions and callback functions to the `pmfl_object2` object in batches. Abbreviated as `pmfl_object2.l(...rest)`.
#### parameter
- `rest: Array<Array>` Each element is an array of arrays. The data of No. 1 and No. 2 of each element are the matching conditions and callback functions added for the `pmfl_object2` object.
#### return：pmfl_object2
---
### pmfl_object2.match(args,other_args)
##### Perform a match. Abbreviated as `pmfl_object2.m(args, other_args)`.
#### parameter
- `args: Array` The actual data that needs to be matched corresponds to the `condition` parameter of the `pmfl_object2.add(condition, func)` function.
- `other_args: Any` The data of the matching callback function needs to be passed in. If this parameter does not exist, `args` is passed as a parameter to the matching callback function.
#### return：pmfl_object2
---
#### Example of using `pmfl_object2`
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
### num_set(str)
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
#### Example used by `num_set(str)`
```javascript
import { pmfl, num_set } from 'pmfl'
pmfl.make2().add([num_set("[1,20]")], (data) => { console.log("it is 1~20") })
  .add([num_set("(-20,-5)")], (data) => { console.log("it is -20~-5") })
  .neither((data) => { console.log("it is neither") })
  .match([2])  //log "it is 1~20"
  .match([-20]) //log "it is neither"
  .match([-10]) //log "it is -20~-5"
```
---
### data_set(...args)
##### Used to match one of multiple data.
#### parameter
- `args: Array<Any>` A data set that needs to be matched.
---
#### Example used by `data_set(...args)`
```javascript
import { pmfl, data_set } from 'pmfl'
pmfl.make2().add([data_set(1,2,3,4,5)], (data) => { console.log("it is 1-5 numbers") })
  .add([data_set("1","2")], (data) => { console.log("it is 1 and 2 string") })
  .neither((data) => { console.log("it is neither") })
  .match([2])  //log "it is 1-5 numbers"
  .match(["2"]) //log "it is 1 and 2 string"
  .match([-10]) //log "it is neither"
```
---
# License: MIT
