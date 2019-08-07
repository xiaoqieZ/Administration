<template>
    <div class="Privates">
        <div class="Privatetitle">
            私募产品
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
.Privates{
    text-align: center;
    .Privatetitle{
        height: 36px;
        color: #fff;
        background: #5aa8fb;   
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

</style>
