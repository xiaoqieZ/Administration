<template>
    <div class="Publicfore">
        <mt-header fixed title="信息采集">
            <router-link to="/Publicfore" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div v-show="values==0">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-input v-model="ruleForm.gender"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input type="number" v-model="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="国籍" prop="nationy">
                <el-input v-model="ruleForm.nationy"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择证件类型">
                <el-option label="身份证" value="shenfen"></el-option>
                <el-option label="军人证" value="junren"></el-option>
                <el-option label="结婚证" value="jiehun"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certi">
                <el-input type="number" v-model="ruleForm.certi"></el-input>
            </el-form-item>
            <el-form-item label="职业" prop="occupation">
                <el-input v-model="ruleForm.occupation"></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="post">
                <el-input v-model="ruleForm.post"></el-input>
            </el-form-item>
            <el-form-item label="座机" prop="landline">
                <el-input v-model="ruleForm.landline"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item> -->
            </el-form>
            <div class="radios">
                <p>
                    <span>1、您的主要收益来源是？</span>
                <el-radio-group v-model="radio">
                <el-radio :label="1">工资、劳务报酬</el-radio><br/>
                <el-radio :label="2">生产经营所得</el-radio><br/>
                <el-radio :label="3">利息、股息、转让等金融性资产收入</el-radio><br/>
                <el-radio :label="4">出租、出售房地产</el-radio>
                </el-radio-group>
                </p>
                <p>
                    <span>2、您的主要收益来源是？</span><br/>
                <el-radio-group v-model="palss">
                <el-radio :label="1">劳务报酬</el-radio><br/>
                <el-radio :label="2">经营所得</el-radio><br/>
                <el-radio :label="3">利息、股息、入</el-radio><br/>
                <el-radio :label="4">出租、出地产</el-radio>
                </el-radio-group>
                </p>
            </div>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
        <div class="radiosplay" v-show="values==1">
            <div class="Congratulations">
                <div class="Congratu">
                    <h4>恭喜您完成基本信息采集，您将申请成为：<span style="color:red">普通投资者</span></h4>
                </div>
            </div>
            <el-button  type="primary" @click="material">上传证明材料</el-button>
            <a>稍后上传</a>
            
        </div>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          gender:'',
          age:'',
          nationy:'',
          certi:'',
          region: '',
          occupation:'',
          post:'',
          phone:'',
          code:'',
          email:'',
          address:'',
          landline:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
          radio:'',
          palss:'',
          values:0,
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请输入性别', trigger: 'blur' },
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          nationy: [
            { required: true, message: '请选择国籍', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certi: [
            { required: true, message: '请输入证件号码', trigger: 'blur' },
            { min: 17, max: 18, message: '长度在 17 到 18 个字符', trigger: 'blur' }
          ],
          occupation: [
            { required: true, message: '请输入职业', trigger: 'blur' },
          ],
          post: [
            { required: true, message: '请输入职务', trigger: 'blur' },
          ],
          landline: [
            { required: true, message: '请输入座机号码', trigger: 'blur' },
            { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 12, message: '长度在 11 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入邮编', trigger: 'blur' },
            { min: 7, max: 12, message: '长度在 7 到 18 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入证件号码', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入证件号码', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message('提交成功');
            this.values=1;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      material(){
          this.$router.push({path: '/Publicfore/04/Material'})
      }
    }
  }
</script>
<style lang="less" scoped>
.Publicfore{
    /deep/.demo-ruleForm{
    margin-top: 50px;
}
    /deep/.el-button--primary{
            width: 100%;
        }
        .radiosplay{
        margin-top: 50px;
        .Congratulations{
            width: 100%;
            height: 400px;
            .Congratu{
                width: 66%;
                line-height: 400px;
                margin: 0 auto;
            }
        }
    } 
}

</style>

