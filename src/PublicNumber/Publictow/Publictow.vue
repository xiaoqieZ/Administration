<template>
    <div class="About-us">
        <mt-header fixed title="关于我们">    
        </mt-header>
        <div class="Aboutcenter" v-for="item in aboutUs" :key="item.id">
            <div class="Aboutcenter_content">
                <h4>{{item.title}}</h4>
                <p>{{item.content}}</p>
            </div>
            <div class="Aboutcenter_img">
                <img :src="item.filePath" :alt="item.title">
            </div>
        </div>
        <div>
            
        </div>
        <tabbar-home></tabbar-home>
    </div>
    
</template>

<script>
import tebbarhome from '../../components/Publictebbar/Publictebbar'
import ajax from "../../api/https.js";
export default {
    data(){
        return{
            addspy:'',
            aboutUs:[],
        }
    },
    components:{
        'tabbar-home':tebbarhome
    },
    methods:{
        //获取关于我们
        getAboutUs(){
            ajax.authGet.bind(this)('/api/Information/Present/AboutUs/3',res=>{
                this.aboutUs = res.data.data
            })
        }
    },
    mounted(){
        this.getAboutUs()
    }
}
</script>

<style lang="less">
.About-us{
    padding-top: 40px;
    .Aboutcenter{
        width: 100%;
        height: 100px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
         .Aboutcenter_img{
                width: 30%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
    }
}
</style>
