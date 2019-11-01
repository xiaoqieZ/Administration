<template>
  <div>
    <mt-header fixed title="投资者购买信息确认">
      <router-link to="/Publicthree/Purchases" slot="left">
        <mt-button icon="back" @click="Return">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="confirmation" v-if="list">
      <!-- 投资者确认 -->
      <div class="confirm">
        <div class="confirm_title">投资者确认</div>
        <div class="confirm_list" v-if="information.mechanismName=information.mechanismName">
          <p>机构名称</p>
          <span>{{information.mechanismName}}</span>
        </div>
        <div class="confirm_list">
          <p>操作人员</p>
          <span>{{information.name}}</span>
        </div>
        <div class="confirm_list">
          <p>{{information.certificateTypeName}}</p>
          <span>{{information.certificateNo}}</span>
        </div>
        <div
          class="confirm_list"
          v-if="confirmData.mechanismCertificateNo=confirmData.mechanismCertificateNo"
        >
          <p>机构证件号</p>
          <span>{{confirmData.mechanismCertificateNo}}</span>
        </div>
        <div class="confirm_list">
          <p>投资者风险承受等级</p>
          <span>{{risk.riskLevelName}}</span>
        </div>
        <div class="confirm_list">
          <p>产品风险等级</p>
          <span>{{riskLevelName.riskLevelName}}</span>
        </div>
        <div class="confirm_list">
          <p>投资者类型</p>
          <span>{{risk.investorTypeName}}</span>
        </div>
        <div class="confirm_list">
          <p>投资者资格</p>
          <span>{{whether=true?'合格':'不合格'}}</span>
        </div>
        <div class="confirm_list">
          <p>合同协议确认</p>
          <p>
            <span></span>
            <span></span>
            <span></span>
          </p>
        </div>
      </div>
      <!-- 补充材料 -->
      <div class="confirm">
        <div class="confirm_title">补充材料</div>
        <el-form class="demo-ruleForm" label-width="100px">
          <el-form-item label="账户名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="缴款账号">
            <el-input v-model="account"></el-input>
          </el-form-item>
          <el-form-item label="开户行信息">
            <el-input v-model="bank"></el-input>
          </el-form-item>
          <el-form-item label="缴款证明">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :on-success="uploadPayment"
              :file-list="fileList"
              :headers="access_token"
            >
              <el-button size="small" type="primary">上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="银行卡照">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :on-success="uploadBankcard"
              :file-list="fileList"
              :headers="access_token"
            >
              <el-button size="small" type="primary">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <!-- 金额确认 -->
      <div class="confirm">
        <div class="confirm_title">金额确认</div>
        <div class="confirm_tow">
          <p>申请买入金额(人民币.单位：元)</p>
          <el-input v-model="rmb"></el-input>
        </div>
        <div class="confirm_tow">
          <p>短信验证码</p>
          <div class="confirm_button">
            <el-input v-model="Code"></el-input>
            <div style="position: relative;width: 100%;" v-if="getswithy">
              <van-count-down
                ref="countDown"
                style="width: 98px;height: 40px;line-height: 40px;text-align: center;position: absolute;border: 1px solid #dcdfe6;top: -57;right: 0;"
                :time="5000"
                :auto-start="false"
                format="ss"
                @finish="finished"
              />
              <el-button @click="getShort" class="buttom_huo" v-if="getHide">获取验证码</el-button>
            </div>
            <div style="position: relative;width: 100%;" v-if="getGun">
              <van-count-down
                ref="countDown"
                style="width: 98px;height: 40px;line-height: 40px;text-align: center;position: absolute;border: 1px solid #dcdfe6;top: -57;right: 0;"
                :time="5000"
                :auto-start="true"
                format="ss"
                @finish="finished"
              />
              <el-button @click="reset" class="buttom_huo" v-if="getagain">重新获取</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="buttom">
        <el-button type="primary" @click="submit">确 认</el-button>
      </div>
    </div>
    <div class="apply" v-if="fill">
      <div class="successfully">
        <p>购买申请提交成功</p>
      </div>
      <el-button type="primary" @click="complete">完成</el-button>
    </div>
  </div>
