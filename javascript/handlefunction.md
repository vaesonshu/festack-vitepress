## 实现防抖函数

- [在线测试](https://my-plain-debounce.stackblitz.io/)

```html
<!-- 防抖 -->
<div>
  <input type="text" style="width: 300px" placeholder="请打开控制台输入内容进行测试" />
  <button class="cancel">取消</button>
</div>
```

```js
const myDebounce = function (fn, delay, immediate = false) {
  // 用于记录上一次事件触发的timer
  let timer = null
  // 设定一个状态
  let isInvoke = false
  // 触发事件时执行的函数
  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      try {
        // 如果有再次触发(或者更多的事件) 取消上一次的事件
        if (timer) clearTimeout(timer)
        // 如果立即执行 则第一次操作不需要延时
        let res = undefined
        if (immediate && !isInvoke) {
          res = fn.apply(this, args)
          resolve(res)
          // 状态改变
          isInvoke = true
          return
        }
        // 延时去执行对应的fn函数(传入的回调函数)
        timer = setTimeout(() => {
          res = fn.apply(this, args)
          resolve(res)
          timer = null // 执行过函数之后, 将timer重新置null
          isInvoke = false
        }, delay)
      } catch (error) {
        reject(error)
      }
    })
  }

  // _debouncet添加取消功能
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

// 获取input元素
const inputEl = document.querySelector('input')
// 获取取消按钮
const cancelBtn = document.querySelector('.cancel')

let counter = 1
const debounceFn = myDebounce(function (name, age, height) {
  console.log(`发送网络请求${counter++}:`, this.value)
  // console.log('测试获取返回值', name, age, height);
  // return 'ceshidata';
}, 1000)

// 监听input事件
inputEl.oninput = debounceFn

// 实现取消功能
cancelBtn.onclick = function () {
  debounceFn.cancel()
}

// 获取返回值
// debounceFn('lisi', 20, 180).then((res) => {
//   console.log('拿到结果', res);
// });
```

## 实现节流函数

### 实现简易版节流函数

- [在线测试](https://my-plain-throttle.stackblitz.io/)

```html
<input type="text" style="width: 300px" placeholder="请打开控制台输入内容进行测试" />
```

```js
// 封装简易版节流函数
function mythrottle(fn, interval, leading = true) {
  // 设置开始时间
  let startTime = 0
  const _throttle = function (...args) {
    // 获取当前时间
    const nowTime = new Date().getTime()
    // 对立即执行进行控制
    if (!leading && startTime === 0) {
      startTime = nowTime
    }
    // 获取等待时间
    const waitTime = interval - (nowTime - startTime)
    if (waitTime <= 0) {
      fn.apply(this, args)
      startTime = nowTime
    }
  }
  return _throttle
}

// 获取input元素
const inputEl = document.querySelector('input')
let counter = 1
inputEl.oninput = mythrottle(function (event) {
  console.log(`发送网络请求${counter++}:`, this.value, event)
}, 1000)
```

## 实现简易版 Promise
