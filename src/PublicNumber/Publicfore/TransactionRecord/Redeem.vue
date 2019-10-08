<template>
  <div>
    <mt-header fixed title="赎回记录">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="application_Record">
      <div class="application_for" v-for="item in dataList" :key="item.id">
        <div>
          <Icon type="ios-bookmark" size="24" color="#2d8cf0" />
          {{item.productName}}
        </div>
        <div class="application_content">
          <p>
            <span>类型：</span>
            {{item.orderTypeName}}
          </p>
          <!-- <el-divider direction="vertical"></el-divider> -->
          <p>
            <span>状态：</span>
            {{item.orderStatusName}}
          </p>
          <p>
            <span>金额/份额：</span>
            {{item.amount}}
          </p>
          <p>
            <span>创建时间：</span>
            {{item.creationTime}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
export default {
  data() {
    return {
      page: 1,
      num: 10,
      dataList: []
    };
  },
  methods: {
    //获取赎回记录
    getRadio() {
      let data = {
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Trade/Redeem",
        data,
        res => {
          this.dataList = res.data.data.list;
        }
      );
    }
  },
  mounted() {
    this.getRadio();
  }
};
</script>

<style lang="less">
.application_Record {
  padding: 50px 10px 0 10px;
  .application_for {
    height: auto;
    border-bottom: 1px solid;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .application_content {
      p {
        height: 24px;
      }
    }
  }
}
</style>
