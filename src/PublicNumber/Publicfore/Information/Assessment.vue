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
          <el-radio
            :label="option.id"
            v-for="option in item.options"
            :key="option.id"
            @change="ChangeRadio($event,item,i,option)"
          >{{option.content}}</el-radio>
          <br />
        </el-radio-group>
      </div>
      <el-button type="primary" plain @click="go">提交</el-button>
    </div>
    <div class="radiosplay" v-show="values==1">
      <div class="Congratulations">
        <div class="Congratu">
          <p>恭喜您完成特定对象的风险测评</p>
          <span>您的风险等级为：</span>
          <span style="color:red">{{listoption.riskLevelName}}</span>
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
        <el-button @click="cancel">取 消</el-button>
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
      values: 0,
      radio: "",
      getQuestlist: [],
      RadioList: [],
      listoption: {},
      centerDialogVisible: false
    };
  },
  methods: {
    //提交答案
    go() {
      if (this.RadioList != "" && this.RadioList.length > 11) {
        let data = this.RadioList;
        ajax.authPost.bind(this)(
          "/api/Information/Account/Questionnaire",
          data,
          res => {
            console.log(res);
            if (res.data.code == 200) {
              this.listoption = res.data.data;
              let Risk = this.listoption;
              storage.set("Risk", Risk);
            }
          }
        );
        this.values = 1;
      } else {
        this.$message("不能为空");
      }
    },
    dssy() {
      //去实名认证
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore/Information/Authentication" });
    },
    determine(){
      this.$router.push({ path: "/Publicfore" });
    },
    //取消实名认证
    cancel() {
      this.centerDialogVisible = false;
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
    ChangeRadio(e, index, i, o) {
      this.RadioList[i] = {
        itemId: index.id,
        optionId: [o.id]
      };
        console.log(this.RadioList[i])

    },
    //重新测试
    retest() {
      this.values = 0;
    }
  },
  mounted() {
    this.getQuesttion();
    let listaktion = storage.get("listaktion");
    if (!listaktion) {
      this.centerDialogVisible = true;
    }
    //已测评的界面
    let listRisk = storage.get("Risk");
    if (listRisk) {
      this.listoption = listRisk;
      this.values = 1;
    } else {
      this.values = 0;
    }
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
      .el-radio{
            white-space: normal;
    word-break: break-all;
      }
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
