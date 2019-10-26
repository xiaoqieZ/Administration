<template>
    <div>
        首页
        <!-- <div>
            {{this.$store.state.count}}
        </div>
        <div @click="ss">点击</div> -->
    </div>
</template>

<script>
import store from '../../store/index.js'
export default {
    data(){
        return{
            
        }
    },
    methods:{
        // ss(){
        //     console.log(this);
        //     this.$store._mutations.include[0]();
        // }
    },
    store,
}
</script>

<style lang="less">

</style>
