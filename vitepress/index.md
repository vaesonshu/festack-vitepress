# [VitePress 官网](https://vitepress.dev/)

## 什么是 VitePress？

- VitePress 是一个静态站点生成器（SSG），旨在构建快速、以内容为中心的网站。简而言之，VitePress 获取用 Markdown 编写的源内容，将主题应用于其中，并生成可以轻松部署在任何地方的静态超文本标记语言页面。
- VitePress 支持完全自定义的主题，具有标准 Vite+Vue 应用程序的开发人员体验。基于 Vite 构建也意味着您可以直接利用其丰富生态系统中的 Vite 插件。此外，VitePress 提供灵活的 API 来加载数据（本地或远程）并动态生成路由。只要数据可以在构建时确定，您几乎可以使用它来构建任何东西。
- 这些网站都在使用 VitePress，[Vite](https://vitejs.dev/), [Pinia](https://pinia.vuejs.org/), [VueUse](https://vueuse.org/), [Rollup](https://rollupjs.org/), [Mermaid](https://mermaid.js.org/), [Wikimedia Codex](https://doc.wikimedia.org/codex/latest/)，官方的 [Vue.js 文档](<(https://vuejs.org/)>) 也基于 VitePress，但使用多个翻译之间共享的自定义主题。

## 开发者体验

- Vite-Powded：即时服务器启动，编辑总是立即反映（<100 毫秒），无需重新加载页面。
- 内置 Markdown 扩展：前端、表格、语法高亮…你能想到的。具体来说，VitePress 提供了许多用于处理代码块的高级功能，使其成为高技术留档的理想选择。
- Vue-增强 Markdown：由于 Vue 模板与超文本标记语言的 100%语法兼容性，每个 Markdown 页面也是一个 Vue 单文件组件。您可以使用 Vue 模板功能或导入的 Vue 组件在静态内容中嵌入交互性。

## 性能表现

- 与许多传统的 SSG 不同，VitePress 生成的网站实际上是一个单页应用程序（SPA）
