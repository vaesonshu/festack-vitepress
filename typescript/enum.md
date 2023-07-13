# 枚举

## 数字枚举

- 默认情况下就是数字枚举

```ts
enum Gender {
  Male,
  Female
}
console.log(Gender.Male)
console.log(Gender.Female)
```

- 数字枚举的取值默认从 0 开始递增
- 数字枚举的取值可以是字面量, 也可以是常量, 也可以是计算的结果

```ts
const num = 111
function getNum() {
  return 222
}

// 如果使用常量给前面的枚举值赋值了, 那么后面的枚举值也需要手动的赋值
enum Gender {
  Male = 6,
  Male = num,
  Female = 8
}

// 如果使用计算结果给前面的枚举值赋值了, 那么后面的枚举值也需要手动的赋值
enum Gender {
  Male = getNum(),
  Female = 333
}
```

- 枚举反向映射
- 可以根据枚举值获取到原始值
- 也可以根据原始值获取到枚举值

```ts
enum Gender {
  Male,
  Female
}
console.log(Gender.Male) // 0
console.log(Gender[0]) // Male
```

## 字符串枚举

:::tip
和数字枚举不一样, 字符串枚举不能使用常量或者计算结果给枚举值赋值

虽然字符串枚举不能够使用常量或者计算结果给枚举值赋值, 但是它可以使用内部的其它枚举值来赋值
:::

```ts
// 如果使用字符串给前面的枚举值赋值了, 那么后面的枚举值也必须手动赋值
enum Gender {
  Male = 'male',
  Female = 'female',
  You = Female
}
console.log(Gender.Male)
console.log(Gender.Female)
console.log(Gender.You)
```

## 异构枚举

- 枚举中既包含数字又包含字符串, 我们就称之为异构枚举

```ts
enum Gender {
  Male = 123,
  Female = '456'
}

console.log(Gender.Male)
console.log(Gender.Female)
console.log(Gender[123])
// 如果是字符串枚举, 那么无法通过原始值获取到枚举值
// console.log(Gender['456'])
```

## 枚举成员类型

- 我们就可以把枚举成员当做类型来使用

```ts
enum Gender {
  Age = 18,
  Gender = 'male'
}
interface EnumInterface {
  age: Gender.Age
}
class Person implements EnumInterface {
  age: Gender.Age
  // age: Gender.Gender // 由于类型不匹配, 所以会报错
  // age: 0 // 由于数字枚举的本质就是数值, 所以这里写一个数值也不会报错

  // age: Gender.Male
  // age: Gender.Female
  // age: 'female' // 如果是字符串枚举, 那么只能是枚举成员的值, 不能是其它的值
}
```

## 联合枚举类型

- 联合类型就是将多种数据类型通过|连接起来
- 我们可以把枚举类型当做一个联合类型来使用

```ts
enum Gender {
  Male,
  Female
}
interface TestInterface {
  age: Gender // 相当于 age: (Gender.Male | Gender.Female)
}
class Person implements TestInterface {
  // age: Gender.Male
  age: Gender.Female
}
```

## 运行时枚举

- 枚举在编译之后是一个真实存储的对象, 所以可以在运行时使用
- 而像接口这种只是用来做约束做静态检查的代码, 编译之后是不存在的

```ts
interface TestInterface {
  name: string
  age: number
}
enum Gender {
  Male,
  Female
}
```

## 常量枚举

- 普通枚举会生成真实存在的对象
- 常量枚举不会生成真实存在的对象, 而是利用枚举成员的值直接替换使用到的地方

```ts
enum Gender1 {
  Male,
  Female
}
console.log(Gender1.Male === 0)

const enum Gender2 {
  Male,
  Female
}
console.log(Gender2.Male === 0)
```
