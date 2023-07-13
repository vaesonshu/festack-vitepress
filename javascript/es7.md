## Array.prototype.includes()

- 在 ES7 之前想判断数组中是否包含一个元素，基本可以这样写：

```js
console.log(
  array1.find(function (item) {
    return item === 2
  })
)
```

- ES7 引入的 Array.prototype.includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false

### 基本用法

```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es6')) // true
console.log(arr.includes('es9')) // false
```

### 接收俩个参数

- 要搜索的值和搜索的开始索引。第二个参数可选。从该索引处开始查找 searchElement

```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es7', 1)) // true
console.log(arr.includes('es7', 2)) // false
console.log(arr.includes('es7', -1)) // false
console.log(arr.includes('es7', -2)) // true
```

### 与 indexOf()比较

```js
console.log(['a', 'b', 'c'].includes('a')) //true
console.log(['a', 'b', 'c'].indexOf('a') > -1) //true

console.log(arr.indexOf('es7')) // 1
console.log(arr.indexOf('es7') > -1) // true
```

:::tip

只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的

:::

### 优缺点比较

- 两者都是采用===的操作符来作比较的，不同之处在于：对于 NaN 的处理结果不同。我们知道 js 中 NaN === NaN 的结果是 false, indexOf()也是这样处理的，但是 includes()不是这样的

```js
const demo = [1, NaN, 2, 3]
console.log(demo.indexOf(NaN)) //-1
console.log(demo.includes(NaN)) //true
```

:::tip 总结

如果只想知道某个值是否在数组中存在，而并不关心它的索引位置，建议使用 includes()。如果想获取一个值在数组中的位置，那么只能使用 indexOf 方法

:::

## 幂运算符 `**`

- 幂运算符 `**` 可以代替之前的`Math.pow()`

```js
console.log(2 ** 10) // 1024
```

:::tip

幂运算符的两个`*`号之间不能出现空格，否则语法会报错

:::
