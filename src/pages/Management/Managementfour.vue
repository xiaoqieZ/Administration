<template>
  <div class="Risk_heck">
    <div class="Risk_count">
      <el-select v-model="InvestorRole">
        <el-option
          :label="item.text"
          :value="item.value"
          v-for="item in countData"
          :key="item.index"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="addCount">确定</el-button>
    </div>
    <div class="Risk_data">
      <el-table :data="questionnaireData" stripe id="out-table" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="data" label="问卷名称" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="创建人">
          <template slot-scope="scope">
            <span>{{scope.row.creatorName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.creationTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="是否启用">
          <template slot-scope="scope">
            <span>{{scope.row.isAvailable==1?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="是否默认">
          <template slot-scope="scope">
            <span>{{scope.row.isDefault==1?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="操作">
          <template slot-scope="scope">
            <span
              style="color:#409EFF"
              @click="enable(scope.$index,scope.row)"
            >{{scope.row.isAvailable==1?'':'启动'}}</span>
            <span style="color:#409EFF" @click="edit(scope.$index,scope.row)">编辑</span>
            <span style="color:#409EFF" @click="SeeData(scope.$index,scope.row)">查看</span>
            <span style="color:#409EFF" @click="Score(scope.$index,scope.row)">分值</span>
          </template>
        </el-table-column>
      </el-table>
      <div align="center">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="questionnairecount.count"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="设置分值" :visible.sync="centerDialogVisible" width="60%" center>
      <div>
          <div>设置分值类型</div>
          <div v-for="(item,index) in scoreData" :key="index">
              <el-form>
              <el-form-item :label="item.levelName">
                  <el-input-number v-model="item.minScore" @change="handleChange" :min="item.minScore"></el-input-number>
                  <span>≤分值≤</span>
                  <el-input-number v-model="item.maxScore" @change="handle" :max="item.maxScore"></el-input-number>
              </el-form-item>
          </el-form>
          </div>
          
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      totalCount: 20,
      countData: [],
      InvestorRole: "1",
      page: 1,
      num: 6,
      questionnaireData: [],
      questionnairecount: {},
      centerDialogVisible:false,
      scoreData:[],
    };
  },
  methods: {
    //下拉框
    getCount() {
      ajax.authGet.bind(this)("/api/Common/4", res => {
        this.countData = res.data.data;
      });
    },
    //确定查询
    addCount() {
      let data = {
        pageIndex: this.page,
        pageSize: this.num,
        questionnaireType: this.InvestorRole
      };
      ajax.authPost.bind(this)(
        "/api/Management/Query/Questionnaire",
        data,
        res => {
          this.questionnaireData = res.data.data.list;
          this.questionnairecount = res.data.data.page;
        }
      );
    },
    //操作栏 启动
    enable(index, row) {
      ajax.authPost.bind(this)(
        "/api/Questionnaire/SetAvailable?id=" + row.id,
        res => {}
      );
      ajax.authPost.bind(this)(
        "/api/Questionnaire/SetDefault?id=" + row.id,
        res => {}
      );
    },
    //编辑
    edit(index, row) {
      let data = {
        id: row.id,
        title: row.title,
        questionnaireType: this.InvestorRole,
        see: 0
      };
      this.$router.push({
        path: "/NavBar/Managements/EditorialQuestionnai",
        query: { data }
      });
    },
    //查看
    SeeData(index, row) {
      let data = {
        id: row.id,
        title: row.title,
        questionnaireType: this.InvestorRole,
        see: 1
      };
      this.$router.push({
        path: "/NavBar/Managements/EditorialQuestionnai",
        query: { data }
      });
    },
    //分值
    Score(index, row){
        this.centerDialogVisible=true;
        ajax.authGet.bind(this)('/api/Questionnaire/Score/'+row.id,res=>{
            this.scoreData = res.data.data
        })
    },
    //计数器
    handleChange(currentValue, oldValue) {
        // console.log(currentValue);
      },
      handle(currentValue, oldValue){

      }
  },
  mounted() {
    this.getCount();
    this.addCount();
  }
};
</script>
<style lang="less" scoped>
.Risk_heck {
  .Risk_count {
    padding-top: 10px;
    /deep/.el-icon-arrow-up {
      height: 75%;
    }
  }
  //   .Risk_data {

  //   }
}
</style>