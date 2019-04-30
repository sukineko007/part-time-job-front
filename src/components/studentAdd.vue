<template>
  <el-dialog title="添加学生" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form">
      <el-form-item label="学号">
        <el-input v-model="form.stuId"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.stuPassword"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.stuName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.stuSex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.stuAge"></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="form.stuSchool"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.stuMajor"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.stuClass"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.stuPhone"></el-input>
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
          stuId:'',
          stuPassword:'',
          stuName:'',
          stuSex:'',
          stuAge:'',
          stuSchool:'',
          stuClass:'',
          stuPhone:'',
          stuMajor:''
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
        params.append('stuId',this.form.stuId);
        params.append('password',this.form.stuPassword);
        params.append('stuName',this.form.stuName);
        params.append('stuAge',this.form.stuAge);
        params.append('stuSex',this.form.stuSex);
        params.append('school',this.form.stuSchool);
        params.append('stuMajor',this.form.stuMajor);
        params.append('classes',this.form.stuClass);
        params.append('phone',this.form.stuPhone);
        params.append('type',2);
        this.axios.post('http://47.101.218.83:8700/student/addStudent',params)
          .then( res => {
            loadingInstance.close();
            this.$message.success('添加成功！');
            bus.$emit("isLast",{type:this.categoryId});
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
      bus.$on('studentAdd', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
      })
    }
  }
</script>

<style scoped>

</style>

