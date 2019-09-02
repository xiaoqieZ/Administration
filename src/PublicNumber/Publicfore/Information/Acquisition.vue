<template>
  <div class="Publicfore">
    <mt-header fixed title="信息采集">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div v-if="isHider">
      <div v-show="values==0">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name" v-if="inputdisabled">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name" v-if="inputName">
            <el-input v-model="ruleForm.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model="ruleForm.gender"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="国籍" prop="nationy">
            <el-input v-model="ruleForm.nationy"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificateTypeName" v-if="inputdisabled">
            <el-select v-model="ruleForm.certificateTypeName" placeholder="请选择证件类型">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="军人证" value="2"></el-option>
              <el-option label="结婚证" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificateTypeName" v-if="inputName">
            <el-select
              v-model="ruleForm.certificateTypeName"
              placeholder="请选择证件类型"
              :disabled="true"
            >
              <el-option label="身份证" value="1"></el-option>
              <el-option label="军人证" value="2"></el-option>
              <el-option label="结婚证" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNo" v-if="inputdisabled">
            <el-input type="number" v-model="ruleForm.certificateNo"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNo" v-if="inputName">
            <el-input type="number" v-model="ruleForm.certificateNo" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职业" prop="occupation">
            <el-input v-model="ruleForm.occupation"></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="post">
            <el-input v-model="ruleForm.post"></el-input>
          </el-form-item>
          <el-form-item label="座机" prop="landline">
            <el-input v-model="ruleForm.landline"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile" v-if="inputdisabled">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile" v-if="inputName">
            <el-input type="number" v-model="ruleForm.mobile" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮编" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件" prop="email" v-if="inputdisabled">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件" prop="email" v-if="inputName">
            <el-input type="email" v-model="ruleForm.email" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
        </el-form>
        <div class="radios">
          <div class="radisFilial" v-for="(item,i) in listOption" :key="item.id">
            <p>
              <span>{{item.id}}、</span>
              {{item.title}}
            </p>
            <!-- <el-radio-group v-model="listOption[index].radio"> -->
            <el-radio-group v-model="item.radio" @change="ChangeRadio($event,i)">
              <el-radio :label="item.yes">{{item.yesTitle}}</el-radio>
              <el-radio :label="item.no">{{item.noTitle}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </div>
      <div class="radiosplay" v-show="values==1">
        <div class="Congratulations">
          <div class="Congratu">
            <p>恭喜您完成基本信息采集</p>
            <p>
              您将申请成为：
              <span style="color:red">{{listTypeName.investorTypeName}}</span>
            </p>
          </div>
        </div>
        <el-button type="primary" @click="material">上传证明材料</el-button>
        <a>稍后上传</a>
      </div>
    </div>
    <!-- 返回上一页 -->
    <div class="isShow" v-if="isShow">点击上面的返回走好不送</div>
    <!-- 没有实名认证，弹出提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="80%"
      center
    >
      <span>小茄子：需要先实名认证才可以选购基金产品喔！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="dssy">去认证</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import ajax from "../../../api/https.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "", //姓名
        gender: "", //性别
        age: "", //年龄
        nationy: "", // 国籍
        certificateNo: "", // 证件号码
        certificateTypeName: "", // 证件类型
        occupation: "", //职业
        post: "", // 职务
        mobile: "", // 手机
        code: "", // 邮编
        email: "", // 电子邮箱
        address: "", // 地址
        landline: "" // 座机
      },
      radio: "", //单选
      values: 0, //信息采集页面跟提交页面的变量
      list: "2",
      inputName: false, //禁用输入框
      inputdisabled: false, //禁用输入框
      isShow: false, //没有实名认证时现实的信息采集页面
      isHider: false, // 实名认证完了之后给用户展示的页面
      centerDialogVisible: false, //没有实名认证，弹出提示框
      listTypeName: "", //用户类型
      listOption: [], //拉取后台选择题
      RadioList: [], //选择题的数量
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [
          { required: true, message: "请选择性别", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        certificateTypeName: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        certificateNo: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          {
            min: 1,
            max: 18,
            message: "长度在 17 到 18 个字符",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        occupation: [
          { required: true, message: "请选择性别", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        post: [
          { required: true, message: "请选择性别", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        landline: [
          { required: true, message: "请选择性别", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请选择性别", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请选择性别", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    dssy() {
      //去实名认证
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore/04/Authentication" });
    },
    cancel() {
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore" });
    },
    // 提交信息
    submitForm(formName, index) {
      //判断选择题是否全选
      if (this.RadioList != "" && this.RadioList.length > 5) {
        //重置输入框
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = {
              sex: this.gender,
              profession: this.occupation,
              duty: this.post,
              landline: this.landline,
              postal: this.code,
              address: this.address,
              acquisitionResult: this.RadioList
            };
            ajax.authPost.bind(this)(
              "/api/Information/Account/Acquisition",
              data,
              res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.listTypeName = res.data.data;
                  let typeName = this.listTypeName;
                  typeName = JSON.stringify(typeName);
                  sessionStorage.setItem("typeName", typeName);
                }
              }
            );
            this.$message("提交成功");
            this.values = 1;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$message("单选不能留空");
      }
    },
    //获取后台选择题
    getAcquisitionOption() {
      ajax.authGet.bind(this)(
        "/api/Information/Account/AcquisitionOption",
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.listOption = res.data.data;
          }
        }
      );
    },
    //选择题的数量
    ChangeRadio(e, index) {
      this.RadioList[index] = e;
    },
    //重置输入框
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    material() {
      this.$router.push({ path: "/Publicfore/04/Material" });
    }
  },
  created() {
    var conputy = sessionStorage.getItem("typeName");
    conputy = JSON.parse(conputy);
    // conputy=this.listTypeName
    if (conputy) {
      this.values = 1;  //信息采集完成界面
      this.listTypeName = conputy;
    }
  },
  mounted() {
    this.getAcquisitionOption();
    var lisat = sessionStorage.getItem("listaktion");
    lisat = JSON.parse(lisat);
    if (lisat == null || lisat.length == 0) {
      this.inputName = false; //取消禁用输入框
      this.isShow = true;
      this.centerDialogVisible = true; //弹窗
    } else {
      this.ruleForm = lisat;
      this.inputName = true; //启动禁用输入框
      this.inputdisabled = false; //取消禁用输入框
      this.isHider = true;
      this.centerDialogVisible = false; //弹窗
    }
  }
};
</script>
<style lang="less" scoped>
.Publicfore {
  /deep/.demo-ruleForm {
    margin-top: 50px;
  }
  /deep/.el-button--primary {
    width: 100%;
  }
  .radios {
    padding: 0 10px;
    .radisFilial {
      padding-bottom: 10px;
    }
  }
  .radiosplay {
    margin-top: 50px;
    .Congratulations {
      width: 100%;
      height: 300px;
      .Congratu {
        width: 66%;
        margin: 0 auto;
        p {
          text-align: center;
          font-weight: 600;
          font-size: 17px;
        }
      }
    }
  }
  .isShow {
    margin-top: 50px;
  }
  .el-select-dropdown {
    top: 215px !important;
  }
  .el-input__suffix {
    height: 73% !important;
  }
}
</style>

