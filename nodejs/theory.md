# Node 模块原理分析

## Node 模块

- 在 `CommonJS` 规范中一个文件就是一个模块，通过`exports`暴露数据，通过`require()`导入模块
- 因为一个文件就是一个模块，要使用模块必须先通过`require()`导入模块，所以可以得出：`require()`的作用其实就是读取文件
- `fs`模块可以读取文件，取到的数据要么是二进制， 要么是字符串，论是二进制还是字符串都无法直接执行，如果是字符串，在 JS 中是有办法让它执行的

## 通过 eval 执行代码

```js
let str = "console.log('www.festack.cn')"
eval(str)

// 存在依赖关系, 字符串可以访问外界数据, 不安全
let name = 'node'
let str = 'console.log(name);'
eval(str)
```

## 通过 new Function 执行代码

```js
let str = "console.log('www.festack.cn')"
let fn = new Function(str)
console.log(fn)
fn()

// 存在依赖关系, 字符串可以访问外界数据,不安全
let name = 'node'
let str = 'console.log(name)'
let fn = new Function(str)
fn()
```

## 通过 NodeJS 的 vm 虚拟机执行代码

- `runInThisContext` 提供了一个安全的环境给我们自行字符串中的代码
- `runInThisContext` 提供的环境不能访问本地的变量, 但是可以访问全局的变量(也就是 global 上的变量)

```js
let name = 'node'
let str = 'console.log(name);'
vm.runInThisContext(str) // name is not defined

global.name = 'node'
let str = 'console.log(name);'
vm.runInThisContext(str) // node
```

- `runInNewContext` 提供了一个安全的环境给我们执行字符串中的代码
- `runInNewContext` 提供的环境不能访问本地的变量, 也不能访问全局的变量(也就是 global 上的变量)

```js
let name = 'node'
let str = 'console.log(name);'
vm.runInNewContext(str) // name is not defined

global.name = 'node'
let str = 'console.log(name);'
vm.runInNewContext(str) // name is not defined
```

## Node 模块加载分析
