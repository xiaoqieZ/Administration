<template>
    <div class="About-us">
        <mt-header fixed title="关于我们">    
        </mt-header>
        <div class="Aboutcenter">
            <p>Hello 碳链科技</p>
        </div>
        <div>
            <input type="text" v-model="addspy">
        </div>
        <tabbar-home></tabbar-home>
    </div>
    
</template>

<script>
import tebbarhome from '../../components/Publictebbar/Publictebbar'
export default {
    data(){
        return{
            addspy:''
        }
    },
    components:{
        'tabbar-home':tebbarhome
    },
    created(){
        this.addspy=sessionStorage.getItem('password');//把password数据取出来给addspy
    },
}
</script>

<style lang="less">
.About-us{
    padding-top: 40px;
    .Aboutcenter{
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
