<template>
    <el-menu
      :default-active="activeMenu"

      class="el-menu-vertical"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      background-color="darkolivegreen"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-upload"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="0" v-if="showAdmin">
        <i class="el-icon-upload"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="2" v-if="showAdmin">
        <i class="el-icon-star-on"></i>
        <span slot="title">企业管理</span>
      </el-menu-item>

      <el-menu-item index="3">
          <i class="el-icon-location"></i>
          <span slot="title">兼职招聘信息</span>
      </el-menu-item>

      <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">求职信息</span>
      </el-menu-item>
      <el-menu-item index="5" v-if="showAdmin">
        <i class="el-icon-menu"></i>
        <span slot="title">签约信息管理</span>
      </el-menu-item>
      <el-menu-item index="6" v-if="showStudent">
        <i class="el-icon-menu"></i>
        <span slot="title">招聘信息推荐</span>
      </el-menu-item>
    </el-menu>


</template>

<script>
    export default {
    data(){
      return {
        showAdmin:false,
        showStudent:false,
        activeMenu: '1'
      }
    },
    mounted(){
      var userJsonStr = sessionStorage.getItem('userInfo');
      this.userEntity = JSON.parse(userJsonStr);
      console.log(this.userEntity.type);

      if (this.userEntity.type == 1) {
        this.showAdmin = true;
      }
      else if(this.userEntity.type == 2){
        this.showStudent = true;
      }
      if(sessionStorage.getItem('curRouter'))this.activeMenu = '' + sessionStorage.getItem('curRouter')
      this.$router.push(sessionStorage.getItem('curRouter') || this.activeMenu)
    },
    methods: {
      handleSelect(key, keyPath){
        this.activeMenu = '' + key
        sessionStorage.setItem('curRouter', this.activeMenu)
        this.$router.push(this.activeMenu)
      },
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
   overflow-y: auto;
  }
</style>
