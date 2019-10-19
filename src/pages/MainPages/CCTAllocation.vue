 <template>
  <div id="app">
    <div slot="投资者份额" style="font-size:16px;">投资者份额</div>
    <vue-scroll>
      <div class="currenminput">
        <div class="left">
          <el-select v-model="nameForm.customerType">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in customerType"
              :key="item.index"
            ></el-option>
          </el-select>
          <el-select v-model="nameForm.riskLevel">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in riskLevel"
              :key="item.index"
            ></el-option>
          </el-select>
          <el-select v-model="nameForm.investorType">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in investorType"
              :key="item.index"
            ></el-option>
          </el-select>
          <el-input v-model="search" placeholder="搜索姓名/机构名称" @keyup.enter.native="usersearch"></el-input>

          <el-button type="primary" @click="usersearch">确定</el-button>
        </div>
      </div>
      <!-- 表格数据操作 -->
      <el-table :data="tableData" stripe id="out-table" style="width: 100%">
        <!-- 勾选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 索引 -->
        <el-table-column align="center" type="index" prop="data" label="序号" width="100"></el-table-column>
        <el-table-column align="center" prop="data" label="姓名/机构名称" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.created_at}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="客户类型" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="风险等级" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="投资者类型">
          <template slot-scope="scope">
            <span>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="持仓产品">
          <template slot-scope="scope">
            <span>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="280" label="持仓份额"></el-table-column>
      </el-table>

      <!-- 页码 -->
      <div align="center">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="num"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount.count"
        ></el-pagination>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
import vuescroll from "vuescroll";
import { Toast } from "mint-ui";
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [], //请求过来的数据
      username: "", //姓名
      address: "", //地址
      num: 6, //每页显示数据条数
      page: 1, //默认第一页
      search: "", //搜索
      totalCount: {} , //默认一百条
      currentRow: [], //选中的值
      nameForm: {
        customerType: "0", //客户类别
        riskLevel: "0", //风险等级
        investorType: "0" //投资者类型
      },
      customerType: [], //客户类别
      riskLevel: [], //风险等级
      investorType: [] //投资者类型
    };
  },
  methods: {
    getAllList() {
      //获取数据
      let data = {
        pageSize: this.num,
        pageIndex: this.page,
        customerType: this.nameForm.customerType,
        riskLevel: this.nameForm.riskLevel,
        investorType: this.nameForm.investorType,
        name: this.search
      };
      ajax.authPost.bind(this)("/api/Management/Query/PortionAsset", data, res => {
          this.tableData = res.data.data.list;
          this.totalCount = res.data.data.page;
      }),
        error => {
          console.log(error);
        };
    },
    //下拉框
    getCategory() {
      let newlement = { text: "全部", value: "0" };
      ajax.authGet.bind(this)("/api/Common/6", res => {
        this.customerType = res.data.data;
        this.customerType.unshift(newlement);
      });
      ajax.authGet.bind(this)("/api/Common/7", res => {
        this.riskLevel = res.data.data;
        this.riskLevel.unshift(newlement);
      });
      ajax.authGet.bind(this)("/api/Common/8", res => {
        this.investorType = res.data.data;
        this.investorType.unshift(newlement);
      });
    },
    //搜索
    usersearch(){
      this.getAllList();
    },
    //每页显示数据量变更
    handleSizeChange: function(val) {
      this.num = val;
      this.getAllList();
    },
    //页码变更
    handleCurrentChange: function(val) {
      this.page = val;
      this.getAllList();
    }
  },
  mounted() {
    this.getAllList();
    this.getCategory();
  }
};
</script>
 
 <style lang="less">
.currenminput {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-input {
    width: 220px;
  }
  .searchright {
    right: 0;
    .el-input__icon {
      width: 75%;
    }
  }
  /deep/.el-button {
    width: 70px;
    height: 40px;
  }
  /deep/.el-icon-arrow-up{
  height: 74% ;
}
}
</style>
 