# Http 技巧

## 说一下你知道的状态码?

- 100 继续
- 101 切换协议
- 200 请求成功
- 201 已创建, 成功请求并创建新的资源
- 202 已接收, 但未处理完成
- 301 资源永久重定向
- 302 临时重定向
- 400 请求语法错误
- 401 需要权限
- 404 请求页面不存在
- 500 内部服务器错误
- 501 服务端不支持请求功能, 无法完成请求

>1** 信息, 服务端收到请求, 需要请求者继续执行操作

>2** 成功, 操作被成功接收并处理

>3** 重定向, 需要进一步完成请求

>4** 客户端错误, 请求包含语法错误或无法完成请求

>5** 服务端错误, 服务器在处理请求的过程中发生错误

## Http 缓存?

- 一个网址的旅行:

```text
1、输入一个网址：www.baidu.com
2、浏览器查找域名的IP地址
3、浏览器给web服务器发送一个http请求
4、服务器给浏览器响应一个301永久重定向：会访问“http://www.baidu.com/” 而非“http://baidu.com/”
5、浏览器跟踪重定向地址
6、服务器处理请求，并返回一个HTML响应
7、浏览器开始显示HTML
```

- DNS 

>是一个域名系统，域名是互联网上的身份标识，是不可重复的唯一标识资源，DNS解析是互联网绝大多数应用的实际寻址方式 
在面试中他问到我这样一个问题：DNS解析发生在什么时候？  
当用户输入域名并敲回车后，系统就会调用DNS client，寻找到用户配置或者自动分配的DNS IP,之后就开始整个的解析过程

- 缓存

>返回一个HTML文件的时候你要考虑这个文件有没有缓存过，缓存过有没有变化。
一般静态文件会允许浏览器对其进行缓存，有的文件可能会不需要与服务器通讯，而从缓存中直接读取。
缓存有什么好处？这个就比较简单了，但是也会被问到，你就说 减少相应的延迟，减少网络带宽消耗

- Expires

>响应头，代表该资源的过期时间

- Cache-Control

>请求/响应头，缓存控制字段，精确控制缓存策略

- If-Modified-Since

>请求头，资源最近修改时间，由浏览器告诉服务器

- Last-Modified

>响应头，资源最近修改时间，由服务器告诉浏览器

- Etag

>响应头，资源标识，由服务器告诉浏览器

- If-None-Match

>请求头，缓存资源标识，由浏览器告诉服务器

### 讲一下浏览器缓存的发展过程

1. 浏览器总是从服务器里拿文件, **没缓存, 浪费带宽, 浪费时间, 用户体验不好**
2. 加入缓存机制, 在浏览器本地把文件存下, 每次请求就从本地请求,  
    - **优点:** 增加用户体验, 节省带宽
    - **缺点:** 不能拿到最新的数据
3. 加入缓存过期时间, 用 **Expires(GMT日期)** 设置, 第一次请求服务器就返回一个文件, 后面在请求就在本地缓存中, 当时间过期后在去服务器请求
    - **优点:** 能过一段时间拿到最新的文件
    - **缺点:** 缓存过期后, 不管服务器的资源有无更新, 都会重新都服务器读取文件
4. 服务器告诉浏览器上次文件的修改时间, 响应连同 **Expires 和 Last-Modified** 返回, 当缓存过期,
   浏览器就拿  **If-Modified-Since(等于服务器上次返回的Last-modified)** 就带到服务器上, 服务器看浏览器带来的最后一次修改时间是否与文件的修改时间相同
    - **优点:** 过期后如果内容没变, 就不需要重新获取, 节省带宽, 如果文件有变化, 则返回最新的文件数据
    - **缺点:** 
        - Expires 过期控制不稳定，因为浏览器端可**以随意修改时间(用户可以修改时间)**，导致缓存使用不精准, **Last-Modified 过期时间只能精确到秒**
        - 只能精确到秒, 那么如果一个文件在一秒内改了很多次, 都在那在一秒内对比, 服务器就会认为最后修改时间和上一次的一样, 所以会告诉浏览器继续使用原来的缓存, 但其实文件已经改了
        - 看似改了文件, 其实数据没发生变化, 但是 Last-Modified 匹配不上又会重新读取文件一次
>一致: 服务器告诉浏览器可以继续用原来的缓存了 **(304 未修改)** 

>不一致: 服务器读取文件返回给浏览器, 顺便把新的 Last-Modified 和 Expires 返回给浏览器

