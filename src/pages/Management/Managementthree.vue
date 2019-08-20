<template>
    <div class="jurdiction">
        <div class="jurdic-title">权限管理</div>
        <div class="jurdic-list">
            <el-tabs type="border-card">
                <el-tab-pane label="角色管理">
                    <!-- 角色列表 -->
                        <div class="jurdic-bor">
                            <div class="jurdic-zuh">
                                <span>角色列表</span>
                                 <el-input
                                    class="input"
                                    placeholder="请输入角色名称查找"
                                    prefix-icon="el-icon-search"
                                    v-model="input1">
                                </el-input>
                                <div class="jurdic-name">
                                    <div class="jurdic-qiez">
                                        <span>信息披露人员</span>
                                        <i class="el-icon-delete" 
                                        style="float:right;line-height: 30px;"
                                        @click="del"
                                        ></i>
                                    </div>
                                </div>
                                <div class="tian" @click="editFormVisible=true">
                                    <el-button type="primary" size="small">添加角色</el-button>
                                </div>
                                <!-- 新增角色 -->
                                <el-dialog title="新增角色" :visible.sync="editFormVisible" :close-on-click-modal="true" :append-to-body="true" width="80%">
                                    <!--//editForm表单提交的数据-->
                                    <el-form :model="editForm" label-width="80px"  ref="editForm">
                                    <el-form-item label="角色名称" prop="navs">
                                        <el-input v-model="editForm.navs" placeholder="信息披露人员"></el-input>
                                    </el-form-item>
                                    </el-form>           
                                    <div slot="footer" class="dialog-footer">
                                    <el-button @click.native="editFormVisible = false">取消</el-button>
                                    <el-button type="primary" @click.native="getpush" >提交</el-button>
                                    </div>
                                </el-dialog>
                            </div>
                        </div>
                        <!-- 角色人员 -->
                        <div class="jurdic-bor" style="float:left">
                            <div class="jurdic-zuh">
                                <span>角色列表</span>
                                 <el-input
                                    class="input"
                                    placeholder="请输入角色名称查找"
                                    prefix-icon="el-icon-search"
                                    v-model="input1">
                                </el-input>
                                <div class="jurdic-name">
                                    <div class="jurdic-qiez">
                                        <span>小茄子啊</span>
                                    </div>
                                    <div class="jurdic-qiez">
                                        <span>1</span>
                                    </div>
                                    <div class="jurdic-qiez">
                                        <span>Dopa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 权限设置 -->
                        <div class="jurdic-bor">
                            <div class="jurdic-zuh">
                                <span>权限设置</span>
                                <div class="jurdic-name">
                                    <el-tree
                                        :props="props"
                                        :load="loadNode"
                                        lazy
                                        show-checkbox
                                        @check-change="handleCheckChange">
                                    </el-tree>
                                </div>
                            </div>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input1:'',
            editFormVisible:false,
            editForm:{
                navss:'',
                props: {
                label: 'name',
                children: 'zones'
                },
                count: 1
            }
        }
    },
    methods:{
        getpush(){

        },
        del(){
            console.log(1)
        },
    }
}
</script>

<style lang="less" scoped>
.jurdiction{
    .jurdic-title{
         height: 30px;
    }
    .jurdic-list{
         width: 100%;
         height: 615px;
         padding:20px; 
         background: #ffffff;
         /deep/.el-tab-pane{
             display: flex;
             justify-content: space-between;
         }
         .jurdic-bor{
             width: 30%;
             height: 100%;
             background: #f0f1f7;
            .jurdic-zuh{
                padding: 10px;
                input{
                    margin-top: 10px;
                }
                .jurdic-name{
                    height: 400px;
                    margin-top: 10px;
                    background: #fff; 
                    .jurdic-qiez{
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                        background: rgb(41, 157, 235);
                        border-bottom:1px solid #ffffff
                    }
                }
                .tian{
                     bottom: 0
                    }
            }
         }
    }
}
</style>
