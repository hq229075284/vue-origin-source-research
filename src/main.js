import App from './index.vue'
import {createApp,reactive} from 'vue'

const $count=reactive({count:1,deep:{level:2}})
// new Proxy({count:1},baseHandlers)

// Reflect.get(target, key, receiver);
$count.deep // 此时触发proxy的get，将deep对象临时包装成proxy对象，并在proxyMap上添加该对象和该proxy对象的映射，之后返回该proxy对象，
// if (isObject(res)) { <- 👈判断值为对象
//     // Convert returned value into a proxy as well. we do the isObject check
//     // here to avoid invalid value warning. Also need to lazy access readonly
//     // and reactive here to avoid circular dependency.
//     return isReadonly ? readonly(res) : reactive(res); <- 👈包装成proxy
// }
$count.deep // 第二次访问时仍将deep对象临时包装一次返回，但是此次包装时，该对象在proxyMap上已存在对应的proxy对象，直接返回映射的proxy对象

// if (!isObject(target)) {
//     if ((process.env.NODE_ENV !== 'production')) {
//         console.warn(`value cannot be made reactive: ${String(target)}`);👈
//     }
//     return target;
// }
const $a=reactive(1) // 不允许， 

const app=createApp(App)

app.mount('#app')