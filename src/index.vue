<template>
    <div>a的值：{{a}}{{object.foo}}</div>
</template>

<script setup>
import {ref,reactive} from 'vue'
const a=ref(1)

debugger
const b = reactive({
  a
})

b.a=a

// Object(vue__WEBPACK_IMPORTED_MODULE_0__["toDisplayString"])($setup.object.foo) <- 👈render

// const toDisplayString = (val) => {
//     return isString(val)
//         ? val
//         : val == null
//             ? ''
//             : isArray(val) ||
//                 (isObject(val) &&
//                     (val.toString === objectToString || !isFunction(val.toString)))
//                 ? JSON.stringify(val, replacer, 2) <- 👈拆解ref
//                 : String(val);
// };
// const replacer = (_key, val) => {
//     // can't use isRef here since @vue/shared has no deps
//     if (val && val.__v_isRef) {
//         return replacer(_key, val.value); <- 👈拆解ref
//     }
//     else if (isMap(val)) {
//         return {
//             [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
//                 entries[`${key} =>`] = val;
//                 return entries;
//             }, {})
//         };
//     }
//     else if (isSet(val)) {
//         return {
//             [`Set(${val.size})`]: [...val.values()]
//         };
//     }
//     else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
//         return String(val);
//     }
//     return val;
// };
const object = { foo: ref(2) }
const {foo}=object

const state=ref(1)
state.value={y:2}
</script>

<script>
export default {
    data(){
        return {
            a:1
        }
    }
}
</script>