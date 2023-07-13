import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_TITLE = 'FeStack'
export const META_DESCRIPTION = '前端知识笔记 前端驿栈'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: META_DESCRIPTION,

  themeConfig: {
    // editLink: {
    //   pattern: 'https://github.com/vaesonshu',
    //   text: '对本页提出修改建议'
    // },

    outline: {
      label: '本页内容'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: nav(),
    sidebar: {
      '/javascript/': [
        {
          text: '高级',
          // collapsible: true,
          collapsed: false,
          items: [
            { text: 'this指向', link: '/javascript/this.html' },
            { text: '手写函数', link: '/javascript/handlefunction.html' }
          ]
        },
        {
          text: 'ES6-11',
          // collapsible: true,
          collapsed: false,
          items: [
            { text: 'ES6', link: '/javascript/es6.html' },
            { text: 'ES7', link: '/javascript/es7.html' },
            { text: 'ES8', link: '/javascript/es8.html' },
            { text: 'ES9', link: '/javascript/es9.html' },
            { text: 'ES10', link: '/javascript/es10.html' },
            { text: 'ES11', link: '/javascript/es11.html' }
          ]
        }
      ],
      '/typescript/': [
        {
          text: 'TypeScript@4',
          // collapsible: true,
          collapsed: false,
          items: [
            { text: '基础', link: '/typescript/index.html' },
            { text: '泛型', link: '/typescript/generics.html' },
            { text: '类', link: '/typescript/class.html' },
            { text: '枚举', link: '/typescript/enum.html' },
            { text: '装饰器', link: '/typescript/decorator.html' }
          ]
        }
      ],
      '/nodejs/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/nodejs/index.html' }]
        },
        {
          text: '原理',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '原理', link: '/nodejs/theory.html' }]
        }
      ],
      '/eggjs/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/eggjs/index.html' }]
        }
      ],
      '/nestjs/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/nestjs/base.html' }]
        }
      ],
      '/nextjs/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/nextjs/base.html' }]
        }
      ],
      '/vite/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/nextjs/base.html' }]
        }
      ],
      '/webpack/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/nextjs/base.html' }]
        }
      ],
      '/rollup/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/nextjs/base.html' }]
        }
      ],
      '/esbuild/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/nextjs/base.html' }]
        }
      ],
      '/vitepress/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '基础部分', link: '/vitepress/base.html' }]
        },
        {
          text: '如何使用',
          // collapsible: true,
          collapsed: false,
          items: [{ text: 'Markdown 扩展', link: '/vitepress/markdown.html' }]
        }
      ],
      '/project/': [
        {
          text: '脚手架',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '项目简介', link: '/project/cli.html' }]
        },
        {
          text: 'Taro多端仿智行',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '项目简介', link: '/project/taro-trip.html' }]
        }
      ],
      '/react/': [
        {
          text: '基础',
          // collapsible: true,
          collapsed: false,
          items: [
            { text: '语法', link: '/react/index.html' },
            { text: '组件化', link: '/react/component.html' }
          ]
        },
        {
          text: 'API',
          // collapsible: true,
          collapsed: false,
          items: [{ text: '版本变更', link: '/react/api.html' }]
        },
        {
          text: 'Hooks',
          // collapsible: true,
          collapsed: false,
          items: [
            { text: '基础Hooks', link: '/react/hooks-base.html' },
            { text: '其他Hooks', link: '/react/hooks-other.html' },
            { text: '自定义Hooks', link: '/react/hooks-customize.html' },
            { text: '第三方Hooks', link: '/react/hooks-tools.html' },
            { text: 'Hooks使用规则', link: '/react/hooks-methods.html' }
          ]
        },
        {
          text: 'CSS',
          // collapsible: true,
          collapsed: false,
          items: [
            { text: '普通CSS', link: '/react/css-common.html' },
            { text: 'CSS-Module', link: '/react/css-module.html' },
            { text: 'CSS-in-js', link: '/react/css-in-js.html' }
          ]
        }
      ]
    }
  }
}

function nav() {
  return [
    {
      text: '指南',
      link: '/core-concepts/',
      activeMatch: '^/core-concepts/'
    },
    {
      text: '基础',
      items: [
        {
          text: 'HTML5',
          link: '/html/'
        },
        {
          text: 'CSS3',
          link: '/css/'
        },
        {
          text: 'JavaScript',
          link: '/javascript/'
        },
        {
          text: 'TypeScript',
          link: '/typescript/'
        },
        {
          text: 'Node',
          link: '/nodejs/'
        }
      ]
    },
    {
      text: '工程化',
      items: [
        {
          text: 'Webpack',
          link: 'https://webpack.docschina.org/'
        },
        {
          text: 'Vite',
          link: 'https://cn.vitejs.dev/'
        },
        {
          text: 'Rollup',
          link: 'https://cn.rollupjs.org/'
        },
        {
          text: 'ESbuild',
          link: 'https://esbuild.bootcss.com/'
        }
      ]
    },
    {
      text: '框架',
      items: [
        {
          text: 'Vue',
          link: 'https://cn.vuejs.org/'
        },
        {
          text: 'React',
          link: 'https://react.nodejs.cn/'
        },
        {
          text: 'Nest',
          link: '/nestjs/'
        },
        {
          text: 'Egg',
          link: '/eggjs/'
        },
        {
          text: 'Express',
          link: 'https://express.nodejs.cn/'
        },
        {
          text: 'Nuxt',
          link: '/nuxtjs/'
        },
        {
          text: 'Next',
          link: '/nextjs/'
        },
        {
          text: 'VitePress',
          link: '/vitepress/'
        }
      ]
    },
    {
      text: '项目',
      items: [
        {
          text: '可用于提效的脚手架',
          link: '/project/cli'
        }
        // {
        //   text: 'codesandbox',
        //   link: 'https://codesandbox.io/code-in-sandboxes'
        // }
      ]
    },
    {
      text: '沙盒平台',
      items: [
        {
          text: 'stackblitz',
          link: 'https://stackblitz.com/'
        },
        {
          text: 'codesandbox',
          link: 'https://codesandbox.io/code-in-sandboxes'
        }
      ]
    }
  ]
}
