# 自定义 Hooks

## 修改网页标题

- 第一步，直接在组件内部写
- 第二步，可以抽离一个函数
- 第三步，可以直接抽离一个文件 src/hooks/useTitle.ts ，引用使用

:::tip
抽离自定义 Hook ，可用于很多组件，**复用代码**
:::

```ts
// useTitle.ts
import { useEffect } from 'react'

function useTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [])
}

export default useTitle

// App.tsx
import useTitle from './hooks/useTitle'
function App() {
  useTitle('App')
}
```

## 获取鼠标位置

```ts
// useMouse.ts
import { useState, useEffect, useCallback } from 'react'

// 获取鼠标位置（自定义 Hook）
function useMouse() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    setX(event.clientX)
    setY(event.clientY)
  }, [])

  useEffect(() => {
    // 监听鼠标事件
    window.addEventListener('mousemove', mouseMoveHandler)

    // 组件销毁时，一定要解绑 DOM 事件，否则可能会出现组件内存泄漏问题
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return { x, y }
}

export default useMouse

// App.tsx
import useMouse from './hooks/useMouse'
function App() {
  const { x, y } = useMouse()
}
```

## 异步获取信息

```ts
import { useState, useEffect } from 'react'

// 异步获取信息
function getInfo(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now().toString())
    }, 1500)
  })
}

const useGetInfo = () => {
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState('')

  useEffect(() => {
    getInfo().then((info) => {
      setLoading(false)
      setInfo(info)
    })
  }, [])

  return { loading, info }
}

export default useGetInfo

// App.tsx
import useGetInfo from './hooks/useGetInfo'
function App() {
  const { loading, info } = useGetInfo()

  return (
    <>
      <p>{loading ? '加载中...' : info}</p>
    </>
  )
}
```

:::tip
自定义 Hooks 可以抽离公共逻辑，复用到多个组件中 —— 这是 Hooks 设计的初衷

在 Hooks 和函数组件之前，class 组件也有一些方法：mixin HOC render-prop 等，但都没有 Hooks 来的简单。
:::
