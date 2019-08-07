<template>
    <div class="About-us">
        <div class="Aboutitle">
            关于我们
        </div>
        <div class="Aboutcenter">
            <p>Hello 碳链科技</p>
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
    components:{
        'tabbar-home':tebbarhome
    }
}
</script>

<style lang="less">
.About-us{
    text-align: center;
    .Aboutitle{
        height: 36px;
        color: #fff;
        background: #5aa8fb;   
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Aboutcenter{
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
