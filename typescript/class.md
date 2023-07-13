# 类

## TS 中的类与 ES6 的区别

- 需要先定义实例属性, 才能够使用实例属性

```ts
class Person {
  name: string // 和ES6区别, 需要先定义实例属性, 才能够使用实例属性
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  say(): void {
    console.log(`我的名称叫${this.name}, 我的年龄是${this.age}`)
  }
  static food: string // 静态属性
  static eat(): void {
    // 静态方法
    console.log(`我正在吃${this.food}`)
  }
}
let p = new Person('lisi', 18)
p.say()
Person.food = '薯条🍟'
Person.eat()
```

```ts
class Student extends Person {
  lesson: string
  constructor(name: string, age: number, lesson: string) {
    super(name, age)
    this.lesson = lesson
  }
  say(): void {
    console.log(`我是重写之后的say-${this.name}${this.age}${this.lesson}`)
  }
  static eat(): void {
    console.log(`我是重写之后的eat-${this.food}`)
  }
}
let stu = new Student('zs', 18, '从零玩转TypeScript')
stu.say()
Student.food = '汉堡'
Student.eat()
```

## 类属性(方法)修饰符

### public(公开的)

- 如果使用 public 来修饰属性（方法）, 那么表示这个属性（方法）是公开的
- 可以在类的内部使用, 也可以在子类中使用, 也可以在外部使用

### protected(受保护的)

- 如果使用 protected 来修饰属性（方法）, 那么表示这个属性（方法）是受保护的
- 可以在类的内部使用, 也可以在子类中使用

### private(私有的)

- 如果使用 private 来修饰属性（方法）, 那么表示这个属性（方法）是私有的
- 可以在类的内部使用

### readonly(只读的)

## 类可选属性和参数属性

- 和接口中的可选属性一样, 可传可不传的属性
- 在 TS 中如果定义了实例属性, 那么就必须在构造函数中使用, 否则就会报错

```ts
class Person {
  name: string
  age?: number // 可选属性
  constructor(name: string, age?: number) {
    this.name = name
    this.age = age
  }
}
let p = new Person('lisi')
console.log(p)
```

- 参数属性

```ts
// 之前的写法
class Person {
  name: string
  age: number
  constructor(name: string, age?: number) {
    this.name = name
    this.age = age
  }
}

// 代替之前的写法
class Person {
  constructor(public name: string, public age: number) {}
}
let p = new Person('lnj', 34)
console.log(p)
```

## 类存取器

- 通过 getters/setters 来截取对对象成员的访问

```ts
class Person {
  private _age: number = 0
  set age(val: number) {
    console.log('进入了set age方法')
    if (val < 0) {
      throw new Error('人的年龄不能小于零')
    }
    this._age = val
  }
  get age(): number {
    console.log('进入了get age方法')
    return this._age
  }
}
let p = new Person()
p.age = 18
```

## 抽象类

- 抽象类是专门用于定义哪些不希望被外界直接创建的类的
- 抽象类一般用于定义基类
- 抽象类和接口一样用于约束子类
- 接口中只能定义约束, 不能定义具体实现, 抽象类中可以

```ts
abstract class Person {
  abstract name: string
  abstract say(): void
  eat(): void {
    console.log(`${this.name}正在吃东西`)
  }
}
let p = new Person() // 无法创建抽象类的实例

class Student extends Person {
  name: string = 'lisi'
  say(): void {
    console.log(`我的名字是${this.name}`)
  }
}
let stu = new Student()
stu.say() // 我的名字是lisi
stu.eat() // lisi正在吃东西
```

## 类和接口

- 类实现接口

```ts
interface PersonInterface {
  name: string
  say(): void
}
// 只要实现的某一个接口, 那么就必须实现接口中所有的属性和方法
class Person implements PersonInterface {
  name: string = 'lisi'
  say(): void {
    console.log(`我的名字叫:${this.name}`)
  }
}
let p = new Person()
p.say()
```

- 接口继承类

:::tip
只要一个接口继承了某个类, 那么就会继承这个类中所有的属性和方法, 但是只会继承属性和方法的声明, 不会继承属性和方法实现

如果接口继承的类中包含了 protected 的属性和方法, 那么就只有这个类的子类才能实现这个接口
:::

```ts
class Person {
  name: string = 'lisi'
  age: number = 18
  protected say(): void {
    console.log(`name = ${this.name}, age = ${this.age}`)
  }
}

interface PersonInterface extends Person {
  gender: string
}

class Student extends Person implements PersonInterface {
  gender: string = 'male'
  name: string = 'zs'
  age: number = 18
  say(): void {
    console.log(`name = ${this.name}, age = ${this.age}, gender = ${this.gender}`)
  }
}
let stu = new Student()
stu.say()
```

## 泛型类

```ts
class Chache<T> {
  arr: T[] = []
  add(value: T): T {
    this.arr.push(value)
    return value
  }
  all(): T[] {
    return this.arr
  }
}
let chache = new Chache<number>()
chache.add(1)
chache.add(3)
chache.add(5)
console.log(chache.all())
```

## 接口合并

- 当我们定义了多个同名的接口时, 多个接口的内容会自动合并

```ts
interface TestInterface {
  name: string
}
interface TestInterface {
  age: number
}

class Person implements TestInterface {
  name: string = 'lisi',
  age: number = 18
}
```
