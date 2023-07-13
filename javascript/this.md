## this 指向的分析

- 函数在调用时，JavaScript 会默认给 this 绑定一个值
- this 的绑定和定义的位置（编写的位置）没有关系
- this 的绑定和调用方式以及调用的位置有关系
- this 是运行时被绑定的

## this 绑定规则

- 1. 默认绑定

```js
// 1. 普通的函数被独立的调用
function foo() {
  console.log('foo', this)
}
foo() // this指向window

// 2.函数定义在对象中, 但是独立调用
var obj = {
  name: 'why',
  bar: function () {
    console.log('bar:', this)
  }
}
var baz = obj.bar
baz() // this指向window

// 3.高阶函数
function test(fn) {
  fn()
}
test(obj.bar) // this指向window

// 4.严格模式下, 独立调用的函数中的this指向的是undefined
```

- 2. 隐式绑定

```js
// 隐式绑定
function foo() {
  console.log('foo函数:', this)
}

var obj = {
  bar: foo
}

obj.bar() // this指向{bar: ƒ}
```

- 3. new 绑定

```js
/*
  当new一个函数的时候发生了什么？
  1.创建新的空对象
  2.将this指向这个空对象
  3.执行函数体中的代码
  4.没有显示返回非空对象时, 默认返回这个对象
*/
function foo() {
  this.name = 'why'
  console.log('foo函数:', this)
}

new foo()
```

- 4. 显示绑定

```js
// 显式绑定
var obj = {
  name: 'why'
}

function foo() {
  console.log('foo函数:', this)
}

// 执行函数, 并且强制this就是obj对象
foo.call(obj)
```

## call、apply、bind 的区别

```js
function foo(name, age, height, address) {
  console.log('foo函数被调用:', this)
  console.log('打印参数:', name, age, heigh, address)
}
var obj = { name: 'why' }

// apply
// 第一个参数: 绑定this
// 第二个参数: 传入额外的实参, 以数组的形式
foo.apply('apply', ['kobe', 30, 1.98])

// call
// 第一个参数: 绑定this
// 参数列表: 后续的参数以多参数的形式传递, 会作为实参
foo.call('call', 'james', 25, 2.05)

// bind
// 需求: 调用foo时, 总是绑定到obj对象身上(不希望obj对象身上有函数)
// 1.bind函数的基本使用
var bar = foo.bind(obj)
bar() // this -> obj

// 2.bind函数的其他参数(了解)
var bar = foo.bind(obj, 'kobe', 18, 1.88)
bar('james') // 实参james会传到函数的形参address上
```

## 内置函数的调用绑定

```js
// 根据经验来进行判断

// 1.定时器
setTimeout(function () {
  console.log('定时器函数:', this) // this指向window
}, 1000)

// 2.按钮的点击监听
var btnEl = document.querySelector('button')
btnEl.onclick = function () {
  console.log('btn的点击:', this) // this指向button
}

btnEl.addEventListener('click', function () {
  console.log('btn的点击:', this)
})

// 3.forEach 其中第二个参数就是给谁绑定this
var names = ['abc', 'cba', 'nba']
names.forEach(function (item) {
  console.log('forEach:', this) // this指向"aaaa"
}, 'aaaa')
```

## this 绑定规则优先级

- new -> bind -> apply/call -> 隐式 -> 默认

```js
function foo() {
  console.log('foo:', this)
}

// 比较优先级:

// 1.显式绑定的优先级高于隐式绑定
// 1.1 apply/call高于默认绑定
var obj = { foo: foo }
obj.foo.apply('abc')
obj.foo.call('abc')

// 1.2 bind高于默认绑定
var bar = foo.bind('aaa')
var obj = {
  name: 'why',
  baz: bar
}
obj.baz()

// 2.new绑定优先级高于隐式绑定
var obj = {
  name: 'why',
  foo: function () {
    console.log('foo:', this)
    console.log('foo:', this === obj)
  }
}
new obj.foo()

// 3.new/显式
// 3.1 new不可以和apply/call一起使用

// 3.2 new优先级高于bind
function foo() {
  console.log('foo:', this)
}
var bindFn = foo.bind('aaa')
new bindFn()

// 4.bind/apply优先级
// bind优先级高于apply/call
function foo() {
  console.log('foo:', this)
}
var bindFn = foo.bind('aaa')
bindFn.call('bbb')
```

## this 绑定之外的情况

```js
// 1.情况一: 显示绑定null/undefined, 那么使用的规则是默认绑定
function foo() {
  console.log('foo:', this)
}

foo.apply('abc')
foo.apply(null) // this指向window
foo.apply(undefined) // this指向window

// 2.情况二: 间接函数引用 使用的规则是默认绑定
var obj1 = {
  name: 'obj1',
  foo: function () {
    console.log('foo:', this)
  }
}
var obj2 = {
  name: 'obj2'
}

// 如果代码紧接是 {}[]() 那么就要在其前面加上分号

// obj2.foo = obj1.foo
// obj2.foo()
;(obj2.foo = obj1.foo)() // 独立函数调用
```

## 箭头函数中的 this 使用

::: tip 注意
箭头函数不会绑定 this、arguments 属性
箭头函数不能作为构造函数来使用（不能和 new 一起使用，会抛出错误）
:::

```js
// 箭头函数中, 压根没有this
var bar = () => {
  console.log('bar:', this)
}
bar()
// 通过apply调用时, 也是没有this
bar.apply('aaaa')

// this的查找规则
var obj = {
  name: 'obj',
  foo: () => {
    var bar = () => {
      console.log('bar:', this)
    }
    return bar
  }
}
var fn = obj.foo()
fn.apply('bbb') // this指向window
```
