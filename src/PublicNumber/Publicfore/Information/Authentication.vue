<template>
  <div style="width:100%">
    <div class="Authentitle" v-show="Hang==0">
      <mt-header style="z-index:9;" fixed title="实名认证">
        <div @click="Ret" slot="left" v-if="retNo">
          <mt-button icon="back">返回</mt-button>
        </div>
        <div @click="dssy" slot="left" v-if="retGo">
          <mt-button icon="back">返回</mt-button>
        </div>
      </mt-header>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写信息"></el-step>
        <el-step title="补充信息"></el-step>
        <el-step title="认证完成"></el-step>
      </el-steps>
      <!-- 填写信息 -->
      <div class="Authencenter" v-show="fill==1">
        <div class="Authenradio">
          <span>投资者类型：</span>
          <el-radio-group v-model="radio">
            <el-radio :label="item.value" v-for="item in Customer" :key="item.index">{{item.text}}</el-radio>
          </el-radio-group>
        </div>
        <div>
          <!-- 填写信息 -->
          <el-form label-width="23%" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="手机号码：" prop="phone">
              <el-input type="number" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item class="phoneShort" label="短信验证：" prop="short">
              <el-input type="number" v-model="ruleForm.short"></el-input>
              <div v-if="getswithy">
                  <van-count-down
                  ref="countDown"
                  :time="5000"
                  :auto-start="false"
                  format="ss"
                  @finish="finished"
                />
                <el-button @click="getShort" class="buttonShort" v-if="getHide">获取验证码</el-button>
              </div>
              <div v-if="getGun">
                <van-count-down
                ref="countDown"
                :time="5000"
                :auto-start="true"
                format="ss"
                @finish="finished"
              />
              <el-button @click="reset" class="buttonShort" v-if="getagain">重新获取</el-button>
              </div>
            </el-form-item>
            <el-form-item label="电子邮件：" prop="mail">
              <el-input v-model="ruleForm.mail"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="A">
            <a>《北京润达信合投资基金管理有限公司微信公众号服务协议》</a>
          </el-checkbox>
          <el-checkbox label="B">《合格投资者》相关要求</el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 补充信息 -->
      <div v-show="fill==2">
        <el-form label-width="90px" :model="nameForm" :rules="ruForm" ref="nameForm">
          <el-form-item label="真实姓名：" prop="name">
            <el-input type="text" v-model="nameForm.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：" prop="certi">
            <el-select v-model="nameForm.certi" placeholder="请选择证件类型">
              <el-option :label="item.text" :value="item.value" v-for="item in getDocument" :key="item.index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="ber">
            <el-input type="text" v-model="nameForm.ber"></el-input>
          </el-form-item>
          <div v-if="mechanismName">
            <el-form-item label="机构名称：" prop="mechanismName">
              <el-input type="text" v-model="nameForm.mechanismName"></el-input>
            </el-form-item>
            <el-form-item label="证件类型：" prop="mechanismCertificateType">
              <el-select v-model="nameForm.mechanismCertificateType" placeholder="请选择证件类型">
                <el-option :label="item.text" :value="item.value" v-for="item in Business" :key="item.index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码：" prop="mechanismCertificateNo">
              <el-input type="text" v-model="nameForm.mechanismCertificateNo"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-show="fill==3">
        <div class="goods">恭喜您完成认证</div>
      </div>
      <div class="buttommagin">
        <el-button type="primary" plain @click="next('ruleForm')" v-if="isShow==0">下一步</el-button>
        <!-- <el-button type="primary" @click="getnext('nameForm')" v-if="isShow==3">下一步</el-button> -->
        <el-button type="primary" @click="getPhone" v-if="isShow==1">提交完成</el-button>
        <el-button type="primary" @click="getPhone" v-if="isShow==2" disabled>提交完成</el-button>
      </div>
    </div>
    <!-- 展示已认证的用户信息 -->
    <div class="modify_title" v-show="Hang==1">
      <mt-header fixed title="个人信息">
        <router-link to="/Publicfore" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="modify">已认证页面，可以修改信息</div>
      <div class="messagul">
        <ul>
          <li>姓名：{{information.name}}</li>
          <li>手机：{{information.mobile}}</li>
          <li>邮箱：{{information.email}}</li>
          <li>客户类型：{{information.customerTypeName}}</li>
          <li>证件类型：{{information.certificateTypeName}}</li>
          <li>证件号：{{information.certificateNo}}</li>
        </ul>
        <ul v-if="mechanism">
          <li>机构名称：{{information.mechanismName}}</li>
          <li>机构证件类型：{{information.mechanismCertificateTypeName}}</li>
          <li>机构证件号码：{{information.mechanismCertificateNo}}</li>
        </ul>
      </div>
    </div>
    <!-- 用户点击返回按钮，操作未完成提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="80%"
      center
    >
      <span>实名认证流程还未走完，确定返回吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dssy">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 完成信息提交 -->
    <el-dialog title="提示" :visible.sync="centerDialog" :append-to-body="true" width="80%" center>
      <span>信息正在审核中，请耐心等待...</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="plays">确 认</el-button>
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
      active: 0, // 步骤条
      isShow: 0, //下一步跟完成提交两个按钮的切换
      radio: "", //单选框
      nameForm: {
        //补充信息
        name: "", //真实姓名
        certi: "", //证件类型
        ber: "", //证件号码
        mechanismName: "", //机构名称
        mechanismCertificateType: "", //机构证件类型
        mechanismCertificateNo: "" //机构证件号码
      },
      mechanism:false,//用户类型为机构类型
      getswithy:true,//进入页面时，获取验证码功能
      getGun:false,//进入页面时，重亲获取功能隐藏
      getHide:true,//获取验证码按钮
      getagain:false,//重新获取验证码按钮
      Hang: 0, //认证页面跟完成认证页面
      dofig: "", //本地保存的数据
      checkList: [], //协议资料阅读与确认
      fill: 1, //填写信息、补充信息、确认完成3个页面的切换
      ruleForm: {
        //填写信息的内容
        phone: "",
        short: "",
        mail: ""
      },
      getDocument:[],//用户证件类型
      Customer:[],//用户类型，个人、机构、产品
      Business:[],//机构证件类型，如营业执照
      rules: {
        //form表单的输入提示
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        short: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 6 个字符", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
        ]
      },
      ruForm: {
        name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 1, message: "长度最小 2 个字符", trigger: "blur" }
        ],
        certi: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        ber: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          { min: 1, message: "长度最小 18 个字符", trigger: "blur" }
        ],
        mechanismName: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          { min: 1, message: "长度最小 18 个字符", trigger: "blur" }
        ],
        mechanismCertificateType: [
          { required: true, message: "请输入证件号", trigger: "change" }
        ],
        mechanismCertificateNo: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          { min: 1, message: "长度最小 18 个字符", trigger: "blur" }
        ]
      },
      centerDialogVisible: false, //提示弹窗
      centerDialog: false,
      retNo: true,
      retGo: false,
      information: {},
      mechanismName: false //机构input
    };
  },
  computed: {
    // 判断填写信息页面还是补充信息页面,用于输入框的判断，输入框留空时不能下一步；
    Ref() {
      return this.fill == 2 ? "nameForm" : "ruleForm";
    }
  },
  methods: {
    Ret() {
      //点击返回按钮
      this.centerDialogVisible = true;
    },
    dssy() {
      //弹窗确定返回按钮
      this.$router.push({ path: "/Publicfore" });
    },
    plays() {
      //信息已提交，确定耐心等待按钮
      this.Hang=1;
      this.centerDialog=false
      this.getPersonal()
    },
    next(Ref) {
      if (
        this.checkList != "" &&
        this.checkList.length > 1 &&
        this.radio != ""
      ) {
        this.$refs[this.Ref].validate(valid => {
          if (valid) {
            if (this.active++ > 0) {
              //认证完成页面
              this.fill = 3;
              this.isShow = 1; //完成按钮
            } else if (this.active == 1 && this.radio == 2) {
              //补充信息页面
              this.mechanismName = true;
              this.fill = 2;
              this.isShow = 0; //下一步按钮
            } else if (this.active == 1) {
              this.fill = 2;
              this.isShow = 0; //下一步按钮
            } else {
              return;
            }
          } else {
            return false;
          }
        });
      } else {
        this.$message("您需要查看勾选协议");
      }
    },
    //  点击完成，实名认证信息提交
    getPhone() {
      //   填写信息
      let servey = {
        customerType: this.radio,
        mobile: this.ruleForm.phone,
        email: this.ruleForm.mail
      };
      ajax.authPost.bind(this)("/api/Information/Account/Save", servey, res => {
        console.log(res);
        if (res.status == 200) {
          this.dofig = res.data.code;
        }
        let feng = this.dofig;
        storage.set("feng", feng);
      });
      if (this.radio == 2) {
        //   补充信息
        let data = {
          name: this.nameForm.name,
          certificateType: this.nameForm.certi,
          certificateNo: this.nameForm.ber,
          mechanismName: this.nameForm.mechanismName,
          mechanismCertificateType: this.nameForm.mechanismCertificateType,
          mechanismCertificateNo: this.nameForm.mechanismCertificateNo
        };
        ajax.authPost.bind(this)(
          "/api/Information/Account/SaveOthers",
          data,
          r => {
            console.log(r);
          }
        );
      } else {
        let data = {
          name: this.nameForm.name,
          certificateType: this.nameForm.certi,
          certificateNo: this.nameForm.ber,
        };
        ajax.authPost.bind(this)(
          "/api/Information/Account/SaveOthers",
          data,
          r => {
            console.log(r);
          }
        );
      }
      // .catch(error => {
      //   console.log(error);
      // });
      this.isShow = 2; //禁用按钮
      this.centerDialog = true; //弹窗
      this.retNo = false; //点击返回
      this.retGo = true; //
    },
    //展示已认证的用户信息
    getPersonal() {
      ajax.authGet.bind(this)("/api/Information/Account/GetByOpenId", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.information = res.data.data;
          var listaktion = this.information;
          storage.set("listaktion", listaktion);
        }
      });
    },
    //获取验证码
    getShort() {
      this.getHide=false;
      this.$refs.countDown.start();
      ajax.authPost.bind(this)("/api/Information/Account/Save/Sms", res => {
        console.log(res);
      });
    },
    //重新获取验证码
     reset() {
       this.getagain=false;//重新获取验证码
      this.$refs.countDown.reset();
      ajax.authPost.bind(this)("/api/Information/Account/Save/Sms", res => {
        console.log(res);
      });
    },
    //倒计时结束的回调
    finished() {
      this.getagain=true;//重新获取验证码按钮
      this.getHide=false;//获取验证码按钮
      this.getswithy=false;//进入页面时，获取验证码功能
      this.getGun=true;//进入页面时，重新获取验证码功能
    },
    // 用户类型个人、机构还是产品
    getCustomer(){
      ajax.authGet.bind(this)('/api/Common/6',res=>{
        // console.log(res)
        if(res.data.code==200){
          this.Customer=res.data.data
        }
      });
      //用户证件类型
      ajax.authGet.bind(this)('/api/Common/1',res=>{
        // console.log(res)
        if(res.data.code == 200){
          this.getDocument=res.data.data
        }
      });
      //机构证件类型
      ajax.authGet.bind(this)('/api/Common/11',res=>{
        // console.log(res)
        if(res.data.code==200){
          this.Business=res.data.data
        }
      });
    }
  },
  mounted() {
    let lisee = storage.get("feng");
    if (lisee) {
      this.Hang = 1;
      this.getPersonal();
    };
    //判断用户认证的时候选择的是‘个人’‘机构’‘产品’,如果选择的不是机构，那就隐藏。
    if(this.radio === 2){
      this.mechanism=true
    }
    this.getCustomer();
  }
};
</script>

