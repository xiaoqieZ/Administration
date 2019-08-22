<template>
    <div class="backgrod-unurl">
        <div class="login-wrap" v-show="showLogin">
            <div class="wrap">
            <h3>登录</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password">
            <button @click="golist">登录</button>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
            <button class="jiek" @click="requrey">接口暂时没用,可用茄子专用通道></button>
            </div>
            <div class="backs"></div>
        </div>

        <div class="login-wrap" v-show="showRegister">
            <div class="wrap">
            <h3>注册</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <button @click="register">注册</button>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
            </div>
            <div class="backs"></div>
        </div>
    </div>
</template>
 
 
<script>
import {setCookie,getCookie} from '../assets/js/cookie.js'
import post from '../api/https.js'
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
            //登录功能
            golist(){
                if(this.username == "" || this.password == ""){
                    alert("请输入用户名或密码")
                }else{
                    let data = {'username':this.username,'password':this.password}
                    /*接口请求*/
                    this.$http.post('/vueapi/index.php/Home/user/login',data,(res)=>{
                        console.log(res)
                    /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
                    if(res.data == -1){
                        this.tishi = "该用户不存在"
                        this.showTishi = true
                    }else if(res.data == 0){
                        this.tishi = "密码输入错误"
                        this.showTishi = true
                    }else if(res.data == 'admin'){
                    /*路由跳转this.$router.push*/
                        this.$router.push('/main')
                    }else{
                        this.tishi = "登录成功"
                        this.showTishi = true
                        setCookie('username',this.username,1000*60)
                        setTimeout(function(){
                            this.$router.push({path:'/MainHeader/CParameter/CurrencyData'})
                        }.bind(this),1000)
                    }
                })
            }
            },
            // 注册功能
            register(){
                if(this.newUsername == "" || this.newPassword == ""){
                    alert("请输入用户名或密码")
                }else{
                    let data = {'username':this.newUsername,'password':this.newPassword}
                    post("/vueapi/index.php/Home/user/register",data,(res)=>{
                        console.log(res)
                        if(res.data == "ok"){
                            this.tishi = "注册成功"
                            this.showTishi = true
                            this.username = ''
                            this.password = ''
                            /*注册成功之后再跳回登录页*/
                            setTimeout(function(){
                                this.showRegister = false
                                this.showLogin = true
                                this.showTishi = false
                            }.bind(this),1000)
                        }
                    })  
                }
            },
            // 注册卡片
            ToRegister(){
                        this.showLogin=false;
                        this.showRegister=true;
                    },
            // 登录卡片
            ToLogin(){
                this.showLogin=true;
                this.showRegister=false;
            },
            // 接口没用，直接跳转按钮
            requrey(){
                this.$router.push({path:'/NavBar/Homepage/Homepage'})
            },
  },
        mounted(){
        /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            if(getCookie('username')){
                this.$router.push('/NavBar/Homepage/Homepage')
    }
  },
}

    // function post(u,data,then){
    //     var url="http://localhost"+u;
    //     this.$http.post(url,data).then(then)
    // }
</script>

<style lang="less">
  html,body{
      height: 100%;
  }
    .backgrod-unurl{
        background: url(../../static/img/anjing.jpg) no-repeat;
        background-size:100% 100%;
        height: 100%;
        .login-wrap{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            .wrap{
                position: relative;
                z-index: 9;
                    h3{
                    color: #fff
                    }
                    span{
                        color: #fff
                    }
                    input{
                        display:block; 
                        width:300px; 
                        height:40px; 
                        line-height:40px; 
                        margin:0 auto; 
                        margin-bottom: 10px; 
                        outline:none; 
                        border:1px solid #888; 
                        padding:10px; 
                        border-radius: 5px;
                        box-sizing:border-box;
                    }
                    p{
                        color:red;
                        }
                    button{
                        display:block; 
                        width:250px; 
                        height:35px; 
                        line-height: 35px; 
                        margin:0 auto; 
                        border:none; 
                        background-color:#46a6ff; 
                        color:#fff; 
                        font-size:16px; 
                        margin-bottom:5px;
                        border-radius: 5px;
                        }
                        .jiek{
                            display:block; 
                            width:250px; 
                            height:40px; 
                            line-height: 40px; 
                            margin:0 auto; 
                            border:none; 
                            background-color:#dc256b;
                            color:#fff; 
                            font-size:16px; 
                            margin-bottom:5px;
                            border-radius: 5px;
                        }
                    span{
                        cursor:pointer;
                        }
                    span:hover{
                        color:#40a1e2; 
                        }
                        }
            .backs{
                    width: 500px;
                    height: 300px;
                    position: absolute;
                    background-color: #000;
                    opacity: 0.5;
                }
            }
    }
    
</style>