## 入口 App 组件（\_app.tsx）

- `_app.tsx` 是项目的入口组件，主要作用：
- 可以扩展自定义的布局（Layout）
- 引入全局的样式文件
- 引入 Redux 状态管理
- 引入主题组件等等
- 全局监听客户端路由的切换

## ts.config.json 的配置

- Next.js 默认是没有配置路径别名的，我们可以在 ts.config.json 中配置模块导入的别名
- baseUrl：配置允许直接从项目的根目录导入，比如： import Button from 'components/button'
- paths：允许配置模块别名，比如： import Button from '@/components/button’

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
      "@/components/*": ["components/*"],
      "@/styles/*": ["styles/*"],
      "@/assets/*": ["assets/*"],
      "@/service/*": ["service/*"],
      "@/store/*": ["store/*"]
    }
}
```

## 环境变量（.env\*）

### 定义环境变量的 4 种方式：

- .env：所有环境下生效的默认设置
- .env.development： 执行 next dev 时加载并生效
- .env.production ： 执行 next start 时加载并生效
- .env.local ：始终覆盖上面文件定义的默认值。 所有环境生效，通常只需一个 .env.local 文件就够了（常用存储敏感信息）

### 环境变量定义语法（支持变量，例如 $PORT )：

- 大写单词，多个单词使用下划线，比如： `DB_HOST=localhost`
- 添加 `NEXT_PUBLIC_` 前缀会额外暴露给浏览器，比如： `NEXT_PUBLIC_ANALYTICS_ID=abc`

### 环境变量的获取：

- .env 文件中定义环境变量会加载到 process.env 中。两端都可直接通过 process.env.xxx 访问使用（不支持解构）

::: tip

- 由于 .env、 .env.development 和 .env.production 文件定义了默认设置，需提交到源码仓库中
- 而 .env.\*.local 应当添加到 .gitignore 中，因为这类文件是需要被忽略的

:::

## Next.js 配置（next.config）

- next.config.ts 配置文件位于项目根目录，可对 Next.js 进行自定义配置，比如，可以进行如下配置：
- reactStrictMode: 是否启用严格模式，辅助开发，避免常见错误，例如：可以检查过期 API 来逐步升级
- env：配置环境变量， 配置完需要重启，会添加到 process.env.xx 中，配置的优先级： next.config.js 中的 env > .env.local > .env
- basePath：要在域名的子路径下部署 Next.js 应用程序，您可以使用 basePath 配置选项，basePath：允许为应用程序设置 URl 路径前缀，例如 basePath=/music, 即用 /music 访问首页，而不是默认 /
- images：可以配置图片 URL 的白名单等信息
- swcMinify: 用 Speedy Web Compiler 编译和压缩技术，而不是 Babel + Terser 技术
- 更多的配置： [https://nextjs.org/docs/api-reference/next.config.js/introduction]

## 内置组件

- Head：用于将新增的标签添加到页面的 head 标签中，需要从 next/head 中导入，如果想要给所有页面统一添加的，那需在 pages 目录下新建 \_document.js 文件来定制 HTML 页面
- Script： 将一个 script 标签到页面的 body 中（不支持在\_document.js 中用），需要从 next/script 中导入
- Link：可以启用客户端的路由切换，需从 next/link 导入
- Image：内置的图片组件（对 img 的增强）。需从 next/image 导入

## 全局和局部样式

- Next.js 允许在 JavaScript 文件中直接通过 import 关键字来导入 CSS 文件

### 全局样式

- 在 assets 目录或 styles 目录下编写，然后在 pages/\_app.js 入口组件中导入
- 也支持导入 node_modules 中样式， 导入文件后缀名不能省略

### 局部样式

- Next.js 默认是支持 CSS Module 的，如： [name].module.css
- CSS Module 中的选择器会自动创建一个唯一的类名
- 唯一类名保证在不同的文件中使用相同 CSS 类名，也不用担心冲突

### 内置 Scss 支持

- 用 scss 之前，需安装 Sass： `npm i sass –D`
- xx.module.scss 文件:export 中定义的变量， 可导出供 JavaScript 中用

## 静态资源引用

### public 目录

- 常用于存放静态文件，例如： robots.txt、 favicon.ico、 img 等，并直接对外提供访问
- 访问需以 / 作为开始路径，例如：添加了一张图片到 public/me.png 中，可通过静态 URL： /me.png 访问，静态 URL 也支持在背景中使用，确保静态文件中没有与 pages/ 下的文件重名，否则导致错误

### assets 目录

- 常用存放样式、字体 、图片或 SVG 等文件
- 可用 import 导入 位于 assets 目录的文件，支持相对路径和绝对路径，`import Avatar from "@/assets/images/avatar.png"`
- 背景图片和字体： `url("~/assets/images/bym.png")`

## 字体图标

- 将字体图标存放在 assets 目录下
- 字体文件可以使用相对路径和绝对路径引用
- 在 `_app.tsx` 文件中导入全局样式
- 在页面中就可以使用字体图标了

## 新建页面

- Next.js 项目页面需在 pages 目录下新建（ .js, .jsx, .ts, or .tsx ） 文件，该文件需导出的 React 组件
- Next.js 会根据 pages 目录结构和文件名，来自动生成路由
- 新建一个命名为 `pages/about.jsx` 组件文件，并导出（export） React 组件
- 接着通过 /about 路径，就可访问新创建的页面了

:::tip
Nuxt3 需要添加`<NuxtPage>`内置组件占位， Next.js 则不需要
:::

## 组件导航（Link）

- 页面之间的跳转需要用到`<Link>`组件，需从 next/link 包导入
- Link 组件底层实现是一个 `<a>` 标签，所以使用 a + href 也支持页面切换（不推荐, 会默认刷新浏览器）
- `<Link>`组件属性：

```ts
// 字符类型：
<Link href='/'></Link>
<Link href='/home'></Link>
<Link href='/about'></Link>

