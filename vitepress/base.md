## 安装

::: code-group

```sh [npm]
$ npm install -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

:::

## 路由

- 目录结构

```
.
├─ guide
│  ├─ getting-started.md
│  └─ index.md
├─ index.md
└─ prologue.md
```

- 生成的超文本标记语言页面

```
index.md                  -->  /index.html (accessible as /)
prologue.md               -->  /prologue.html
guide/index.md            -->  /guide/index.html (accessible as /guide/)
guide/getting-started.md  -->  /guide/getting-started.html
```

- .vitepress 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的保留位置

```
.
├─ docs                    # project root
│  ├─ .vitepress           # config dir
│  ├─ getting-started.md
│  └─ index.md
└─ ...
```

- 页面之间的链接，省略文件扩展名

```md
<!-- Do -->

[Getting Started](./getting-started)
[Getting Started](../guide/getting-started)

<!-- Don't -->

[Getting Started](./getting-started.md)
[Getting Started](./getting-started.html)
```

## 用法

::: details Getting missing peer deps warnings?
If using PNPM, you will notice a missing peer warning for `@docsearch/js`. This does not prevent VitePress from working. If you wish to suppress this warning, add the following to your `package.json`:

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search",
      "search-insights"
    ]
  }
}
```

:::
