<template>
    <div class="jurdiction">
        <div class="jurdic-title">权限管理</div>
        <div class="jurdic-list">
            <el-tabs type="border-card">
                <el-tab-pane label="角色管理" style="overflow: scroll;">
                    <!-- 角色列表 -->
                        <div class="jurdic-bor">
                            <div class="jurdic-zuh">
                                <span>角色列表</span>
                                 <el-input
                                    placeholder="请输入角色名称查找"
                                    prefix-icon="el-icon-search"
                                    v-model="input1">
                                </el-input>
                                <div class="jurdic-name" @click="play">
                                    <div class="jurdic-qiez">
                                        <span>信息披露人员</span>
                                        <i class="el-icon-delete" 
                                        style="float:right;line-height: 30px;"
                                        @click.stop="del"
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
                        <div class="jurdic-bor" v-show="personnel">
                            <div class="jurdic-zuh">
                                <span>角色人员</span>
                                 <el-input
                                    placeholder="请输入角色名称查找"
                                    prefix-icon="el-icon-search"
                                    v-model="input1">
                                </el-input>
                                <div class="jurdic-name">
                                    <div class="jurdic-qiez" @click="pers">
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
                        <div class="jurdic-bor" v-show="diction">
                            <div class="jurdic-zuh">
                                <span>权限设置</span>
                                <div class="jurdic-name">
                                    <el-tree
                                    :data="data"
                                    show-checkbox
                                    node-key="label"
                                    :props="defaultProps"
                                    ref="tree"
                                    >
                                    </el-tree>
                                     <el-button type="primary"  @click="getCheckedNodes" >提交</el-button>
                                </div>
                            </div>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="人员管理">人员管理</el-tab-pane>
                <el-tab-pane label="管理员管理">管理员管理</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input1:'',
            editFormVisible:false,    //添加角色
            editForm:{                //角色名称
                navss:'',
            },
            personnel:false,          //角色人员隐藏列表
            diction:false,            //权限管理隐藏列表
            data: [{                  //权限设置列表
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                id: 9,
                label: '三级 1-1-1'
                }, {
                id: 10,
                label: '三级 1-1-2'
                }]
            }]
            }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
            }, {
            id: 3,
            label: '一级 3',
            children: [{
                id: 7,
                label: '二级 3-1'
            }, {
                id: 8,
                label: '二级 3-2'
            }]
            }],
            defaultProps: {
            children: 'children',
            label: 'label'
            }
        }
    },
    methods: {
        getpush(){

        },
        del(){
            console.log(1)
        },
        play(){
            this.personnel=true
        },
        pers(){
            this.diction=true
        },
      getCheckedNodes(){
          this.personnel=false;
          this.diction=false;
          let list=this.$refs.tree.getCheckedNodes();
          console.log(list);
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
         height: 100%;
         padding:20px; 
         border-bottom: 20px solid #f0f1f7;
         background: #ffffff;
         /deep/.el-tab-pane{
             display: flex;
         }
         .jurdic-bor{
             
             height: 100%;
             background: #f0f1f7;
             margin-right: 15px;
            .jurdic-zuh{
                width: 160px;
                padding: 10px;
                /deep/.el-input--prefix{
                    height: 40px;
                }
                .jurdic-name{
                    height: 100%;
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
