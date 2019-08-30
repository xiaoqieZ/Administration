<template>
    <div class="modefy">
        <mt-header fixed title="风险评测">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <div class="radios" v-show="values==0">
            <p>
            <span>1、您的主要收益来源是？</span>
            <el-radio-group v-model="radio">
              <el-radio :label="1">工资、劳务报酬</el-radio><br/>
              <el-radio :label="2">生产经营所得</el-radio><br/>
              <el-radio :label="3">利息、股息、转让等金融性资产收入</el-radio><br/>
              <el-radio :label="4">出租、出售房地产</el-radio>
            </el-radio-group>
            </p>
            <p>
                <span>2、您的主要收益来源是？</span><br/>
            <el-radio-group v-model="palss">
              <el-radio :label="1">劳务报酬</el-radio><br/>
              <el-radio :label="2">经营所得</el-radio><br/>
              <el-radio :label="3">利息、股息、入</el-radio><br/>
              <el-radio :label="4">出租、出地产</el-radio>
            </el-radio-group>
            </p>
            <el-button  type="primary" plain @click="go">提交</el-button>
        </div>
        <div class="radiosplay" v-show="values==1">
            <div class="Congratulations">
                <div class="Congratu">
                    <h4>恭喜您完成特定对象的风险测评，您的风险等级为：<span style="color:red">进取型A++</span></h4>
                </div>
            </div>
            <el-button  type="primary">确定</el-button>
            <p>测评信息不标准？<a>重新测试</a></p>
            <el-button  type="primary" @click="Publicthree">产品列表</el-button>
            <p>请确认上述信息无误</p>
            <el-button  type="primary" @click="Acquisition">信息采集</el-button>
            <p>投资者适当性基本信息采集</p>
        </div>
    </div>
</template>

<script>
import ajax from "../../../api/https.js";
export default {
    data(){
        return{
            values:0,
            radio:2,
            palss:1,
            getQuestlist:[]
        }
    },
    methods:{
        go(){
            let list={radio:this.radio,palss:this.palss}
            if(this.radio&&this.palss !=''){
                console.log(list)
                this.values=1
            }else{
                this.$message('不能为空');
            }
            // console.log(list)
        },
        Publicthree(){
            this.$router.push({path:'/Publicthree'})
        },
        Acquisition(){
            this.$router.push({path:'/Publicfore/04/Acquisition'})
        },
        //题目请求
        getQuesttion(){
            ajax.authGet.bind(this)('/api/Information/Account/Questionnaire',res=>{
                console.log(res);
                if(res.data.code ==200 ){
                    this.getQuestlist=res.data.data
                    
                }
            })
        },
    },
    mounted(){
        this.getQuesttion()
    }
}
</script>

<style lang="less">
.modefy{
    .radios{
        padding: 0 10px;
        margin-top: 50px;
    }
    /deep/.el-button--primary{
            width: 100%;
        }
    .radiosplay{
        margin-top: 50px;
        .Congratulations{
            width: 100%;
            height: 400px;
            .Congratu{
                width: 66%;
                line-height: 400px;
                margin: 0 auto;
            }
        }
    }    
}


</style>
