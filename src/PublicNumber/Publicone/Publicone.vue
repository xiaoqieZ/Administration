<template>
  <div class="home-page">
    <mt-header fixed title="首页"></mt-header>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white" :height="120">
      <van-swipe-item v-for="item in listtu" :key="item.id">
        <a :href="item.link">
          <img :src="item.filePath" alt />
        </a>
      </van-swipe-item>
    </van-swipe>

    <!-- 中间内容 -->
    <div class="hometlist">
      <div class="hometadd">
        <span>热门产品</span>
        <span @click="more">更多</span>
      </div>
      <div class="hometnav">
        <div class="hometswrip"  v-for="item in popularData" :key="item.productId">
          <div class="homeopesion" @click="getInto(item)">
            <P class="title">{{item.name}}</P>
            <p>
              累计收益：
              <span>{{item.accumulatedIncome}}</span>
            </p>
            <p>
              最新净值：
              <span>{{item.unitWorth}}</span>
            </p>
          </div>
          <el-divider direction="vertical"></el-divider>
        </div>
      </div>
      <div class="Information">
        <span>热门资讯</span>
        <span @click="ition">更多</span>
      </div>
    </div>
    <div class="cesname">
      <div class="count_list" v-for="item in countData" :key="item.id" v-if="item.isHotSpot==1">
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
    <tabbar-home></tabbar-home>
  </div>
</template>

<script>
import tebbarhome from "../../components/Publictebbar/Publictebbar";
import store from "../../store/index.js";
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      listtu: [], //轮播图
      addspy: "", //sessionstorage保存下来的数据
      countData: [], //新闻数据
      activeName: "",
      page:1,
      num:2,
      popularData:[],
    };
  },
  store,
  methods: {
    include() {
      //vuex那边过来的
      this.$store.commit("include");
    },
    more() {
      this.$router.push({ path: "/Publicthree" });
    },
    ition() {
      this.$router.push({ path: "/Publicone/Information" });
    },

    //获取轮播图
    getlisttu() {
      var count = 6;
      ajax.authGet.bind(this)(
        "/api/Information/Present/Rotary/" + count,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.listtu = res.data.data;
            // console.log(this.listtu);
          }
        }
      );
    },
    //获取热门产品
    getPopular(){
        let data = {
            pageIndex:this.page,
            pageSize:this.num,
        }
        ajax.authPost.bind(this)('/api/Information/Present/Product/Hot',data,res=>{
            this.popularData = res.data.data.list
        })
    },
    //进入产品信息页面
    getInto(item){
      let data = item.productId;
      //   console.log(data)
      this.$router.push({ path: "/Publicthree/Purchases", query: { data } });
    },
    //获取新闻资讯
    getCount() {
      ajax.authGet.bind(this)("/api/Information/Present/News/2", res => {
        this.countData = res.data.data;
      });
    }
  },
  created() {
    this.getlisttu();
    this.getCount();
    this.getPopular()
  },
  components: {
    "tabbar-home": tebbarhome
  },
  changePage(current) {
    // console.log("当前轮播图序号为:" + current);
  },
  clickHandler(item, index) {
    // console.log(item, index);
  }
};
</script>

<style lang="less">
.home-page {
  padding-top: 40px;
  background: #dde1e6;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .hometlist {
    width: 100%;
    margin-bottom: 10px;
    background: #fff;
    padding: 0 8px;
    .hometadd {
      height: 40px;
      display: flex;
      border-bottom: 1px solid #666;
      align-items: center;
      justify-content: space-between;
    }
    .hometnav::-webkit-scrollbar {
      //关闭滚动条
      display: none;
    }
    .hometnav {
      width: 100%;
      height: 120px;
      overflow-x: scroll;
      border-bottom: 1px solid #666;
      .hometswrip {
        width: 48%;
        height: 120px;
        display: inline-flex;
        align-items: center;
        text-align: center;
        .el-divider--vertical {
          height: 4em;
        }
        .homeopesion {
          width: 100%;
          .title {
            color: #000;
            font-weight: 600;
          }
          span {
            color: red;
            font-weight: 600;
          }
        }
      }
    }
    .Information {
      height: 40px;
      margin-top: 10px;
      background: #fff;
      padding: 0 8px;
      display: flex;
      border-bottom: 1px solid #666;
      align-items: center;
      justify-content: space-between;
    }
  }
  .cesname {
    padding: 0 10px 60px 10px;
    .count_list {
      border-bottom: 2px solid;
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
