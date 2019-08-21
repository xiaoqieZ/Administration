<template>
    <div class="center">
        <div>下载中心</div>
        <div class="center-list">
            <el-tabs type="border-card">
                <el-tab-pane label="人员数据">人员数据</el-tab-pane>
                <el-tab-pane label="产品数据">
                    <el-button type="primary" @click="exportExcel">下载</el-button>
                    <el-table
                    stripe
                    border
                    :data="tableData"
                    id="out-table"
                    style="width: 100%;margin-top: 10px;">
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
                    prop="date"
                    label="日期"
                    width="180">
                    <!-- <template slot-scope="scope">
                        <span>
                            111
                        </span>
                    </template> -->
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="name"
                    label="姓名"
                    width="100">
                    <!-- <template slot-scope="scope">
                        <span>
                            222
                        </span>
                    </template> -->
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="address"
                    label="地址"
                    width="180">  
                    <!-- <template slot-scope="scope">
                        <span>
                            333
                        </span>
                    </template>  -->
                    </el-table-column>
                    </el-table>
                    <!-- 分页码 -->
                    <div align="center">
                        <el-pagination
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount"
                            >
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
 // 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    data(){
        return{
            totalCount:20,     //页数
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    },
    methods:{
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
    }
}
</script>

<style lang="less">
.center{
    .center-list{
        background: #ffffff;
        padding: 10px 0 10px 10px;
        margin-top: 10px;
    }
}

</style>
