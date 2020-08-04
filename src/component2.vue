<template>
<div class="this is component2">
    this is content of component2
</div>
</template>

<script>
export default {
    name:'component2Name',
    data(){
        return {}
    },
    beforeCreate(){
        console.log('component 2 beforeCreated')
    },
    created(){
        console.log('component 2 mounted')
    },
    beforeMount(){
        console.log('component 2 mounted')
    },
    mounted(){
        console.log('component 2 mounted')
    },
    beforeUpdate(){
        console.log('component 2 beforeUpdate')
    },
    updated(){
        console.log('component 2 updated')
    },
    beforeDestroy(){
        console.log('component 2 beforeDestroy')
    },
    destroyed(){
        console.log('component 2 destroyed')
    },
}
</script>