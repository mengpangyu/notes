const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function isObject(target) {
  const type = typeof target;
  return target !== null &&
    (type === 'object' || type === 'function');
}

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function clone(target, hash = new WeakMap()) {
  // 克隆原始类型
  const deepTag = [mapTag, setTag, arrayTag, objectTag]

  if (!isObject(target)) { return target; }
  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  }
  // 防止循环引
  if (hash.get(target)) { return hash.get(target); }
  hash.set(target, cloneTarget); // 克隆set
  if (type === setTag) {
    target.forEach(value => { cloneTarget.add(clone(value, hash)); });
    return cloneTarget;
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => { cloneTarget.set(key, clone(value, hash)); });
    return cloneTarget;
  }
  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) { key = value; }
    cloneTarget[key] = clone(target[key], hash);
  });
  return cloneTarget;
}

function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    default:
      return null;
  }
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    console.log('普通函数');
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log('匹配到函数体：', body[0]);
      if (param) {
        const paramArr = param[0].split(',');
        console.log('匹配到参数：', paramArr);
        return new Function(...paramArr, body[0]);
      } else { return new Function(body[0]); }
    } else { return null; }
  } else { return eval(funcString); }
}