# Express 初探

运用框架的好处

- 更方便处理 HTTP 请求与响应
- 更方便连接数据库、Redis
- 更方便的路由

## HelloWorld

命令行:
```bash
touch express-demo-1
cd express-demo-1
yarn init -y
git init
yarn add express
```

基础代码:
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

改成TS:
```bash
yarn add global typescript ts-node ts-node-dev
ts-node app2.ts
```

以后写 express 的项目可以用 [express-starter](https://github.com/chaunceym/express-starter/tree/master)

## Express 脚手架

```bash
yarn global add express-generator 
```

- express -h 查看帮助
- express --view=ejs . 创建ejs的项目
- 重新安装 @types/express


## 深入理解 express 的编程模型

### 理解 app.use

```js
const express = require('express')
const app = express()

app.use((request,response,next)=>{ 
  response.write('hi')
  next()
})

app.use((request,response,next)=>{ 
  response.write('hi')
  next()
})

app.use((request,response,next)=>{ 
  response.end()
})

app.listen(3000,()=>{
  console.log('正在 listen 3000')
})
```

### 中间件

- 被插入到启动和结束的物件, 就是上面代码的 app.use()
- 一个 app.use() 就是一个中间件


优点: 
1. 每个功能都能通过一个函数实现
2. 然后通过 app.use 将这个函数整合起来
3. 如果把函数放到文件或 npm 里, 就实现了模块化

### 实现路由

```js
app.use((request,response,next)=>{ 
  if(request.path === '/'){
    response.send('ddd')
  }
})
```

>方便写法, 语法糖

```js
app.use('/',(request,response,next)=>{
  response.send('ddd')
})

app.route('/')
 .all(()=>{})
 .get(()=>{})
```

### 错误处理

```js
app.use((error,request,response,next)=>{ 
  if(true){
    new Error('error')
  }
  response.write(error)
})
```

:::tip 注意
next(error) 会进入 errorHandler, 不执行后面的中间件
:::

**处理多个错误用 next(error)**



