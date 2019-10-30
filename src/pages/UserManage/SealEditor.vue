<template>
  <div>
    <div class="button">
      <el-button @click="returnUpper" type="primary" plain icon="el-icon-d-arrow-left">基金合同</el-button>&nbsp;&nbsp;
      <p>合同盖章</p>
    </div>
    <div class="fit">
      <div class="pian">
        <div class="Previous_page">
          <el-button size="mini" type="success" @click="previousPage">上一页</el-button>
          <span>{{pageIndex}}页</span>
          <el-button size="mini" type="success" @click="nextPage">下一页</el-button>
          <div class="jump">
            <div style="text-align: center;">总共{{contractData.pageCount}}页</div>
            <div style="line-height: 60px;width: 60px;">
              <el-input v-model="jumpPage" placeholder="跳转到合同页" @keyup.enter.native="sureSearch"></el-input>
            </div>
          </div>
        </div>
        <div class="main" id="main" ref="main">
          <!-- <div ref="test" id="seal" class="seal"></div> -->
          <img :src="pageData" alt />
        </div>
        <div class="Previous_page">
          <el-button size="mini" type="success" @click="previousPage">上一页</el-button>
          <span>{{pageIndex}}</span>
          <el-button size="mini" type="success" @click="nextPage">下一页</el-button>
          <p style="text-align: center;">总共{{contractData.pageCount}}页</p>
        </div>
      </div>
      <div class="rigth">
        <div class="rigth_title">拖拽设置</div>
        <p class="rigth_p">合同的所有确认处</p>
        <div>
          <el-button @click="addS">添加</el-button>
          <el-select v-model="score" @change="deop">
            <el-option
              :label="item.confirmationTypeName+'-'+item.confirmationName+'(第'+item.pageIndex+'页)'"
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
            <el-button type="danger" @click="delSubmi">删 除</el-button>
            <el-button type="primary" @click="addSubmi">提 交</el-button>
          </div>
          <!-- <div ref="test" id="seal" class="seal"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import ajax from "../../api/https.js";
