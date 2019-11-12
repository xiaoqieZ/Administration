<template>
  <div>
    <div class="title">
      <div>
        <el-button icon="el-icon-d-arrow-left" @click="prev">产品编辑</el-button>
      </div>&nbsp;&nbsp;
      <div style="font-weight: 600;padding-bottom: 10px;">{{PositionHolder.fundTypeName}}</div>
    </div>
    <div class="Hold">
      <div class="HoldForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 持仓数量 -->
          <div class="ruleForm_item">
            <div><div class="HoldNum"></div>
              持仓数量：
              <span>{{positionsNum}}</span>
            </div>
            <!-- 冷静回访 -->
          <div class="chill_item">
            <div><div class="HoldNum"></div>冷静期回访</div>
            <el-form-item label="冷静期设置" prop="coolDownPeriod">
              <InputNumber
                :max="10000"
                :min="0"
                v-model="ruleForm.coolDownPeriod"
                :formatter="value => ` ${value} 小时`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')*1"
              ></InputNumber>
            </el-form-item>
            <el-form-item label="冷静期后回访设置" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
            <el-form-item label="操作类型" prop="region">
              <el-select
                v-model="ruleForm.region"
                placeholder="请选择操作类型"
                @change="selectOne($event)"
              >
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="item in operationList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="净值日期" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.date1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="单位净值" prop="delivery">
              <el-input v-model="ruleForm.delivery"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="份额" prop="desc">
              <el-input v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </div>
          <!-- 匹配订单 -->
          <div>
            <div><div class="HoldNum"></div>匹配订单</div>
            <el-form-item label="操作类型" prop="relateOrder">
              <el-select v-model="ruleForm.relateOrder" placeholder="关联订单">
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="item in relationList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 双录视频 -->
          <div>
            <div><div class="HoldNum"></div>双录视频</div>
            <div class="holdVideo">
              <p>普通投资者申请成为专业投资者-请上传视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload1"
                :action="actionNotice"
                :on-success="chengeNotice"
                :on-error="upError1"
                :on-change="handleChange"
                :file-list="fileList1"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>向普通投资者销售高风险产品或服务-请上传双录视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload2"
                :action="actionNotice"
                :on-success="chengeNo"
                :on-error="upError2"
                :on-change="handleChange"
                :file-list="fileList2"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>调整投资者分类、基金产品或者服务等级以及适当性匹配意见-请上传双录视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload3"
                :action="actionNotice"
                :on-success="chengeNoti"
                :on-error="upError3"
                :on-change="handleChange"
                :file-list="fileList3"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>像普通投资者销售基金产品或服务前对其进行风险提示-请上传视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload4"
                :action="actionNotice"
                :on-success="chenge"
                :on-error="upError4"
                :on-change="handleChange"
                :file-list="fileList4"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
          </div>
        </el-form>
        <div>
          <div><div class="HoldNum"></div>操作详情</div>
          <!-- 表格数据操作 -->
          <el-table :data="tabelPotentialList" stripe id="out-table" style="width: 100%">
            <!-- 勾选框 -->
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- 索引 -->
            <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
            <el-table-column align="center" prop="fundScale" label="操作类型">
              <template slot-scope="scope">
                <span>{{scope.row.operationTypeName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fundScale" label="操作状态">
              <template slot-scope="scope">
                <span>{{scope.row.operationStatusName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="净值时间">
              <template slot-scope="scope">
                <span>{{scope.row.dateOfWorth}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="recommendName" label="单位净值">
              <template slot-scope="scope">
                <span>{{scope.row.unitWorth}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="recommendName" label="份额">
              <template slot-scope="scope">
                <span>{{scope.row.portionAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="recommendName" label="金额">
              <template slot-scope="scope">
                <span>{{scope.row.moneyAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="recommendName" label="操作时间">
              <template slot-scope="scope">
                <span>{{scope.row.creationTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="isQualified" label="双路视频">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.investorTypeApplyMaterial"
                  :href="scope.row.investorTypeApplyMaterial&&scope.row.investorTypeApplyMaterial.fullPath"
                  target="_blanck"
                  title="普通投资者申请成为专业投资者-请上传视频"
                >
                  <p class="spanColor">转化视频</p>
                </a>
                <a
                  v-if="scope.row.saleHigherRiskMaterial"
                  :href="scope.row.saleHigherRiskMaterial&&scope.row.saleHigherRiskMaterial.fullPath"
                  target="_blanck"
                  title="向普通投资者销售高风险产品或服务-请上传双录视频"
                >
                  <p class="spanColor">双录视频1</p>
                </a>
                <a
                  v-if="scope.row.adjustMaterial"
                  :href="scope.row.adjustMaterial&&scope.row.adjustMaterial.fullPath"
                  target="_blanck"
                  title="调整投资者分类、基金产品或者服务等级以及适当性匹配意见-请上传双路视频"
                >
                  <p class="spanColor">双录视频2</p>
                </a>
                <a
                  v-if="scope.row.riskWarningMaterial"
                  :href="scope.row.riskWarningMaterial&&scope.row.riskWarningMaterial.fullPath"
                  target="_blanck"
                  title="像普通投资者销售基金产品或服务前对其进行风险提示-请上传视频"
                >
                  <p class="spanColor">风险提示视频</p>
                </a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="isQualified" label="操作">
              <template slot-scope="scope">
                <span
                  class="spanColor"
                  v-if="scope.row.operationStatus==2||scope.row.operationStatus==3"
                  @click="cancel(scope.$index,scope.row)"
                >取消</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码 -->
          <!-- <div align="center">
              <el-pagination
                background
                @size-change="handleSize"
                @current-change="handleCurrent"
                :current-page="page"
                :page-size="num"
                layout="total, prev, pager, next, jumper"
                :total="tabelPotentialList.count"
              ></el-pagination>
          </div>-->
        </div>
        <div class="ruleForm_submit">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      activeName: "fourth",
      PositionHolder: {}, //持仓者信息
      ruleForm: {
        region: "",
        date1: "",
        delivery: "",
        name: "",
        desc: "",
        relateOrder: "",
        coolDownPeriod: 0,
        resource: 0,
        fileId: "",
        saleHigherRiskMaterialId: "",
        adjustMaterialId: "",
        riskWarningMaterialId: ""
      },
      actionNotice: ajax.doms.bind(this)(
        "/api/Management/Product/Invest/Upload/" +
          this.$route.query.data.productId
      ),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      rules: {
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        delivery: [
          {
            required: true,
            required: true,
            message: "请输入单位净值",
            trigger: "change"
          }
        ],
        name: [
          { required: true, message: "请输入金额", trigger: "change" }
        ],
        desc: [{ required: true, message: "请输入份额", trigger: "blur" }]
      },
      tabelPotentialListPage: "", //页码数量
      page: 1,
      num: 6,
      tabelPotentialList: [], //操作详情
      operationList: [], //操作类型下拉框数据
      relationList: [], //关联订单下拉框
      values: "",
      positionsNum: "" //持仓份额
    };
  },
  methods: {
    // 获得持仓数量
    getpositions() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Invest/Asset?productId=" +
          this.$route.query.data.productId +
          "&userId=" +
          this.$route.query.data.userId,
        res => {
          this.positionsNum = res.data.data;
        }
      );
    },
    //基金产品信息
    getDataName() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Product/" + this.$route.query.data.productId,
        res => {
          this.PositionHolder = res.data.data;
        }
      );
    },
    //操作类型下拉框
    getoperation() {
      ajax.authGet.bind(this)("/api/Common/20", res => {
        this.operationList = res.data.data;
        this.operationList.unshift({ value: "0", text: "无" });
      });
    },
    //操作详情
    getTabelPotentialList() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Invest/Operation?productId=" +
          this.$route.query.data.productId +
          "&userId=" +
          this.$route.query.data.userId,
        res => {
          this.tabelPotentialList = res.data.data;
        }
      );
    },
    //下拉change
    selectOne(event) {
      this.values = event;
      this.getRelation();
    },
    // 关联订单下拉框
    getRelation() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Invest/Order?productId=" +
          this.$route.query.data.productId +
          "&userId=" +
          this.$route.query.data.userId +
          "&operationType=" +
          this.values,
        res => {
          this.relationList = res.data.data;
        }
      );
    },
    upError1(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles1();
    },
    upError2(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles2();
    },
    upError3(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles3();
    },
    upError4(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles4();
    },
    // 确定发送按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            productId: this.$route.query.data.productId,
            userId: this.$route.query.data.userId,
            operationType: this.ruleForm.region,
            dateOfWorth: this.ruleForm.date1,
            unitWorth: this.ruleForm.delivery,
            moneyAmount: this.ruleForm.name,
            portionAmount: this.ruleForm.desc,
            relateOrder: this.ruleForm.relateOrder,
            coolDownPeriod: this.ruleForm.coolDownPeriod,
            shouldVisitBack: this.ruleForm.resource,
            investorTypeApplyMaterialId: this.ruleForm.fileId,
            saleHigherRiskMaterialId: this.ruleForm.saleHigherRiskMaterialId,
            adjustMaterialId: this.ruleForm.adjustMaterialId,
            riskWarningMaterialId: this.ruleForm.riskWarningMaterialId
          };
          ajax.authPost.bind(this)(
            "/api/Management/Product/Invest/Save",
            data,
            res => {
              this.getDataName();
              this.getTabelPotentialList();
              this.$message({ message: res.data.message, type: "success" });
              let data = {
                ads: 1,
                id: this.$route.query.data.productId
              };
              this.$router.push({
                path: "/NavBar/DataDitionary/BankDataList",
                query: { data }
              });
            }
          );
        } else {
          this.$message({
            message: "打了星号的都要输入",
            type: "error"
          });
          return false;
        }
      });
    },
    //取消
    cancel(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Invest/Cancel?operationId=" + row.id,
        res => {
          this.getTabelPotentialList();
        }
      );
    },
    //返回
    prev() {
      let data = {
        ads: 1,
        id: this.$route.query.data.productId
      };
      this.$router.push({
        path: "/NavBar/DataDitionary/BankDataList",
        query: { data }
      });
    },
    // 重置输入框
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //文件上传成功的回调
    chengeNotice(response, file, fileList) {
      this.ruleForm.fileId = ajax.getMaterialId.bind(this)(response, () => {
        //还原
        this.clearFiles1();
      });
    },
    //文件上传个数
    handleChange(file, fileList) {
      fileList.length > 1 ? fileList.splice(0, 1) : fileList;
    },
    //移除/还原文件列表
    clearFiles1() {
      this.$refs["upload1"].clearFiles();
    },
    clearFiles2() {
      this.$refs["upload2"].clearFiles();
    },
    clearFiles3() {
      this.$refs["upload3"].clearFiles();
    },
    clearFiles4() {
      this.$refs["upload4"].clearFiles();
    },
    chengeNo(response, file, fileList) {
      this.ruleForm.saleHigherRiskMaterialId = ajax.getMaterialId.bind(this)(
        response,
        () => {
          //还原
          this.clearFiles2();
        }
      );
    },
    chengeNoti(response, file, fileList) {
      this.ruleForm.adjustMaterialId = ajax.getMaterialId.bind(this)(
        response,
        () => {
          //还原
          this.clearFiles3();
        }
      );
    },
    chenge(response, file, fileList) {
      this.ruleForm.riskWarningMaterialId = ajax.getMaterialId.bind(this)(
        response,
        () => {
          //还原
          this.clearFiles4();
        }
      );
    }
    // //每页显示数据量变更
    // handleSize: function(val) {
    //   this.num = val;
    //   this.getPresentation();
    // },
    // //页码变更
    // handleCurrent: function(val) {
    //   this.page = val;
    //   this.getPresentation();
    // }
  },
  mounted() {
    // this.getFundTypeName();
    this.getDataName();
    this.getoperation();
    this.getpositions();
    this.getTabelPotentialList();
  }
};
</script>
<style lang="less">
.title {
  display: flex;
  height: 50px;
  line-height: 40px;
}
.Hold {
  height: 610px;
  overflow: scroll;
  background: #fff;
  padding: 10px;
  .HoldNum {
    display: inline;
    padding-right:10px; 
    border-left: 4px solid #2d8cf0;
  }
  .HoldForm {
    .ruleForm_item {
      width: 50%;
      /deep/.el-input__inner {
        margin-bottom: 0;
      }
      .chill_item {
      width: 50%;
      /deep/.el-form-item__label {
        width: 150px !important;
      }
      /deep/.el-form-item__content {
        margin-left: 153px !important;
      }
    }
    }
    
    .ruleForm_submit {
      width: 100%;
      text-align: center;
      padding-top: 50px;
    }
    .holdVideo {
      padding: 0 0 30px 20px;
      /deep/.upload-demo {
        width: 50%;
      }
    }
  }
}
.spanColor {
  color: #409eff;
  cursor: pointer;
}
@media screen and (max-width: 1620px) {
  .Hold {
    height: 560px;
  }
}
@media screen and (min-width: 1620px) {
  .Hold {
    height: 700px;
  }
}
</style>