## NestJS 介绍

- Nest 是一个渐进的 Node.js 框架， 可以在 TypeScript 和 JavaScript (ES6、 ES7、 ES8)之上构
  建高效、 可伸缩的企业级服务器端应用程序。
- Nest 基于 TypeScript 编写并且结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的相关理念。
  在设计上的很多灵感来自于 Angular，Angular 的很多模式又来自于 Java 中的 Spring 框架，依赖注入、面向切面编程等，
  所以我们也可以认为：Nest 是 Node.js 版的 Spring 框架。
- Nest 框架底层 HTTP 平台默认是基于 Express 实现的，所以无需担心第三方库的缺失。Nest 旨在成为一个与平台无关的框架。
  通过平台，可以创建可重用的逻辑部件，开发人员可以利用这些部件来跨越多种不同类型的应用程序。从技术上讲，Nest 可以在创建适配器后使用任何 Node HTTP 框架。
  有两个支持开箱即用的 HTTP 平台：express 和 fastify。您可以选择最适合您需求的产品。
- NestJs 的核心思想：就是提供了一个层与层直接的耦合度极小，抽象化极高的一个架构体系。
- NestJs 的特性：依赖注入容器、模块化封装、可测试性、内置支持 TypeScript、可基于 Express 或者 fastify
- 官网：[https://nestjs.com]
- 中文网站：[https://docs.nestjs.cn]

## 安装 Nest CLI：

- `npm i -g @nestjs/cli 或者 cnpm i -g @nestjs/cli 或者 yarn global add @nestjs/cli`

## 创建项目、运行

- `nest new nestdemo`
- `cd nestdemo`
- `yarn run start`

## NestJS 中的控制器

- Nest 中的控制器层负责处理传入的请求, 并返回对客户端的响应。
- 控制器的目的是接收应用的特定请求。 路由机制控制哪个控制器接收哪些请求。 通常，每个控制器有多个路由， 不同的路由可以执行不同的操作。
- 通过`nest g controller news`创建控制器。

## NestJS 中的路由

- Nestjs 中没有单独配置路由的地方。定义好控制器后 nestjs 会自动给我们配置对应的路由。
- 关于 nest 的 return： 当请求处理程序返回 JavaScript 对象或数组时， 它将自动序列化为 JSON。
  但是， 当它返回一个字符串时， Nest 将只发送一个字符串而不是序列化它。 这使响应处理变得简单： 只需要返回值， Nest 负责其余部分。

```ts
// article.controller.ts
import { Controller, Get } from '@nestjs/common'

@Controller('article')
export class ArticleController {
  // http://localhost:3000/article
  @Get()
  index() {
    return '我是一个文章页面'
  }
  @Get('add')
  addArticle() {
    return '增加新闻'
  }
}
```

## NestJS 中的 Get Post 以及通过方法参数装饰器获取传值

- 在 Nestjs 中获取 Get 传值或者 Post 提交的数据的话我们可以使用 Nestjs 中的装饰器来获取。

```ts
// user.controller.ts
import { Controller, Get, Query, Request, Post, Body } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Get()
  index() {
    return '用户中心'
  }
  // 通过@Query装饰器获取get传值  http://localhost:3000/user/add?id=123&name=zhangsan
  @Get('add')
  addData(@Query() query) {
    console.log(query)
    return query
  }
  // 通过Request装饰器获取get传值
  @Get('edit')
  editData(@Request() req) {
    console.log(req.query)
    return '通过Request获取get传值'
  }
  //通过@Body()装饰器获取post传值
  @Post('create')
  create(@Body() body) {
    console.log('触发了post')
    console.log(body)
    return '我是post方法'
  }
}
```

## NestJS 中的动态路由

- 当您需要接受动态数据作为请求的一部分时， 具有静态路径的路由将不起作用（例如， GET/cats/1)获取具有 id 的 cat 1）。
  为了定义带参数的路由， 我们可以在路由中添加路由参数标记， 以捕获请求 URL 中该位置的动态值。 @Get() 下面的装饰器示例中的路由参数标记演
  示了此用法。 可以使用 @Param() 装饰器访问以这种方式声明的路由参数， 该装饰器应添加到函数签名中。

```ts
// news.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common'

@Controller('news')
export class NewsController {
  //http://localhost:3000/news/adda
  @Get('a*a')
  indexA() {
    // Query.id
    return '新闻增加 模糊匹配'
  }

  @Get('add')
  addData(@Query('id') id) {
    // Query.id
    console.log(id)
    return '新闻增加'
  }

  //获取动态路由   http://localhost:3000/news/123       http://localhost:3000/news/xxxxx
  @Get(':id')
  index(@Param() param) {
    console.log(param)
    return '这是新闻页面'
  }
}
```

## NestJS 中配置静态资源、模版引擎

- 在根目录新建 public 目录， 然后在目录里面保存一个图片比如 1.jpg， 这样就可以通过 http://localhost:3000/1.jpg 来访问图片。
- 我们也可以配置虚拟目录， 比如我们想通过 http://localhost:3000/static/1.jpg 来访问 public 目录里面的文件。

```ts
// main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// 引入此包来配置静态资源
import { NestExpressApplication } from '@nestjs/platform-express'

import { join } from 'path'

async function bootstrap() {
  const app = (await NestFactory.create)<NestExpressApplication>(AppModule)
  // app.useStaticAssets('public');  // 配置静态资源目录

  // app.useStaticAssets('public', {   // 配置虚拟目录
  //   prefix: '/static/'
  // })

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    // 配置虚拟目录
    prefix: '/static/' // 设置虚拟路径
  })

  // 注意首先必须安装模板引擎  npm i ejs --save
  app.setBaseViewsDir('views')
  app.setViewEngine('ejs')

  await app.listen(3000)
}
bootstrap()
```

```ts
// user.controller.ts
import { Controller, Get, Render, Post, Body, Response } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('default/index') // views/default/index.ejs
  getHello() {
    return { name: '张三', age: '20' }
  }

  @Post('doAdd')
  doAdd(@Body() body, @Response() res) {
    console.log(body)
    res.redirect('/user') //路由跳转
  }
}
```

## NestJS 中的服务

- Nestjs 中的服务可以是 service 也可以是 provider。 他们都可以通过 constructor 注入依赖关系。
  服务本质上就是通过@Injectable() 装饰器注解的类。 在 Nestjs 中服务相当于 MVC 的 Model。
- 通过`nest g service news`创建服务
- 需要在根模块引入并配置
- 在用到的地方引入并配置

```ts
// news.service.ts
import { Injectable } from '@nestjs/common'
@Injectable()
export class NewsService {
  findAll() {
    return [{ title: '新闻' }]
  }
}
```

```ts
// news.controller.ts
import { Controller, Get, Render } from '@nestjs/common'

import { NewsService } from './news.service'

@Controller('news')
export class NewsController {
  constructor(private newsServices: NewsService) {}
  @Get()
  @Render('default/news')
  index() {
    return {
      newsList: this.newsServices.findAll()
    }
  }
}
```

## Nestjs 中使用 Cookie

- HTTP 是无状态协议。 简单地说， 当你浏览了一个页面， 然后转到同一个网站的另一个页面， 服务器无法认识到这是同一个浏览器在访问同一个网站。 每一次的访问， 都是没有任何关系的。 如果我们要实现多个页面之间共享数据的话我们就可以使用 Cookie 或者 Session 实现
- cookie 是存储于访问者的计算机中的变量。 可以让我们用同一个浏览器访问同一个域
  名的时候共享数据
- cookie 的特点：cookie 保存在浏览器本地、正常设置的 cookie 是不加密的， 用户可以自由看到、用户可以删除 cookie， 或者禁用它、cookie 可以被篡改、cookie 可以用于攻击、cookie 存储量很小。 未来实际上要被 localStorage 替代， 但是后者 IE9 兼容
- NestJs 中使用 Cookie 的话我们可以用 cookie-parser 来实现
- 安装第三方包
  `npm install cookie-parser --save`
  `npm i -D @types/cookie-parser`
- 在 main.ts 中引入 cookie-parser
  `import * as cookieParser from 'cookie-parser'`
- 在 main.ts 配置中间件
  `app.use(cookieParser())`
- 设置 cookie
  `res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true})`
  HttpOnly 默认 false 设置为 true 不允许 客户端脚本访问
- 获取 Cookies
- 设置加密的 Cookies 时，在 main.ts 中配置密钥`app.use(cookieParser('this is a key'))`
- 注意：如果使用@Response 参数装饰器 返回值的时候使用 res 除非使用渲染模版

```ts
@Get('setcookie')
setCookie(@Response() res) {
  // 设置Cookie
  res.cookie('username', 'zhangsan', { maxAge: 14000, httpOnly: true });
  // 设置加密Cookie -> signed: true
  res.cookie('username2', 'lisi', {
      maxAge: 14000,
      httpOnly: true,
      signed: true, // 设置加密
    });
  res.send('这是用户页面');
}

@Get('getcookie')
getCookie(@Request() req) {
  //获取Cookie
  console.log(req.cookies.username);
  //获取加密的Cookie
  console.log(req.signedCookies.username2);
  return req.signedCookies.username;
}
```

## Nestjs 中使用 Session

- session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 session 保存在服务器上
- 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 session 对象，生成一个类似于 key,value 的键值对，然后将 key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带 key(cookie)，找到对应的 session(value)。 客户的信息都保存在 session 中
- 安装 `npm i express-session --save` `npm i -D @types/express-session --save`
- 引入 `import * as session from 'express-session'`
- 设置中间件 `app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))`
- express-session 的常用方法
  - `req.session.destroy(function(err) { })` 销毁 session
  - `req.session.username='张三'` 设置 session
  - `req.session.username` 获取 session
  - `req.session.cookie.maxAge=0` 重新设置 cookie 的过期时间

```ts
// main.ts
import * as session from 'express-session'
// 配置session的中间件
app.use(
  session({
    secret: 'keyboard cat',
    cookie: { maxAge: 9000, httpOnly: true },
    // 在每次请求时强行设置 cookie， 这将重置 cookie 过期时间（默认： false）
    rolling: true
  })
)
```
