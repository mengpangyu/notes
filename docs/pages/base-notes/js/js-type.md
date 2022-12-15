# 类型

## 原始类型

1. boolean
2. null
3. undefined
4. number
5. string
6. symbol
7. bigint

```js
"1".toString(); // 此时1被强转为String类型, 对象类型
0.1 + 0.2 !== 0.3; // true, 因为number都是浮点类型的数据
typeof null === "object"; // true, 其实null是基本类型, 是js的bug, 最初js使用32位系统, 000开头表示对象, null全是0, 所以也认为是对象
```