</template>
<script>
import ajax from "../../../api/https.js";
import storage from "../../../api/storage.js";
export default {
  data() {
    return {
      list: true, //申购资料填写页面
      fill: false, //申购成功页面
      id: "", //产品Id
      name: "", //账户名称
      account: "", //缴款账号
      bank: "", //开户行信息
      rmb: "", //申请买入金额
      Code: "", //短信验证码
      confirmData: {}, // 获取投资者确认信息
      risk: {}, //产品风险等级
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      fileList: [],
      action: ajax.doms.bind(this)(
        "/api/Information/Present/Product/Apply/Material/" +
          this.$route.query.data
      ),
      ReportId: "", //缴款文件id
      BankcardId: "", //银行卡id
      confirmationMaterialId: "", //申购确认书
      riskLevelName: {},
      information: {},
      whether: "",
      getswithy: true, //进入页面时，获取验证码功能
      getGun: false, //进入页面时，重亲获取功能隐藏
      getHide: true, //获取验证码按钮
      getagain: false //重新获取验证码按钮
    };
  },
  methods: {
    //倒计时结束的回调
    finished() {
      this.getagain = true; //重新获取验证码按钮
      this.getHide = false; //获取验证码按钮
      this.getswithy = false; //进入页面时，获取验证码功能
      this.getGun = true; //进入页面时，重新获取验证码功能
    },
    //获取验证码
    getShort() {
      this.getHide = false;
      this.$refs.countDown.start();
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Apply/Sms",
        res => {}
      );
    },
    //重新获取验证码
    reset() {
      this.getagain = false; //重新获取验证码
      this.$refs.countDown.reset();
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Apply/Sms",
        res => {}
      );
    },
    //返回产品Id
    Return() {
      let data = this.id;
      this.$router.push({ path: "/Publicthree/purchases", query: { data } });
    },
    // 获取投资者确认信息
    getConfirm() {
      ajax.authGet.bind(this)("/api/Information/Account", res => {
        this.confirmData = res.data.data;
      });
    },
    //获取用户可承受的风险等级
    getStorage() {
      ajax.authGet.bind(this)(
        "/api/Information/Account/Authentication",
        res => {
          this.risk = res.data.data;
        }
      );
      //获取产品的风险等级
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Risk/" + this.$route.query.data,
        res => {
          this.riskLevelName = res.data.data;
        }
      );
      //展示已认证的用户信息
      ajax.authGet.bind(this)("/api/Information/Account/GetByOpenId", res => {
        this.information = res.data.data;
      });
      ajax.authGet.bind(this)("/api/Permission/IsQualified", res => {
        this.whether = res.data.data;
      });
    },
    //缴款证明
    uploadPayment(response, file, fileList) {
      this.ReportId = response.data.id;
    },
    //银行卡
    uploadBankcard(response, file, fileList) {
      this.BankcardId = response.data.id;
    },
    //提交
    submit() {
      let data = {
        productId: this.id,
        moneyAmount: this.rmb,
        accountName: this.name,
        account: this.account,
        accountBank: this.bank,
        paymentMaterialId: this.ReportId,
        bankCardMaterialId: this.BankcardId,
        confirmationMaterialId: this.confirmationMaterialId,
        captcha: this.Code
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Apply",
        data,
        res => {
          this.fill = true;
          this.list = false;
        }
      );
    },
    //完成
    complete() {
      this.$router.push({ path: "/Publicthree" });
    }
  },
  mounted() {
    this.id = this.$route.query.data;
    this.getConfirm();
    this.getStorage();
  }
};
</script>
<style lang="less" scoped>
.confirmation {
  padding-top: 50px;
  .confirm {
    padding: 0 10px 20px 10px;
    .confirm_title {
      font-weight: 600;
      border-left: 2px solid red;
    }
    .confirm_list {
      height: 46px;
      line-height: 45px;
      border-bottom: 1px solid;
      display: flex;
      justify-content: space-between;
    }
    .confirm_button {
      position: relative;
      .buttom_huo {
        right: 0;
        bottom: 15px;
        height: 40px;
        position: absolute;
      }
      /deep/.van-count-down {
        width: 98px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #dcdfe6;
        position: absolute;
        top: -54px;
        right: 0;
      }
    }
  }
}
.buttom {
  text-align: center;
  padding: 50px 0;
  /deep/.el-button--primary {
    width: 100%;
  }
}
.apply {
  text-align: center;
  .successfully {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>