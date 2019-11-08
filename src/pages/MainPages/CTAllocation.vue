 <template>
  <div id="app">
    <div slot="客户信息" style="font-size:16px;">客户审核</div>
    <div class="currenminput">
      <div class="left">
        <el-select v-model="nameForm.Category">
          <el-option
            :label="item.text"
            :value="item.value"
            v-for="item in Category"
            :key="item.index"
          ></el-option>
        </el-select>
        <el-select v-model="nameForm.InvestorRole">
          <el-option
            :label="item.text"
            :value="item.value"
            v-for="item in InvestorRole"
            :key="item.index"
          ></el-option>
        </el-select>
        <el-input v-model="search" placeholder="搜索姓名/机构名称" @keyup.enter.native="sureSearch"></el-input>

        <el-button type="primary" @click="sureSearch">确定</el-button>
      </div>
    </div>
    <!-- 表格数据操作 -->
    <el-table :data="tabelList" stripe id="out-table" style="width: 100%">
      <!-- 勾选框 -->
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <!-- 索引 -->
      <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名/机构名称" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="用户名" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="customerType" label="客户类别">
        <template slot-scope="scope">
          <span>{{scope.row.customerTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="investorTypeName" label="客户类型">
        <template slot-scope="scope">
          <span>{{scope.row.investorTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isQualified" label="特定对象审核材料">
        <template slot-scope="scope">
          <div @click="checkDe(scope.$index, scope.row)">
            <Icon type="ios-eye" size="22" color="#409EFF" />
            <span style="color:#409EFF;cursor:pointer">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isQualified" label="适当性审核材料">
        <template slot-scope="scope">
          <div v-if="scope.row.investorType==2">
            <Icon type="ios-eye" size="22" color="#409EFF" />
            <span>查看</span>
          </div>
          <div @click="appropriate(scope.$index, scope.row)" v-else>
            <Icon type="ios-eye" size="22" color="#409EFF" />
            <span style="color:#409EFF;cursor:pointer">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isQualified" label="合格投资者审核材料">
        <template slot-scope="scope">
          <div @click="qualified(scope.$index, scope.row)">
            <Icon type="ios-eye" size="22" color="#409EFF" />
            <span style="color:#409EFF;cursor:pointer">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isQualified" label="补充证明材料">
        <template slot-scope="scope">
          <div @click="supplement(scope.$index, scope.row)">
            <Icon type="ios-eye" size="22" color="#409EFF" />
            <span style="color:#409EFF;cursor:pointer">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isQualified" label="审核状态">
        <template slot-scope="scope">
          <span>{{scope.row.auditStatusName}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <div align="center">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="page"
        :page-size="num"
        layout="total, prev, pager, next, jumper"
        :total="tabelCount.count"
      ></el-pagination>
    </div>
    <!-- 特定对象查看详情 -->
    <div>
      <el-dialog :visible.sync="checkDetail" width="30%">
        <div v-for="item in itemsy" :key="item.id">
          <div v-for="list in item.items">
            <span @click="res=>browse(list)">{{list.userMaterialType.name}}</span>
          </div>
        </div>
        <el-dialog title="审核内容" :append-to-body="true" :visible.sync="adopt" width="30%">
          <p>特定对象审核结果：通过</p>
          <div class="remarks">
            <span>备注内容：</span>
            <textarea style="width:295px;height:99px" placeholder="请输入内容" v-model="textareaAdopt"></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="adopt = false">取 消</el-button>
            <el-button type="primary" @click="specificClick">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="审核内容" append-to-body :visible.sync="noPassage" width="30%">
          <p>特定对象审核结果：不通过</p>
          <div class="remarks">
            <span>备注内容：</span>
            <textarea
              style="width:295px;height:99px"
              placeholder="请输入内容"
              v-model="textareaNoPassage"
            ></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noPassage = false">取 消</el-button>
            <el-button type="primary" @click="NospecificClick">确 定</el-button>
          </span>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noPassage = true">不通过</el-button>
          <el-button type="primary" @click="adopt = true">通 过</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 适当性审核材料 -->
    <div>
      <el-dialog :visible.sync="checkDes" width="30%">
        <div v-for="item in itemsy" :key="item.id">
          <div v-for="list in item.items">
            <span @click="res=>browse(list)">{{list.userMaterialType.name}}</span>
          </div>
        </div>
        <el-dialog title="审核内容" :append-to-body="true" :visible.sync="ado" width="30%">
          <p>适当性审核结果：通过</p>
          <div class="remarks">
            <span>备注内容：</span>
            <textarea style="width:295px;height:99px" placeholder="请输入内容" v-model="textareaAdopt"></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ado = false">取 消</el-button>
            <el-button type="primary" @click="appropriateClick">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="审核内容" append-to-body :visible.sync="noPass" width="30%">
          <p>适当性审核结果：不通过</p>
          <div class="remarks">
            <span>备注内容：</span>
            <textarea
              style="width:295px;height:99px"
              placeholder="请输入内容"
              v-model="textareaNoPassage"
            ></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noPass = false">取 消</el-button>
            <el-button type="primary" @click="NoappropriatesClick">确 定</el-button>
          </span>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noPass = true">不通过</el-button>
          <el-button type="primary" @click="ado = true">通 过</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 合格投资查看详情 -->
    <div>
      <el-dialog :visible.sync="check" width="30%">
        <div v-for="item in itemsy" :key="item.id">
          <div v-for="list in item.items">
            <span @click="res=>browse(list)">{{list.userMaterialType.name}}</span>
          </div>
        </div>
        <el-dialog title="审核内容" :append-to-body="true" :visible.sync="adop" width="30%">
          <p>合格投资审核结果：通过</p>
          <div class="remarks">
            <span>备注内容：</span>
            <textarea style="width:295px;height:99px" placeholder="请输入内容" v-model="textareaAdopt"></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="adop = false">取 消</el-button>
            <el-button type="primary" @click="qualifiedClick">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="审核内容" append-to-body :visible.sync="noPassa" width="30%">
          <p>合格投资审核结果：不通过</p>
          <div class="remarks">
            <span>备注内容：</span>
            <textarea
              style="width:295px;height:99px"
              placeholder="请输入内容"
              v-model="textareaNoPassage"
            ></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noPassa = false">取 消</el-button>
            <el-button type="primary" @click="NoqualifiedsClick">确 定</el-button>
          </span>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noPassa = true">不通过</el-button>
          <el-button type="primary" @click="adop = true">通 过</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- //遇坑，这两个二宝不能放在上面的div里面，不然会被隐藏了 -->
    <el-dialog append-to-body :visible.sync="dialogTableVisible" width="30%">
      <img :src="bigimage" alt="图" style="width:100%;" />
    </el-dialog>
    <!-- 审核完毕 -->
    <div>
      <el-dialog title="审核材料" :append-to-body="true" :visible.sync="completion" width="30%">
        <div v-for="item in itemsy" :key="item.id">
          <div v-for="list in item.items">
            <span style="color:#409eff;cursor:pointer" @click="browse(list)">{{list.userMaterialType.name}}</span>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="completion = false">取 消</el-button>
            <el-button type="primary" @click="completion = false">确 定</el-button>
        </span>-->
      </el-dialog>
    </div>
  </div>
</template>

<script src="//unpkg.com/element-ui@2.12.0/lib/index.js"></script>
<script>
import vuescroll from "vuescroll";
import ajax from "../../api/https.js";
import storage from "../../api/storage.js";
import { Toast } from "mint-ui";
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      specific: false,
      appropriates: false,
      qualifieds: false,
      Nospecific: false,
      Noappropriates: false,
      Noqualifieds: false,
      bigimage: "",
      tableData: [], //请求过来的数据
      num: 6, //每页显示数据条数
      page: 1, //默认第一页
      search: "", //搜索
      currentRow: [], //选中的值
      editFormVisible: false, //设置默认弹出框  为false
      textareaAdopt: "", //通过输入框
      textareaNoPassage: "", //不通过输入框
      guid: "",
      diz: "",
      times: "",
      checkDetail: false, //同意与不同意对话框
      adopt: false, //通过回执单
      noPassage: false, //不通过回执单
      completion: false, //审核完成
      legalCertificate: [],
      nameForm: {
        InvestorRole: "0", //审核状态下拉
        Category: "0" //客户类别
      },
      InvestorRole: [], //审核状态下拉
      Category: [], //客户类别
      tabelList: [], //数据
      tabelCount: {}, //数据条数
      itemsy: [], //证件类型
      dialogTableVisible: false, //展示证明材料
      id: "",
      adop: false,
      noPassa: false,
      ado: false,
      noPass: false,
      checkDes: false,
      check: false,
      investorType:{},
    };
  },
  methods: {
    //展示证明材料
    browse(item) {
      this.dialogTableVisible = true;
      this.bigimage = item.material.fullPath;
    },
    getAllList() {
      //客户类别下拉
      ajax.authGet.bind(this)("/api/Common/6", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.Category = res.data.data;
          let newlement = { text: "全部", value: "0" };
          this.Category.unshift(newlement);
        }
      });
      //审核状态下拉
      ajax.authGet.bind(this)("/api/Common/9", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.InvestorRole = res.data.data;
          let newlement = { text: "全部", value: "0" };
          this.InvestorRole.unshift(newlement);
        }
      });
    },
    //   查询
    sureSearch() {
      let data = {
        auditStatus: this.nameForm.InvestorRole,
        customerType: this.nameForm.Category,
        pageIndex: this.page,
        pageSize: this.num,
        name: this.search
      };
      //   获取数据
      ajax.authPost.bind(this)("/api/Management/Query/Audit", data, res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.tabelList = this.tableData.list;
          this.tabelCount = this.tableData.page;
        }
      });
    },
    // 特定对象查看详情
    checkDe(index, row) {
      let id = row.id;
      this.id = row.id;
      this.lists("/api/Management/Audit/Material/Authentication/");
      // //审核通过
      let auditStatus = row.authentication.auditStatus;
      if (auditStatus == 4) {
        this.completion = true;
      } else if (auditStatus == 3) {
        this.completion = true;
      } else {
        this.checkDetail = true;
      }
    },
    // 适当性审核查看详情
    appropriate(index, row) {
      let id = row.id;
      this.id = row.id;
      //   console.log(this.id)
      this.lists("/api/Management/Audit/Material/Appropriateness/");
      //审核通过
      let auditStatus = row.appropriateness.auditStatus;
      if (auditStatus == 4) {
        this.completion = true;
      } else if (auditStatus == 3) {
        this.completion = true;
      } else {
        this.checkDes = true;
      }
    },
    // 合格投资查看详情
    qualified(index, row) {
      //   console.log(this.id)
      let id = row.id;
      this.id = row.id;
      this.lists("/api/Management/Audit/Material/Qualified/");
      //审核通过
      let auditStatus = row.qualified.auditStatus;
      if (auditStatus == 4) {
        this.completion = true;
      } else if (auditStatus == 3) {
        this.completion = true;
      } else {
        this.check = true;
      }
    },
    // 补充材料查看详情
    supplement(index, row) {
      //   console.log(this.id)
      let id = row.id;
      this.id = row.id;
      this.lists("/api/Management/Audit/Material/Others/");
      this.completion = true;
    },
    //封装方法
    lists(i) {
      ajax.authGet.bind(this)(i + this.id, res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.legalCertificate = res.data.data;
          this.itemsy = this.legalCertificate;
          // console.log(this.itemsy);
        }
      });
    },

    //特定对象审核通过按钮
    specificClick() {
      let data = { userId: this.id, remark: this.textareaNoPassage };
      ajax.authPost.bind(this)(
        "/api/Management/Audit/Authentication",
        data,
        res => {
          this.adopt = false;
          this.checkDetail = false;
          this.sureSearch();
        }
      );
    },
    //适当性审核通过按钮
    appropriateClick() {
      let data = { userId: this.id, remark: this.textareaNoPassage };
      ajax.authPost.bind(this)(
        "/api/Management/Audit/Appropriateness",
        data,
        res => {
          this.ado = false;
          this.checkDes = false;
          this.sureSearch();
        }
      );
    },
    //合格投资审核通过按钮
    qualifiedClick() {
      // this.test("/api/Management/Audit/Qualified");
      let data = { userId: this.id, remark: this.textareaNoPassage };
      ajax.authPost.bind(this)("/api/Management/Audit/Qualified", data, res => {
        this.noPassa = false;
        this.check = false;
        this.sureSearch();
      });
    },
    //特定对象审核不通过按钮
    NospecificClick() {
      let data = { userId: this.id, remark: this.textareaNoPassage };
      ajax.authPost.bind(this)(
        "/api/Management/Audit/Authentication/Refuse",
        data,
        res => {
          this.checkDetail = false;
          this.noPassage = false;
          this.sureSearch();
        }
      );
    },
    //适当性审核不通过按钮
    NoappropriatesClick() {
      let data = { userId: this.id, remark: this.textareaNoPassage };
      ajax.authPost.bind(this)(
        "/api/Management/Audit/Appropriateness/Refuse",
        data,
        res => {
          this.noPass = false;
          this.checkDes = false;
          this.sureSearch();
        }
      );
    },
    // //合格投资审核通过按钮
    qualifiedClick() {
      let data = { userId: this.id, remark: this.textareaNoPassage };
      ajax.authPost.bind(this)("/api/Management/Audit/Qualified", data, res => {
        this.adop = false;
        this.check = false;
        this.sureSearch();
      });
    },
    //合格投资审核不通过按钮
    NoqualifiedsClick() {
      let data = { userId: this.id, remark: this.textareaNoPassage };
      ajax.authPost.bind(this)(
        "/api/Management/Audit/Qualified/Refuse",
        data,
        res => {
          this.noPassa = false;
          this.check = false;
          this.sureSearch();
        }
      );
    },

    //每页显示数据量变更
    handleSizeChange(val) {
      this.num = val;
      this.sureSearch();
    },

    //页码变更
    handleCurrentChange(val) {
      this.page = val;
      this.sureSearch();
    }
  },
  created() {
    this.getAllList();
    this.sureSearch();
  }
};
</script>
 
 <style lang="less" scoped>
.currenminput {
  padding-top: 10px;
  .el-input {
    width: 220px;
  }
  /deep/.el-input__icon {
    width: 100%;
    height: 100%;
  }
  /deep/.el-button {
    height:100%;
  }
}
.el-dialog__header {
  text-align: center;
}
.remarks {
  display: flex;
  padding-top: 20px;
}
.el-dialog__wrapper {
  z-index: 9999 !important;
}
/deep/.el-popper {
  margin-top: 0;
}
</style>
 