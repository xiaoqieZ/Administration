<template>
  <div>
    <div style="padding-bottom: 10px;">
      <el-button @click="returnUpper">返回上一级</el-button>
    </div>
    <div class="essential">
      <!-- 基本信息 -->
      <div class="essential_content">
        <div class="essential_title">
          <span style="border-left: 3px solid #409eff;"></span>&nbsp;基本信息
        </div>
        <!-- 个人、产品 -->
        <div class="essential_list" v-if="essential.mechanismName==''">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  姓名：
                  <span>{{essential.name}}</span>
                </p>
                <p>
                  手机：
                  <span>{{essential.mobile}}</span>
                </p>
                <p>
                  证件类型：
                  <span>{{essential.certificateTypeName}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  昵称：
                  <span>{{essential.nickName}}</span>
                </p>
                <p>
                  邮箱：
                  <span>{{essential.postal}}</span>
                </p>
                <p>
                  性别：
                  <span>{{essential.sex==0?'女':'男'}}</span>
                </p>
                <p>
                  证件号：
                  <span>{{essential.certificateNo}}</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 机构 -->
        <div class="essential_list" v-else>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  机构名称：
                  <span>{{essential.mechanismName}}</span>
                </p>
                <p>
                  授权人昵称：
                  <span>{{essential.nickName}}</span>
                </p>
                <p>
                  授权人证件号：
                  <span>{{essential.certificateNo}}</span>
                </p>
                <p>
                  授权人手机：
                  <span>{{essential.mobile}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  机构证件类型：
                  <span>{{essential.mechanismCertificateTypeName}}</span>
                </p>
                <p>
                  机构证件号码：
                  <span>{{essential.mechanismCertificateNo}}</span>
                </p>
                <p>
                  授权人姓名：
                  <span>{{essential.name}}</span>
                </p>
                <p>
                  授权人证件类型：
                  <span>{{essential.certificateTypeName}}</span>
                </p>
                <p>
                  授权人性别：
                  <span>{{essential.sex==0?'女':'男'}}</span>
                </p>
                <p>
                  授权人邮箱：
                  <span>{{essential.email}}</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 注册认证 -->
      <div class="essential_content">
        <div class="essential_title">
          <span style="border-left: 3px solid #409eff;"></span>&nbsp;注册认证
        </div>
        <div class="essential_Authentication">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  关注时间：
                  <span>{{Authentication.creationTime}}</span>
                </p>
                <p>
                  网络服务协议时间：
                  <span>{{Authentication.networkServerProtocolTime}}</span>
                </p>
                <p>
                  修改记录：
                  <span style="color:#409eff" @click="modify=true">查看详情</span>
                </p>
                <p>
                  认证通过时间：
                  <span>{{Authentication.auditTime}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  注册时间：
                  <span>{{Authentication.registrationTime}}</span>
                </p>
                <p>
                  认证信息提交时间：
                  <span>{{Authentication.submitTime}}</span>
                </p>
                <p>
                  认证材料：
                  <span style="color:#409eff" @click="Science=true">查看详情</span>
                </p>
                <p>
                  认证详情：
                  <span style="color:#409eff" @click="CertificationDetails=true">查看详情</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 特定对象 -->
      <div class="essential_content">
        <div class="essential_title">
          <span style="border-left: 3px solid #409eff;"></span>&nbsp;特定对象
        </div>
        <div class="essential_given" v-for="item in specific" :key="item.creationTime">
          <p>
            问卷时间：
            <span>{{item.endTime}}</span>
          </p>
          <p>
            问卷详情：
            <span style="color:#409eff" @click="questionnairePage(item)">查看详情</span>
          </p>
        </div>
      </div>
      <!-- 适当性认证 -->
      <div class="essential_content">
        <div class="essential_title">
          <span style="border-left: 3px solid #409eff;"></span>&nbsp;适当性认证
        </div>
        <div class="essential_Authentication">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  认证结果：
                  <span>{{appropriate.auditResult}}</span>
                </p>
                <p>
                  认证提交时间：
                  <span>{{appropriate.submitTime}}</span>
                </p>
                <p>
                  转化时间：
                  <span>{{appropriate.conversionTime}}</span>
                </p>
                <p>
                  认定详情：
                  <span style="color:#409eff" @click="cognizance=true">查看详情</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  基本信息提交时间：
                  <span>{{appropriate.acquisitionTime}}</span>
                </p>
                <p>
                  认证通过时间：
                  <span>{{appropriate.auditTime}}</span>
                </p>
                <p>
                  认定材料：
                  <span style="color:#409eff" @click="ConfirmationMaterials=true">查看详情</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 合格投资者认定 -->
      <div class="essential_content">
        <div class="essential_title">
          <span style="border-left: 3px solid #409eff;"></span>&nbsp;合格投资者认定
        </div>
        <div class="essential_Authentication">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  认证结果：
                  <span>{{Authentication.creationTime}}</span>
                </p>
                <p>
                  认定材料：
                  <span style="color:#409eff" @click="qualifiedCognizance=true">查看详情</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  认证提交时间：
                  <span>{{Authentication.registrationTime}}</span>
                </p>
                <p>
                  认定详情：
                  <span style="color:#409eff" @click="qualified=true">查看详情</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 线下资料 -->
      <div class="essential_content">
        <div class="essential_title">
          <span style="border-left: 3px solid #409eff;"></span>&nbsp;线下资料
        </div>
        <div class="essential_Authentication">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <p>
                  更新时间：
                  <span>{{essential.name}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <p>
                  资料详情：
                  <span style="color:#409eff" @click="dataList=true">查看详情</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 修改记录弹窗 -->
    <el-dialog title="修改记录详情" :visible.sync="modify" width="80%" center>
      <div>
        <div>
          <el-table :data="modifyData" style="width: 100%">
            <el-table-column align="center" prop="date" label="修改内容">
              <template slot-scope="scope">
                <span>{{scope.row.modifyTypeName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="原始内容">
              <template slot-scope="scope">
                <span>{{scope.row.originContent}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="更新内容">
              <template slot-scope="scope">
                <span>{{scope.row.modifyContent}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="修改时间">
              <template slot-scope="scope">
                <span>{{scope.row.creationTime}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modify = false">取 消</el-button>
        <el-button type="primary" @click="modify = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 注册认证材料弹窗 -->
    <el-dialog title="注册认证认证材料详情" :visible.sync="Science" width="80%" center>
      <div v-for="item in materialData" :key="item.id">
        <div class="materialcount">
          <div class="materialTitle">
            <span style="border-left: 3px solid #409eff;"></span>
            &nbsp;{{item.name}}
          </div>
          <div class="materialcla">
            <div class="materialList" v-for="open in item.items">
              <div class="materialImg">
                <img :src="open.material.fullPath" alt />
              </div>
              <p>{{open.userMaterialType.remark}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 注册认证详情弹窗 -->
    <el-dialog title="注册认证认证详情" :visible.sync="CertificationDetails" width="80%" center>
      <div>
        <div>
          <el-table :data="detailslData" style="width: 100%">
            <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
            <el-table-column align="center" prop="date" label="认证材料" center>
              <template slot-scope="scope">
                <span @click="Science=true" style="color:#409eff">查看</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="认证状态" center>
              <template slot-scope="scope">
                <span>{{scope.row.auditStatusName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="提交时间">
              <template slot-scope="scope">
                <span>{{scope.row.auditTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="审核时间">
              <template slot-scope="scope">
                <span>{{scope.row.creationTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="备注">
              <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CertificationDetails = false">取 消</el-button>
        <el-button type="primary" @click="CertificationDetails = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 问卷弹窗 -->
    <el-dialog title="特定对象认定问卷详情" :visible.sync="centerDialogVisible" width="80%" center>
      <!-- <div v-for="item in arraysQuestionnaire" :key="item.id"> -->
      <div style="padding-bottom:20px">
        <el-row>
          <el-col :span="12">
            <div
              class="grid-content bg-purple"
              style="font-weight:600"
            >{{arraysQuestionnaire.title}}</div>
          </el-col>
          <el-col :span="12">
            <div
              class="grid-content bg-purple-light"
              style="font-weight:600"
            >{{arraysQuestionnaire.riskLevelName}}</div>
          </el-col>
        </el-row>
      </div>
      <table border="1">
        <tr>
          <th>问题</th>
          <th style="width:180px;">答案</th>
          <th style="width:80px;">获得分数</th>
        </tr>
        <tr v-for="(item,index) in arraysQuestionnaire.items" :key="item.id">
          <td>
            <span>{{index+1}}、</span>
            {{item.title}}
          </td>
          <td style="text-align:center">
            <div v-for="open in item.options" :key="open.id">{{open.isChecked==1?open.content:''}}</div>
          </td>
          <td style="text-align:center">
            <div v-for="open in item.options" :key="open.id">{{open.isChecked==1?open.score:''}}</div>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 适当性认证详情弹窗 -->
    <el-dialog title="适当性认证详情" :visible.sync="cognizance" width="80%" center>
      <div>
        <div>
          <el-table :data="appropriateData" style="width: 100%">
            <!-- <el-table-column align="center" prop="date" label="操作记录">
              <template slot-scope="scope">
                <span>{{scope.row.investorRoleName}}</span>
              </template>
            </el-table-column>-->
            <el-table-column align="center" prop="name" label="认证状态">
              <template slot-scope="scope">
                <span>{{scope.row.auditStatusName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="提交时间">
              <template slot-scope="scope">
                <span>{{scope.row.creationTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="审核时间">
              <template slot-scope="scope">
                <span>{{scope.row.auditTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="备注">
              <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="认证材料">
              <template slot-scope="scope">
                <span @click="ConfirmationMaterials=true" style="color:#409eff">查看</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cognizance = false">取 消</el-button>
        <el-button type="primary" @click="cognizance = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 适当性认定材料弹窗 -->
    <el-dialog title="适当认定材料详情" :visible.sync="ConfirmationMaterials" width="80%" center>
      <div v-for="item in appropriateMaterialData" :key="item.id">
        <div class="materialcount">
          <div class="materialTitle">
            <span style="border-left: 3px solid #409eff;"></span>
            &nbsp;{{item.name}}
          </div>
          <div class="materialcla">
            <div class="materialList" v-for="open in item.items">
              <div class="materialImg">
                <img :src="open.material.fullPath" alt />
              </div>
              <p>{{open.userMaterialType.remark}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 合格投资者认定材料弹窗 -->
    <el-dialog title="合格投资者认定材料详情" :visible.sync="qualifiedCognizance" width="80%" center>
      <div v-for="item in qualifiedMaterialData" :key="item.id">
        <div class="materialcount">
          <div class="materialTitle">
            <span style="border-left: 3px solid #409eff;"></span>
            &nbsp;{{item.name}}
          </div>
          <div class="materialcla">
            <div class="materialList" v-for="open in item.items">
              <div class="materialImg">
                <img :src="open.material.fullPath" alt />
              </div>
              <p>{{open.userMaterialType.remark}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 合格投资者认证详情弹窗 -->
    <el-dialog title="合格投资者认证详情" :visible.sync="qualified" width="80%" center>
      <div>
        <div>
          <el-table :data="qualifiedData" style="width: 100%">
            <el-table-column align="center" prop="date" label="认证材料">
              <template slot-scope="scope">
                <span @click="qualifiedCognizance=true" style="color:#409eff">查看</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="date" label="认证状态">
              <template slot-scope="scope">
                <span>{{scope.row.auditStatusName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="提交时间">
              <template slot-scope="scope">
                <span>{{scope.row.creationTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="审核时间">
              <template slot-scope="scope">
                <span>{{scope.row.auditTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="备注">
              <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qualified = false">取 消</el-button>
        <el-button type="primary" @click="qualified = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 线下材料详情 -->
    <el-dialog title="历史文件" :visible.sync="dataList" width="80%" center>
      <div>
        <div>
          <el-table :data="specific" style="width: 100%">
            <el-table-column prop="date" label="文件名称">
              <template slot-scope="scope">
                <span>{{scope.row.investorRoleName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="文件详情">
              <template slot-scope="scope">
                <span>{{scope.row.investorRoleName}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataList = false">取 消</el-button>
        <el-button type="primary" @click="dataList = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      userid: "", //用户id
      essential: {}, //基本信息
      Authentication: {}, //认证信息
      specific: [], //特定对象
      appropriate: {}, //适当性认证
      centerDialogVisible: false, //问卷详情
      specificList: [], //问卷题目
      specificCount: [], //答案
      modify: false, //修改记录
      Science: false, //材料
      CertificationDetails: false, //认证详情
      cognizance: false, //认定详情
      ConfirmationMaterials: false, //认定材料
      qualifiedCognizance: false, //合格投资者认定材料
      qualified: false, //合格投资者认定详情
      dataList: false, //线下资料详情
      modifyData: [], //修改内容
      materialData: [], //注册认证材料
      detailslData: [], //注册认证详情
      appropriateData: [], //适当性认证详情
      appropriateMaterialData: [], //适当性认证材料
      qualifiedMaterialData: [], //合格投资者认证材料
      qualifiedData: [], //合格投资者认证详情
      arraysQuestionnaire: {},
      content: {}
    };
  },
  methods: {
    //上级拿过来的用户id
    getName() {
      this.userid = this.$route.query.data;
    },
    //返回上一级
    returnUpper() {
      this.$router.go(-1);
    },
    //问卷
    questionnairePage(i) {
      this.centerDialogVisible = true;
      this.arraysQuestionnaire = i;
      // console.log(this.arraysQuestionnaire)
      let arry = this.arraysQuestionnaire.items;
      arry.forEach((value, index) => {
        // console.log(value)
        value.options.forEach((item, i) => {
          //   console.log(item);
          this.content = item.content;
        });
      });
    },
    //获取信息
    getEssential() {
      //用户基本信息
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Get/" + this.userid,
        res => {
          this.essential = res.data.data;
        }
      );
      //注册认证信息
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Authentication/" + this.userid,
        res => {
          this.Authentication = res.data.data;
        }
      );
      //特定对象
      ajax.authGet.bind(this)(
        "/api/Management/Audit/QuestionnaireResult/" + this.userid,
        res => {
          this.specific = res.data.data;
          //   for (var i = 0; i < this.specific.length; i++) {
          //     this.specificList = this.specific[i].items;
          //     for (var j = 0; j < this.specificList.length; j++) {
          //       this.specificCount = this.specificList[j].options;
          //     }
          //   }
        }
      );
      //适当性认证信息
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Appropriateness/" + this.userid,
        res => {
          this.appropriate = res.data.data;
        }
      );
      //修改记录
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Modify?userid=" + this.userid,
        res => {
          this.modifyData = res.data.data;
        }
      );
      //注册认证材料
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Material/Authentication/" + this.userid,
        res => {
          this.materialData = res.data.data;
        }
      );
      //注册认证详情
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Audit/Authentication/" + this.userid,
        res => {
          this.detailslData = res.data.data;
        }
      );
      //适当性认证详情
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Audit/Appropriateness/" + this.userid,
        res => {
          this.appropriateData = res.data.data;
        }
      );
      //适当性认证材料
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Material/Appropriateness/" + this.userid,
        res => {
          this.appropriateMaterialData = res.data.data;
        }
      );
      //合格投资者认证材料
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Material/Qualified/" + this.userid,
        res => {
          this.qualifiedMaterialData = res.data.data;
        }
      );
      //合格投资者认证详情
      ajax.authGet.bind(this)(
        "/api/Management/Audit/Audit/Qualified/" + this.userid,
        res => {
          this.qualifiedData = res.data.data;
        }
      );
    }
  },
  mounted() {
    this.getName();
    this.getEssential();
  }
};
</script>

<style lang="less" scoped>
.essential {
  height: 579px;
  background: #fff;
  padding: 20px;
  overflow: scroll;
  .essential_content {
    .essential_title {
      font-size: 15px;
      font-weight: 600;
      // border-left: 3px solid #409eff;
      padding: 10px 0;
    }
    .essential_list {
      width: 500px;
      margin: 0 auto;
      border: 1px solid;
      padding: 5px;
    }
    .essential_Authentication {
      width: 600px;
      border: 1px solid;
      padding: 5px;
    }
    .essential_given {
      width: 400px;
      border: 1px solid;
      padding: 5px;
      margin-bottom: 10px;
    }
  }
}
.materialcount {
  padding-bottom: 10px;
  .materialTitle {
    font-weight: 600;
    padding: 10px;
  }
  .materialcla {
    width: 100%;
    display: flex;
    .materialList {
      width: 48%;
      text-align: center;
      .materialImg {
        width: 48%;
        height: 80px;
        margin: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
/deep/.el-dialog__body {
  height: 428px;
  overflow: scroll;
}
</style>