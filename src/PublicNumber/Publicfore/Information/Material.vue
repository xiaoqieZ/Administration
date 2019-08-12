<template>
    <div>
        <mt-header fixed title="证明材料">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="imgs" v-show="inages==0">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>上传(其他身份证明)</p>
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
export default {
    data() {
      return {
        imageUrl: '',
        inages:0,
      };
    },
    methods: {
        audit(){
            this.inages=1
        },
        material(){
            this.$router.push({path: '/Publicfore'})
        },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="less">
    .imgs{
        padding-left: 10px;
        margin-top: 50px;
         .avatar-uploader .el-upload {
            border: 1px dashed #3e3d3d;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        p{
          color: royalblue
        }
    }
    .el-button--primary{
        width: 100%;
    }
    .audit{
        width: 100%;
        margin-top: 50px; 
        .add{
            height: 200px;
            line-height: 200px;
            text-align: center;
        }
        .nav{
            text-align: center;
        }
    }
</style>
