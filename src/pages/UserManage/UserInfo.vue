<template>
  <div class="Risk_heck">
    <div>账户设置</div>
    <div class="Risk_count">
      <el-input v-model="name" placeholder="输入机构名称搜索" @keyup.enter.native="handleIconClick"></el-input>
      <el-button icon="el-icon-search" @click="handleIconClick"></el-button>
      <el-button type="primary" @click="addjig">添加机构</el-button>
    </div>
    <!-- 数据表单 -->
    <div class="Risk_data">
      <el-table :data="questionnaireData" stripe id="out-table" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="data" label="机构名称" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="法人姓名">
          <template slot-scope="scope">
            <span>{{scope.row.legalPersonName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="机构类型">
          <template slot-scope="scope">
            <span>{{scope.row.mechanismTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="法人归属地">
          <template slot-scope="scope">
            <span>{{scope.row.legalPersonOwnershipName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="是否启用">
          <template slot-scope="scope">
            <span>{{scope.row.isAvailable==1?'启用':'未启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="操作">
          <template slot-scope="scope">
            <span
              style="color:#409EFF;cursor:pointer"
              @click="enable(scope.$index,scope.row)"
              v-if="scope.row.isAvailable==0"
            >启用</span>
            <span style="color:#409EFF;cursor:pointer" @click="cancelEnable(scope.$index,scope.row)" v-else>取消启用</span>
            <span style="color:#409EFF;cursor:pointer" @click="edit(scope.$index,scope.row)">编辑</span>
            <span style="color:#409EFF;cursor:pointer" @click="SetUp(scope.$index,scope.row)">设置</span>
          </template>
        </el-table-column>
      </el-table>
      <div align="center">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-size="num"
          layout="total,prev, pager, next, jumper"
          :total="questionnairecount.count"
        ></el-pagination>
      </div>
      <!-- 添加机构弹窗 -->
      <el-dialog title="添加机构" :visible.sync="centerDialogVisible" width="60%" center>
        <div class="dialog_list">
          <div class="dialog_title">请填写下列信息，进行账户认证</div>
          <div class="dialog_count">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form :model="form">
                    <el-form-item label="手机号">
                      <el-input v-model="form.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮件">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="机构名称">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="机构类型">
                      <el-select v-model="form.mechanismType" placeholder="请选择机构类型">
                        <el-option
                          :label="item.text"
                          :value="Number(item.value)"
                          v-for="item in mechanism"
                          :key="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="注册类型">
                      <el-select v-model="form.mechanismRegisterType" placeholder="请选择注册类型">
                        <el-option
                          :label="item.text"
                          :value="Number(item.value)"
                          v-for="item in legalData"
                          :key="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form :model="form">
                    <el-form-item label="法人姓名">
                      <el-input v-model="form.legalPersonName"></el-input>
                    </el-form-item>
                    <el-form-item label="法人身份证号">
                      <el-input v-model="form.legalPersonIdCard"></el-input>
                    </el-form-item>
                    <el-form-item label="法人职业">
                      <el-input v-model="form.legalPersonProfession"></el-input>
                    </el-form-item>
                    <el-form-item label="法人手机号">
                      <el-input v-model="form.legalPersonMobile"></el-input>
                    </el-form-item>
                    <el-form-item label="法人归属地">
                      <el-select v-model="form.legalPersonOwnership" placeholder="请选择活动区域">
                        <el-option
                          :label="item.text"
                          :value="Number(item.value)"
                          v-for="item in commonData"
                          :key="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="Preservation">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      name: "",
      page: 1,
      num: 6,
      questionnaireData: [],
      questionnairecount: {},
      centerDialogVisible: false,
      form: {
        mobile: "",
        email: "",
        name: "",
        mechanismType: "",
        mechanismRegisterType: "",
        legalPersonName: "",
        legalPersonIdCard: "",
        legalPersonProfession: "",
        legalPersonMobile: "",
        legalPersonOwnership: ""
      },
      commonData: [],
      mechanism: [],
      legalData: [],
      id: 0,
      mechanismData:{}
    };
  },
  methods: {
    //数据
    getQuestionnaireData() {
      let data = {
        name: this.name,
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)("/api/Management/Query/Mechanism", data, res => {
        this.questionnaireData = res.data.data.list;
        this.questionnairecount = res.data.data.page;
      });
    },
    //法人归属地
    getcommon() {
      ajax.authGet.bind(this)("/api/Common/28", res => {
        this.commonData = res.data.data;
      });
      ajax.authGet.bind(this)("/api/Common/26", res => {
        this.mechanism = res.data.data;
      });
      ajax.authGet.bind(this)("/api/Common/27", res => {
        this.legalData = res.data.data;
      });
    },
    addjig(){
      this.id=0;
      this.centerDialogVisible = true;
      this.form.mobile=this.form.email= this.form.mechanismType=this.form.mechanismRegisterType=this.form.name=this.form.legalPersonName=this.form.legalPersonIdCard=this.form.legalPersonProfession=this.form.legalPersonMobile=this.form.legalPersonOwnership=''
    },
    //弹窗确定按钮
    Preservation() {
      let data = {
        id: this.id,
        mobile: this.form.mobile,
        email: this.form.email,
        mechanismType: this.form.mechanismType,
        mechanismRegisterType: this.form.mechanismRegisterType,
        name: this.form.name,
        legalPersonName: this.form.legalPersonName,
        legalPersonIdCard: this.form.legalPersonIdCard,
        legalPersonProfession: this.form.legalPersonProfession,
        legalPersonMobile: this.form.legalPersonMobile,
        legalPersonOwnership: this.form.legalPersonOwnership
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Mechanism",
        data,
        res => {
          this.centerDialogVisible = false;
          this.getQuestionnaireData();
        }
      );
    },
    //搜索
    handleIconClick() {
        let data = {
            name:this.name,
            pageIndex:this.page,
            pageSize:this.num
        };
        ajax.authPost.bind(this)('/api/Management/Query/Mechanism',data,res=>{
            this.getQuestionnaireData()
        })
    },
    //操作栏 启动
    enable(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Mechanism/Available/" + row.id,
        res => {
          this.getQuestionnaireData();
        }
      );
    },
    //操作栏 取消启动
    cancelEnable(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Mechanism/Inavailable/" + row.id,
        res => {
          this.getQuestionnaireData();
        }
      );
    },
    //编辑
    edit(index,row){
      this.centerDialogVisible = true;
      this.id = row.id
      ajax.authGet.bind(this)('/api/Management/Contract/Mechanism/'+row.id,res=>{
        this.mechanismData = res.data.data;
         this.form.mobile=this.mechanismData.mobile,
        this.form.email=this.mechanismData.email,
        this.form.mechanismType=this.mechanismData.mechanismType,
        this.form.mechanismRegisterType=this.mechanismData.mechanismRegisterType,
        this.form.name=this.mechanismData.name,
        this.form.legalPersonName=this.mechanismData.legalPersonName,
        this.form.legalPersonIdCard=this.mechanismData.legalPersonIdCard,
        this.form.legalPersonProfession=this.mechanismData.legalPersonProfession,
        this.form.legalPersonMobile=this.mechanismData.legalPersonMobile,
        this.form.legalPersonOwnership=this.mechanismData.legalPersonOwnership
      })
    },
    //设置印章
    SetUp(index, row) {
      let data = {
        id: row.id,
        legalPersonName: row.legalPersonName,
        name: row.name
      };
      this.$router.push({
        path: "/NavBar/UserManage/CorporateSeal",
        query: { data }
      });
    },
    //每页显示数据量变更
    handleSizeChange(val) {
      this.num = val;
      this.getQuestionnaireData();
    },
    //页码变更
    handleCurrentChange(val) {
      this.page = val;
      this.getQuestionnaireData();
    }
  },
  mounted() {
    this.getQuestionnaireData();
    this.getcommon();
  }
};
</script>
<style lang="less" scoped>
.Risk_heck {
  .Risk_count {
    padding-top: 10px;
    /deep/.el-input {
      width: 35%;
    }
  }
  .Risk_data {
    /deep/.el-dialog__body {
      height: 450px;
      overflow: scroll;
    }
    .dialog_list {
      .dialog_title {
        font-weight: 600;
      }
      .dialog_count {
        /deep/.el-icon-arrow-up {
          height: 125%;
        }
        /deep/.el-select {
          display: contents;
        }
        /deep/.el-input{
          width: 90%;
        }
      }
    }
  }
}
</style>