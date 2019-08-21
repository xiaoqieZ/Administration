<template>
    <div>
      <div>问卷管理</div>
        <div class="management">
            <div class="managet">
                <el-tabs type="border-card">
                    <el-tab-pane label="风险调查问卷">
                        <vue-scroll>
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
                            label="问卷名称"
                            width="200">
                            <template slot-scope="scope">
                                <span>
                                    111
                                </span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="创建人"
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
                            label="适当投资者类别"
                            width="180">  
                            <template slot-scope="scope">
                                <span>
                                    333
                                </span>
                            </template> 
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="创建时间"
                            >  
                            <template slot-scope="scope">
                                <span>
                                    333
                                </span>
                            </template> 
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="是否启用"
                            width="150">  
                            <template slot-scope="scope">
                                <span>
                                    333
                                </span>
                            </template> 
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="是否默认"
                            width="150">  
                            <template slot-scope="scope">
                                <span>
                                    333
                                </span>
                            </template> 
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="data"
                            label="操作"
                            width="200">  
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
                    </el-tab-pane>
                    <el-tab-pane label="知识评测">知识评测</el-tab-pane>
                    <el-tab-pane label="回访问卷">回访问卷</el-tab-pane>
                </el-tabs>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            totalCount:20
        }
    }
}
</script>

<style lang="less">
.management{
    margin-top: 10px;
    background: #ffffff;
    .managet{
        padding: 10px;
    }
}
</style>
