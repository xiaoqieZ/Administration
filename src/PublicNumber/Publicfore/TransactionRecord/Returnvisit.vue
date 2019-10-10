<template>
  <div>
    <mt-header fixed title="回访记录">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="list">
      <div class="cou" v-for="item in returnVisit" :key="item.Id">
        <div class="coutent" @click="answer(item)">
          <span>{{item.productName}}</span>
          <span>
            {{item.operationTypeName}}
            <Icon type="ios-arrow-forward" size="24" />
          </span>
        </div>
      </div>
    </div>
    <div class="nothing" v-if="message">
            暂无回访记录
        </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
import storage from "../../../api/storage.js";
export default {
  data() {
    return {
      page: 1,
      num: 10,
      returnVisit: [], //用于回去回访Id
      Id: "",
      productName: "",
      returnId:'',
      message: "",
    };
  },
  methods: {
    //获取回访记录
    getVisitBack() {
      let data = {
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/VisitBack",
        data,
        res => {
          this.returnVisit = res.data.data.list;
          this.returnId = this.returnVisit.forEach((index,row)=>{
          })
          if (this.returnVisit.length == 0) {
            this.message = true;
          }
        }
      );
    },
    //按钮，进入单选界面
    answer(data){
      // console.log(data.id);return;
      let productName = {productName:data.productName,visitId:data.id};
      this.$router.push({path: '/Publicfore/TransactionRecord/ReturnvisitAnswer',query:{productName}})
    },
  },
  mounted() {
    this.getVisitBack();
  }
};
</script>

<style lang='less'>
.list {
  padding: 50px 10px 10px 10px;
  .coutent {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
  }
}
.nothing {
  text-align: center;
}
</style>
