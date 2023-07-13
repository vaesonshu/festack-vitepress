# [TypeScript 官网](https://www.typescriptlang.org/)、[TypeScript 中文网](https://ts.nodejs.cn/)

:::tip
示例代码可以在 TypeScript 官网的演练场中进行代码测试
:::

## 基础类型

- TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用
- 数字、布尔、字符串

```ts
// 定义了一个名称叫做value的变量, 这个变量中将来只能存储数值类型的数据
let value: number
value1 = 123
value1 = '123' // Type 'string' is not assignable to type 'number'

let value2: boolean
value2 = true

let value3: string
value3 = '123'
value3 = `value1=${value1}, value2=${value2}`
```

## 数组和元组类型

- 数组类型

```ts
// 方式一 定义只能存储数值类型的数据
let arr1: Array<number>
arr1 = [1, 2, 3]

// 方式二 定义只能存储字符串类型的数据
let arr2: string[]
arr2 = ['a', 'b', 'c']
```

- 联合类型

```ts
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
let arr3: (number | string)[]
arr3 = [1, 'a', 2, 'b', 3, 'c']
```

- 任意类型

```ts
// 这个数组中将来可以存储任意类型的数据
let arr4: any[]
arr4 = [1, '2', true]
```

- 元祖类型（数组类型的扩展）
- 元祖用于保存定长定数据类型的数据

```ts
let arr5: [string, number, boolean]
arr5 = ['a', 1, true]
```

## 枚举类型

- 枚举类型是 TS 为 JS 扩展的一种类型，在原生的 JS 中是没有枚举类型的

```ts
// 定义了一个名称叫做Gender的枚举类型, 这个枚举类型的取值有两个, 分别是Male和Femal
enum Gender {
  Male,
  Femal
}

// 定义了一个名称叫做val的变量, 这个变量中只能保存Male或者Femal
let val: Gender
val = Gender.Male
val = Gender.Femal
console.log(Gender.Male) // 0
console.log(Gender.Femal) // 1

// 注意：TS 中的枚举底层实现的本质其实就是数值类型, 所以赋值一个数值不会报错
val = 123

// 注意：如果手动指定了前面枚举值的取值, 那么后面枚举值的取值会根据前面的值来递增
console.log(Gender.Male) // 4
console.log(Gender.Femal) // 5

// 注意：如果手动指定了后面枚举值的取值, 那么前面枚举值的取值不会受到影响
console.log(Gender.Male) // 0
console.log(Gender.Femal) // 3

// 注意：可以同时修改多个枚举值的取值, 如果同时修改了多个, 那么修改的是什么最后就是什么
console.log(Gender.Male) // 9
console.log(Gender.Femal) // 10

// 可以通过枚举值拿到它对应的数字
console.log(Gender.Male) // 0

// 可以通过它对应的数据拿到它的枚举值
console.log(Gender[0]) // Male
```

## any 和 void 类型

- any 表示任意类型，当我们不清楚某个值的具体类型的时候我们就可以使用 any
- 一般用于定义一些通用性比较强的变量，或者用于保存从其它框架中获取的不确定类型的值
- 在 TS 中任何数据类型的值都可以负值给 any 类型

```ts
// 定义了一个可以保存任意类型数据的变量
let value: any
value = 123
value = 'abc'
value = true
value = [1, 2, 3]
```

- void 与 any 正好相反，表示没有任何类型，一般用于函数返回值
- 在 TS 中只有 null 和 undefined 可以赋值给 void 类型（前提是 strictNullChecks:false）

```ts
function test(): void {
  console.log('hello world')
}
test()

let value: void
value = null
value = undefined
value = 123 // Type 'number' is not assignable to type 'void'
```

## Never 和 Object 类型

- Never 表示的是那些永不存在的值的类型
- 一般用于抛出异常或根本不可能有返回值的函数

```ts
function demo(): never {
  throw new Error('error')
}
demo()

function demo2(): never {
  while (true) {}
}
demo2()
```

- Object 类型 表示一个对象

```ts
// 定义了一个只能保存对象的变量
let obj: object
obj = {
  name: 'lisi',
  age: 18
}
```

## 类型断言

