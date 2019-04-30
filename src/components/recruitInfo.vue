<template>
  <div>
    <div class="myaction">
      <div class="first">
        <div class="left">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="搜索招聘信息" class="myelform">
              <el-input v-model="searchContent" placeholder="请输入招聘名称"></el-input>
            </el-form-item>
            <el-form-item  class="myelform">
              <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>

      <div class="bottom" v-if="showEnter">
        <div class="left">
          <el-button type="danger" icon="el-icon-delete" @click="batchDel">批量删除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addUser">添加招聘信息</el-button>
        </div>

        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
    </div>



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
      <el-table-column
        label="管理"
        width="182"
        align="center"
      v-if="showEnter">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="编辑" placement="bottom-end">
            <el-button  size="mini" type="primary" @click="handleEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="bottom-end">
            <el-button  size="mini" type="danger" @click="handleDel(scope.row.id)"><i class="el-icon-delete"></i></el-button>
          </el-tooltip>
        </template>
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
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-header"
      mode="horizontal"
      @select="handleSelect"
      background-color="darkolivegreen"
      text-color="#fff"
      active-text-color="#ffd04b">
    </el-menu>
    <recruitAdd></recruitAdd>
    <recruitEdit></recruitEdit>
  </div>
</template>

<script>
  import bus from './BUS.vue'
  import recruitAdd from './recruitAdd'
  import recruitEdit from './recruitEdit'

  export default {
    data () {
      return {
        showEnter:false,
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
          {
            id:1,
            enterName:2015929194
          },
        ],
        isSerach:false,  //是否为提交搜索
        region:'0',
        isLast:false,
        loading:true,
      }
    },
    components:{
      recruitAdd,
      recruitEdit
    },
    methods:{
      onSubmit(){  //提交搜索内容
        if ( this.searchContent == "") {
          this.$message.error('搜索内容不能为空！');
        }else{
          this.loading = true;
          this.isSerach = true;
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
        }
      },
      handleEdit(param){   //点击编辑时向editinfo发送消息
        bus.$emit("recruitEdit", {flag:true,value:param});
      },
      handleDel(id){   //删除一条记录
        this.$confirm('此操作将永久删除该招聘信息, 是否继续?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          var params = new URLSearchParams();
          params.append("id",id);
          this.axios.post('http://47.101.218.83:8700/recruit/delRecruit',params)
            .then( res => {
              this.$message.success('删除成功！');
              //删除成功后重新请求当前页
              this.axios.get('http://47.101.218.83:8700/recruit/getRecruit2',{
                params: {
                  enterId:this.userEntity.id
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
            })
            .catch( res => {
              this.loading = false;
              this.$message.error('删除失败！');
            })
        }).catch(() => {
        });
      },
      addUser() {  //添加一条题目
        if ( this.currentPage == Math.ceil( this.count / this.currentLimit) ) //判断是否是最后一页
          this.isLast = true;
        bus.$emit("recruitAdd", {flag:true,type:this.region,isLast:this.isLast});
      },
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
      styleFunc(row,rowIndex){   //更改样式
        return {padding:'5px 0',hieght:'23px',lineHeight:'23px'}
      },
      handleSelectionChange(val) {   //处理多选框变化
        this.multipleSelection = val;
      },
      batchDel () {  //批量删除
        var delTarget = this.multipleSelection;
        var count = delTarget.length;
        var str = "";
        if (count == 0) {
          this.$message.error("请至少选择一项删除");
          return false;
        } else {
          for ( var i = 0 ; i < count; i ++) {//将需要删除的id凭借为字符串发往服务器
            str += delTarget[i].id + ",";
          }
          this.$confirm('此操作将永久删除这些招聘信息？, 是否继续?', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true;
            var params = new URLSearchParams();
            params.append("data",str);
            params.append("type",this.region);
            this.loading = true;
            this.axios.post('http://47.101.218.83:8700/recruit/bachDelete',params)
              .then( res => {
                this.$message.success('删除成功！');
                //删除成功后其重新请求当前页
                this.axios.get('http://47.101.218.83:8700/recruit/getRecruit2',{
                  params: {
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
              })
              .catch( res => {
                this.loading = false;
                this.$message.error('删除失败！');
              })
          }).catch(() => {
          })
        }
      }
    },
    mounted(){ //加载页面时默认请求第一类型数据

      var userJsonStr = sessionStorage.getItem('userInfo');
      this.userEntity = JSON.parse(userJsonStr);
      console.log(this.userEntity.type);
      if(this.userEntity.type == 3){this.showEnter = true};
      if(this.userEntity.type != 3){
        this.axios.get('http://47.101.218.83:8700/recruit/getRecruit',{
          params: {
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
      else{
        this.axios.get('http://47.101.218.83:8700/recruit/getRecruit2',{
          params: {
            enterId:this.userEntity.id
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
      var target = this;
      var lastPage = 0;
      //监听增加题目发来的信息
      bus.$on('isLast2', function (data) {
        this.axios.get('http://47.101.218.83:8700/recruit/getRecruit2',{
          params: {
            enterId:this.userEntity.id
          }
        })
          .then( res => {
            target.tableData = res.data.data;
            target.count = res.data.data.length;
            lastPage = Math.ceil(target.count / target.pageSize);
            target.currentPage = lastPage;
            console.log(target.count);
            console.log(target.pageSize);
            console.log(lastPage);
          })
          .catch( res => {
            console.log("error");
          })
      });
    },
    watch:{    //更换题型重新发起请求
      region: function (newValue) {
        this.loading = true;
        this.currentPage = 1;
        this.axios.get('http://localhost:8000/song/getSongs',{
          params: {
            page: this.currentPage,
            limit:this.currentLimit,
            type:newValue
          }
        })
          .then( res => {
            this.loading = false;
            this.tableData = res.data.data;
            this.count = res.data.count;
          })
          .catch( res => {
            this.loading = false;
            console.log("error");
          })
      }
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

