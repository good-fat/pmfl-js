# pmfl
### [English document](/README.md)
一种用于实现`if`和`else`功能的`Javascript`专用的模式匹配函数库。
## `pmfl`的意思是`pattern matching function library`
- 使用函数式的模式匹配API实现`if/else`功能
- 随意增减条件，代码更灵活
- 并不是替代，而是补充
- 多个补充API，让模式匹配功能更强大
- 依赖`Immutable.js`
# 示例程序
```javascript
import { pmfl } from 'pmfl'
pmfl.make().add("one",[1],(data)=>{console.log("it is one")})
.add("two",[2],(data)=>{console.log("it is two")})
.neither((data)=>{"it is neither"})
.match([2])
//log "it is two"
```
---
# 安装
推荐使用yarn进行安装
```
yarn add pmfl
```
或者
```
npm i pmfl --save
```
---
# API
---
## 对象
### pmfl
##### 用于创建`pmfl`实例的对象。
#### 包含
- pmfl.make()
- pmfl.make2()
- pmfl.m()
- pmfl.m2()
---
### ignore
##### 可以匹配任何值的对象。
#### 包含
- ignore.isIgnore: Boolean
#### 例子
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
##### 用于进行类型匹配的对象。
#### 包含
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
#### 例子
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
##### `pmfl`的实例对象之一，是`pmfl.make()`函数的返回值。
#### 包含
- pmflObject.add(key, condition, func)
- pmflObject.neither(func)
- pmflObject.remove(key)
- pmflObject.clear()
- pmflObject.load(...rest)
- pmflObject.unload(...rest)
- pmflObject.match(args, otherArgs)
---
### pmflObject2
##### 'pmfl'的另一个实例对象，是`pmfl.make2()`函数的返回值，与`pmflObject`不同的是，此对象的匹配数据无法被移除。
#### 包含
- pmflObject2.add(condition, func)
- pmflObject2.neither(func)
- pmflObject2.clear()
- pmflObject2.load(...rest)
- pmflObject2.match(args,otherArgs)
---
## 方法
### pmfl.make()
##### 调用此函数返回`pmfl`的实例对象`pmflObject`。
#### 返回值：pmflObject
---
### pmfl.m()
##### `pmfl.make()`的简写。
#### 返回值：pmflObject
---
### pmfl.make2()
##### 调用此函数返回`pmfl`的实例对象`pmflObject2`。
#### 返回值：pmflObject2
---
### pmfl.m2()
##### `pmfl.make2()`的简写。
#### 返回值：pmflObject2
---
### pmflObject.add(key, condition, func)
##### 为`pmflObject`对象添加匹配名称、条件、回调函数。简写为`pmflObject.a(key, condition, func)`。
#### 参数
- `key: String` 需要匹配数据的名称。
- `condition: Array/Function` 匹配数据的条件。
- `func: Function` 匹配数据成功时执行的回调函数。
#### 返回值：pmflObject
---
### pmflObject.neither(func)
##### 当所有条件都无法匹配时，所执行的选项。简写为`pmflObject.n(func)`。
#### 参数
- `func: Function` 所有条件都不匹配时执行的回调函数。
#### 返回值：pmflObject
---
### pmflObject.remove(key)
##### 移除`pmflObject`对象中已经添加的匹配数据。简写为`pmflObject.r(key)`。
#### 参数
- `key: String` 需要移除的匹配数据名称，当`key`不存在时，移除`neither`数据。
#### 返回值：pmflObject
---
### pmflObject.clear()
##### 移除全部匹配数据，包括`neither`数据。简写为`pmflObject.c()`。
#### 返回值：pmflObject
---
### pmflObject.load(...rest)
##### 批量为`pmflObject`对象添加匹配名称、条件、回调函数。简写为`pmflObject.l(...rest)`。
#### 参数
- `rest: Array<Array>` 每个元素都是数组的数组。每个元素的1、2、3号数据分别是为`pmflObject`对象添加的匹配名称、条件、回调函数。
#### 返回值：pmflObject
---
### pmflObject.unload(...rest)
##### 批量移除`pmflObject`对象中已经添加的匹配数据。简写为`pmflObject.u(...rest)`。
#### 参数
- `rest: Array<String>` 数组每个元素都是字符串，是要移除的匹配数据的名称。数组长度为0时，表示移除`neither`数据。
#### 返回值：pmflObject
---
### pmflObject.match(args, otherArgs)
##### 执行匹配。简写为`pmflObject.m(args, otherArgs)`。
#### 参数
- `args: Array` 需要匹配的真实数据，对应`pmflObject.add(key, condition, func)`函数的`condition`参数。
- `otherArgs: Any` 需要传入匹配的回调函数的数据，如果此参数不存在，则`args`作为参数传入匹配的回调函数。
#### 返回值：pmflObject
---
#### `pmflObject`使用的例子
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
##### 为`pmflObject2`对象添加匹配条件、回调函数。简写为`pmflObject2.a(condition, func)`。
#### 参数
- `condition: Array/Function` 匹配数据的条件。
- `func: Function` 匹配成功后执行的回调函数。
#### 返回值：pmflObject2
---
### pmflObject2.neither(func)
##### 当所有条件都无法匹配时，所执行的选项。简写为`pmflObject2.n(func)`。
#### 参数
- `func: Function` 所有条件都不匹配时执行的回调函数。
#### 返回值：pmflObject2
---
### pmflObject2.clear()
##### 移除全部匹配数据，包括`neither`数据。简写为`pmflObject2.c()`。
#### 返回值：pmflObject2
---
### pmflObject2.load(...rest)
##### 批量为`pmflObject2`对象添加匹配条件、回调函数。简写为`pmflObject2.l(...rest)`。
#### 参数
- `rest: Array<Array>` 每个元素都是数组的数组。每个元素的1、2号数据分别是为`pmflObject2`对象添加的匹配条件、回调函数。
#### 返回值：pmflObject2
---
### pmflObject2.match(args,otherArgs)
##### 执行匹配。简写为`pmflObject2.m(args,otherArgs)`。
#### 参数
- `args: Array` 需要匹配的真实数据，对应`pmflObject2.add(condition, func)`函数的`condition`参数。
- `otherArgs: Any` 需要传入匹配的回调函数的数据，如果此参数不存在，则`args`作为参数传入匹配的回调函数。
#### 返回值：pmflObject2
---
#### `pmflObject2`使用的例子
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
##### 用于匹配数学区间。
#### 参数
- `str: String` `String`类型的数学区间表示。共有9种表示方法：
1. 闭区间： [1,2]  1<=n<=2
2. 开区间： (1,2)  1<n<2
3. 左闭右开区间： [1,2)  1<=n<2
4. 左开右闭区间： (1,2]  1<n<=2
5. 左闭区间： [1,)  1<=n
6. 左开区间： (1,)  1<n
7. 右闭区间： (,2]  n<=2
8. 右开区间： (,2)  n<2
9. 无界区间： (,)  无穷，可以匹配任意对象
---
#### `numSet(str)`使用的例子
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
##### 用于匹配多个数据中的一个。
#### 参数
- `args: Array<Any>` 需要匹配的数据集。
---
#### `dataSet(...args)`使用的例子
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
# 许可证：MIT
