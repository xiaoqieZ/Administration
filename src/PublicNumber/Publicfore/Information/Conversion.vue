<template>
  <div>
    <mt-header fixed title="转化告知">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="conversion">
      <div class="conversion_count">
        <p>尊敬的管理人您好：</p>
        <p class="conversion_list">
          本人经公司认定为普通投资者，经本人审慎考虑，现决定自愿申请转化为贵司的专业投资者。本人已充分理解专业投资者与普通投资者的区别，
          转化为专业投资者后，将自主承担可能产生的风险后果。本人承诺提供材料真实、准确、完整。
        </p>
      </div>
      <div class="knowledge_title">
        <div class="doubles">
          <div class="knowledge_list">
            <span>材料补充</span>
          </div>
          <!-- 上传图片 -->
          <div class="imgs_List" v-for="item in scienceData" :key="item.id">
            <span>{{item.name}}</span>
            <div class="images_flex">
              <div class="imgs_wc" v-for="(newItem,index) in item.materials" :key="newItem.id">
                <div class="imgs_ch">
                  <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="(res,file)=>handleAvatarSuccess(res,file,newItem,index)"
                    :before-upload="beforeAvatarUpload"
                    :headers="access_token"
                  >
                    <img v-if="newItem.imageUrl" :src="newItem.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <p>{{newItem.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="doubles">
          <div class="knowledge_list">
            <span>知识评测</span>
          </div>
          <div v-for="(item,index) in questionnaireData" :key="item.id">
            <p>
              {{item.title}}
              <span>{{item.optionType==2?'（多选）':''}}</span>
            </p>
            <el-form :model="form">
              <el-form-item>
                <el-radio-group v-model="item.radio" v-if="item.optionType==1">
                  <el-radio
                    :label="option.id"
                    v-for="(option,num) in item.options"
                    :key="option.id"
                    @change="ChangeRadio(item,index,option,num)"
                  >{{option.content}}</el-radio>
                  <br />
                </el-radio-group>

                <el-checkbox-group v-model="form.checkbox" v-if="item.optionType==2">
                  <el-checkbox
                    v-for="(option,num) in item.options"
                    :label="option.id"
                    :key="option.id"
                    @change="ChangeRadio2(item,index,option,num)"
                  >{{option.content}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="conversion_button">
        <el-button type="primary" @click="conversion">确认转化</el-button>
        <el-button>取消转化</el-button>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      width="80%"
      center
    >
      <span>提交成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="center">确 定</el-button>
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
      questionnaireData: [],
      listId: [], //选择题Id
      checkList: [],
      scienceData: [],
      action: ajax.doms.bind(this)("/api/Information/Account/Upload"),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      fileList: [],
      imageUrl: "",
      getImgId: {},
      form: {
        radio: "",
        checkbox: []
      },
      a: [],
      centerDialogVisible: false
    };
  },
  methods: {
    //资料
    getScience() {
      ajax.authGet.bind(this)("/api/Information/Account/Conversion", res => {
        this.scienceData = res.data.data.map(function(a) {
          // console.log(123,a)
          a.materials.map(b => {
            b.imageUrl = undefined;
          });
          return a;
        });
      });
    },
    //图片上传成功的回调，获取id
    handleAvatarSuccess(res, file, newItem, index) {
      newItem.imageUrl = res.data.fullPath;
      newItem.img = res.data;
      this.getImgId = res.data;
    },
    // 图片的格式
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //获取知识评测试题
    getQuestionnaire() {
      ajax.authGet.bind(this)(
        "/api/Information/Account/Conversion/Questionnaire",
        res => {
          this.questionnaireData = res.data.data;
        }
      );
    },
    //选择题选中
    ChangeRadio(item, index, open, num) {
      this.listId[index] = {
        itemId: item.id,
        optionId: [open.id]
      };
      // console.log(this.listId)
    },
    ChangeRadio2(item, index, open, num) {
      if (this.a[index]) {
        this.a[index].push(open.id);
      } else {
        this.a[index] = [open.id];
      }
      this.listId[index] = {
        itemId: item.id,
        optionId: this.a[index]
      };
      // console.log(this.listId)
    },
    //确认转化按钮
    conversion() {
      var array = [];
      for (var i = 0; i < this.scienceData.length; i++) {
        var category = this.scienceData[i];
        for (var j = 0; j < category.materials.length; j++) {
          var m = category.materials[j];
          if (m.img) {
            array.push({
              categoryId: category.id,
              materialTypeId: m.id,
              materialId: m.img.id
            });
          }
        }
      }
      let data = {
        materials: array,
        answers: this.listId
      };
      if (this.listId.length == this.questionnaireData.length) {
        ajax.authPost.bind(this)(
          "/api/Information/Account/Conversion",
          data,
          res => {
            this.centerDialogVisible = true;
            this.getInvestorType();
            // this.$message({
            //   message:res.data.message,
            //   type:"success"
            // });
          }
        );
      } else {
        this.$message("选择题都要选上");
      }
    },
    getInvestorType() {
      ajax.authGet.bind(this)(
        "/api/Information/Account/Authentication",
        res => {
          this.investorTypeList = res.data.data;
          let typeName = this.investorTypeList;
          storage.set("typeName", typeName);
        }
      );
    },
    //弹窗确认
    center() {
      this.centerDialogVisible = false;
      this.$router.push({path:'/Publicfore'})
    }
  },
  mounted() {
    this.getQuestionnaire();
    this.getScience();
  }
};
</script>

<style lang="less">
.conversion {
  padding: 10px;
  .conversion_count {
    padding-top: 50px;
    .conversion_list {
      text-indent: 2em;
    }
  }
  .knowledge_title {
    .doubles {
      padding-top: 30px;
      .knowledge_list {
        font-weight: 600;
        padding-left: 5px;
        border-left: 3px solid rgb(71, 142, 248);
      }
      /deep/.el-radio {
        white-space: normal;
        word-break: break-all;
      }
      .imgs_List {
        .images_flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .imgs_wc {
          width: 48%;
          .imgs_ch {
            width: 100%;
            .avatar-uploader .el-upload {
              width: 100%;
              height: 105px;
              border: 1px dashed #3e3d3d;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
              border-color: #409eff;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 100%;
              height: 100%;
              line-height: 105px;
              text-align: center;
            }
            .avatar {
              width: 100%;
              height: 100%;
              display: block;
            }
            p {
              color: royalblue;
              text-align: center;
            }
          }
        }
      }
      /deep/.el-radio-group{
          display: inline-grid !important;
          /deep/.el-radio{
            padding-top: 10px;
          }
      }
    }
  }
  .conversion_button {
    padding: 50px 0;
    text-align: center;
  }
}
</style>
