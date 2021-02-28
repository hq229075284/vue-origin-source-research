import Vue from 'vue'
import main from './main'
import component1 from './component1'
// import router from './router'
debugger
new Vue({
    el:document.querySelector('#app'),
    render:(h)=>h(component1),
    // render:(h)=>h(main),
    // router
})
