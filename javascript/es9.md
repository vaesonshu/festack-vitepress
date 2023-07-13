## Object Rest & Spread

- 这块代码展示了 spread 语法，可以把 obj1 对象的数据都拓展到 obj2 对象，这个功能很实用

```js
const obj1 = {
  name: 'zhangsan',
  age: 18
}
const obj2 = {
  hobby: 'swim'
}
// 克隆对象
const obj3 = {
  ...obj1
}
obj1.age = 20
console.log(obj3) // { name: 'zhangsan', age: 18 }

// 合并对象
const obj4 = { ...obj1, ...obj2 }
console.log(obj4) // { name: 'zhangsan', age: 18, hobby: 'swim' }
```

- 当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的

```js
const obj1 = {
  name: 'zhangsan',
  age: 18,
  hobby: 'swim'
}

const { name, ...rest } = obj1
console.log(name) // zhangsan
console.log(rest) // { age: 18, hobby: 'swim' }
```

## Promise.prototype.finally()

- 指定不管最后状态如何都会执行的回调函数
- Promise.prototype.finally() 方法返回一个 Promise，在 promise 执行结束时，无论结果是 fulfilled 或者是 rejected，在执行 then()和 catch()后，都会执行 finally 指定的回调函数
- 这为指定执行完 promise 后，无论结果是 fulfilled 还是 rejected 都需要执行的代码提供了一种方式，避免同样的语句需要在 then()和 catch()中各写一次的情况

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
    // reject('fail')
  }, 1000)
})
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    console.log('finally')
  })
```

### 场景 1：loading 关闭

- 需要每次发送请求，都会有 loading 提示，请求发送完毕，就需要关闭 loading 提示框，不然界面就无法被点击。不管请求成功或是失败，这个 loading 都需要关闭掉，这时把关闭 loading 的代码写在 finally 里再合适不过了

### 场景 2：数据库断开链接

```js
let connection
db.open()
    .then(conn => {
        connection = conn
        return connection.select({
            name: 'lisi'
        })
    })
    .then(result => {
        // Process result
        // Use `connection` to make more queries
    })···
    .catch(error => {
        // handle errors
    })
    .finally(() => {
        connection.close()
    })
```

## 字符串扩展

- 放松对标签模板里字符串转义的限制, 遇到不合法的字符串转义返回 undefined，并且从 raw 上可获取原字符串

- ES9 开始，模板字符串允许嵌套支持常见转义序列，移除对 ECMAScript 在带标签的模版字符串中转义序列的语法限制

```js
function tag(strs) {
  console.log(strs[0])
  console.log(strs.raw[0])
}

// 在标签函数中使用
tag`\u{61} and \u{62}` // a and b, \u{61} and \u{62}
tag`\u{61} and \unicode` // undefined, \u{61} and \unicode

// 之前的版本会报错：Invalid Unicode escape sequence
// 无效的Unicode转义序列

// 报错：
let bad = `bad escape sequence: \unicode`
```
