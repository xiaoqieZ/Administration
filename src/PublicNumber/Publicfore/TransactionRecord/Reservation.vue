<template>
  <div>
    <mt-header fixed title="持仓记录">
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
          <span>{{item.holdCount}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{item.creationTime}}</span>
        </div>
      </div>
      <div class="nothing" v-if="message">暂无持仓数据</div>
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
      dataList: [],
      message: false
    };
  },
  methods: {
    getRadio() {
      let data = {
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Asset",
        data,
        res => {
          this.dataList = res.data.data.list;
          if (this.dataList.length == 0) {
            this.message = true;
          }
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
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
  }
  .nothing {
    text-align: center;
  }
}
</style>
