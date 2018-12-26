# pmfl for Javascript
# 用于Javascript语言的模式匹配函数库
- A pattern matching function library instead of if and else for Javascript.
- 一种用于代替if和else的Javascript专用的模式匹配函数库
## 为什么要使用pmfl？
- if/else是C语言时代留下的产物，是过程式的；
- if/else最大的问题是不够灵活，且无法复用，而pmfl可以解决这一问题，下面是一种常见情况的例子：
```javascript
//原始javascript代码，有两个需求
//需求1
let a = Math.random()
if(a >= 0 && a < 0.5){
  console.log("小于0.5")
}
else{
  console.log("大于等于0.5")
}
//需求2
let b = Math.random()
if(b >= 0 && b < 0.5){
  console.log("小于0.5")
}
else if(b >= 0.5 && b < 0.8){
  console.log("介于0.5和0.8之间")
}
else{
  console.log("大于等于0.8")
}
//完成这两个需求需要如上代码，其实两段代码有很多重复的地方，但由于if/else的问题无法复用，造成代码冗余
```
- pmfl代码是函数式的，是链式调用的，方便条件的自由组合与拆分，可以让代码更灵活
- 用pmfl就可以解决以上的问题，下面展示能达到相同效果的pmfl的代码：
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make2().add([numSet("[0,0.5)")], (data)=>{console.log("小于0.5")})
.neither((data)=>{console.log("大于等于0.5")})
.match([Math.random()])
.add([numSet("[0.5,0.8)")], (data)=>{console.log("介于0.5和0.8之间")})
.neither((data)=>{console.log("大于等于0.8")})
.match([Math.random()])
//感觉眼花缭乱？没关系，我们马上就开始了解pmfl的api吧
```
## pmfl的API解析
#### pmfl
##### - 类型：对象
##### - 包含：
- make函数：用于创造一个命名的pmfl子对象，用make函数创造的对象拥有add、neither、remove、clear、load、unload、match函数
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make()
```
- make2函数：用于创造一个无命名的pmfl子对象，用make2函数创造的对象拥有add、neither、clear、load、match函数
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make2()
```
- add函数：在make和make2函数之后使用，用于添加条件，make子对象之后的add函数按顺序接收字符串（条件名）、数组或函数（条件）、函数（满足条件后执行）三个参数，make2子对象之后的add函数按顺序接收数组或函数（条件）、函数（满足条件后执行）两个参数
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
//make函数后的add
pmfl.make().add("one",["abc"],(data)=>{console.log(data[0])})
//make2函数后的add
pmfl.make2().add(["abc"],(data)=>{console.log(data[0])})
```
- neither函数：在make和make2函数之后使用，用于添加所有条件都不匹配的情况执行的函数
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().add("one",["abc"],(data)=>{console.log(data[0])})
.neither((data)=>{console.log(data[0])})
pmfl.make2().add(["abc"],(data)=>{console.log(data[0])})
.neither((data)=>{console.log(data[0])})
```
- remove函数：在make后使用，移除之前添加的条件，如果参数为空，代表移除neither条件
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().add("one",["abc"],(data)=>{console.log(data[0])})
.neither((data)=>{console.log(data[0])})
.remove("one")
```
- clear函数：在make和make2函数后使用，移除所有条件（包括neither）
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().add("one",["abc"],(data)=>{console.log(data[0])})
.neither((data)=>{console.log(data[0])}).clear() //前面添加的条件已全部被移除
pmfl.make2().add(["abc"],(data)=>{console.log(data[0])})
.neither((data)=>{console.log(data[0])}).clear()  //前面添加的条件已全部被移除
```
- load函数：在make和make2函数后使用，用于批量添加条件，函数参数格式见示例代码
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().load(
  ["one",["abc"],(data)=>{console.log(data[0])}],
  ["two",["def"],(data)=>{console.log(data[0])}]
)
pmfl.make2().load(
  [["abc"],(data)=>{console.log(data[0])}],
  [["def"],(data)=>{console.log(data[0])}]
)
```
- unload函数：在make函数之后使用，用于批量移除条件，可移除load和add函数添加的条件，参数为空代表移除neither条件
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().load(
  ["one",["abc"],(data)=>{console.log(data[0])}],
  ["two",["def"],(data)=>{console.log(data[0])}]
).unload("one","two")
```
- match函数：在make和make2函数后使用，用于匹配条件，匹配条件成功后会执行条件自带的函数，如果全部条件都不配不上会执行neither自带的函数
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().add("one",["abc"],(data)=>{console.log(data[0])})
.neither((data)=>{console.log(data[0])}).match(["abc"]) //执行one条件，输出abc
pmfl.make2().add(["abc"],(data)=>{console.log(data[0])})
.neither((data)=>{console.log(data[0])}).match(["def"])  //执行neither，输出def
```
#### numSet
##### - 类型：函数
##### - 介绍：numSet函数用于数学上的区间匹配，共有以下9种匹配模型
1. 闭区间： [1,2]  1<=n<=2
2. 开区间： (1,2)  1<n<2
3. 左闭右开区间： [1,2)  1<=n<2
4. 左开右闭区间： (1,2]  1<n<=2
5. 左闭区间： [1,)  1<=n
6. 左开区间： (1,)  1<n
7. 右闭区间： (,2]  n<=2
8. 右开区间： (,2)  n<2
9. 无界区间： (,)  无穷，可以匹配任意对象
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().add("one",[numSet("[1,2]")],()=>{console.log("匹配one")})
.neither(()=>{console.log("匹配neither")})
.match([1.5]) // 输出"匹配one"
.match([2])  // 输出"匹配one"
.match([10])  // 输出"匹配neither"
```
#### ignore
##### - 类型：对象
##### - 介绍：忽略匹配条件
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().add("one",[ignore,20],()=>{console.log("匹配one")})
.neither(()=>{console.log("匹配neither")})
.match([1.5,20]) // 输出"匹配one"
.match([2,10])  // 输出"匹配neither"
.match([10,20,30])  // 输出"匹配one"
```
#### type
##### - 类型：对象
##### - 介绍：用于匹配特定类型的对象，包含如下类型：
- boolean: "boolean"
- number: "number"
- string: "string"
- function: "function"
- array: "array"
- date: "date"
- regexp: "regexp"
- object: "object"
- error: "error"
- of: 用于解析变量类型的函数
```javascript
import { pmfl , numSet, ignore, type} from 'pmfl'
pmfl.make().add("one",[type.number],()=>{console.log("匹配one")})
.add("two",[type.string],()=>{console.log("匹配two")})
.neither(()=>{console.log("匹配neither")})
.match([type.of(1)]) // 输出"匹配one"
.match([type.of("22")])  // 输出"匹配two"
.match([type.of(1023.32)])  // 输出"匹配one"
```
## 许可证：MIT
