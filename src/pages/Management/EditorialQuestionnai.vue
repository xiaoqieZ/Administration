<template>
  <div>
    <div class="button">
      <el-button @click="returnUpper" type="primary" plain icon="el-icon-d-arrow-left">问卷管理</el-button>&nbsp;&nbsp;
      <p v-if="queryData.see==0">编辑问卷页面</p>
      <p v-if="queryData.see==2">添加问卷</p>
      <p v-else>查看问卷</p>
    </div>
    <div class="title">
      <div class="Return_title"></div>
      <div style="color:red">CO选项为是否无风险承受能力</div>
    </div>
    <div class="Return_list" v-if="queryData.see!=2">
      <div class="return_form" v-for="(item,index) in questionnaireData ">
        <el-form label-width="80px">
          <el-form-item :label="'题目'+(index+1)">
            <el-radio-group v-model="item.optionType">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="'问题'+(index+1)">
            <el-input v-model="item.title"></el-input>
            <el-select v-model="item.score">
              <el-option
                :label="item.text"
                :value="item.value"
                v-for="item in countData"
                :key="item.indexa"
              ></el-option>
            </el-select>
            <el-button type="primary" @click="add(index)">新增选项</el-button>
          </el-form-item>
          <div v-for="(open,indexa) in item.options ">
            <el-form-item label="选项">
              <el-input v-model="open.content"></el-input>
              <el-select v-model="open.score">
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="item in countData"
                  :key="item.indexa"
                ></el-option>
              </el-select>
              <el-checkbox v-model="open.withoutRisk">CO选项</el-checkbox>
              <el-button type="primary" icon="el-icon-delete" @click="del(index,indexa,open)"></el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="return_button" v-if="queryData.see==0">
        <el-button type="primary" @click="submit">提 交</el-button>
        <el-button type="primary" @click="addProblem">新增问题</el-button>
        <el-button type="primary" @click="recovery">恢复默认</el-button>
      </div>
      <div class="return_button" v-else>
        <el-button type="primary" @click="retrunSee">返 回</el-button>
      </div>
    </div>

    <div class="Return_list" v-if="queryData.see==2">
      <el-form label-width="80px">
        <el-form-item label="问卷名称">
          <el-input v-model="name" placeholder="请输入问卷名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="return_form" v-for="(item,indexs) in items" :key="item.indexs">
        <el-form label-width="80px">
          <el-form-item label="题目">
            <el-radio-group v-model="item.optionType">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="问题">
            <el-input v-model="item.title"></el-input>
            <el-select v-model="item.score">
              <el-option
                :label="item.text"
                :value="item.value"
                v-for="item in countData"
                :key="item.indexa"
              ></el-option>
            </el-select>
            <el-button type="primary" @click="addCount(item,indexs)">新增选项</el-button>
          </el-form-item>
          <div v-for="(open,index) in item.options">
            <el-form-item label="选项">
              <el-input v-model="open.content"></el-input>
              <el-select v-model="open.score">
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="item in countData"
                  :key="item.indexa"
                ></el-option>
              </el-select>
              <el-checkbox v-model="open.withoutRisk">CO选项</el-checkbox>
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="addCountDel(open,index,indexs)"
              ></el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="return_button">
        <el-button type="primary" @click="addSubmit">{{queryData.see==2?'添 加':''}}</el-button>
        <el-button type="primary" @click="addCountProblem(item,indexs)">新增问题</el-button>
        <el-button type="primary" @click="recovery">恢复默认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      name: "",
      items: [
        {
          optionType: 1,
          title: "",
          score: "",
          options: [{ content: "", score: "", withoutRisk: 0 }]
        }
      ], //新增页面下的新增问题
      // itemOptionType: 1, //单双选
      // itemTitle: "", //问题
      // openContent: "", //选项
      // openScore: "", //分数
      // openWithoutRisk: "", //CO选项
      id: "", //问卷id
      queryData: {},
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
      questionnaireData: [] //数据
    };
  },
  methods: {
    //获取数据
    getData() {
      ajax.authGet.bind(this)(
        "/api/Questionnaire/Get/" + this.queryData.id,
        res => {
          this.questionnaireData = res.data.data;
        }
      );
    },
    // 返回
    returnUpper() {
      let data = this.queryData.questionnaireType;
      this.$router.push({
        path: "/NavBar/Managements/Managementfour",
        query: { data }
      });
    },
    //提交
    submit() {
      let data = {
        id: this.queryData.id,
        questionnaireType: this.queryData.questionnaireType,
        title: this.queryData.title,
        items: this.questionnaireData
      };
      ajax.authPost.bind(this)("api/Questionnaire/Save", data, res => {
        this.$message("提交成功");
      });
    },
    //新增选项
    add(index) {
      var temp = this.questionnaireData[index].options;
      temp.push({ content: "", score: "", withoutRisk: 0 });
    },
    //删除
    del(index, indexa, open) {
      var temp = this.questionnaireData[index].options;
      var kk = temp.findIndex(indexa => {
        if (open.indexa == indexa) return true;
      });
      temp.splice(kk, 1);
    },
    //新增问题
    addProblem() {
      this.questionnaireData.push({
        optionType: 1,
        title: "",
        score: 10,
        options: []
      });
    },
    //重置
    recovery() {
      this.getData();
    },
    //返回
    retrunSee() {
      this.$router.go(-1);
    },
    //添加
    addSubmit() {
      let data = {
        questionnaireType: this.queryData.questionnaireType,
        title: this.name,
        items: this.items
      };
      ajax.authPost.bind(this)("/api/Questionnaire/Save", data, res => {
        this.$message("添加成功");
      });
    },
    //添加问卷下面的新增选项
    addCount(item, indexs) {
      var dd = this.items[indexs].options;
      dd.push({
        content: "",
        score: "",
        withoutRisk: 0
      });
    },
    //添加问卷下面的删除按钮
    addCountDel(open, index, indexs) {
      var arr = this.items[indexs].options;
      var kk = arr.findIndex(index => {
        if (open.index == index) return true;
      });
      arr.splice(kk, 1);
    },
    //添加问卷下面的新增问题按钮
    addCountProblem(item, indexs) {
      this.items.push({ optionType: 1, title: "", score: "", options: [] });
      console.log(indexs);
    }
  },
  mounted() {
    this.queryData = this.$route.query.data;
    // console.log(this.queryData.questionnaireType);
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.button {
  height: 56px;
  background: #fff;
  line-height: 56px;
  display: flex;
  align-items: center;
}
.title {
  display: flex;
  justify-content: space-between;
  .Return_title {
    font-weight: 600;
    padding: 10px 0 10px;
  }
}
.Return_list {
  /deep/.el-input {
    width: 50%;
  }
  height: 461px;
  overflow: scroll;
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
  }
}
@media screen and (max-width: 1620px) {
  .Return_list {
    height: 560px;
  }
}
@media screen and (min-width: 1620px) {
  .Return_list {
    height: 700px;
  }
}
</style>