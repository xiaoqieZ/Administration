<template>
  <div>
    <mt-header fixed title="回访记录">
      <router-link to="/Publicfore/TransactionRecord/Returnvisit" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <div class="visit_title">
        <p>
          尊敬的投资者
          <span style="font-weight:600">{{acountName.name}}</span>,您好！
        </p>
        <p class="content">
          以下内容为您购买的产品：
          <span style="font-weight:600">{{this.$route.query.productName.productName}}</span>的回访确认问卷，请您如实作答：
        </p>
      </div>
      <div class="visit_id" v-for="(item,index) in radioData" :key="item.id">
        <p>{{item.title}}</p>
        <el-radio-group v-model="item.radio">
          <el-radio
            :label="open.score"
            v-for="open in item.options"
            :key="open.id"
            @change="chenge(open,item,index)"
          >{{open.content}}</el-radio>
        </el-radio-group>
      </div>
      <div class="primary">
        <el-button type="primary" @click="submi">提交</el-button>
      </div>
    </div>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="80%"
        center
      >
        <span v-if="statusData.isPass==true">您的回访已通过，点击确认提交！</span>
        <span v-else>{{statusData.statusName}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="go" v-if="statusData.isPass==false">确 定</el-button>
          <el-button type="primary" v-else @click="centerDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
import storage from "../../../api/storage.js";
export default {
  data() {
    return {
      radio: "",
      radioData: [],
      problem: [],
      centerDialogVisible: false,
      InvestmentName: {},
      visitId: "", //回访Id
      statusData: "",
      acountName:{}
    };
  },
  methods: {
    //获取单选题目
    getRadio() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/VisitBack/Questionnaire?visitId=" +
          this.$route.query.productName.visitId,
        res => {
          this.radioData = res.data.data;
        }
      );
      ajax.authGet.bind(this)(
        "/api/Information/Account",
        res => {
          this.acountName = res.data.data;
        }
      );
    },
    //选择题答案
    chenge(open, item, index) {
      //   this.problem.splice(0);
      this.problem[index] = {
        itemId: item.id,
        optionId: [open.id]
      };
      // console.log(this.problem)
    },
    //提交回访单
    submi() {
      if (this.problem.length > 7) {
        let data = this.problem;
        //提交接口
        ajax.authPost.bind(this)(
          "/api/Information/Present/Product/VisitBack/Validate?visitId=" +
            this.visitId,
          data,
          res => {
            this.centerDialogVisible = true;
            this.statusData = res.data.data;
          }
        );
      } else {
        this.$message("检查是否全部作答");
      }
    },
    //确定提交
    centerDialog() {
      if (this.problem.length > 7) {
        let data = {
          visitId: this.visitId,
          answer: this.problem,
          materialId: 1
        };
        //提交接口
        ajax.authPost.bind(this)(
          "/api/Information/Present/Product/VisitBack/Save",
          data,
          res => {
            this.centerDialogVisible = false;
            this.$router.push({
              path: "/Publicfore/TransactionRecord/Returnvisit"
            });
          }
        );
      } else {
        this.$message("检查是否全部作答");
      }
    },
    go() {
      this.$router.go(-1);
    },
    //拿到本地储存的数据
    getstorage() {
      this.InvestmentName = storage.get("listaktion");
    },
    //获取回访Id
    getvisitid() {
      this.visitId = this.$route.query.productName.visitId;
    }
  },
  mounted() {
    this.getRadio();
    this.getstorage();
    this.getvisitid();
  }
};
</script>
<style lang="less">
.visit_title {
  padding: 50px 10px 0 10px;
  .content {
    text-indent: 2em;
  }
}
.visit_id {
  padding: 10px;
}
.primary {
  padding: 50px 0;
  .el-button--primary {
    width: 100%;
  }
}
</style>