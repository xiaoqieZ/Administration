<template>
  <div>
    <div class="button">
      <el-button @click="returnUpper" type="primary" plain icon="el-icon-d-arrow-left">基金合同</el-button>&nbsp;&nbsp;
      <p>合同盖章</p>
    </div>
    <div class="fit">
      <div class="pian">
        <div class="Previous_page">
          <span @click="previousPage">上一页</span>
          <span>{{pageIndex}}</span>
          <span @click="nextPage">下一页</span>
          <p style="text-align: center;">总共{{contractData.pageCount}}页</p>
        </div>
        <div class="main" id="main" ref="main">
          <!-- <div ref="test" id="seal" class="seal"></div> -->
          <img :src="pageData" alt />
        </div>
      </div>
      <div class="rigth">
        <div class="rigth_title">拖拽设置</div>
        <p class="rigth_p">合同的所有确认处</p>
        <div>
          <el-button @click="addS">添加</el-button>
          <el-select v-model="score" @change="deop">
            <el-option
              :label="item.confirmationTypeName+'-'+item.confirmationName"
              :value="item.id"
              v-for="item in confirmationData"
              :key="item.id"
            ></el-option>
          </el-select>
        </div>
        <!-- 添加 -->
        <div v-show="addSeal">
          <el-form :model="form">
            <el-form-item>
              <el-input v-model="form.confirmationName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.confirmationTypeName" @change="dropDown">
                <el-option
                  :label="item.text"
                  :value="Number(item.value)"
                  v-for="item in countData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="button_submi">
            <el-button type="primary" @click="submi">保存添加</el-button>
            <el-button @click="addSeal=false">取 消</el-button>
          </div>
        </div>
        <!-- //编辑 -->
        <div v-show="add">
          <el-form :model="ConfirmationData">
            <el-form-item>
              <el-input v-model="ConfirmationData.confirmationName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="ConfirmationData.confirmationType" @change="dropD">
                <el-option
                  :label="item.text"
                  :value="Number(item.value)"
                  v-for="item in countData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="button_submi">
            <el-button type="primary" @click="addSubmi">确认盖章</el-button>
            <el-button @click="add=false">取 消</el-button>
          </div>
          <!-- <div ref="test" id="seal" class="seal"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      contractData: {},
      addSeal: false,
      aft: false,
      form: {
        confirmationName: "",
        confirmationTypeName: ""
      },
      ConfirmationData: {
        confirmationName: "",
        confirmationType: ""
      },
      score: "",
      add: false,
      isDown: false,
      width: 0,
      height: 0,
      countData: [],
      isDownss: false,
      widthss: 0,
      heightss: 0,
      t1: "",
      t2: "",
      t3: "",
      confirmationData: [],
      messageData: {},
      imgData: "",
      pageIndex: 1,
      pageData: "",
      isShow: true,
      ConfirmationData: {},
      draggable: function() {}
    };
  },
  methods: {
    //返回
    returnUpper() {
      this.$router.go(-1);
    },
    //获取下拉数据
    getCount() {
      ajax.authGet.bind(this)("/api/Common/32", res => {
        this.countData = res.data.data;
      });
    },
    //下拉选中
    deop() {
      this.add = true;
      this.addSeal = false;
      ajax.authGet.bind(this)(
        "/api/Management/Contract/Confirmation/" + this.score,
        res => {
          this.ConfirmationData = res.data.data;
        }
      );
    },
    //添加
    addS() {
      this.addSeal = true;
      this.add = false;
    },
    //添加处的下拉选中
    dropDown() {
      this.t1.bind(document.querySelector("#seal"));
      this.imgData = ajax.doms(
        "/api/Management/Contract/Confirmation/Seal?name=" +
          this.form.confirmationName +
          "&confirmationType=" +
          this.form.confirmationTypeName +
          "&contractId=" +
          this.$route.query.data.id +
          ""
      );
    },
    //编辑处的下拉选中
    dropD() {
      //this.t1.bind(document.querySelector("#seal"));
      this.imgData = ajax.doms(
        "/api/Management/Contract/Confirmation/Seal?name=" +
          this.ConfirmationData.confirmationName +
          "&confirmationType=" +
          this.ConfirmationData.confirmationType +
          "&contractId=" +
          this.$route.query.data.id +
          ""
      );

      var div = document.createElement("div");
      //动态生成图
      var img = document.createElement("img");
      var now = new Date();
      var nowString =
        "" +
        now.getFullYear() +
        now.getMonth() +
        now.getDate() +
        now.getHours() +
        now.getMinutes() +
        now.getSeconds() +
        now.getMilliseconds();
      div.id = "seal" + nowString + Math.floor(Math.random() * 100000);
      div.className = "seal";
      div.style.position="absolute"
      div.style.top="0"
      img.src = this.imgData;
      div.appendChild(img);
      this.$refs.main.appendChild(div);
      var newDiv = document.querySelector(div.id);
      this.draggable.call(div).bind.call(div);
    },
    // 添加提交
    submi() {
      let data = {
        id: 0,
        contractId: this.$route.query.data.id,
        pageIndex: this.pageIndex,
        pointX: this.t1.getWidth() / 749,
        pointY: this.t1.getHeight() / 1123,
        confirmationName: this.form.confirmationName,
        confirmationType: this.form.confirmationTypeName
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Confirmation",
        data,
        res => {
          this.getPage();
          this.getConfirmation();
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.add = false;
          this.form.confirmationType = this.form.confirmationType = "";
        }
      );
    },
    //编辑提交
    addSubmi() {
      console.log(this.t1.getWidth() / 749, this.t1.getHeight() / 1123);
      console.log(this.t1.getWidth(), this.t1.getHeight());
      return;
      let data = {
        id: this.score,
        contractId: this.$route.query.data.id,
        pageIndex: this.pageIndex,
        pointX: this.t1.getWidth() / 749,
        pointY: this.t1.getHeight() / 1123,
        confirmationName: this.ConfirmationData.confirmationName,
        confirmationType: this.ConfirmationData.confirmationType
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Confirmation",
        data,
        res => {
          this.getPage();
          this.getConfirmation();
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.addSeal = false;
        }
      );
    },
    //获取大图
    getPage() {
      ajax.authGet.bind(this)(
        "/api/Management/Contract/Java/Page/" +
          this.$route.query.data.id +
          "?pageIndex=" +
          this.pageIndex,
        res => {
          this.pageData = res.data.data;
        }
      );
      //获取合同总页数
      ajax.authGet.bind(this)(
        "/api/Management/Contract/" + this.$route.query.data.id,
        res => {
          this.contractData = res.data.data;
        }
      );
    },
    //获取合同的所有确认处
    getConfirmation() {
      ajax.authGet.bind(this)(
        "/api/Management/Contract/Confirmation?contractId=" +
          this.$route.query.data.id,
        res => {
          this.confirmationData = res.data.data;
        }
      );
    },
    //上一页
    previousPage() {
      if (this.pageIndex > 1) {
        this.pageIndex -= 1;
        this.getPage();
      }
    },
    //下一页
    nextPage() {
      if (this.contractData.pageCount > this.pageIndex) {
        this.pageIndex += 1;
        this.getPage();
      }
    }
  },
  mounted() {
    this.getConfirmation();
    this.getPage();
    this.messageData = this.$route.query.data;
    this.getCount(); //下拉，合同确认类型

    var draggable = (function() {
      var target = undefined;
      var x = 0;
      var y = 0;
      var left = 0;
      var top = 0;
      var isDown = false;
      var position = {};
      var bindTarget = undefined;

      var onmousedown = function(e) {
        if (bindTarget != this.id) {
          return;
          target = undefined;
        }

        target = this;
        // 获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;
        // 获取左部和顶部的偏移量
        left = target.offsetLeft;
        top = target.offsetTop;
        // 开关打开
        isDown = true;
        // 设置样式
        target.style.cursor = "move";
      };
      // 鼠标抬起事件
      var onmouseup = function() {
        if (!target) return;
        // 开关关闭
        isDown = false;
        target.style.cursor = "default";
        target = undefined;
      };
      // 鼠标移动
      window.onmousemove = function(e) {
        if (isDown === false || !target) {
          return;
        }
        // 获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        // 计算移动后的左偏移量和顶部的偏移量
        var width = nx - (x - left);
        var height = ny - (y - top);
        position[target.id] = {
          width: width,
          height: height
        };
        // console.log(width,height)
        target.style.left = width + "px";
        target.style.top = height + "px";
      };
      return function() {
        if (!position[this.id]) {
          this.onmousedown = onmousedown;
          this.onmouseup = onmouseup;
          position[this.id] = {
            width: 0,
            height: 0
          };
        }

        return {
          getWidth: function() {
            return position[this.id] ? position[this.id].width || 0 : 0;
          }.bind(this),
          getHeight: function() {
            return position[this.id] ? position[this.id].height || 0 : 0;
          }.bind(this),
          SetWidth: function(t) {
            position[this.id] = position[this.id] || {};
            position[this.id].width = t;
            target.style.left = width + "px";
          }.bind(this),
          SetHeight: function(t) {
            position[this.id] = position[this.id] || {};
            position[this.id].height = t;
            target.style.tp = height + "px";
          }.bind(this),
          bind: function() {
            console.log(this);
            bindTarget = this.id;
          }.bind(this),
          reset: function() {
            bindTarget = undefined;
            target = undefined;
          }.bind(this)
        };
      };
    })();
    this.draggable = draggable;
    //this.t1 = draggable.call(document.querySelector("#seal"));
  }
};
</script>

<style lang="less" scoped>
.button {
  height: 56px;
  background: #fff;
  line-height: 56px;
  display: flex;
  align-items: center;
}
.fit {
  height: 600px;
  overflow: scroll;
  margin-top: 30px;
  display: flex;
  .Previous_page {
    padding-right: 20px;
  }
  .pian {
    .main {
      position: relative;
      width: 749px;
      height: 1123px;
      border: 1px solid;
      img {
        width: 100%;
        height: 100%;
      }
      .seal {
        text-align: center;
        position: absolute;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .rigth {
    margin-left: 30px;
    border-right: 1px solid;
    .rigth_title {
      text-align: center;
      color: rgb(91, 163, 247);
      background-color: rgb(214, 208, 210);
    }
    .rigth_p {
      height: 30px;
      line-height: 30px;
    }
    /deep/.el-input__suffix {
      height: 75%;
    }
  }
}
@media screen and (min-width: 1620px) {
  .fit {
    height: 700px;
  }
}
@media screen and (max-width: 1620px) {
  .fit {
    height: 580px;
  }
}
</style>