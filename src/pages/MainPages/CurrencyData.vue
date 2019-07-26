 <template>
 <div id="app">
     <div slot="币种资料管理">
         币种资料管理
     </div>
    <div class="currenminput">
        <el-input v-model="username" placeholder="请输入姓名"></el-input>
        &nbsp;&nbsp;
        <el-input v-model="address" placeholder="请输入地址"></el-input>
        &nbsp;&nbsp;
        <el-button type="primary" @click='getAdd'>添加</el-button>
    </div>
    <!-- 表格数据操作 -->
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <!-- 勾选框 -->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <!-- 索引 -->
    <el-table-column
      align="center"
      type="index"
      prop="data"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      align="center"
      prop="data"
      label="日期"
      width="180">
      <template slot-scope="scope">
          <span>
              {{scope.row.created_at}}
          </span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="data"
      label="姓名"
      width="180">
      <template slot-scope="scope">
          <span>
              {{scope.row.title}}
          </span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="data"
      label="地址">  
      <template slot-scope="scope">
          <span>
              {{scope.row.content}}
          </span>
      </template> 
    </el-table-column>
    <el-table-column
      align="center" 
      label="操作">
         <template slot-scope="scope">
            <el-button
            size="mini"
            >编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click.prevent="del(scope.$index, scope.row)"
            >删除
            </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        navs:1,
        username:'',
        address:'',
        
      }
    },
    methods:{
        // //每页显示数据量变更
        //         handleSizeChange: function(val) {
        //             this.pagesize = val;
        //             this.loadData(this.criteria, this.currentPage, this.pagesize);
        //         },

        //         //页码变更
        //         handleCurrentChange: function(val) {
        //             this.navs = val;
        //             this.loadData(this.criteria, this.navs, this.pagesize);
        //         },     
        getAllList() {//获取数据  
                    this.$http.get('http://mx.maplegg.com/api/vue/getwz?num=6&page='+ this.navs).then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            this.tableData = res.data;
                            console.log(this.tableData);
                        } else {
                            alert('请求数据失败')
                        }
                    })
                },
                // 添加
                getAdd(){
                    let data={
                        title:this.username,
                        content:this.address
                        }
                    this.$http.post('http://mx.maplegg.com/api/vue/addwz',data,{ emulateJSON: true }).then(res=>{
                        console.log(res);
                        if(res.status==200){
                            this.getAllList();
                            this.username=this.address=''
                        }else{
                            Toast('数据请求失败')
                        }
                    })
                },
                // 删除
                del(index, row){
                    var array = [];
                    array.push(row.id);
                    this.$http.post('http://mx.maplegg.com/api/vue/delwz',{"array":array},{emulateJSON: true}).then(res=>{
                    console.log(res);
                    if(res.status==200){
                        this.getAllList()
                    }else {
                         alert('删除失败')
                    }
                })
        },
        
    },
    created(){
        this. getAllList()
    }
  }
</script>
 
 <style lang="less">
    .currenminput{
        height: 80px;
        display: flex;
        align-items: center;
        .el-input{
            width: 230px;
        }
    }
 </style>
 
