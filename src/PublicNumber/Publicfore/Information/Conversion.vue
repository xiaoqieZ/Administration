<template>
  <div>
    <mt-header fixed title="转化告知">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="conversion">
      <div class="conversion_count">
        <p>尊敬的管理人您好：</p>
        <p class="conversion_list">
          本人经公司认定为
          <span>{{InvestorType.investorTypeName}}</span>，经本人审慎考虑，现决定自愿申请转化为贵司的
          <span>{{InvestorType.investorTypeName=='专业投资者'?'普通投资者':'专业投资者'}}</span>。本人已充分理解专业投资者与普通投资者的区别，
          转化为
          <span>{{InvestorType.investorTypeName=='专业投资者'?'普通投资者':'专业投资者'}}</span>后，将自主承担可能产生的风险后果。本人承诺提供材料真实、准确、完整。
        </p>
      </div>
      <div class="conversion_button">
        <el-button type="primary" @click="conversion">确认转化</el-button>
        <el-button>取消转化</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
import storage from "../../../api/storage.js";
export default {
  data() {
    return {
      InvestorType: {} //投资者类型
    };
  },
  methods: {
    conversion() {
      ajax.authPost.bind(this)("/api/Information/Account/Conversion", res => {});
    },
    getstorage() {
      this.InvestorType = storage.get("typeName");
    }
  },
  mounted() {
    this.getstorage();
  }
};
</script>

<style lang="less">
.conversion {
  padding: 10px;
  .conversion_count {
    padding-top: 50px;
    .conversion_list {
      text-indent: 2em;
    }
  }
  .conversion_button {
    padding-top: 50px;
    text-align: center;
  }
}
</style>
