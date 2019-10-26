<template>
  <div class="seal_Title">
    <div class="button">
      <el-button @click="returnUpper" type="primary" plain icon="el-icon-d-arrow-left">账户设置</el-button>&nbsp;&nbsp;
      <p>设置印章</p>
    </div>
    <div class="purple">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="title">创建机构印章</div>
            <el-form :model="mechanismSeal" label-width="80px">
              <el-form-item label="账户标识">
                <el-input v-model="mechanismSeal.identification" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="印章样例">
                <el-radio-group v-model="mechanismSeal.sealType">
                  <el-radio :label="MechanismValue">{{MechanismList}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="横向文">
                <el-input v-model="mechanismSeal.horizontal"></el-input>
              </el-form-item>
              <el-form-item label="下弦文">
                <el-input v-model="mechanismSeal.chord" placeholder="实体章为公安系统防伪编码，此处可不填"></el-input>
              </el-form-item>
              <el-form-item label="印章类型">
                <el-radio-group v-model="mechanismSeal.sealColor">
                  <el-radio
                    :label="item.value"
                    v-for="item in commonData"
                    :key="item.value"
                  >{{item.text}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="action"
                    :on-success="chengeSothersMaterialId2"
                    :file-list="fileImg"
                    :headers="access_token"
                  >
                    <el-button size="small" type="primary">点击上传文件</el-button>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="imgList">
                  <img
                    :src="mechanismSeal.material.fullPath == '' ? '../../../static/img/sgd.jpg':mechanismSeal.material.fullPath"
                  />
                </div>
              </el-form-item>
            </el-form>
            <div class="submit">
              <el-button type="success" @click="toupdateMechanism">生成印章</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="title">创建个人印章</div>
            <el-form :model="legalPersonSeal" label-width="80px">
              <el-form-item label="账户标识">
                <el-input v-model="legalPersonSeal.identification" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="印章样例">
                <el-radio-group v-model="legalPersonSeal.sealType">
                  <el-radio :label="MechanismValueOne">{{MechanismListOne}}</el-radio>
                  <el-radio :label="MechanismValueTow">{{MechanismListTow}}</el-radio>
                  <el-radio :label="MechanismValueThree">{{MechanismListThree}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="印章类型">
                <el-radio-group v-model="legalPersonSeal.sealColor">
                  <el-radio
                    :label="item.value"
                    v-for="item in commonData"
                    :key="item.value"
                  >{{item.text}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="actions"
                    :on-success="chengeSothersMaterialId"
                    :file-list="fileImg"
                    :headers="access_token"
                  >
                    <el-button size="small" type="primary">点击上传文件</el-button>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="imgList">
                  <img
                    :src="legalPersonSeal.material.fullPath == '' ? '../../../static/img/sgd.jpg':legalPersonSeal.material.fullPath"
                  />
                </div>
              </el-form-item>
            </el-form>
            <div class="submit">
              <el-button type="success" @click="toupdatePersonal">生成印章</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="submit" style="padding-top:50px">
        <el-button @click="submit" type="primary">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      action: ajax.doms.bind(this)("/api/Management/Contract/Mechanism/Upload"),
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      fileImg: [],
      actions: ajax.doms.bind(this)(
        "/api/Management/Contract/LegalPerson/Upload"
      ),
      fileList: {},
      mechanismSeal: {
        identification: "",
        horizontal: "",
        chord: "",
        sealType: "1",
        sealColor: "",
        material: {
          fullPath: "" //生成个人印章
        }
      },
      legalPersonSeal: {
        identification: "",
        sealType: "",
        sealColor: "",
        material: {
          fullPath: "" //生成个人印章
        }
      },
      commonData: [],
      MechanismData: [],
      MechanismList: "", //机构圆形印章
      MechanismValue: "",
      MechanismListOne: "",
      MechanismValueOne: "",
      MechanismListTow: "",
      MechanismValueTow: "",
      MechanismListThree: "",
      MechanismValueThree: "",

      responseId: '', //机构上传文件的Id
      materialId: '' //个人上传文件的Id
    };
  },
  methods: {
    //返回上一页
    returnUpper() {
      this.$router.go(-1);
    },
    //数据
    getForm() {
      //form表单数据
      ajax.authGet.bind(this)(
        "/api/Management/Contract/Mechanism/" + this.fileList.id,
        res => {
          this.mechanismSeal =
            res.data.data.mechanismSeal || this.mechanismSeal;
          this.legalPersonSeal =
            res.data.data.legalPersonSeal || this.legalPersonSeal;
          //单选框只接受字符串，不接受number类型
          this.mechanismSeal.sealType = this.mechanismSeal.sealType.toString();
          this.mechanismSeal.sealColor = this.mechanismSeal.sealColor.toString();
          this.legalPersonSeal.sealType = this.legalPersonSeal.sealType.toString();
          this.legalPersonSeal.sealColor = this.legalPersonSeal.sealColor.toString();
          //判断数据是否为空（刚进来是空的），是的话生成两个账户标识，不是的话拿到之前提交的账户标识
          if (
            res.data.data.mechanismSeal == null ||
            res.data.data.legalPersonSeal == null
          ) {
            this.getGuid();
            this.getGuidTow();
          }
        }
      );
      //印章类型
      ajax.authGet.bind(this)("/api/Common/30", res => {
        this.commonData = res.data.data;
      });
      //印章样例单选
      ajax.authGet.bind(this)("/api/Common/29", res => {
        this.MechanismData = res.data.data;
        for (var i = 0; i < this.MechanismData.length; i++) {
          this.MechanismList = this.MechanismData[0].text;
          this.MechanismValue = this.MechanismData[0].value;
          this.MechanismListOne = this.MechanismData[1].text;
          this.MechanismValueOne = this.MechanismData[1].value;
          this.MechanismListTow = this.MechanismData[2].text;
          this.MechanismValueTow = this.MechanismData[2].value;
          this.MechanismListThree = this.MechanismData[3].text;
          this.MechanismValueThree = this.MechanismData[3].value;
        }
      });
    },
    //机构账户标识
    getGuid() {
      ajax.authGet.bind(this)("/api/Common/Guid", res => {
        this.mechanismSeal.identification = res.data.data;
      });
    },
    //个人账户标识
    getGuidTow() {
      ajax.authGet.bind(this)("/api/Common/Guid", res => {
        this.legalPersonSeal.identification = res.data.data;
      });
    },
    //上传机构印章成功回调
    chengeSothersMaterialId2(response, file, fileList) {
      this.responseId = response.data.id;
      //   console.log(response.data.id);
    },
    chengeSothersMaterialId(response, file, fileList) {
      this.materialId = response.data.id;
      console.log(this.materialId);
    },
    //生成机构印章
    toupdateMechanism() {
      let data = {
        identification: this.mechanismSeal.identification,
        title: this.fileList.name,
        horizontal: this.mechanismSeal.horizontal,
        chord: this.mechanismSeal.chord,
        sealType: this.mechanismSeal.sealType,
        sealColor: this.mechanismSeal.sealColor
      };
      this.mechanismSeal.material.fullPath = ajax.stringfy(
        "/api/Common/Seal/Mechanism",
        data
      );
    },
    //生成个人印章
    toupdatePersonal() {
      let data = {
        identification: this.legalPersonSeal.identification,
        name: this.fileList.legalPersonName,
        sealType: this.legalPersonSeal.sealType,
        sealColor: this.legalPersonSeal.sealColor
      };
      this.legalPersonSeal.material.fullPath = ajax.stringfy(
        "/api/Common/Seal/Personal",
        data
      );
    },
    //提交
    submit() {
      let data = {
        id: this.fileList.id,
        mechanismSeal: {
          identification: this.mechanismSeal.identification,
          title: this.fileList.name,
          horizontal: this.mechanismSeal.horizontal,
          chord: this.mechanismSeal.chord,
          sealType: this.mechanismSeal.sealType,
          sealColor: this.mechanismSeal.sealColor,
          materialId:this.responseId
        },
        legalPersonSeal: {
          identification: this.legalPersonSeal.identification,
          title: this.fileList.legalPersonName,
          sealType: this.legalPersonSeal.sealType,
          sealColor: this.legalPersonSeal.sealColor,
          materialId:this.materialId
        }
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Mechanism/Seal",
        data,
        res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        }
      );
    }
  },
  mounted() {
    this.fileList = this.$route.query.data;

    this.getForm();
  }
};
</script>

<style lang="less" scoped>
.seal_Title {
  .button {
    height: 56px;
    background: #fff;
    line-height: 56px;
    display: flex;
    align-items: center;
  }
  .purple {
    height: 568px;
    overflow: scroll;
    .title {
      height: 60px;
      line-height: 60px;
      font-weight: 600;
      text-align: center;
    }
  }
  .imgList {
    width: 100px;
    height: 100px;
    margin: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .submit {
    text-align: center;
  }
  @media screen and (min-width: 1620px) {
      .purple {
        height: 730px;
        overflow: scroll;
        .title {
          height: 60px;
          line-height: 60px;
          font-weight: 600;
          text-align: center;
        }
      }
    }
    @media screen and (max-width: 1620px) {
      .purple {
        height: 610px;
        overflow: scroll;
        .title {
          height: 60px;
          line-height: 60px;
          font-weight: 600;
          text-align: center;
        }
      }
    }
}

</style>