//import func from "../../../vue-temp/vue-editor-bridge";
export default {
  data() {
    return {
      jumpPage: 1,
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
      draggable: function() {},
      allDragger: {} //所有
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
          var id = this.ConfirmationData.id + "";
          var drag = this.allDragger[id];
          if (drag) {
            for (var i in this.allDragger) {
              var div1 = document.getElementById("seal" + i);
              if (div1 && this.allDragger[i]) {
                this.allDragger[i].bind.call(div1);
                this.allDragger[i].low();
                drag.reset();
              }
            }

            var div = document.getElementById("seal" + id);
            drag.bind.call(div);
            drag.setVisible(true);
            drag.top();
          }
        }
      );
    },
    //添加
    addS() {
      this.addSeal = true;
      this.add = false;
    },
    //添加处的下拉选中
    dropDown() {},
    //编辑处的下拉选中
    dropD() {
      var id = "" + this.ConfirmationData.id;
      var drag = this.allDragger[id];
      if (drag) {
        debugger;
        var item = this.ConfirmationData;
        var url = ajax.doms(
          "/api/Management/Contract/Confirmation/Seal?name=" +
            item.confirmationName +
            "&confirmationType=" +
            item.confirmationType +
            "&contractId=" +
            this.$route.query.data.id +
            ""
        );
        drag.setSrc(url);
      }
    },
    // 添加提交
    submi() {
      console.log(this.draggable);
      let data = {
        id: 0,
        contractId: this.$route.query.data.id,
        pageIndex: this.pageIndex,
        pointX: 0,
        pointY: 0,
        confirmationName: this.form.confirmationName,
        confirmationType: this.form.confirmationTypeName
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Confirmation",
        data,
        res => {
          this.getPage();
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.addSeal = false;
          this.add = false;
          this.form.confirmationName = this.form.confirmationTypeName = "";

          for (var i in this.allDragger) {
            var drag = this.allDragger[i];
            if (drag) {
              drag.reset();
            }
          }
        }
      );
    },
    //编辑提交
    addSubmi() {
      var drag = this.allDragger[this.ConfirmationData.id + ""];
      let data = {
        id: this.score,
        contractId: this.$route.query.data.id,
        pageIndex: this.pageIndex,
        pointX: drag.getLeft() / 749,
        pointY: drag.getTop() / 1123,
        confirmationName: this.ConfirmationData.confirmationName,
        confirmationType: this.ConfirmationData.confirmationType
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Confirmation",
        data,
        res => {
          this.getPage();
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.addSeal = false;
          this.add = false;

          for (var i in this.allDragger) {
            var drag = this.allDragger[i];
            if (drag) {
              drag.reset();
            }
          }
        }
      );
    },
    //编辑处的删除
    delSubmi() {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Confirmation/Remove/" + this.score,
        res => {
          var d = this.allDragger[this.score + ""];
          if (d) {
            d.bind.call(document.getElementById("seal" + this.score));
            d.setVisible(false);
          }

          this.getPage();
          this.addSeal = false;
          this.add = false;

          for (var i in this.allDragger) {
            var drag = this.allDragger[i];
            if (drag) {
              drag.reset();
            }
          }
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
          this.score = "";
          this.getConfirmation();
          this.addSeal = false;
          this.add = false;
        }
      );
    },
    //获取合同的所有确认处
    getConfirmation() {
      ajax.authGet.bind(this)(
        "/api/Management/Contract/Confirmation?contractId=" +
          this.$route.query.data.id,
        res => {
          this.fillConfirmation(res.data.data);
        }
      );
    },
    //上一页
    previousPage() {
      this.jumpPage = Math.max(1 * this.pageIndex - 1, 1);
      this.sureSearch();
    },
    //下一页
    nextPage() {
      this.jumpPage = Math.min(
        1 * this.pageIndex + 1,
        this.contractData.pageCount
      );
      this.sureSearch();
    },
    //页码跳转
    sureSearch() {
      if (this.jumpPage < 1 || this.contractData.pageCount < this.jumpPage) {
        return;
      }

      this.pageIndex = this.jumpPage;
      this.getPage();
    },
    // 自动放图片
    fillConfirmation(datas) {
      var array = [];
      for (var i = 0; i < datas.length; i++) {
        var item = datas[i];
        if (item.pageIndex == this.pageIndex) {
          array.push(item);
        }
        var id = item.id + "";
        var drag = this.allDragger[id] || this.drawImage(item);
        this.allDragger[id] = drag;
        drag.bind.call(document.getElementById("seal" + id));
        drag.setVisible(false);
        drag.reset();
      }
      this.confirmationData = array;

      for (var i = 0; i < array.length; i++) {
        var drag =
          this.allDragger[array[i].id + ""] || this.drawImage(array[i]);
        this.allDragger[array[i].id + ""] = drag;
        drag.bind.call(document.getElementById("seal" + array[i].id));
        drag.setVisible(true);
        drag.reset();
      }
    },
    // 图片位置设置
    drawImage(item) {
      item = item || {};
      var name = item.confirmationName;
      var type = item.confirmationType;
      if (!type) return;

      var src = ajax.doms(
        "/api/Management/Contract/Confirmation/Seal?name=" +
          name +
          "&confirmationType=" +
          type +
          "&contractId=" +
          this.$route.query.data.id +
          ""
      );
      var width = 749;
      var height = 1123;
      var imageInfo = {
        id: item.id,
        src: src,
        left: item.pointX ? item.pointX * width : 0,
        top: item.pointY ? item.pointY * height : 0
      };
      var drag = this.createImage(imageInfo);
      return drag;
    },
    // 生成图片
    createImage(item) {
      item = item || {};
      var id = item.id || 0;
      var div = document.createElement("div");
      //动态生成图
      var img = document.createElement("img");
      var now = new Date();
      div.id = "seal" + id;
      div.className = "seal";
      div.style.position = "absolute";
      //div.style.top = item.top || 0;
      //div.style.left = item.left || 0;
      img.src = item.src;
      div.appendChild(img);
      this.$refs.main.appendChild(div);
      var newDiv = document.querySelector(div.id);
      var drag = this.draggable.call(div);
      drag.bind.call(div);
      drag.setLeft(item.left || 0);
      drag.setTop(item.top || 0);
      drag.reset();
      return drag;
      //.bind.call(div);
    }
  },
  mounted() {
    this.getPage();
    this.messageData = this.$route.query.data;
    this.getCount(); //下拉，合同确认类型

    //获取合同总页数
    ajax.authGet.bind(this)(
      "/api/Management/Contract/" + this.$route.query.data.id,
      res => {
        this.contractData = res.data.data;
      }
    );

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
          target = undefined;
          return;
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
          console.log(this);
          this.onmousedown = onmousedown;
          this.onmouseup = onmouseup;
          position[this.id] = {
            width: 0,
            height: 0
          };
        }

        return {
          getLeft: function() {
            return position[this.id] ? position[this.id].width || 0 : 0;
          }.bind(this),
          getTop: function() {
            return position[this.id] ? position[this.id].height || 0 : 0;
          }.bind(this),
          setLeft: function(t) {
            position[this.id] = position[this.id] || {};
            position[this.id].width = t;
            if (bindTarget) {
              document.getElementById(bindTarget).style.left = t + "px";
            }
          }.bind(this),
          setTop: function(t) {
            position[this.id] = position[this.id] || {};
            position[this.id].height = t;
            if (bindTarget) {
              document.getElementById(bindTarget).style.top = t + "px";
            }
          }.bind(this),
          bind: function() {
            // console.log(this);
            bindTarget = this.id;
          }.bind(this),
          top: function() {
            if (bindTarget) {
              document.getElementById(bindTarget).style.zIndex = 1002;
            }
          }.bind(this),
          low: function() {
            if (bindTarget) {
              document.getElementById(bindTarget).style.zIndex = 1000;
            }
          }.bind(this),
          reset: function() {
            bindTarget = undefined;
            target = undefined;
          }.bind(this),
          setVisible: function(b) {
            if (bindTarget) {
              document.getElementById(bindTarget).style.display = b
                ? "block"
                : "none";
            }
            //if(target)
          }.bind(this),
          setSrc: function(s) {
            if (bindTarget) {
              var img = document
                .getElementById(bindTarget)
                .querySelector("img");
              img.src = s;
            }
          }.bind(this)
        };
      };
    })();
    this.draggable = draggable;
    // console.log(this.draggable)
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
    .jump {
      display: flex;
      justify-content: center;
      align-items: center;
    }
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