<template>
    <div class="rights">
        <div class="odd">
            <div>我是头部</div>
        </div>
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
           
    }
    }
}
</script>

<style lang="less">
.rights{
    width: 100%;
    .odd{
        width: 70px;
        height: 50px;
        margin-left: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

