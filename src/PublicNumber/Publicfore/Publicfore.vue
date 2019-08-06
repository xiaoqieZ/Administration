<template>
    <div>
        我的
        <div>
            <button @click="goplay">进入后台</button>
        </div>
        <tabbar-home></tabbar-home>
    </div>
    
</template>

<script>
import tebbarhome from '../../components/Publictebbar/Publictebbar'
export default {
    data(){
        return{

        }
    },
    methods:{
        goplay(){
            this.$router.push({path:'/'})
        }
    },
    components:{
        'tabbar-home':tebbarhome
    }
}
</script>

<style>

</style>
