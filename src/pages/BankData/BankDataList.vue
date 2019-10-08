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
                  <el-form-item label="风险等级文件（必传）" prop="RiskLD">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :action="action"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="chengeing"
                      :file-list="fileList"
                      :headers="access_token"
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
              <el-checkbox-group v-model="ruleForm.resourceShort" @change="listget">
                <el-checkbox :label="1">短信通知</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="ruleForm.resourcEmail" @change="listge">
                <el-checkbox :label="1">邮件通知</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="ruleForm.resourceWeChat" @change="listg">
                <el-checkbox :label="1">微信通知</el-checkbox>
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
                :on-success="SuccessWorth"
                :on-error="errorWorth"
                :auto-upload="false"
                :file-list="fileList"
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
        <el-button type="primary" @click="clickAddReport">添加</el-button>
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
              :action="actionReport"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="chengecheng"
              :file-list="fileList"
              :headers="access_token"
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
              <span
                class="spanColor"
                v-if="scope.row.status==1"
                @click="clickRelease(scope.$index, scope.row)"
              >发布</span>
              <span v-if="scope.row.status!=1">发布</span>
              <span
                class="spanColor"
                v-if="scope.row.status!=1"
                @click="clickcancel(scope.$index, scope.row)"
              >取消发布</span>
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
        <el-button type="primary" @click="addfile">添加</el-button>
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
              :action="actionNotice"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="chengeNotice"
              :file-list="fileList"
              :headers="access_token"
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
              <span
                class="spanColor"
                v-if="scope.row.status==1"
                @click="clickReleaseNotice(scope.$index, scope.row)"
              >发布</span>
              <span v-if="scope.row.status!=1">发布</span>
              <span
                class="spanColor"
                v-if="scope.row.status!=1"
                @click="clickcancelNotice(scope.$index, scope.row)"
              >取消发布</span>
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
      <el-tab-pane v-if="edit" name="fourth" label="投资管理">
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="潜在投资人" name="first">
            <div class="first">
              <el-input
                v-model="formLabelAlign.Investment"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
              ></el-input>
              <!-- 表格数据操作 -->
              <el-table :data="tabelInvestment" stripe id="out-table" style="width: 100%">
                <!-- 勾选框 -->
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- 索引 -->
                <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
                <el-table-column align="center" prop="fundScale" label="姓名/机构名">
                  <template slot-scope="scope">
                    <span
                      class="spanColor"
                      @click="personalData(scope.$index, scope.row)"
                    >{{scope.row.name}}</span>
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
              <el-table :data="tabelPotentialList" stripe id="out-table" style="width: 100%">
                <!-- 勾选框 -->
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- 索引 -->
                <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
                <el-table-column align="center" prop="fundScale" label="姓名/机构名">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="creationTime" label="证件类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.certificateTypeName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="持仓数量">
                  <template slot-scope="scope">
                    <span>{{scope.row.portionAmount}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="recommendName" label="资产总计">
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
                    <span class="spanColor" @click="clickreturnVisit(scope.$index, scope.row)">适当性回访</span>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 添加 -->
              <el-dialog title="提示" :visible.sync="returnVisit" width="30%" center>
                <el-form label-width="50px" :model="formLabelAlign">
                  <div class="returnVisit">
                    <el-form-item label="操作">
                      <el-select
                        v-model="formLabelAlign.unitWorth"
                        placeholder="请选择"
                        @change="selectOne($event)"
                      >
                        <el-option
                          :label="item.text"
                          :value="item.value"
                          v-for="item in this.returnVisitList"
                          :key="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="returnVisit = false">取 消</el-button>
                  <el-button type="primary" @click="submitReturnVisit">确 定</el-button>
                </span>
              </el-dialog>
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
      <el-tab-pane v-if="edit" name="marketing" label="营销管理">
        <div class="Marketing_WholeList" v-if="MarketingSetup">
          <div class="Marketing_Branch">
            <div class="Marketing_list">
              <div class="Marketing_title">预约设置</div>
              <div class="Marketing_Record">预约记录</div>
            </div>
            <div class="Marketing_switch">
              <el-switch v-model="makeSwitch" active-color="#13ce66" inactive-color="#666666"></el-switch>
            </div>
          </div>
          <div class="Marketing_Branch">
            <div class="Marketing_list">
              <div class="Marketing_title">购买设置</div>
              <div class="Marketing_Record">
                <span @click="clickPurchase">购买记录</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span @click="settings">功能设置</span>
              </div>
            </div>
            <div class="Marketing_switch">
              <el-switch
                v-model="directionalSwitch"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#666666"
                @change="clickDirectional($event)"
              ></el-switch>
            </div>
          </div>
          <!-- 推介设置 -->
          <div class="Marketing_Branch">
            <div class="Marketing_list">
              <div class="Marketing_title">推介设置</div>
              <div class="Marketing_Record">
                <span>定向推介</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>净值展示</span>
              </div>
            </div>
            <div class="Marketing_switch">
              <el-switch
                v-model="RecommendSwitch"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#666666"
                @change="clickRecommend($event)"
              ></el-switch>
            </div>
          </div>
          <!-- 可售设置 -->
          <div class="Marketing_Branch">
            <div class="Marketing_list">
              <div class="Marketing_title">可售设置</div>
              <div class="Marketing_Record">
                <span>规模设置</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>预留规模</span>
              </div>
            </div>
            <div class="Marketing_switch">
              <el-switch
                v-model="salableSwitch"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#666666"
                @change="clicksalable($event)"
              ></el-switch>
            </div>
          </div>
          <!-- 代销设置 -->
          <div class="Marketing_Branch">
            <div class="Marketing_list">
              <div class="Marketing_title">代销设置</div>
              <div class="Marketing_Record">代销列表</div>
            </div>
            <div class="Marketing_switch">
              <el-switch
                v-model="consignmentSwitch"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#666666"
                @change="clickconsignment($event)"
              ></el-switch>
            </div>
          </div>
          <!-- 赎回设置 -->
          <div class="Marketing_Branch">
            <div class="Marketing_list">
              <div class="Marketing_title">赎回设置</div>
            </div>
            <div class="Marketing_switch">
              <el-switch
                v-model="redeemSwitch"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#666666"
                @change="clickredeem($event)"
              ></el-switch>
            </div>
          </div>
        </div>
        <!-- 购买记录页面 -->
        <div v-if="purchasePage">
          <el-button @click="Superior">上一级</el-button>
          <el-table :data="PurchaseList" stripe id="out-table" style="width: 100%">
            <!-- 勾选框 -->
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- 索引 -->
            <el-table-column align="center" type="index" prop="data" label="序号" width="60"></el-table-column>
            <el-table-column align="center" prop="fundScale" label="姓名/名称">
              <template slot-scope="scope">
                <span
                  class="spanColor"
                  @click="personalData(scope.$index, scope.row)"
                >{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="investorType" label="投资者类型">
              <template slot-scope="scope">
                <span>{{scope.row.investorTypeName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="amount" label="操作金额/份额">
              <template slot-scope="scope">
                <span>{{scope.row.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="orderType" label="操作类型">
              <template slot-scope="scope">
                <span>{{scope.row.orderTypeName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="购买/赎回时间">
              <template slot-scope="scope">
                <span>{{scope.row.creationTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="modifiedTime" label="操作时间">
              <template slot-scope="scope">
                <span>{{scope.row.modifiedTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="orderStatusName" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.orderStatusName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="isQualified" label="操作">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.orderStatus==2">
                    <span
                      class="spanColor"
                      @click="Available(scope.$index,scope.row)"
                    >{{effectiveButton}}</span>
                    <span
                      class="spanColor"
                      @click="Inavailable(scope.$index,scope.row)"
                    >{{voidButton}}</span>
                  </div>
                  <div v-else>
                    <span class="spanColor">— —</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码 -->
          <div align="center">
            <el-pagination
              background
              @size-change="handleSizePurchase"
              @current-change="handleCurrentPurchase"
              :current-page="page"
              :page-size="num"
              layout="total, prev, pager, next, jumper"
              :total="PurchaseDataPage.count"
            ></el-pagination>
          </div>
        </div>
        <!-- 设置页面 -->
        <div v-if="settingsPage">
          <el-button @click="settingsReturn">上一页</el-button>
          <div>
            <div class="HoldNum">合同设置</div>
            <div class="holdVideo">
              <p>基金合同</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionSettings"
                :on-success="chengeScontractMaterialId"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>风险揭示书</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionSettings"
                :on-success="chengeSriskDisclosureMaterialId"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>其他材料1</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionSettings"
                :on-success="chengeSothersMaterialId1"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>其他材料2：</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionSettings"
                :on-success="chengeSothersMaterialId2"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
            <div class="holdVideo">
              <p>其他材料3</p>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionSettings"
                :on-success="chengeSothersMaterialId3"
                :file-list="fileList"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
          </div>
          <div>
            <div class="HoldNum">投资者声明</div>
            <div class="HoldNum_content">
              <p>顶部内容</p>
              <el-input type="textarea" placeholder="请输入内容" v-model="topContent"></el-input>
            </div>
          </div>
          <div>
            <el-button type="primary">确定</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      topContent: "", //顶部内容输入框
      settingsPage: false, //功能设置页面
      effectiveButton: "", //有效
      voidButton: "", //无效
      orderList: [], //订单有效/无效
      PurchaseDataPage: "", //购买记录分页查询数据总条数
      PurchaseList: [], //购买记录分页查询数据
      MarketingSetup: true, //营销设置页面
      purchasePage: false, //购买记录页面
      ReportFileeDiting: 0, //报告编辑文件id
      NoticefileId: 0, //公告文件上传id
      ReportrowId: 0, //报表编辑id
      ReportId: 0, //报表上传文件获取的id
      ProductMapId: 0, //产品添加提交文件的id
      uploadCenter: {},
      actionSettings: "",
      actionUpload: ajax.doms.bind(this)(
        "/api/Management/Product/Worth/Upload"
      ),
      categoryData: [], //报告类型下拉框
      NoticeData: [], //公告类型下拉框
      tabelPotentialList: [], //投资人数据集表
      tabelPotentialListPage: "", //数据条数
      activeName: "first", //潜在投资人框
      tabelInvestmentPage: "", //数据条数
      tabelInvestment: [], //潜在投资管理数据
      actionNotice: ajax.doms.bind(this)(
        "/api/Management/Product/Notice/Upload"
      ),
      tabelList: [], //净值管理页面数据
      tabelPage: "", //数据条数
      page: 1,
      num: 8,
      edit: false, //管理页面
      centerDialogVisible: false,
      centerDialogReport: false,
      centerDialogNotice: false,
      returnVisit: false,
      centerupload: false,
      formLabelAlign: {
        smsNotify: "",
        emailNotify: "",
        weChatNotify: "",
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
        Investment: "", //潜在投资人输入框
        potential: "" //投资人输入框
      },
      tabelPresentationList: [], //报告管理数据
      tabelPresentationPage: "", //数据条数
      checkList: [],
      action: ajax.doms.bind(this)("/api/Management/Product/Upload"),
      actionReport: ajax.doms.bind(this)(
        "/api/Management/Product/Report/Upload"
      ),
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
        futuresDealer: "", //期货交易商
        resourceShort: 0,
        resourcEmail: 0,
        resourceWeChat: 0,
        Short: 0,
        mail: 0,
        weChat: 0
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
      returnVisitId: "", //适当性回访userId
      returnVisitList: [], // 适当性回访操作里面的下拉框数据
      values: "", //适当性管理，下拉框里面的菜单id
      makeSwitch: false, //开关
      directionalSwitch: false, //开关
      RecommendSwitch: false, //开关
      salableSwitch: false, //开关
      consignmentSwitch: false, //开关
      redeemSwitch: false, //开关
      Array: {} //订单状态
    };
  },
  methods: {
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
          let data = {
            productId: this.queryId,
            product: {
              name: this.ruleForm.name,
              fundRecordNumber: this.ruleForm.fundRecordNumber,
              fundType: this.ruleForm.fundType,
              manageType: this.ruleForm.manageType,
              fundStatus: this.ruleForm.fundStatus,
              fundScale: this.ruleForm.fundScale,
              fundDuration: this.ruleForm.fundDuration,
              incomeDistributionScheme: this.ruleForm.incomeDistributionScheme,
              raiseDateOfStart: this.ruleForm.raiseDateOfStart,
              raiseDateOfEnd: this.ruleForm.raiseDateOfEnd,
              closureDateOfStart: this.ruleForm.closureDateOfStart,
              closureDateOfEnd: this.ruleForm.closureDateOfEnd,
              fundBirth: this.ruleForm.fundBirth,
              openDay: this.ruleForm.openDay,
              applyAmount: this.ruleForm.applyAmount,
              appendAmount: this.ruleForm.appendAmount,
              accountName: this.ruleForm.accountName,
              account: this.ruleForm.account,
              accountBank: this.ruleForm.accountBank,
              lineNumber: this.ruleForm.lineNumber,
              adminPublicityUrl: this.ruleForm.adminPublicityUrl,
              publicityUrl: this.ruleForm.publicityUrl
            },
            risk: {
              riskLevel: this.ruleForm.riskLevel,
              remark: this.ruleForm.remark,
              warningLine: this.ruleForm.warningLine,
              stopLossLine: this.ruleForm.stopLossLine,
              riskDisclosure: this.ruleForm.riskDisclosure,
              materialId: this.ProductMapId
            },
            rate: {
              applyRate: this.ruleForm.applyRate,
              redeemRate: this.ruleForm.redeemRate,
              manageRate: this.ruleForm.manageRate,
              trusteeshipRate: this.ruleForm.trusteeshipRate,
              outsourcingRate: this.ruleForm.outsourcingRate,
              investmentConsultantRate: this.ruleForm.investmentConsultantRate,
              performanceRemunerationRate: this.ruleForm
                .performanceRemunerationRate
            },
            investment: {
              scale: this.ruleForm.scale,
              policy: this.ruleForm.policy,
              limit: this.ruleForm.limit
            },
            manager: {
              manager1: this.ruleForm.manager1,
              trackRecord1: this.ruleForm.trackRecord1,
              manager2: this.ruleForm.manager2,
              trackRecord2: this.ruleForm.trackRecord2,
              manager3: this.ruleForm.manager3,
              trackRecord3: this.ruleForm.trackRecord3
            },
            mechanism: {
              trusteeship: this.ruleForm.trusteeship,
              lawFirm: this.ruleForm.lawFirm,
              accountingFirm: this.ruleForm.accountingFirm,
              custodian: this.ruleForm.custodian,
              investmentConsultant: this.ruleForm.investmentConsultant,
              outsource: this.ruleForm.outsource,
              security: this.ruleForm.security,
              futuresDealer: this.ruleForm.futuresDealer,
              supervisory: this.ruleForm.supervisory
            }
          };
          ajax.authPost.bind(this)(
            "/api/Management/Product/Save",
            data,
            res => {
              this.$router.push({
                path: "/NavBar/DataDitionary/BankData"
                // query: { nav }
              });
            }
          );
        } else {
          return false;
        }
      });
    },

    //风险评级文件
    chengeing(response, file, fileList) {
      this.ProductMapId = response.data.id;
      //   console.log(this.ProductMapId);
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
    getNavId() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Risk/" + this.queryId,
        res => {
          this.ProductMapId = res.data.data.materialId;
          //   console.log(this.ProductMapId);
        }
      );
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
    // 短信单选事件
    listget(selVal) {
      if (selVal == true) {
        this.ruleForm.Short = 1;
      } else if (selVal == false) {
        this.ruleForm.Short = 0;
      }
    },
    // 邮件单选事件
    listge(selVal) {
      if (selVal == true) {
        this.ruleForm.mail = 1;
      } else if (selVal == false) {
        this.ruleForm.mail = 0;
      }
    },
    // 微信单选事件
    listg(selVal) {
      if (selVal == true) {
        this.ruleForm.weChat = 1;
      } else if (selVal == false) {
        this.ruleForm.weChat = 0;
      }
    },
    // 添加净值
    addNetWorth() {
      let data = {
        productId: this.queryId,
        unitWorth: this.formLabelAlign.unitWorth,
        cumulativeWorth: this.formLabelAlign.cumulativeWorth,
        dateOfWorth: this.formLabelAlign.dateOfWorth,
        smsNotify: this.ruleForm.Short,
        emailNotify: this.ruleForm.mail,
        weChatNotify: this.ruleForm.weChat
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
      this.getpotential(); //投资者管理数据
    },
    //下载净值模板
    exportExcel() {
      let url =
        "http://192.168.28.213:5000/api/Management/Product/Worth/Template?productId=" +
        this.queryId;
      window.open(url, "_blank");
    },
    //下载净值模板内容
    downloadContent() {
      var a, b;
      a = new Array(this.netWorthId);
      b = a.join(",");
      //   console.log(b);
      let url =
        "http://192.168.28.213:5000/api/Management/Product/Worth/Download?ids=" +
        b;
      window.open(url, "_blank");
    },
    // 上传净值
    uploadContent() {
      this.uploadCenter.productId = this.queryId;
      this.uploadCenter.smsNotify = this.formLabelAlign.smsNotify;
      this.uploadCenter.emailNotify = this.formLabelAlign.emailNotify;
      this.uploadCenter.weChatNotify = this.formLabelAlign.weChatNotify;
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
    // 报表管理数据
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
    getcategoryData() {
      ajax.authGet.bind(this)("/api/Common/17", res => {
        if (res.data.code == 200) {
          this.categoryData = res.data.data;
        }
      });
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
    getNoticeData() {
      ajax.authGet.bind(this)("/api/Common/16", res => {
        if (res.data.code == 200) {
          this.NoticeData = res.data.data;
        }
      });
    },
    //潜在投资者管理数据
    getInvestment() {
      this.getpot("/api/Management/Query/Potential", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tabelInvestment = res.data.data.list;
          this.tabelInvestmentPage = res.data.data.page;
        }
      });
    },
    //投资者管理数据
    getpotential() {
      this.getpot("/api/Management/Query/InvestorAsset", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tabelPotentialList = res.data.data.list;
          this.tabelPotentialListPage = res.data.data.page;
        }
      });
    },

    //封装潜在投资人跟投资人的方法
    getpot(url, r) {
      let data = {
        productId: this.queryId,
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(url, data, r);
    },
    //选为投资人
    clickInvestment(i, row) {
      let data = {
        productId: this.queryId,
        userId: row.userId
      };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Invest/Parse?productId=" +
          this.queryId +
          "&userId=" +
          row.userId,
        res => {
          this.getInvestment();
        }
      );
    },
    //删除投资人
    delInvestor(i, row) {
      let data = {
        productId: this.queryId,
        userId: row.userId
      };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Invest/Reverse?productId=" +
          this.queryId +
          "&userId=" +
          row.userId,
        res => {
          this.getpotential();
        }
      );
    },
    //持仓管理
    holdPositions(i, row) {
      let data = {
        productId: this.queryId,
        userId: row.userId
      };
      this.$router.push({
        path: "/NavBar/DataDitionary/PositionManagement",
        query: { data }
      });
    },
    //适当性回访操作下拉功能
    getclickreturnVisit() {
      ajax.authGet.bind(this)(
        "/api/Management/Product/Invest/Operation/VisitBack?productId=" +
          this.queryId +
          "&userId=" +
          this.returnVisitId,
        res => {
          this.returnVisitList = res.data.data;
        }
      );
    },
    selectOne(event) {
      this.values = event;
    },
    //适当性回访按钮
    clickreturnVisit(i, row) {
      this.returnVisit = true;
      this.returnVisitId = row.userId;
      this.getclickreturnVisit();
    },
    //适当性回访提交确定按钮
    submitReturnVisit() {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Invest/Operation/VisitBack/Save?operationId=" +
          this.values,
        res => {
          this.returnVisit = false;
        }
      );
    },
    //报表发布
    clickRelease(i, row) {
      ajax.authPostForm.bind(this)(
        "/api/Management/Product/Report/Publish",
        { id: row.id },
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getPresentation();
          }
        }
      );
    },
    //取消报表发布
    clickcancel(i, row) {
      ajax.authPostForm.bind(this)(
        "/api/Management/Product/Report/Private",
        { id: row.id },
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getPresentation();
          }
        }
      );
    },
    //公告发布
    clickReleaseNotice(i, row) {
      ajax.authPostForm.bind(this)(
        "/api/Management/Product/Notice/Publish",
        { id: row.id },
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getNotice();
          }
        }
      );
    },
    //取消公告发布
    clickcancelNotice(i, row) {
      ajax.authPostForm.bind(this)(
        "/api/Management/Product/Notice/Private",
        { id: row.id },
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getNotice();
          }
        }
      );
    },
    //报表添加提交
    addReport() {
      let data = {
        id: this.ReportrowId,
        productId: this.queryId,
        reportType: this.formLabelAlign.reportType,
        title: this.formLabelAlign.title,
        reportDate: this.formLabelAlign.reportDate,
        materialId: this.ReportId
      };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Report/Save",
        data,
        res => {
          this.centerDialogReport = false;
          this.formLabelAlign.reportType = this.formLabelAlign.title = this.formLabelAlign.reportDate =
            "";
          this.getPresentation();
          this.clearUploadedImage();
        }
      );
    },
    //报表添加按钮
    clickAddReport() {
      this.centerDialogReport = true;
      this.ReportId = 0;
      this.formLabelAlign.reportType = this.formLabelAlign.title = this.formLabelAlign.reportDate =
        "";
    },
    //报告编辑报表
    clickPresentation(i, row) {
      this.centerDialogReport = !this.centerDialogReport;
      this.ReportrowId = row.id;
      this.ReportId = row.materialId;
      this.formLabelAlign.reportType = row.reportType;
      this.formLabelAlign.title = row.title;
      this.formLabelAlign.reportDate = row.reportDate;
      //   console.log(row);
    },
    // 清空文件列表
    clearUploadedImage() {
      this.$refs.upload.clearFiles();
    },
    //报表文件上传成功回调
    chengecheng(response, file, fileList) {
      this.ReportId = response.data.id;
    },
    //净值上传成功的回调
    SuccessWorth(response, file, fileList) {
      this.$message(response.message);
      this.centerupload = false;
      this.clearUploadedImage();
      this.formLabelAlign.smsNotify = this.formLabelAlign.emailNotify = this.formLabelAlign.weChatNotify =
        "";
    },
    //文件上传失败的回调
    errorWorth(err, file, fileList) {},
    //公告添加提交
    addNotice() {
      let data = {
        id: this.ReportFileeDiting,
        productId: this.queryId,
        title: this.formLabelAlign.Noticetitle,
        noticeType: this.formLabelAlign.noticeTypeName,
        content: this.formLabelAlign.content,
        noticeDate: this.formLabelAlign.noticeDate,
        materialId: this.NoticefileId
      };
      ajax.authPost.bind(this)(
        "/api/Management/Product/Notice/Save",
        data,
        res => {
          this.getNotice(); //刷新页面
          this.centerDialogNotice = false;
          this.formLabelAlign.Noticetitle = this.formLabelAlign.noticeTypeName = this.formLabelAlign.content = this.formLabelAlign.noticeDate =
            "";
          this.clearUploadedImage(); //清空文件
        }
      );
    },
    //公告添加对话框按钮
    addfile() {
      this.centerDialogNotice = true;
      this.formLabelAlign.Noticetitle = this.formLabelAlign.noticeTypeName = this.formLabelAlign.content = this.formLabelAlign.noticeDate =
        "";
      this.NoticefileId = 0;
    },
    //公告编辑
    clickNotice(i, row) {
      this.centerDialogNotice = !this.centerDialogNotice;
      this.ReportFileeDiting = row.id;
      this.NoticefileId = row.materialId;
      this.formLabelAlign.Noticetitle = row.title;
      this.formLabelAlign.noticeDate = row.noticeDate;
      this.formLabelAlign.content = row.content;
      this.formLabelAlign.noticeTypeName = row.noticeType;
    },
    //公告文件上传成功的回调
    chengeNotice(response, file, fileList) {
      this.NoticefileId = response.data.id;
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
      var a, b;
      a = new Array(this.netWorthId);
      b = a.join(",");
      //   console.log(b);
      let url =
        "http://192.168.28.213:5000/api/Management/Product/Report/Download?ids=" +
        b;
      window.open(url, "_blank");
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
      var a, b;
      a = new Array(this.NoticeId);
      b = a.join(",");
      //   console.log(b);
      let url =
        "http://192.168.28.213:5000/api/Management/Product/Notice/Download?ids=" +
        b;
      window.open(url, "_blank");
    },
    //点击姓名进入个人资料页面
    personalData(i, row) {
      let data = row.userId;
      this.$router.push({
        path: "/NavBar/CParameter/personalData",
        query: { data }
      });
    },
    // 购买设置开关
    clickDirectional(e) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Market/Purchase?productId=" +
          this.queryId +
          "&status=" +
          e,
        res => {}
      );
    },
    // 推介设置开关
    clickRecommend(e) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Market/Purchase?productId=" +
          this.queryId +
          "&status=" +
          e,
        res => {}
      );
    },
    //可售设置开关
    clicksalable(e) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Market/Purchase?productId=" +
          this.queryId +
          "&status=" +
          e,
        res => {}
      );
    },
    //代销设置开关
    clickconsignment(e) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Market/Purchase?productId=" +
          this.queryId +
          "&status=" +
          e,
        res => {}
      );
    },
    //赎回设置开关
    clickredeem(e) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Market/Purchase?productId=" +
          this.queryId +
          "&status=" +
          e,
        res => {}
      );
    },
    //购买记录
    clickPurchase() {
      this.MarketingSetup = false;
      this.purchasePage = true;
      let data = {
        productId: this.queryId,
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(
        "/api/Management/Query/TradeRecord",
        data,
        res => {
          this.PurchaseList = res.data.data.list;
          this.PurchaseDataPage = res.data.data.page;
        }
      );
      this.getOrder();
    },
    //订单有效
    Available(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Market/Trade/Available/" + row.tradeId,
        res => {
          this.clickPurchase();
        }
      );
    },
    //订单无效
    Inavailable(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Product/Market/Trade/Inavailable/" + row.tradeId,
        res => {
          this.clickPurchase();
        }
      );
    },
    //获取有效/无效订单
    getOrder() {
      ajax.authGet.bind(this)("/api/Common/22", res => {
        this.orderList = res.data.data;
        // debugger;
        for (var i = 0; i < this.orderList.length; i++) {
          this.effectiveButton = this.orderList[2].text;
          this.voidButton = this.orderList[3].text;
        }
        // console.log(this.effectiveButton);
        // console.log(this.voidButton);
      });
    },
    // 购买记录返回上一级
    Superior() {
      this.MarketingSetup = true;
      this.purchasePage = false;
    },
    //购买设置里面的功能设置
    settings() {
      this.settingsPage = true;
      this.MarketingSetup = false;
    },
    //功能设置返回上一级按钮
    settingsReturn() {
      this.settingsPage = false;
      this.MarketingSetup = true;
    },
    //用于购买设置里面文件上传后拿到返回的文件id
    getactionSettings() {
      this.actionSettings = ajax.doms.bind(this)(
        "/api/Management/Product/Market/Upload/" + this.queryId
      );
    },
    //购买设置里面基金合同成功回调
    chengeScontractMaterialId(response, file, fileList) {},
    //购买设置里面风险揭示书成功回调
    chengeSriskDisclosureMaterialId(response, file, fileList) {},
    //购买设置里面其他材料1成功回调
    chengeSothersMaterialId1(response, file, fileList) {},
    //购买设置里面其他材料2成功回调
    chengeSothersMaterialId2(response, file, fileList) {},
    //购买设置里面其他材料3成功回调
    chengeSothersMaterialId3(response, file, fileList) {},
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
    },
    //每页显示数据量变更
    handleSizePurchase(val) {
      this.num = val;
      this.clickPurchase();
    },
    //页码变更
    handleCurrentPurchase(val) {
      this.page = val;
      this.clickPurchase();
    }
  },
  mounted() {
    this.getFundtype();
    this.adds();
    this.getSeeOne();
    this.getNetWorth();
    this.getPresentation(); //报告数据
    this.getNoticeData(); //公告类型下拉数据
    this.getcategoryData(); //报告类型下拉数据
    this.getNotice(); //公告数据
    this.getInvestment(); //潜在投资者管理数据
    this.getpotential(); //投资者管理数据
    this.getNavId();
    this.getactionSettings(); //用于购买设置里面文件上传后拿到返回的文件id
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
  .returnVisit {
    .el-input--suffix {
      width: 100%;
    }
  }
  .Marketing_WholeList {
    .Marketing_Branch {
      height: 80px;
      border-top: 2px solid #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .Marketing_list {
        .Marketing_Record {
          font-size: 14px;
          color: #409eff;
        }
      }
    }
  }
  .HoldNum {
    border-left: 4px solid #2d8cf0;
  }
}
</style>