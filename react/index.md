# 基本语法

## JSX 是什么？

- JSX 是一种 JavaScript 的语法扩展（extension），也在很多地方称之为 JavaScript XML，因为看起来就是一段 XML 语法
- 它用于描述我们的 UI 界面，并且其完成可以和 JavaScript 融合在一起使用
- 它不同于 Vue 中的模块语法，你不需要专门学习模块语法中的一些指令（比如 v-for、 v-if、 v-else、 v-bind）

## 为什么 React 选择了 JSX？

- React 认为渲染逻辑本质上与其他 UI 逻辑存在内在耦合，比如 UI 需要绑定事件（button、 a 原生等等），比如 UI 中需要展示数据状态，比如在某些状态发生改变时，又需要改变 UI
- 他们之间是密不可分，所以 React 没有将标记分离到不同的文件中，而是将它们组合到了一起，这个地方就是组件（Component）
- JSX 其实是嵌入到 JavaScript 中的一种结构语法

## JSX 的书写规范

- jsx 的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个 div 元素（或者使用 Fragment）
- jsx 结构通常会包裹一个`()`，将整个 jsx 当做一个整体，这样可以方便阅读，并且 jsx 可以进行换行书写
- jsx 可以是单标签，也可以双标签， 但是单标签必须以 `/>` 结尾
- jsx 的注释 `{/* 以这种形式表示注释 */}`

:::tip 注意事项

- 当变量是 Number/String/Array 时 可以直接显示出来
- 当变量是 undefined/null/Boolean 时，直接展示不会显示内容，但是转化为字符串之后可以显示本体
- Object 类型不能作为子元素进行显示
- 可以插入对应的表达式
- 可以调用方法获取结果

:::

## JSX 的本质

- 实际上， jsx 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖
- 所有的 jsx 最终都会被转换成 `React.createElement` 的函数调用，最终创建出来一个 ReactElement 对象
- React 利用 ReactElement 对象组成了一个 JavaScript 的对象树，这个对象树就是虚拟 DOM（Virtual DOM）

## 声明式编程

- 虚拟 DOM 帮助我们从命令式编程转到了声明式编程的模式
- React 官方的说法： Virtual DOM 是一种编程理念，在这个理念中， UI 以一种理想化或者说虚拟化的方式保存在内存中，并且它是一个相对简单的 JavaScript 对象
- 我们可以通过 ReactDOM.render 让 虚拟 DOM 和 真实 DOM 同步起来，这个过程中叫做协调（Reconciliation）
- 这种编程的方式赋予了 React 声明式的 API：你只需要告诉 React 希望让 UI 是什么状态，React 来确保 DOM 和这些状态是匹配的，你不需要直接进行 DOM 操作，就可以从手动更改 DOM、属性操作、事件处理中解放出来

## React 事件绑定

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写，我们需要通过{}传入一个事件处理函数，这个函数会在事件发生时被执行
- 在事件执行后，我们可能需要获取当前类的对象中相关的属性，这个时候需要用到 this，如果我们这里直接打印 this，也会发现它是一个 undefined
- 原因是 btnClick 函数并不是我们主动调用的，而且当 button 发生改变时， React 内部调用了 btnClick 函数，而它内部调用时，并不知道要如何绑定正确的 this

```js
// 定义App根组件
class App extends React.Component {
  // class fields
  name = 'App'

  constructor() {
    super()
    this.state = {
      message: 'Hello World',
      counter: 100
    }

    this.btn1Click = this.btn1Click.bind(this)
  }

  btn1Click() {
    console.log('btn1Click', this)
    this.setState({ counter: this.state.counter + 1 })
  }

  btn2Click = () => {
    console.log('btn2Click', this)
    this.setState({ counter: 1000 })
  }

  btn3Click() {
    console.log('btn3Click', this)
    this.setState({ counter: 9999 })
  }

  render() {
    const { message } = this.state

    return (
      <div>
        {/* 1.this绑定方式一: bind绑定 */}
        <button onClick={this.btn1Click}>按钮1</button>

        {/* 2.this绑定方式二: ES6 class fields */}
        <button onClick={this.btn2Click}>按钮2</button>

        {/* 3.this绑定方式三: 直接传入一个箭头函数(推荐) */}
        <button onClick={() => console.log('btn3Click')}>按钮3</button>

        <button onClick={() => this.btn3Click()}>按钮3</button>

        <h2>当前计数: {this.state.counter}</h2>
      </div>
    )
  }
}
```

## this.setState 的作用

- 将 state 中的值修改掉
- 自动重新执行 render 函数
