<template>
  <div class="hition">
    <mt-header fixed title="热门资讯">
      <router-link to="/Publicone" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="hit">
      <div class="count_list" v-for="item in countData" :key="item.id">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item :title="item.title" :name="item.id">{{item.content}}</van-collapse-item>
        </van-collapse>
        <div class="count_img">
          <a :href="item.link">
            <img :src="item.filePath" alt />
          </a>
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
      countData: [], //新闻数据
      activeName: "",
    };
  },
  methods: {
    //获取新闻资讯
    getCount() {
      ajax.authGet.bind(this)("/api/Information/Present/News/6", res => {
        this.countData = res.data.data;
      });
    }
  },
  mounted() {
    this.getCount();
  }
};
</script>

<style lang="less">
.hition {
  .hit {
    padding-top: 40px;
    .count_list {
      border-bottom: 2px solid;
      padding: 10px;
      .count_img {
        width: 100%;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>