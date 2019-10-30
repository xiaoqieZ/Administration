<template>
  <div>
    <mt-header fixed title="回访记录">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="list">
      <div class="cou" v-for="item in returnVisit" :key="item.Id">
        <div class="coutent" v-if="item.modifiedTime">
          <span>{{item.productName}}</span>
          <span>
            {{item.isSure==1?item.operationTypeName:"已完成"}}
            <Icon type="ios-arrow-forward" size="24" />
          </span>
        </div>
        <div class="coutent" @click="answer(item)" v-else>
          <span>{{item.productName}}</span>
          <span>{{item.creationTime}}</span>
          <span style="color:#26a2ff" @click="remove(item)">取消</span>
          <span>
            {{item.operationTypeName}}
            <Icon type="ios-arrow-forward" size="24" />
          </span>
        </div>
      </div>
    </div>
    <div class="nothing" v-if="message">暂无回访记录</div>
    <el-dialog title="提示" width="80%" :visible.sync="centerDialogVisible" center>
      <span>你确定取消回访吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">返 回</el-button>
        <el-button type="primary" @click="submi">确 定</el-button>
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
      page: 1,
      num: 50,
      returnVisit: [], //用于回去回访Id
      Id: "",
      productName: "",
      returnId: "",
      message: "",
      centerDialogVisible:false,
      id:''
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
          this.returnId = this.returnVisit.forEach((index, row) => {});
          if (this.returnVisit.length == 0) {
            this.message = true;
          }
        }
      );
    },
    //按钮，进入单选界面
    answer(data) {
      let productName = { productName: data.productName, visitId: data.id };
      this.$router.push({
        path: "/Publicfore/TransactionRecord/ReturnvisitAnswer",
        query: { productName }
      });
    },
    remove(row) {
      this.centerDialogVisible=true;
      this.id = row.id
    },
    //取消回访
    submi(){
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/VisitBack/Remove?id=" + this.id,
        res => {
          this.getVisitBack();
          this.centerDialogVisible=false;
        }
      );
    }
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
