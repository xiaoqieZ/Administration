<template>
  <div class="large_title">
    <mt-header fixed title="风险确认">
      <router-link to="/Publicthree/Purchases" slot="left">
        <mt-button icon="back" @click="fanh">返回</mt-button>
      </router-link>
    </mt-header>
    <div style="display: block;padding-top:50px">
      <div class="title_black">
        <div>请确认以上产品信息及产品风险</div>
        <div class="product_list">{{productData.name}}</div>
        <div class="product_count">
          <div>产品类型</div>
          <div class="lists">{{productData.fundTypeName}}</div>
          <div>风险等级</div>
          <div class="lists">{{productData.riskLevelName}}</div>
        </div>
        <div class="product_level">
          <div>风险揭示及匹配情况</div>
          <div>基金合同</div>
          <div v-if="contractData!=null">
            <a :href="contractData" target="_blank">《【{{contractfileName}}】》</a>
          </div>
          <div>风险揭示书</div>
          <div v-if="contractList!=null">
            <a :href="contractList" target="_blank">《{{contractListfileName}}》</a>
          </div>
          <div @click="centerDi=true" style="color:#409eff">风险匹配通知书</div>
        </div>
      </div>
      <!-- 两个选项框 -->
      <div style="padding-top: 20px;">
        <div class="checkbox_class">
          <el-checkbox v-model="checked" @change="change">投资者声明确认</el-checkbox>
          <el-dialog
            title="投资者声明确认"
            :visible.sync="centerDialogVisible"
            :close-on-click-modal="false"
            :show-close="false"
            width="80%"
            center
          >
            <p>{{topData.content}}</p>
            <div v-for="(item,index) in statementData" :key="item.id">
              <div>
                <el-checkbox
                  v-model="statementData[index].chang"
                  @change="chan($event,item,index)"
                >{{item.content}}</el-checkbox>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="submitRadio">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <el-checkbox v-model="chec">
            本人已仔细阅读贵司的
            <span @click="centerDi=true" style="color:#409eff">《风险匹配通知书》</span>和
            <span>
              <a :href="contractData" target="_blank">《基金合同》</a>
            </span>、
            <span>
              <a :href="contractList" target="_blank">《风险揭示书》</a>
            </span>
            ,以充分知晓并理解贵公司对本人风险承受能力评估及产品、服务风险等级匹配结果，以及拟投资产品的风险情况，本人对该
            <span>
              <a :href="contractData" target="_blank">《基金合同》</a>
            </span>和
            <span>
              <a :href="contractList" target="_blank">《风险揭示书》</a>
            </span>内容没有异议，愿意准守法律、法规及贵司有关规定，通过贵司购买产品或者服务。
            <p>本人承诺，将及时以书面方式如实向贵司通知本人的重大信息变更</p>
            <p>本确认函系本人独立、自主、真实的意思表示。</p>
          </el-checkbox>
        </div>
      </div>
    </div>

    <!-- //购买提示 -->
    <div class="dialog_canvas">
      <el-dialog title="购买提示" :visible.sync="centerDialog" width="100%" center @opened="opened">
        <div>
          <p>重要提示:</p>
          <p>1、本申请的受理并不表示对该申请是否成功确定，申请是否有效应由注册登记机构确认为准，如发生巨额退出，退出款项的支付办法将按产品合同和有关法律法规规定办理。</p>
          <div class="canvas">
            <p>请在下方签字</p>
            <canvas id="canvas" width="320" height="330">Canvas画板</canvas>
            <div>
              <button @click="clear">清除</button>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialog = false">取 消</el-button>
          <el-button type="primary" @click="centerConfirmation">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="buttom">
      <el-button type="primary" @click="quersubmit">确认</el-button>
    </div>
    <el-dialog title="风险匹配通知书" :visible.sync="centerDi" width="80%" center>
      <div>
        <p>尊敬的投资者，您好：</p>
        <p
          style="text-indent:2em"
        >根据您的信息补充问卷，依据相关法律，法规的规定，我司将您认定为普通投资者。结合您填写的风险评测问卷以及其他相关信息，我司对您的风险承受能力进行了综合评估，先得到评估结果如下：</p>
        <p style="text-indent:2em">
          您的风险承受能力为
          <span>{{productData.riskLevelName}}</span>，依据我司的投资者与产品、服务风险等规则，您的风险承受能力等级与我司（产品、服务风险等级）相匹配。
        </p>
        <p style="text-indent:2em">
          我司在此郑重提醒，我司向您销售的产品或提供的服务将以您的风险承受能力等级和投资品种、期限为基础，若您提供的信息发生重大变化，
          您应当及时书面形式通知我司。我司建议您审慎评判自己的风险承受能力，结合自身投资行为，认真填写投资品牌、期限，并根据你投资产品的风险揭示材料做出审慎的投资判断。如同意我司的评估结果，
          并已充分阅读并了解拟投资产品的风险揭示材料，请在以下投资者确认函中进行确认，以示同意。
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDi = false">取 消</el-button>
        <el-button type="primary" @click="centerDi = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ajax from "../../../api/https.js";

