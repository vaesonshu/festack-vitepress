# 生成器函数

## 生成器函数当基本使用

- function 后面会跟上符号: `*`
- 代码的执行可以被 yield 控制
- 生成器函数默认在执行时, 返回一个生成器对象, 要想执行函数内部的代码, 需要生成器对象, 调用它的 next 操作, 当遇到 yield 时, 就会中断执行

```js
// 1. 定义了一个生成器函数
function* foo() {
  console.log('1111')
  console.log('2222')
  yield
  console.log('3333')
  console.log('4444')
  yield
  console.log('5555')
  console.log('6666')
}

// 2. 调用生成器函数, 返回一个 生成器对象
const generator = foo()
// 调用next方法
generator.next()
generator.next()
generator.next()
```

## 生成器函数参数返回值

```js
// 1.定义了一个生成器函数
function* foo(name1) {
  console.log('执行内部代码:1111', name1)
  console.log('执行内部代码:2222', name1)
  const name2 = yield 'aaaa'
  console.log('执行内部代码:3333', name2)
  console.log('执行内部代码:4444', name2)
  const name3 = yield 'bbbb'
  // return "bbbb"
  console.log('执行内部代码:5555', name3)
  console.log('执行内部代码:6666', name3)
  yield 'cccc'
  return undefined
}

// 2.调用生成器函数, 返回一个 生成器对象
const generator = foo('next1')
// 调用next方法
console.log(generator.next()) // { done: false, value: "aaaa" }
console.log(generator.next()) // { done: false, value: "bbbb" }
console.log(generator.next()) // { done: false, value: "cccc" }
console.log(generator.next()) // {done: true, value: undefined}

// 3.在中间位置直接return, const name3 = yield 'bbbb' 替换为 return "bbbb"
console.log(generator.next()) // { done: false, value: "aaaa" }
console.log(generator.next()) // { done: true, value: "bbbb" }
console.log(generator.next()) // { done: true, value: undefined }
console.log(generator.next()) // { done: true, value: undefined }

// 4.给函数每次执行的时候, 传入参数
console.log(generator.next()) // 执行内部代码:1111 next1, 执行内部代码:2222 next1, { done: false, value: "aaaa" }
console.log(generator.next('next2')) // 执行内部代码:3333 next2, 执行内部代码:4444 next2, { done: false, value: "bbbb" }
console.log(generator.next('next3')) // 执行内部代码:5555 next3, 执行内部代码:6666 next3, { done: true, value: "cccc" }
console.log(generator.next()) // { done: true, value: undefined }
```

## 生成器函数提前结束

- generator.return 提前结束函数, `generator.return('next')`
- generator.throw 向函数抛出一个异常, `generator.throw(new Error("next throw error"))`

## 生成器代替迭代器

```js
const names = ['aaa', 'bbb', 'ccc']

// 生成器代替迭代器
function* createArrayIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

// 返回一个迭代器对象 调用next方法
const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
```

## 生成器 yield 语法糖

```js
// yield*替换之前的方案
const names = ['aaa', 'bbb', 'ccc']

function* createArrayIterator(arr) {
  yield* arr
}

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
```