// 对象类型：
<Link href={{
  pathname: '/blog[slug]',
  query: { slug: post.slug }
}}>
  {post.title}
</Link>

// URL：外部网址
<Link href="https://www.baidu.com">点击跳转到百度首页</Link>
```

- as：在浏览器的 URL 栏中显示的路径的别名
- replace： 替换当前 url 页面， 而不是将新的 url 添加到堆栈中，默认为 false
- target：和 a 标签的 target 一样，指定何种方式显示新页面

## 编程导航 (useRouter)

- Next13 除了可以通过`<Link>`组件来实现导航，同时也支持使用编程导航
- 编程导航可以轻松的实现动态导航了，缺点就是不利于 SEO
- 我们可以从 next/router 中导入 useRouter 函数（或 class 中用 withRouer），调用该函数可以拿到 router 对象进行编程导航

:::tip router 对象的方法：

- push( url [, as , opts] ): 页面跳转
- replace( url [, as , opts] ): 页面跳转（会替换当前页面）
- back(): 页面返回
- events.on(name, func): 客户端路由的监听，建议在`_app.tsx` 监听
  - routeChangeStart
  - routeChangeComplete
- beforePopState: 路由的返回和前进的监听，建议在`_app.tsx` 监听

:::

## 动态路由

- Next.js 也是支持动态路由，并且也是根据目录结构和文件的名称自动生成
- 页面组件目录 或 页面组件文件都 支持 [ ] 方括号语法（方括号前后不能有字符串）
- 方括号里编写的字符串就是：动态路由的参数
- `pages/detail/[id].tsx -> /detail/:id`
- `pages/detail/[role]/[id].tsx -> /detail/:role/:id`

## 路由参数(useRouter)

### 动态路由参数

- 通过 [] 方括号 语法定义动态路由，比如： `/post/[id].tsx`
- 页面跳转时，在 URL 路径中传递动态路由参数，比如： `/post/10010`
- 动态路由参数将作为查询参数发送到目标页面，并与其他查询参数合并
- 目标页面通过 router.query 获取动态路由参数（注意： Next.js 是 router， Nuxt3 是 route）

### 查询字符串参数

- 页面跳转时，通过查询字符串方式传递参数，比如： `/post/10010?name=lisi`
- 目标页面通过 router.query 获取查询字符串参数
- 如果路由参数和查询参数相同，那么 路由参数 将覆盖同名的 查询参数

## 404 Page

### 方式一：捕获所有不匹配的路由（即 404 not found 页面）

- 通过在方括号内添加三个点 ，如： `[...slug].tsx` 语法， 如在其它目录下的话，仅作用于该目录以及子目录
- `[...slug]` 匹配的参数将作为查询参数发送到页面，并且它始终是一个数组

### 方式二（推荐）：在 pages 根目录新建 404.tsx 页面（注意：只支持根目录）

- 当然还支持 `500.tsx` 文件，即客户端或者服务器端报错

## 路由匹配规则

- 路由匹配优先级， 即预定义路由优先于动态路由，动态路由优先于捕获所有路由
- 预定义路由： `pages/post/create.js --> /post/create`
- 动态路由 ： `pages/post/[pid].js --> /post/1, /post/abc`
- 捕获所有路由： `pages/post/[...slug].js --> /post/1/2, /post/a/b/c`
