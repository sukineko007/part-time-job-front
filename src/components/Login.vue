<template>
    <div>
      <!--登录-->
      <el-form v-if="showLogin" :model="form" :rules="rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">平台登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="form.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <h4>请选择用户类型：</h4>
        <el-select v-model="key" placeholder="请选择...">
          <el-option
            v-for="item in typeData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="login" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="register" :loading="registering">注册</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
    <!--企业注册-->
      <div v-if="register1">
        <el-form :model="form1" :rules="rules3" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">用户注册</h3>
          <el-form-item prop="account">
            <el-input type="text" v-model="form1.account" auto-complete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form1.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="enterName">
            <el-input v-model="form1.enterName" type="text" auto-complete="off" placeholder="企业名称"></el-input>
          </el-form-item>
          <el-form-item prop="major">
            <el-input v-model="form1.major" type="text" auto-complete="off" placeholder="所属行业"></el-input>
          </el-form-item>
          <el-form-item prop="owner">
            <el-input v-model="form1.owner" type="text" auto-complete="off" placeholder="企业法人"></el-input>
          </el-form-item>
          <el-form-item prop="address">
            <el-input v-model="form1.address" type="text" auto-complete="off" placeholder="企业地址"></el-input>
          </el-form-item>
          <el-form-item prop="introduction">
            <el-input v-model="form1.introduction" type="text" auto-complete="off" placeholder="企业简介"></el-input>
          </el-form-item>
          <el-form-item prop="mailbox">
            <el-input v-model="form1.mailbox" type="text" auto-complete="off" placeholder="企业邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="telephone">
            <el-input v-model="form1.telephone" type="text" auto-complete="off" placeholder="企业电话"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleAddClose" :loading="logining">注册</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
          <el-form-item style="width:100%;">
            <i>已有账号，去登录</i>
            <el-button type="primary" style="width:100%;" @click="goLogin" :loading="registering">去登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
      <!--学生注册-->
      <div v-if="register2">
        <el-form :model="form2" :rules="rules4" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">用户注册</h3>
          <el-form-item prop="stuId">
            <el-input type="number" v-model="form2.stuId" auto-complete="off" placeholder="用户名(仅数字)"></el-input>
          </el-form-item>
          <el-form-item prop="stuPassword">
            <el-input type="password" v-model="form2.stuPassword" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="stuName">
            <el-input v-model="form2.stuName" type="text" auto-complete="off" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="stuAge">
            <el-input v-model="form2.stuAge" type="text" auto-complete="off" placeholder="年龄"></el-input>
          </el-form-item>
          <el-form-item prop="stuSex">
            <el-input v-model="form2.stuSex" type="text" auto-complete="off" placeholder="性别"></el-input>
          </el-form-item>
          <el-form-item prop="stuSchool">
            <el-input v-model="form2.stuSchool" type="text" auto-complete="off" placeholder="学院"></el-input>
          </el-form-item>
          <el-form-item prop="stuMajor">
            <el-input v-model="form2.stuMajor" type="text" auto-complete="off" placeholder="专业"></el-input>
          </el-form-item>
          <el-form-item prop="stuClass">
            <el-input v-model="form2.stuClass" type="text" auto-complete="off" placeholder="班级"></el-input>
          </el-form-item>
          <el-form-item prop="stuPhone">
            <el-input v-model="form2.stuPhone" type="text" auto-complete="off" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleAdd" :loading="logining">注册</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
          <el-form-item style="width:100%;">
            <i>已有账号，去登录</i>
            <el-button type="primary" style="width:100%;" @click="goLogin" :loading="registering">去登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>