5. 增加相对时间的控制, 引入 Cache-Contorl, 浏览器除了得到 **Expires(绝对时间)**, 还会得到一个 **Cache-Control：max-age=10秒(相对时间)**, 
10秒的意思是在10秒内利用缓存在读文件, 浏览器以 Cache-Control 为准, 忽略 Expires, 如果没有 Cache-Control, 则检查 Expires

6. 解决精确到秒问题, 加入 **Etag(一般用MD5), 文件内容变了, Etag 才变, 内容不变, Etag 不变, Etag 就相当于这个文件的唯一 ID,** 同时引入 If-None-Match, 
当再次请求服务器的时候, **If-None-Match 就是服务器上次传来的 Etag**

#### 总结
>当浏览器第一次请求文件, 服务器会返回 Expires(绝对时间) 和 Cache-Control: max-age=10秒(相对时间), Last-Modified(最后修改时间), Etag(标识文件的唯一ID)

>10秒内再次请求直接去缓存里找

>11秒后请求就去服务器上, 忽略 If-Modified-Since(上次的 Last-Modified) , 对比一下 If-None-Match(上次的 Etag) , 如果有变化, 那就返回新的文件以及还是那四个响应头, 如果变化, 那就告诉浏览器还是从缓存里找

#### 还有一些问题

- 不管使用 Expires 或 Cache-Control 都**不能主动获取文件内容是否被改变**, 那么怎么解决?

众所周知不论 js、css、img 都是从 html 上在发请求获取的, 那么我们可以**不让 html 做缓存**, 每次请求 html 都是从服务器里读

每次拿到 html 里的时候在 **js 请求路径上加一个版本号**, 如果 html 再次访问 js 的版本还是和以前一样, 那么就从缓存找, 如果版本号变了, 那就重新请求

这样就解决了不能主动得知文件更新的问题, 再加上 **webpack 插件(html-webpack-plugin)的使用**, 每次会根据 hash 值生成不同名称的 html, 就可以很方便的去解决这个问题

