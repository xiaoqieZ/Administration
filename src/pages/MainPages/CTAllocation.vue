<template>
    <div>
        <div>币种交易参数配置</div>
    <template>
           <span>性别：</span>
            <el-radio-group v-model="radio">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">阴</el-radio>
            </el-radio-group>
            <button @click="play">提交</button>
    </template>
    </div>
</template>

<script>
export default {
        data(){
            return{
                radio:''
            }
        },
        methods:{
            play(){
                console.log(this.radio)
                }
        }
}
</script>

<style>

</style>
