<template>
  <div>
    <div style="font-weight: 600;padding-bottom: 10px;">{{PositionHolder.fundTypeName}}</div>
    <div class="Hold">
      <div class="HoldForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="ruleForm_item">
            <div class="HoldNum">
              持仓数量：
              <span>{{positionsNum}}</span>
            </div>
            <el-form-item label="操作类型" prop="region">
              <el-select
                v-model="ruleForm.region"
                placeholder="请选择活动区域"
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
            <div class="HoldNum">匹配订单</div>
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
          <!-- 冷静回访 -->
          <div class="chill_item">
            <div class="HoldNum">冷静期回访</div>
            <el-form-item label="冷静期设置" prop="coolDownPeriod">
              <el-input v-model="ruleForm.coolDownPeriod"></el-input>
            </el-form-item>
            <el-form-item label="冷静期后回访设置" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 双录视频 -->
          <div>
            <div class="HoldNum">双路视频</div>
            <div class="holdVideo">
              <p>普通投资者申请成为专业投资者-请上传视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionNotice"
                :on-success="chengeNotice"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>向普通投资者销售高风险产品或服务-请上传双录视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionNotice"
                :on-success="chengeNo"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>调整投资者分类、基金产品或者服务等级以及适当性匹配意见-请上传双路视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionNotice"
                :on-success="chengeNoti"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>像普通投资者销售基金产品或服务前对其进行风险提示-请上传视频（选填）</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionNotice"
                :on-success="chenge"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
          </div>
          <div>
            <div class="HoldNum">操作详情</div>
            <!-- 表格数据操作 -->
            <el-table :data="tabelPotentialList" stripe id="out-table" style="width: 100%">
              <!-- 勾选框 -->
              <el-table-column type="selection" width="55"></el-table-column>
              <!-- 索引 -->
              <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
              <el-table-column align="center" prop="fundScale" label="操作">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="creationTime" label="净值时间">
                <template slot-scope="scope">
                  <span>{{scope.row.certificateTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="recommendName" label="单位净值">
                <template slot-scope="scope">
                  <span>{{scope.row.portionAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="recommendName" label="份额">
                <template slot-scope="scope">
                  <span>{{scope.row.certificateTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="recommendName" label="金额">
                <template slot-scope="scope">
                  <span>{{scope.row.certificateNo}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="recommendName" label="操作时间">
                <template slot-scope="scope">
                  <span>{{scope.row.customerTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="isQualified" label="双路视频">
                <template slot-scope="scope">
                  <span class="spanColor" @click="delInvestor(scope.$index, scope.row)">删除投资人</span>
                  <span class="spanColor" @click="holdPositions(scope.$index, scope.row)">持仓管理</span>
                  <span class="spanColor" @click="returnVisit(scope.$index, scope.row)">适当性回访</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 页码 -->
            <div align="center">
              <el-pagination
                background
                @size-change="handleSize"
                @current-change="handleCurrent"
                :current-page="page"
                :page-size="num"
                layout="total, prev, pager, next, jumper"
                :total="tabelPotentialListPage.count"
              ></el-pagination>
            </div>
          </div>
          <div class="ruleForm_submit">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      holdPositions: {}, //id
      PositionHolder: {}, //持仓者信息
      ruleForm: {
        region: "",
        date1: "",
        delivery: "",
        name: "",
        desc: "",
        relateOrder: "",
        coolDownPeriod: "",
        resource: "",
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
      fileList: [],
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
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        name: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      tabelPotentialListPage: "", //页码数量
      page: 1,
      num: 6,
      tabelPotentialList: [], //操作详情
      operationList: [], //操作类型下拉框数据
      relationList: [], //关联订单下拉框
      values: "",
      positionsNum:'',//持仓份额
    };
  },
  methods: {
    // 获得持仓数量
    getpositions() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Invest/Asset?productId=" +
          this.$route.query.data.productId +
          "&userId=" +
          this.$route.query.data.userId,res=>{
            this.positionsNum=res.data.data
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
          "&orderType=" +
          this.values,
        res => {
          this.relationList = res.data.data;
        }
      );
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
              this.prev();
            }
          );
        } else {
          this.$message("打了星号的都要输入");
          return false;
        }
      });
    },
    prev() {
      this.$router.go(-1);
    },
    // 重置输入框
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //文件上传成功的回调
    chengeNotice(response, file, fileList) {
      this.ruleForm.fileId = response.data.id;
    },
    chengeNo(response, file, fileList) {
      this.ruleForm.saleHigherRiskMaterialId = response.data.id;
    },
    chengeNoti(response, file, fileList) {
      this.ruleForm.adjustMaterialId = response.data.id;
    },
    chenge(response, file, fileList) {
      this.ruleForm.riskWarningMaterialId = response.data.id;
    },
    //每页显示数据量变更
    handleSize: function(val) {
      this.num = val;
      this.getPresentation();
    },
    //页码变更
    handleCurrent: function(val) {
      this.page = val;
      this.getPresentation();
    }
  },
  mounted() {
    // this.getFundTypeName();
    this.getDataName();
    this.getoperation();
    this.getpositions();
  }
};
</script>
<style lang="less">
.Hold {
  height: 610px;
  overflow: scroll;
  background: #fff;
  padding: 10px;
  .HoldNum {
    border-left: 4px solid #2d8cf0;
  }
  .HoldForm {
    .ruleForm_item {
      width: 50%;
      /deep/.el-input__inner {
        margin-bottom: 0;
      }
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
    .ruleForm_submit {
      width: 100%;
      text-align: center;
    }
    .holdVideo {
      padding: 0 0 30px 20px;
      /deep/.upload-demo {
        width: 50%;
      }
    }
  }
}
</style>