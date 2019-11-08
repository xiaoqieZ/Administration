<template>
  <div>
    <mt-header fixed title="签署">
      <router-link to="/Publicfore/TransactionRecord/Identification" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="sign_padding">
      <!-- 画板 -->
      <div class="sign_PreviousStep" v-show="VariableData1">
        <div class="PreviousStep_img" v-show="signData.length>0">
          <p>请在下框内书写签名采用</p>
          <div @click="centerDialogVisible = true">签名</div>
          <div class="hello">
            <canvas id="canvas" width="350" height="230">Canvas画板</canvas>
            <div>
              <button @click="clear">清除</button>
            </div>
          </div>
        </div>
        <div class="PreviousStep_button">
          <div class="submi_button">
            <el-button type="primary" :loading="loading" @click="submi">提交</el-button>
          </div>
        </div>
      </div>
      <!-- 确认名称 -->
      <div class="sign_form" v-show="VariableData4">
        <el-form :model="form" v-for="item in factorData" :key="item.id">
          <el-form-item :label="item.confirmationName">
            <el-input v-model="item.factorValue" placeholder="肥的"></el-input>
          </el-form-item>
        </el-form>
        <div class="PreviousStep_button">
          <div class="submi_button">
            <el-button type="primary" @click="moveStep(2)">下一步</el-button>
          </div>
        </div>
      </div>
      <!-- 创建机构印章 -->
      <div v-show="VariableData2">
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
                ref="upload1"
                :action="action"
                :on-success="chengeSothersMaterialId2"
                :on-error="upError1"
                :on-change="handleChange"
                :file-list="fileImg1"
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
                ref="upload2"
                :action="actions"
                :on-success="chengeSothersMaterialId"
                :on-error="upError2"
                :on-change="handleChange"
                :file-list="fileImg2"
                :headers="access_token"
              >
                <el-button size="small" type="primary">点击上传文件</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div class="PreviousStep_button">
          <div class="submi_button">
            <el-button type="primary" @click="moveStep(3)">下一步</el-button>
          </div>
        </div>
      </div>
      <!-- 合同 -->
      <div class="sign_PreviousStep" v-show="VariableData3">
        <div class="PreviousStep_img">
          <p>
            您总共要签署
            <span style="color:red">{{confirmationData.length}}</span>处，已确认
            <span>{{hasConfirmationData.length}}</span>处
          </p>
          <p>
            当前确认：
            第
            <span>{{num+1}}</span>处
          </p>
          <el-button type="primary" size="mini" @click="topPage">上一处</el-button>
          <el-button :type="primary" size="mini" @click="determine">确认</el-button>
          <el-button type="primary" size="mini" @click="bottomPage">下一处</el-button>
          <div class="embedpdf">
            <!-- <embed :src="embedpdf" type="application/pdf" width="100%" height="100%" /> -->
            <iframe :src="'static/pdf/web/viewer.html?file='+embedpdf" width="100%" height="100%"></iframe>
          </div>
        </div>
        <div
          class="PreviousStep_button"
          v-show="confirmationData.length==hasConfirmationData.length"
        >
          <div class="submi_button">
            <el-button type="primary" @click="moveStep(1)">下一步</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
(function() {
  var touchSet = undefined;

  if (!touchSet) {
    touchSet = function(e) {
      e.preventDefault();
    };
    window.touchSet = touchSet;
  }
})();

