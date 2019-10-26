<template>
    <div class="hello">
      公文文件
          <!-- <canvas id="canvas">Canvas画板</canvas>
          <div>
            <button @click="clear">清除</button>
            <button @click="save">确定</button>
          </div> -->
        </div>
</template>

<script>
// var draw;
// var preHandler = function(e) {
//   //e.preventDefault();
// };
// class Draw {
//   constructor(el) {
//     this.el = el;
//     this.canvas = document.getElementById(this.el);
//     this.cxt = this.canvas.getContext("2d");
//     this.stage_info = canvas.getBoundingClientRect();
//     this.path = {
//       beginX: 0,
//       beginY: 0,
//       endX: 0,
//       endY: 0
//     };
//   }
//   init(btn) {
//     var that = this;

//     this.canvas.addEventListener("touchstart", function(event) {
//       document.addEventListener("touchstart", preHandler, false);
//       that.drawBegin(event);
//     });
//     this.canvas.addEventListener("touchend", function(event) {
//       document.addEventListener("touchend", preHandler, false);
//       that.drawEnd();
//     });
//     this.canvas.addEventListener("touchmove", function(event) {
//       document.addEventListener("touchmove", preHandler, false);
//       that.drawing(event);
//     });
//     this.clear(btn);
//   }
//   drawBegin(e) {
//     var that = this;
//     window.getSelection()
//       ? window.getSelection().removeAllRanges()
//       : document.selection.empty();
//     this.cxt.strokeStyle = "#000";
//     this.cxt.beginPath();
//     var beginX = e.changedTouches[0].clientX - this.stage_info.left;
//     var beginY = e.changedTouches[0].clientY - this.stage_info.top;
//     this.cxt.moveTo(beginX, beginY);
//     this.path.beginX = beginX;
//     this.path.beginY = beginY;
//     // console.log(beginX,beginY)
//   }
//   drawing(e) {
//     var beginX = e.changedTouches[0].clientX - this.stage_info.left;
//     var beginY = e.changedTouches[0].clientY - this.stage_info.top;
//     this.cxt.lineTo(beginX, beginY);
//     this.path.endX = beginX;
//     this.path.endY = beginY;
//     this.cxt.stroke();
//     // console.log(beginX,beginY,this.stage_info)
//   }
//   drawEnd() {
//     document.removeEventListener("touchstart", preHandler, false);
//     document.removeEventListener("touchend", preHandler, false);
//     document.removeEventListener("touchmove", preHandler, false);
//     //canvas.ontouchmove = canvas.ontouchend = null
//   }
//   clear(btn) {
//     this.cxt.clearRect(0, 0, 300, 300);
//   }
//   save() {
//     return canvas.toDataURL("image/png");
//   }
// }
export default {
  data() {
    return {
      // points: [],

      // canvasTxt: null,

      // stage_info: [],

      // startX: 0,

      // startY: 0,

      // moveY: 0,

      // moveX: 0,

      // endY: 0,

      // endX: 0,

      // w: null,

      // h: null,

      // isDown: false
    };
  },

  

  mounted() {
    //  //画板
    // draw = new Draw("canvas");
    // draw.init();
  },

  components: {
    // NavPublic,
  },

  methods: {
    // clear() {
    //   draw.clear();
    // },
    // mutate(word) {
    //   this.$emit("input", word);
    // },
    // save(){

    // }
  }
};
</script>

<style lang='less' scoped>
// #canvas {
//     width: 100%;
//     height: 100%;
//     border: 1px solid #9a6c6c;
//     background: rgb(253, 252, 252);
//     cursor: default;
//   }
//   #keyword-box {
//     margin: 10px 0;
//   }
//   .embedpdf {
//     width: 100%;
//     height: 600px;
//   }

</style>