- TS 中的类型断言和其它编程语言的类型转换很像，可以将一种类型强制转换成另外一种类型
- 类型断言就是告诉编译器，你不要帮我们检查了，相信我，我知道自己在干什么

```ts
// 我们明确的知道这个变量中保存的是字符串类型
let str: any = 'typescript'
// 我们就可以通过类型断言告诉编译器, 这个变量是一个字符串类型, 使用字符串类型中相关的方法
let len = (str as string).length

// 这种方式存在兼容性
let len = (<string>str).length
```

## 接口类型

- 接口也是一种类型, 也是用来约束使用者的

```ts
// 定义一个接口类型
interface Student {
  name: string
  age: number
}

let obj = {
  name: 'lisi',
  age: 18
}

function say({ name, age }: Student): void {
  console.log(`我的姓名是:${name}, 今年${age}岁`)
}
say(obj)
```

## 可选属性和索引签名

- 如果使用接口来限定了变量或者形参，那么在给变量或者形参赋值的时候，赋予的值就必须和接口限定的一模一样才可以，多一个或者少一个都不行
- 多一个或者多多个怎么做? 三种方式绕开 TS 检查

```ts
// 定义一个接口
interface Student {
  name: string
  age: number
  hobby?: string
  // [propName: string]: any
}

function say({ name, age, hobby }: Student): void {
  if (hobby) {
    console.log(`我的姓名是:${name}, 年龄${age}岁, 爱好${hobby}`)
  } else {
    console.log(`我的姓名是:${name}, 年龄${age}岁`)
  }
}

// 方式一: 使用类型断言
say({ name: 'lisi', age: 18, hobby: '打球🏀', abc: 'abc' } as Student)
// 方式二: 使用变量
let obj = { name: 'lisi', age: 18, hobby: '打球🏀', abc: 'abc' }
say(obj)
// 方式三: 使用索引签名 [propName: string]: any
say({ name: 'lisi', age: 18, hobby: '打球🏀', abc: 'abc', def: 'def' })
```

## 索引签名和只读属性

- 索引签名用于描述那些**通过索引得到的**类型

```ts
interface Student {
  [propName: string]: string
}

let obj: Student = {
  // 注意点: 只要key和value满足索引签名的限定即可, 无论有多少个都无所谓
  name: 'lisi',
  hobby: '打球'
  age: 18 // Type 'number' is not assignable to type 'string'
  false: '123' // 无论key是什么类型最终都会自动转换成字符串类型, 所以没有报错
}
```

```ts
interface stringArray {
  [propName: number]: string
}

let arr: stringArray = {
  0: 'a',
  1: 'b',
  2: 'c'
}

let arr: stringArray = ['a', 'b', 'c']
console.log(arr[0]) // a
console.log(arr[1]) // b
console.log(arr[2]) // c
```

- 只读属性（让对象属性只能在对象刚刚创建的时候修改其值）

```ts
interface Student {
  name: string
  readonly hobby: string
}
let myName: Student = {
  name: 'lisi',
  hobby: '打球'
}
myName.hobby = '游泳' // Cannot assign to 'hobby' because it is a read-only property
console.log(myName)
```

- TS 内部对只对属性进行了扩展, 扩展出来了一个只读数组

```ts
let arr: ReadonlyArray<string> = ['a', 'b', 'c']
console.log(arr[0]) // a
arr[0] = '123' // Index signature in type 'readonly string[]' only permits reading
console.log(arr[0]) // 123
```

## 函数接口

- 我们除了可以通过接口来限定对象以外, 我们还可以使用接口来限定函数

```ts
interface SumInterface {
  (a: number, b: number): number
}
let sum: SumInterface = function (x: number, y: number): number {
  return x + y
}
let res = sum(10, 20)
console.log(res)
```

## 混合类型接口

- 例如：约定的内容中既有对象属性, 又有函数

```ts
interface CountInterface {
  (): void
  count: number
}
let getCounter = (function (): CountInterface {
  /*
    CountInterface接口要求数据既要是一个没有参数没有返回值的函数又要是一个拥有count属性的对象
    fn作为函数的时候符合接口中函数接口的限定 ():void
    fn作为对象的时候符合接口中对象属性的限定  count:number
  */
  let fn = function () {
    fn.count++
    console.log(fn.count)
  } as CountInterface
  fn.count = 0
  return fn
})()
getCounter() // 1
getCounter() // 2
getCounter() // 3
```