var preHandler = function(e) {
  //e.preventDefault();
};
class Draw {
  constructor(el) {
    this.el = el;
    this.canvas = document.getElementById(this.el);
    //this.canvas.width = window.screen.width - 20;
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
    // console.log(this);

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
    var beginX = e.changedTouches[0].clientX - this.canvas.offsetLeft;
    var beginY = e.changedTouches[0].clientY - this.canvas.offsetTop;
    this.cxt.moveTo(beginX, beginY);
    this.path.beginX = beginX;
    this.path.beginY = beginY;
    // console.log(beginX,beginY);
    // console.log(e,this)
    // console.log(beginX,beginY)
  }
  drawing(e) {
    var beginX = e.changedTouches[0].clientX - this.canvas.offsetLeft;
    var beginY = e.changedTouches[0].clientY - this.canvas.offsetTop;
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
    this.cxt.clearRect(0, 0, 360, 300);
  }
  save() {
    return canvas.toDataURL("image/png");
  }
}
export default {
  data() {
    return {
      draw: undefined,
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
      fileImg1: [],
      fileImg2: [],
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
      base64Id: "",
      embedpdf: encodeURIComponent(
        ajax.doms.bind(this)(
          "/api/Information/Present/Product/Sign/File/Confirmation?contractId=" +
            this.$route.query.data.contractId +
            "&buffer=1&.pdf"
        )
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
        sealType: "2",
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
      VariableData1: false,
      VariableData2: false,
      VariableData3: false,
      VariableData4: true,
      accountData: {},
      confirmationData: [],
      hasConfirmationData: [],
      num: 0,
      previousStepbuttom: false,
      loading:false,
      primary:"primary",
    };
  },
  methods: {
    upError1(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles1();
    },
    upError2(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles2();
    },
    //下一页
    bottomPage() {
      this.num = this.num || 0;
      this.num += 1;
      this.num = Math.min(this.confirmationData.length - 1, this.num);
      this.changeColor();

      var p = document.getElementById("pageNumber");
      if (p) {
        p.value = this.num + "";
      }
    },
    // 上一页
    topPage() {
      this.num = this.num || 0;
      this.num -= 1;
      this.num = Math.max(0, this.num);
      this.changeColor();

      var p = document.getElementById("pageNumber");
      if (p) {
        p.value = this.num + "";
      }
    },
    //确定合同
    determine() {
      this.num = this.num || 0;
      var item =
        this.confirmationData.length > this.num
          ? this.confirmationData[this.num]
          : null;
      if (item) {
        var id = item.id;
        if (this.hasConfirmationData.indexOf(id) + 1) {
          return;
        }

        this.hasConfirmationData.push(id);
      }
      if (this.confirmationData.length == this.hasConfirmationData.length) {
        this.previousStepbuttom = true;
      }

      this.changeColor();
    },
    //已经确认的地方，确认按钮换成灰色样式
    changeColor(){
      var item =
        this.confirmationData.length > this.num
          ? this.confirmationData[this.num]
          : null;
          if(item){
            if(this.hasConfirmationData.indexOf(item.id) + 1){
              this.primary="info"
            }else{
              this.primary="primary";
            }
          }
    },
    clear() {
      this.draw.clear();
    },
    mutate(word) {
      this.$emit("input", word);
    },
    moveStep(num) {
      if (num == 1) {
        //签名

        //   获取签名处类型的所有确认处
        ajax.authGet.bind(this)(
          "/api/Information/Present/Product/Sign/Confirmation/Sign?contractId=" +
            this.$route.query.data.contractId,
          res => {
            this.signData = res.data.data;

            this.VariableData1 = true;
            this.VariableData2 = false;
            this.VariableData3 = false;
            this.VariableData4 = false;

            if (!this.draw) {
              //画板
              this.draw = new Draw("canvas");
              this.draw.init();
            }
            //禁止滑动
            document.body.addEventListener("touchmove", window.touchSet, {
              passive: false
            });
          }
        );
      } else if (num == 2) {
        //机构印章

        if (this.accountData.customerType == 2) {
          //   获取机构印章类型的所有确认处
          ajax.authGet.bind(this)(
            "/api/Information/Present/Product/Sign/Confirmation/Mechanism?contractId=" +
              this.$route.query.data.contractId,
            res => {
              this.mechanismData = res.data.data;

              this.VariableData1 = false;
              this.VariableData2 = true;
              this.VariableData3 = false;
              this.VariableData4 = false;

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
        } else {
          this.moveStep(3);
        }
      } else if (num == 3) {
        //合同
        this.VariableData1 = false;
        this.VariableData2 = false;
        this.VariableData3 = true;
        this.VariableData4 = false;
        ajax.authGet.bind(this)(
          "/api/Information/Present/Product/Sign/Confirmation?contractId=" +
            this.$route.query.data.contractId,
          res => {
            this.confirmationData = res.data.data;
          }
        );
      } else if (num == 4) {
        //基本要素

        // 获取基本要素类型的所有确认处
        ajax.authGet.bind(this)(
          "/api/Information/Present/Product/Sign/Confirmation/Factor?contractId=" +
            this.$route.query.data.contractId,
          res => {
            if (!res.data.data || !res.data.data.length) {
              this.moveStep(2);
            } else {
              for (var i = 0; i < res.data.data.length; i++) {
                var item = res.data.data[i];
                this.factorData.push({
                  id: item.id,
                  factorValue: "",
                  confirmationName: item.confirmationName
                });
              }

              this.VariableData1 = false;
              this.VariableData2 = false;
              this.VariableData3 = false;
              this.VariableData4 = true;
            }
          }
        );
      }

      if (window.touchSet) {
        document.body.removeEventListener("touchmove", window.touchSet);
      }
    },

    //提交
    submi() {
      this.loading=true;
      var data = this.draw.save();
      this.url = data.split(",")[1];
      let list = {
        base64: this.url
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Sign/Upload/Base64",
        list,
        res => {
          this.base64Id = res.data.data.id;
          //this.$message("签名成功");

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
              if (this.accountData.customerType == 2) {
                factors.push({
                  confirmationId: this.mechanismData[i].id,
                  seal: this.mechanismSeal
                });
              } else {
                factors.push({
                  confirmationId: this.mechanismData[i].id
                });
              }
            }
          }
          if (this.legalPersonData) {
            for (var i = 0; i < this.legalPersonData.length; i++) {
              if (this.accountData.customerType == 2) {
                factors.push({
                  confirmationId: this.legalPersonData[i].id,
                  seal: this.legalPersonSeal
                });
              } else {
                factors.push({
                  confirmationId: this.legalPersonData[i].id
                });
              }
            }
          }
          if (this.signData) {
            for (var i = 0; i < this.signData.length; i++) {
              factors.push({
                confirmationId: this.signData[i].id,
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
              this.loading=false;
              if (res.data.code == 200) {
                if (window.touchSet) {
                  document.body.removeEventListener(
                    "touchmove",
                    window.touchSet
                  );
                }
                this.$message({ message: res.data.message, type: "success" });
                this.$router.push({
                  path: "/Publicfore/TransactionRecord/Identification"
                });
              } else {
                this.$message({ message: res.data.message });
              }
            }
          );
        }
      );
    },
    //文件上传个数
    handleChange(file, fileList) {
      this.fileList = fileList.length > 1 ? fileList.splice(0, 1) : fileList;
    },
    //客户类别
    getAccount() {
      ajax.authGet.bind(this)("/api/Information/Account", res => {
        this.accountData = res.data.data;
        this.moveStep(4);
      });
    },
    //上传机构印章成功回调
    chengeSothersMaterialId2(response, file, fileList) {
      this.legalPersonSeal.responseId = ajax.getMaterialId.bind(this)(
        response,
        () => {
          //还原
          this.clearFiles1();
        }
      );
    },
    //移除/还原文件列表
    clearFiles1() {
      this.$refs["upload1"].clearFiles();
    },
    clearFiles2() {
      this.$refs["upload2"].clearFiles();
    },
    //上传个人印章成功回调
    chengeSothersMaterialId(response, file, fileList) {
      this.mechanismSeal.materialId = ajax.getMaterialId.bind(this)(
        response,
        () => {
          //还原
          this.clearFiles();
        }
      );
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
    this.getAccount();
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
    width: 95%;
    position: fixed;
    bottom: 0;
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
