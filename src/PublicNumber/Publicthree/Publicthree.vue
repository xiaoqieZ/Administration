<template>
    <div class="Privates">
        <mt-header fixed title="私募产品">    
        </mt-header>
        <div class="raise">
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
        <tabbar-home></tabbar-home>
    </div>
</template>

<script>
import tebbarhome from '../../components/Publictebbar/Publictebbar'
export default {
    data(){
        return{
            huaihyh:'淮河一号'
        }
    },
    components:{
        'tabbar-home':tebbarhome
    },
    methods:{
        hhplai(){
            let data ={name:this.huaihyh}
            this.$router.push({name: 'Purchases',params:{data}})
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
}

</style>
