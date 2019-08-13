<template>
    <div class="hition">
        <mt-header fixed title="热门资讯">
            <router-link to="/Publicone" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> 
        <div class="hit">
            <p>
                暂无其他咨询
            </p>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="less">
.hition{
    .hit{
        margin-top: 50px;
        p{
            text-align: center
        }
    }
}
</style>