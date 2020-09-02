const foo = {template: `<h1>foo</h1>`}
const bar = {template: `<h1>bar</h1>`}
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: foo
    },
    {
      path: '/bar',
      component: bar
    }
  ]
})
Vue.component('Child', {
  template: `
    <input type="text" :value="value" @input="$emit('input',$event.target.value)">
  `,
  props: ['value'],
})
Vue.component('Child2', {
  template: `
    <div>{{name}}
      <button @click="$emit('update:name','hello')">change</button>
    </div>`,
  props: ['name']
})
Vue.component('Child3', {
  template: `
    <div>
      <slot :user="user">{{user.name}}</slot>
    </div>`,
  data() {
    return {
      user: {
        name: 'chauncey',
        age: 11
      }
    }
  },
  mounted() {
    console.log(this.$scopedSlots)
  },
})
Vue.component('Father', {
  mounted() {
    console.log(this.$slots.default)
    console.log(this.$children)
  },
  template: `
    <div>
      <!--      <Child3 v-slot="slotProps">{{slotProps}}</Child3>-->
      <!--      <Child2 :name.sync="items[0].name"/>-->
      <!--      <Child :value="items[0].title" @input="input"/>-->
      <!--      {{items[0].title}}-->
      <router-link to="/foo">foo</router-link>
      <router-link to="/bar">bar</router-link>
      <div>
        <router-view></router-view>
      </div>
    </div>
  `,
  methods: {
    remove(index, e) {
      this.items.splice(index, 1)
      console.log(e)
    },
    input(e) {
      this.items[0].title + e
    }
  },
  data() {
    return {
      items: [
        {title: 'meng', name: 'chauncey'},
        {title: 'xiang', name: 'bob'},
        {title: 'yu', name: 'tree'},
      ]
    }
  }
})

// 在类如 ul ol table 里使用 is 来代替组件名字, 这样有利于组件的正确渲染

new Vue({
  el: '#app',
  template: '<Father/>'
})



