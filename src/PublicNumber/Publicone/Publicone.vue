<template>
    <div class="home-page">
        <mt-header fixed title="首页">    
        </mt-header>
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white" :height="120" >
            <van-swipe-item v-for="item in listtu" :key="item.id">
                <img :src="item.filePath" alt />
            </van-swipe-item>
        </van-swipe>

        <!-- 中间内容 -->
        <div class="hometlist">
            <div class="hometadd">
                <span>热门产品</span>
                <span @click="more">更多</span>
            </div>
            <div class="hometnav">
                <div class="hometswrip">
                    <div class="homeopesion">
                    <P class="title">润达36号私募证券投资</P>
                    <p>累计收益：<span>41.38%</span></p>
                    <p>最新净值：<span>10425</span></p>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="homeopesion">
                    <p class="title">润达4号私募证券投资</p>
                    <p>累计收益：<span>41.38%</span></p>
                    <p>最新净值：<span>104265</span></p>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="homeopesion">
                    <p class="title">润达5号私募证券投资</p>
                    <p>累计收益：<span>41.38%</span></p>
                    <p>最新净值：<span>104265</span></p>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="homeopesion">
                    <p class="title">润达6号私募证券投资</p>
                    <p>累计收益：<span>41.38%</span></p>
                    <p>最新净值：<span>104265</span></p>
                </div>
                </div>
            </div>
            <div class="Information">
                <span>热门资讯</span>
                <span @click="ition">更多</span>
            </div>
        </div>
        <div class="cesname">
            <div>测试：</div>
            <div>我是vuex传过来的值 --  {{this.$store.state.count}}</div>
            <button @click="include">加1个吧</button> 
        </div>  
        <tabbar-home></tabbar-home>
    </div>
</template>

<script>
import tebbarhome from '../../components/Publictebbar/Publictebbar'
import store from '../../store/index.js'
import ajax from '../../api/https.js'
export default {
    data(){
        return{
            listtu:[],         //轮播图
            addspy:'',         //sessionstorage保存下来的数据
        }
    },
    store,
    methods:{
        include(){    //vuex那边过来的
            this.$store.commit('include');
        },
        more(){
            this.$router.push({path: '/Publicthree'})
        },
        ition(){
            this.$router.push({path:'/Publicone/Information'})
        },
        
        //获取轮播图
        getlisttu(){
            ajax.authGet.bind(this)('/api/Information/Present/Rotary/3',res =>{
                console.log(res);
                if(res.data.code==200){
                   this.listtu=res.data.data
                   console.log(this.listtu) 
                }
            }) 
        },
    },
    created(){
        this.getlisttu();
    },
    components:{
        'tabbar-home':tebbarhome
    },
    changePage(current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      console.log(item, index)
    }
  
}
</script>

<style lang="less">
.home-page{
    padding-top: 40px;
    background: #dde1e6;
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
  }
  img{
      width: 100%;
      height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .hometlist{
      width: 100%;
      margin-bottom: 65px;
      background: #fff;
      padding: 0 8px;
      .hometadd{
          height: 40px;
          display: flex;
          border-bottom: 1px solid #666;
          align-items: center;
          justify-content: space-between;
      }
      .hometnav::-webkit-scrollbar {        //关闭滚动条
          display: none;
      }
      .hometnav{
          width: 100%;
          height: 120px;
          position: relative;
          overflow-x: scroll;
          border-bottom: 1px solid #666; 
          .hometswrip{
              width: 217%;
              height: 120px;
              position: absolute;
              display: flex;
              align-items: center;
              .el-divider--vertical{
                  height: 4em;
                  margin: 0px 30px;
              }
              .homeopesion{
                  width: 48%;
                  .title{
                     color: #000;
                     font-weight: 600
                  }
                  span{
                      color: red;
                      font-weight: 600;
                  }
              }
          }
      }
      .Information{
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
  .cesname{
      padding: 0 10px;
  }
}
</style>
