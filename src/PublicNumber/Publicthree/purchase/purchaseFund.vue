<template>
  <div class="large_title">
    <mt-header fixed title="风险确认">
      <router-link to="/Publicthree/Purchases" slot="left">
        <mt-button icon="back" @click="fanh">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="title">
      <p>请确认以上产品信息及产品风险</p>
      <div class="product_list">{{productData.name}}</div>
      <div class="product_count">
        <p>产品类型</p>
        <div class="lists">{{productData.fundTypeName}}</div>
        <p>风险等级</p>
        <div class="lists">{{productData.riskLevelName}}</div>
      </div>
      <div class="product_level">
        <div>风险揭示及匹配情况</div>
        <p>
          <a :href="contractCount" target="_blank">基金合同</a>
        </p>
        <p
          class="contract"
        >{{contractData.contractMaterialId==null?'— —':contractData.contractMaterialId}}</p>
        <p>
          <a :href="contractList" target="_blank">风险揭示书</a>
        </p>
        <p
          class="contract"
        >{{contractData.riskDisclosureMaterialId==null?'— —':contractData.riskDisclosureMaterialId}}</p>
        <div @click="centerDi=true" style="color:#409eff">风险匹配通知书</div>
        <p class="contract">12</p>
      </div>
    </div>
    <div>
      <el-checkbox v-model="checked" @change="change">投资者声明确认</el-checkbox>
      <el-dialog
        title="投资者声明确认"
        :visible.sync="centerDialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        width="80%"
        center
      >
        <p>
          顶部内容：
          <span>
            顶部文件作为该私募基金的投资者，本人/机构已充分了解并谨慎评估自身风险承受能力，
            自愿自行承担投资该私募基金所面临的风险。本人/机构做出以下陈述和声明，并确认其内容的真实和正确：
          </span>
        </p>
        <div v-for="(item,index) in statementData" :key="item.id">
          <div>
            <el-checkbox
              v-model="statementData[index].chang"
              @change="chan($event,item,index)"
            >{{item.content}}</el-checkbox>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitRadio">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-checkbox v-model="chec">
        本人已仔细阅读贵司的
        <span>《投资者类型及风险匹配告知书》</span>和
        <span>
          <a :href="contractCount" target="_blank">《基金合同》</a>
        </span>、
        <span>
          <a :href="contractList" target="_blank">《风险揭示书》</a>
        </span>
        ,以充分知晓并理解贵公司对本人风险承受能力评估及产品、服务风险等级匹配结果，以及拟投资产品的风险情况，本人对该
        <span>
          <a :href="contractCount" target="_blank">《基金合同》</a>
        </span>和
        <span>
          <a :href="contractList" target="_blank">《风险揭示书》</a>
        </span>内容没有异议，愿意准守法律、法规及贵司有关规定，通过贵司购买产品或者服务。
        <p>本人承诺，将及时以书面方式如实向贵司通知本人的重大信息变更</p>
        <p>本确认函系本人独立、自主、真实的意思表示。</p>
      </el-checkbox>
    </div>
    <!-- //购买提示 -->
    <div>
      <el-dialog title="购买提示" :visible.sync="centerDialog" width="80%" center>
        <div>
          <p>重要提示:</p>
          <!-- <p>1、申请人提交购业物申请，需在指定时间内将资金划入本产品的募集户，信息如下：</p>
            <p>账户名：</p>
            <p>账号：</p>
            <p>开户行：</p>
          <p>大额支付系统行号：</p>-->
          <p>1、本申请的受理并不表示对该申请是否成功确定，申请是否有效应由注册登记机构确认为准，如发生巨额退出，退出款项的支付办法将按产品合同和有关法律法规规定办理。</p>
          <!-- <div style="text-align:center;font-weight:600">请输入订购金额（单位/元）</div>
          <el-input v-model="money" placeholder="请输入金额"></el-input>-->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialog = false">取 消</el-button>
          <el-button type="primary" @click="centerConfirmation">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="buttom">
      <el-button type="primary" @click="quersubmit">确认</el-button>
    </div>
    <el-dialog title="风险匹配通知书" :visible.sync="centerDi" width="80%" center>
      <div>
        <p>尊敬的投资者，您好：</p>
        <p style="text-indent:2em">根据您的信息补充问卷，依据相关法律，法规的规定，我司将您认定为普通投资者。结合您填写的风险评测问卷以及其他相关信息，我司对您的风险承受能力进行了综合评估，先得到评估结果如下：</p>
        <p style="text-indent:2em">您的风险承受能力为 <span>{{productData.riskLevelName}}</span>，依据我司的投资者与产品、服务风险等规则，您的风险承受能力等级与我司（产品、服务风险等级）相匹配。</p>
        <p style="text-indent:2em">
          我司在此郑重提醒，我司向您销售的产品或提供的服务将以您的风险承受能力等级和投资品种、期限为基础，若您提供的信息发生重大变化，
          您应当及时书面形式通知我司。我司建议您审慎评判自己的风险承受能力，结合自身投资行为，认真填写投资品牌、期限，并根据你投资产品的风险揭示材料做出审慎的投资判断。如同意我司的评估结果，
          并已充分阅读并了解拟投资产品的风险揭示材料，请在以下投资者确认函中进行确认，以示同意。
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDi = false">取 消</el-button>
        <el-button type="primary" @click="centerDi = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ajax from "../../../api/https.js";
