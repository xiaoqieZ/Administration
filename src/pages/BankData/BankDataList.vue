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
                    <el-input :autofocus="true" v-model="ruleForm.RiskLD"></el-input>
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
          <el-button type="primary">下载净值内容</el-button>
          <el-button type="primary" @click="exportExcel">下载模板</el-button>
          <el-button type="primary">上传</el-button>
          <el-button type="primary" @click="centerDialogVisible = true">添加</el-button>
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
                        v-for="item in Managementtype"
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
          <el-table :data="tabelPresentationList" stripe id="out-table" style="width: 100%" @select="Check">
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
                <span class="spanColor" @click="clickRelease(scope.$index, scope.row)">发布</span>
                <span class="spanColor" @click="clickcancel(scope.$index, scope.row)">取消发布</span>
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
                        v-for="item in Managementtype"
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
          <el-table :data="tabelNoticeList" stripe id="out-table" style="width: 100%" @select="CheckNotice">
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
                <span class="spanColor" @click="clickReleaseNotice(scope.$index, scope.row)">发布</span>
                <span class="spanColor" @click="clickcancelNotice(scope.$index, scope.row)">取消发布</span>
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
      <el-tab-pane v-if="edit" name="fourth" label="投资管理">投资管理</el-tab-pane>
      <el-tab-pane v-if="edit"  name="marketing" label="营销管理">营销管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import ajax from "../../api/https.js";
export default {
  data() {
    return {
        uploadDataNotice:{},
        actionNotice:ajax.doms.bind(this)("/api/Management/Product/Notice/Save"),
      tabelData: [], //净值管理页面数据
      tabelList: [], //净值管理页面数据
      tabelPage: "", //数据条数
      page: 1,
      num: 8,
      edit: false, //管理页面
      centerDialogVisible: false,
      centerDialogReport:false,
      centerDialogNotice:false,
      formLabelAlign: {
        unitWorth: "",
        cumulativeWorth: "",
        dateOfWorth: "",
        reportType:'',
        reportDate:'',
        title:'',
        Noticetitle:'',
        noticeDate:'',
        content:'',
        noticeTypeName:'',
      },
      tabelPresentation:[],//报告管理数据
      tabelPresentationList:[],//报告管理数据
      tabelPresentationPage: "", //数据条数
      checkList: [],
      uploadData: {},
      uploadDataReport:{},
      action: ajax.doms.bind(this)("/api/Management/Product/Save"),
      actionReport:ajax.doms.bind(this)("/api/Management/Product/Report/Save"),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      tabelNoticeData:[],//报告管理数
      tabelNoticeList:[],//报告管理数据
      tabelNoticePage:'',//数据条数
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
      NoticeId:[],//公告勾选后获得的ID
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
            this.tabelData = res.data.data;
            this.tabelList = this.tabelData.list;
            this.tabelPage = this.tabelData.page;
          }
        }
      );
    },
//         smsNotify:?1:0,
//         emailNotify:,
//         weChatNotify:,
    // 添加净值
    addNetWorth() {
      let data = {
        productId: this.queryId,
        unitWorth: this.formLabelAlign.unitWorth,
        cumulativeWorth: this.formLabelAlign.cumulativeWorth,
        dateOfWorth: this.formLabelAlign.dateOfWorth,
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
    Check(selection, row){
        this.netWorthId.splice(0);
      for (var item of selection) {
        this.netWorthId.push(item.id);
      } 
    },
    CheckNotice(selection, row){
         this.netWorthId.splice(0);
        for (var item of selection) {
        this.NoticeId.push(item.id);
      } 
    },
    //点击标题后的回调
    netValuePage(tab, event){
        this.getNetWorth();
        this.getPresentation();
        this.getNotice();//公告数据
    },
    //定义导出Excel表格事件
    exportExcel() {

    },
    // 净值管理页面的编辑按钮
    clickEdit() {
      console.log("编辑");
    },
    // 报表管理数据
    getPresentation(){
        let pages = { pageIndex: this.page, pageSize: this.num };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Report/" + this.queryId,
        pages,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.tabelPresentation = res.data.data;
            this.tabelPresentationList = this.tabelPresentation.list;
            this.tabelPresentationPage = this.tabelPresentation.page;
          }
        }
      );
    },
    //报告管理数据
    getNotice(){
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
    //报告编辑报表
    clickPresentation(i,row){
        let data = {
            id:row.id,
            productId:this.queryId,
            reportType:row.reportType,
            title:row.title,
            reportDate:row.reportDate,
        }
        ajax.authPost.bind(this)('/api/Management/Product/Report/Save',data,res=>{
            console.log(res)
        })
    },
    //发布
    clickRelease(){

    },
    //取消发布
    clickcancel(){

    },
    //公告编辑报表
    clickNotice(i,row){
        // console.log(row)
        let data = {
            id:row.id,
            productId:this.queryId,
            title:row.Noticetitle,
            noticeType:row.noticeTypeName,
            content:row.content,
            noticeDate:row.noticeDate,
        }
        ajax.authPost.bind(this)('/api/Management/Product/Notice/Save',data,res=>{
            console.log(res)
        })
    },
    //发布
    clickReleaseNotice(){

    },
    //取消发布
    clickcancelNotice(){

    },
    //报表添加
    addReport(){
      this.centerDialogReport = false;
      this.uploadDataReport.queryId = this.queryId;
      this.uploadDataReport.reportType=this.formLabelAlign.reportType;
      this.uploadDataReport.title=this.formLabelAlign.title;
      this.uploadDataReport.reportDate=this.formLabelAlign.reportDate;
      this.$refs.upload.submit();
    },
    //报表文件上传成功回调
    chengecheng(response, file, fileList){
        this.getPresentation();
    },
    //公告添加
    addNotice(){
        this.centerDialogNotice = false;
      this.uploadDataNotice.queryId = this.queryId;
      this.uploadDataNotice.title=this.formLabelAlign.Noticetitle;
      this.uploadDataNotice.noticeType=this.formLabelAlign.noticeTypeName;
      this.uploadDataNotice.content=this.formLabelAlign.content;
      this.uploadDataNotice.noticeDate=this.formLabelAlign.noticeDate;
      this.$refs.upload.submit();
    },
    //公告文件上传成功的回调
    chengeNotice(response, file, fileList){
        this.getNotice();
    },
    //报表删除
    delNetReport(){
        ajax.authPost.bind(this)('/api/Management/Product/Report/Remove',this.netWorthId,res=>{
            console.log(res)
            if(res.data.code==200){
                this.getPresentation();
            }
        })
    },
    //下载
    downloadReport(){

    },
    //公告删除
    delNetNotice(){
        ajax.authPost.bind(this)('/api/Management/Product/Notice/Remove',this.NoticeId,res=>{
            console.log(res)
            if(res.data.code==200){
                this.getNotice();
            }
        })
    },
    //下载
    downloadNotice(){

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
    this.getPresentation();//报表
    this.getNotice();//公告数据
  }
};
</script>

<style lang="less" >
.data_title{
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
/deep/.el-input__icon{
     //选择框图标
    height: 75%; 
  }
  .spanColor {
    color: #409eff;
  }
}
</style>