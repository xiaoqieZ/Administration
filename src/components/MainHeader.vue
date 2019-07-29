<template>
    <div class="rights">      
            <!-- <img src="../../static/img/youliya.jpg" alt="尤利娅"> -->
            <el-dropdown trigger="click">
                   <img src="../../static/img/youliya.jpg" alt="尤利娅">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">个人信息</el-dropdown-item>
                    <el-dropdown-item  icon="el-icon-circle-plus" 
                    divided
                    @click.native="login"
                    >退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
           
    }
    },
    methods:{
        login(){
            this.$router.push({path:'/login'})
        }
    }
}
</script>

<style lang="less">

.rights{
    width: 100%;
    /deep/.el-dropdown{
        width: 50px;
        height: 40px;
        padding-top: 10px;
        margin-left: 95%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 100%;
            height: 100%;
            border: 1px solid;
            border-radius: 50%;
        }
    }
}
</style>