export default {
  data() {
    return {
      id: "",
      checked: false,
      centerDialogVisible: false,
      centerDi: false,
      statementData: [], //获取所有声明
      chang: [],
      RadioList: [],
      chec: false,
      centerDialog: false, //购买提示
      money: "", //金额
      contractData: {},
      productData: {},
      contractCount: "",
      contractList: ""
    };
  },
  methods: {
    // 返回按钮，把产品Id返回过去
    fanh() {
      let data = this.id;
      this.$router.push({ path: "/Publicthree/purchases", query: { data } });
    },
    change(e) {
      if (e == true) {
        this.centerDialogVisible = true;
      }
    },
    // 点击选择触发时间
    chan(e, item, index) {
      this.RadioList[index] = { id: item.id };
      //   console.log(this.RadioList);
    },
    //获取所有声明
    getStatement() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Statement/" + this.id,
        res => {
          this.statementData = res.data.data;
        }
      );
    },
    //获取合同
    getContract() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Market/Contract/" + this.$route.query.data,
        res => {
          this.contractData = res.data.data;
          this.contractCount =
            res.data.data.contractMaterial &&
            res.data.data.contractMaterial.fullPath;
          this.contractList =
            res.data.data.othersMaterial1 &&
            res.data.data.othersMaterial1.fullPath;
        }
      );
    },
    //14个单选题点击确定
    submitRadio() {
      // console.log(this.RadioList);
      if (this.RadioList.length > 13) {
        this.centerDialogVisible = false;
      } else {
        this.$message("全部要选");
      }
    },
    //取消
    cancel() {
      this.centerDialogVisible = false;
      this.checked = false;
    },
    //进入金额对话框
    quersubmit() {
      if (this.checked != false && this.chec != false) {
        this.centerDialog = true;
      } else {
        this.$message("请阅读声明并勾选");
      }
    },
    //进入投资者购买信息确认
    centerConfirmation() {
      let data = this.id;
      this.$router.push({
        path: "/Publicthree/Purchases/confirmation",
        query: { data }
      });
    },
    //获取产品基本信息
    getProduct() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Hot/" + this.$route.query.data,
        res => {
          this.productData = res.data.data;
        }
      );
    }
  },
  mounted() {
    this.id = this.$route.query.data;
    this.getStatement();
    this.getContract();
    this.getProduct();
  }
};
</script>
<style lang="less">
.large_title {
  padding: 0 10px;
  .title {
    text-align: center;
    padding-top: 50px;
    .product_list {
      font-size: 16px;
      color: red;
      font-weight: 600;
      padding-top: 20px;
    }
    .product_count {
      padding-top: 20px;
      .lists {
        font-size: 15px;
        padding-bottom: 10px;
        font-weight: 600;
      }
    }
    .product_level {
      padding-top: 20px;
      .contract {
        color: red;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
  /deep/.el-checkbox {
    white-space: normal;
    word-break: break-all;
  }
  .buttom {
    text-align: center;
    padding-top: 53px;
    /deep/.el-button--primary {
      width: 100%;
    }
  }
  /deep/.el-checkbox__label {
    display: inline;
  }
}
</style>