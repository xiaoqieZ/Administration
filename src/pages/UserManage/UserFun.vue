<template>
  <div class="Risk_heck">
    <div>基金合同</div>
    <div class="Risk_count">
      <el-input v-model="name" placeholder="输入机构名称搜索" @keyup.enter.native="getQuestionnaireData"></el-input>
      <el-button icon="el-icon-search" @click="getQuestionnaireData"></el-button>
      <el-button type="primary" @click="centerDialogVisible = true">添加机构印章</el-button>
    </div>
    <!-- 数据表单 -->
    <div class="Risk_data">
      <el-table :data="questionnaireData" stripe id="out-table" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="data" label="合同名称" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="机构名称">
          <template slot-scope="scope">
            <span>{{scope.row.mechanismName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="是否启用">
          <template slot-scope="scope">
            <span>{{scope.row.isAvailable==1?'启用':'未启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.isAvailable==0">
              <span style="color:#409EFF" @click="enable(scope.$index,scope.row)">启用</span>
              <span style="color:#409EFF" @click="edit(scope.$index,scope.row)">编辑合同</span>
            </div>
            <div v-else>
              <span style="color:#409EFF" @click="cancelEnable(scope.$index,scope.row)">取消启用</span>
            <span style="color:#409EFF" @click="editSigning(scope.$index,scope.row)">发起签约</span>
            </div>
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
      <!-- 添加机构印章弹窗 -->
      <el-dialog title="添加机构印章" :visible.sync="centerDialogVisible" width="60%" center>
        <div class="dialog_list">
          <div class="dialog_title">请填写下列信息</div>
          <div class="dialog_count">
            <el-form :model="form">
              <el-form-item label="合同名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="合同原始文件">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="action"
                  :on-success="chengeNotice"
                  :file-list="fileList"
                  :headers="access_token"
                >
                  <el-button size="small" type="primary">点击上传文件</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="基金产品">
                <el-select v-model="form.mechanismType" placeholder="请选择基金产品">
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in legalData"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构">
                <el-select v-model="form.mechanismRegisterType" placeholder="请选择机构">
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in mechanism"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remarks" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-form>
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
        name: "",
        NoticefileId: "", //合同文件Id
        remarks: "",
        mechanismType: "",
        mechanismRegisterType: ""
      },
      id: 0,
      fileList: [],
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      action: ajax.doms.bind(this)("/api/Management/Contract/Upload"),
      mechanism: [],
      legalData: []
    };
  },
  methods: {
    //数据
    getQuestionnaireData() {
      let data = {
        contractName: this.name,
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)("/api/Management/Query/Contract", data, res => {
        this.questionnaireData = res.data.data.list;
        this.questionnairecount = res.data.data.page;
      });
    },
    //法人归属地
    getcommon() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Product/Available",
        res => {
          this.legalData = res.data.data;
        }
      );
      ajax.authGet.bind(this)(
        "/api/Management/Contract/Mechanism/Available",
        res => {
          this.mechanism = res.data.data;
        }
      );
    },
    //合同文件上传成功的回调
    chengeNotice(response, file, fileList) {
      this.form.NoticefileId = response.data.id;
    },
    //弹窗确定添加按钮
    Preservation() {
      let data = {
        id: 0,
        productId: this.form.mechanismType,
        name: this.form.name,
        originMaterialId: this.form.NoticefileId,
        remark: this.form.remarks,
        mechanismId: this.form.mechanismRegisterType
      };
      ajax.authPost.bind(this)("/api/Management/Contract", data, res => {
        this.centerDialogVisible = false;
        this.getQuestionnaireData();
      });
    },
    //操作栏 启动
    enable(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Available/" + row.id,
        res => {
          this.getQuestionnaireData();
        }
      );
    },
    //操作栏 取消启动
    cancelEnable(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Inavailable/" + row.id,
        res => {
          this.getQuestionnaireData();
        }
      );
    },
    //编辑合同
    edit(index, row) {
      let data = {
        id: row.id,
        name: row.name
      };
      this.$router.push({
        path: "/NavBar/UserManage/SealEditor",
        query:{data}
      });
    },
    //发起签约
    editSigning(index,row){
      let data = {
        id:row.id
      }
      this.$router.push({path: '/NavBar/UserManage/AccountManage', query:{data}})
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
      }
    }
  }
}
</style>