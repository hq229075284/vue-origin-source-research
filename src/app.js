import Vue from 'vue'
import main from './main'
import router from './router'

new Vue({
    el:document.querySelector('#app'),
    render:(h)=>h(main),
    router
})
