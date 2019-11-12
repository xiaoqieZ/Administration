 <template>
  <div id="app">
    <div slot="产品列表" style="font-size:16px;">产品列表</div>
    <div class="currenminput">
      <div class="addButton">
        <el-button type="primary" size="small" @click="Addproduct">添加产品</el-button>
        <el-button type="primary" size="small" @click="exportExcel">下载模板</el-button>
        <el-button type="primary" size="small" @click="centerupload=true">上传</el-button>
      </div>
      <!-- 表格数据操作 -->
      <el-table :data="tabelList" stripe id="out-table" style="width: 100%">
        <!-- 勾选框 -->
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <!-- 索引 -->
        <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="fundRecordNumber" label="产品编号">
          <template slot-scope="scope">
            <span>{{scope.row.fundRecordNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="fundStatus" label="产品状态">
          <template slot-scope="scope">
            <span>{{scope.row.fundStatusName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="fundScale" label="产品规模(单位/万)">
          <template slot-scope="scope">
            <span>{{scope.row.fundScale}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="creationTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.creationTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="recommendName" label="推荐状态">
          <template slot-scope="scope">
            <span>{{scope.row.recommendName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="purchaseName" label="排序">
          <template slot-scope="scope">
            <span></span>
            <ButtonGroup>
              <el-tooltip class="item" effect="dark" content="上移" placement="top">
                <Icon @click="sort(scope.$index, scope.row,-1)" type="md-arrow-dropup" size="26" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="下移" placement="bottom">
                <Icon @click="sort(scope.$index, scope.row,1)" type="md-arrow-dropdown" size="26" />
              </el-tooltip>
            </ButtonGroup>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isQualified" label="招募说明">
          <template slot-scope="scope">
            <div @click="supplement(scope.$index, scope.row.id)">
              <Icon type="ios-eye" size="22" color="#409EFF" />
              <span class="spanColor">查看</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isQualified" label="操作">
          <template slot-scope="scope">
            <span class="spanColor" @click="changeSee(scope.$index, scope.row)">查看</span>
            <span class="spanColor" @click="changeAdministration(scope.$index, scope.row)">管理</span>
            <span class="spanColor" @click="delet(scope.$index, scope.row)">删除</span>
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
          layout="total, prev, pager, next, jumper"
          :total="tabelPage.count"
        ></el-pagination>
      </div>
      <!-- 上传净值 -->
      <el-dialog title="提示" :visible.sync="centerupload" width="30%" center>
        <el-form label-width="100px" :model="form">
          <el-checkbox-group v-model="form.smsNotify">
            <el-checkbox disabled>短信通知</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="form.emailNotify">
            <el-checkbox>邮件通知</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="form.weChatNotify">
            <el-checkbox>微信通知</el-checkbox>
          </el-checkbox-group>
          <el-upload
            class="upload-demo"
            ref="upload2"
            :data="uploadCenter"
            :action="actionUpload"
            :on-success="SuccessWorth"
            :on-change="handleChange"
            :on-error="upError2"
            :auto-upload="false"
            :file-list="fileList2"
            :headers="access_token"
          >
            <el-button size="small" type="primary">点击上传附件</el-button>
          </el-upload>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerupload = false">取 消</el-button>
          <el-button type="primary" @click="uploadContent">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 招募书查看 -->
      <div class="see_letter">
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="50%" center>
          <div class="upload">
            <el-button type="primary" @click="UploadFile = true">选择上传文件</el-button>
          </div>
          <template>
            <el-table :data="getRecruit" border style="width: 100%">
              <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
              <el-table-column prop="title" align="center" label="招募说明书" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="creationTime" align="center" label="上传日期" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.creationTime}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="creatorName" align="center" label="操作人员">
                <template slot-scope="scope">
                  <span>{{scope.row.creatorName}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <!-- 页码 -->
          <div align="center">
            <el-pagination
              background
              @size-change="handleSizeList"
              @current-change="handleCurrentPage"
              :current-page="pages"
              :page-size="nums"
              layout="total, prev, pager, next, jumper"
              :total="getCount.count"
            ></el-pagination>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 上传招募书弹框 -->
      <div class="recruitment_letter">
        <el-dialog title="提示" :visible.sync="UploadFile" width="30%" center>
          <el-upload
            class="upload-demo"
            ref="upload"
            :data="uploadData"
            :action="action"
            :on-change="handleChange"
            :on-success="chenggeing"
            :on-error="upError"
            :limit="1"
            :file-list="fileList"
            :headers="access_token"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="UploadFile = false">取 消</el-button>
            <el-button type="primary" @click="SubmitUploadFile">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- // 操作里面查看产品对话框 -->
      <div class="see_letter">
        <el-dialog title="产品信息" :visible.sync="DialogSee" width="50%" center>
          <el-row>
            <div style="font-weight:600">
              <Icon type="ios-bookmark" />基本信息
            </div>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  基金名称：
                  <span>{{getSeeOneList.product.name}}</span>
                </p>
                <p>
                  基金类型：
                  <span>{{getSeeOneList.product.manageTypeName}}</span>
                </p>
                <p>
                  管理类型：
                  <span>{{getSeeOneList.product.fundTypeName}}</span>
                </p>
                <p>
                  基金状态：
                  <span>{{getSeeOneList.product.fundStatusName}}</span>
                </p>
                <p>
                  私募基金公示信息url：
                  <span>
                    <a :href="getSeeOneList.product.publicityUrl" target="_blank">点击查看</a>
                  </span>
                </p>
                <p>
                  募集期起：
                  <span>{{getSeeOneList.product.raiseDateOfStart}}</span>
                </p>
                <p>
                  封闭期起：
                  <span>{{getSeeOneList.product.closureDateOfStart}}</span>
                </p>
                <p>
                  开放日：
                  <span>{{getSeeOneList.product.openDay}}</span>
                </p>
                <p>
                  认申购起点(单位/万)：
                  <span>{{getSeeOneList.product.applyAmount}}</span>
                </p>
                <p>
                  募集账户名：
                  <span>{{getSeeOneList.product.accountName}}</span>
                </p>
                <p>
                  募集户开户行：
                  <span>{{getSeeOneList.product.accountBank}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  基金备案编号：
                  <span>{{getSeeOneList.product.fundRecordNumber}}</span>
                </p>
                <p>
                  基金规模(单位/万)：
                  <span>{{getSeeOneList.product.fundScale}}</span>
                </p>
                <p>
                  基金存续期(单位/年)
                  <span>{{getSeeOneList.product.fundDuration}}</span>
                </p>
                <p>
                  私募基金管理人公示信息url：
                  <span>
                    <a :href="getSeeOneList.product.adminPublicityUrl" target="_blank">点击查看</a>
                  </span>
                </p>
                <p>
                  收益分配方案：
                  <span>{{getSeeOneList.product.incomeDistributionScheme}}</span>
                </p>
                <p>
                  募集期止：
                  <span>{{getSeeOneList.product.raiseDateOfEnd}}</span>
                </p>
                <p>
                  封闭期止：
                  <span>{{getSeeOneList.product.closureDateOfEnd}}</span>
                </p>
                <p>
                  产品成立日：
                  <span>{{getSeeOneList.product.fundBirth}}</span>
                </p>
                <p>
                  追加申购起点(单位/万)：
                  <span>{{getSeeOneList.product.appendAmount}}</span>
                </p>
                <p>
                  募集账户账号：
                  <span>{{getSeeOneList.product.account}}</span>
                </p>
                <p>
                  募集户大额支付系统行号：
                  <span>{{getSeeOneList.product.lineNumber}}</span>
                </p>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <div style="font-weight:600">
              <Icon type="ios-bookmark" />风险信息
            </div>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  风险等级：
                  <span>{{getSeeOneList.risk.riskLevelName}}</span>
                </p>
                <p>
                  风险说明：
                  <span>{{getSeeOneList.risk.remark}}</span>
                </p>
                <p>
                  止损线：
                  <span>{{getSeeOneList.risk.stopLossLine}}</span>
                </p>
                <p>
                  风险等级文件：
                  <span>
                    <a :href="material" target="_blank">点击查看</a>
                  </span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  预警线：
                  <span>{{getSeeOneList.risk.warningLine}}</span>
                </p>
                <p>
                  风险揭示书：
                  <span>{{getSeeOneList.risk.riskDisclosure}}</span>
                </p>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <div style="font-weight:600">
              <Icon type="ios-bookmark" />汇率信息
            </div>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  申购费：
                  <span>{{getSeeOneList.rate.applyRate}}</span>
                </p>
                <p>
                  管理费：
                  <span>{{getSeeOneList.rate.manageRate}}</span>
                </p>
                <p>
                  外包服务费：
                  <span>{{getSeeOneList.rate.outsourcingRate}}</span>
                </p>
                <p>
                  业绩报酬：
                  <span>{{getSeeOneList.rate.performanceRemunerationRate}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  赎回费：
                  <span>{{getSeeOneList.rate.redeemRate}}</span>
                </p>
                <p>
                  托管费：
                  <span>{{getSeeOneList.rate.trusteeshipRate}}</span>
                </p>
                <p>
                  投资顾问费：
                  <span>{{getSeeOneList.rate.investmentConsultantRate}}</span>
                </p>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <div style="font-weight:600">
              <Icon type="ios-bookmark" />投资情况
            </div>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  投资范围：
                  <span>{{getSeeOneList.investment.scale}}</span>
                </p>
                <p>
                  投资限制概况：
                  <span>{{getSeeOneList.investment.limit}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  投资策略：
                  <span>{{getSeeOneList.investment.policy}}</span>
                </p>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <div style="font-weight:600">
              <Icon type="ios-bookmark" />基金经理
            </div>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  基金经理1：
                  <span>{{getSeeOneList.manager.manager1}}</span>
                </p>
                <p>
                  履历1：
                  <span>{{getSeeOneList.manager.trackRecord1}}</span>
                </p>
                <p>
                  基金经理3：
                  <span>{{getSeeOneList.manager.manager3}}</span>
                </p>
                <p>
                  履历3：
                  <span>{{getSeeOneList.manager.trackRecord3}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  基金经理2：
                  <span>{{getSeeOneList.manager.manager2}}</span>
                </p>
                <p>
                  履历2：
                  <span>{{getSeeOneList.manager.trackRecord2}}</span>
                </p>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <div style="font-weight:600">
              <Icon type="ios-bookmark" />服务机构
            </div>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  托管机构：
                  <span>{{getSeeOneList.mechanism.trusteeship}}</span>
                </p>
                <p>
                  会计师事务所：
                  <span>{{getSeeOneList.mechanism.accountingFirm}}</span>
                </p>
                <p>
                  投资顾问：
                  <span>{{getSeeOneList.mechanism.investmentConsultant }}</span>
                </p>
                <p>
                  证券交易商：
                  <span>{{getSeeOneList.mechanism.security}}</span>
                </p>
                <p>
                  监督机构信息：
                  <span>{{getSeeOneList.mechanism.supervisory}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  律师事务所：
                  <span>{{getSeeOneList.mechanism.lawFirm}}</span>
                </p>
                <p>
                  保管机构：
                  <span>{{getSeeOneList.mechanism.custodian }}</span>
                </p>
                <p>
                  外包服务商：
                  <span>{{getSeeOneList.mechanism.outsource}}</span>
                </p>
                <p>
                  期货交易商：
                  <span>{{getSeeOneList.mechanism.futuresDealer}}</span>
                </p>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="DialogSee = false">取 消</el-button>
            <el-button type="primary" @click="DialogSee = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      num: 6, //每页显示数据条数
      page: 1, //默认第一页
      nums: 6, //每页显示数据条数
      pages: 1, //默认第一页
      tabelData: {},
      tabelList: [], //数据
      tabelPage: [],
      tabelCount: {}, //数据条数
      getRecruit: [],
      centerDialogVisible: false, // 查看招募书对话框
      UploadFile: false, // 上传文件对话框
      DialogSee: false, // 查看对话框
      uploadData: {},
      action: ajax.doms.bind(this)("/api/Management/Product/Prospectus/Upload"),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      fileList: [],
      fileList2: [],
      productId: "",
      changeSeeId: "",
      getSeeOneList: {
        product: {},
        risk: {},
        rate: {},
        investment: {},
        manager: {},
        mechanism: {}
      },
      material: "",
      materialId: "",
      getCount: "",
      centerupload: false,
      actionUpload: ajax.doms.bind(this)(
        "/api/Management/Product/Worth/Upload/Batch"
      ),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      uploadCenter: {},
      form: {
        smsNotify: "",
        emailNotify: "",
        weChatNotify: ""
      }
    };
  },
  methods: {
    //获取产品数据
    getList() {
      let data = { pageIndex: this.page, pageSize: this.num };
      ajax.authPost.bind(this)("/api/Management/Query/Product", data, res => {
        if (res.data.code == 200) {
          this.tabelData = res.data.data;
          this.tabelList = this.tabelData.list;
          this.tabelPage = this.tabelData.page;
        }
      });
    },
    // 添加产品
    Addproduct() {
      this.$router.push({ path: "/NavBar/DataDitionary/BankDataList" });
    },
    //下载净值模板
    exportExcel() {
      let url =
        "http://192.168.28.213:5000/api/Management/Product/Worth/Template/Batch";
      window.open(url, "_blank");
    },
    //上传净值
    uploadContent() {
      this.uploadCenter.smsNotify = this.form.smsNotify * 1;
      this.uploadCenter.emailNotify = this.form.emailNotify * 1;
      this.uploadCenter.weChatNotify = this.form.weChatNotify * 1;
      this.$refs.upload2.submit();
    },
    //净值上传成功的回调
    SuccessWorth(response, file, fileList) {
      //还原
      this.clearFiles2();
      this.centerupload = false;
      this.form.smsNotify = this.form.emailNotify = this.form.weChatNotify = "";
    },
    upError2(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles2();
    },
    clearFiles2() {
      this.$refs["upload2"].clearFiles();
    },
    //文件上传个数
    handleChange(file, fileList) {
      this.fileList = fileList.length > 1 ? fileList.splice(0, 1) : fileList;
    },
    //招募说明
    supplement(i, id) {
      this.centerDialogVisible = true;
      //   console.log(row.id);
      this.productId = id;
      let data = {
        productId: id,
        pageIndex: this.pages,
        pageSize: this.nums
      };
      ajax.authPost.bind(this)(
        "/api/Management/Query/Prospectus",
        data,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getRecruit = res.data.data.list;
            this.getCount = res.data.data.page;
          }
        }
      );
    },
    // 排序
    sort(i, row, o) {
      let up = o;
      let data = { id: row.id, up: up };
      ajax.authPostForm.bind(this)(
        "/api/Management/Product/Order",
        data,
        res => {
          // console.log(res);
          this.getList();
        }
      );
    },
    // 清空文件列表
    clearUploadedImage() {
      this.$refs.upload.clearFiles();
    },
    // 提交上传招募书
    SubmitUploadFile() {
      this.uploadData.productId = this.productId;
      let data = {
        productId: this.productId,
        materialId: this.materialId
      };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Prospectus/Save",
        data,
        res => {
          this.UploadFile = false;
          this.supplement(0, this.productId);
        }
      );
    },
    // 上传成功的回调
    chenggeing(response, file, fileList) {
      this.materialId = ajax.getMaterialId.bind(this)(response, () => {
        //还原
        this.clearFiles();
      });
    },
    //移除/还原文件列表
    clearFiles() {
      this.$refs["upload"].clearFiles();
    },
    //文件上传个数
    handleChange(file, fileList) {
      fileList.length > 1 ? fileList.splice(0, 1) : fileList;
    },
    upError(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles();
    },
    // 操作里面的查看详情
    changeSee(i, row) {
      // console.log(row);
      this.DialogSee = true;
      this.changeSeeId = row.id;
      this.getSeeOne();
    },
    getSeeOne() {
      this.getll("/api/Management/Product/Product/", res => {
        this.getSeeOneList.product = res;
      }); //基本信息
      this.getll("/api/Management/Product/Risk/", res => {
        this.getSeeOneList.risk = res;
        this.material = res.material.fullPath;
      }); //风险信息
      this.getll("/api/Management/Product/Rate/", res => {
        this.getSeeOneList.rate = res;
      }); //费率信息
      this.getll("/api/Management/Product/Investment/", res => {
        this.getSeeOneList.investment = res;
      }); //投资情况
      this.getll("/api/Management/Product/Manager/", res => {
        this.getSeeOneList.manager = res;
      }); //基金经理
      this.getll("/api/Management/Product/Mechanism/", res => {
        this.getSeeOneList.mechanism = res;
      }); //服务机构
    },
    getll(u, cb) {
      ajax.authGet.bind(this)(u + this.changeSeeId, res => {
        cb(res.data.data);
      });
    },
    //删除啊
    delet(i, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Remove?id=" + row.id,
        res => {
          // console.log(res);
          this.getList();
        }
      );
    },
    //操作里面的管理
    changeAdministration(i, row) {
      let data = { id: row.id };
      this.$router.push({
        path: "/NavBar/DataDitionary/BankDataList",
        query: { data }
      });
    },
    //每页显示数据量变更
    handleSizeChange: function(val) {
      // console.log(val);
      this.num = val;
      this.getList();
    },
    //页码变更
    handleCurrentChange: function(val) {
      // console.log(val);
      this.page = val;
      this.getList();
    },
    //每页显示数据量变更
    handleSizeList: function(val) {
      // console.log(val);
      this.nums = val;
      this.supplement(0, this.productId);
    },
    //页码变更
    handleCurrentPage: function(val) {
      // console.log(val);
      this.pages = val;
      this.supplement(0, this.productId);
    }
  },
  created() {
    this.getList();
  }
};
</script>
 
 <style lang="less" scoped>
.currenminput {
  .addButton {
    padding: 10px 0;
  }
  .spanColor {
    color: #409eff;
  }
  /deep/.el-row {
    padding: 20px 0;
    border-top: 5px solid;
  }
  .see_letter {
    /deep/.el-dialog__body {
      height: 450px;
      overflow: scroll;
    }
  }
}
</style>