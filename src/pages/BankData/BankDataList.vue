<template>
  <div class="data_title">
    <el-tabs type="border-card" @tab-click="netValuePage">
      <el-tab-pane label="数据编辑页面">
        <div class="AddList">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row>
              <div>基本信息</div>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="基金名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="基金类型" prop="fundType">
                    <el-select v-model="ruleForm.fundType" placeholder="请选择基金类型">
                      <el-option
                        :label="item.text"
                        :value="item.value"
                        v-for="item in Fundtype"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="管理类型" prop="manageType">
                    <el-select v-model="ruleForm.manageType" placeholder="请选择管理类型">
                      <el-option
                        :label="item.text"
                        :value="item.value"
                        v-for="item in Managementtype"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="基金状态" prop="fundStatus">
                    <el-select v-model="ruleForm.fundStatus" placeholder="请选择基金状态">
                      <el-option
                        :label="item.text"
                        :value="item.value"
                        v-for="item in Fundstatus"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="私募基金公示信息url:" prop="publicityUrl">
                    <el-input v-model="ruleForm.publicityUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="募集期起" required>
                    <el-col :span="11">
                      <el-form-item prop="raiseDateOfStart">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.raiseDateOfStart"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="封闭期起">
                    <el-col :span="11">
                      <el-form-item prop="closureDateOfStart">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.closureDateOfStart"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="开放日" prop="openDay">
                    <el-input v-model="ruleForm.openDay"></el-input>
                  </el-form-item>
                  <el-form-item label="认申购起点(单位/万)" prop="applyAmount">
                    <el-input v-model="ruleForm.applyAmount"></el-input>
                  </el-form-item>
                  <el-form-item label="募集账户名" prop="accountName">
                    <el-input v-model="ruleForm.accountName"></el-input>
                  </el-form-item>
                  <el-form-item label="募集户开户行" prop="accountBank">
                    <el-input v-model="ruleForm.accountBank"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="基金备案编号" prop="fundRecordNumber">
                    <el-input v-model="ruleForm.fundRecordNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="基金规模(单位/万)" prop="fundScale">
                    <el-input v-model="ruleForm.fundScale"></el-input>
                  </el-form-item>
                  <el-form-item label="基金存续期(单位/年)" prop="fundDuration">
                    <el-input v-model="ruleForm.fundDuration"></el-input>
                  </el-form-item>
                  <el-form-item label="私募基金管理人公示信息url" prop="adminPublicityUrl">
                    <el-input v-model="ruleForm.adminPublicityUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="收益分配方案" prop="incomeDistributionScheme">
                    <el-input v-model="ruleForm.incomeDistributionScheme"></el-input>
                  </el-form-item>
                  <el-form-item label="募集期止" required>
                    <el-col :span="11">
                      <el-form-item prop="raiseDateOfEnd">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.raiseDateOfEnd"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="封闭期止">
                    <el-col :span="11">
                      <el-form-item prop="closureDateOfEnd">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.closureDateOfEnd"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="产品成立日">
                    <el-col :span="11">
                      <el-form-item prop="fundBirth">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.fundBirth"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="追加申购起点(单位/万)" prop="appendAmount">
                    <el-input v-model="ruleForm.appendAmount"></el-input>
                  </el-form-item>
                  <el-form-item label="募集账户账号" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                  </el-form-item>
                  <el-form-item label="募集户大额支付系统行号" prop="lineNumber">
                    <el-input v-model="ruleForm.lineNumber"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div>风险信息</div>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="风险等级" prop="riskLevel">
                    <el-select v-model="ruleForm.riskLevel" placeholder="请选择活动区域">
                      <el-option
                        :label="item.text"
                        :value="item.value"
                        v-for="item in Risklevel"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="风险说明" prop="remark">
                    <el-input v-model="ruleForm.remark"></el-input>
                  </el-form-item>
                  <el-form-item label="止损线" prop="stopLossLine">
                    <el-input v-model="ruleForm.stopLossLine"></el-input>
                  </el-form-item>

                  <el-form-item label="风险等级文件" prop="RiskLD">
                    <el-input v-model="ruleForm.RiskLD"></el-input>
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :data="uploadData"
                      :action="action"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-change="handleChange"
                      :limit="1"
                      :on-success="chengeing"
                      :on-exceed="handleExceed"
                      :file-list="fileList"
                      :headers="access_token"
                      :auto-upload="false"
                    >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="预警线" prop="warningLine">
                    <el-input v-model="ruleForm.warningLine"></el-input>
                  </el-form-item>
                  <el-form-item label="风险揭示书" prop="riskDisclosure">
                    <el-input v-model="ruleForm.riskDisclosure"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div>汇率信息</div>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="申购费" prop="applyRate">
                    <el-input v-model="ruleForm.applyRate"></el-input>
                  </el-form-item>
                  <el-form-item label="管理费" prop="manageRate">
                    <el-input v-model="ruleForm.manageRate"></el-input>
                  </el-form-item>
                  <el-form-item label="外包服务费" prop="outsourcingRate">
                    <el-input v-model="ruleForm.outsourcingRate"></el-input>
                  </el-form-item>
                  <el-form-item label="业绩报酬" prop="performanceRemunerationRate">
                    <el-input v-model="ruleForm.performanceRemunerationRate"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="赎回费" prop="redeemRate">
                    <el-input v-model="ruleForm.redeemRate"></el-input>
                  </el-form-item>
                  <el-form-item label="托管费" prop="trusteeshipRate">
                    <el-input v-model="ruleForm.trusteeshipRate"></el-input>
                  </el-form-item>
                  <el-form-item label="投资顾问费" prop="investmentConsultantRate">
                    <el-input v-model="ruleForm.investmentConsultantRate"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div>投资情况</div>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="投资范围" prop="scale">
                    <el-input type="textarea" v-model="ruleForm.scale"></el-input>
                  </el-form-item>
                  <el-form-item label="投资限制概况" prop="limit">
                    <el-input v-model="ruleForm.limit"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="投资策略" prop="policy">
                    <el-input v-model="ruleForm.policy"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div>基金经理</div>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="基金经理1" prop="manager1">
                    <el-input v-model="ruleForm.manager1"></el-input>
                  </el-form-item>
                  <el-form-item label="履历1" prop="trackRecord1">
                    <el-input type="textarea" v-model="ruleForm.trackRecord1"></el-input>
                  </el-form-item>
                  <el-form-item label="基金经理3" prop="manager3">
                    <el-input v-model="ruleForm.manager3"></el-input>
                  </el-form-item>
                  <el-form-item label="履历3" prop="trackRecord3">
                    <el-input type="textarea" v-model="ruleForm.trackRecord3"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="基金经理2" prop="manager2">
                    <el-input v-model="ruleForm.manager2"></el-input>
                  </el-form-item>
                  <el-form-item label="履历2" prop="trackRecord2">
                    <el-input type="textarea" v-model="ruleForm.trackRecord2"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div>服务机构</div>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="托管机构" prop="trusteeship">
                    <el-input v-model="ruleForm.trusteeship"></el-input>
                  </el-form-item>
                  <el-form-item label="会计师事务所" prop="accountingFirm">
                    <el-input v-model="ruleForm.accountingFirm"></el-input>
                  </el-form-item>
                  <el-form-item label="投资顾问" prop="investmentConsultant">
                    <el-input v-model="ruleForm.investmentConsultant"></el-input>
                  </el-form-item>
                  <el-form-item label="证券交易商" prop="security">
                    <el-input v-model="ruleForm.security"></el-input>
                  </el-form-item>
                  <el-form-item label="监督机构信息" prop="supervisory">
                    <el-input v-model="ruleForm.supervisory"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="律师事务所" prop="lawFirm">
                    <el-input v-model="ruleForm.lawFirm"></el-input>
                  </el-form-item>
                  <el-form-item label="保管机构" prop="custodian">
                    <el-input v-model="ruleForm.custodian"></el-input>
                  </el-form-item>
                  <el-form-item label="外包服务商" prop="outsource">
                    <el-input v-model="ruleForm.outsource"></el-input>
                  </el-form-item>
                  <el-form-item label="期货交易商" prop="futuresDealer">
                    <el-input v-model="ruleForm.futuresDealer"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click.native="Submit('ruleForm')">提 交</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="edit" name="first" label="净值管理">
        <div>
          <el-button type="primary" @click="delNetWorth">删除</el-button>
          <el-button type="primary" @click="downloadContent">下载净值内容</el-button>
          <el-button type="primary" @click="exportExcel">下载模板</el-button>
          <el-button type="primary" @click="centerupload=true">上传</el-button>
          <el-button type="primary" @click="centerDialogVisible = true">添加</el-button>
          <!-- 添加 -->
          <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <el-form label-width="100px" :model="formLabelAlign">
              <el-form-item label="单位净值">
                <el-input v-model="formLabelAlign.unitWorth"></el-input>
              </el-form-item>
              <el-form-item label="累计净值">
                <el-input v-model="formLabelAlign.cumulativeWorth"></el-input>
              </el-form-item>
              <el-form-item label="净值日期">
                <el-col :span="12">
                  <el-form-item prop="dateOfWorth">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="formLabelAlign.dateOfWorth"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label="1">短信通知</el-checkbox>
                <el-checkbox :label="2">邮件通知</el-checkbox>
                <el-checkbox :label="3">微信通知</el-checkbox>
              </el-checkbox-group>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addNetWorth">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 上传 -->
          <el-dialog title="提示" :visible.sync="centerupload" width="30%" center>
            <el-form label-width="100px" :model="formLabelAlign">
              <el-form-item label="净值短信通知">
                <el-input v-model="formLabelAlign.smsNotify"></el-input>
              </el-form-item>
              <el-form-item label="净值邮件通知">
                <el-input v-model="formLabelAlign.emailNotify"></el-input>
              </el-form-item>
              <el-form-item label="净值微信通知">
                <el-input v-model="formLabelAlign.weChatNotify"></el-input>
              </el-form-item>
              <el-upload
              class="upload-demo"
              ref="upload"
              :data="uploadCenter"
              :action="actionUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="SuccessWorth"
              :on-error="errorWorth"
              :limit="1"
              :file-list="fileList"
              :headers="access_token"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传附件</el-button>
            </el-upload>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerupload = false">取 消</el-button>
              <el-button type="primary" @click="uploadContent">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 表格数据操作 -->
          <el-table :data="tabelList" stripe id="out-table" style="width: 100%" @select="Checkbox">
            <!-- 勾选框 -->
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- 索引 -->
            <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
            <el-table-column align="center" prop="fundScale" label="单位净值">
              <template slot-scope="scope">
                <span>{{scope.row.unitWorth}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="累计净值">
              <template slot-scope="scope">
                <span>{{scope.row.cumulativeWorth}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="recommendName" label="净值日期">
              <template slot-scope="scope">
                <span>{{scope.row.dateOfWorth}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="isQualified" label="操作">
              <template slot-scope="scope">
                <span class="spanColor" @click="clickEdit(scope.$index, scope.row)">编辑</span>
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
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="edit" name="second" label="报表管理">
        <el-button type="primary" @click="delNetReport">删除</el-button>
        <el-button type="primary" @click="downloadReport">下载</el-button>
        <el-button type="primary" @click="centerDialogReport=true">添加</el-button>
        <el-dialog title="提示" :visible.sync="centerDialogReport" width="30%" center>
          <el-form label-width="100px" :model="formLabelAlign">
            <el-form-item label="报告类型">
              <el-select v-model="formLabelAlign.reportType" placeholder="请选择报告类型">
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="item in categoryData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报告时间">
              <el-col :span="12">
                <el-form-item prop="dateOfWorth">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="formLabelAlign.reportDate"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="报告标题">
              <el-input v-model="formLabelAlign.title"></el-input>
            </el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              :data="uploadDataReport"
              :action="actionReport"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="chengecheng"
              :limit="1"
              :file-list="fileList"
              :headers="access_token"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传报表附件</el-button>
            </el-upload>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogReport = false">取 消</el-button>
            <el-button type="primary" @click="addReport">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 表格数据操作 -->
        <el-table
          :data="tabelPresentationList"
          stripe
          id="out-table"
          style="width: 100%"
          @select="Check"
        >
          <!-- 勾选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 索引 -->
          <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
          <el-table-column align="center" prop="fundScale" label="报告类型">
            <template slot-scope="scope">
              <span>{{scope.row.reportTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="creationTime" label="报告时间">
            <template slot-scope="scope">
              <span>{{scope.row.reportDate}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="recommendName" label="报告标题">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="recommendName" label="报告状态">
            <template slot-scope="scope">
              <span>{{scope.row.statusName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isQualified" label="操作">
            <template slot-scope="scope">
              <span class="spanColor" @click="clickPresentation(scope.$index, scope.row)">编辑</span>
              <span class="spanColor" v-if="onReport" @click="clickRelease(scope.$index, scope.row)">发布</span>
              <span v-if="onfRep">发布</span>
              <span class="spanColor" v-if="offReport" @click="clickcancel(scope.$index, scope.row)">取消发布</span>
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
            :total="tabelPresentationPage.count"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="edit" name="third" label="公告管理">
        <el-button type="primary" @click="delNetNotice">删除</el-button>
        <el-button type="primary" @click="downloadNotice">下载</el-button>
        <el-button type="primary" @click="centerDialogNotice=true">添加</el-button>
        <el-dialog title="提示" :visible.sync="centerDialogNotice" width="30%" center>
          <el-form label-width="100px" :model="formLabelAlign">
            <el-form-item label="公告标题">
              <el-input v-model="formLabelAlign.Noticetitle"></el-input>
            </el-form-item>
            <el-form-item label="公告时间">
              <el-col :span="12">
                <el-form-item prop="dateOfWorth">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="formLabelAlign.noticeDate"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="公告内容">
              <el-input v-model="formLabelAlign.content"></el-input>
            </el-form-item>
            <el-form-item label="公告类型">
              <el-select v-model="formLabelAlign.noticeTypeName" placeholder="请选择报告类型">
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="item in NoticeData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              :data="uploadDataNotice"
              :action="actionNotice"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="chengeNotice"
              :limit="1"
              :file-list="fileList"
              :headers="access_token"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传公告管理附件</el-button>
            </el-upload>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogNotice = false">取 消</el-button>
            <el-button type="primary" @click="addNotice">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 表格数据操作 -->
        <el-table
          :data="tabelNoticeList"
          stripe
          id="out-table"
          style="width: 100%"
          @select="CheckNotice"
        >
          <!-- 勾选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 索引 -->
          <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
          <el-table-column align="center" prop="fundScale" label="公告类型">
            <template slot-scope="scope">
              <span>{{scope.row.noticeTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="creationTime" label="公告时间">
            <template slot-scope="scope">
              <span>{{scope.row.noticeDate}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="recommendName" label="公告标题">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="recommendName" label="公告状态">
            <template slot-scope="scope">
              <span>{{scope.row.statusName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isQualified" label="操作">
            <template slot-scope="scope">
              <span class="spanColor" @click="clickNotice(scope.$index, scope.row)">编辑</span>
              <span class="spanColor" v-if="onRelea" @click="clickReleaseNotice(scope.$index, scope.row)">发布</span>
              <span v-if="onRelease">发布</span>
              <span class="spanColor" v-if="offRelea" @click="clickcancelNotice(scope.$index, scope.row)">取消发布</span>
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
            :total="tabelNoticePage.count"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <!-- 投资管理 -->
      <el-tab-pane v-if="edit" name="fourth" label="投资管理">
        <el-tabs type="card" v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="潜在投资人" name="first">
            <div class="first">
              <el-input
                v-model="formLabelAlign.Investment"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
              ></el-input>
              <!-- 表格数据操作 -->
              <el-table
                :data="tabelInvestment"
                stripe
                id="out-table"
                style="width: 100%"
              >
                <!-- 勾选框 -->
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- 索引 -->
                <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
                <el-table-column align="center" prop="fundScale" label="姓名/机构名">
                  <template slot-scope="scope">
                    <span class="spanColor" @click="personalData(scope.$index, scope.row)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="creationTime" label="昵称">
                  <template slot-scope="scope">
                    <span>{{scope.row.nickName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="手机号">
                  <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="证件类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.certificateTypeName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="证件号码">
                  <template slot-scope="scope">
                    <span>{{scope.row.certificateNo}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="角色">
                  <template slot-scope="scope">
                    <span>{{scope.row.customerTypeName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="isQualified" label="操作">
                  <template slot-scope="scope">
                    <span class="spanColor" @click="clickInvestment(scope.$index, scope.row)">选为投资人</span>
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
                  :total="tabelInvestmentPage.count"
                ></el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="投资人" name="second">
               <div class="first">
              <el-input
                v-model="formLabelAlign.potential"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
              ></el-input>
              <!-- 表格数据操作 -->
              <el-table
                :data="tabelPotentialList"
                stripe
                id="out-table"
                style="width: 100%"
              >
                <!-- 勾选框 -->
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- 索引 -->
                <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
                <el-table-column align="center" prop="fundScale" label="姓名/机构名">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="creationTime" label="昵称">
                  <template slot-scope="scope">
                    <span>{{scope.row.nickName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="手机号">
                  <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="证件类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.certificateTypeName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="证件号码">
                  <template slot-scope="scope">
                    <span>{{scope.row.certificateNo}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="角色">
                  <template slot-scope="scope">
                    <span>{{scope.row.customerTypeName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="isQualified" label="操作">
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
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane v-if="edit" name="marketing" label="营销管理">营销管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import ajax from "../../api/https.js";
export default {
  data() {
    return {
        uploadCenter:{},
        actionUpload: ajax.doms.bind(this)("/api/Management/Product/Worth/Upload"),
        categoryData:[],//报告类型下拉框
        NoticeData:[],//公告类型下拉框
        tabelPotentialList:[],//投资人数据集表
        tabelPotentialListPage:'',//数据条数
        activeName:'first',//潜在投资人框
      tabelInvestmentPage: "", //数据条数
      tabelInvestment: [], //潜在投资管理数据
      noticeEvent: {},
      uploadDataNotice: {},
      actionNotice: ajax.doms.bind(this)("/api/Management/Product/Notice/Save"),
      tabelList: [], //净值管理页面数据
      tabelPage: "", //数据条数
      page: 1,
      num: 8,
      edit: false, //管理页面
      centerDialogVisible: false,
      centerDialogReport: false,
      centerDialogNotice: false,
      centerupload:false,
      formLabelAlign: {
          smsNotify:'',
          emailNotify:'',
          weChatNotify:'',
        unitWorth: "",
        cumulativeWorth: "",
        dateOfWorth: "",
        reportType: "",
        reportDate: "",
        title: "",
        Noticetitle: "",
        noticeDate: "",
        content: "",
        noticeTypeName: "",
        Investment: "",//潜在投资人输入框
        potential:'',//投资人输入框
      },
      tabelPresentationList: [], //报告管理数据
      tabelPresentationPage: "", //数据条数
      checkList: [],
      uploadData: {},
      uploadDataReport: {},
      action: ajax.doms.bind(this)("/api/Management/Product/Save"),
      actionReport: ajax.doms.bind(this)("/api/Management/Product/Report/Save"),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      tabelNoticeData: [], //报告管理数
      tabelNoticeList: [], //报告管理数据
      tabelNoticePage: "", //数据条数
      fileList: [],
      ruleForm: {
        name: "", //基金名称
        fundType: "", //基金类型
        manageType: "", //管理类型
        fundStatus: "", //基金状态
        publicityUrl: "", //私募基金公示信息url
        raiseDateOfStart: "", //募集期起
        closureDateOfStart: "", //封闭期起
        openDay: "", //开放日
        applyAmount: "", //认申购起点
        accountName: "", //募集户账户名
        accountBank: "", //募集户开户行

        fundRecordNumber: "", //基金备案编号
        fundScale: "", //基金规模
        fundDuration: "", //基金存续期
        adminPublicityUrl: "", //私募基金管理人公示信息
        incomeDistributionScheme: "", //收益分配方案
        raiseDateOfEnd: "", //募集期止
        closureDateOfEnd: "", //封闭期止
        fundBirth: "", //产品成立日
        appendAmount: "", //追加申购起点
        account: "", //募集户账户号
        lineNumber: "", //募集大额支付系统行号

        riskLevel: "", //风险等级
        remark: "", //风险说明
        stopLossLine: "", //止损线
        RiskLD: "", //风险等级文件

        warningLine: "", //预警线
        riskDisclosure: "", //风险揭示书

        applyRate: "", //申购费
        manageRate: "", //管理费
        outsourcingRate: "", //外包服务费
        performanceRemunerationRate: "", //业绩报酬

        redeemRate: "", //赎回费
        trusteeshipRate: "", //托管费
        investmentConsultantRate: "", //投资顾问费

        scale: "", //投资范围
        limit: "", //投资限制概况

        policy: "", //投资策略

        manager1: "", //基金经理1
        trackRecord1: "", //履历1
        manager3: "", //基金经理3
        trackRecord3: "", //履历3

        manager2: "", //基金经理2
        trackRecord2: "", //履历2

        trusteeship: "", //托管机构
        accountingFirm: "", //会计师事务所
        investmentConsultant: "", //投资顾问
        security: "", //证券交易商
        supervisory: "", //监督机构信息

        lawFirm: "", //律师事务所
        custodian: "", //保管机构
        outsource: "", //外包服务商
        futuresDealer: "" //期货交易商
      },
      queryId: "",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        fundType: [
          { required: true, message: "请选择基金类型", trigger: "change" }
        ],
        manageType: [
          { required: true, message: "请选择管理类型", trigger: "change" }
        ],
        fundStatus: [
          { required: true, message: "请选择基金状态", trigger: "change" }
        ],
        raiseDateOfStart: [
          {
            // 注释掉type和trigger，是为了解决格式化时间日期的时候出现的bug
            // type: "date",
            required: true,
            message: "请选择日期"
            // trigger: "change"
          }
        ],
        fundRecordNumber: [
          { required: true, message: "请输入基金备案编号", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        raiseDateOfEnd: [
          {
            // 注释掉type和trigger，是为了解决格式化时间日期的时候出现的bug
            // type: "date",
            required: true,
            message: "请选择日期"
            // trigger: "change"
          }
        ],
        riskLevel: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        RiskLD: [{ required: true, message: "请上传文件", trigger: "blur" }],
        applyRate: [
          { required: true, message: "请输入申购费", trigger: "blur" }
        ],
        manageRate: [
          { required: true, message: "请输入管理费", trigger: "blur" }
        ],
        outsourcingRate: [
          { required: true, message: "请输入外包服务费", trigger: "blur" }
        ],
        redeemRate: [
          { required: true, message: "请输入赎回费", trigger: "blur" }
        ],
        trusteeshipRate: [
          { required: true, message: "请输入托管费", trigger: "blur" }
        ],
        scale: [{ required: true, message: "请输入托管费", trigger: "blur" }],
        limit: [{ required: true, message: "请输入托管费", trigger: "blur" }],
        policy: [{ required: true, message: "请输入托管费", trigger: "blur" }]
      },
      liste: [],
      Fundtype: [],
      Managementtype: [],
      Fundstatus: [],
      Risklevel: [],
      product: [],
      queryId: "",
      netWorthId: [], //勾选后获得的ID
      NoticeId: [], //公告勾选后获得的ID
      onRelease:false,//公告灰发布
      onRelea:true,//公告发布
      offRelea:false,//公告取消发布
      onReport:true,//报告发布
      onfRep:false,//报告灰发布
      offReport:false,//报告取消发布
    };
  },
  methods: {
    //文件上传个数
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      for (var item of fileList) {
        this.ruleForm.RiskLD = item.name;
      }
      //   console.log(this.ruleForm.RiskLD);
    },
    //文件上传个数的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件喔！`);
    },
    //移除文件钩子
    handleRemove(file, fileList) {
      this.ruleForm.RiskLD = "";
      console.log(file, fileList);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
    // 提交
    Submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadData.productId = this.queryId;
          this.uploadData["product.name"] = this.ruleForm.name;
          this.uploadData[
            "product.fundRecordNumber"
          ] = this.ruleForm.fundRecordNumber;
          this.uploadData["product.fundType"] = this.ruleForm.fundType;
          this.uploadData["product.manageType"] = this.ruleForm.manageType;
          this.uploadData["product.fundStatus"] = this.ruleForm.fundStatus;
          this.uploadData["product.fundScale"] = this.ruleForm.fundScale;
          this.uploadData["product.fundDuration"] = this.ruleForm.fundDuration;
          this.uploadData[
            "product.incomeDistributionScheme"
          ] = this.ruleForm.incomeDistributionScheme;
          this.uploadData[
            "product.raiseDateOfStart"
          ] = this.ruleForm.raiseDateOfStart;
          this.uploadData[
            "product.raiseDateOfEnd"
          ] = this.ruleForm.raiseDateOfEnd;
          this.uploadData[
            "product.closureDateOfStart"
          ] = this.ruleForm.closureDateOfStart;

          this.uploadData[
            "product.closureDateOfEnd"
          ] = this.ruleForm.closureDateOfEnd;
          this.uploadData["product.fundBirth"] = this.ruleForm.fundBirth;
          this.uploadData["product.openDay"] = this.ruleForm.openDay;
          this.uploadData["product.applyAmount"] = this.ruleForm.applyAmount;
          this.uploadData["product.appendAmount"] = this.ruleForm.appendAmount;
          this.uploadData["product.accountName"] = this.ruleForm.accountName;
          this.uploadData["product.account"] = this.ruleForm.account;
          this.uploadData["product.accountBank"] = this.ruleForm.accountBank;
          this.uploadData["product.lineNumber"] = this.ruleForm.lineNumber;
          this.uploadData[
            "product.adminPublicityUrl"
          ] = this.ruleForm.adminPublicityUrl;
          this.uploadData["product.publicityUrl"] = this.ruleForm.publicityUrl;

          this.uploadData["risk.riskLevel"] = this.ruleForm.riskLevel;
          this.uploadData["risk.remark"] = this.ruleForm.remark;
          this.uploadData["risk.warningLine"] = this.ruleForm.warningLine;
          this.uploadData["risk.stopLossLine"] = this.ruleForm.stopLossLine;
          this.uploadData["risk.riskDisclosure"] = this.ruleForm.riskDisclosure;

          this.uploadData["rate.applyRate"] = this.ruleForm.applyRate;
          this.uploadData["rate.redeemRate"] = this.ruleForm.redeemRate;
          this.uploadData["rate.manageRate"] = this.ruleForm.manageRate;
          this.uploadData[
            "rate.trusteeshipRate"
          ] = this.ruleForm.trusteeshipRate;
          this.uploadData[
            "rate.outsourcingRate"
          ] = this.ruleForm.outsourcingRate;
          this.uploadData[
            "rate.investmentConsultantRate"
          ] = this.ruleForm.investmentConsultantRate;
          this.uploadData[
            "rate.performanceRemunerationRate"
          ] = this.ruleForm.performanceRemunerationRate;

          this.uploadData["investment.scale"] = this.ruleForm.scale;
          this.uploadData["investment.policy"] = this.ruleForm.policy;
          this.uploadData["investment.limit"] = this.ruleForm.limit;

          this.uploadData["manager.manager1"] = this.ruleForm.manager1;
          this.uploadData["manager.trackRecord1"] = this.ruleForm.trackRecord1;
          this.uploadData["manager.manager2"] = this.ruleForm.manager2;
          this.uploadData["manager.trackRecord2"] = this.ruleForm.trackRecord2;
          this.uploadData["manager.manager3"] = this.ruleForm.manager3;
          this.uploadData["manager.trackRecord3"] = this.ruleForm.trackRecord3;

          this.uploadData["mechanism.trusteeship"] = this.ruleForm.trusteeship;
          this.uploadData["mechanism.lawFirm"] = this.ruleForm.lawFirm;
          this.uploadData[
            "mechanism.accountingFirm"
          ] = this.ruleForm.accountingFirm;
          this.uploadData["mechanism.custodian"] = this.ruleForm.custodian;
          this.uploadData[
            "mechanism.investmentConsultant"
          ] = this.ruleForm.investmentConsultant;
          this.uploadData["mechanism.outsource"] = this.ruleForm.outsource;
          this.uploadData["mechanism.security"] = this.ruleForm.security;
          this.uploadData[
            "mechanism.futuresDealer"
          ] = this.ruleForm.futuresDealer;
          this.uploadData["mechanism.supervisory"] = this.ruleForm.supervisory;
          //提交核心代码
          this.$refs.upload.submit();
          //提交文件后
        } else {
          return false;
        }
      });
    },
    chengeing(response, file, fileList) {
      this.$router.push({ path: "/NavBar/DataDitionary/BankData" });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    get(u, data) {
      ajax.authGet.bind(this)(u, data);
    },
    getFundtype() {
      //基金类型
      this.get("/api/Common/12", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.Fundtype = res.data.data;
        }
      });
      //管理类型
      this.get("/api/Common/13", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.Managementtype = res.data.data;
        }
      });
      this.get("/api/Common/14", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.Fundstatus = res.data.data;
        }
      });
      this.get("/api/Common/15", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.Risklevel = res.data.data;
        }
      });
    },
    //上个页面传过来的id
    adds() {
      this.queryId = this.$route.query.data || 0;
      //   console.log(this.queryId);
      if (this.queryId == 0) {
        this.edit = false;
      } else {
        this.edit = true;
      }
    },
    //六个分类下的数据
    getSeeOne() {
      var func = res => {
        console.log(res);
        if (res.data.code == 200) {
          for (var i in res.data.data) {
            let value = res.data.data[i];
            this.ruleForm[i] =
              value === undefined || value === null ? "" : value;
          }
        }
      };
      this.getll("/api/Management/Product/Product/", func); //基本信息
      this.getll("/api/Management/Product/Risk/", func); //风险信息
      this.getll("/api/Management/Product/Rate/", func); //费率信息
      this.getll("/api/Management/Product/Investment/", func); //投资情况
      this.getll("/api/Management/Product/Manager/", func); //基金经理
      this.getll("/api/Management/Product/Mechanism/", func); //服务机构
    },
    getll(u, res) {
      ajax.authGet.bind(this)(u + this.queryId, res);
    },
    //获取净值数据
    getNetWorth() {
      let pages = { pageIndex: this.page, pageSize: this.num };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Worth/" + this.queryId,
        pages,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.tabelList = res.data.data.list;
            this.tabelPage = res.data.data.page;
          }
        }
      );
    },
    //   smsNotify:?1:0,
    //   emailNotify:,
    //   weChatNotify:,
    // 添加净值
    addNetWorth() {
      let data = {
        productId: this.queryId,
        unitWorth: this.formLabelAlign.unitWorth,
        cumulativeWorth: this.formLabelAlign.cumulativeWorth,
        dateOfWorth: this.formLabelAlign.dateOfWorth
      };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Worth/Save",
        data,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getNetWorth();
            this.formLabelAlign.unitWorth = this.formLabelAlign.cumulativeWorth = this.formLabelAlign.dateOfWorth =
              "";
            this.centerDialogVisible = false;
          } else if (res.data.code == 400) {
            this.$message(res.data.message);
          }
        }
      );
    },
    //删除
    delNetWorth() {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Worth/Remove",
        this.netWorthId,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getNetWorth();
          }
        }
      );
    },
    //净值获取勾选的id
    Checkbox(selection, row) {
      // console.log(selection)
      this.netWorthId.splice(0);
      for (var item of selection) {
        this.netWorthId.push(item.id);
      }
      // console.log(this.netWorthId)
    },
    //报表获取勾选的id
    Check(selection, row) {
      this.netWorthId.splice(0);
      for (var item of selection) {
        this.netWorthId.push(item.id);
      }
    },
    CheckNotice(selection, row) {
      this.NoticeId.splice(0);
      for (var item of selection) {
        this.NoticeId.push(item.id);
      }
    },
    //点击标题后的回调
    netValuePage(tab, event) {
      this.getNetWorth();
      this.getPresentation();
      this.getNotice(); //公告数据
      this.getInvestment();
    },
    //投资管理点击标题后的回调
    handleClick(tab, event) {
        this.getInvestment(); //潜在投资者管理数据
    this.getpotential();//投资者管理数据
    },
    //下载净值模板
    exportExcel() {
         let url = 'http://192.168.28.213:5000/api/Management/Product/Worth/Template?productId='+this.queryId
         window.open(url, '_blank');
    },
    //下载净值模板内容
    downloadContent(){
         var a,b;
        a = new Array(this.netWorthId);
        b = a.join(',')
        console.log(b)
        let url = 'http://192.168.28.213:5000/api/Management/Product/Worth/Download?ids='+b
         window.open(url, '_blank');
    },
    // 上传净值
    uploadContent(){
        this.uploadCenter.productId=this.queryId
        this.uploadCenter.smsNotify=this.formLabelAlign.smsNotify;
        this.uploadCenter.emailNotify=this.formLabelAlign.emailNotify;
        this.uploadCenter.weChatNotify=this.formLabelAlign.weChatNotify;
        this.$refs.upload.submit();
    },
    // 净值管理页面的编辑按钮
    clickEdit(i, row) {
      this.centerDialogVisible = !this.centerDialogVisible;
      let data = {
        worthId: row.id
      };
      ajax.authGet.bind(this)("/api/Management/Product/Worth", data, res => {
        console.log(res);
        if (res.data.code == 200) {
          this.formLabelAlign.unitWorth = res.data.data.unitWorth;
          this.formLabelAlign.cumulativeWorth = res.data.data.cumulativeWorth;
          this.formLabelAlign.dateOfWorth = res.data.data.dateOfWorth;
        }
      });
    },
    // 报告管理数据
    getPresentation() {
      let pages = { pageIndex: this.page, pageSize: this.num };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Report/" + this.queryId,
        pages,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.tabelPresentationList = res.data.data.list;
            this.tabelPresentationPage = res.data.data.page;
          }
        }
      );
    },
    //报告类型下拉框
    getcategoryData(){
        ajax.authGet.bind(this)('/api/Common/17',res=>{
            if(res.data.code==200){
                this.categoryData=res.data.data
            }
        })
    },
    //公告管理数据
    getNotice() {
      let pages = { pageIndex: this.page, pageSize: this.num };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Notice/" + this.queryId,
        pages,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.tabelNoticeData = res.data.data;
            this.tabelNoticeList = this.tabelNoticeData.list;
            this.tabelNoticePage = this.tabelNoticeData.page;
          }
        }
      );
    },
    //公告类型下拉框
    getNoticeData(){
        ajax.authGet.bind(this)('/api/Common/16',res=>{
            if(res.data.code==200){
                this.NoticeData=res.data.data
            }
        })
    },
    //潜在投资者管理数据
    getInvestment() {
        this.getpot('/api/Management/Query/Potential',res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tabelInvestment = res.data.data.list;
          this.tabelInvestmentPage = res.data.data.page;
        }
      })
    },
    //投资者管理数据
    getpotential(){
         this.getpot('/api/Management/Query/InvestorAsset',res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tabelPotentialList = res.data.data.list;
          this.tabelPotentialListPage = res.data.data.page;
        }
      })
    },
    
    //封装潜在投资人跟投资人的方法
    getpot(url,r){
        let data = {
        productId: this.queryId,
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(url, data, r);
    },
    clickInvestment(i, row) {
        
    },
    //报告编辑报表
    clickPresentation(i, row) {
      this.centerDialogReport = !this.centerDialogReport;
      let data = {
        reportId: row.id
      };
      ajax.authGet.bind(this)("/api/Management/Product/Report", data, res => {
        console.log(res);
        if (res.data.code == 200) {
          this.formLabelAlign.reportType = res.data.data.reportTypeName;
          this.formLabelAlign.title = res.data.data.title;
          this.formLabelAlign.reportDate = res.data.data.reportDate;
        }
      });
    },
    //报表发布
    clickRelease(i,row) {
        ajax.authPostForm.bind(this)('/api/Management/Product/Report/Publish',{id:row.id},res=>{
            console.log(res);
            if(res.data.code==200){
                this.onReport=false;
                this.onfRep=true;
                this.offReport=true;
            }
        })
    },
    //取消报表发布
    clickcancel(i,row) {
        ajax.authPostForm.bind(this)('/api/Management/Product/Report/Private',{id:row.id},res=>{
            console.log(res);
            if(res.data.code==200){
                this.offReport=false;
                this.onReport=true;
                this.onfRep=false;
            }
        })
    },
    //公告编辑
    clickNotice(i, row) {
      this.centerDialogNotice = !this.centerDialogNotice;
      // console.log(row)
      let data = {
        noticeId: row.id
      };
      ajax.authGet.bind(this)("/api/Management/Product/Notice", data, res => {
        console.log(res);
        if (res.data.code == 200) {
          this.noticeEvent = res.data.data;
          this.formLabelAlign.Noticetitle = this.noticeEvent.title;
          this.formLabelAlign.noticeDate = this.noticeEvent.noticeDate;
          this.formLabelAlign.content = this.noticeEvent.content;
          this.formLabelAlign.noticeTypeName = this.noticeEvent.noticeTypeName;

        }
      });
    },
    //公告发布
    clickReleaseNotice(i,row) {
        ajax.authPostForm.bind(this)('/api/Management/Product/Notice/Publish',{id:row.id},res=>{
            console.log(res)
            if(res.data.code==200){
                this.onRelea=false;
                this.onRelease=true;
                this.offRelea=true;
            }
        })
    },
    //取消公告发布
    clickcancelNotice(i,row) {
        ajax.authPostForm.bind(this)('/api/Management/Product/Notice/Private',{id:row.id},res=>{
            console.log(res);
             if(res.data.code==200){
                this.offRelea=false;
                this.onRelea=true;
                this.onRelease=false;
            }
        })
    },
    //报表添加
    addReport() {
      this.uploadDataReport.productId = this.queryId;
      this.uploadDataReport.reportType = this.formLabelAlign.reportType;
      this.uploadDataReport.title = this.formLabelAlign.title;
      this.uploadDataReport.reportDate = this.formLabelAlign.reportDate;
      this.$refs.upload.submit();
    },
    //删除投资人
    delInvestor(){},
    //持仓管理
    holdPositions(){},
    //适当性回访
    returnVisit(){},
    // 清空文件列表
    clearUploadedImage() {
      this.$refs.upload.clearFiles();
    },
    //报表文件上传成功回调
    chengecheng(response, file, fileList) {
      this.centerDialogReport = false;
      this.getPresentation();
      this.formLabelAlign.reportType = this.formLabelAlign.title = this.formLabelAlign.reportDate =
        "";
      this.clearUploadedImage();
    },
    //净值上传成功的回调
    SuccessWorth(response, file, fileList){
        this.centerupload=false;
        this.clearUploadedImage();
        this.formLabelAlign.smsNotify=this.formLabelAlign.emailNotify=this.formLabelAlign.weChatNotify=''

    },
    //文件上传失败的回调
    errorWorth(err, file, fileList){
        this.$message('上传出错')
    },
    //公告添加
    addNotice() {
      this.uploadDataNotice.productId = this.queryId;
      this.uploadDataNotice.title = this.formLabelAlign.Noticetitle;
      this.uploadDataNotice.noticeType = this.formLabelAlign.noticeTypeName;
      this.uploadDataNotice.content = this.formLabelAlign.content;
      this.uploadDataNotice.noticeDate = this.formLabelAlign.noticeDate;
      this.$refs.upload.submit();
    },
    //公告文件上传成功的回调
    chengeNotice(response, file, fileList) {
      this.getNotice();
      this.centerDialogNotice = false;
      this.formLabelAlign.Noticetitle = this.formLabelAlign.noticeTypeName = this.formLabelAlign.content = this.formLabelAlign.noticeDate =
        "";
      this.clearUploadedImage();
    },
    //报表删除
    delNetReport() {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Report/Remove",
        this.netWorthId,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getPresentation();
          }
        }
      );
    },
    //报表下载
    downloadReport() {
        var a,b;
        a = new Array(this.netWorthId);
        b = a.join(',')
        console.log(b)
        let url = 'http://192.168.28.213:5000/api/Management/Product/Report/Download?ids='+b
         window.open(url, '_blank');
    },
    //公告删除
    delNetNotice() {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Notice/Remove",
        this.NoticeId,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getNotice();
          }
        }
      );
    },
    //公告下载
    downloadNotice() {
        var a,b;
        a = new Array(this.NoticeId);
        b = a.join(',')
        console.log(b)
        let url = 'http://192.168.28.213:5000/api/Management/Product/Notice/Download?ids='+b
         window.open(url, '_blank');
    },
    //点击姓名进入个人资料页面
    personalData(i,row){
        let data = row.userId
        this.$router.push({path:'/NavBar/CParameter/personalData',query:{data}})
    },
    //每页显示数据量变更
    handleSizeChange: function(val) {
      this.num = val;
      this.getNetWorth();
    },
    //页码变更
    handleCurrentChange: function(val) {
      this.page = val;
      this.getNetWorth();
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
    this.getFundtype();
    this.adds();
    this.getSeeOne();
    this.getNetWorth();
    this.getPresentation(); //报告数据
    this.getNoticeData();//公告类型下拉数据
    this.getcategoryData();//报告类型下拉数据
    this.getNotice(); //公告数据
    this.getInvestment(); //潜在投资者管理数据
    this.getpotential();//投资者管理数据
  }
};
</script>

<style lang="less" >
.data_title {
  .AddList {
    max-height: 576px;
    overflow: scroll;
    background: #fff;
    /deep/.el-row {
      // 不同分类线
      padding-top: 20px;
      border-top: 3px solid;
    }
    /deep/.el-input {
      //输入框
      width: 60%;
    }
    /deep/.el-textarea {
      width: 60%;
    }
    /deep/.el-form-item__label {
      //输入框前面的文字
      width: 185px !important;
    }
    /deep/.el-input__icon {
      //选择框图标
      height: 75%;
    }
    /deep/.el-form-item__error {
      //输入框提示
      top: 70%;
      left: 85px;
    }
    /deep/.el-upload-list--text {
      position: absolute;
      bottom: 60px;
      left: 85px;
    }
  }
  /deep/.el-input__icon {
    //选择框图标
    height: 75%;
  }
  .spanColor {
    color: #409eff;
  }
  .first {
    /deep/.el-input {
      width: 25%;
    }
  }
}
</style>