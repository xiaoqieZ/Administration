<template>
  <div class="goshoping">
    <div class="shopings">
      <mt-header fixed title="基金产品">
        <router-link to="/Publicthree" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="fund">
      <span>基金类型</span>
      <span>{{productData.name}}</span>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="fund">
      <span>风险等级</span>
      <span>{{productData.riskLevelName}}</span>
    </div>
    <div class="fund">
      <div class="fund_isshow">
        <div class="fund_justify" @click="showClick">
          <p>投资范围</p>
          <p style="color:#409EFF;cursor:pointer">{{isShow==true?'收起':'查看详情'}}</p>
        </div>
        <div v-show="isShow">{{productRange.scale}}</div>
      </div>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="funds">
      <div style="padding-top: 10px;">基金合同</div>
      <div class="funds_p">
        <p v-if="contractData!=null">
          <a :href="contractData" target="_blank">《【{{contractfileName}}】》</a>
        </p>
        <p v-if="contractList!=null">
          <a :href="contractList" target="_blank">《{{contractListfileName}}》</a>
        </p>
        <p v-if="contractData1!=null">
          <a :href="contractData1" target="_blank">《{{contractfileName1}}》</a>
        </p>
        <p v-if="contractList2!=null">
          <a :href="contractList2" target="_blank">《{{contractListfileName2}}》</a>
        </p>
        <p v-if="contractList3!=null">
          <a :href="contractList3" target="_blank">《{{contractListfileName3}}》</a>
        </p>
      </div>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="fund" @click="archives">
      <span>基金档案</span>
      <van-icon name="arrow" />
    </div>
    <div class="cesname">
      <div class="count_list" v-for="items in disclosureData" :key="items.id+items.messageType">
        <div class="disclosure" @click="disclosureClickId(items)">
          <van-notice-bar :scrollable="false">
            <span>{{items.messageTypeName}}：</span>&nbsp;
            <span>{{items.date}}</span>&nbsp;
            <span>{{items.title}}</span>
          </van-notice-bar>
          <el-divider direction="vertical"></el-divider>
        </div>
      </div>
    </div>
    <div class="anniu">
      <el-button
        type="primary"
        style="width:48%"
        @click="purchase"
        v-if="marketData.purchase==1"
      >购 买</el-button>
      <el-button
        type="warning"
        style="width:48%"
        @click="cognizance = true"
        v-if="marketData.redeem==1"
      >赎 回</el-button>
    </div>
    <el-dialog title="赎回" :visible.sync="cognizance" width="80%" center>
      <div>
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="赎回数量：" prop="edeemCount">
            <el-input v-model="form.edeemCount"></el-input>
          </el-form-item>
          <el-form-item class="phoneShort" label="验证码" prop="Verification">
            <el-input v-model="form.Verification"></el-input>
            <div v-if="getswithy">
              <van-count-down
                ref="countDown"
                :time="60000"
                :auto-start="false"
                format="ss"
                @finish="finished"
              />
              <el-button @click="getShort" class="buttonShort" v-if="getHide">获取验证码</el-button>
            </div>
            <div v-if="getGun">
              <van-count-down
                ref="countDown"
                :time="60000"
                :auto-start="true"
                format="ss"
                @finish="finished"
              />
              <el-button @click="reset" class="buttonShort" v-if="getagain">重新获取</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cognizance = false">取 消</el-button>
        <el-button type="primary" @click="redeem('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