<script>
  //   import { requestLogin } from '../api/api';
  import NProgress from 'nprogress'
  import { Loading } from 'element-ui';
  import bus from './BUS'

  export default {
    data() {
      var checkAccount = (rule,value,callback) =>{
        var txt = /^[a-zA-z0-9]{1,10}$/;
         if(!value){
           return callback(new Error('请输入用户名！'))
         }
         else if(!txt.test(value)){
           return callback(new Error('只能输入数字和英文！'))
         }
         else {
           for(var i =0;i<this.enterData.length;i++){
             var account = this.enterData[i].account;
             if (value ==account){
               return callback(new Error('用户名已存在！'))
             }
           }
           callback();
         }
      };
      var checkPhone = (rule,value,callback) =>{
        var reg = /^((0\d{2,3}-\d{7,8})|(1[3578]\d{9}))$/;
        if(reg.test(value)){
          callback();
        }
        else
          return callback(new Error('请输入正确格式的电话号或者手机号'));
      };
      var checkMail = (rule,value,callback) =>{
        var mail = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        if(mail.test(value)){
          callback();
        }
        else
          return callback(new Error('邮箱格式不正确！'));
      };
      var checkName = (rule,value,callback) =>{
        if(!value){
          return callback(new Error('请输入用户名！'))
        }
        else if(value.length > 10){
          return callback(new Error('10个数字以内！！！'))
        }
        else {
          for(var i =0;i<this.stuData.length;i++){
            var account = this.stuData[i].stuId;
            if (value ==account){
              return callback(new Error('用户名已存在！'))
            }
          }
          callback();
        }
      };
      var checkSex = (rule,value,callback) =>{
        if(value != '男' && value != '女'){
          return callback(new Error('请输入正确性别！'));
        }
        callback();
      };
      var checkAge = (rule,value,callback) =>{
        var reg=/^[0-9]{2}$/;
        if(!reg.test(value)){
          return callback(new Error('只能输入两位数字！'));
        }
        if(value > 80 || value < 14){
          return callback(new Error('年龄范围14-80！'));
        }
        callback();
      };
      return {
        count:'',
        enterData:[
          {
            account:''
          }
        ],
        stuData:[
          {
            stuId:''
          }
        ],
        registering:false,
        showLogin: true,
        form1:{
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
        form2:{
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
        register1: false,//企业注册
        register2: false,//学生注册
        typeData:[
          {
            "id":1,
            "value":"管理员"
          },
          {
            "id":2,
            "value":"学生"
          },
          {
            "id":3,
            "value":"企业"
          }
        ],
        key:'',
        userData:{},
        userInfo:{},
        logining: false,
        form: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },

            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        rules3: {
          account: [
            /*{ required: true, message: '请输入用户名', trigger: 'blur' },*/
            { validator: checkAccount }
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          enterName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          major: [
            { required: true, message: '请输入所属行业', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          owner: [
            { required: true, message: '请输入企业法人', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          address: [
            { required: true, message: '请输入企业地址', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          introduction: [
            { required: true, message: '请输入企业简介', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          mailbox: [
            { required: true, message: '请输入企业邮箱', trigger: 'blur' },
            { validator: checkMail }
          ],
          telephone: [
            { required: true, message: '请输入企业电话', trigger: 'blur' },
            { validator: checkPhone }
            //{ validator: validaePass2 }
          ]
        },
        rules4: {
          stuId: [
            /*{ required: true, message: '请输入用户名', trigger: 'blur' },*/
            { validator: checkName }
            //{ validator: validaePass }
          ],
          stuPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          stuName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          stuMajor: [
            { required: true, message: '请输入专业', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          stuSchool: [
            { required: true, message: '请输入学院', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          stuClass: [
            { required: true, message: '请输入班级', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          stuSex: [
            { required: true, message: '请输入性别', trigger: 'blur' },
            { validator: checkSex }
          ],
          stuAge: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { validator: checkAge }
          ],
          stuPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone }
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    watch:{
      "this.form": function (newValue) {
        console.log(newValue);
      }
    },
    methods: {
      login(){  //登录
        if ( this.form.username == "") {
          this.$message.error('用户名不能为空！');
        }else if(this.form.password == ""){
          this.$message.error('密码不能为空！');
        }else
          var params = new URLSearchParams();
        params.append('type',this.key);
        params.append('username',this.form.username);
        params.append('password',this.form.password);
        if(this.key == 1) {
          this.axios.post('http://49.235.193.231:8700/login/login1', params)
            .then(res => {
              console.log(res.data);
              this.userData = res.data;
              this.logining = true;
              console.log(this.userData.type);
              if(this.userData.type == 1) {
                this.$message.success('登录成功！');
                NProgress.start();
                setTimeout(() => {
                  sessionStorage.clear()
                  sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                  this.logining = true;
                  NProgress.done();
                  this.$router.push({path: '/Home'});
                }, 1000);
                console.log(this.userInfo);
              }
              else {
                this.$message.error('用户名或密码错误！');
                this.logining = false;
              }
            })
            .catch(res => {
              this.logining = false;
              console.log("error");
              this.$message.error('请正确选择用户类型！');
            })
        }else if(this.key == 2){
          this.axios.post('http://49.235.193.231:8700/login/login2', params)
            .then(res => {
              console.log(res.data);
              this.userData = res.data;
              this.logining = true;
              console.log(this.userData.type);
              if(this.userData.type == 2) {
                this.$message.success('登录成功！');
                NProgress.start();
                setTimeout(() => {
                  sessionStorage.clear();
                  sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                  this.logining = true;
                  NProgress.done();
                  this.$router.push({path: '/Home'});
                }, 1000);
                console.log(this.userInfo);
              }
              else {
                this.$message.error('用户名或密码错误！');
                this.$message.error('请确认用户名和密码以及用户类型是否正确！');
                this.logining = false;
              }
            })
            .catch(res => {
              this.logining = false;
              console.log("error");
              this.$message.error('请正确选择用户类型！');
            })

        }else if(this.key == 3)
        {
          this.axios.post('http://49.235.193.231:8700/login/login3', params)
            .then(res => {
              console.log(res.data);
              this.userData = res.data;
              this.logining = true;
              console.log(this.userData.type);
              if(this.userData.type == 3) {
                this.$message.success('登录成功！');
                NProgress.start();
                setTimeout(() => {
                  sessionStorage.clear();
                  sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                  this.logining = true;
                  NProgress.done();
                  this.$router.push({path: '/Home'});
                }, 1000);
                console.log(this.userInfo);
              }
            else {
                this.$message.error('请确认用户名和密码以及用户类型是否正确！');
                this.logining = false;
              }
            })
            .catch(res => {
              this.logining = false;
              console.log("error");
              this.$message.error('请正确选择用户类型！');
            })
        }
        else
          this.$message.error('请选择用户类型！');
      },
      handleAddClose() {  //点击保存按钮后把添加的内容发送给服务器
        if (this.form1.account !='' &&
          this.form1.password!='' &&
          this.form1.mailbox!='' &&
          this.form1.major!='' &&
          this.form1.owner!=''&&
          this.form1.introduction!=''&&
          this.form1.telephone!=''&&
          this.form1.address!='') {
          var loadingInstance = Loading.service({   //读取文件时显示加载条
            target:'#container',
            text:'注册中...'
          });
          var params = new URLSearchParams();
          params.append('account', this.form1.account);
          params.append('password', this.form1.password);
          params.append('enterName', this.form1.enterName);
          params.append('major', this.form1.major);
          params.append('owner', this.form1.owner);
          params.append('address', this.form1.address);
          params.append('introduction', this.form1.introduction);
          params.append('mailbox', this.form1.mailbox);
          params.append('telephone', this.form1.telephone);
          params.append('type',3);
          this.axios.post('http://49.235.193.231:8700/enterprise/addEnterprise', params)
            .then(res => {
              loadingInstance.close();
              this.$message.success('注册成功！');
              this.goLogin();
              this.form.username = this.form1.account;
              this.form.password = this.form1.password;
            })
            .catch(res => {
              loadingInstance.close();
              this.$message.error('注册失败！');
              this.register11();
            })
        }
        else
          this.$message.error('请输入所有信息！');
        this.register11();
      },
      handleAdd(){  //点击保存按钮后把添加的内容发送给服务器
        if (this.form2.stuId !='' &&
          this.form2.stuPassword !='' &&
          this.form2.stuAge !='' &&
          this.form2.stuSex !='' &&
          this.form2.stuMajor !=''&&
          this.form2.stuClass !=''&&
          this.form2.stuSchool !=''&&
          this.form2.stuPhone !='' &&
          this.form2.stuName !='') {
          var loadingInstance = Loading.service({   //读取文件时显示加载条
            target: '#container',
            text: '注册中...'
          });
          var params = new URLSearchParams();
          params.append('stuId', this.form2.stuId);
          params.append('password', this.form2.stuPassword);
          params.append('stuName', this.form2.stuName);
          params.append('stuAge', this.form2.stuAge);
          params.append('stuSex', this.form2.stuSex);
          params.append('school', this.form2.stuSchool);
          params.append('stuMajor', this.form2.stuMajor);
          params.append('classes', this.form2.stuClass);
          params.append('phone',this.form2.stuPhone);
          params.append('type', 2);
          this.axios.post('http://49.235.193.231:8700/student/addStudent', params)
            .then(res => {
              loadingInstance.close();
              this.$message.success('注册成功！');
              this.goLogin();
              this.form.username = this.form2.stuId;
              this.form.password = this.form2.stuPassword;
            })
            .catch(res => {
              loadingInstance.close();
              this.$message.error('注册失败！');
              this.register22();
            })
        }
        else
          this.$message.error('请输入所有信息！');
        this.register22();
      },
      register11() {
        this.register1 = true;
        this.showLogin = false;
      },
      register22(){
        this.register2 = true;
        this.showLogin = false;
      },
      register(){
        if(this.key == 2){
          this.showLogin =false;
          this.register2 =true;
        }
        else if(this.key ==3){
          this.showLogin = false;
          this.register1 = true;
        }
       else
         this.$message.error('请正确选择用户类型后点击注册！')
      },
      goLogin(){
        this.register1 = false;
        this.register2 = false;
        this.showLogin = true;
      }
    },
    mounted(){

      //获取已存在企业用户信息
      this.axios.get('http://49.235.193.231:8700/enterprise/getEnterprise',{
        params: {}
      })
        .then( res => {
          this.loading = false;
          if (res.data.count != 0) {
            this.enterData = res.data.data;
            this.count = res.data.data.length;
          }
        })
        .catch( res => {
          this.loading = false;
          console.log("error");
        })

      //获取已存在学生信息
      this.axios.get('http://49.235.193.231:8700/student/getStudent',{
        params: {}
      })
        .then( res => {
          this.loading = false;
          if (res.data.count != 0) {
            this.stuData = res.data.data;
          }
        })
        .catch( res => {
          this.loading = false;
          console.log("error");
        })
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
