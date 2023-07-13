# 其他 Hooks

## useRef

- 一般用于操作 DOM 元素

```ts
import React, { FC, useRef } from 'react'
const Demo: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  function selectInput() {
    const inputElem = inputRef.current
    if (inputElem) inputElem.select() // DOM 节点，DOM 操作 API
  }

  return (
    <div>
      <input ref={inputRef} defaultValue="hello world" />
      <button onClick={selectInput}>选中 input</button>
    </div>
  )
}
```

- 也可以传入 JS 值，但更新时不会触发 rerender，需替换为 useState
  :::tip
  如果有变量不想在 jsx 中显示的话，最好使用 useRef
  :::

```ts
const Demo: FC = () => {
  const nameRef = useRef('react') // 不是 DOM 节点，普通的 JS 变量

  function changeName() {
    nameRef.current = 'raect-native' // 修改 ref 值，不会触发 rerender 使用 state 修改会触发组件 rerender
    // console.log(nameRef.current)
  }

  return (
    <>
      <p>name {nameRef.current}</p>
      <div>
        <button onClick={changeName}>change name</button>
      </div>
    </>
  )
}
```

## useMemo

- 函数组件，默认，每次 state 变化都会重新执行
- useMemo 可以缓存某个数据，不用每次都重新生成
- 可用于计算量比较大的数据场景

:::tip
[你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)，useMemo 的控制权在 React ，不一定保证每个都会缓存，但都是为了全局的性能最佳。
:::

```ts
import React, { FC, useMemo, useState } from 'react'

const Demo: FC = () => {
  console.log('demo...')

  const [num1, setNum1] = useState(10)
  const [num2, setNum2] = useState(20)
  const [text, setText] = useState('hello') // 更新，导致组件 rerender

  const sum = useMemo(() => {
    console.log('gen sum...') // 缓存
    return num1 + num2
  }, [num1, num2])

  return (
    <>
      <p>{sum}</p>
      <p>
        {num1} <button onClick={() => setNum1(num1 + 1)}>add num1</button>
      </p>
      <p>
        {num2} <button onClick={() => setNum2(num2 + 1)}>add num2</button>
      </p>
      <div>
        {/* form 组件，受控组件 */}
        <input onChange={(e) => setText(e.target.value)} value={text}></input>
      </div>
    </>
  )
}
```

## useCallback

useCallback 就是 useMemo 的语法糖，和 useMemo 一样。用于缓存函数。
