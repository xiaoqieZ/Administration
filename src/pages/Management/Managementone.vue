<template>
  <div class="manage">
    <div class="manage-title">页面设置</div>
    <div class="mentone">
      <van-tabs v-model="active" type="card">
        <van-tab title="轮播图">
          <vue-scroll>
            <div class="currenminput">
              <div class="left">
                <van-button type="info" size="small" @click="editFormVisible = true">添加</van-button>
                <van-button type="danger" size="small" @click="del">删除</van-button>
              </div>
            </div>
            <!-- 新增轮播图 -->
            <el-dialog
              title="新增轮播图"
              :visible.sync="editFormVisible"
              :close-on-click-modal="true"
              :append-to-body="true"
              width="80%"
            >
              <!--//editForm表单提交的数据-->
              <el-form
                :model="editForm"
                label-width="80px"
                ref="editForm"
                :action="action"
                method="post"
                :rules="rules"
              >
                <el-form-item label="链接" prop="link">
                  <el-input v-model="editForm.link" name="link" placeholder="请输入链接"></el-input>
                </el-form-item>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :data="uploadData"
                  :action="action"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :headers="access_token"
                  :auto-upload="false"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="submit('editForm')">提交</el-button>
              </div>
            </el-dialog>
            <!-- 表格数据操作 -->
            <el-table
              :data="listData"
              stripe
              border
              id="out-table"
              style="width: 100%;margin-top: 10px;"
              @select="delselect"
            >
              <!-- @select-all='delWhole'全选 -->
              <!-- 勾选框 -->
              <el-table-column type="selection" width="55"></el-table-column>
              <!-- 索引 -->
              <el-table-column align="center" type="index" prop="data" label="序号" width="100"></el-table-column>
              <el-table-column align="center" prop="data" label="图片" width="80">
                <template slot-scope="scope">
                  <el-popover placement="right" title trigger="click">
                    <img :src="scope.row.filePath" style="height: 500px;width: 500px" />
                    <img
                      slot="reference"
                      :src="scope.row.filePath"
                      alt
                      style="max-height: 50px;max-width: 130px"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="地址">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.link" placement="top">
                    <span>{{scope.row.link}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </vue-scroll>
        </van-tab>
        <van-tab title="新闻资讯">
          <vue-scroll>
            <div class="currenminput">
              <div class="left">
                <van-button type="info" size="small" @click="editFormlism = true">添加</van-button>
                <van-button type="danger" size="small" @click="del">删除</van-button>
              </div>
            </div>
            <!-- 新增新闻资讯 -->
            <el-dialog
              title="新增新闻资讯"
              :visible.sync="editFormlism"
              :close-on-click-modal="true"
              :append-to-body="true"
              width="80%"
            >
              <!--//editForm表单提交的数据-->
              <el-form
                :model="editrules"
                label-width="80px"
                ref="editrules"
                :rules="Journalismrules"
              >
                <el-form-item label="链接" prop="urls">
                  <el-input v-model="editrules.urls" placeholder="请输入链接"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                  <el-input v-model="editrules.title" placeholder="请输入模板标题"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                  <el-input v-model="editrules.content" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :data="uploadjournalism"
                  :action="actionJournalism"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :headers="access_token"
                  :auto-upload="false"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormlism = false">取消</el-button>
                <el-button type="primary" @click.native="clickJournalism(editrules)">提交</el-button>
              </div>
            </el-dialog>
            <!-- 表格数据操作 -->
            <el-table
              :data="journalismData"
              @select="delselect"
              stripe
              border
              id="out-table"
              style="width: 100%;margin-top: 10px;"
            >
              <!-- 勾选框 -->
              <el-table-column type="selection" width="55"></el-table-column>
              <!-- 索引 -->
              <el-table-column align="center" type="index" prop="data" label="序号" width="100"></el-table-column>
              <el-table-column align="center" prop="data" label="标题" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="图片" width="80">
                <template slot-scope="scope">
                  <el-popover placement="right" title trigger="click">
                    <img :src="scope.row.filePath" style="height: 500px;width: 500px" />
                    <img
                      slot="reference"
                      :src="scope.row.filePath"
                      alt
                      style="max-height: 50px;max-width: 130px"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="说明">
                <template slot-scope="scope">
                  <span>{{scope.row.content}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="设为热门">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isHotSpot"
                    :active-value="1"
                    :inactive-value="0"
                    
                    active="#00A854"
                    inactive="#F04134"
                    @change="Switch(scope.row.isHotSpot,scope.row.id)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="链接" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.link}}</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 页码 -->
            <div align="center">
              <el-pagination
                background
                :current-page="page"
                :page-size="num"
                layout="total, sizes, prev, pager, next, jumper"
                :total="countJournalism"
              ></el-pagination>
            </div>
          </vue-scroll>
        </van-tab>

        <van-tab title="关于我们">
          <vue-scroll>
            <div class="currenminput">
              <div class="left">
                <van-button type="info" size="small" @click="editFormname = true">添加</van-button>
                <van-button type="danger" size="small" @click="del">删除</van-button>
              </div>
            </div>
            <!-- 新增关于我们 -->
            <el-dialog
              title="新增关于我们"
              :visible.sync="editFormname"
              :close-on-click-modal="true"
              :append-to-body="true"
              width="80%"
            >
              <!--//editForm表单提交的数据-->
              <el-form :model="aboutForm" label-width="80px" ref="aboutForm" :rules="aboutrules">
                <el-form-item label="链接" prop="usurl">
                  <el-input v-model="aboutForm.usurl" placeholder="请输入链接"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="ustitle">
                  <el-input v-model="aboutForm.ustitle" placeholder="请输入模板标题"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="uscontent">
                  <el-input v-model="aboutForm.uscontent" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :data="uploadAbout"
                  :action="actionAbout"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :headers="access_token"
                  :auto-upload="false"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormname = false">取消</el-button>
                <el-button type="primary" @click.native="clickAbout('aboutForm')">提交</el-button>
              </div>
            </el-dialog>
            <!-- 表格数据操作 -->
            <el-table
              :data="AboutData"
              @select="delselect"
              stripe
              border
              id="out-table"
              style="width: 100%;margin-top: 10px;"
            >
              <!-- 勾选框 -->
              <el-table-column type="selection" width="55"></el-table-column>
              <!-- 索引 -->
              <el-table-column align="center" type="index" prop="data" label="序号" width="100"></el-table-column>
              <el-table-column align="center" prop="data" label="图片" width="80">
                <template slot-scope="scope">
                  <el-popover placement="right" title trigger="click">
                    <img :src="scope.row.filePath" style="height: 500px;width: 500px" />
                    <img
                      slot="reference"
                      :src="scope.row.filePath"
                      alt
                      style="max-height: 50px;max-width: 130px"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="链接" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.link}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="标题" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="内容">
                <template slot-scope="scope">
                  <span>{{scope.row.content}}</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 页码 -->
            <div align="center">
              <el-pagination
                background
                :current-page="page"
                :page-size="num"
                layout="total, sizes, prev, pager, next, jumper"
                :total="CountAbout"
              ></el-pagination>
            </div>
          </vue-scroll>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      uploadData: {},
      uploadjournalism: {},
      uploadAbout: {},
      action: ajax.doms.bind(this)("/api/System/Page/AddRotary"),
      actionJournalism: ajax.doms.bind(this)("/api/System/Page/AddNews"),
      actionAbout: ajax.doms.bind(this)("/api/System/Page/AddAboutUs"),
      Popular: 1, //热门切换按钮
      active: 0,
      CountAbout: "",
      countJournalism: "",
      page: 1,
      num: 2,
      editFormVisible: false,
      editFormlism: false,
      editFormname: false,
      editForm: {
        link: ""
      },
      editrules: {
        urls: "",
        title: "",
        content: ""
      },
      aboutForm: {
        usurl: "",
        ustitle: "",
        uscontent: ""
      },
      rules: {
        link: [{ required: true, message: "请输入图片超链接", trigger: "blur" }]
      },
      Journalismrules: {
        urls: [{ required: true, message: "请输入标题", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      aboutrules: {
        usurl: [
          { required: true, message: "请输入图片超链接", trigger: "blur" }
        ],
        ustitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
        uscontent: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      fileList: [],
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      listData: [],
      journalismData: [],
      AboutData: [],
      delId: "",
      delLink: "",
      delTitle: "",
      delFilePath: ""
    };
  },
  methods: {
    //勾选出发事件钩子
    delselect(selection, row) {
      console.log(selection);
      // console.log(row)
      for (var i = 0; i < selection.length; i++) {
        this.delId = selection[i].id;
      }
      // console.log(this.delId)
    },
    //获取轮播
    getData() {
      ajax.authGet.bind(this)("/api/System/Page/Rotary", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.listData = res.data.data;
        }
      });
    },
    //获取新闻资讯
    getJournalism() {
      ajax.authGet.bind(this)("/api/System/Page/News", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.journalismData = res.data.data;
          this.countJournalism = this.journalismData.length;
        }
      });
    },
    //获取关于我们
    getAbout() {
      ajax.authGet.bind(this)("/api/System/Page/AboutUs", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.AboutData = res.data.data;
          this.CountAbout = this.AboutData.length;
        }
      });
    },
    //提交图片资料
    submit(editForm) {
      this.$refs[editForm].validate(valid => {
        if (valid) {
          this.uploadData.link = this.editForm.link;
          this.$refs.upload.submit();
          this.editForm.link = "";
        } else {
          return false;
        }
      });
    },
    //提交新闻资料
    clickJournalism(editrules) {
      this.$refs[editrules].validate(valid => {
        if (valid) {
          this.uploadjournalism.link = this.editrules.url;
          this.uploadjournalism.title = this.editrules.title;
          this.uploadjournalism.content = this.editrules.content;
          this.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },
    //提交关于我们
    clickAbout(aboutForm) {
      this.$refs[aboutForm].validate(valid => {
        if (valid) {
          this.uploadAbout.link = this.aboutForm.usurl;
          this.uploadAbout.title = this.aboutForm.ustitle;
          this.uploadAbout.content = this.aboutForm.uscontent;
          this.$refs.upload.submit();
          //  this.$message("提交成功");
        } else {
          return false;
        }
      });
    },
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 删除数据
    del() {
      ajax.authPost.bind(this)(
        "/api/System/Page/Remove?id=" + this.delId,
        res => {
          console.log(res);
          this.getData();
          this.getJournalism();
          this.getAbout();
        }
      );
    },
    //每页显示数据量变更
    handleSizeChange: function(val) {
      this.num = val;
      // this.getAllList(this.search, this.page, this.num);
    },

    //页码变更
    handleCurrentChange: function(val) {
      this.page = val;
      // this.getAllList(this.search, this.page, this.num);
    },
    // 开关
    Switch(i,row) {
      let data= {id:row,isHotSpot:i}
      ajax.authPostForm.bind(this)('/api/System/Page/HotSpot',data,res=>{
        console.log(res)
      })
    }
  },
  mounted() {
    this.getData();
    this.getJournalism();
    this.getAbout();
  }
};
</script>

<style lang="less" scoped>
.manage {
  .manage-title {
    height: 30px;
  }
  .mentone {
    width: 100%;
    padding: 20px;
    margin-top: 10px;
    background: #ffffff;
    /deep/.van-tabs__content {
      padding: 15px;
    }
    /deep/.van-tabs--card {
      padding-top: 0;
    }
    /deep/.cell {
      width: 100%;
      height: 28px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    /deep/.el-table--enable-row-transition {
      height: 397px;
      overflow: hidden scroll;
    }
  }
}
// height: 397px;
//     overflow: hidden scroll;
</style>
