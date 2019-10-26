<template>
  <div>
    <mt-header fixed title="电子签约">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="sign_padding">
      <div class="sign_title" v-for="item in signData" :key="item.id">
        <div class="sign_list">
          <div>
            <van-tag round type="danger">{{item.signStatusName}}</van-tag>&nbsp;&nbsp;
          </div>
          <div class="sign_div">
            <p class="sign_p">{{item.userName}}</p>
            <p style="color:#409EFF;">{{item.contractName}}</p>
          </div>
        </div>
        <div class="sign_button" v-if="item.signTime==null&&item.signStatus==2">
          <el-button type="danger" size="mini" @click="cancel(item)">取 消</el-button>
          <el-button type="primary" size="mini" @click="toDeploy(item)">去签署</el-button>
        </div>
        <div class="sign_button" v-if="item.signStatus==3">
          <el-button type="info" size="mini">已签署</el-button>
          <el-button type="primary" size="mini" @click="downloadClick(item)">下 载</el-button>
        </div>
        <div style="border-bottom:4px solid"></div>
        <el-dialog title="下载" :visible.sync="download" width="80%" center>
          <div>{{item.contractName}}</div>
          <el-input v-model="email" placeholder="请输入邮箱地址"></el-input>
          <a>下发至邮箱</a>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="download = false">下载到手机</el-button>
            <el-button @click="download = false">取 消</el-button>
          </span>
        </el-dialog>
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
      num: 100,
      signData: [],
      download: false,
      email: ""
    };
  },
  methods: {
    //   分页查询签约记录
    getSign() {
      let data = {
        signStatus: 0,
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Sign",
        data,
        res => {
          this.signData = res.data.data.list;
        }
      );
    },
    //取消
    cancel(row) {
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Sign/Failure/" + row.id,
        res => {
          this.getSign()
        }
      );
    },
    //去签署
    toDeploy(row) {
      let data = {
        contractId: row.contractId,
        id:row.id
      };
      this.$router.push({
        path: "/Publicfore/TransactionRecord/ToDeploy",
        query: { data }
      });
    },
    //下载净值模板
    downloadClick(row) {
      this.download = true;
      // window.open(row.contractMaterial.fullPath, "_blank");
    }
  },
  mounted() {
    this.getSign();
  }
};
</script>

<style lang="less" scoped>
.sign_padding {
  padding: 50px 10px 60px 10px;
}
.sign_title {
  .sign_list {
    height: 120px;
    line-height: 45px;
    display: flex;
    .sign_div {
      .sign_p {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .sign_button {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
