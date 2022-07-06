<template>
  <div class="app-container index">
    <!-- {{changeForm.addAddres}} -->
    <div class="filter-container">
      <el-input
        v-model="query.name"
        clearable
        placeholder="姓名"
        style="width: 200px"
        class="filter-item"
      />
     <el-date-picker
        v-model="query.passTime"
        type="date"
        placeholder="选择日期"
        class="datePicker"
        :clearable="false"
        style="margin-right:20px"
         value-format="yyyy-MM-dd"
        >
      </el-date-picker>
      <el-button
        class="filter-item"
        type="primary"
        plain
        icon="el-icon-search"
        @click="goSearch"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        plain
        icon="el-icon-refresh"
        @click="clear"
      >
        重置查询
      </el-button>

         <!-- <el-button
        style="float: right"
        class="filter-item"
        type="primary"
        @click="exportExcel"
      >
        导出
      </el-button> -->
    </div>
    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
     id="out-table"
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="位置">
         <template slot-scope="scope">
          {{getWz(scope.row.deviceId)}}
         </template>
      </el-table-column>
      <el-table-column label="类型">
         <template slot-scope="scope">
           {{getType(scope.row.deviceId)}}
         </template>
      </el-table-column>
      <el-table-column prop="passTime" label="时间"></el-table-column>
   
      <!-- <el-table-column prop="username" label="工号"> </el-table-column>
      <el-table-column prop="fgsName" label="部门"> </el-table-column>
      <el-table-column prop="cjName" label="钻机"> </el-table-column> -->
      <!-- <el-table-column label="角色"> 
         <template slot-scope="scope">
          {{getRoleTxt(scope.row.role_id)}}
         </template>
      </el-table-column> -->
      <!-- <el-table-column
              prop="department"
              label="发生地点">
            </el-table-column>
            <el-table-column
              prop="datetime"
              label="时间">
            </el-table-column> -->
      <el-table-column label="照片">
         <template slot-scope="scope">
           <img  style="width:100px"  :src="'data:image/png;base64,'+scope.row.capturePhoto" alt=""> 
         </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goChange(scope.row)"
            >查看照片</el-button
          >
          <!-- <el-button @click="cdelete(scope.row.id)" type="danger" size="mini"
            >删除</el-button
          > -->
          <!-- <el-button type="primary" size="mini">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 66px"></div>
    <footer class="footer" :class="sidebar.opened ? 'bwidth' : 'swidth'">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="nowPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="total"
      >
      </el-pagination>
    </footer>
    <!-- 弹出层 -->
      <el-dialog title="详情" :visible.sync="addIsShow" width="690px">
        <el-table
        :data="addForm"
        v-loading="listLoading"
        border
        fit
        highlight-current-row
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="位置">
          <template slot-scope="scope">
            {{getWz(scope.row.deviceId)}}
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            {{getType(scope.row.deviceId)}}
          </template>
        </el-table-column>
        <el-table-column prop="passTime" label="时间"></el-table-column>
      </el-table>
      <img v-if="addForm[0]" style="margin-top:10px;max-width:50%"  :src="'data:image/png;base64,'+addForm[0].capturePhoto" alt="">
      <div style="height:20px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addIsShow=false">取 消</el-button>
        <el-button type="primary" @click="addIsShow=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
