## 进程之间的通信

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

// 向主进程传递消息
ipcRenderer.send('message', 'this is a message from preload')

//
ipcRenderer.on('reply', (event, arg) => {
  console.log('接受主进程传递回来的消息', arg)
})
```

```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron')

ipcMain.on('message', (event, arg) => {
  console.log('收到preload传递过来的信息', arg)
  // event.sender.send('reply', 'hello')
  mainWindow.send('reply', 'hello')
})
```
