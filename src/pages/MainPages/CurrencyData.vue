 <template>
 <div id="app">
     <div slot="币种资料管理">
         币种资料管理
     </div>
    <div class="currenminput">
        <div class="left">
          <el-input v-model="username" placeholder="请输入姓名"></el-input>
          &nbsp;&nbsp;
          <el-input v-model="address" placeholder="请输入地址"></el-input>
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
      width="180"
      label="操作">
         <template slot-scope="scope">
            <el-button
            size="mini"
             @click="handleEdit(scope.$index,scope.row)"
            >编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click.prevent="del(scope.$index, scope.row)"
            >删除
            </el-button>
      </template>
          </el-table-column>

          <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="true" :append-to-body="true">
      <!--//editForm表单提交的数据-->
      <el-form :model="editForm" label-width="80px"  ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" >提交</el-button>
			</div>
    </el-dialog>


    <!-- 页码 -->
  </el-table>
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
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
 // 引入导出Excel表格依赖
    import FileSaver from "file-saver";
    import XLSX from "xlsx";
  export default {
    data() {
      return {
        tableData: [],         //请求过来的数据
        username:'',          //姓名
        address:'',          //地址
        num:7,               //每页显示数据条数
        page:1,             //默认第一页
        search:'',         //搜索
        totalCount:100,    //默认一百条
        currentRow: [] , //选中的值
        editFormVisible: false,   //设置默认弹出框  为false
        editForm: {
          name:'',
          address:'',
        },
      }
    },
    methods:{
        getAllList() {//获取数据  
            let list={num:this.num,page:this.page};
                this.$http.get('http://mx.maplegg.com/api/vue/getwz',{params:list}).then(res => {
                    console.log(res);
                        if (res.status === 200) {
                            this.tableData = res.data;
                        } else {
                            alert('请求数据失败')
                        }
                    })
                },
                // 添加
                getAdd(){
                  if(this.username&&this.address!=''){
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
                // 删除
                del(index, row){
                    console.log(index);
                    console.log(row);
                    this.$http.post('http://mx.maplegg.com/api/vue/delwz',{emulateJSON: true,id: row.id}).then(res=>{
                    console.log(res);
                    if(res.status==200){
                        this.getAllList();
                    }else {
                         alert('删除失败')
                    }
                })
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
                // 编辑  
                // handleEdit: function(index, row) {
                //     this.$prompt('请输入新名称', '提示','地址', {
                //           confirmButtonText: '确定',
                //           cancelButtonText: '取消',
                //         }).then(({ value }) => {
                //             if(value==''||value==null)
                //                 return;
                //             this.$http.post('newstu/update',{"id":row.id,"title":value,'content':value},{emulateJSON: true}).then(function(res){
                //                 this.loadData(this.search, this.page, this.num);                              
                //             },function(){
                //             });
                //         }).catch(() => {

                //     });
                // },
                // 编辑
                handleEdit:function (index, row) {
                  this.editFormVisible = true;
                  this.editForm = Object.assign({}, row);   //拿到数据
                  // let obj=this.editForm;
                  // var modify={
                  //   title=obj.username,
                  //   content=obj.address
                  // }
                  // this.name=obj.username;
                  // this.username=obj.address;
                  console.log(this.editForm);
                },
                // 确认编辑
                editSubmit(){
                  console.log('发送成功');
                  this.editFormVisible = false
                  // this.editForm;
                  // console.log(this.editForm);
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
                    }
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
        justify-content: space-between;
        .el-input{
            width: 230px;
        }
        .searchright{
          right: 0;
        }
        /deep/.el-button{
          width: 70px;
          height: 40px;
        }
    }
 </style>
 
