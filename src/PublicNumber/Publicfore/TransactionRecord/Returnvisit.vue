<template>
  <div>
    <mt-header fixed title="回访记录">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="visit_title">
      <p>
        尊敬的投资者
        <span>- -</span>,您好！
      </p>
      <p>
        以下内容为您购买的产品：
        <span>- -</span>的回访确认问卷，请您如实作答：
      </p>
    </div>
    <div class="visit_id" v-for="(item,index) in radioData" :key="item.id">
      <p>{{item.title}}</p>
      <el-radio-group v-model="item.radio" @change="chenge">
        <el-radio :label="open.score" v-for="open in item.options" :key="open.id">{{open.content}}</el-radio>
      </el-radio-group>
    </div>
    <div class="primary">
      <el-button type="primary" @click="submi">提交</el-button>
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
export default {
  data() {
    return {
      radio: "",
      radioData: [],
      lii: [],
      centerDialogVisible:false,
    };
  },
  methods: {
    getRadio() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/VisitBack/Questionnaire?visitId=" + 1,
        res => {
          this.radioData = res.data.data;
        }
      );
    },
    //选择题答案
    chenge(e) {
      this.lii.push(e);
      // console.log(this.lii)
    },
    //提交回访单
    submi() {
      if (this.lii.length > 7) {
          this.centerDialogVisible=true
        // this.radio=''
      } else {
        this.$message("容我三思");
      }
    },
    //对话框
    centerDialog(){
        this.centerDialogVisible=false;
        this.$router.push({path:'/Publicfore'})
    }
  },
  mounted() {
    this.getRadio();
  }
};
</script>

<style lang='less'>
.visit_title {
  padding-top: 50px;
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
