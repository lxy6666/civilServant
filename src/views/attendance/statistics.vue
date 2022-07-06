<template>
  <div class="app-container index">
  <div class="filter-container">
      <!-- <el-input
       
        clearable
        placeholder="姓名"
        style="width: 200px"
        class="filter-item"
      /> -->
      <!-- {{query.date}} -->
     <el-date-picker
        v-model="query.date"
        type="month"
        placeholder="选择月份"
        class="datePicker"
        :clearable="false"
        style="margin-right:20px"
        value-format="yyyy-MM"
        @change="getList()"
        >
      </el-date-picker>
      <!-- {{departmentName}} -->
      <el-cascader
        v-model="departmentName"
        :options="depts"
        :props="{
          value: 'departName',
          label: 'departName',
          children: 'children',
        }"
        class="filter-item"
        placeholder="选择部门"
        style="width: 260px"
        @change="getList"
        clearable
      >
      </el-cascader>
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
       <el-button
        style="float: right"
        class="filter-item"
        type="primary"
        @click="exportExcel"
      >
        导出
      </el-button>
    </div>

    <!-- <el-table :data="tableData">
      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column v-for="(item, index) in listData[0].users" :key="Date.now()">
        <template slot="header" slot-scope="scope">
          {{item.name}}
        </template>
        <template slot-scope="scope">{{scope.row.users[index].scores}}</template>
      </el-table-column>
    </el-table> -->


    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      stripe
      height="calc(100vh - 180px)"
      id="out-table"
    >
      <el-table-column prop="name" width="80px" fixed label="姓名">
      </el-table-column>
      <!-- 循环列，得到日期 -->
      <el-table-column width="60px" :label="getDate(item.date)" v-for="(item, index) in tableData[0].kaoqinList" :key=index>
          <template slot-scope="scope">
            <div v-if="scope.row.kaoqinList[index]">
                <font v-if="scope.row.kaoqinList[index].status==0&&scope.row.kaoqinList[index].jia==0" @click="cgCk(scope.row.kaoqinList[index])">✔️</font>
                <div v-if="scope.row.kaoqinList[index].status!=0&&scope.row.kaoqinList[index].jia==0" @click="cgCk(scope.row.kaoqinList[index])">
                        <font v-if="scope.row.kaoqinList[index].cd!=0">迟到&nbsp;<br></font>
                        <font v-if="scope.row.kaoqinList[index].zt!=0">早退&nbsp;<br></font>
                        <font v-if="scope.row.kaoqinList[index].qj!=0">请假&nbsp;<br></font>
                        <font v-if="scope.row.kaoqinList[index].cc!=0">出差&nbsp;<br></font>
                        <font v-if="scope.row.kaoqinList[index].kg!=0">缺勤&nbsp;<br></font>
                </div>
                <div v-if="scope.row.kaoqinList[index].jia!=0">
                  <font>休&nbsp;<br></font>
                </div>
           </div>
          </template>
      </el-table-column>
      <el-table-column width="50px" prop="all_kg" fixed="right" label="缺勤">
      </el-table-column>
      <el-table-column width="50px" prop="all_zt" fixed="right" label="早退">
      </el-table-column>
      <el-table-column width="50px" prop="all_cd" fixed="right" label="迟到">
      </el-table-column>
      <el-table-column width="50px" prop="all_cc" fixed="right" label="出差">
      </el-table-column>
      <el-table-column width="50px" prop="all_qj" fixed="right" label="请假">
      </el-table-column>
      <el-table-column width="65px" prop="all_jia" fixed="right" align="center" label="休息日">
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog title="评判标准" :visible.sync="addIsShow" width="360px">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        class="demo-ruleForm"
      >
        <el-form-item label="等级名称" prop="name" class="addItem">
          <el-input
            v-model="addForm.name"
            placeholder="请输入等级名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="最低分" prop="bz" class="addItem" >
          <el-input
            v-model="addForm.bz"
            placeholder="请输入最低分"
          ></el-input>
        </el-form-item>
        <el-form-item label="最高分" prop="number" class="addItem">
          <el-input
            v-model="addForm.number"
            placeholder="请输入最高分"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="height:20px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取 消</el-button>
        <el-button type="primary" @click="add('addForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
