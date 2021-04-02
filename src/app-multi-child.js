import Vue from 'vue'
import Component1 from './component1'
import Component2 from './component2'
debugger
new Vue({
    el: document.querySelector('#app'),
    render() {
        return <div>
            <Component1 />
            <Component2 />
        </div>
    },
})
