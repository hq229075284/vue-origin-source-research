# vue初始化过程

## 总览

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
