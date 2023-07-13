## 渲染页面 api 发生变化

- React18 之前: ReactDOM.render

```js
ReactDOM.render(<h2>WorldHello </h2>, document.querySelector('#root'))
```

- React18 之后:

```js
const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<h2>Hello World</h2>)
```
