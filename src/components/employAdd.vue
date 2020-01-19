<template>
  <el-dialog title="添加就业信息" :visible.sync="dialogFormAddSubjectVisible"  :show-close="false">
    <el-form :model="form">
      <el-form-item label="学号">
        <el-input v-model="form.stuId"></el-input>
      </el-form-item>
      <el-form-item label="企业账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="工作地点">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="薪资">
        <el-input v-model="form.salary"></el-input>
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
          account:'',
          address:'',
          salary:'',
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
        var myDate = new Date();
        myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        myDate.getMonth();       //获取当前月份(0-11,0代表1月)
        myDate.getDate();        //获取当前日(1-31)
        myDate.getHours();       //获取当前小时数(0-23)
        myDate.getMinutes();     //获取当前分钟数(0-59)
        this.dialogFormAddSubjectVisible = false;
        var loadingInstance = Loading.service({   //读取文件时显示加载条
          target:'#container',
          text:'题目上传中...'
        });
        var params = new URLSearchParams();
        params.append('stuId',this.form.stuId);
        params.append('enterAccount',this.form.account);
        params.append('address',this.form.address);
        params.append('salary',this.form.salary);
        params.append('createTime',myDate);
        this.axios.post('http://49.235.193.231:8700/employ/addEmploy',params)
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
      bus.$on('employAdd', data => {   //获取值
        this.dialogFormAddSubjectVisible = data.flag;
        this.isLast = data.isLast;
      })
    }
  }
</script>

<style scoped>

</style>

