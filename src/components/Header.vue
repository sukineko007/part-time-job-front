<template>
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-header"
    mode="horizontal"
    @select="handleSelect"
    background-color="darkolivegreen"
    text-color="#fff"
    active-text-color="#ffd04b">
        <div id="title">
          大学生网络兼职平台
        </div>
      <div class="div2">
        <el-button type="danger"  @click="tuichu">退出登录</el-button>
      </div>

    </el-menu>
</template>

<script>
    import bus from './BUS.vue'

    export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      };
    },
    methods: {
      tuichu(){
        sessionStorage.clear();
        window.location = "/";
      }
    },

  }
</script>

<style scoped>
  .div2{
    float: right;
    margin-right: 30px;
  }
   a:link {
     text-decoration: none;
   }
   a{
     font-size: 20px;
     color: black;
   }
   .el-menu-header{
       width: 100%;
     height: 5%;
       float:right;
   }

   img{
     height: 40px;
     width: 40px;
     border-radius:50px;
   }
   #title{
       height: 60px;
       line-height: 60px;
       font-size: 28px;
       float: left;
       color: aqua;
       margin-left: 30px;
   }
   #title2{
     height: 60px;
     line-height: 60px;
     font-size: 28px;
     float: left;
     color: aqua;
     margin-left: 30px;
   }

   #notice{
       float: right;
       margin-right: 60px;
       margin-top: 10px;

   }
</style>

