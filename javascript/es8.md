## async / await

- async 和 await 是一种更加优雅的异步编程解决方案，是 Promise 的拓展
- 在我们处理异步的时候，比起回调函数，Promise 的 then 方法会显得较为简洁和清晰，但是在处理多个彼此之间相互依赖的请求的时候，就会显的有些繁琐。这时候，用 async/await 更加优雅
- 我们知道 JavaScript 是单线程的，使用 Promise 之后可以让我们书写异步操作更加简单，而 async 是让我们写起 Promise 像同步操作

### 基本语法

- 前面添加了 async 的函数在执行后都会自动返回一个 Promise 对象

```js
async function foo() {
  return 'es8' // Promise.resolve('es8')
}
console.log(foo()) // Promise { 'es8' }
```

- await 后面需要跟异步操作，不然就没有意义，而且 await 后面的 Promise 对象不必写 then，因为 await 的作用之一就是获取后面 Promise 对象成功状态传递出来的参数
- 在 async 函数中使用 await，那么 await 这里的代码就会变成同步的了，意思就是说只有等 await 后面的 Promise 执行完成得到结果才会继续下去，await 就是等待

```js
function timeout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(1)
      resolve(1)
    }, 1000)
  })
}

async function foo() {
  const res = await timeout()
  console.log(res)
  console.log(2)
}
foo()
```

- 对失败的处理

```js
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('success')
      reject('fail')
    }, 1000)
  })
}
async function foo() {
  return await timeout()
}
foo()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
```

:::tip

await 只能在 async 标记的函数内部使用，单独使用会触发 Syntax error

:::

## Object 扩展

- ES8 中对象扩展补充了两个静态方法，用于遍历对象：Object.values()，Object.entries()

### Object.values()

- Object.values() 返回一个数组，其元素是在对象上找到的可枚举属性值。属性的顺序与通过手动循环对象的属性值所给出的顺序相同(for...in，但是 for...in 还会遍历原型上的属性值)

```js
const obj = {
  name: 'zhangsan',
  age: 18,
  hobby: 'swim'
}
console.log(Object.keys(obj)) // [ 'name', 'age', 'hobby' ]

// 以前的方法
const res = Object.keys(obj).map((key) => obj[key])
console.log(res) // [ 'zhangsan', 18, 'swim' ]

// 代替之前的方法
console.log(Object.values(obj)) // [ 'zhangsan', 18, 'swim' ]
```

:::tip

Object.values 是在对象上找到可枚举的属性的值，所以只要这个对象是可枚举的就可以，不只是 {} 这种形式

:::

### Object.entries()

- Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致。（区别在于 for-in 循环也枚举原型链中的属性）

```js
const obj = {
  name: 'zhangsan',
  age: 18,
  hobby: 'swim'
}
console.log(Object.entries(obj)) // [ [ 'name', 'zhangsan' ], [ 'age', 18 ], [ 'hobby', 'swim' ] ]

for (let [key, val] of Object.entries(obj)) {
  console.log(`${key}: ${val}`)
  // name: zhangsan
  // age: 18
  // hobby: swim
}
```

### Object.getOwnPropertyDescriptors()

- defineProperty 的第三个参数就是描述符(descriptor)。这个描述符包括几个属性：
- value [属性的值]
- writable [属性的值是否可被改变]
- enumerable [属性的值是否可被枚举]
- configurable [描述符本身是否可被修改，属性是否可被删除]

```js
const obj = {
  name: 'zhangsan',
  hobby: 'swim'
}

const desc = Object.getOwnPropertyDescriptors(obj)
console.log(desc)
// name: { value: 'zhangsan', writable: true, enumerable: true, configurable: true }
// hobby: { value: 'swim', writable: true, enumerable: true, configurable: true }
```

## String 扩展

- 在 ES8 中 String 新增了两个实例函数 String.prototype.padStart 和 String.prototype.padEnd，允许将空字符串或其他字符串添加到原始字符串的开头或结尾

### String.prototype.padStart()

- 把指定字符串填充到字符串头部，返回新字符串

```js
const str = 'es8'
console.log(str.padStart(6, 'x')) // xxxes8
console.log(str.padEnd(6, 'y')) // es8yyy
```

- 场景 1：日期格式化

```js
// yyyy-mm-dd
const now = new Date()
const year = now.getFullYear()
const month = (now.getMonth() + 1).toString().padStart(2, '0') // 0~11
const day = now.getDate().toString().padStart(2, '0')
console.log(`${year}-${month}-${day}`)
```

- 场景 2：数字替换

```js
const tel = '13231191013'
const newTel = tel.slice(-4).padStart(tel.length, '*')
console.log(newTel) // *******1013
```

### String.prototype.padEnd()

- 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充

## 尾逗号 Trailing commas

- ES8 允许函数的最后一个参数有尾逗号（Trailing comma）
- 此前，函数定义和调用时，都不允许最后一个参数后面出现逗号

```js

function foo(
    a, 
    b, 
    c,
    d,
) {
    console.log(a, b, c)
}

foo(4, 5, 6, )
```