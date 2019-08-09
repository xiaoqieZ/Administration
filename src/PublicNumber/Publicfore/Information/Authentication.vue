<template>
    <div style="width:100%">
        <mt-header fixed title="实名认证">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="Authentitle">
            <el-steps :active="active" finish-status="success" align-center>
            <el-step title="填写信息"></el-step>
            <el-step title="补充信息"></el-step>
            <el-step title="认证完成"></el-step>
            </el-steps>
            <!-- 填写信息 -->
            <div class="Authencenter" v-show="fill==1">
                <div class="Authenradio">
                    <span>投资者类型：</span>
                    <el-radio-group v-model="radio">
                        <el-radio :label="1">个人</el-radio>
                        <el-radio :label="2">机构</el-radio>
                        <el-radio :label="3">产品</el-radio>
                    </el-radio-group>
                </div>
                <div>
                    <el-form label-width="90px">
                        <el-form-item label="手机号码：">
                            <el-input type="number" v-model="phone"></el-input>
                        </el-form-item>
                        <el-form-item label="短信验证：">
                            <el-input type="number" v-model="short"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮件：">
                            <el-input type="number" v-model="mail"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <el-radio-group v-model="checkList">
                         <el-checkbox label="阅读并同意">
                             <a >《北京润达信合投资基金管理有限公司微信公众号服务协议》</a>
                             </el-checkbox>
                         <br/>
                         <el-checkbox label="确认本人符合">《合格投资者》相关要求</el-checkbox>
                </el-radio-group>
            </div>
            <!-- 补充信息 -->
            <div v-show="fill==2">
                <el-form label-width="90px">
                    <el-form-item label="真实姓名">
                        <el-input type="text" v-model="phone"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-input type="text" v-model="short"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input type="number" v-model="mail"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="fill==3">
                <div class="goods">
                    恭喜您完成认证
                </div>
            </div>
                <div class="buttommagin">
                    <el-button type="primary" plain  @click="next" v-show="isShow==0">下一步</el-button>
                    <el-button type="primary"   @click="play" v-show="isShow==1" >完成</el-button>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        active: 0,
        isShow:0,
        radio: '',
        phone: '',
        short:'',
        mail:'',
        checkList:'',
        fill:1
      };
    },

    methods: {
      next() {
        if (this.active++ > 0){
            this.isShow=1;
            this.fill=3
            // return
        }else if(this.active++ ==1){
            this.fill=2
        }
      },
     play(){
        
     }
    }
  }
</script>

<style lang="less">
.Authentitle{
    margin-top: 50px;
    .Authencenter{
        margin: 20px 0;
        .Authenradio{
            padding: 0  0 20px 10px;
        }
    }
    .goods{
            width: 100%;
            height: 400px;
            text-align: center;
            line-height: 400px;
        }
    .buttommagin{
        /deep/.el-button--primary.is-plain{
            width: 100%;
        
        }
        /deep/.el-button--primary{
            width: 100%;
            margin: 0;
        }
    }
}
</style>
