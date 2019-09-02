<template>
  <div>
    <mt-header fixed title="证明材料">
      <router-link to="/Publicfore" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="imgs" v-show="inages==0">
      <span>审核记录</span>
      <div class="imgs_List" v-for="item in getScience" :key="item.id">
        <span>{{item.name}}</span>
        <div class="images_flex">
          <div class="imgs_wc" v-for="newItem in item.materials" :key="newItem.id">
            <div class="imgs_ch">
              <el-upload
                class="avatar-uploader"
                action="http://192.168.28.213:5000/api/Information/Account/Upload"
                :show-file-list="false"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,newItem)"
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
      <el-button type="primary" @click="audit">提交审核</el-button>
    </div>

    <div class="audit" v-show="inages==1">
      <div class="add">
        <p>您的信息正在审核中，请耐心等待....</p>
      </div>
      <div class="nav">
        <el-button type="warning" @click="material">确定</el-button>
        <el-button disabled>查看详情</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
export default {
  data() {
    return {
      imageUrl: "",
      inages: 0,
      getScience: [],
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      }
    };
  },
  methods: {
    audit() {
      this.inages = 1;
      let data=[{categoryId:1,materialTypeId:2,materialId:89}]
      ajax.authPost.bind(this)('/api/Information/Account/Upload/Submit',data,res=>{
          console.log(res)
      })
    },
    material() {
      this.$router.push({ path: "/Publicfore" });
    },
    handleAvatarSuccess(res, file,item) {
        var arg=arguments;
      item.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //获取结构
    getMaterial() {
      ajax.authGet.bind(this)("/api/Information/Account/Material", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.getScience = res.data.data.map(function(a) {
            a.materials.map(b => {
              b.imageUrl = undefined;
            });
            return a;
          });
          //   console.log(this.getScience)
        }
      });
    }
  },
  mounted() {
    this.getMaterial();
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
  /deep/.el-button--primary {
    width: 100%;
    margin: 26px 0;
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
