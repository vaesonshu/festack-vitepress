# React 的组件化

## 组件的分类

- React 的组件相对于 Vue 更加的灵活和多样，按照不同的方式可以分成很多类组件
- 根据组件的定义方式，可以分为：函数组件(Functional Component )和类组件(Class Component)
- 根据组件内部是否有状态需要维护，可以分成：无状态组件(Stateless Component )和有状态组件(Stateful Component)
- 根据组件的不同职责，可以分成：展示型组件(Presentational Component)和容器型组件(Container Component)
- 函数组件、无状态组件、展示型组件主要关注 UI 的展示，类组件、有状态组件、容器型组件主要关注数据逻辑

## 类组件

- 组件的名称是大写字符开头（无论类组件还是函数组件）
- 类组件需要继承自  React.Component
- 类组件必须实现 render 函数

```js
import React from 'react'

// 1.类组件
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      message: 'App Component'
    }
  }

  render() {
    return <div>{message}</div>
  }
}

export default App
```

## 函数组件

- 函数组件是使用 function 来进行定义的函数，只是这个函数会返回和类组件中 render 函数返回一样的内容
- 函数组件没有生命周期，也会被更新并挂载，但是没有生命周期函数，this 关键字不能指向组件实例（因为没有组件实例），没有内部状态（state）

```js
// 函数式组件
function App(props) {
  // 返回值: 和类组件中render函数返回的是一致
  return <h1>App Functional Component</h1>
}

export default App
```

## 生命周期

### Constructor

- 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数
- constructor 中通常只做两件事情，通过给  this.state  赋值对象来初始化内部的 state，为事件绑定实例（this）

### componentDidMount

- componentDidMount()  会在组件挂载后（插入 DOM 树中）立即调用
- componentDidMount 中通常进行哪里操作呢？
- 依赖于 DOM 的操作可以在这里进行，在此处发送网络请求就最好的地方（官方建议），可以在此处添加一些订阅（会在 componentWillUnmount 取消订阅）

### componentDidUpdate

- componentDidUpdate()  会在更新后会被立即调用，首次渲染不会执行此方法，当组件更新后，可以在此处对 DOM 进行操作
- 如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求；（例如，当 props 未发生变化时，则不会执行网络请求）

### componentWillUnmount

- componentWillUnmount()  会在组件卸载及销毁之前直接调用，在此方法中执行必要的清理操作
- 例如，清除 timer，取消网络请求或清除在  componentDidMount()  中创建的订阅等

### getDerivedStateFromProps

- state 的值在任何时候都依赖于 props 时使用；该方法返回一个对象来更新 state

### getSnapshotBeforeUpdate

- 在 React 更新 DOM 之前回调的一个函数，可以获取 DOM 更新前的一些信息（比如说滚动位置）

### shouldComponentUpdate

- 主要用于性能优化

## 组件间的通信

### 父传子

- 父组件通过 属性=值 的形式来传递给子组件数据
- 子组件通过 props 参数获取父组件传递过来的数据

### 子传父

- 通过 props 传递消息，只是让父组件给子组件传递一个回调函数，在子组件中调用这个函数即可

## 插槽

- 使用 props 实现插槽

```js
// 父组件
export class App extends Component {
  render() {
    const btn = <button>按钮</button>

    return (
      <div>
        {/* 使用props实现插槽 */}
        <NavBar leftSlot={btn} centerSlot={<h2>这是一段文字</h2>} rightSlot={<i>斜体</i>} />
      </div>
    )
  }
}

// 子组件
export class NavBar extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props
    return (
      <div className="nav-bar">
        <div className="left">{leftSlot}</div>
        <div className="center">{centerSlot}</div>
        <div className="right">{rightSlot}</div>
      </div>
    )
  }
}
```
