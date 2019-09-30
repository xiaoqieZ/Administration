<template>
    <div>
        <mt-header fixed title="购买申请记录">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        
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
            
        }
    },
    mounted(){
        this.getRadio()
    }
}
</script>

<style>

</style>
