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
          <span style="font-weight:600">11</span>,您好！
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
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="80%" center>
        <span>您的回访已完成！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialog">确 定</el-button>
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
      visitId:'',//回访Id
    };
  },
  methods: {
    //获取单选题目
    getRadio() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/VisitBack/Questionnaire?visitId=" + this.$route.query.productName.visitId,
        res => {
          this.radioData = res.data.data;
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
      console.log(this.problem)
    },
    //提交回访单
    submi() {
      if (this.problem.length > 7) {
        let data = {
             visitId:this.visitId,
             answer:this.problem,
             materialId:1,
        };
        //提交接口
        ajax.authPost.bind(this)(
          "/api/Information/Present/Product/VisitBack/Save",data,res=>{
              this.centerDialogVisible = true;
          }
        );
      } else {
        this.$message("检查是否全部作答");
      }
    },
    //对话框
    centerDialog() {
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore/TransactionRecord/Returnvisit" });
    },
    //拿到本地储存的数据
    getstorage() {
      this.InvestmentName = storage.get("listaktion");
    },
    //获取回访Id
    getvisitid(){
        this.visitId = this.$route.query.productName.visitId
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
  padding-top: 50px;
  .el-button--primary {
    width: 100%;
  }
}
</style>