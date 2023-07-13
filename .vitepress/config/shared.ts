import { defineConfig, HeadConfig } from 'vitepress'

// export const META_IMAGE = 'https://'
// export const isProduction = process.env.NETLIFY && process.env.CONTEXT === 'production'

// if (process.env.NETLIFY) {
//   console.log('Netlify build', process.env.CONTEXT)
// }

// const productionHead: HeadConfig[] = [
//   [
//     'script',
//     {
//       src: 'https://',
//       async: '',
//       type: 'text/javascript'
//     }
//   ]
// ]

export const sharedConfig = defineConfig({
  title: 'Festack',
  appearance: 'dark',

  markdown: {
    theme: {
      dark: 'dracula-soft',
      light: 'vitesse-light'
    },

    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%'
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/festack.ico' }]
    // ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],

    // Top banner
    // [
    //   'script',
    //   {
    //     src: 'https://',
    //     async: true,
    //     type: 'text/javascript'
    //   }
    // ],

    // ...(isProduction ? productionHead : [])
  ],

  themeConfig: {
    search: {
      provider: 'local'
    },
    // logo: '/festack.ico',
    outline: [2, 3],

    socialLinks: [
      // { icon: 'twitter', link: 'https://' },
      // {
      //   icon: 'github',
      //   link: 'https://'
      // },
      // {
      //   icon: 'discord',
      //   link: 'https://'
      // }
    ],

    footer: {
      message: 'Powered By VitePress'
    }

    // editLink: {
    //   pattern: 'https://github.com',
    //   text: 'Suggest changes'
    // },

    // algolia: {
    //   appId: '',
    //   apiKey: '',
    //   indexName: ''
    // },

    // carbonAds: {
    //   code: ',
    //   placement: ''
    // }
  }
})
