# 装饰器

- 装饰器是一种特殊类型的声明，它能够被附加到类、方法、访问器，属性或参数上
- 在 TS 中装饰器也是一项实验性的特性，所以要使用装饰器需要手动打开相关配置，修改配置文件 `experimentalDecorators: true`

:::tip
装饰器是 JavaScript 的第 2 阶段提案，可作为 TypeScript 的实验性功能使用，可能会在未来的版本中更改
:::

## 装饰器的基本格式

- 普通装饰器

```ts
// 这个装饰器的代码会在定义类之前执行, 并且在执行的时候会把这个类传递给装饰器
function test1(target) {
  console.log('test')
}

@test1
class Person {}
```

- 装饰器工厂（如果一个函数返回一个回调函数, 如果这个函数作为装饰器来使用）

```ts
// 在绑定的时候由于在函数后面写上了(), 所以会先执行装饰器工厂拿到真正的装饰器
// 真正的装饰器会在定义类之前执行, 所以紧接着又执行了里面
function test2() {
  console.log('test2 out')
  return (target) => {
    console.log('test2 in')
  }
}

@test2()
class Person {}
```

- 装饰器组合（普通的装饰器可以和装饰器工厂结合起来一起使用）

```ts
// 结合起来一起使用的时候, 会先从上至下的执行所有的装饰器工厂, 拿到所有真正的装饰器
// 然后再从下至上的执行所有的装饰器
function test1(target) {
  console.log('test1')
}

function test3() {
  console.log('test3 out')
  return (target) => {
    console.log('test3 in')
  }
}
@test1
@test3()
class Person {}
```

## 类装饰器

- 类装饰器在类声明之前绑定，紧靠着类声明

```ts
// 在执行类装饰器函数的时候，会把绑定的类作为其唯一的参数传递给装饰器
function test(target: any) {
  // console.log(target)
  target.prototype.personName = 'tom'
  target.prototype.say = (): void => {
    console.log(`my name is ${target.prototype.personName}`)
  }
}
@test
class Person {}
// 类装饰器可以用来监视，修改或替换类定义
interface Person {
  personName: string
  say(): void
}
let p = new Person()
console.log(p.personName) // tom
p.say() // my name is tom
```

```ts
// 如果类装饰器返回一个新的类，它会新的类来替换原有类的定义
function test<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    name: string = 'lisi'
    age: number = 18
  }
}

@test
class Person {}
let p = new Person()
console.log(p) // { "name": "lisi", "age": 18}
```

## 方法装饰器

- 方法装饰器写在在一个方法的声明之前，紧靠着方法声明
- 方法装饰器表达式会在运行时当作函数被调用，传入 3 个参数
- `target`: 对于静态方法而言就是当前的类，对于实力方法而言就是当前的实例
- `propertyKey`: 被绑定方法的名字
- `descriptor`: 被绑定方法的属性描述符

```ts
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // console.log(target)
  // console.log(propertyKey)
  // console.log(descriptor)
  descriptor.enumerable = false
  // 方法装饰器可以用来监视，修改或者替换方法定义
  descriptor.value = (): void => {
    console.log('my name is zhangsan')
  }
}

class Person {
  @test
  sayName(): void {
    console.log('my name is lisi')
  }
  // @test
  sayAge(): void {
    console.log('my age is 18')
  }
  // @test
  static say(): void {
    console.log('say hello world')
  }
}
let p = new Person()
for (let key in p) {
  console.log(key)
}
p.sayName() // my name is zhangsan
```

## 访问装饰器

- 访问器装饰器声明在一个访问器的声明之前，紧靠着访问器声明
- 访问器装饰器应用于访问器的 属性描述符并且可以用来监视，修改或替换一个访问器的定义
- 访问器装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数
- `target`: 对于静态方法而言就是当前的类，对于实力方法而言就是当前的实例
- `propertyKey`: 被绑定方法的名字
- `descriptor`: 被绑定方法的属性描述符

:::tip
TypeScript 不允许同时装饰一个成员的 get 和 set 访问器，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上
:::

```ts
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // console.log(target)
  // console.log(propertyKey)
  // console.log(descriptor)
  descriptor.set = (value: string) => {
    target.myName = value
  }
  descriptor.get = (): string => {
    return target.myName
  }
}

class Person {
  private _name: string // wangwu
  constructor(name: string) {
    this._name = name
  }
  @test
  get name(): string {
    return this._name
  }
  set name(value: string) {
    this._name = value
  }
}

let p = new Person('wangwu')
p.name = 'zhaoliu'
console.log(p.name)
console.log(p)
```

## 属性装饰器

- 属性装饰器写在一个属性声明之前，紧靠着属性声明
- 属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数
- `target`: 对于静态方法而言就是当前的类，对于实力方法而言就是当前的实例
- `proptyName`: 成员的名字

```ts
function test(target: any, proptyName: string) {
  console.log(target)
  console.log(proptyName)
  target[proptyName] = 'jerry'
}
class Person {
  // @test
  static age: number
  @test
  name?: string
}
let p = new Person()
console.log(p)
```

## 参数装饰器

- 参数装饰器写在一个参数声明之前，紧靠着参数声明
- 参数装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数
- `target`: 对于静态方法而言就是当前的类，对于实力方法而言就是当前的实例
- `proptyName`: 参数所在的方法名称
- `index`: 参数在参数列表中的索引

```ts
function test(target: any, proptyName: string, index: number) {
  console.log(target)
  console.log(proptyName)
  console.log(index)
}
class Person {
  say(age: number, @test name: string): void {}
}
```
