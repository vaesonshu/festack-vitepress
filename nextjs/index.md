# 什么是 Next？

- [Next 官网](https://nextjs.org/)、[Next 中文网](https://www.nextjs.cn/)
- Next.js 是一个 React 框架，支持 CSR、 SSR、 SSG、 ISR (Incremental Static Regeneration)等渲染模式
- Next.js 提供了创建 Web 应用程序的构建块，比如：用户界面、路由、数据获取、渲染模式、后端服务等等
- Next.js 不但处理 React 所需的工具和配置，还提供额外的功能和优化，比如：UI 构建， CSR、 SSR、 SSG、 ISR 渲染模式， Routing、 Data Fetching 等

## Next.js 特点

- **开箱即用，快速创建：** Next.js 已经帮我集成好了各种技术栈，比如： React、 webpack、路由、数据获取、 SCSS、 TypeScript 等，也提供了专门的脚手架： create-next-app
- **约定式路由（目录结构即路由）：** Next.js 和 Nuxt3 一样，所有的路由都是根据 pages 目录结构自动生成。但在 Next.js 13 beta 版本增加了 app 目录
- **内置 CSS 模块和 Sass 支持：** 自从 Next.js 9.3 以后就内置了 CSS 模块和 Sass 支持，也是开箱即用
- **全栈开发能力：** Next.js 不但支持前端开发，还支持编写后端代码，比如：可开发登录验证、存储数据、获取数据等接口
- **多种渲染模式：** 支持 CSR、 SSR、 SSG、 ISR 等渲染模式，当然也支持混合搭配使用
- **利于搜索引擎优化：** Next.js 支持使用服务器端渲染，同时它也是一个很棒的静态站点生成器，非常利于 SEO 和首屏渲染

## Next.js VS Nuxt3

### Next.js 和 Nuxt3 的相同点

- 利于搜索引擎优化，都能提高首屏渲染速度
- 零配置，开箱即用
- 都支持目录结构即路由、支持数据获取、支持 TypeScript
- 服务器端渲染、静态网站生成、客户端渲染等
- 都需要 Node.js 服务器，支持全栈开发

### Next.js 和 Nuxt3 区别

- Next.js 使用的是 React 技术栈： React 、 webpack 、 express 、 node...
- Nuxt3 使用的是 Vue 技术栈： Vue、 webpack、 vite、 h3、 nitro、 node...
- Nuxt3 支持组件、组合 API、 Vue API 等自动导入， Next.js 则不支持
- Next.js 社区生态、资源和文档都会比 Nuxt3 友好
- star 数： Nuxt3 -> 46.2k 和 Next.js -> 100.9k

### Next.js 和 Nuxt3 如何选择？

- 首先根据自己擅长的技术栈来选择，擅长 Vue 选择 Nuxt3，擅长 React 选择 Next.js
- 需要更灵活的，选择 Next.js
- 需要简单易用、快速上手的，选择 Nuxt3

## Next.js 13 环境搭建

- 方式一： `npx create-next-app@latest --typescript`
- 方式二： `yarn create next-app --typescript`
- 方式三： `pnpm create next-app –typescript`
- 方式四： `npm i create-next-app@latest –g && create-next-app`
