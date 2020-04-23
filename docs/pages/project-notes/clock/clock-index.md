# 计划吧

计划吧是一个类似番茄土豆系列的网页应用


## 遇到的问题 

### 如何在让 React Component 监听到外面的 Router 变化?

>首先下载 history 库, 然后封装到一个文件里
```jsx harmony
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;
```

>然后在需要 history 的组件里引入
```jsx harmony
import history from "./history.js";
```

>最后在需要监听的组件引入和使用 history
```jsx harmony
import { Router } from "react-router-dom";
import history from "./history.js";

// and then in your JSX:
return (
  <Router history={history}>
    {/* routes as usuall */}
  </Router>
)
```

[原文在 Stack Overflow 上](https://stackoverflow.com/questions/44153517/how-to-access-history-object-outside-of-a-react-component)
