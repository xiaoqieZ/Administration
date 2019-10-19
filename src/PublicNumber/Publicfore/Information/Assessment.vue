<template>
  <div class="modefy">
    <mt-header fixed title="风险评测">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="radios" v-show="values==0">
      <div class="options" v-for="(item,index) in getQuestlist" :key="item.id">
        <p>
          {{item.title}}
          <span>{{item.optionType==2?'（多选）':''}}</span>
        </p>
        <el-radio-group v-model="item.radio" v-if="item.optionType==1">
          <el-radio
            :label="option.id"
            v-for="option in item.options"
            :key="option.id"
            @change="ChangeRadio(item,index,option)"
          >{{option.content}}</el-radio>
          <br />
        </el-radio-group>
        <el-checkbox-group v-model="form.checkbox" v-if="item.optionType==2">
          <el-checkbox
            v-for="option in item.options"
            :label="option.id"
            :key="option.id"
            @change="ChangeRadio2(item,index,option)"
          >{{option.content}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="button_submit" v-if="subm">
        <el-button type="primary" plain @click="submit">提交</el-button>
      </div>
    </div>
    <div class="radiosplay" v-show="values==1">
      <div class="Congratulations">
        <div class="Congratu">
          <p>恭喜您完成特定对象的风险测评</p>
          <span>您的风险等级为：</span>
          <span style="color:red">{{authentication.riskLevelName}}</span>
        </div>
      </div>
      <el-button type="primary" @click="determine">确定</el-button>
      <p>
        测评信息不标准？
        <span class="retest" @click="retest">重新测试</span>
      </p>
      <el-button type="primary" @click="Publicthree">产品列表</el-button>
      <p>请确认上述信息无误</p>
      <el-button type="primary" @click="Acquisition">信息采集</el-button>
      <p>投资者适当性基本信息采集</p>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="80%"
      center
    >
      <span>小茄子：需要先实名认证才可以进行风险测评喔！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dssy">去认证</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
import storage from "../../../api/storage.js";
export default {
  data() {
    return {
      subm:true,
      values: 0,
      radio: "",
      getQuestlist: [],
      RadioList: [],
      centerDialogVisible: false,
      form: {
        radio: "",
        checkbox: []
      },
      a: [],
      information: {}, //获取当前用户信息
      authentication: {} //获取当前用户注册认证信息
    };
  },
  methods: {
    //提交答案
    submit() {
      if (this.RadioList.length == this.getQuestlist.length) {
        let data = this.RadioList;
        ajax.authPost.bind(this)(
          "/api/Information/Account/Questionnaire",
          data,
          res => {
            this.authentication = res.data.data;
            this.values = 1;
          }
        );
      } else {
        this.$message("选择题都要选上");
      }
    },
    dssy() {
      //去实名认证
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore/Information/Authentication" });
    },
    determine() {
      this.$router.push({ path: "/Publicfore" });
    },
    Publicthree() {
      this.$router.push({ path: "/Publicthree" });
    },
    Acquisition() {
      this.$router.push({ path: "/Publicfore/Information/Acquisition" });
    },
    //题目请求
    getQuesttion() {
      ajax.authGet.bind(this)("/api/Information/Account/Questionnaire", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.getQuestlist = res.data.data;
        }
      });
    },
    //选择题选中
    ChangeRadio(item, index, open) {
      this.RadioList[index] = {
        itemId: item.id,
        optionId: [open.id]
      };
      // console.log(this.RadioList)
    },
    ChangeRadio2(item, index, open) {
      if (this.a[index]) {
        this.a[index].push(open.id);
      } else {
        this.a[index] = [open.id];
      }
      this.RadioList[index] = {
        itemId: item.id,
        optionId: this.a[index]
      };
      // console.log(this.RadioList)
    },
    //重新测试
    retest() {
      this.values = 0;
    },
    //展示已实名认证的用户信息
    getPersonal() {
      ajax.authGet.bind(this)("/api/Information/Account/GetByOpenId", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.information = res.data.data;
          if (this.information.name == null) {
            this.centerDialogVisible = true;
              this.subm=false      
          } else {
            this.getQuesttion();
            
          }
        }
      });
      //获取当前用户注册认证信息
      ajax.authGet.bind(this)(
        "/api/Information/Account/Authentication",
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.authentication = res.data.data;
            if(this.authentication.riskLevelName == null){
              this.values = 0;
            }else{
              this.values = 1;
            }
          }
        }
      );
    }
  },
  mounted() {
    this.getPersonal();
    // this.getQuesttion();
  }
};
</script>

<style lang="less">
.modefy {
  .radios {
    padding: 0 10px;
    margin-top: 50px;
    .options {
      padding: 10px 0;
      .el-radio {
        white-space: normal;
        word-break: break-all;
      }
    }
    .button_submit {
      padding: 50px 0;
    }
  }
  /deep/.el-button--primary {
    width: 100%;
  }
  .radiosplay {
    margin-top: 50px;
    .Congratulations {
      width: 100%;
      height: 400px;
      .Congratu {
        width: 66%;
        text-align: center;
        margin: 0 auto;
        p {
          text-align: center;
          font-weight: 600;
          font-size: 17px;
        }
      }
    }
    .retest {
      color: red;
    }
  }
}
</style>
