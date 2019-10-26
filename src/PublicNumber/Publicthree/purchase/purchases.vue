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
      <van-collapse v-model="activeNames">
        <van-collapse-item title="投资范围" name="1">{{productRange.scale}}</van-collapse-item>
      </van-collapse>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="funds">
      <span>基金合同</span>
      <div>
        <!-- <p>{{contractData.contractMaterial.fullPath}}</p>
        <p>{{contractData.othersMaterial1.fullPath}}</p>-->
        <p>
          <a :href="contractData" target="_blank">《【润达基金】基金合同》</a>
        </p>
        <p>
          <a :href="contractList" target="_blank">《润达基金_风险揭示书》</a>
        </p>
      </div>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="fund" @click="archives">
      <span>基金档案</span>
      <van-icon name="arrow" />
    </div>
    <div class="anniu">
      <el-button type="primary" style="width:48%" @click="purchase" v-if="marketData.purchase==1">购买</el-button>
      <el-button
        type="primary"
        style="width:48%"
        @click="cognizance = true"
        v-if="marketData.redeem==1"
      >赎回</el-button>
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
                :time="5000"
                :auto-start="false"
                format="ss"
                @finish="finished"
              />
              <el-button @click="getShort" class="buttonShort" v-if="getHide">获取验证码</el-button>
            </div>
            <div v-if="getGun">
              <van-count-down
                ref="countDown"
                :time="5000"
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
      productData: [],
      textarea: "",
      activeNames: ["0"],
      productRange: {}, //投资范围
      docuId: "",
      contractData: "",
      contractList: "",
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
        edeemCount: [{ required: true, message: "请输入赎回数量", trigger: "blur" }],
        Verification: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
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
        "/api/Management/Product/Market/Contract/" + this.$route.query.data,
        res => {
          this.contractData =
            res.data.data.contractMaterial &&
            res.data.data.contractMaterial.fullPath;
          this.contractList =
            res.data.data.othersMaterial1 &&
            res.data.data.othersMaterial1.fullPath;
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
              this.form.edeemCount=this.form.Verification=''
            }
          );
        }
      });
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
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
    .van-icon-arrow {
      line-height: 50px;
    }
  }
  .funds {
    height: 70px;
    line-height: 30px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
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