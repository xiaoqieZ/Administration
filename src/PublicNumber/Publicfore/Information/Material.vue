<template>
  <div>
    <mt-header fixed title="证明材料">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- 审核记录 -->
    <div class="imgs" v-show="inages==0">
      <span>审核记录</span>
      <!-- 上传图片 -->
      <div class="imgs_List" v-for="item in getScience" :key="item.id">
        <span>{{item.name}}</span>
        <div class="images_flex">
          <div class="imgs_wc" v-for="newItem in item.materials" :key="newItem.id">
            <div class="imgs_ch">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,newItem)"
                :on-change="handleChange"
                :on-error="upError"
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
      <div class="information">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="账户名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="缴款账号">
            <el-input v-model="form.Account"></el-input>
          </el-form-item>
          <el-form-item label="开户行信息">
            <el-input v-model="form.Opening"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="button_submit">
        <el-button type="primary" @click="audit">提交审核</el-button>
      </div>
    </div>
    <!-- 您的信息正在审核中 -->
    <div class="audit" v-show="inages==1">
      <div class="add">
        <p>您的信息正在审核中，请耐心等待....</p>
      </div>
      <div class="nav">
        <el-button type="warning" @click="material">确定</el-button>
        <el-button disabled>查看详情</el-button>
      </div>
    </div>
    <div v-show="inages==2"></div>
    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="80%"
      center
    >
      <span>需要先去信息采集才可以提交证明材料喔！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dssy">去采集</el-button>
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
      imageUrl: "",
      inages: 0,
      getScience: [],
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      action: ajax.doms.bind(this)("/api/Information/Account/Upload"),
      obj: [],
      centerDialogVisible: false, //没有进行信息采集，弹出提示框
      getImgId: {},
      arrays: {},
      message: "",
      form: {
        name: "",
        Account: "",
        Opening: ""
      },
      information: {}, //获取当前用户信息
      authentication: {} //获取当前用户注册认证信息
    };
  },
  methods: {
    dssy() {
      //去信息采集
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore/Information/Acquisition" });
    },
    //获取证件分类和证件框架
    getMaterial() {
      ajax.authGet.bind(this)("/api/Information/Account/Material", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.getScience = res.data.data.map(function(a) {
            // console.log(123,a)
            a.materials.map(b => {
              b.imageUrl = undefined;
              // console.log(b)
            });
            return a;
          });
        }
      });
    },
    //文件上传个数
    handleChange(file, fileList) {
      this.fileList = fileList.length > 1 ? fileList.splice(0, 1) : fileList;
    },
    upError(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
    },
    //提交材料
    audit() {
      var array = [];
      for (var i = 0; i < this.getScience.length; i++) {
        var category = this.getScience[i];
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
      // console.log(array)
      let data = {
        accountName: this.form.name,
        account: this.form.Account,
        accountBank: this.form.Opening,
        materials: array
      };
      ajax.authPost.bind(this)(
        "/api/Information/Account/Upload/Submit",
        data,
        res => {
          this.inages = 1; //  您的信息正在审核中，请耐心等待
          this.$message(res.data.message);
        }
      );
    },
    //报表文件上传成功回调
    material() {
      this.$router.push({ path: "/Publicfore" });
    },
    //图片上传成功的回调，获取id
    handleAvatarSuccess(res, file, newItem) {
      newItem.imageUrl = res.data.fullPath;
      newItem.img = res.data;
      this.getImgId = res.data;
      console.log(file)
    },
    // 图片的格式
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/heic";
      // const extension = file.name.split('.')[1] === 'heif'
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 hevc 格式!");
      // }
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt20M;
    },
    getcail() {
      ajax.authGet.bind(this)("/api/Information/Account/CanSubmit", res => {
        console.log(res);
      });
    },
    //判断信息采集页面是否完成提交
    getPersonal() {
      ajax.authGet.bind(this)(
        "/api/Information/Account/Authentication",
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.authentication = res.data.data;
            if (this.authentication.investorTypeName == null) {
              this.centerDialogVisible = true;
              this.inages = 2;
            }
          }
        }
      );
    }
  },
  mounted() {
    //获取结构
    this.getMaterial();
    this.getcail();
    this.getPersonal();
  }
};
</script>

<style lang="less">
.imgs {
  padding: 10px;
  margin-top: 50px;
  .imgs_List {
    padding-top: 20px;
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
  // /deep/.el-button--primary {
  //   width: 100%;
  //   margin: 26px 0;
  // }
  .information {
    padding-top: 30px;
  }
  .button_submit {
    padding: 50px 0;
    /deep/.el-button--primary {
      width: 100%;
    }
  }
}
.audit {
  margin-top: 50px;
  .add {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .nav {
    text-align: center;
  }
}
</style>