<style lang="less">
.Authentitle {
  margin-top: 50px;
  .Authencenter {
    margin: 20px 0;
    .Authenradio {
      padding: 0 0 20px 10px;
    }
    /deep/.el-radio-group {
      width: 95%;
      margin: 0 10px;
      /deep/.el-checkbox__label {
        font-size: 12px;
        padding: 0;
      }
    }
    .el-input {
      height: 42px;
    }
    .phoneShort {
      position: relative;
      .buttonShort {
        height: 39px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
      }
      /deep/.van-count-down{
        width: 98px;
        height: 40px;
        line-height: 40px; 
        text-align: center;
        border: 1px solid #DCDFE6;      
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .goods {
    width: 100%;
    height: 400px;
    text-align: center;
    line-height: 400px;
  }
  .buttommagin {
    /deep/.el-button--primary.is-plain {
      width: 95%;
      margin: 0 10px;
    }
    .el-button--primary {
      width: 95%;
      margin: 0 10px;
    }
  }
  .el-form-item__content {
    width: 75%;
  }
  .el-form-item__label {
    padding: 0;
  }
}
.modify_title {
  margin-top: 50px;
  .modify {
    text-align: center;
  }
  .messagul{
    padding: 0 10px;
  }
}
// .el-select-dropdown{
//     top: 215px !important;
//   }
.el-input__suffix {
  height: 73% !important;
}
/deep/.el-popper{
      margin-top: 0;
    }
</style>