## 接口的继承

- TS 中的接口和 JS 中的类一样是可以继承的

```ts
interface LengthInterface {
  length: number
}
interface WidthInterface {
  width: number
}
interface HeightInterface {
  height: number
}
interface RectInterface extends LengthInterface, WidthInterface, HeightInterface {
  color: string
}
let rect: RectInterface = {
  length: 10,
  width: 20,
  height: 30,
  color: 'blue'
}
```

## 函数

- TS 中的函数大部分和 JS 相同

```ts
// 命名函数
function say1(name: string): void {
  console.log(name)
}
// 匿名函数
let say2 = function (name: string): void {
  console.log(name)
}
// 箭头函数
let say3 = (name: string): void => {
  console.log(name)
}
```

## 函数声明和重载

- 在 TS 中函数的完整格式应该是由函数的定义和实现两个部分组成的

```ts
// 定义一个函数
let AddFun: (a: number, b: number) => number
// 根据定义实现函数
AddFun = function (x: number, y: number): number {
  return x + y
}
let res = AddFun(10, 20)
console.log(res)
```

```ts
// 一步到位写法
let AddFun: (a: number, b: number) => number = function (x: number, y: number): number {
  return x + y
}
let res = AddFun(10, 20)
console.log(res)
```

```ts
// 根据函数的定义自动推导对应的数据类型
let AddFun: (a: number, b: number) => number = function (x, y) {
  return x + y
}
let res = AddFun(10, 20)
console.log(res)
```

- TS 函数声明

```ts
// 先声明一个函数
type AddFun = (a: number, b: number) => number
// 再根据声明去实现这个函数
let add: AddFun = function (x: number, y: number): number {
  return x + y
}
// let add: AddFun = function (x, y) {
//   return x + y
// }
let res = add(10, 20)
console.log(res)
```

- TS 函数重载：同名的函数可以根据不同的参数实现不同的功能

```ts
// 定义函数的重载
function getArray(num: number): number[]
function getArray(str: string): string[]
// 实现函数的重载
function getArray(value: any): any[] {
  if (typeof value === 'string') {
    return value.split('')
  } else {
    let arr = []
    for (let i = 0; i <= value; i++) {
      arr.push(i)
    }
    return arr
  }
}
let res = getArray(10)
let res = getArray('hello world')
console.log(res)
```

## 可选-默认-剩余参数

- 可选参数

```ts
function add(x: number, y: number, z?: number): number {
  return x + y + (z ? z : 0)
}
// let res = add(10, 20);
let res = add(10, 20, 30)
console.log(res)
```

```ts
// 可选参数可以配置函数重载一起使用, 这样可以让函数重载变得更加强大
function add(x: number, y: number): number
function add(x: number, y: number, z: number): number
function add(x: number, y: number, z?: number) {
  return x + y + (z ? z : 0)
}
let res = add(10, 20, 30)
console.log(res)
```

- 默认参数

```ts
function add(x: number, y: number = 10): number {
  return x + y
}
// let res = add(10);
let res = add(10, 30)
console.log(res)
```

- 剩余参数

```ts
function add(x: number, ...ags: number[]) {
  console.log(x)
  console.log(ags)
}
add(10, 20, 30, 40, 50)
```

## 类型推轮

- 不用明确告诉编译器具体是什么类型, 编译器就知道是什么类型
- 根据初始化值自动推断

```ts
// 如果是定义的同时初始化, 那么TS就会自动进行类型推荐
let value = 123
value = 456
value = '456' // Type 'string' is not assignable to type 'number'.
```

- 根据上下文类型自动推断

```ts
window.onmousedown = (event) => {
  console.log(event.target)
}
```

## 类型别名

- 类型别名就是给一个类型起个新名字，但是它们都代表同一个类型
-

```ts
// 例如：给 string 类型起了一个别名叫做 MyString
// 那么将来无论是 MyString 还是 string 都表示 string
type MyString = string
let value: MyString
value = 'love'
value = 123 // 报错
value = false // 报错
```

## 映射类型

- 根据旧的类型创建出新的类型，我们称之为映射类型
