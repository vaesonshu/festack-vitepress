# 泛型

## 什么是泛型？

- 在编写代码的时候我们既要考虑代码的健壮性, 又要考虑代码的灵活性和可重用性
- 通过 TS 的静态检测能让我们编写的代码变得更加健壮, 但是在变得健壮的同时却丢失了灵活性和可重用性
- 所以为了解决这个问题 TS 推出了泛型的概念
- 通过泛型不仅可以让我们的代码变得更加健壮, 还能让我们的代码在变得健壮的同时保持灵活性和可重用性

```ts
let getArray = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value)
}

let arr1 = getArray<string>('hello world')
let arr2 = getArray<number>(123)
```

:::tip
泛型具体的类型可以不指定 如果没有指定, 那么就会根据我们传递的泛型参数自动推导出来
:::

## 泛型约束

- 默认情况下我们可以指定泛型为任意类型
- 但是有些情况下我们需要指定的类型满足某些条件后才能指定
- 那么这个时候我们就可以使用泛型约束

```ts
// 例如：要求指定的泛型类型必须有Length属性才可以
interface LengthInterface {
  length: number
}
let getArray = <T extends LengthInterface>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value)
}
let arr1 = getArray<string>('hello world')
let arr2 = getArray<number>(123) // 类型“number”不满足约束“LengthInterface”
```

## 泛型约束-类型参数

- 一个泛型被另一个泛型约束, 就叫做泛型约束中使用类型参数

```ts
// 例如：定义一个函数用于根据指定的key获取对象的value
let getProps = <T, K extends keyof T>(obj: T, key: K): any => {
  return obj[key]
}
let obj = {
  a: 'a',
  b: 'b'
}
let res = getProps(obj, 'a')
let res2 = getProps(obj, 'c') // 类型'"c"'的参数不能赋值给类型'"a"'|| '"b"'的参数
console.log(res)
```
