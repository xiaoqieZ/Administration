<template>
    <div>
        <mt-header fixed title="购买申请记录">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div>
            <p>尊敬的投资者<span>- -</span>,您好！</p>
            <p>以下内容为您购买的产品：<span>- -</span>的回访确认问卷，请您如实作答：</p>
        </div>
        <div v-for="item in radioData" :key="item.id">
            <p>{{item.title}}</p>
            <div v-for="open in item" :key="open.id">
                <el-radio v-model="radio" :label="open.score">{{open.content}}</el-radio>
            </div>           
        </div>
    </div>
</template>

<script>
import ajax from "../../../api/https.js";
export default {
    data(){
        return{
           radio:'',
           radioData:[],
        }
    },
    methods:{
        getRadio(){
            ajax.authGet.bind(this)('/api/Information/Present/Product/VisitBack/Questionnaire?visitId='+1,res=>{
                this.radioData=res.data.data
            })
        }
    },
    mounted(){
        this.getRadio()
    }
}
</script>

<style>

</style>
