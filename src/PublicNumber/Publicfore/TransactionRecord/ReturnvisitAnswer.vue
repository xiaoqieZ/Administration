<template>
  <div class="title_visit">
    <mt-header fixed title="回访记录">
      <router-link to="/Publicfore/TransactionRecord/Returnvisit" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <div class="visit_title">
        <p>
          尊敬的投资者
          <span style="font-weight:600">{{acountName.name}}</span>,您好！
        </p>
        <p class="content">
          以下内容为您购买的产品：
          <span style="font-weight:600">{{this.$route.query.productName.productName}}</span>的回访确认问卷，请您如实作答：
        </p>
      </div>
      <div class="visit_id" v-for="(item,index) in radioData" :key="item.id">
        <p>{{item.title}}</p>
        <el-radio-group v-model="item.radio">
          <el-radio
            :label="open.score"
            v-for="open in item.options"
            :key="open.id"
            @change="chenge(open,item,index)"
          >{{open.content}}</el-radio>
        </el-radio-group>
      </div>
      <div class="primary">
        <el-button type="primary" @click="submi">提交</el-button>
      </div>
    </div>
    <div class="dialog_canvas" v-if="statusData.isPass==true">
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="100%"
        center
        @opened="opened"
      >
        <span>本次回访有效，请确认提交，我们将尽快为您添加持仓！</span>
        <div class="canvas">
          <p>请在下方签字</p>
          <canvas id="canvas" width="320" height="330">Canvas画板</canvas>
          <div>
            <button @click="clear">清除</button>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialog">确 定</el-button>
          <el-button type="primary" @click="centerDialogVisible=false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="dialog_canvas" v-else>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="100%"
        center
        @opened="opened"
      >
        <span>本次回访验证无效，若继续提交，我们将做无效处理</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialog">确 定</el-button>
          <el-button type="primary" @click="centerDialogVisible=false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
import storage from "../../../api/storage.js";

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
      radio: "",
      radioData: [],
      problem: [],
      centerDialogVisible: false,
      InvestmentName: {},
      visitId: "", //回访Id
      statusData: "",
      acountName: {},
      draw: undefined,
      signMaterialId: ""
    };
  },
  methods: {
    getRadio() {
      //获取单选题目
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/VisitBack/Questionnaire?visitId=" +
          this.$route.query.productName.visitId,
        res => {
          this.radioData = res.data.data;
        }
      );
      // 客户信息
      ajax.authGet.bind(this)("/api/Information/Account", res => {
        this.acountName = res.data.data;
      });
    },
    //选择题答案
    chenge(open, item, index) {
      //   this.problem.splice(0);
      this.problem[index] = {
        itemId: item.id,
        optionId: [open.id]
      };
      // console.log(this.problem)
    },
    //提交回访单
    submi() {
      var b = [];
      for (var i = 0; i < this.problem.length; i++) {
        if (this.problem[i]) {
          b.push(this.problem[i]);
        }
      }
      if (b.length == this.radioData.length) {
        let data = this.problem;
        //验证是否可以提交接口
        ajax.authPost.bind(this)(
          "/api/Information/Present/Product/VisitBack/Validate?visitId=" +
            this.visitId,
          data,
          res => {
            this.centerDialogVisible = true;
            this.statusData = res.data.data;
          }
        );
      } else {
        this.$message("检查是否全部作答");
      }
    },
    //签字版
    clear() {
      this.draw.clear();
    },
    mutate(word) {
      this.$emit("input", word);
    },
    //弹窗打开后，初始化签名版
    opened() {
      if (!this.draw) {
        //画板
        this.draw = new Draw("canvas");
        this.draw.init();
      }
    },
    //确定提交
    centerDialog() {
      var b = [];
      for (var i = 0; i < this.problem.length; i++) {
        if (this.problem[i]) {
          b.push(this.problem[i]);
        }
      }
      if (b.length == this.radioData.length) {
        var list = {
          base64: this.draw.save()
        };
        ajax.authPost.bind(this)(
          "/api/Information/Present/Product/VisitBack/Sign/Upload",
          list,
          res => {
            this.signMaterialId = res.data.data.id;
            let data = {
              visitId: this.visitId,
              answer: this.problem,
              materialId: this.signMaterialId
            };
            //提交接口
            ajax.authPost.bind(this)(
              "/api/Information/Present/Product/VisitBack/Save",
              data,
              res => {
                this.centerDialogVisible = false;
                this.$router.push({
                  path: "/Publicfore/TransactionRecord/Returnvisit"
                });
              }
            );
          }
        );
      } else {
        this.$message("检查是否全部作答");
      }
    },
    go() {
      this.$router.go(-1);
    },
    //拿到本地储存的数据
    getstorage() {
      this.InvestmentName = storage.get("listaktion");
    },
    //获取回访Id
    getvisitid() {
      this.visitId = this.$route.query.productName.visitId;
    }
  },
  mounted() {
    this.getRadio();
    this.getstorage();
    this.getvisitid();
  }
};
</script>
<style lang="less">
.title_visit {
  .visit_title {
    padding: 50px 10px 0 10px;
    .content {
      text-indent: 2em;
    }
  }
  .visit_id {
    padding: 10px;
  }
  .primary {
    padding: 50px 0;
    .el-button--primary {
      width: 100%;
    }
  }
  .dialog_canvas {
    .canvas {
      #canvas {
        border: 1px solid #9a6c6c;
        background: rgb(253, 252, 252);
        cursor: default;
      }
    }
    /deep/.el-dialog--center {
      height: 100%;
      margin: 0 !important;
    }
  }
}
</style>