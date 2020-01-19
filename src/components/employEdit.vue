<template>
  <el-dialog title="添加就业信息" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form">
      <el-form-item label="学生姓名">
        <el-input v-model="form.stuName" disabled></el-input>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="form.enterName" disabled></el-input>
      </el-form-item>
      <el-form-item label="工作地点">
        <el-input v-model="form.address" disabled></el-input>
      </el-form-item>
      <el-form-item label="薪资">
        <el-input v-model="form.salary" disabled></el-input>
      </el-form-item>
      <el-form-item label="签约时间">
        <el-input v-model="form.contractTime" disabled></el-input>
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
          stuName:'',
          salary:'',
          address:'',
          enterName:'',
          contractTime:''
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
        params.append('address',this.form.address);
        params.append('salary',this.form.salary);
        params.append('contractTime',this.form.contractTime);
        this.axios.post('http://49.235.193.231:8700/employ/updateEmploy',params)
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
      bus.$on('employEdit', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
        this.form = data.value;
      })
    }
  }
</script>

<style scoped>

</style>
