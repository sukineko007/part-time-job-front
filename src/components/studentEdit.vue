<template>
  <el-dialog title="编辑" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form">
      <el-form-item label="学号">
        <el-input v-model="form.stuId" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.stuName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="form.school"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.class"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.phone"></el-input>
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
          id:'',
          stuId:'',
          password:'',
          stuName:'',
          sex:'',
          age:'',
          school:'',
          class:'',
          major:'',
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
          text:'题目上传中...'
        });
        var params = new URLSearchParams();
        params.append('id',this.form.id);
        params.append('stuId',this.form.stuId);
        params.append('password',this.form.password);
        params.append('stuName',this.form.stuName);
        params.append('stuAge',this.form.age);
        params.append('stuSex',this.form.sex);
        params.append('school',this.form.school);
        params.append('major',this.form.major);
        params.append('classes',this.form.class);
        params.append('phone',this.form.phone);
        this.axios.post('http://49.235.193.231:8700/student/editStudent',params)
          .then( res => {
            loadingInstance.close();
            this.$message.success('修改成功！');
            console.log(this.categoryId);
            bus.$emit("isLast2",{type:this.categoryId});
          })
          .catch( res => {
            loadingInstance.close();
            this.$message.error('修改失败！');
            console.log(this.categoryId);
          })
        this.handleClose();
      },
      handleClose () {
        this.dialogFormAddSubjectVisible = false
      }
    },
    mounted() {




      //在组件的钩子函数中监听事件
      bus.$on('studentEdit', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
        this.form = data.value;
      })
    }
  }
</script>

<style scoped>

</style>

