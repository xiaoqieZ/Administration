<template>
  <div>
    <!-- <div> -->
    <el-button @click="add">返回上一级</el-button>
    <!-- </div> -->
    <div class="Return_title">编辑问卷页面</div>
    <div class="Return_list">
      <div class="return_form" v-for="(item,index) in questionnaireData ">
        <el-form label-width="80px">
          <el-form-item :label="'题目'+index">
            <el-radio-group v-model="item.optionType">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题目1">
            <el-input v-model="item.title"></el-input>
            <el-button type="primary">新增选项</el-button>
          </el-form-item>
          <div v-for="(open,index) in item.options ">
            <el-form-item label="选项">
              <el-input v-model="open.content"></el-input>
              <el-select v-model="open.score">
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="item in countData"
                  :key="item.index"
                ></el-option>
              </el-select>
              <el-checkbox v-model="open.withoutRisk">CO选项</el-checkbox>
              <el-button type="primary" icon="el-icon-delete"></el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="return_button">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="primary">新增问题</el-button>
        <el-button type="primary">回复默认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      id: "", //问卷id
      queryData:{},
      item: {
        optionType: "", //单双选
        title: "" //题目
      },
      open: {
        content: "", //选项1
        withoutRisk: "" //CO选项
      },
      InvestorRole: "", //下拉分数选项
      countData: [
        { text: "1分", value: "1" },
        { text: "2分", value: "2" },
        { text: "3分", value: "3" },
        { text: "4分", value: "4" },
        { text: "5分", value: "5" },
        { text: "6分", value: "6" },
        { text: "7分", value: "7" },
        { text: "8分", value: "8" },
        { text: "9分", value: "9" },
        { text: "10分", value: "10" }
      ],
      questionnaireData: [] ,//数据
      items:[]
    };
  },
  methods: {
      //获取数据
    getData() {
      ajax.authGet.bind(this)("/api/Questionnaire/Get/" + this.queryData.id, res => {
        this.questionnaireData = res.data.data;
      });
    },
    // 返回
    add() {
      this.$router.go(-1);
    },
    //提交
    submit(){
        this.items = [{optionType:this.item.optionType,title:this.item.title}];
        console.log(this.items)
        return;
        let data = {
            id:this.queryData.id,
            questionnaireType:this.queryData.questionnaireType,
            title:this.queryData.title,

        };
        ajax.authPost.bind(this)('api/Questionnaire/Save',data,res=>{

        })
    }
  },
  mounted() {
    this.queryData = this.$route.query.data;
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.Return_title {
  padding: 10px 0 10px;
}
.Return_list {
    height: 461px;
    overflow: scroll;
//   @media screen and (max-width: 1080px) {
//   .Return_list {
//     height: 561px;
//     overflow: scroll;
//   }
//   }
  .return_form {
    padding-bottom: 20px;
    /deep/.el-icon-arrow-up {
      height: 75%;
    }
    /deep/.el-input {
      width: 50%;
    }
  }
  .return_button {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10px;
  }
}
</style>