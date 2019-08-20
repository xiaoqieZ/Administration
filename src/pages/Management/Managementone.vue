<template>
    <div class="manage">
        <div class="manage-title">页面设置</div>
        <div class="mentone">
            <van-tabs v-model="active" type="card">
                <van-tab title="轮播图">
                    <vue-scroll>
                        <div class="currenminput">
                            <div class="left">
                                <van-button type="info" size="small" @click="editFormVisible = true">添加</van-button>
                                <van-button type="danger" size="small" @click='del'>删除</van-button>
                            </div>
                        </div>
                        <!-- 新增轮播图 -->
                        <el-dialog title="新增轮播图" :visible.sync="editFormVisible" :close-on-click-modal="true" :append-to-body="true" width="80%">
                            <!--//editForm表单提交的数据-->
                            <el-form :model="editForm" label-width="80px"  ref="editForm">
                            <el-form-item label="链接" prop="name">
                                <el-input v-model="editForm.name" placeholder="请输入链接"></el-input>
                            </el-form-item>
                            </el-form>           
                            <div slot="footer" class="dialog-footer">
                            <el-button @click.native="editFormVisible = false">取消</el-button>
                            <el-button type="primary" @click.native="getAdd" >提交</el-button>
                            </div>
                        </el-dialog>
                        <!-- 表格数据操作 -->
                        <el-table
                            stripe
                            border
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
                            prop="data"
                            label="日期"
                            width="180">
                            <template slot-scope="scope">
                                <span>
                                    111
                                </span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="姓名"
                            width="100">
                            <template slot-scope="scope">
                                <span>
                                    222
                                </span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="地址"
                            width="180">  
                            <template slot-scope="scope">
                                <span>
                                    333
                                </span>
                            </template> 
                            </el-table-column>
                        </el-table>

                    <!-- 页码 -->
                        <div align="center">
                        <el-pagination
                                background
                                
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount"
                                >
                            </el-pagination>
                            </div>
                        </vue-scroll>
                </van-tab>
                <van-tab title="新闻资讯">
                    <vue-scroll>
                        <div class="currenminput">
                            <div class="left">
                                <van-button type="info" size="small" @click="editFormlism = true">添加</van-button>
                                <van-button type="danger" size="small" @click='del'>删除</van-button>
                            </div>
                        </div>
                        <!-- 新增新闻资讯 -->
                        <el-dialog title="新增新闻资讯" :visible.sync="editFormlism" :close-on-click-modal="true" :append-to-body="true" width="80%">
                            <!--//editForm表单提交的数据-->
                            <el-form :model="editForm" label-width="80px"  ref="editForm">
                            <el-form-item label="链接" prop="urls">
                                <el-input v-model="editForm.url" placeholder="请输入链接"></el-input>
                            </el-form-item>
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="editForm.title" placeholder="请输入模板标题"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" prop="content">
                                <el-input v-model="editForm.content" placeholder="请输入内容"></el-input>
                            </el-form-item>
                            </el-form>           
                            <div slot="footer" class="dialog-footer">
                            <el-button @click.native="editFormlism = false">取消</el-button>
                            <el-button type="primary" @click.native="getAdd" >提交</el-button>
                            </div>
                        </el-dialog>
                        <!-- 表格数据操作 -->
                        <el-table
                            stripe
                            border
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
                            prop="data"
                            label="日期"
                            width="180">
                            <template slot-scope="scope">
                                <span>
                                    111
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
                                    222
                                </span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="地址">  
                            <template slot-scope="scope">
                                <span>
                                    333
                                </span>
                            </template> 
                            </el-table-column>
                        </el-table>
                    <!-- 页码 -->
                        <div align="center">
                        <el-pagination
                                background
                                
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount"
                                >
                            </el-pagination>
                            </div>
                        </vue-scroll>
                </van-tab>
                <van-tab title="关于我们">
                    <vue-scroll>
                        <div class="currenminput">
                            <div class="left">
                                <van-button type="info" size="small" @click="editFormname = true">添加</van-button>
                                <van-button type="danger" size="small" @click='del'>删除</van-button>
                            </div>
                        </div>
                        <!-- 新增关于我们 -->
                        <el-dialog title="新增关于我们" :visible.sync="editFormname" :close-on-click-modal="true" :append-to-body="true" width="80%">
                            <!--//editForm表单提交的数据-->
                            <el-form :model="editForm" label-width="80px"  ref="editForm">
                            <el-form-item label="链接" prop="usurl">
                                <el-input v-model="editForm.usurl" placeholder="请输入链接"></el-input>
                            </el-form-item>
                            <el-form-item label="标题" prop="ustitle">
                                <el-input v-model="editForm.ustitle" placeholder="请输入模板标题"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" prop="uscontent">
                                <el-input v-model="editForm.uscontent" placeholder="请输入内容"></el-input>
                            </el-form-item>
                            </el-form>           
                            <div slot="footer" class="dialog-footer">
                            <el-button @click.native="editFormname = false">取消</el-button>
                            <el-button type="primary" @click.native="getAdd" >提交</el-button>
                            </div>
                        </el-dialog>
                        <!-- 表格数据操作 -->
                        <el-table
                            stripe
                            border
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
                            prop="data"
                            label="日期"
                            width="180">
                            <template slot-scope="scope">
                                <span>
                                    111
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
                                    222
                                </span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="地址">  
                            <template slot-scope="scope">
                                <span>
                                    333
                                </span>
                            </template> 
                            </el-table-column>
                        </el-table>
                    <!-- 页码 -->
                        <div align="center">
                        <el-pagination
                                background
                                
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount"
                                >
                            </el-pagination>
                            </div>
                        </vue-scroll>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active:0,
            totalCount:20,
            editFormVisible:false,
            editFormlism:false,
            editFormname:false,
            editForm:{
                name:'',
                addres:'',
                urls:'',
                title:'',
                content:'',
                usurl:'',
                ustitle:'',
                uscontent:''
            }
        };
    },
    methods:{
        getAdd(){

        },
        del(){

        }
    }
}
</script>

<style lang="less" scoped>
 .manage{
     .manage-title{
         height: 30px;
     }
     .mentone{
         width: 100%;
         padding:20px; 
         margin-top: 10px;
         background: #ffffff;
         /deep/.van-tabs__content{
             padding: 15px;
         }
     }
 }
</style>
