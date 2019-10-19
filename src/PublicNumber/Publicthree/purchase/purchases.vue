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
      <el-button type="primary" style="width:48%" @click="cognizance = true" v-if="marketData.redeem==1">赎回</el-button>
    </div>
    <el-dialog title="赎回" :visible.sync="cognizance" width="80%" center>
      <div>
        <el-form :model="form">
          <el-form-item label="赎回数量：">
            <el-input v-model="form.edeemCount"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cognizance = false">取 消</el-button>
        <el-button type="primary" @click="redeem">确 定</el-button>
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
        edeemCount: ""
      },
      cognizance: false,
      marketData:{}
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
      ajax.authGet.bind(this)('/api/Information/Present/Product/Market/' + this.$route.query.data,res=>{
        this.marketData = res.data.data
      })
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
    redeem() {
      let data = {
        productId: this.$route.query.data,
        portionAmount: this.form.edeemCount
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Redeem",
        data,
        res => {
          this.cognizance=false
          this.$message({message:res.data.message,type:"success"})
        }
      );
    },
    
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
}
</style>