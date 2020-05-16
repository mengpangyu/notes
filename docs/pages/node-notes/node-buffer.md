# Node.js Buffer

因为作为一门后端语言，必须要用到文件的 IO，但是 JavaScript 没有一个关于二进制处理数据的 api

Node.js 推出了 Buffer 类来解决这类问题

## Buffer 与字符编码

目前支持的字符编码：
1. **ascii** - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的
2. **utf8** - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 
3. **utf16le** - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）
4. **ucs2** - utf16le 的别名
5. **base64** - Base64 编码
6. **latin1** - 一种把 Buffer 编码成一字节编码的字符串的方式
7. **binary** - latin1 的别名
8. **hex** - 将每个字节编码为两个十六进制字符

## 创建 Buffer 类

- Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- Buffer.allocUnsafeSlow(size)
- Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

## 写入缓冲区

```js
buf.write(string[, offset[, length]][, encoding])
```

参数：
- **string** - 写入缓冲区的字符串。
- **offset** - 缓冲区开始写入的索引值，默认为 0 
- **length** - 写入的字节数，默认为 buffer.length
- **encoding** - 使用的编码。默认为 'utf8' 


## 从缓冲区读取数据

```js
buf.toString([encoding[, start[, end]]])
```

参数：
- **encoding** - 使用的编码。默认为 'utf8' 
- **start** - 指定开始读取的索引位置，默认为 0
- **end** - 结束位置，默认为缓冲区的末尾


## 将 Buffer 转换为 JSON 对象

```js
buf.toJSON()
```

当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()

## 缓冲区合并

```js
Buffer.concat(list[, totalLength])
```

参数：
- list - 用于合并的 Buffer 对象数组列表
- totalLength - 指定合并后Buffer对象的总长度

## 缓冲区比较

```js
buf.compare(otherBuffer);
```

参数：
- otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象 


## 拷贝缓冲区

```js
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
```

参数：
- targetBuffer - 要拷贝的 Buffer 对象。
- targetStart - 数字, 可选, 默认: 0
- sourceStart - 数字, 可选, 默认: 0
- sourceEnd - 数字, 可选, 默认: buffer.length


## 缓冲区裁剪

```js
buf.slice([start[, end]])
```

参数：
- start - 数字, 可选, 默认: 0
- end - 数字, 可选, 默认: buffer.length


## 缓冲区长度

```js
buf.length;
```