import { mapGetters } from "vuex";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
import table2excel from 'js-table2excel'
import zjs from './mj.json'
export default {
  name: "ComplexTable",
  data() {
    return {
      zjs:[],
      listLoading: false,
      currentPage4: 4,
      tableData: [],
      total: 0,
      imgData:{
        name:''
      },
      query:{
        name:'',
        passTime:'',
      },
      pageSizes: [15, 30, 60, 100],
      pageSize: this.$route.query.pageSize
        ? Number(this.$route.query.pageSize)
        : 15,
      nowPage: this.$route.query.page ? Number(this.$route.query.page) : 1,
      addIsShow: false,
      addIsShowCg: false,
      //发生地点
      address: [],
      //ip地址
      keywords: null,
      keywords2:null,
      //发生地点
      depment: [],
      dtObj: [],
      addForm: [],
      //添加时的表单验证规则
      addRules: {
        realName: [
          { required: true, message: "请输入等级名称", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入最低分", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入最高分", trigger: "blur" },
        ]
      },
      fileList: [],
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar"]),
  },
  created() {
    let that = this;
    //获取数据
    that.getList();
    //获取下拉框数据
    that.getSelect();
  },
  mounted() {
    this.zjs = zjs
    // let that = this;
    // setInterval(function(){
    //   that.getList();
    // },20000)
  },
  methods: {
     exportExcel () {
          let that = this;
		      const column = [
		        {
		          title: '姓名', 
		          key: 'ming',
		          type: 'text'
		        },
		        {
		          title: '图片',
		          key: 'pic',
		          type: 'image',
		          width: 279,
		          height: 107
		        },
		      
		      ]

          let alldata = []
          let ndata =that.tableData
          for(var i=0;i<ndata.length;i++){
            alldata.push({
              ming:ndata[i]['name'],
              pic:that.getObjectURL(ndata[i]['capturePhoto']),
            })
          }
		      console.log(alldata)
		      //this.newsList是从后端接口中获取数组列表
		      //第三个参数是表格名
		      table2excel(column,alldata, "考勤列表.xls")
     },
     getObjectURL(file) {
          var url = URL.createObjectURL(file);
          console(url)
        
      },
      getWz(val){
          let that = this
          let wz = eval("that.zjs."+val+".name")
          return wz
      },
      getType(val){
          let that = this
          let wz2 = eval("that.zjs."+val+".type")
          return wz2
      },
    //图片相关
      delImg(){
          let that = this;
          that.addForm.imgUrl = '';
          that.changeForm.imgUrl = '';
      },
   
      beforeAvatarUpload(file) {
        let that = this;
        const isJPG = file.type === 'image/jpeg';
        const realName = that.addForm.realName?true:false;
        if (!isJPG) {
          this.$message.error('请上传 JPG 格式的图片!');
        }
        if (!realName) {
          this.$message.error('请先填入人员姓名');
        }
        that.imgData.name = that.addForm.realName;
        return isJPG && realName;
      },
      beforeAvatarUpload2(file) {
        let that = this;
        const isJPG = file.type === 'image/jpeg';
        const realName = that.changeForm.realName?true:false;
        if (!isJPG) {
          this.$message.error('请上传 JPG 格式的图片!');
        }
        if (!realName) {
          this.$message.error('请先填入人员姓名');
        }
        that.imgData.name = that.changeForm.realName;
        return isJPG && realName;
      },
    //图片相关结束
    getList() {
      // that.listLoading = true
      let that = this;
      let obj = {};
      //所属地点,若有则加入查询条件
      // if (that.address && that.address.length != 0) {
      //   obj.cjId = that.address[1];
      // }
     let query = Object.assign({},obj,that.query); //合并查询条件
      getAction(
        `${_URL.kaoqin_findAll}?pageNum=${that.nowPage}&pageSize=${that.pageSize}`,query
      ).then((response) => {
        console.log(JSON.stringify(response))
        if (response.flag) {
          that.tableData = response.data.rows;
          that.total = response.data.total;
        } else {
          that.tableData = [];
          that.$message.error(response.message);
        }
      });
    },
    handleSizeChange(val) {
      let that = this;
      //改变路由，刷新后分页不会丢
      let queryString = "?page=" + that.nowPage + "&pageSize=" + val;
      that.$router.replace(`${queryString}`);
      //改变页内参数，获取新数据
      that.pageSize = val;
      that.getList();
    },
    handleCurrentChange(val) {
      let that = this;
      let queryString = "?page=" + val + "&pageSize=" + that.pageSize;
      that.nowPage = val;
      that.$router.replace(`${queryString}`);
      that.getList();
    },
    showDt(id) {
      let that = this;
      that.dtObj = [];
      that.listLoading = true;
      getAction(_URL.illegaladdimg_findById + "?id=" + id).then((response) => {
        that.dtIsShow = true;
        that.listLoading = false;
        // console.log(JSON.stringify(response));
        if (response.flag) {
          that.dtObj.push(response.data.illegaladdimg);
        } else {
          that.$message.error(response.message);
        }
      });
    },
    //搜索
    goSearch() {
      let that = this;
      //页码先归1
      let queryString = "?page=1&pageSize=" + that.pageSize;
      that.$router.replace(`${queryString}`);
      that.nowPage = 1;
      //获取数据
      that.getList();
    },
    // 重置
    clear() {
      let that = this;
      //发生地点
      that.query = {
        name:'',
        passTime:'',
      },
    
      that.getList();
    },
    //新增摄像头
    add(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = that.addForm
          let purl = ''
          if(that.addForm.id==""){
             purl = _URL.pf_save;
              postAction(purl, obj).then((response) => {
                if (response.flag) {
                  that.$message.success(response.message);
                  //清空数据
                  // that.addForm.gs = "";
                  // that.addForm.cj = "";
                  that.resetForm("addForm");
                  that.getList();
                } else {
                  that.$message.error(response.message);
                  //清空数据
                  // that.addForm.gs = "";
                  // that.addForm.cj = "";
                  that.resetForm("addForm");
                }
              });

          }else{
             purl = _URL.pf_update;
             putAction(purl, obj).then((response) => {
                if (response.flag) {
                  that.$message.success(response.message);
                  //清空数据
                  // that.addForm.gs = "";
                  // that.addForm.cj = "";
                  that.resetForm("addForm");
                  that.getList();
                } else {
                  that.$message.error(response.message);
                  //清空数据
                  // that.addForm.gs = "";
                  // that.addForm.cj = "";
                  that.resetForm("addForm");
                }
              });
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增菜单级联地点获取lable
    handleAddressFun() {
      let thsAreaCode = this.$refs["cascaderAddr"].getCheckedNodes();
      //获取label值
      this.addForm.gs = thsAreaCode[0]["pathLabels"][0];
      this.addForm.cj = thsAreaCode[0]["pathLabels"][1];
    },
    handleAddressFunChange() {
      let thsAreaCode = this.$refs["cascaderAddrChange"].getCheckedNodes();
      //获取label值
      this.changeForm.gs = thsAreaCode[0]["pathLabels"][0];
      this.changeForm.cj = thsAreaCode[0]["pathLabels"][1];
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
      this.addForm={
        id:'',
        name:'',
        bz:'',
        number:''
      },
      this.addIsShow = false;
    },
    //删除摄像头
    cdelete(id) {
      let that = this;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            id: id,
          };
          deleteAction(`${_URL.pf_delete}`, obj).then((response) => {
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              that.getList();
            } else {
              that.$message.error(response.message);
              //清空数据
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goChange(obj) {
      let that = this;
      //自动填入相关信息
      that.addForm = [];
      that.addForm.push(obj);
      that.addIsShow = true;
    },
    //获取下拉框
    getSelect() {
      let that = this;
      let obj = {};
      getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
        (response) => {
          if (response.message != "暂无数据") {
            console.log(JSON.stringify(response));
            // let bdata = response.data.rows;
            // for(let i = 0;i<bdata.length;i++){
            //   bdata[i].cjname=bdata[i].na
            //   delete bdata[i].name;
            // }
            // resolve(response.data.rows)
            var jsonDataTree = that.transData(response.data.rows, 'id', 'cid', 'children');
            console.log(JSON.stringify(jsonDataTree));
            that.depment = jsonDataTree;
          } else {
            resolve([]);
          }
        }
      );
    },
    transData(a, idStr, pidStr, chindrenStr) {
      var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        len = a.length;
        for (; i < len; i++) {
          hash[a[i][id]] = a[i];
        }
        for (; j < len; j++) {
          var aVal = a[j],
            hashVP = hash[aVal[pid]];
          if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
          } else {
            if(aVal.cid=='0'){
              r.push(aVal);
            }
          }
        }
        return r;
    },
    getRoleTxt(val){
      if(val==1){
        return '公司管理员';
      }
      if(val==2){
        return '部门管理员';
      }
      if(val==3){
        return '钻机管理员';
      }
      if(val==4){
        return '职工';
      }
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.index {
  .addItem{
    width: 300px;
    display: inline-block;
    margin:10px;
    .el-upload-list{
      float:right;
      margin-top:-8px
    }
  }
  .imgUpload{
    position: absolute;
  }
  .bjmsg {
    margin-left: 30px;
    color: black;
    font-size: 16px;
    display: block;
    line-height: 30px;
  }
  .bjImg {
    width: 100%;
    margin-top: 20px;
  }
}
</style>