import { mapGetters } from "vuex";
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: "ComplexTable",
  data() {
    return {
      departmentName:'',
      query:{
          date:''
      },
      listLoading: false,
      currentPage4: 4,
      tableData: [],
      total: 0,
      imgData:{
        name:''
      },
      pageSizes: [15, 30, 60, 100],
      pageSize: this.$route.query.pageSize
        ? Number(this.$route.query.pageSize)
        : 999,
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
      depts: [],
      dtObj: [],
      addForm: {
        id:'',
        name:'',
        bz:'',
        number:''
      },
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
    that.query.date = this.getCurrentTime()
    //获取数据
    that.getList();
    //获取下拉框数据
    // that.getSelect();
    that.getBmList();
  },
  mounted() {
    // let that = this;
    // setInterval(function(){
    //   that.getList();
    // },20000)
  },
  methods: {
    getBmList() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
      });
      // that.listLoading = true
      let that = this;
      let obj = {};
      // getAction(`${_URL.zhibiao_findAll}`,obj).then((response) => {
      getAction(`${_URL.dept_findAlll}`, obj).then((response) => {
        console.log(JSON.stringify(response));
        loading.close();
        if (response.flag) {
          that.depts = response.data;

          var jsonDataTree = that.transData(
            response.data,
            "id",
            "parentId",
            "children"
          );
          console.log(JSON.stringify(jsonDataTree));
          that.depts = jsonDataTree[0]["children"];
        }
      });
    },
    cgCk(val){
      let that = this;
      if(val.status==0){
          that.$message.success("考勤正常，无需修改");
      }else{
          this.$confirm("是否要将"+val.name+"在"+val.date+"的考勤修改为正常状态?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
              let obj = {
                name:val.name,
                date:val.date
              };
              // alert(JSON.stringify(obj));
              getAction(`${_URL.kaoqin_update}`, obj).then((response) => {
                if (response.flag) {
                  that.$message.success(response.message);
                  //清空数据
                  that.getList();
                } else {
                  that.$message.error(response.message);
                  //清空数据
                }
              });
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },
     exportExcel () {
       let that=this
        //  /* out-table关联导出的dom节点  */
        //  var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        //  /* get binary string as output */
        //  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        //  try {
        //      FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), that.query.date+'考勤统计.xlsx')
        //  } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        //  return wbout


        /* generate workbook object from table */
          // 判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去，
          var id = "#out-table"
          var fix = document.querySelector('.el-table__fixed');
          var wb;
          if (fix) {
            wb = XLSX.utils.table_to_book(document.querySelector(id).removeChild(fix));
            document.querySelector(id).appendChild(fix);
          } else {
            wb = XLSX.utils.table_to_book(document.querySelector(id));
          }
          /* get binary string as output */
          var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
          });
          try {
            FileSaver.saveAs(
              new Blob([wbout], {
                type: 'application/octet-stream'
              }),
              that.query.date+'考勤统计.xlsx'
            );
          } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout);
          }
          return wbout;
     },
    getDate(val){
      let s = val.split('-')
      return Number(s[2])+'日'
    },
    //图片相关
     getCurrentTime() {
        //获取当前时间并打印
    // 　　let yy = new Date().getFullYear();
    //     //获取前一个月
    // 　　let mm = new Date().getMonth()+1;
    // //调月份
    //   　if(mm<10){
    //       mm = '0'+mm
    //     }
    //     // alert(yy+'-'+mm)
    // 　　return(yy+'-'+mm);
    return "2021-11"
    },
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
      let that = this;
      that.listLoading = true
      let obj = {};
      if(that.departmentName){
        obj.departmentName = that.departmentName[0]
      }else{
        obj.departmentName = ''
      }
      //所属地点,若有则加入查询条件
      let query = Object.assign({},obj,that.query); //合并查询条件    
      getAction(
        `${_URL.kaoqin_findBaobiao}`,query
      ).then((response) => {
        that.listLoading = false;
        console.log('啊啊啊啊啊啊啊'+JSON.stringify(response));
        if (response.flag) {
          // that.tableData = response.data;
          that.tableData = response.data.filter((data) => {
            return data.name
          })
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
      that.address = [];
      that.keywords = "";
      that.keywords2 = "";
      that.departmentName = "";
 
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
    getStatus(val){
      // if(val.status){
      //   return val.status
      // }else{
      //    return '没有'
      // }
      
     
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
      console.log(JSON.stringify(obj));
      let that = this;
      //自动填入相关信息
      that.addForm = obj;
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
          r.push(aVal);
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