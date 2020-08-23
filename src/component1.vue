<template>
<div class="this is component1">
    this is content of component1
    <component2/>
</div>
</template>

<script>
import component2 from './component2'
export default {
    name:'component1Name',
    components:{
        component2
    },
    data(){
        return {}
    },
    beforeCreate(){
        console.log('component 1 beforeCreated')
    },
    created(){
        console.log('component 1 created')
    },
    beforeMount(){
        console.log('component 1 beforeMount')
    },
    mounted(){
        console.log('component 1 mounted')
    },
    beforeUpdate(){
        console.log('component 1 beforeUpdate')
    },
    updated(){
        console.log('component 1 updated')
    },
    beforeDestroy(){
        console.log('component 1 beforeDestroy')
    },
    destroyed(){
        console.log('component 1 destroyed')
    },
}
</script>