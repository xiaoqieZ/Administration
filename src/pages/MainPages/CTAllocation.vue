 <template>
  <div id="app">
    <div slot="客户信息" style="font-size:16px;">客户审核</div>
    <vue-scroll>
      <div class="currenminput">
        <div class="left">
          <el-select v-model="nameForm.InvestorRole">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in InvestorRole"
              :key="item.index"
            ></el-option>
          </el-select>
          <el-select v-model="nameForm.Category">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in Category"
              :key="item.index"
            ></el-option>
          </el-select>
          <el-select v-model="nameForm.RiskLevel">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in RiskLevel"
              :key="item.index"
            ></el-option>
          </el-select>
          <el-input v-model="search" placeholder="搜索姓名/机构名称" prefix-icon="el-icon-search"></el-input>

          <el-button type="primary" @click="sureSearch">确定</el-button>
        </div>
      </div>
      <!-- 表格数据操作 -->
      <el-table :data="tabelList" stripe id="out-table" style="width: 100%">
        <!-- 勾选框 -->
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <!-- 索引 -->
        <el-table-column
        align="center"
        type="index"
        prop="data"
        label="序号"
        width="100">
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名/机构名称" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="nickName" label="用户名" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.nickName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="customerType" label="客户类别">
          <template slot-scope="scope">
            <span>{{scope.row.customerTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="riskLevel" label="风险等级">
          <template slot-scope="scope">
            <span>{{scope.row.riskLevelName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="investorTypeName" label="客户状态">
          <template slot-scope="scope">
            <span>{{scope.row.investorTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isQualified" label="是否为合格投资者">
          <template slot-scope="scope">
            <span>{{scope.row.isQualified}}</span>
          </template>
        </el-table-column>
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
          :total="tabelCount.count"
        ></el-pagination>
      </div>
      <!-- 查看详情 -->
      <el-dialog title="详情" :append-to-body="true" :visible.sync="checkDetail" width="80%">
        <p>姓名：{{guid}}</p>
        <p>地址： {{diz}}</p>
        <p>填表时间：{{times}}</p>
        <p>新技能</p>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="checkDetail = false">取 消</el-button> -->
          <el-button type="primary" @click="checkDetail = false">确 定</el-button>
        </span>
      </el-dialog>
    </vue-scroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import ajax from "../../api/https.js";
import { Toast } from "mint-ui";
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [], //请求过来的数据
      num: 10, //每页显示数据条数
      page: 1, //默认第一页
      search: "", //搜索
      currentRow: [], //选中的值
      editFormVisible: false, //设置默认弹出框  为false
      editForm: {
        name: "",
        addres: ""
      },
      guid: "",
      diz: "",
      times: "",
      checkDetail: false,
      nameForm: {
        InvestorRole: "0", //投资者角色
        Category: "0", //客户类别
        RiskLevel: "0", //风险等级
      },
      InvestorRole: [], //投资者角色
      Category: [], //客户类别
      RiskLevel: [], //风险等级
      tabelList: [], //数据
      tabelCount: {} //数据条数
    };
  },
  methods: {
    // 查看详情
    checkDe(index, row) {
      console.log(index, row);
      this.guid = row.title;
      this.diz = row.content;
      this.times = row.created_at;
      this.checkDetail = !this.checkDetail;
    },
    getAllList() {

      //投资者角色下拉
      ajax.authGet.bind(this)("/api/Common/2", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.InvestorRole = res.data.data;
          let newlement = { text: "全部", value: "0" };
          this.InvestorRole.unshift(newlement);
        }
      });
      //客户类别下拉
      ajax.authGet.bind(this)("/api/Common/6", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.Category = res.data.data;
          let newlement = { text: "全部", value: "0" };
          this.Category.unshift(newlement);
        }
      });
      //风险等级下拉
      ajax.authGet.bind(this)("/api/Common/7", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.RiskLevel = res.data.data;
          let newlement = { text: "全部", value: "0" };
          this.RiskLevel.unshift(newlement);
        }
      });
    },
    //查询
    sureSearch() {
      let data = {
        investorRole: this.nameForm.InvestorRole,
        customerType: this.nameForm.Category,
        riskLevel: this.nameForm.RiskLevel,
        pageIndex: this.page,
        pageSize: this.num,
        name: this.search
      };
      ajax.authPost.bind(this)("/api/Management/Customer/Query", data, res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.tabelList = this.tableData.list;
          this.tabelCount = this.tableData.page;
        }
      });
    },

    //每页显示数据量变更
    handleSizeChange: function(val) {
      this.num = val;
      // this.getAllList(this.search, this.page, this.num);
    },

    //页码变更
    handleCurrentChange: function(val) {
      this.page = val;
      // this.getAllList(this.search, this.page, this.num);
    }

  },
  created() {
    this.getAllList();
    this.sureSearch();
  }
};
</script>
 
 <style lang="less" >
.currenminput {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-input {
    width: 220px;
  }

    .el-input__icon {
      width: 75%;
    }
  
  /deep/.el-button {
    height: 75%;
  }
}
.el-dialog__wrapper {
  z-index: 9999 !important;
}
/deep/.el-popper {
  margin-top: 0;
}
</style>
 