 <template>
  <div id="app">
    <div slot="客户信息" style="font-size:16px;">客户信息</div>
    <vue-scroll>
      <div class="currenminput">
        <div class="left">
          <!-- <el-input v-model="username" placeholder="请输入姓名"></el-input>
          &nbsp;&nbsp;
          <el-input v-model="address" placeholder="请输入地址" @keyup.native.enter='getAdd'></el-input>
          &nbsp;&nbsp;
          <el-button type="primary" @click='getAdd'>添加</el-button>
          &nbsp;&nbsp;
          <el-button type="primary" @click="exportExcel">导出</el-button>-->
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
          <el-select v-model="nameForm.Investortype">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in Investortype"
              :key="item.index"
            ></el-option>
          </el-select>
          <el-input v-model="search" placeholder="搜索姓名/机构名称" prefix-icon="el-icon-search"></el-input>

          <el-button type="primary" @click="sureSearch">确定</el-button>
        </div>
      </div>
      <!-- 表格数据操作 -->
      <!-- .filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase())) -->
      <el-table :data="tabelList" stripe id="out-table" style="width: 100%">
        <!-- 勾选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 索引 -->
        <!-- <el-table-column
      align="center"
      type="index"
      prop="data"
      label="序号"
      width="100">
        </el-table-column>-->
        <el-table-column align="center" prop="name" label="姓名/机构名称" width="180">
          <template slot-scope="scope">
            <span style="color: #409eff"  @click="personalData(scope.$index, scope.row)">{{scope.row.name}}</span>
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
        <el-table-column align="center" prop="investorType" label="投资者类别">
          <template slot-scope="scope">
            <span>{{scope.row.investorRoleName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isQualified" label="是否为合格投资者">
          <template slot-scope="scope">
            <span>{{scope.row.isQualifiedName}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
      align="center" 
      width="280"
      label="操作">
      <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index,scope.row)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click.prevent="del(scope.$index, scope.row)" circle></el-button>
            <el-button type="primary" icon="el-icon-view" size="mini" @click="checkDe(scope.$index, scope.row)"  circle></el-button>
      </template>
          </el-table-column>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="true" :append-to-body="true" width="80%">-->
        <!--//editForm表单提交的数据-->
        <!-- <el-form :model="editForm" label-width="80px"  ref="editForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="addres">
                <el-input v-model="editForm.addres" placeholder="请输入地址"></el-input>
              </el-form-item>
            </el-form>           
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="editSubmit" >提交</el-button>
            </div>
        </el-dialog>-->
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
      <!-- <el-dialog title="详情" :append-to-body="true" :visible.sync="checkDetail" width="80%">
        <p>姓名：{{guid}}</p>
        <p>地址： {{diz}}</p>
        <p>填表时间：{{times}}</p>
        <p>新技能</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkDetail = false">取 消</el-button>
          <el-button type="primary" @click="checkDetail = false">确 定</el-button>
        </span>
      </el-dialog>-->
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
      // editFormVisible: false, //设置默认弹出框  为false
      editForm: {
        name: "",
        addres: ""
      },
      // guid: "",
      // diz: "",
      // times: "",
      // checkDetail: false,//查看详情
      nameForm: {
        InvestorRole: "0", //投资者角色
        Category: "0", //客户类别
        RiskLevel: "0", //风险等级
        Investortype: "0" //投资者类型
      },
      InvestorRole: [], //投资者角色
      Category: [], //客户类别
      RiskLevel: [], //风险等级
      Investortype: [], //投资者类型
      tabelList: [], //数据
      tabelCount: {} //数据条数
    };
  },
  methods: {
    // 查看详情
    // checkDe(index, row) {
    //   console.log(index, row);
    //   this.guid = row.title;
    //   this.diz = row.content;
    //   this.times = row.created_at;
    //   this.checkDetail = !this.checkDetail;
    // },
    getAllList() {
      //获取数据
      // let list = { num: this.num, page: this.page };
      // this.$http
      //   .get("http://mx.maplegg.com/api/vue/getwz", { params: list })
      //   .then(res => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       this.tableData = res.data;
      //     } else {
      //       alert("请求数据失败");
      //     }
      //   });
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
      //投资者类型下拉
      ajax.authGet.bind(this)("/api/Common/8", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.Investortype = res.data.data;
          let newlement = { text: "全部", value: "0" };
          this.Investortype.unshift(newlement);
        }
      });
    },
    //查询
    sureSearch() {
      let data = {
        investorRole: this.nameForm.InvestorRole,
        customerType: this.nameForm.Category,
        riskLevel: this.nameForm.RiskLevel,
        investorType: this.nameForm.Investortype,
        pageIndex: this.page,
        pageSize: this.num,
        name: this.search
      };
      ajax.authPost.bind(this)("/api/Management/Query/Customer", data, res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.tabelList = this.tableData.list;
          this.tabelCount = this.tableData.page;
        }
      });
    },
    //点击姓名进入个人信息页
    personalData(i,row){
      let data = row.id
      this.$router.push({path:'/NavBar/CParameter/personalData',query:{data}})
    },
    // 添加
    // getAdd(){
    //   if(this.username&&this.address!=''){
    //     let data={
    //         title:this.username,
    //         content:this.address
    //         }
    //     this.$http.post('http://mx.maplegg.com/api/vue/addwz',data,{ emulateJSON: true }).then(res=>{
    //         console.log(res);
    //         if(res.status==200){
    //             this.getAllList();
    //             this.username=this.address=''
    //         }else{
    //             Toast('数据请求失败')
    //         }
    //     })
    //     }else{
    //       // Toast({
    //       //   message: '输入框内不能留空',
    //       //   position:'top',
    //       //   duration: 2000
    //       // });
    //       this.$message({
    //       showClose: true,
    //       message: '输入框内不能留空',
    //       duration:2000,
    //       type: 'warning'
    //     });
    //     }
    // },
    // // 删除
    // del(index, row){
    //     console.log(index);
    //     console.log(row);
    //     this.$http.post('http://mx.maplegg.com/api/vue/delwz',{emulateJSON: true,id: row.id}).then(res=>{
    //     console.log(res);
    //     if(res.status==200){
    //         this.getAllList();
    //     }else {
    //          alert('删除失败')
    //     }
    // })
    // },
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
    // // 编辑
    // handleEdit:function (index, row) {
    //   this.editFormVisible = true;
    //   this.editForm = Object.assign({}, row);   //拿到数据
    //   console.log(this.editForm);
    //   let prolist={
    //     title:this.editForm.neme,
    //     content:this.editForm.address
    //   }
    // },
    // 确认编辑
    // editSubmit(){
    //   console.log('发送成功');
    //   this.editFormVisible = false
    // },
    //  //定义导出Excel表格事件
    //  exportExcel() {
    //  /* 从表生成工作簿对象 */
    //  var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
    //  /* 获取二进制字符串作为输出 */
    //  var wbout = XLSX.write(wb, {
    //      bookType: "xlsx",
    //      bookSST: true,
    //      type: "array"
    //  });
    //  try {
    //      FileSaver.saveAs(
    //      //Blob 对象表示一个不可变、原始数据的类文件对象。
    //      //Blob 表示的不一定是JavaScript原生格式的数据。
    //      //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    //      //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    //      new Blob([wbout], { type: "application/octet-stream" }),
    //      //设置导出文件名称
    //      "qiezi.xlsx"
    //      );
    //  } catch (e) {
    //      if (typeof console !== "undefined") console.log(e, wbout);
    //  }
    //  return wbout;
    //  },
  },
  created() {
    this.getAllList();
    this.sureSearch();
  }
};
</script>
 
 <style lang="less" >
.currenminput {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    /deep/.el-input__suffix {
      height: 70%;
    }
    // /deep/.el-popper {
    //   margin-top: 0 !important;
    // }
  }
  .el-input {
    width: 220px;
  }
  /deep/.el-input__icon {
    width: 100%;
  }
  /deep/.el-button {
    height: 75%;
  }
}
.el-dialog__wrapper {
  z-index: 9999 !important;
}
</style>
 