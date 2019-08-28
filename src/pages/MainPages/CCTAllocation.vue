 <template>
 <div id="app">
   <div slot="投资者份额" style="font-size:16px;">
         投资者份额
   </div>
   <vue-scroll>
    <div class="currenminput">
        <div class="left">
          <el-input v-model="username" placeholder="请输入姓名"></el-input>
          &nbsp;&nbsp;
          <el-input v-model="address" placeholder="请输入地址" @keyup.native.enter='getAdd'></el-input>
          &nbsp;&nbsp;
          <el-button type="primary" @click='getAdd'>添加</el-button>
          &nbsp;&nbsp;
          <el-button type="primary" @click="exportExcel">导出</el-button>

        </div>
        <div class="searchright">
          <el-input v-model="search" placeholder="输入搜索内容"  prefix-icon="el-icon-search"></el-input>
        </div>
    </div>
    <!-- 表格数据操作 -->
  <el-table
    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    stripe
    id="out-table"
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
      label="姓名/机构名称"
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
      label="客户类型"
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
      label="风险等级"
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
      label="投资者类型">  
      <template slot-scope="scope">
          <span>
              {{scope.row.content}}
          </span>
      </template> 
    </el-table-column>
    <el-table-column
      align="center"
      prop="data"
      label="持仓产品">  
      <template slot-scope="scope">
          <span>
              {{scope.row.content}}
          </span>
      </template> 
    </el-table-column>
    <el-table-column
      align="center" 
      width="280"
      label="持仓份额">
    </el-table-column>
  </el-table>

  <!-- 页码 -->
  <div align="center">
  <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" 
        :current-page="page"
        :page-size="num"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        >
    </el-pagination>
    </div>
    </vue-scroll>
  </div>
</template>

<script>
import ajax from '../../api/https.js'
import vuescroll from 'vuescroll';
import { Toast } from 'mint-ui';
 // 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
  export default {
    data() {
      return {
        tableData: [],          //请求过来的数据
        username:'',           //姓名
        address:'',           //地址
        num:7,               //每页显示数据条数
        page:1,             //默认第一页
        search:'',         //搜索
        totalCount:100,   //默认一百条
        currentRow: [] , //选中的值
        editForm: {
          name:'',
          addres:'',
        }, 
        guid:'',
        diz:'',
        times:'',
      }
    },
    methods:{
        getAllList:function() {//获取数据  
            let list={num:this.num,page:this.page};
                ajax.get.bind(this)('/api/vue/getwz',{params:list},(res) => {
                    console.log(res);
                        if (res.status == 200) {
                            this.tableData = res.data;
                        }
                    }),
                    (error=> {
                    console.log(error);
                    })
                },
        // 添加
        getAdd(){
          if(this.username&&this.address!=''){
            let data={
                title:this.username,
                content:this.address
                }
            ajax.post.bind(this)('/api/vue/addwz',data,(res)=>{
                console.log(res);
                if(res.status==200){
                    this.getAllList();
                    this.username=this.address=''
                }
            }),
            (error=> {
                console.log(error);
            })
            }else{
              // Toast({
              //   message: '输入框内不能留空',
              //   position:'top',
              //   duration: 2000
              // });
              this.$message({
              showClose: true,
              message: '输入框内不能留空',
              duration:2000,
              type: 'warning'
            });
            }
        },
        //每页显示数据量变更
        handleSizeChange: function(val) {
            this.num = val;
            this.getAllList(this.search, this.page, this.num);
        },
        //页码变更
        handleCurrentChange: function(val) {
            this.page = val;
            this.getAllList(this.search, this.page, this.num);
        },
       //定义导出Excel表格事件
       exportExcel() {
       /* 从表生成工作簿对象 */
       var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
       /* 获取二进制字符串作为输出 */
       var wbout = XLSX.write(wb, {
           bookType: "xlsx",
           bookSST: true,
           type: "array"
       });
       try {
           FileSaver.saveAs(
           //Blob 对象表示一个不可变、原始数据的类文件对象。
           //Blob 表示的不一定是JavaScript原生格式的数据。
           //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
           //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
           new Blob([wbout], { type: "application/octet-stream" }),
           //设置导出文件名称
           "qiezi.xlsx"
           );
       } catch (e) {
           if (typeof console !== "undefined") console.log(e, wbout);
       }
       return wbout;
       },
      },
    mounted(){
        this. getAllList()
    }
  }
</script>
 
 <style lang="less" >
    .currenminput{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-input{
            width: 220px;
        }
        .searchright{
          right: 0;
          .el-input__icon{
            width: 75%;
          }
        }
        /deep/.el-button{
          width: 70px;
          height: 40px;
        }
    }
    .el-dialog__wrapper{
          z-index: 9999!important;
    }

 </style>
 