[不错的 http 缓存 文章](https://juejin.im/post/5b3c87386fb9a04f9a5cb037#heading-1)

## GET 和 POST 的区别?

- 错解:
    - GET 在浏览器回退时是无害的, 而 POST 会再次提交请求
    - GET 在产生的 URL 地址上可以这加入收藏栏, 而 POST 不可以
    - GET 请求会被浏览器主动 cache, 而 POST 不会, 除非手动设置\
    - GET 请求只能进行 URL 编码, 而 POST 支持多种编码方式
    - GET 请求参数会被完整保留在浏览器历史记录里, 而 POST 中的参数不会被保留
    - GET 请求在 URL 中传送的参数是有长度限制的, 而 POST 没有
    - 对参数的数据类型, GET 只接受 ASCII 字符, 而 POST 没有限制
    - GET 比 POST 更不安全, 因为参数直接暴露在 URL 上, 所以不能传递敏感信息
    - GET 参数通过 URL 传递, POST 放在 Request Body 中
- 正解:
    - 就一个区别: 语义 --- GET 用于获取资源, POST 用于提交资源

:::tip 注意
HTTP 底层是 TCP/IP, 所以 GET 和 POST 都是 TCP链接
**TCP 像汽车**, 运输数据, 为了区分数据的类别, 给每个小汽车贴标
**GET 在汽车顶上运输, POST 在汽车里运输**

运输公司就相当于不同的浏览强和服务器, 装货卸货还是有很大的代价的, 所以他们会**限制单次运输量来控制风险**
浏览器通常限制 URL 长度在 **2k 字节,** 而服务器最多处理 **64k 大小的 URL**

**GET 产生一个数据包, POST 产生两个数据包**
GET 会把请求头和数据一起发到服务器, POST 会先发请求头告诉服务器有一些数据要来, 然后再回去发数据
看起来 GET 比 POST 更高效, 但是他们的**语义不同**, 不能随便混用, 而且走的网络环境差的情况下, 验证**两次包的数完整性更好**
并不是所有的浏览器都会在 POST 请求发两次包, **Firefox 就只发一次包** 
:::
    
>GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同

[比较好的文章](https://zhuanlan.zhihu.com/p/22536382)

## Cookie 和 Session 和 LocalStorage 和 SessionStorage 区别?

- Cookie V.S. LocalStorage
    1. 主要是区别是 Cookie 会被发送到**服务器**, 而 LocalStorage **不会**
    2. Cookie 一般最大 **4k**, LocalStorage 可以用 **5mb 甚至 10mb**, 各浏览器不同
- LocalStorage V.S. SessionStorage
    1. LocalStorage 一般**不会自动过期**(除非用户自己清除), 而 SessionStorage 在**会话结束时期过期**(如关闭浏览器)
- Cookie V.S. Session
    1. Cookie **存在浏览器文件里**, Session **存在服务器的文件里**
    2. Session 是**基于 Cookie** 实现的, 具体做法就是把 SessionID 存在 Cookie 里

## HTTP1 和 HTTP2 的区别?

- 新的二进制格式: 利用二进制格式解析, 方便健壮
- 多路复用: 根据 Request id 来区分
- header 压缩: 缓存 header 列表, 避免重复传送
- 服务器推送: 在请求 style.css 的时候服务器自动把 main.js 放在浏览器的缓存里

## 说一下 HTTP 和 HTTPS

https 的 SSL 加密是在传输层实现的

### 基本概念

http: 超文本传输协议, 是互联网上应用最为广泛的一种网络协议, 是一个客户端和服务器端请求和应答的标准(TCP), 用于 WWW 服务器传输
超文本到本地浏览器的传输协议, 他可以使浏览器更加高效, 是网络传输减少

https: 是以安全为目标的 HTTP 通道, 简单讲 HTTP 的安全版, 既 HTTP 下加入 SSL 层, HTTPS 的安全基础是 SSL, 因此加密的详细内容就需要 SSL

https协议主要作用: 建立一个信息安全通道, 确保数组的传输, 确保网站的真实性

### http 和 https 的区别

http 传输的数据是未加密的, 也就是明文的, 网景公司设置了 SSL 协议来对 http 协议传输的数据进行加密处理, 简单来说 https 协议
是由 http 和 ssl 协议建构的可进行加密传输和身份确认的网络协议, 比 http 协议的安全性更高

1. https 协议需要 ca 证书, 费用较高
2. http 是超文本传输协议, 信息是明文传输, https 贼是安全性的 ssl 加密传输协议
3. 使用不同的链接方式, 端口也不同, 一般而言, http 端口为 80, https 端口为 443
4. http 连接很简单, 是无状态的, https 协议是由 ssl + http 协议构建的加密传输, 身份确认网络协议

### https 协议的工作原理

客户端在使用 https 方式与 web 服务器通信时有以下几个步骤

1. 客户端在使用 https url 访问服务器, 则要求 web 服务器建立 ssl 连接
2. web 服务器收到客户端请求后, 会将网站的证书(包含公钥), 返回或者说传输给客户端
3. 客户端和 web 服务器端开始协商建立 ssl 链接的安全等级
4. 客户端浏览器通过双方协商一致的安全等级, 建立会话秘钥, 然后通过网站的公钥来加密会话秘钥, 并传送给网站
5. web 服务器通过自己的私钥解密出会话秘钥
6. 服务器通过会话加密与客户端之间的通信

### https 的优缺点

>优点

- 使用 https 的可认证用户和服务器, 确保数据发送到正确的客户机和服务器
- https 协议由 ssl + http 协议构建的可进行加密传输, 身份认证的网络协议, 要比 http 安全, 可防止数据在传输过程中不被盗取, 
改变, 确保数据的完整性
- https 是现行架构下最安全的解决方案, 大幅度增加了中间人攻击的成本
- 谷歌曾在 2014 年调整搜索引擎算法, 并称采用 https 加密的网站在搜索中的排名将会更高

>缺点

- https 握手阶段比较费时, 也会使页面加载时间延长 50%. 增加 10%~20% 的耗电 
- https 缓存不如 http 高效, 会增加数据开销
- ssl 证书也需要钱, 功能越强大的证书费用越高
- ssl 需要绑定 ip, 不能在同一 ip 上绑定多个域名, ipv4 资源支持不了这种消耗

## TCP 三次握手

1. 第一次握手: 两端都 closed 关闭状态, Client 将标志位 SYN 置为 1, 随机产生一个值 seq=x, 并将该数据包发给 Server,
Client 进入 SYN-SENT 状态, 等待 Server 确认

2. 第二次握手: Server 收到数据包后由标志位 SYN=1 得知 Client 请求建立连接, Server 将标志位 SYN 和 ACK 都置为 1,
ack=x+1, 随机产生一个值 seq=y, 并将数据包发送给 Client 已确认连接请求, Server 进入 SYN-RCVD 状态, 此时操作系统为该
TCP 连接分配 TCP 缓存和变量

3. Client 收到确认后, 检查 ACK 是否为 1, 如果正确则将标志位 ACK 置为 1, ack=y+1, 并且此时操作系统为该 TCP 连接分配 TCP 缓存和变量, 
并将数据包发送给 Server, Server 检查 ack 是否为 y+1, ACK
是否为 1, 如果正确则建立成功, Client 和 Server 进入 ESTABLISHED 状态, 完成三次握手, 随后 Client 和 Server 开始传输数据

## TCP 和 UDP 的区别

1. TCP 是面向连接的, UDP 是无连接的即发送数据前不需要先建立连接
2. TCP 提供可靠的服务, 也就是说, 通过 TCP 传输的数据, 无差错, 不丢失, 不重复, 且按顺序到达, UDP 尽最大努力交付, 即不保证
可靠交付, 并且因为 TCP 可靠, 面向连接, 不会丢失数据因此适合大量数据的交换
3. TCP 面向字节流(适合银行交付, 金融交付等), UDP 面向报文, 并且网络出现拥塞不会使得其发送效率降低(因此会出现丢包, 对事实时的应用比如 ip 电话, 直播, 游戏等)
4. TCP 只能是一对一的, UDP 支持一对一, 一对多
5. TCP 的首部较大为 20 字节, 而 UDP 只有八字节
6. TCP 是面向连接的可靠性传输, 而 UDP 是不可靠的

## WebSocket 的实现和应用

### 什么是 WebSocket?

WebSocket 是 HTML5 中的协议, 支持持久连接, HTTP 协议支持持久性连接, HTTP1.0 和 HTTP1.1 都不支持持久性的连接, 
HTTP1.1 中的 keep-alive, 将多个 http 请求合并为 1 个

### WebSocket 是什么样的协议, 具体有什么优点?

HTTP 的生命周期通过 Request 来界定, 也就是 Request 一个 Response, 那么在 HTTP1.0 当中, 这次 HTTP 请求就结束了, 
在 HTTP1.1 中进行了改进, 有一个 `connection: Keep-alive`, 也就是说, 在一个 HTTP 连接中, 可以发送多个 Request, 接收
多个 Response, 但是必须记住, 在 HTTP 中只有一个 Request 只能对应一个 Response, 而且这个 Response 是被动的, 
不能主动发起

WebSocket 是基于 HTTP 协议的, 或者说借用了 HTTP 协议来完成一部分握手, 在握手阶段与 HTTP 是相同的

一个例子: 

```http request
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

多了两个属性, Upgrade 和 Connection

告诉服务器发送的是 WebSocket

```http request
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

## HTTP 请求方式, HEAD 方式

head: 类似于 get 请求, 只不过返回的响应里没有具体的内容, 用户获取报头

options: 允许客户端查看服务器的性能, 比如服务器支持的请求方式等

## 一个图片 url 访问后直接下载怎样实现

请求的返回头里面, 用于浏览器解析的重要参数就是 OSS 的 API 文档里面的返回 HTTP 头, 就决定用户下载行为的参数

下载情况下:

1. x-oss-object-type: Normal
2. x-oss-request-id: 12jkdfgs53jwkt5436
3. x-oss-storage-class: Standard

## 说一下 web Quality (无障碍)

能够被残障人士使用的网站才能称得上一个易用的网站

使用 alt 属性, 有时候浏览器无法显示图像, 具体原因有, 用户关闭了图像显示

浏览器是语音浏览器, 如果提供了 alt 属性, 那么浏览器至少可以显示有关图像的文字

## BOM 有哪些方法?

>location

- location.href 返回或设置当前文档的的 URL
- location.search 返回 URL 中的查询字符串部分(包括?)
- location.hash 返回 URL# 后面的内容
- location.host 返回域名
- location.hostname 返回主域名
- location.pathname 返回域名后部分
- location.port 返回端口
- location.protocol 返回 URL 中的协议
- location.assign 返回当前文档的 URL 
- location.replace() 设置当前文档的 URL, 并在 history 对象中的地址列表中移出这个 URL
- location.reload 重新加载页面

>history

- history.go() 前进或后退页数数
- history.back() 后退一页
- history.forward() 前进一页

>navigator

- navigator.userAgent 返回用户代理头的字符串表示
- navigator.cookieEnabled 返回浏览器是否支持(启用) Cookie

## fetch 发送两次请求的原因

fetch 发送 post 请求, 第一次发送了一个 Options 请求, 访问服务器是否支持修改的请求, 如果服务器支持, 那么在第二次中发送
真正的请求

## HTTP 常用请求头

|  协议头   | 说明  |
|  ----  | ----  |
| Accept   | 可接受的响应内容类型(Content-Types)|
| Accept-Charset  | 可接受的字符集 |
| Accept-Encoding  | 可接受的编码方式 |
| Accept-Language  | 可接受的语言 |
| Accept-Datetime  | 可接受的按照时间来表示的响应内容版本 |
| Authorization  | 用于表示 HTTP 协议中需要认证资源的认证信息 |
| Cache-Control  | 用来指定当前请求/回复中是否使用缓存机制 |
| Connection  | 客户端(浏览器)想要优先使用的连接类型 |
| Cookie  | Cookie 信息 |
| Content-Length  | 以8进制表示请求提的长度 |
| Content-MD%  | 请求体的内容二进制 MD5 取散列值, 以 Base64 编码的结果 |
| Content-Type  | 请求体的 MIME 类型(用于POST和PUT) |
| Date  | 发送日期和时间 |
| Expect  | 表示客户端要求服务端做出特定的行为 |
| HOST  | 端口 |
| UserAgent  | 浏览器的身份标识字符串 |
| Upgrade  | 要求服务器升级到一个高版本协议 |

## 强缓存、协商缓存

缓存分为两种: 强缓存和协商缓存, 根据响应 header 内容来决定

| 缓存分类| 获取资源形式 | 状态码 | 发送请求到服务器 |
| --- | --- | --- | --- |
| 强缓存 | 从缓存中取 | 200(from cache) | 否, 直接从缓存取 |
| 协商缓存 | 从缓存中取 | 304(not modified) | 是, 通过服务器来告知缓存是否可用 |

:::tip 注意
强缓存相关字段有 expires, cache-control, 如果两个同时存在, cache-control 的优先级高

协商缓存相关字段 Last-Modified/if-Modified-Since, Etag/if-None-Match
:::

 **普通刷新会启用弱缓存，忽略强缓存。只有在地址栏或收藏夹输入网址、通过链接引用资源等情况下，浏览器才会启用强缓存**

## 前端优化

降低请求量: 合并资源, 减少 HTTP 请求, minify/gzip 压缩, webP, lazyload

加快请求速度: 预解析 DNS, 减少域名数, 并行加载, CDN 分发

缓存: HTTP 协议缓存请求, 离线缓存 manifest, 离线数据缓存 localStorage

渲染: JS/CSS 优化, 加载顺序, SSR

## 浏览器输入到渲染全过程

DNS解析：浏览器首先依次在浏览器缓存->系统缓存->路由器缓存中查找有无该域名对应IP地址的记录，缓存中没有则查找系统的hosts文件中是否有记录，如果没有则查询DNS服务器。
通过三次握手与目标服务器建立TCP连接。
浏览器构造HTTP请求。
将HTTP报文封装到一个TCP报文段当中，依次经过传输层、网络层、链路层、物理层将报文送达至服务器。
服务器收到请求后进行处理，然后返回一个响应报文给客户端。
浏览器得到HTML后构建DOM树，途中如果发现其他资源，会再次向服务器请求。这个过程可以通过建立HTTP长连接或使用Websocket协议代替HTTP协议来避免。
浏览器得到CSS文件后构建CSSOM树，再根据DOM树和CSSOM树构建渲染树，将页面呈现在显示器上。
如果在DOM树的构建过程中遇到JS脚本，则该过程会被阻塞，直到JS脚本下载并执行完成，除非引入JS脚本时设置了defer和async属性。（如果提到这点的话建议顺便看一下defer和async的区别，面试官可能会继续深入提问）

## defer 和 async 区别

- 对于 defer 加载 js 文件不会阻塞页面(异步)的渲染和资源的加载, 不过 defer 会按原本的 js 顺序执行
- 对于 async , 这个 html5 新属性, 加载完 js 文件就会执行, 不保证顺序, 异步加载

## OSI 七层模型

从上到下

- 应用层: 文件传输, 常用 HTTP, snmp, FTP
- 表示层: 文件传输, 代码转换, 数据加密
- 会话层: 建立, 解除会话
- 传输层: 提供端对端的接口, TCP, UDP
- 网络层: 为数据包选择路由, IP, icmp
- 数据链路层: 传输有地址的帧
- 物理层: 二进制的数据形式在物理媒体上传输数据

## TCP/IP 的网络模型

TCP/IP 模型是一系列网络协议的总称, 这些网络协议的目的是使得计算机之间可以进行信息交换

TCP/IP 模型四层架构从上到下分别是链路层, 网络层, 传输层, 应用层

链路层的作用是负责建立电路连接, 是整个网络的物理基础, 典型的协议包括以太网, ADSL等

网络层负责分配地址和传送二进制数据, 主要是 IP 协议

传输层负责传送文本数据, 主要是 TCP

应用层负责传送各种最终形态的数据, 是直接与用户信息打交道的层, 主要协议是 HTTP, FTP 等


