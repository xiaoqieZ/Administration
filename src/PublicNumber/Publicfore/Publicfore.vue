<template>
    <div class="myhome">
        <div class="myhometitle">
            我的
        </div>
        <div class="myhomettop">
            <div class="myhometimg">
                <div class="imgs">
                    <img src="../../../static/img/youliya.jpg" alt="">
                    <div class="imgtime">
                        <p>专业投资者</p>
                    </div>
                </div>
            </div>
            <div class="myhomerequrey">
                <p>姓名：<span>小茄子</span></p>
                <p>手机：<span>10010</span></p>
                <p>资产：<span style="font-weight: 600;color:red">7000.000.00￥</span></p>
                <p>类别：<span>个人投资者</span></p>
            </div>
        </div>
        <div> 
            <el-button 
            @click.native="gos" 
            type="primary"
            plain
            style="width:100%"
            ><i class="el-icon-menu"></i>&nbsp;进入后台系统</el-button>
        </div>
        <!-- 信息列表 -->
        <div class="myhometcenter">           
                <div class="myhometupdey" >
                        <p style="font-weight: 800;">
                        <i class="el-icon-s-check"></i>
                        <span>投资者认定</span>
                    </p>
                    <router-link to="/Publicfore/04/Identification" >
                    <el-button type="warning" size="mini">路演清单</el-button> 
                    </router-link>
                </div>
             <router-link to="/Publicfore/04/Authentication" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>实名认证</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <router-link to="/Publicfore/04/Assessment" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>风险评测</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <router-link to="/Publicfore/04/Acquisition" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>信息采集</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <router-link to="/Publicfore/04/Material" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>证明材料</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <router-link to="/Publicfore/04/Conversion" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>投资者转化(选填)</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
        </div>
        <!-- 交易记录 -->
        <div class="myhometcenter">
            <div class="myhometupdey">
                <p style="font-weight: 800;">
                    <i class="el-icon-date"></i>
                    <span>交易记录</span>
                </p>
            </div>
            <router-link to="/Publicfore/07/Reservation" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>预约记录</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <router-link to="/Publicfore/07/Purchase" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>购买申请记录</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <router-link to="/Publicfore/07/Redeem" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>赎回记录</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <router-link to="/Publicfore/07/Returnvisit" >
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-user"></i>
                    <span>回访记录</span>
                </p>
                <i class="el-icon-arrow-right"></i>
            </div>
            </router-link>
            <div class="myhometupdey">
                <p>
                    <i class="el-icon-document-copy"></i>
                    <span>合同电子</span>
                </p>
                <p>
                    <el-button type="warning" size="mini">去部署</el-button>
                    <el-button type="warning" size="mini">全部</el-button>  
                </p>
            </div>
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
    methods:{
        gos(){
            this.$router.push({path:'/NavBar/Homepage/Homepage'})
        },
        // Identification(){
        //     this.$router.replace({path:'/Publicfore/Identification'})
        // }
    },
    components:{
        'tabbar-home':tebbarhome
    }
}
</script>

<style lang="less">
    .myhome{
        background: #dde1e6;
        .myhometitle{
            height: 36px;
            color: #fff;
            background: #5aa8fb;   
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .myhomettop{
            width: 100%;
            padding: 20px;
            margin-top: 10px;
            background: #fff;
            display: flex;
            align-items: center;
            .myhometimg{
                .imgs{
                    width: 80px;
                    height: 120px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                    } 
                }
                .imgtime{
                    height: 25px;
                    background: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    p{  
                        line-height: 25px;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
            .myhomerequrey{
                padding-left: 20px;
            }
        }
        .myhometcenter{
            margin-top: 10px;
            .myhometupdey{
                width: 100%;
                height: 40px;
                padding: 0 8px;
                border-bottom: 1px solid #cac0c0;;
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                p{
                    font-size: 16px;
                    margin: 0;
                    color: #000;
                }
            }
        }
    }
</style>
