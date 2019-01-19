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
- ignore.is_ignore: Boolean
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
### pmfl_object
##### `pmfl`的实例对象之一，是`pmfl.make()`函数的返回值。
#### 包含
- pmfl_object.add(key, condition, func)
- pmfl_object.neither(func)
- pmfl_object.remove(key)
- pmfl_object.clear()
- pmfl_object.load(...rest)
- pmfl_object.unload(...rest)
- pmfl_object.match(args, other_args)
---
### pmfl_object2
##### 'pmfl'的另一个实例对象，是`pmfl.make2()`函数的返回值，与`pmfl_object`不同的是，此对象的匹配数据无法被移除。
#### 包含
- pmfl_object2.add(condition, func)
- pmfl_object2.neither(func)
- pmfl_object2.clear()
- pmfl_object2.load(...rest)
- pmfl_object2.match(args,other_args)
---
## 方法
### pmfl.make()
##### 调用此函数返回`pmfl`的实例对象`pmfl_object`。
#### 返回值：pmfl_object
---
### pmfl.m()
##### `pmfl.make()`的简写。
#### 返回值：pmfl_object
---
### pmfl.make2()
##### 调用此函数返回`pmfl`的实例对象`pmfl_object2`。
#### 返回值：pmfl_object2
---
### pmfl.m2()
##### `pmfl.make2()`的简写。
#### 返回值：pmfl_object2
---
### pmfl_object.add(key, condition, func)
##### 为`pmfl_object`对象添加匹配名称、条件、回调函数。简写为`pmfl_object.a(key, condition, func)`。
#### 参数
- `key: String` 需要匹配数据的名称。
- `condition: Array/Function` 匹配数据的条件。
- `func: Function` 匹配数据成功时执行的回调函数。
#### 返回值：pmfl_object
---
### pmfl_object.neither(func)
##### 当所有条件都无法匹配时，所执行的选项。简写为`pmfl_object.n(func)`。
#### 参数
- `func: Function` 所有条件都不匹配时执行的回调函数。
#### 返回值：pmfl_object
---
### pmfl_object.remove(key)
##### 移除`pmfl_object`对象中已经添加的匹配数据。简写为`pmfl_object.r(key)`。
#### 参数
- `key: String` 需要移除的匹配数据名称，当`key`不存在时，移除`neither`数据。
#### 返回值：pmfl_object
---
### pmfl_object.clear()
##### 移除全部匹配数据，包括`neither`数据。简写为`pmfl_object.c()`。
#### 返回值：pmfl_object
---
### pmfl_object.load(...rest)
##### 批量为`pmfl_object`对象添加匹配名称、条件、回调函数。简写为`pmfl_object.l(...rest)`。
#### 参数
- `rest: Array<Array>` 每个元素都是数组的数组。每个元素的1、2、3号数据分别是为`pmfl_object`对象添加的匹配名称、条件、回调函数。
#### 返回值：pmfl_object
---
### pmfl_object.unload(...rest)
##### 批量移除`pmfl_object`对象中已经添加的匹配数据。简写为`pmfl_object.u(...rest)`。
#### 参数
- `rest: Array<String>` 数组每个元素都是字符串，是要移除的匹配数据的名称。数组长度为0时，表示移除`neither`数据。
#### 返回值：pmfl_object
---
### pmfl_object.match(args, other_args)
##### 执行匹配。简写为`pmfl_object.m(args, other_args)`。
#### 参数
- `args: Array` 需要匹配的真实数据，对应`pmfl_object.add(key, condition, func)`函数的`condition`参数。
- `other_args: Any` 需要传入匹配的回调函数的数据，如果此参数不存在，则`args`作为参数传入匹配的回调函数。
#### 返回值：pmfl_object
---
#### `pmfl_object`使用的例子
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
##### 为`pmfl_object2`对象添加匹配条件、回调函数。简写为`pmfl_object2.a(condition, func)`。
#### 参数
- `condition: Array/Function` 匹配数据的条件。
- `func: Function` 匹配成功后执行的回调函数。
#### 返回值：pmfl_object2
---
### pmfl_object2.neither(func)
##### 当所有条件都无法匹配时，所执行的选项。简写为`pmfl_object2.n(func)`。
#### 参数
- `func: Function` 所有条件都不匹配时执行的回调函数。
#### 返回值：pmfl_object2
---
### pmfl_object2.clear()
##### 移除全部匹配数据，包括`neither`数据。简写为`pmfl_object2.c()`。
#### 返回值：pmfl_object2
---
### pmfl_object2.load(...rest)
##### 批量为`pmfl_object2`对象添加匹配条件、回调函数。简写为`pmfl_object2.l(...rest)`。
#### 参数
- `rest: Array<Array>` 每个元素都是数组的数组。每个元素的1、2号数据分别是为`pmfl_object2`对象添加的匹配条件、回调函数。
#### 返回值：pmfl_object2
---
### pmfl_object2.match(args,other_args)
##### 执行匹配。简写为`pmfl_object2.m(args,other_args)`。
#### 参数
- `args: Array` 需要匹配的真实数据，对应`pmfl_object2.add(condition, func)`函数的`condition`参数。
- `other_args: Any` 需要传入匹配的回调函数的数据，如果此参数不存在，则`args`作为参数传入匹配的回调函数。
#### 返回值：pmfl_object2
---
#### `pmfl_object2`使用的例子
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
#### `num_set(str)`使用的例子
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
##### 用于匹配多个数据中的一个。
#### 参数
- `args: Array<Any>` 需要匹配的数据集。
---
#### `data_set(...args)`使用的例子
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
# 许可证：MIT
