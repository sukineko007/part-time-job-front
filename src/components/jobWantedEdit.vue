<template>
  <el-dialog title="编辑求职信息" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form" disabled>
      <el-form-item label="名称">
        <el-input v-model="form.wantedName"></el-input>
      </el-form-item>
      <el-form-item label="求职意向">
        <el-input v-model="form.intention"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="期望城市">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="期望薪资（元/月）">
        <el-input v-model="form.salary"></el-input>
      </el-form-item>
      <el-form-item label="简历">
        <el-input v-model="form.jianli"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mailbox"></el-input>
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
          wantedName:'',
          salary:'',
          major:'',
          jianli:'',
          address:'',
          intention:'',
          mailbox:'',
          phone:''
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
        params.append('stuId',this.userEntity.id);
        params.append('wantedName',this.form.wantedName);
        params.append('address',this.form.address);
        params.append('intention',this.form.intention);
        params.append('major',this.form.major);
        params.append('salary',this.form.salary);
        params.append('jianli',this.form.jianli);
        params.append('mailbox',this.form.mailbox);
        params.append('phone',this.form.phone);
        this.axios.post('http://47.101.218.83:8700/wanted/updateWanted',params)
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
      bus.$on('wantedEdit', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
        this.form = data.value;
      })
    }
  }
</script>

<style scoped>

</style>
