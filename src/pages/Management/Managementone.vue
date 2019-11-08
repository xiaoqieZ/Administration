<template>
  <div class="manage">
    <div class="manage-title">页面设置</div>
    <div class="mentone">
      <van-tabs v-model="active" type="card">
        <van-tab title="轮播图">
          <vue-scroll>
            <div class="currenminput">
              <div class="left">
                <van-button type="info" size="small" @click="addChart">添加</van-button>
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
                  ref="upload1"
                  :data="uploadData"
                  :action="action"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="chengecheng1"
                  :on-error="upError1"
                  :on-change="handleChange"
                  :file-list="fileList1"
                  :headers="access_token"
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
            <!-- 轮播图表格数据操作 -->
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
              <el-table-column align="center" prop="data" label="图片" width="100">
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
              <el-table-column align="center" prop="data" label="操作" width="100">
                <template slot-scope="scope">
                  <span class="spanColor" @click="clickChart(scope.$index, scope.row)">编辑</span>
                </template>
              </el-table-column>
            </el-table>
          </vue-scroll>
        </van-tab>
        <van-tab title="新闻资讯">
          <vue-scroll>
            <div class="currenminput">
              <div class="left">
                <van-button type="info" size="small" @click="addJournalism">添加</van-button>
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
                  ref="upload2"
                  :data="uploadjournalism"
                  :action="action"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="chengecheng2"
                  :on-error="upError2"
                  :on-change="handleChange"
                  :file-list="fileList2"
                  :headers="access_token"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormlism = false">取消</el-button>
                <el-button type="primary" @click.native="clickJournalism('editrules')">提交</el-button>
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
                    @change="Switch(scope.row)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="链接" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.link}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="data" label="操作" width="180">
                <template slot-scope="scope">
                  <span class="spanColor" @click="clickJournalismEdit(scope.$index, scope.row)">编辑</span>
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
                <van-button type="info" size="small" @click="addAbout">添加</van-button>
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
                  ref="upload3"
                  :data="uploadAbout"
                  :action="action"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="chengecheng3"
                  :on-error="upError3"
                  :on-change="handleChange"
                  :file-list="fileList3"
                  :headers="access_token"
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
              <el-table-column align="center" prop="data" label="操作">
                <template slot-scope="scope">
                  <span class="spanColor" @click="clickaboutEdit(scope.$index, scope.row)">编辑</span>
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
      action: ajax.doms.bind(this)("/api/System/Page/Upload"),
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
      fileList1: [],
      fileList2: [],
      fileList3: [],
      access_token: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token")
      },
      listData: [],
      journalismData: [],
      AboutData: [],
      delId: "",
      delLink: "",
      delTitle: "",
      delFilePath: "",
      currentFileId: 0, //轮播图的ID
      chartId: 0, //轮播图里面的row.ID
      JournalismId: 0,
      aboutId: 0
    };
  },
  methods: {
    upError1(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles1();
    },
    upError2(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles2();
    },
    upError3(err, file, fileList) {
      this.$message({
        message: "上传失败",
        type: "error"
      });
      //还原
      this.clearFiles3();
    },
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
    //文件上传个数
    handleChange(file, fileList) {
      this.fileList = fileList.length > 1 ? fileList.splice(0, 1) : fileList;
    },
    //报表文件上传成功回调
    chengecheng1(response, file, fileList) {
      //轮播图的ID
      this.currentFileId = ajax.getMaterialId.bind(this)(response, () => {
        //还原
        this.clearFiles1();
      });
    },
    chengecheng2(response, file, fileList) {
      //新闻图的ID
      this.JournalismId = ajax.getMaterialId.bind(this)(response, () => {
        //还原
        this.clearFiles2();
      });
    },
    chengecheng3(response, file, fileList) {
      //关于
      this.aboutId = ajax.getMaterialId.bind(this)(response, () => {
        //还原
        this.clearFiles3();
      });
    },
    //移除/还原文件列表
    clearFiles1() {
      this.$refs["upload1"].clearFiles();
    },
    //移除/还原文件列表
    clearFiles2() {
      this.$refs["upload2"].clearFiles();
    },
    //移除/还原文件列表
    clearFiles3() {
      this.$refs["upload3"].clearFiles();
    },
    //清空上传成功后的文件列表
    clearUploadedImage() {
      this.$refs.upload.clearFiles();
    },
    //提交图片资料
    submit(editForm) {
      this.$refs[editForm].validate(valid => {
        if (valid) {
          var data = {
            link: this.editForm.link,
            materialId: this.currentFileId,
            id: this.chartId
          };
          ajax.authPost.bind(this)(
            "/api/System/Page/Rotary/Save",
            data,
            res => {
              this.editFormVisible = false;
              this.getData();
              this.clearUploadedImage();
              this.editForm.link = "";
            }
          );
        } else {
          return false;
        }
      });
    },
    //添加轮播图按钮
    addChart() {
      this.editFormVisible = true;
      this.chartId = 0;
      this.editForm.link = "";
    },
    //添加新闻按钮
    addJournalism() {
      this.editFormlism = true;
      this.chartId = 0;
      this.editrules.urls = this.editrules.title = this.editrules.content = "";
    },
    //添加关于按钮
    addAbout() {
      this.editFormname = true;
      this.chartId = 0;
      this.aboutForm.usurl = this.aboutForm.ustitle = this.aboutForm.uscontent =
        "";
    },
    //提交新闻资料
    clickJournalism(editrules) {
      this.$refs[editrules].validate(valid => {
        if (valid) {
          let data = {
            link: this.editrules.urls,
            title: this.editrules.title,
            content: this.editrules.content,
            materialId: this.JournalismId,
            id: this.chartId
          };
          ajax.authPost.bind(this)("/api/System/Page/News/Save", data, res => {
            this.editFormlism = false;
            this.getJournalism();
            this.clearUploadedImage();
            this.editrules.urls = this.editrules.title = this.editrules.content =
              "";
          });
        } else {
          return false;
        }
      });
    },
    //提交关于我们
    clickAbout(aboutForm) {
      this.$refs[aboutForm].validate(valid => {
        if (valid) {
          let data = {
            link: this.aboutForm.usurl,
            title: this.aboutForm.ustitle,
            content: this.aboutForm.uscontent,
            id: this.chartId,
            materialId: this.aboutId
          };
          ajax.authPost.bind(this)(
            "/api/System/Page/AboutUs/Save",
            data,
            res => {
              this.editFormname = false;
              this.getAbout();
              this.clearUploadedImage();
              this.aboutForm.usurl = this.aboutForm.ustitle = this.aboutForm.uscontent =
                "";
            }
          );
        } else {
          return false;
        }
      });
    },
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //编辑轮播图
    clickChart(i, row) {
      this.chartId = row.id;
      this.editFormVisible = true;
      this.editForm.link = row.link;
      this.currentFileId = row.fileId;
    },
    //编辑新闻
    clickJournalismEdit(i, row) {
      this.chartId = row.id;
      this.JournalismId = row.fileId;
      this.editFormlism = true;
      this.editrules.urls = row.link;
      this.editrules.title = row.title;
      this.editrules.content = row.content;
    },
    //编辑关于我们
    clickaboutEdit(i, row) {
      this.editFormname = true;
      this.aboutForm.usurl = row.link;
      this.aboutForm.ustitle = row.title;
      this.aboutForm.uscontent = row.content;
      this.chartId = row.id;
      this.aboutId = row.fileId;
    },
    // 图片文件
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
    Switch(row) {
      // let data = { id: row.id, isHotSpot: row.isHotSpot };
      ajax.authPost.bind(this)(
        "/api/System/Page/HotSpot?id=" + row.id + "&isHotSpot=" + row.isHotSpot,
        res => {
          // console.log(res);
        }
      );
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
    @media screen and (min-width: 1620px) {
      /deep/.el-table--enable-row-transition {
        height: 580px;
      }
    }
    @media screen and (max-width: 1080px) {
      /deep/.el-table--enable-row-transition {
        height: 320px;
      }
    }
  }
  .spanColor {
    color: #409eff;
    cursor:pointer;
  }
}
// height: 397px;
//     overflow: hidden scroll;
</style>
