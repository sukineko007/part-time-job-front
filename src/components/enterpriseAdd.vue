<template>
  <el-dialog title="添加企业" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form">
      <el-form-item label="企业账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="form.enterName"></el-input>
      </el-form-item>
      <el-form-item label="所属行业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="法人代表">
        <el-input v-model="form.owner"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mailbox"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleAddClose">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import bus from './BUS.vue'
  import { Loading } from 'element-ui';

  export default {
    data () {
      return {
        form:{
          account:'',
          password:'',
          enterName:'',
          major:'',
          owner:'',
          address:'',
          introduction:'',
          mailbox:'',
          telephone:''
        },
        dialogFormAddSubjectVisible: false,
        isLast:false,
        isLast2:false
      }
    },
    watch:{
      "this.form": function (newValue) {
        console.log(newValue);
      }
    },
    methods:{
      handleAddClose(){  //点击保存按钮后把添加的内容发送给服务器
        this.dialogFormAddSubjectVisible = false;
        var loadingInstance = Loading.service({   //读取文件时显示加载条
          target:'#container',
          text:'题目上传中...'
        });
        var params = new URLSearchParams();
        params.append('account',this.form.account);
        params.append('password',this.form.password);
        params.append('enterName',this.form.enterName);
        params.append('major',this.form.major);
        params.append('owner',this.form.owner);
        params.append('address',this.form.address);
        params.append('introduction',this.form.introduction);
        params.append('mailbox',this.form.mailbox);
        params.append('telephone',this.form.telephone);
        params.append('type',3);
        this.axios.post('http://49.235.193.231:8700/enterprise/addEnterprise',params)
          .then( res => {
            loadingInstance.close();
            this.$message.success('添加成功！');
            bus.$emit("isLast");
          })
          .catch( res => {
            loadingInstance.close();
            this.$message.error('添加失败！');
          })
        this.handleClose();
      },
      handleClose () {
        this.dialogFormAddSubjectVisible = false
      }
    },
    mounted() {




      //在组件的钩子函数中监听事件
      bus.$on('enterpriseAdd', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
      })
    }
  }
</script>

<style scoped>

</style>

