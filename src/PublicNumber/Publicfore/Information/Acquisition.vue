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
          label-width="85px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name" v-if="inputdisabled">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name" v-if="inputName">
            <el-input v-model="ruleForm.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="name">
            <el-radio-group v-model="radio">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model="ruleForm.age" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="国籍" prop="nationy">
            <el-input v-model="ruleForm.nationy" :disabled="true"></el-input>
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
          <el-form-item label="座机" prop="landlinePit">
            <el-input v-model="ruleForm.landlinePit"></el-input>
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
          <el-form-item label="地址" prop="addressPit">
            <el-input v-model="ruleForm.addressPit"></el-input>
          </el-form-item>
        </el-form>
        <div class="radios">
          <div class="radisFilial" v-for="(item,i) in listOption" :key="item.id">
            <p>
              <span>{{i+1}}</span>
              {{item.title}}
            </p>
            <!-- <el-radio-group v-model="listOption[index].radio"> -->
            <el-radio-group v-model="item.radio">
              <el-radio
                :label="option.id"
                v-for="option in item.options"
                :key="option.id"
                @change="ChangeRadio($event,item,i,option)"
              >{{option.content}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="button_submit">
          <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        </div>

        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </div>
      <div class="radiosplay" v-show="values==1">
        <div class="Congratulations">
          <div class="Congratu">
            <p>恭喜您完成基本信息采集</p>
            <span>您将申请成为：</span>
            <span style="color:red">{{this.authentication.investorTypeName}}</span>
          </div>
        </div>
        <el-button type="primary" @click="material">上传证明材料</el-button>
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
      <span>需要先风险评测才可以选购基金产品喔！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dssy">去评测</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import ajax from "../../../api/https.js";
import storage from "../../../api/storage.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "", //姓名
        age: "", //年龄
        nationy: "", // 国籍
        certificateTypeName: "", // 证件类型
        occupation: "", //职业
        post: "", // 职务
        mobile: "", // 手机
        code: "", // 邮编
        email: "", // 电子邮箱
        addressPit: "", // 地址
        landlinePit: "" // 座机
      },
      radio: 1, ////性别
      values: 0, //信息采集页面跟提交页面的变量
      list: "2",
      inputName: false, //禁用输入框
      inputdisabled: false, //禁用输入框
      isShow: false, //没有实名认证时现实的信息采集页面
      isHider: false, // 实名认证完了之后给用户展示的页面
      centerDialogVisible: false, //没有实名认证，弹出提示框
      listOption: [], //拉取后台选择题
      RadioList: [], //选择题的数量
      newlist: [],
      information: {}, //获取当前用户信息
      authentication: {}, //获取当前用户注册认证信息
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        certificateTypeName: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        occupation: [
          { required: true, message: "请输入职业", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        post: [
          { required: true, message: "请输入职务", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        landlinePit: [
          { required: true, message: "请输入座机", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入邮编", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 11 个字符", trigger: "blur" }
        ],
        addressPit: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    dssy() {
      //去实名认证
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore/Information/Assessment" });
    },
    // 提交信息
    submitForm(formName, index) {
      //判断选择题是否全选
      if (this.listOption.length==this.RadioList.length ) {
        //重置输入框
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = {
              sex: this.radio,
              profession: this.ruleForm.occupation,
              duty: this.ruleForm.post,
              landline: this.ruleForm.landlinePit,
              postal: this.ruleForm.code,
              address: this.ruleForm.addressPit,
              acquisitionResult: this.RadioList
            };
            // 客户信息
            ajax.authPost.bind(this)(
              "/api/Information/Account/Acquisition",
              data,
              res => {
                  this.authentication = res.data.data;
                  this.$message("提交成功");
                  this.values = 1;
              }
            );
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
    //选择题选中
    ChangeRadio(e, index, i, o) {
      this.RadioList[i] = {
        itemId: index.id,
        optionId: [o.id]
      };
    },
    //重置输入框
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    material() {
      this.$router.push({ path: "/Publicfore/Information/Material" });
    },
    //展示已认证的用户信息
    getPersonal() {
      ajax.authGet.bind(this)("/api/Information/Account/GetByOpenId", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.information = res.data.data;
          //判断是否有实名认证类型
          if (this.information.name == null) {
            this.inputName = false; //取消禁用输入框
            this.isShow = true;
          } else {
            this.ruleForm = this.information;
            this.inputName = true; //启动禁用输入框
            this.inputdisabled = false; //取消禁用输入框
            this.isHider = true;
          }
        }
      });
      //获取当前用户注册认证信息
      ajax.authGet.bind(this)(
        "/api/Information/Account/Authentication",
        res => {
          this.authentication = res.data.data;
          //判断是否完成风险评测
          if (this.authentication.riskLevelName == null) {
            this.centerDialogVisible = true;
            //判断是否信息采集完成
          }
          if (this.authentication.investorTypeName == null) {
            this.values = 0;
          } else {
            this.values = 1; //信息采集完成界面
          }
        }
      );
    }
  },
  mounted() {
    this.getPersonal();
    this.getAcquisitionOption();
  }
};
</script>
<style lang="less" scoped>
.Publicfore {
  padding: 0 10px;
  /deep/.demo-ruleForm {
    margin-top: 50px;
  }
  /deep/.el-button--primary {
    width: 100%;
  }
  .radios {
    .radisFilial {
      padding-bottom: 10px;
    }
  }
  .button_submit {
    padding: 50px 0;
    /deep/.el-button--primary {
      width: 100%;
    }
  }
  .radiosplay {
    margin-top: 50px;
    .Congratulations {
      width: 100%;
      height: 300px;
      .Congratu {
        width: 66%;
        text-align: center;
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

