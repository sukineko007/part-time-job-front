<template>
  <el-dialog title="添加招聘信息" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form">
      <el-form-item label="企业名称">
        <el-input v-model="form.enterName" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.recruitName"></el-input>
      </el-form-item>
      <el-form-item label="简述">
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="专业要求">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="工作城市">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="薪资（元/月）">
        <el-input v-model="form.salary"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.hrName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.hrPhone"></el-input>
      </el-form-item>
      <el-form-item label="简历投递邮箱">
        <el-input v-model="form.hrMailbox"></el-input>
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
          recruitName:'',
          salary:'',
          enterName:'',
          major:'',
          hrName:'',
          address:'',
          introduction:'',
          hrMailbox:'',
          hrPhone:''
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
          text:'信息上传中...'
        });
        var params = new URLSearchParams();
        params.append('enterName',this.form.enterName);
        params.append('recruitName',this.form.recruitName);
        params.append('address',this.form.address);
        params.append('introduction',this.form.introduction);
        params.append('major',this.form.major);
        params.append('salary',this.form.salary);
        params.append('hrName',this.form.hrName);
        params.append('hrMailbox',this.form.hrMailbox);
        params.append('hrPhone',this.form.hrPhone);
        this.axios.post('http://47.101.218.83:8700/recruit/updateRecruit',params)
          .then( res => {
            loadingInstance.close();
            this.$message.success('修改成功！');
          })
          .catch( res => {
            loadingInstance.close();
            this.$message.error('修改失败！');
          })
        this.handleClose();
      },
      handleClose () {
        this.dialogFormAddSubjectVisible = false
      }
    },
    mounted() {




      //在组件的钩子函数中监听事件
      bus.$on('recruitEdit', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
        this.form = data.value;
      })
    }
  }
</script>

<style scoped>

</style>
