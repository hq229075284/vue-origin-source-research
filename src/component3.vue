
<script>
import Component1 from './component1'
import Component2 from './component2'
export default {
    name:'component1Name',
    // components:{
    //     component2
    // },
    data(){
        return {
            isShow1:true,
            isShow2:false
        }
    },
    beforeCreate(){
        console.log('component 3 beforeCreated')
    },
    created(){
        console.log('component 3 created')
    },
    beforeMount(){
        console.log('component 3 beforeMount')
    },
    mounted(){
        console.log('component 3 mounted')
    },
    beforeUpdate(){
        console.log('component 3 beforeUpdate')
    },
    updated(){
        console.log('component 3 updated')
    },
    beforeDestroy(){
        console.log('component 3 beforeDestroy')
    },
    destroyed(){
        console.log('component 3 destroyed')
    },
    methods:{
        toggle(){
            this.isShow1=!this.isShow1
            this.isShow2=!this.isShow2
        }
    },
    render(){
        return <div class="this is component3">
        <button onClick={this.toggle}>click</button>
        {
            this.isShow1?<Component1/>:null
        }
        {
            this.isShow2?<Component2/>:null
        }
        </div>
    }
}
</script>