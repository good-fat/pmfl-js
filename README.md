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
- 用pmfl就可以解决以上的问题，下面展示能达到相同效果的pmfl的代码：
```javascript
pmfl.make2().add([numSet("[0,0.5)")], (data)=>{console.log("小于0.5")})
.neither((data)=>{console.log("大于等于0.5")})
.match([Math.random()])
.add([numSet("[0.5,0.8)")], (data)=>{console.log("介于0.5和0.8之间")})
.neither((data)=>{console.log("大于等于0.8")})
.match([Math.random()])
//感觉眼花缭乱？没关系，我们马上就开始了解pmfl的api吧
```
- pmfl代码是函数式的，是链式调用的，方便条件的自由组合与拆分，可以让代码更灵活
