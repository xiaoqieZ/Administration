<template>
    <div class="rights">      
            <el-dropdown trigger="click">
                   <img src="../../static/img/youliya.jpg" alt="尤利娅">
                   <span>{{name}}</span>
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
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
export default {
    data(){
        return{
           name:''
    }
    },
    methods:{
        login(){
                /*删除cookie*/
                delCookie('username');
                this.$router.push({path:'/login'})
            }
    },
    mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname;
            /*如果cookie不存在，则自动跳转到登录页*/
            if(uname == ""){
                this.$router.push('/')
            }
        },
}
</script>

<style lang="less">

.rights{
    width: 100%;
     .el-dropdown{
        width: 50px;
        height: 40px;
        padding-top: 10px;
        margin-left: 90%;
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

