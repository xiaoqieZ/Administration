<template>
    <div class="Privates">
        <mt-header fixed title="私募产品">    
        </mt-header>
        <div class="raise" v-show="muj==0">
            <div class="aggre">
                <p>您现在是<span style="color:red">进取型(C5)</span>投资者推荐下列产品</p>
            </div>
            <div class="plops">
                <div class="period"><Icon type="ios-bookmark" size="20" />募集期</div>
                    <div class="huaihe">
                        <span>{{huaihyh}}</span>
                    </div>
                    <div class="first">
                        <div class="sales">
                            <h4>首发热售</h4>
                            <el-divider direction="vertical"></el-divider>
                            <span>当前净值：--</span>
                        </div>
                        <!-- <i class="el-icon-help" @click="hhplai"></i> -->
                        <Icon type="md-log-in" class="help" @click="hhplai" size="25"/>
                    </div>
            </div>
            <div class="plops">
                <div class="period"><Icon type="ios-bookmark" size="20" />运作期</div>
                    <div class="huaihe">
                        <span>下载中心测试小而美</span>
                    </div>
                    <div class="first">
                        <div class="sales">
                            <div class="latest">
                                <p class="reds">26.66%</p>
                                <p>最新收益</p>
                            </div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="nworth">
                                <p>当前净值：<span>1.2665</span></p>
                                <p>基金经理：</p>
                            </div>
                        </div>
                        <Icon type="md-log-in" class="help"  size="25"/>
                    </div>
            </div>
        </div>
        <div class="kong" v-show="muj==1">
            <div class="kgtitle">不实名的话不太想给你展示产品</div>
            <div class="img">
                <img src="../../../static/img/sgd.png" alt="表情包">
            </div>
        </div> 
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            :append-to-body="true"
            width="80%"
            center>
            <span>小茄子：需要先实名认证才可以选购基金产品喔！</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dssy">去认证</el-button>
            </span>
        </el-dialog>
        <tabbar-home></tabbar-home>
    </div>
</template>

<script>
import tebbarhome from '../../components/Publictebbar/Publictebbar'
import { getCookie } from '../../assets/js/cookie.js'
export default {
    data(){
        return{
            huaihyh:'淮河一号',
            muj:1,   //没有实名认证的话，不展示产品页
            centerDialogVisible:false
        }
    },
    components:{
        'tabbar-home':tebbarhome
    },
    methods:{
        hhplai(){
            let data ={name:this.huaihyh}
            this.$router.push({name: 'Purchases',params:{data}})
        },
        dssy(){    //去实名
            this.centerDialogVisible=false
            this.$router.push({path: '/Publicfore/04/Authentication'})
        }
    },
    mounted(){
         /*在本地拿到access_token给mname*/
        let mname = sessionStorage.getItem("feng");
        /*如果access_token不存在，则跳出dialog框，选择回到实名页*/
        if(mname){
            this.muj=0 
        }else{
            this.centerDialogVisible=true 
        }
    }
}
</script>

<style lang="less">
.Privates{
    background: #dde1e6;
    .raise{
        margin-top: 40px;
        margin-bottom: 65px;
        background: #fff;
        .aggre{
            height: 60px;
            line-height: 56px;
            border-bottom: 9px solid #d0d0d0;
            p{
                padding-left:10px; 
            }
        }
        .plops{  
        .period{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid;
        }
        .huaihe{
            height: 40px;
            line-height: 40px;
        }
        span{
            padding-left: 10px;
        }
        .first{
            height: 70px;
            border-bottom: 1px solid;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .sales{
                display: contents;
                h4{
                    color:red;
                    padding-left: 10px;
                }
                .el-divider--vertical{
                    margin: 0 -60px;
                }
                .latest{
                    padding-left: 10px;
                    .reds{
                        color:red;
                        font-weight: 600
                    }
                }
            }
            .help{
                padding-right: 10px;
            }
        }
        }
    }
    .kong{
        margin-top: 50px;
        .kgtitle{
            text-align: center;
        }
        .img{
            width: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}

</style>
