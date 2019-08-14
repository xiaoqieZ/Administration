<template>
    <div class="home-page">
        <div class="hometitle">
            首页
        </div>
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white" :height="180">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
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
                    <P class="title">润达3号私募证券投资</P>
                    <p>累计收益：<span>41.38%</span></p>
                    <p>最新净值：<span>104265</span></p>
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
        
            
        <tabbar-home></tabbar-home>
    </div>
</template>

<script>
import tebbarhome from '../../components/Publictebbar/Publictebbar'
export default {
    data(){
        return{

        }
    },
    methods:{
        more(){
            this.$router.push({path: '/Publicthree'})
        },
        ition(){
            this.$router.push({path:'/Information'})
        }
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
    background: #dde1e6;
    .hometitle{
        height: 36px;
        color: #fff;
        background: #5aa8fb;   
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .hometlist{
      width: 100%;
      margin-top: 10px;
      margin-bottom: 65px;
      background: #fff;
      padding: 0 8px;
      border-bottom:1px solid #666; 
      .hometadd{
          height: 40px;
          display: flex;
          border-bottom: 1px solid #666;
          align-items: center;
          justify-content: space-between;
      }
      .hometnav::-webkit-scrollbar {
          display: none;
      }
      .hometnav{
          width: 100%;
          height: 120px;
          position: relative;
          overflow-x: scroll;
          .hometswrip{
              width: 200%;
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
}
</style>
