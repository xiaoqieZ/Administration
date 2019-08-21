<template>
    <div class="send-message">
     <div>发送信息</div>
        <div class="send-list">
            <div class="left-button">
                <van-button type="info" size="small" @click="editFormVisible = true">添加</van-button>
                <van-button type="danger" size="small" @click='del'>删除</van-button>
            </div>
            <vue-scroll>
            <!-- 发送内容 -->
            <el-dialog title="发送内容" :visible.sync="editFormVisible" :close-on-click-modal="true" :append-to-body="true" width="80%">
                <!--//editForm表单提交的数据-->
                <el-form :model="editForm" label-width="80px"  ref="editForm">
                <el-form-item label="消息标题" prop="name">
                    <el-input v-model="editForm.name" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="消息内容" prop="text">
                    <el-input type="textarea" :rows="6" v-model="editForm.text" placeholder="请输入消息内容"></el-input>
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

            <!-- 分页码 -->
            <div align="center">
                <el-pagination
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount"
                    >
                </el-pagination>
            </div>
            </vue-scroll>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            editForm:{
                name:'',
                text:'',
            },
            editFormVisible:false,
            totalCount:20
        }
    },
    methods:{
        del(){
            console.log('del')
        },
        getAdd(){
            console.log('提交很ok')
            this.editFormVisible=false;
        }
    }
}
</script>

<style lang="less">
.send-message{
    .send-list{
        background: #ffffff;
        padding: 10px 0 10px 10px;
        margin-top: 10px;
    }
}
</style>
