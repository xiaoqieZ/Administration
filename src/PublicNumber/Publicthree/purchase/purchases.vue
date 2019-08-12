<template>
    <div class="goshoping">
        <div class="shopings">
            <mt-header fixed :title="title">
                <router-link to="/Publicthree" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header> 
        </div> 
        <div class="funds">
           <span>基金类型</span>
           <span>股权投资基金</span>
        </div> 
        <p style="font-size:14px;padding-left:10px">三板</p>
        <P style="height:10px;background:#d4d2d2;"></P>
        <div class="funds">
           <span>风险等级</span>
           <span>高级风险(R5)</span>
        </div> 
        <div class="funds">
           <span>基金合同</span>
        </div>
        <div class="funds">
           <span>基金档案</span>
        </div>
        <div class="anniu">
            <el-button type="primary" style="width:48%">预约</el-button>
            <el-button type="primary" style="width:48%">购买</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           title: this.$route.params.data.name
        }
    }
}
</script>

<style lang="less" scoped>
.goshoping{
    width: 100%;
    .shopings{
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .funds{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #d4d2d2;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
    }
    .anniu{
        width: 100%;
        padding: 10px 10px;
        display: flex;
        justify-content: space-between
    }
}
</style>