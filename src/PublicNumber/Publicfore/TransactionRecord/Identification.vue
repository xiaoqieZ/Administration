<template>
    <div>
        <mt-header fixed title="电子签约">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="sign_title">
            <div>
                <div>待签约</div>
            <div>
                <p>演示机构</p>
                <p>补充协议</p>
            </div>
            </div>
            <div>
                <el-button type="info">取 消</el-button>
                <el-button type="primary">去签署</el-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{

        }
    },

}
</script>

<style lang="less" scoped>
.sign_title{
    padding-top: 50px;
}
</style>
