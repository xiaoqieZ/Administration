<template>
  <div>
    <mt-header fixed title="签署">
      <router-link to="/Publicfore/TransactionRecord/Identification" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="sign_padding">
      <!-- 画板 -->
      <div class="sign_PreviousStep" v-if="VariableData1">
        <div class="PreviousStep_img">
          <p>请在下框内书写签名采用</p>
          <div @click="centerDialogVisible = true">签名</div>
          <div class="hello">
            <canvas id="canvas" width="350" height="230">Canvas画板</canvas>
            <div>
              <button @click="clear">清除</button>
              <button @click="save">确定</button>
            </div>
          </div>
        </div>
        <div class="PreviousStep_button">
          <div class="submi_button">
            <el-button type="primary" @click="NextStepName">下一步</el-button>
          </div>
        </div>
      </div>
      <!-- 确认名称 -->
      <div class="sign_form" v-if="VariableData4">
        <el-form :model="form" v-for="item in factorData" :key="item.id">
          <el-form-item :label="item.confirmationName">
            <el-input v-model="item.factorValue" placeholder="肥的"></el-input>
          </el-form-item>
        </el-form>
        <div class="PreviousStep_button">
          <div class="submi_button">
          <el-button type="primary" @click="NextStep">下一步</el-button>
        </div>
        </div>
      </div>
      <!-- 创建机构印章 -->
      <div v-if="VariableData2">
        <div class="title">创建机构印章</div>
        <el-form :model="mechanismSeal" label-width="80px">
          <el-form-item label="账户标识">
            <el-input v-model="mechanismSeal.identification" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="机构名称">
            <el-input v-model="mechanismSeal.title"></el-input>
          </el-form-item>
          <el-form-item label="印章样例">
            <el-radio-group v-model="mechanismSeal.sealType">
              <el-radio :label="MechanismValue">{{MechanismList}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="横向文">
            <el-input v-model="mechanismSeal.horizontal"></el-input>
          </el-form-item>
          <el-form-item label="下弦文">
            <el-input v-model="mechanismSeal.chord" placeholder="实体章为公安系统防伪编码，此处可不填"></el-input>
          </el-form-item>
          <el-form-item label="印章类型">
            <el-radio-group v-model="mechanismSeal.sealColor">
              <el-radio
                :label="item.value"
                v-for="item in commonData"
                :key="item.value"
              >{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="action"
                :on-success="chengeSothersMaterialId2"
                :file-list="fileImg"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div class="title">创建个人印章</div>
        <el-form :model="legalPersonSeal" label-width="80px">
          <el-form-item label="账户标识">
            <el-input v-model="legalPersonSeal.identification" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="法人名称">
            <el-input v-model="legalPersonSeal.title"></el-input>
          </el-form-item>
          <el-form-item label="印章样例">
            <el-radio-group v-model="legalPersonSeal.sealType">
              <el-radio :label="MechanismValueOne">{{MechanismListOne}}</el-radio>
              <el-radio :label="MechanismValueTow">{{MechanismListTow}}</el-radio>
              <el-radio :label="MechanismValueThree">{{MechanismListThree}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="印章类型">
            <el-radio-group v-model="legalPersonSeal.sealColor">
              <el-radio
                :label="item.value"
                v-for="item in commonData"
                :key="item.value"
              >{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="actions"
                :on-success="chengeSothersMaterialId"
                :file-list="fileImg"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div class="PreviousStep_button">
          <div class="submi_button">
          <el-button type="primary" @click="NextStepForm">下一步</el-button>
          </div>
        </div>
      </div>
      <!-- 合同 -->
      <div class="sign_PreviousStep" v-if="VariableData3">
        <div class="PreviousStep_img">
          <div>
            <span style="font-weight:600;border-bottom:1px solid #26a2ff;">动态合同名称</span>
          </div>
          <p>您总共要签署1处，请确认第1处，已确认0处</p>
          <p>
            当前确认：
            <span>第1处</span>
          </p>
          <el-button type="primary" size="mini">上一页</el-button>
          <el-button type="primary" size="mini">下一页</el-button>
          <div class="embedpdf">
            <embed :src="embedpdf" type="application/pdf" width="100%" height="100%" />
          </div>
        </div>
        <div class="PreviousStep_button">
          <div class="submi_button">
            <el-button type="primary" @click="submi">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";

var draw;
var preHandler = function(e) {
  //e.preventDefault();
};
class Draw {
  constructor(el) {
    this.el = el;
    this.canvas = document.getElementById(this.el);
    this.cxt = this.canvas.getContext("2d");
    this.stage_info = canvas.getBoundingClientRect();
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    };
  }
  init(btn) {
    var that = this;

    this.canvas.addEventListener("touchstart", function(event) {
      document.addEventListener("touchstart", preHandler, false);
      that.drawBegin(event);
    });
    this.canvas.addEventListener("touchend", function(event) {
      document.addEventListener("touchend", preHandler, false);
      that.drawEnd();
    });
    this.canvas.addEventListener("touchmove", function(event) {
      document.addEventListener("touchmove", preHandler, false);
      that.drawing(event);
    });
    this.clear(btn);
  }
  drawBegin(e) {
    var that = this;
    window.getSelection()
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    this.cxt.strokeStyle = "#000";
    this.cxt.beginPath();
    var beginX = e.changedTouches[0].clientX - this.stage_info.left;
    var beginY = e.changedTouches[0].clientY - this.stage_info.top;
    this.cxt.moveTo(beginX, beginY);
    this.path.beginX = beginX;
    this.path.beginY = beginY;
    // console.log(beginX,beginY)
  }
  drawing(e) {
    var beginX = e.changedTouches[0].clientX - this.stage_info.left;
    var beginY = e.changedTouches[0].clientY - this.stage_info.top;
    this.cxt.lineTo(beginX, beginY);
    this.path.endX = beginX;
    this.path.endY = beginY;
    this.cxt.stroke();
    // console.log(beginX,beginY,this.stage_info)
  }
  drawEnd() {
    document.removeEventListener("touchstart", preHandler, false);
    document.removeEventListener("touchend", preHandler, false);
    document.removeEventListener("touchmove", preHandler, false);
    //canvas.ontouchmove = canvas.ontouchend = null
  }
  clear(btn) {
    this.cxt.clearRect(0, 0, 350, 300);
  }
  save() {
    return canvas.toDataURL("image/png");
  }
}
export default {
  data() {
    return {
      centerDialogVisible: false,
      action: ajax.doms.bind(this)(
        "/api/Information/Present/Product/Sign/Mechanism/Upload"
      ),
      actions: ajax.doms.bind(this)(
        "/api/Information/Present/Product/Sign/LegalPerson/Upload"
      ),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      fileImg: [],
      // VariableData: 1,
      form: {
        factorValue: ""
      },
      factorData: [],
      mechanismData: [],
      legalPersonData: [],
      signData: [],
      contractId: [],
      msg: "Welcome to Your Vue.js App",
      val: true,
      url: "",
      confirmationData: [],
      base64Id: "",
      embedpdf: ajax.doms.bind(this)(
        "/api/Information/Present/Product/Sign/File/Confirmation?contractId=" +
          this.$route.query.data.contractId +
          "&buffer=1"
      ),
      commonData: [],
      mechanismSeal: {
        title: "",
        identification: "",
        horizontal: "",
        chord: "",
        sealType: "1",
        sealColor: "1",
        materialId: null
      },
      legalPersonSeal: {
        identification: "",
        title: "",
        sealType: "1",
        sealColor: "1",
        responseId: null
      },
      MechanismList: "", //机构圆形印章
      MechanismValue: "",
      MechanismListOne: "",
      MechanismValueOne: "",
      MechanismListTow: "",
      MechanismValueTow: "",
      MechanismListThree: "",
      MechanismValueThree: "",
      VariableData4: false,
      VariableData2: false,
      VariableData3: false,
      VariableData1: true
    };
  },
  methods: {
    clear() {
      draw.clear();
    },
    mutate(word) {
      this.$emit("input", word);
    },
    //签名确定
    save() {
      var data = draw.save();
      this.url = data.split(",")[1];
      let list = {
        base64: this.url
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Sign/Upload/Base64",
        list,
        res => {
          this.base64Id = res.data.data.id;
          this.$message("签名成功");
        }
      );
    },
    //获取基本要素信息
    getFactor() {
      // 获取基本要素类型的所有确认处
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Sign/Confirmation/Factor?contractId=" +
          this.$route.query.data.contractId,
        res => {
          if (!res.data.data || !res.data.data.length) {
            this.VariableData4 = false;
            this.VariableData2 = true;
          } else {
            for (var i = 0; i < res.data.data.length; i++) {
              var item = res.data.data[i];
              this.factorData.push({
                id: item.id,
                factorValue: "",
                confirmationName: item.confirmationName
              });
            }
          }
        }
      );
      //   获取机构印章类型的所有确认处
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Sign/Confirmation/Mechanism?contractId=" +
          this.$route.query.data.contractId,
        res => {
          this.mechanismData = res.data.data;
          if (res.data.data.length == 0) {
            this.NextStepForm();
          }
        }
      );
      // 获取法人印章类型的所有确认处
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Sign/Confirmation/LegalPerson?contractId=" +
          this.$route.query.data.contractId,
        res => {
          this.legalPersonData = res.data.data;
        }
      );
      //   获取签名处类型的所有确认处
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Sign/Confirmation/Sign?contractId=" +
          this.$route.query.data.contractId,
        res => {
          this.signData = res.data.data;
        }
      );
    },
    //提交
    submi() {
      var factors = [];
      if (this.factorData) {
        for (var i = 0; i < this.factorData.length; i++) {
          factors.push({
            confirmationId: this.factorData[i].id,
            factorValue: this.factorData[i].factorValue
          });
        }
      }
      if (this.mechanismData) {
        for (var i = 0; i < this.mechanismData.length; i++) {
          factors.push({
            confirmationId: this.mechanismData[i].id,
            seal: this.mechanismSeal
          });
        }
      }
      if (this.legalPersonData) {
        for (var i = 0; i < this.legalPersonData.length; i++) {
          factors.push({
            confirmationId: this.legalPersonData[i].id,
            seal: this.legalPersonSeal
          });
        }
      }
      if (this.signData) {
        for (var i = 0; i < this.signData.length; i++) {
          factors.push({
            confirmationId: this.legalPersonData[i].id,
            materialId: this.base64Id
          });
        }
      }
      let data = {
        id: this.$route.query.data.id,
        factors: factors
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Sign/Submit",
        data,
        res => {
          this.$message({ message: res.data.message, type: "success" });
          this.$router.push({
            path: "/Publicfore/TransactionRecord/Identification"
          });
        }
      );
    },
    //上一步
    PreviousStep() {
      this.VariableData4 = true;

      this.VariableData2 = false;
      this.VariableData3 = false;
      this.VariableData1 = false;
    },
    //下一步到确认名
    NextStepName() {
      this.VariableData4 = true;

      this.VariableData2 = false;
      this.VariableData3 = false;
      this.VariableData1 = false;
    },
    //下一步-印章信息填写
    NextStep() {
      this.VariableData2 = true;

      this.VariableData4 = false;
      this.VariableData3 = false;
      this.VariableData1 = false;
      //判断数据是否为空（刚进来是空的），是的话生成两个账户标识，不是的话拿到之前提交的账户标识
      if (this.mechanismSeal.identification == "") {
        this.getGuid();
        this.getGuidTow();
      }
      //印章类型
      ajax.authGet.bind(this)("/api/Common/30", res => {
        this.commonData = res.data.data;
      });
      //印章样例单选
      ajax.authGet.bind(this)("/api/Common/29", res => {
        this.MechanismData = res.data.data;
        for (var i = 0; i < this.MechanismData.length; i++) {
          this.MechanismList = this.MechanismData[0].text;
          this.MechanismValue = this.MechanismData[0].value;
          this.MechanismListOne = this.MechanismData[1].text;
          this.MechanismValueOne = this.MechanismData[1].value;
          this.MechanismListTow = this.MechanismData[2].text;
          this.MechanismValueTow = this.MechanismData[2].value;
          this.MechanismListThree = this.MechanismData[3].text;
          this.MechanismValueThree = this.MechanismData[3].value;
        }
      });
    },
    //下一步-到PDF
    NextStepForm() {
      this.VariableData3 = true;

      this.VariableData4 = false;
      this.VariableData2 = false;
      this.VariableData1 = false;
    },
    //下一步-签字画押
    NextStepImg() {
      this.VariableData1 = true;

      this.VariableData4 = false;
      this.VariableData2 = false;
      this.VariableData3 = false;
    },
    //上传机构印章成功回调
    chengeSothersMaterialId2(response, file, fileList) {
      this.legalPersonSeal.responseId = response.data.id;
      // console.log(response.data.id);
    },
    //上传个人印章成功回调
    chengeSothersMaterialId(response, file, fileList) {
      this.mechanismSeal.materialId = response.data.id;
      // console.log(this.materialId);
    },
    //机构账户标识
    getGuid() {
      ajax.authGet.bind(this)("/api/Common/Guid", res => {
        this.mechanismSeal.identification = res.data.data;
      });
    },
    //法人账户标识
    getGuidTow() {
      ajax.authGet.bind(this)("/api/Common/Guid", res => {
        this.legalPersonSeal.identification = res.data.data;
      });
    }
  },
  mounted() {
    this.getFactor();
    //画板
    draw = new Draw("canvas");
    draw.init();
  }
};
</script>

<style lang='less' scoped>
.sign_padding {
  padding: 50px 10px 60px 10px;
  .sign_form {
    .sign_button {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 400px;
      /deep/.el-button--primary {
        width: 100%;
      }
    }
  }
  .title {
    height: 60px;
    line-height: 60px;
    font-weight: 600;
    text-align: center;
  }
  .sign_PreviousStep {
    .PreviousStep_img {
      text-align: center;
    }
  }
  .PreviousStep_button {
    .submi_button {
      text-align: center;
      padding-top: 50px;
      /deep/.el-button--primary {
        width: 100%;
      }
    }
  }
}
#canvas {
  width: 100%;
  height: 100%;
  border: 1px solid #9a6c6c;
  background: rgb(253, 252, 252);
  cursor: default;
}
#keyword-box {
  margin: 10px 0;
}
.embedpdf {
  width: 100%;
  height: 600px;
}
</style>
