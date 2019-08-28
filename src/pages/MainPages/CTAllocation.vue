<template>
    <div>
        <div>客户审核</div>
    <template>
           <span>性别：</span>
            <el-radio-group v-model="radio">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
            <!-- <button @click="play(scope.$index,scope.row)">提交</button> -->
    </template>
            <!-- 选择题的接口：每道题对应一个id跟两个选项。 -->
            <div v-for="item in tableData" :key="item.id">
                  <!-- 每道题的id -->
                  <span>{{item.id}}.</span>
                  <!-- 题目 -->
                  <span>举个例子:</span>
                      <el-radio-group v-model="tableDatas" >
                        <el-radio :label="item.title" >
                        {{item.title}}
                        </el-radio>
                        <el-radio :label="item.content">
                        {{item.content}}
                        </el-radio>
                      </el-radio-group>
            <br/>
            </div>
            <el-button @click="play" >提交</el-button>
             <!-- <el-button @click="play" v-show="addb" disabled>提交</el-button>  -->

             <!-- 选择题的接口：每道题对应一个id跟两个选项。 -->
            <!-- <div v-for="item in tableData" :key="item.id" >
                  <span>{{item.id}}.</span>
                  <span>举个例子:{{item.timu}}</span>
                  <div v-for="stu in item.timu">
                      <el-radio-group v-model="tableDatas" >
                        <el-radio :label="item.title" >
                        {{stu.title}}
                        </el-radio>
                        <el-radio :label="item.content">
                        {{stu.content}}
                        </el-radio>
                      </el-radio-group>
                  </div>
                <br/>
            </div> -->
          
    </div>
</template>

<script>
import ajax from '../../api/https.js'
export default {
        data(){
            return{
                radio:'1',
                tableDatas:'',
                tableData:[],
                // adds:true,
                // addb:false,
            }
        },
        methods:{
            play(){
                
                console.log(this.tableDatas)
                // this.adds=false;
                // this.addb=true;
                },
        getAllList() {//获取数据  
            let list={num:this.num,page:this.page};
                ajax.get.bind(this)('/api/vue/getwz',list,(res) => {
                    console.log(res);
                        if (res.status === 200) {
                            this.tableData = res.data;
                        }
                    }),
                    (error=> {
                    console.log(error);
            })
                },
        },
        created(){
            this.getAllList()
        }
}
</script>

<style>

</style>