var preHandler = function(e) {
  //e.preventDefault();
};
class Draw {
  constructor(el) {
    this.el = el;
    this.canvas = document.getElementById(this.el);
    // this.canvas.width = Math.max(350, window.screen.width - 20);
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
    this.cxt.clearRect(0, 0, 320, 330);
  }
  save() {
    return canvas.toDataURL("image/png");
  }
}
export default {
  data() {
    return {
      id: "",
      checked: false,
      centerDialogVisible: false,
      centerDi: false,
      statementData: [], //获取所有声明
      chang: [],
      RadioList: [],
      chec: false,
      centerDialog: false, //购买提示
      money: "", //金额
      contractData: {},
      productData: {},
      contractCount: "",
      contractList: "",
      topData: {},
      contractfileName: "",
      contractListfileName: "",
      contractData: "",
      contractList: "",
      draw: undefined
    };
  },
  methods: {
    clear() {
      this.draw.clear();
    },
    mutate(word) {
      this.$emit("input", word);
    },
    // 返回按钮，把产品Id返回过去
    fanh() {
      let data = this.id;
      this.$router.push({ path: "/Publicthree/purchases", query: { data } });
    },
    change(e) {
      if (e == true) {
        this.centerDialogVisible = true;
      }
    },
    // 点击选择触发时间
    chan(e, item, index) {
      this.RadioList[index] = { id: item.id };
      //   console.log(this.RadioList);
    },
    //获取所有声明
    getStatement() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Statement/" + this.id,
        res => {
          this.topData = res.data.data.shift();
          this.statementData = res.data.data;
        }
      );
    },
    //获取合同
    getContract() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Contract/" + this.$route.query.data,
        res => {
          this.contractData = res.data.data;
          // this.contractCount =
          //   res.data.data.contractMaterial &&
          //   res.data.data.contractMaterial.fullPath;
          // this.contractList =
          //   res.data.data.othersMaterial1 &&
          //   res.data.data.othersMaterial1.fullPath;

          this.contractData =
            res.data.data.contractMaterial &&
            res.data.data.contractMaterial.fullPath;
          this.contractfileName =
            res.data.data.contractMaterial &&
            res.data.data.contractMaterial.fileName;
          this.contractList =
            res.data.data.riskDisclosureMaterial &&
            res.data.data.riskDisclosureMaterial.fullPath;
          this.contractListfileName =
            res.data.data.riskDisclosureMaterial &&
            res.data.data.riskDisclosureMaterial.fileName;

          if (this.contractfileName) {
            var index = this.contractfileName.lastIndexOf(".");
            this.contractfileName = this.contractfileName.substr(0, index);
          }
          if (this.contractListfileName) {
            var index = this.contractListfileName.lastIndexOf(".");
            this.contractListfileName = this.contractListfileName.substr(
              0,
              index
            );
          }
        }
      );
    },
    //14个单选题点击确定
    submitRadio() {
      var radio = []
      for(var i=0;i<this.RadioList.length;i++){
        if(this.RadioList[i]){
          radio.push(this.RadioList[i])
        }
      }
      if (radio.length == this.statementData.length) {
        this.centerDialogVisible = false;
      } else {
        this.$message("全部要选");
      }
    },
    //取消
    cancel() {
      this.centerDialogVisible = false;
      this.checked = false;
    },
    //弹窗打开后，初始化签名版
    opened() {
      if (!this.draw) {
        //画板
        this.draw = new Draw("canvas");
        this.draw.init();
      }
    },
    //进入金额对话框
    quersubmit() {
      if (this.checked != false && this.chec != false) {
        this.centerDialog = true;
      } else {
        this.$message("请阅读声明并勾选");
      }
    },
    //进入投资者购买信息确认
    centerConfirmation() {
      var list = {
        base64: this.draw.save()
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Apply/Sign/Upload",
        list,
        res => {
          var signMaterialId = res.data.data.id
          let data = {
            id:this.id,
            signMaterialId:signMaterialId
          };
          this.$router.push({
            path: "/Publicthree/Purchases/confirmation",
            query: { data }
          });
        }
      );
    },
    //获取产品基本信息
    getProduct() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Hot/" + this.$route.query.data,
        res => {
          this.productData = res.data.data;
        }
      );
    }
  },
  mounted() {
    this.id = this.$route.query.data;
    this.getStatement();
    this.getContract();
    this.getProduct();
  }
};
</script>
<style lang="less" scoped>
.large_title {
  padding: 0 10px;
  .title_black {
    display: inline;
    text-align: center;
    .product_list {
      font-size: 16px;
      color: red;
      font-weight: 600;
    }
    .product_count {
      .lists {
        font-size: 15px;
        font-weight: 600;
      }
    }
    .product_level {
      .contract {
        color: red;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
  .dialog_canvas {
    /deep/.el-dialog--center {
      height: 100%;
      margin: 0 !important;
    }
  }
  .checkbox_class {
    /deep/.el-dialog__body {
      height: 500px;
      overflow: scroll;
    }
  }
  /deep/.el-checkbox {
    white-space: normal;
    word-break: break-all;
  }
  .canvas {
    #canvas {
      border: 1px solid #9a6c6c;
      background: rgb(253, 252, 252);
      cursor: default;
    }
  }
  .buttom {
    text-align: center;
    padding-top: 53px;
    /deep/.el-button--primary {
      width: 100%;
    }
  }
  /deep/.el-checkbox__label {
    display: inline;
  }
}
</style>