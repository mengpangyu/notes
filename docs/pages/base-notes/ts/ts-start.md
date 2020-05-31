# TypeScript 初体验

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对ES6
的支持，它由 Microsoft 开发，代码开源于 Github 上

## TS 优点

- 增加了代码可读性和可维护性
- 非常包容，可转换为 JS
- 拥有活跃的社区，越来越多的前端框架提供 TS 支持

## 起步

命令行安装
```shell script
npm i -g typescript
# or
yarn add global typescript
```

查看版本
```shell script
tsc -v
```

编译TS文件
```shell script
tsc 文件名.ts
```

## 支持的原始数据类型

- string
- number
- boolean
- null
- undefined
- enum
- symbol

空值一般采用 void 来表示，void 可以表示变量，也可以表示函数无返回值

>举例

```ts
const str:string = "chauncey";

const num:number = 2;

const flag:boolean = true;

const un:undefined = undefined;

const null:null = null

const foo = ():void => {
  console.log("I dont have value of return ")
}
```

### any 任意值

任意值也是 TS 中的一种类型，它表示变量可以为任意的数据类型

如果变量在声明的时候未指定类型，那么 TS 会默认根据初始值类推断类型

那如果变量没有初始值，TS 就会吗，默认为 any 类型

```ts
let anyValue;
anyValue = 1;
anyValue = "1";
anyValue = true;
```

:::tip 注意
建议如果用 TS 的话永远都不要用 any 来声明变量，如果用了 any 那么你写的 TS 和 jS 有什么区别呢？

TS 本来就是用来管理变量类型的，如果用 any 还不如不用 TS 写代码
:::

## 联合类型

联合类型就是给某个变量可以有多个类型
```ts
let myType:number|string = '1';
myType = 1;
// console.log(myType.length) 会报错，因为数字没有长度
console.log(myType.toString())
```
当具有联合类型的变量调用方法时要注意要选两种类型都符合的方法调用，否则会报错

## 接口

可以描述类的一部分抽象行为，也可描述对象的结构形状

接口一般首字母大写，赋值的时候，变量的形状必须与接口的 形状保持一直

接口中可定义**可选属性、只读属性、任意属性**

### 普通接口

```ts
interface MyInterface {
  name:string
  age:number
  eat:()=>void
}

let chauncey:MyInterface;
chauncey = {
  name:'chauncy',
  age:12,
  eat:()=>{
  console.log('chauncey eat')  
  } 
}
```

### 属性为可选
```ts
interface MyInterface {
  name:string
  age:number
  eat?:()=>void
}

let chauncey:MyInterface;
chauncey = {
  name:'chauncy',
  age:12,
}
```
改为可选就是在 eat 后加一个 ？ 号，表示可能有也可能没有

### 属性个数不确定

```ts
interface MyInterface {
  name:string
  age:number
  [propName:string]:any
}

let chauncey:MyInterface;
chauncey = {
  name:'chauncy',
  age:12,
  eat(){ // es6 语法 eat:()=>{} === eat(){}
    console.log('chauncey eat')
  },
  gender:"man",
}
```
这样用 propName 定义的话就可以有多个属性自己去定义

### 属性为只读

```ts
interface MyInterface {
  name:string
  readonly age:number
}

let chauncey:MyInterface;
chauncey = {
  name:'chauncy',
  age:12,
}
chauncey.age = 11; // 报错，age 不能二次赋值，因为它是只读属性
```

## 数组类型

可采用 \[类型+方括号] 表示
```ts
const arr:number[] = []
```

可采用数组泛型 Array\<elemType> 表示法
```ts
const arr:Array<number> = []
``` 

可采用接口表示法
```ts
interface IArray {
  [index:number]:number
}
const arr:IArray = [1,2,3];
```

## 函数类型

函数约束，有函数本身的参数约束，返回值约束

还有函数本身赋值的变量的约束

可采用重载的方式才支持联合类型的函数关系

### 声明式类型的函数

>函数指定普通参数和返回值
```ts
function fooType(name:string,age:number):number{
  return age;
}

const myAge:number = fooType('chauncey',12);
```

>函数参数不确定
```ts
function fooType(name:string,age:number,gender?:string):number{
  return age;
}

const myAge:number = fooType('chauncey',12,'男');
```

>函数参数的默认值
```ts
function fooType(name:string='chauncey',age:number=11):number{
  return age;
}
const myAge:number = fooType();
```

### 表达式类型的函数

>直接在定义变量的时候约束
```ts
const fooType2:(name:string,age:number)=>number = (name:string,age:number):number=>{
  return age;
}
```

>通过接口方式来进行约束

```ts
interface Ifoo {
  (name:string,age:number):number
}
const fooType2:Ifoo = (name:string,age:number):number=>{
  return age;
}
```

>对于联合类型的函数，可以采用重载的方式

```ts
function getValue(value:number):number;
function getValue(value:string):string;
function getValue(value:string|number):string|number {
  return value;
}
const a:number = getValue(1);
const b:string = getValue("1");
```

## 类型断言

可以用来手动指定一个值的类型

```ts
function getAssert(name:string|number){
  // return (<string>name).length
  return (name as string).length 
}
```

:::tip 注意
类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的

React 只支持 as 语法
:::

## 类型别名

可以用来给一个类型起新名字

```ts
type strType = string|number;

let str:strType = 10;
str = "10";
```

>接口采用类型别名
```ts
interface ITypes1 {
  name:string 
}
interface ITypes2 {
  age:number 
}
type myTypes = ITypes1|ITypes2;

const chauncey:myTypes = {name:'chauncey'};
const chauncey1:myTypes = {age:11};
```

>限制字符串的选择
```ts
type events = 'click' | 'mouseover' | 'input';
function getEvent(e:events){
  return e;
}
getEvent('click');
```

## 枚举

用于取值被限定在一定范围内的场景

```ts
enum Days { Sun,Mon,Tue,Wed,Thu,Fri,Sat }
console.log(Days.Sun); // 0
console.log(Days.Sat); // 6
```

:::tip 注意
枚举成员会被赋值为从 0 开始递增的数字，同时也会被枚举值到枚举名进行反射
:::

## 类的修饰符

- public: 可以被外界访问的属性和方法
- private: 只能在类中被访问，不能被子类访问
- protected: 只能在类中和子类中被访问
- static: 可以被类直接调用，不允许用 this

```ts
class Person{
  name='chauncey'
  age=18
  say(){
   console.log(`My name is ${this.name} and I am a ${this.age} years old`)
  }
}

const p = new Person()
p.say()
console.log(p.name) // 默认可以访问，public
```

## 泛型

在定义函数、接口、类的时候，不预先指定其类型，而在使用的时候在指定类型的一种特性

功能：为了在声明时不好定义的数据类型，先做一个映射，当调用时在定义类型

```ts
function createArray<T>(length:number,value:T):T[]{
  let arr = []
  for(let i = 0; i < length; i++) {
    arr[i] = value 
  }
}
const strArr:string[] = createArray<string>(3,"1") // TS 可以在调用时指定泛型
const strArr1:number[] = createArray(3,1) // TS 会根据类型反推出泛型
```

>接口中使用泛型

```ts
interface ICreate {
  <T>(name:string,value:T):T[]
}
let foo:ICreate = <T>(name:string,value:T):T[] => {
  return []
}
const strArr:string[] = foo('meng','str')
```
