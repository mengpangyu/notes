# Vue 表单 和 v-model

## v-model 应用

### 单行文本

```vue
<template>
  <div id="app">
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
  message: 'wo'
    }
  }
};
</script>
```

### 多行文本

```vue
<template>
  <div id="app">
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "wo"
    };
  }
};
</script>
```

### 复选框

```vue
<template>
  <div id="app">
    <div id="example-3">
      <input type="checkbox" id="jack" value="Jack" v-model="message">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="message">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="message">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: []
    };
  }
};
</script>
```

### 单选框

```vue
<template>
  <div id="app">
    <div id="example-4">
      <input name="One" type="radio" id="one" value="One" v-model="message">
      <label for="one">One</label>
      <br>
      <input name="Two" type="radio" id="two" value="Two" v-model="message">
      <label for="two">Two</label>
      <br>
      <span>Picked: {{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: ""
    };
  }
};
</script>
```

### 选择框

```vue
<template>
  <div id="app">
    <div id="example-5">
      <select v-model="selected">
        <option disabled value>请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selected: ""
    };
  }
};
</script>
```

### 多选择框

```vue
<template>
  <div id="app">
    <div id="example-6">
      <select v-model="selected" multiple style="width: 50px;">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <br>
      <span>Selected: {{ selected }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selected: []
    };
  }
};
</script>
```

### form

- 回车在有 button 的时候会刷新页面, 没有 button 的时候回车不会刷新
- 在监听回车事件就可以用 submit

```vue
<template>
  <div id="app">
    <form @submit.prevent="onSubmit">
      <label>
        <span>用户名</span>
        <input type="text" v-model="user.username"/>
      </label>
      <label>
        <span>密码</span>
        <input type="password" v-model="user.password"/>
      </label>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      user:{
        username: '',
        password: ''
      }
    };
  },
  methods:{
    onSubmit(){
      console.log(this.user)
    }
  }
};
</script>
```

:::tip 注意
v-model 其实就是两句话
1. :value="user.username"
2. @input="user.username=$event.target.value"
:::

:::warning 面试
v-model
1. 在变量的时候, UI 会变化
2. 在用户数改变 UI 的时候, 变量会变化
3. 实际上就是 v-bind:value 和 v-on:input 的语法糖
4. 原生input: @input="xxx=$event.target.value"
5. 自定义组件: @input="xxx=$event"
:::

App.vue
```vue
<template>
  <div id="app">
    {{user}}
    <form @submit.prevent="onSubmit">
      <label>
        <span>用户名</span>
        <newInput :value="user.username"
        @input="user.username = $event"/>
      </label>
      <label>
        <span>密码</span>
        <input type="password" v-model="user.password"/>
      </label>
      <button>提交</button>
    </form>
  </div>
</template>

<script>
import newInput from './components/newInput'
export default {
  components: {newInput},
  name: "App",
  data() {
    return {
      user:{
        username: '',
        password: ''
      }
    };
  }
};
</script>
```
newInput.vue

```vue
<template>
  <div>
    <input type="text" :value="value" @input="output">
  </div>
</template>

<script lang="ts">
export default {
 name: 'newInput',
 props: {
   value: {
     type: String
   }
 },
 methods:{
   output(e){
    this.$emit('input',e.target.value)
   }
 }
}
</script>
```


## 三个修饰器

>input 和 change 事件

- input 是在任何形式的输入监听事件
- change 在鼠标移出的时候监听事件

### .lazy

- 只在鼠标移出的时候触发事件

### .number

- 把表单内容转换为数字

### .trim

- 两头空格不要