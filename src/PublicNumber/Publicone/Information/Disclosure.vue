<template>
  <div>
    <mt-header fixed title="信息披露">
      <router-link to="/Publicone" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="disclosure_title">
      <div class="cesname" v-if="this.$route.query.list==null">
        <div
          class="count_list"
          v-for="items in disclosureData"
          :key="items.id+''+items.messageType"
        >
          <div class="disclosure">
            <div>
              <span>{{items.messageTypeName}}：</span>&nbsp;
              <span>{{items.date}}</span>
              <p>{{items.title}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cesname">
        <div v-if="this.$route.query.list&&this.$route.query.list.messageType==2">
          <div>
            <span>报告标题：</span>
            {{ReportData.title}}
          </div>
          <div>
            <span>附件：</span>
            <a :href="Reportfile" target="_blank">{{ReportfileName}}</a>
          </div>
        </div>
        <div v-if="this.$route.query.list&&this.$route.query.list.messageType==1">
          <div>
            <span>公告标题：</span>
            {{NoticeData.title}}
          </div>
          <div>
            <span>公告内容：</span>
            {{NoticeData.content}}
          </div>
          <div>
            <span>附件：</span>
            <a :href="Noticefile" target="_blank">{{NoticefileName}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from "../../../api/https.js";
export default {
  data() {
    return {
      disclosureData: [],
      pageIndex: 1,
      pageSize: 20,
      ReportData: {},
      NoticeData: {},
      Reportfile: "",
      ReportfileName: "",
      Noticefile: "",
      NoticefileName: ""
    };
  },
  methods: {
    getDisclosure() {
      //信息披露
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/ProductMessage",
        data,
        res => {
          this.disclosureData = res.data.data.list;
        }
      );
    },
    // 通过报告Id获取报告数据
    getReport() {
        if(this.$route.query.list!=null){
      ajax.authGet.bind(this)(
        "/api/Information/Present/ProductMessage/Report?reportId=" +
          this.$route.query.list.id,
        res => {
          this.ReportData = res.data.data;
          this.Reportfile =
            res.data.data.material && res.data.data.material.fullPath;
          this.ReportfileName =
            res.data.data.material && res.data.data.material.fileName;
        }
      );
      // 通告公告Id获取公告数据
      ajax.authGet.bind(this)(
        "/api/Information/Present/ProductMessage/Notice?noticeId=" +
          this.$route.query.list.id,
        res => {
          this.NoticeData = res.data.data;
          this.Noticefile =
            res.data.data.material && res.data.data.material.fullPath;
          this.NoticefileName =
            res.data.data.material && res.data.data.material.fileName;
        }
      );
    }
    }
  },
  mounted() {
    this.getDisclosure();
    this.getReport();
  }
};
</script>
<style lang="less" scoped>
.disclosure_title {
  padding-top: 40px;
  .cesname {
    padding: 10px;
    .count_list {
      border-bottom: 1px solid rgb(134, 131, 131);
      padding-top: 10px;
      .count_img {
        width: 100%;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .disclosure {
        width: 100%;
        height: 44px;
      }
    }
  }
}
</style>