[toc]

# Vue

## vue初始化过程总览

1. 实例化root组件（$root）
   1. omit
   2. 调用组件的`created`函数
   3. 调用`vm.$mount
      1. 进行**组件mount实例化流程**
   4. 调用`mounted`函数

### 组件mount实例化流程

1. 调用`beforeMount`函数

2. 利用watcher可立即执行的特性，执行`updateComponent`

   1. 执行_render

      1. 在组件实例上设置$vnode属性指向与当前vue实例相对应的vnode节点

      2. 通过组件内的`render`函数，创建当前组件下的根vnode节点

         1. 如果是组件的化
            1. 执行`createComponent`，**该过程不涉及组件的实例化**
               1. 创建子构造函数`VueComponent`，继承`Vue`构造函数，并将`Vue`构造函数上的部分属性赋值到`VueComponent`函数上
               2. 通过`transformModel`函数处理v-model对应的属性和监听的事件
               3. 执行`installComponentHooks`函数，在`createElement`的第二个参数`data`部分添加`hook`对象，内部添加`init`、`prepatch`、`insert`、`destroy`四个基础函数，在通过vnode创建组件实例的过程中会调用`init`
         2. 普通html标签
            1. 通过`new VNode(...)`创建vnode节点

      3. 设置创建的`vnode`节点的`parent`属性指向父级vnode，即当前组件在被调用视图中对应的`vnode`节点

         ```html
         <!-- my component -->
         <!-- 此处div对应的vnode节点的parent为other component中所指的vnode节点 -->
         <div></div>
         
         <!-- other component -->
         <div>
          <!-- 

            `当前组件在被调用视图中对应的vnode节点`：
            指的是此处的vnode节点👇，vnode=createElement(MyComponent)
            -->
             <MyComponent></MyComponent>
         <div>
         ```

   2. 执行_update

      1. 设置组件实例的`_vnode`属性指向当前组件的根`vnode`，即_render中创建的`vnode`
      2. 执行`patch`函数
         1. 执行`createElm`函数
            1. 执行`createComponent` 函数
               1. 如果此处vnode是组件的话，会调用创建`vnode`时，通过`installComponentHooks`添加的`init`函数
                  1. 通过`createComponentInstanceForVnode`函数，根据`vnode`，实例出一个组件实例
                     1. `options`对象作为`VueComponent`实例化的入参，options对象中`_parentVnode`属性指向`_render`创建的vnode，`parent`属性指向`_render`创建的vnode所在的context（即父组件实例）
                     2. 通过`new vnode.componentOptions.Ctor(options)`对组件vnode进行实例化，由于没有`el`配置，所以不会调用`$mount`
                  2. 将组件实例挂载到`vnode.componentInstance`
                  3. 调用组件实例的`$mount`函数
                     1. 进行**组件mount实例化流程**
               2. `组件vnode`通过`init`函数创建`vm实例`后
                  1. 执行`initComponent`函数
                     1. 将vm实例上$el属性赋值给`vnode.elm`
                     2. 调用`invokeCreateHooks`执行组件被创建时的`create`hook 回调，并将存在的`insert`函数压入`insertedVnodeQueue`队列。供后续组件挂载到document后回调
                  2. 将`vnode.elm`插入到父级html节点中
            2. **如果vnode节点不是组件节点的话，进行以下步骤**
               1. 创建html元素，并赋值给在vnode节点的`elm`属性
               2. 调用`createChildren`，遍历所有children vnode节点
                  1. 对所有child调用createElm，将创建的子html元素插入到vnode.elm中
               3. 将当前的vnode.elm插入到父级html元素中
         2. 执行`removeVnodes`移除原有节点
            1. 移除时，会考虑transition组件的过渡移除
            2. rm函数带listeners计数器，其值为从原$root组件往下，到第一个非组件vnode节点（包含）为止的所有vnode上的（`remove`+1）的和，即`listener=n*(cbs.remove.length+1)`
            3. 对原$root的vnode即其子vnode，递归的移除`refs`和调用`directive`的`unbind`函数
            4. 执行`insertedVnodeQueue`中的所有函数（调用mounted函数）
      3. 将vnode对应的elm赋值给组件实例的`$el`属性上

## vue内部如何实现依赖收集

### 相关对象了解

```
Watch实例属性：
newDeps// 用于收集dep实例
newDepIds// 用于收集dep实例的id
deps// 用于记录上一次收集的dep实例
depIds// 用于上一次收集的dep实例的id
```

```
Dep实例属性：
subs// 用于收集Watch实例
```

```
Dep.target// targetStack最后一个watch实例元素
targetStack // 记录watch的堆栈，数据类型为Array，最后一个元素为当前watch实例，等价于Dep.target
```

vue组件实例初始化结束后，在调用mountComponent时，会产生一个render_watcher（Watcher实例）,并将此watcher推入到targetStack中，此时Dep.target引用此watcher。

```javascript
var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      // omit
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, { // <- updateComponent会同步执行，且在执行前，此render_watcher会被推入targetStack
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
```

之后调用updateComponent函数构建组件vnode树，在此期间会访问data上的被observe的属性，比如：

```javascript
{
    data(){
     return {
         a:1
     }
 }
 render(){
     return <div>{this.a}</div>
 }
}
```

此时的`a`就是当前render的依赖

在初始化组件时会observe `a`，会为其设置getter：

```javascript
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();// <- 当前属性的依赖标识对象

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () { // <- 设置getter
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();// <- 注入依赖关系
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {// <-数据被赋值时执行
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();// <-执行subs中的watcher的update函数
    }
  });
}
```

在组件render时，Dep.target指向的当前的render_watcher，dep.depend()会在当前的dep对象和Dep.target之间构建相互的依赖关系，即实现了在render过程中将引用的依赖关联到render_watcher，这样一来，当某一监测数据被赋值时，就能触发组件的updateComponent函数来重新渲染组件。

![image-20210419103625987](C:\Users\22907\AppData\Roaming\Typora\typora-user-images\image-20210419103625987.png)

### watcher被触发的过程

被observe的数据被赋值时，会调用setter函数，通过dep.notify()来调用每一个与此依赖相关的watcher实例的update函数（其中会调用queueWatcher）。

在queueWatcher函数中watcher都被推入到queue队列中，将在nextTick（Promise.resolve().then）后按watcher.id由小到大进行调用`watcher.run()`

> watcher.id越小表示在queue队列中执行的优先级越高，因为此watcher注册地早。

### cleanupDeps

每个watcher收集完依赖后都会执行cleanupDeps，此函数将比对上一次和这一次收集的依赖，检测不再需要的老的依赖，并从该老依赖的subs中删除此watcher来解除依赖关系，并将此次收集的依赖赋值给`depIds`、`deps`来保留最后一次收集依赖的记录，同时将`newDepIds`、`newDeps`重置为空，用于收集下一次依赖

## watch和computed的实现

### watch

在组件实例化的时候，初始化组件配置项watch

```javascript
function initWatch (vm, watch) {
  for (var key in watch) { // <-watch使用for...in循环出来的,顺序无法保证，顺序由各浏览器的实现决定
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
```

在createWatcher中通过new Watcher创建Watcher实例，并通过`Watcher.prototype.get`获取对应watch属性的值，从而触发该属性的getter，通过dep.depend()将watcher和dep绑定依赖关系。

```javascript
get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
```



## 组件更新过程及prop更新时机
