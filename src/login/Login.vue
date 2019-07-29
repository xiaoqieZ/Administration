<template>
    <div class="backgrod-unurl">
        <div class="login-wrap" v-show="showLogin">
            <div>
            <h3>登录</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password">
            <button @click="golist">登录</button>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
            </div>
        </div>

        <div class="login-wrap" v-show="showRegister">
            <h3>注册</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <button >注册</button>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
        </div>
    </div>
</template>
 
 
<script>
    export default{
        data(){
            return{
                showLogin: true,
                showRegister: false,
                showTishi: false,
                tishi: '',
                username: '',
                password: '',
                newUsername: '',
                newPassword: ''
            }
        },
        methods:{
            ToRegister(){
                this.showLogin=false;
                this.showRegister=true;
            },
            ToLogin(){
                this.showLogin=true;
                this.showRegister=false;
            },
            golist(){
                this.$router.push({path:'/MainHeader/CParameter/CurrencyData'})
            }
        }
    }
</script>

<style lang="less">
  html,body{
      height: 100%;
  }
    .backgrod-unurl{
        background: url(../../static/img/anjing.jpg) no-repeat;
        background-size:100% 100%;
        height: 100%;
    }
    .login-wrap{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        h3{
            color: #fff
        }
        span{
            color: #fff
        }
        }
    input{
        display:block; 
        width:250px; 
        height:40px; 
        line-height:40px; 
        margin:0 auto; 
        margin-bottom: 10px; 
        outline:none; 
        border:1px solid #888; 
        padding:10px; 
        box-sizing:border-box;
    }
    p{
        color:red;
        }
    button{
        display:block; 
        width:250px; height:40px; 
        line-height: 40px; margin:0 auto; 
        border:none; background-color:#41b883; 
        color:#fff; 
        font-size:16px; 
        margin-bottom:5px;
        }
    span{
        cursor:pointer;
        }
    span:hover{
        color:#41b883;
        }
</style>