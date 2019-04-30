<template>
<div>
  <br>
<h2>根据您的专业，为您推荐以下招聘信息：</h2>
  <br>
  <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    @selection-change="handleSelectionChange"
    border
    stripe
    style="width: 100%"
    max-height="449"
    highlight-current-row
    :cell-style="styleFunc">
    <el-table-column
      type="selection"
      width="50"
      align="center">
    </el-table-column>
    <el-table-column
      prop="id"
      label="ID"
      width="80"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="enterName"
      label="企业名称"
      width="150"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="recruitName"
      label="名称"
      width="150"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="introduction"
      label="简述"
      width="120"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="major"
      label="专业要求"
      width="80"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="工作城市"
      width="80"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="salary"
      label="薪资（元/月）"
      width="110"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="hrName"
      label="联系人"
      width="100"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="hrPhone"
      label="联系电话"
      width="130"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="hrMailbox"
      label="简历投递邮箱"
      width="180"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</div>
</template>

<script>
    export default {
      data () {
        return {
          pageSize:10,
          flag:true,
          userEntity:{},
          currentPage:1,
          count:10,
          currentLimit:20,
          searchContent:"",
          multipleSelection: [],
          form:"",
          tableData:[
          ],
          isSerach:false,  //是否为提交搜索
          region:'0',
          isLast:false,
          loading:true,
        }
      },
      methods:{
        handleSizeChange(val) {  //更改每页的数量,重新发起请求
          this.loading = true;
          this.currentLimit = val;
          if (this.isSerach) {    //如果是搜索页
            this.axios.get('http://172.20.10.14:8000/searchQuestions',{
              params: {
                page:this.currentPage,
                limit:this.currentLimit,
                data:this.searchContent
              }
            })
              .then( res => {
                this.loading = false;
                this.tableData = [];
                this.tableData = res.data.data;
                this.count = res.data.count;
                this.currentPage = 1;
              })
              .catch( res => {
                this.loading = false;
                console.log("error");
              })
          } else {   //平常页
            this.axios.get('http://47.101.218.83:8700/recruit/getRecruit',{
              params: {
              }
            })
              .then( res => {
                this.loading = false;
                this.tableData = res.data;
                this.count = res.data.data.length;
                this.currentPage = 1;
              })
              .catch( res => {
                this.loading = false;
                console.log("error");
              })
          }
        },
        handleCurrentChange(val) {  //更改当前页,重新发起请求
          this.loading = true;
          this.currentPage = val;
          if (this.isSerach) {   //如果是搜索内容页面切换
            this.axios.get('http://47.101.218.83:8700/recruit/searchRecruit',{
              params: {
                data:this.searchContent
              }
            })
              .then( res => {
                this.loading = false;
                this.tableData = [];
                this.tableData = res.data.data;
                this.count = res.data.data.length;
                this.currentPage = 1;
              })
              .catch( res => {
                this.loading = false;
                console.log("error");
              })
          } else {
            this.axios.get('http://47.101.218.83:8700/recruit/getRecruit', {
              params: {}
            })
              .then(res => {
                this.tableData = res.data.data;
                this.count = res.data.data.length;
              })
              .catch(res => {
                console.log("error");
              })
          }
        },
      },
      mounted(){
        var userJsonStr = sessionStorage.getItem('userInfo');
        this.userEntity = JSON.parse(userJsonStr);
        console.log(this.userEntity.type);

        this.axios.get('http://47.101.218.83:8700/recruit/getRecommend',{
          params: {
            id:this.userEntity.id
          }
        })
          .then( res => {
            this.loading = false;
            if (res.data.count != 0) {
              this.tableData = res.data.data;
              this.count = res.data.data.length;
              this.currentPage = 1;
            }
          })
          .catch( res => {
            this.loading = false;
            console.log("error");
          })
      }
    }
</script>

<style scoped>
  a:link {
    text-decoration: none;
  }
  a{
    font-size: 20px;
    color: black;
  }
  .el-menu-header{
    left: 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }

  .myaction {
    margin-top: 15px;
  }

  .first {
    vertical-align: top;
  }

  .left {
    margin-left: 10px;
  }

  .left div {
    display: inline-block;
  }

  .left span,
  .left div,
  .left button {
    float: left;
    margin-left: 20px;
  }

  .left span {
    display: inline-block;
    height: 38px;
    line-height: 38px;
  }

  .right {
    float: right;
    margin-right: 25px;
  }

  .bottom {
    margin: 10px 20px;
  }

  .bottom button {
    margin-right: 10px;
  }
  .clearfix{
    clear:both;
  }

  .myelform{
    margin-bottom: 5px;
  }

  .block{
    margin:10px;
  }


</style>