export default {
  data() {
    return {
      isShow:false,
      productData: [],
      textarea: "",
      productRange: {}, //投资范围
      docuId: "",
      contractData: "",
      contractList: "",
      contractData1: "",
      contractList2: "",
      contractList3: "",
      form: {
        edeemCount: "",
        Verification: ""
      },
      cognizance: false,
      marketData: {},
      getswithy: true, //进入页面时，获取验证码功能
      getGun: false, //进入页面时，重亲获取功能隐藏
      getagain: false, //重新获取验证码按钮
      getHide: true, //获取验证码按钮
      rules: {
        edeemCount: [
          { required: true, message: "请输入赎回数量", trigger: "blur" }
        ],
        Verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      contractfileName: "",
      contractListfileName: "",
      contractfileName1: "",
      contractListfileName2: "",
      contractListfileName3: "",
      disclosureData: []
    };
  },
  methods: {
    getid() {
      this.docuId = this.$route.query.data;
    },
    //获取产品基本信息
    getProduct() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Hot/" + this.$route.query.data,
        res => {
          this.productData = res.data.data;
        }
      );
      //购买、赎回按钮的控制
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Market/" + this.$route.query.data,
        res => {
          this.marketData = res.data.data;
        }
      );
      //信息披露
      let data = {
        pageIndex: 1,
        pageSize: 5
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/ProductMessage",
        data,
        res => {
          this.disclosureData = res.data.data.list;
        }
      );
    },
    //披露
    disclosureClickId(row) {
      let list = { id: row.id, messageType: row.messageType };
      this.$router.push({ path: "/Disclosure", query: { list } });
    },
    //投资范围
    getRange() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Investment/" + this.$route.query.data,
        res => {
          this.productRange = res.data.data;
        }
      );
    },
    // 基金档案
    archives() {
      let data = this.docuId;
      this.$router.push({
        path: "/Publicthree/Purchases/riskIdentification",
        query: { data }
      });
    },
    //购买
    purchase() {
      let data = this.docuId;
      this.$router.push({
        path: "/Publicthree/Purchases/purchaseFund",
        query: { data }
      });
    },
    //获取合同
    getContract() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Contract/" + this.$route.query.data,
        res => {
          this.contractData =
            res.data.data.contractMaterial &&
            res.data.data.contractMaterial.fullPath;
          this.contractfileName =
            res.data.data.contractMaterial &&
            res.data.data.contractMaterial.fileName;
          this.contractList =
            res.data.data.riskDisclosureMaterial &&
            res.data.data.riskDisclosureMaterial.fullPath;
          this.contractListfileName =
            res.data.data.riskDisclosureMaterial &&
            res.data.data.riskDisclosureMaterial.fileName;

          this.contractData1 =
            res.data.data.othersMaterial1 &&
            res.data.data.othersMaterial1.fullPath;
          this.contractfileName1 =
            res.data.data.othersMaterial1 &&
            res.data.data.othersMaterial1.fileName;
          this.contractList2 =
            res.data.data.othersMaterial2 &&
            res.data.data.othersMaterial2.fullPath;
          this.contractListfileName2 =
            res.data.data.othersMaterial2 &&
            res.data.data.othersMaterial2.fileName;
          this.contractList3 =
            res.data.data.othersMaterial3 &&
            res.data.data.othersMaterial3.fullPath;
          this.contractListfileName3 =
            res.data.data.othersMaterial3 &&
            res.data.data.othersMaterial3.fileName;

          if (this.contractfileName) {
            var index = this.contractfileName.lastIndexOf(".");
            this.contractfileName = this.contractfileName.substr(0, index);
          }
          if (this.contractListfileName) {
            var index = this.contractListfileName.lastIndexOf(".");
            this.contractListfileName = this.contractListfileName.substr(
              0,
              index
            );
          }

          if (this.contractfileName1) {
            var index = this.contractfileName1.lastIndexOf(".");
            this.contractfileName1 = this.contractfileName1.substr(0, index);
          }
          if (this.contractListfileName2) {
            var index = this.contractListfileName2.lastIndexOf(".");
            this.contractListfileName2 = this.contractListfileName2.substr(
              0,
              index
            );
          }
          if (this.contractListfileName3) {
            var index = this.contractListfileName3.lastIndexOf(".");
            this.contractListfileName3 = this.contractListfileName3.substr(
              0,
              index
            );
          }
        }
      );
    },
    //赎回
    redeem(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            productId: this.$route.query.data,
            portionAmount: this.form.edeemCount,
            captcha: this.form.Verification
          };
          ajax.authPost.bind(this)(
            "/api/Information/Present/Product/Redeem",
            data,
            res => {
              this.cognizance = false;
              this.$message({ message: res.data.message, type: "success" });
              this.form.edeemCount = this.form.Verification = "";
            }
          );
        }
      });
    },
    //投资范围查看
    showClick(){
      this.isShow=!this.isShow
    },
    //倒计时结束的回调
    finished() {
      this.getagain = true; //重新获取验证码按钮
      this.getHide = false; //获取验证码按钮
      this.getswithy = false; //进入页面时，获取验证码功能
      this.getGun = true; //进入页面时，重新获取验证码功能
    },
    getShort() {
      this.getHide = false;
      this.$refs.countDown.start();
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Redeem/Sms",
        res => {}
      );
    },
    //重新获取验证码
    reset() {
      this.getagain = false; //重新获取验证码
      this.$refs.countDown.reset();
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Redeem/Sms",
        res => {}
      );
    }
  },
  mounted() {
    this.getProduct();
    this.getRange();
    this.getid();
    this.getContract();
  }
};
</script>

<style lang="less" scoped>
.goshoping {
  width: 100%;
  .shopings {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .fund {
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
    .van-icon-arrow {
      line-height: 50px;
    }
    .fund_isshow{
      width: 100%;
      .fund_justify{
      display: flex;
      justify-content: space-between
    }
    }
  }
  .funds {
    height: auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    .funds_p {
      padding-top: 5px;
    }
  }
  .cesname {
    padding: 10px;
    border-bottom: 1px solid;
    .count_list {
      .count_img {
        width: 100%;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .disclosure {
        width: 100%;
        height: 44px;
      }
    }
  }
  .anniu {
    width: 100%;
    padding: 10px 10px;
    // display: flex;
    // justify-content: space-between;
    padding-top: 50px;
    display: flex;
    justify-content: center;
  }
  .phoneShort {
    position: relative;
    .buttonShort {
      height: 39px;
      position: absolute;
      top: 40px;
      right: 0;
      bottom: 0;
    }
    /deep/.van-count-down {
      width: 98px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #dcdfe6;
      position: absolute;
      top: 40px;
      right: 0;
    }
  }
}
</style>