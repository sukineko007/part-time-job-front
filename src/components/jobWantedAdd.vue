<template>
  <el-dialog title="添加求职信息" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form">
      <el-form-item label="求职意向">
        <el-input v-model="form.intention"></el-input>
      </el-form-item>
      <el-form-item label="期望城市">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="期望薪资（元/月）">
        <el-input v-model="form.salary"></el-input>
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
          address:'',
          intention:'',
          salary:'',
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
        let params = new URLSearchParams();
        params.append('id',this.userEntity.id);
        params.append('address',this.form.address);
        params.append('intention',this.form.intention);
        params.append('salary',this.form.salary);
        params.append('mailbox',this.form.mailbox);
        params.append('phone',this.form.phone);
        this.axios.post('http://47.101.218.83:8700/wanted/addWanted',params)
          .then( res => {
            this.$message.success('添加成功！');
            bus.$emit("isLast2");
          })
          .catch( res => {
            this.$message.error('添加失败！');
            bus.$emit("isLast2");
          })
        this.handleClose();
      },
      handleClose () {
        this.dialogFormAddSubjectVisible = false
      }
    },
    mounted() {

      var userJsonStr = sessionStorage.getItem('userInfo');
      this.userEntity = JSON.parse(userJsonStr);
      console.log(this.userEntity.type);


      //在组件的钩子函数中监听事件
      bus.$on('wantedAdd', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
      })
    }
  }
</script>

<style scoped>

</style>

