<template>
    <div class="modefy">
        <mt-header fixed title="风险评测">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <div class="radios" v-show="values==0">
            <div class="options" v-for="(item,i) in getQuestlist" :key="item.id">
                <p>{{item.title}}</p>
                <el-radio-group v-model="item.radio">
                <el-radio :label="option.id" v-for="option in item.options" @change="ChangeRadio($event,item,i,option)">{{option.content}}</el-radio><br/>
                </el-radio-group>
            </div>
            <el-button  type="primary" plain @click="go">提交</el-button>
        </div>
        <div class="radiosplay" v-show="values==1">
            <div class="Congratulations">
                <div class="Congratu">
                    <h4>恭喜您完成特定对象的风险测评
                        <span style="color:red">您的风险等级为：{{listoption.riskLevelName}}</span></h4>
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
            radio:'',
            getQuestlist:[],
            RadioList:[],
            listoption:{}
        }
    },
    methods:{
        //提交答案
        go(){
            if(this.RadioList != "" && this.RadioList.length > 11){
                this.values=1
                let data=this.RadioList
                ajax.authPost.bind(this)('/api/Information/Account/Questionnaire',data,res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.listoption=res.data.data
                        let Risk =this.listoption.riskLevelName
                        sessionStorage.setItem('Risk',Risk)
                    }
                })
            }else{
                this.$message('不能为空');
            }
            
        },
        getpot(){
            ajax.authGet.bind(this)('/api/Information/Account/Authentication',res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.listoption=res.data.data
                    }
                })
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
                if(res.data.code == 200 ){
                    this.getQuestlist=res.data.data
                    
                }
            })
        },
            //选择题选中
    ChangeRadio(e, index,i,o) {
      this.RadioList[i] = {
        itemId:index.id,
        optionId:[o.id],
      };
    //   console.log(this.RadioList)
    },
    },
    mounted(){
        this.getQuesttion()
        this.getpot()
        if(this.listoption.riskLevelName!=''){
            this.values=1
        }
    }
}
</script>

<style lang="less">
.modefy{
    .radios{
        padding: 0 10px;
        margin-top: 50px;
        .options{
            padding: 10px 0;
        }
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
