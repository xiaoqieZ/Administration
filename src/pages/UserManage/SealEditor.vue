<template>
  <div>
    <div class="button">
      <el-button @click="returnUpper" type="primary" plain icon="el-icon-d-arrow-left">基金合同</el-button>&nbsp;&nbsp;
      <p>基金合同</p>
    </div>
    <div class="fit">
      <div class="main" id="main">
        <div @click="one">印章111</div>
        <div @click="tow">印章333</div>
        <div @click="tows">印章66</div>
      </div>
      <div class="rigth">
        <div class="rigth_title">拖拽设置</div>
        <p>合同的所有确认处</p>
        <div id="seal" class="seal" v-show="add">授权人印章</div>
        <div id="sealTow" class="sealTow">投资人机构章</div>
        <div id="sea" class="sea">自然人</div>
        <el-button @click="add=true">添加</el-button>
        <el-select v-model="score">
          <el-option
            :label="item.confirmationName"
            :value="item.pageIndex"
            v-for="item in confirmationData"
            :key="item.value"
          ></el-option>
        </el-select>
        <div v-show="add">
          <el-form>
            <el-form-item>
              <el-input v-model="form.confirmationName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.confirmationType">
                <el-option
                  :label="item.confirmationName"
                  :value="item.pageIndex"
                  v-for="item in confirmationData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="button_submi">
            <el-button type="primary" @click="add=false">保 存</el-button>
            <el-button @click="add=false">取 消</el-button>
          </div>
        </div>

        <div class="select">
          <el-select v-model="score">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="item in countData"
              :key="item.value"
            ></el-option>
          </el-select>
        </div>
        <p>投资人机构章</p>

        <div class="natural">
          <p>自然人（签字）</p>
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
      aft: false,
      form: {
        confirmationName: "",
        confirmationType: ""
      },
      add: false,
      isDown: false,
      width: 0,
      height: 0,
      countData: [],
      score: "",
      isDownss: false,
      widthss: 0,
      heightss: 0,
      t1: "",
      t2: "",
      t3: "",
      confirmationData: [],
      messageData: {}
    };
  },
  methods: {
    //返回
    returnUpper() {
      this.$router.go(-1);
    },
    getCount() {
      ajax.authGet.bind(this)(
        "/api/Management/Contract/Confirmation?contractId=" +
          this.messageData.id,
        res => {
          this.confirmationData = res.data.data;
        }
      );
      ajax.authGet.bind(this)("/api/Common/32", res => {
        this.countData = res.data.data;
      });
    },
    one() {
      console.log(
        "width:" +
          this.t1.getWidth() +
          "px" +
          "    height:" +
          this.t1.getHeight() +
          "px"
      );
    },
    tow() {
      console.log(
        "width:" +
          this.t2.getWidth() +
          "px" +
          "     height:" +
          this.t2.getHeight() +
          "px"
      );
    },
    tows() {
      console.log(
        "width:" +
          this.t3.getWidth() +
          "px" +
          "     height:" +
          this.t3.getHeight() +
          "px"
      );
    }
  },
  mounted() {
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

      var onmousedown = function(e) {
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

        target.style.left = width + "px";
        target.style.top = height + "px";
      };
      return function() {
        // console.log(this);
        this.onmousedown = onmousedown;
        this.onmouseup = onmouseup;

        return {
          getWidth: function() {
            return position[this.id] ? position[this.id].width || 0 : 0;
          }.bind(this),
          getHeight: function() {
            return position[this.id] ? position[this.id].height || 0 : 0;
          }.bind(this)
        };
      };
    })();
    this.t1 = draggable.call(document.querySelector("#seal"));
    this.t2 = draggable.call(document.querySelector("#sealTow"));
    this.t3 = draggable.call(document.querySelector("#sea"));
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
  margin-top: 30px;
  display: flex;
  position: relative;
  .main {
    width: 500px;
    height: 500px;
    border: 1px solid;
  }
  .rigth {
    width: 200px;
    margin-left: 30px;
    border-right: 1px solid;
    .rigth_title {
      text-align: center;
      color: rgb(91, 163, 247);
      background-color: rgb(214, 208, 210);
    }
    .seal {
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-color: rgb(238, 81, 141);
      border-radius: 50%;
      position: absolute;
      top: 80px;
      left: 780px;
    }
    .sealTow {
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-color: rgb(238, 81, 141);
      border-radius: 50%;
      position: absolute;
      top: 250px;
      left: 780px;
    }
    .sea {
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-color: rgb(238, 81, 141);
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      left: 780px;
    }
    .select {
      // padding-top: 120px;
      /deep/.el-input__suffix {
        height: 75%;
      }
    }
    .natural {
      // padding-top: 120px;
    }
    // .button_submi{
    //   position: absolute;
    //   top: 60px;
    // }
  }
}
</style>