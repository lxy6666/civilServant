<template>
  <div class="app-container index vol">
    <div class="filter-container">
      <!-- {{changeForm.addAddres}} -->
      <el-input
        v-model="query.forusername"
        clearable
        placeholder="部门名称"
        style="width: 200px"
        class="filter-item"
      />
      <!-- <el-input
        v-model="query.zjhm"
        clearable
        placeholder="证件号码"
        style="width: 200px"
        class="filter-item"
      />
      <el-select v-model="query.status" placeholder="审核状态" clearable style="width:200px;" class="filter-item">
        <el-option v-for="item in bjtypes" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> -->
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
        icon="el-icon-circle-plus-outline"
        @click="goAdd"
        v-if="!exa"
      >
        新增
      </el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="jiguanname" label="部门名称"> </el-table-column>
      <el-table-column prop="khdc" label="考核等次"> </el-table-column>
      <el-table-column prop="khyear" label="考核年度"> </el-table-column>
      <el-table-column prop="tbtime" label="采集时间"> </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope" >
          <el-button type="primary" size="mini" @click="goChange(scope.row,false,false)"
            >查看</el-button
          >
          <el-button v-show="!exa" type="primary" size="mini" @click="goChange(scope.row,true,false)"
            >编辑</el-button
          >
          <el-button  @click="cdelete(scope.row.id)" type="danger" size="mini"
            >删除</el-button
          >
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
    <el-dialog 
      :title="pickTitle" 
      :visible.sync="addIsShow" 
      top="3vh"
      :close-on-click-modal="false" 
      width="1002px"
      :destroy-on-close="true"
      @close="resetForm('addForm')"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        class="demo-ruleForm"
      >
    
     
        <el-form-item label="部门名称" prop="jiguanname" class="addItem">
          <el-input
            v-model="addForm.jiguanname"
            placeholder="请输入部门名称"
          ></el-input>     
        </el-form-item>
         <el-form-item label="考核等次" prop="khdc" class="addItem">
          <el-input
            v-model="addForm.khdc"
            placeholder="请输入考核等次"
          ></el-input>     
        </el-form-item>
         <el-form-item label="考核年度" prop="khyear" class="addItem">
          <el-input
            v-model="addForm.khyear"
            placeholder="请输入考核年度"
          ></el-input>     
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取 消</el-button>
        <el-button v-if="canEdit" type="primary" @click="add('addForm',false)">确 定</el-button>
        <el-button v-if="isSh" type="primary" @click="add('addForm',1)">审核通过</el-button>
        <el-button v-if="isSh" type="danger" @click="add('addForm',-1)">审核拒绝</el-button>
      </span>
      <div class="covers" @click="showSh()" v-if="!canEdit"></div>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
import { mapGetters } from "vuex";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "ComplexTable",
  components: {
    Treeselect,
  },
  data() {
    return {
      exa:false,
      upLoadUrl:'',//上传路径
      nodes: [],
      value: null,
      bjtypes: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '待审核'
      }, {
        value: '1',
        label: '审核通过'
      }, {
        value: '-1',
        label: '审核未通过'
      }],
      listLoading: false,
      tableData: [],
      total: 0,
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
      //发生地点
      depment: [],
      dtObj: [],
      query:{
          forusername:'',//人员姓名
          zjhm:'',//证件号码
          status:''//状态
      },
      addForm: {
        id:'',
        jiguanid:'1',
        jiguanname:'',
        khdc:'',
        khyear:''
      },
      uploadType:'',
      canEdit:'',
      isSh:'',
      list:'',//人员列表
      columns:[
        {title: '姓名',data: 'name'},
        {title: '部门',data: 'ssbm'},
        {title: '身份证号',data: 'idCode'},
      ],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.zhibiaoListst,
          isDisabled: node.isdir=="1"?true:false
        }
      },
      pickTitle:'区直机关绩效考核信息',
      //添加时的表单验证规则
      addRules: {
        jiguanname: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        khdc: [
          { required: true, message: "请输入考核等次", trigger: "blur" },
        ],
        khyear: [
          { required: true, message: "请输入考核年度", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar"]),
  },
  created() {
    let that = this;
    //获取数据
    that.getList();
    //获取指标选项
    that.getZbList();
    //获取人员选项
    that.getPerson();
    that.upLoadUrl =  _URL.uploadFile_file
  },
  mounted() {
     let that = this;
      let s = that.$route.path;
      let p = s.substring(s.length-3,s.length);
      if(p=='exa'){
        that.exa = true;
      }
  },
  methods: {
      showSh(){
       // alert('审核')
      },
      onUpload(response, file, fileList) {
        let that = this;
        that.addForm.filepath= []
        if(response.flag){
          that.addForm.filepath.push({
            name:file.name,
            url:response.data
          })
        }
      },
      getFiles(file) {
        window.open(_URL.DURL+file.url);
        //console.log(file);
        // alert(file.url);
        //alert(1);
        // let that = this;
        // that.addForm.filepath= []
        // if(response.flag){
        //   that.addForm.filepath.push({
        //     name:file.name,
        //     url:response.data
        //   })
        // }
      },
      beforeRemove(file, fileList){
          let that = this;
          let n = ''
          for(var i=0;i<that.addForm.filepath.length;i++){
              if(that.addForm.filepath[i]['name']==file.name){
                n = i
              }
          }
         // alert(n);
          that.addForm.filepath = that.addForm.filepath.splice(1,n);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // },
      setDqtime(val){
        //val是日期对象，如Tue Feb 23 2021 00:00:00 GMT+0800 (中国标准时间)
        let that = this;
        //日期对象转2021/66/88
        let zytime = val.toLocaleDateString();
        //处理
        that.addForm.zytime = zytime
      },
      // 选择了人员
      getVals(Array){
        let that = this;
        that.addForm.forusername = Array[0].name;
        that.addForm.foruserid = Array[0].id;
        that.addForm.zjhm = Array[0].idCode;
      },
      getPerson() {
        //部门
        let dept = localStorage.getItem('dept').split(',')
        let isDw = dept.indexOf('机关党委');
        let isBgs = dept.indexOf('办公室');
        let isZzb = dept.indexOf('政治部');
        //党支部
        let type = localStorage.getItem('type')  
     //   alert(dept);
        let that = this;
        that.listLoading = true
        let obj = {
          pageNum:1,
          pageSize:999,
        };
        if(isDw!=-1&&isBgs==-1&&isZzb==-1){
          obj.type = type
        }
        getAction(`${_URL.user_findAll}`,obj).then((response) => {
          that.listLoading = false;
          console.log(JSON.stringify(response))
          if (response.flag) {
            that.list = response.data.rows;
           // that.total = response.data.total;
          } else {
            that.list = [];
            that.$message.error(response.message);
          }
        });
      },
     getZb(node, instanceId){
        let that = this;
        console.log(JSON.stringify(node));
        that.addForm.zbid=node.id;//指标ID
        that.addForm.zbcode=node.code;//指标编码
        that.addForm.zbname=node.name;//指标名称
        that.addForm.zbdf=node.number;//指标得分
        //自动填入得分说明
        that.addForm.dfremark = node.name;//指标名称
        //根据指标自动划分审核部门
        that.addForm.shbmname = node.type;
     },
     getZbList() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
      });
      // that.listLoading = true
      let that = this;
      let obj = {
        pid:'180'
      };
      // getAction(`${_URL.zhibiao_findAll}`,obj).then((response) => {
      getAction(`${_URL.zhibiao_findShu}`,obj).then((response) => {
        console.log(JSON.stringify(response))
        loading.close();
        // if (response.flag) {
        //   var jsonDataTree = that.transData(response.data, 'id', 'pid', 'children');  
        //   that.nodes = jsonDataTree;
        // } else {
          
        // }
        if (response.flag) {
           that.nodes = response.data
        }
      });
    },
    transData(a, idStr, pidStr, chindrenStr){  
        var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;  
        for(; i < len; i++){  
            hash[a[i][id]] = a[i];  
        }  
        for(; j < len; j++){  
            var aVal = a[j], hashVP = hash[aVal[pid]];  
            if(hashVP){  
                !hashVP[children] && (hashVP[children] = []);  
                hashVP[children].push(aVal);  
            }else{  
                r.push(aVal);  
            }  
        }  
        return r;  
     },
    getStatusText(val){
        if(val==0){
          return "待审核"
        }
        if(val==1){
          return "审核通过"
        }
        if(val==-1){
          return "审核未通过"
        }
    },
    getList() {
      // that.listLoading = true
      let that = this;
      let obj = {
        pageNum:that.nowPage,
        pageSize:that.pageSize
      };
      let query = Object.assign({},obj,that.query); //合并查询条件
      //所属地点,若有则加入查询条件
      getAction(`${_URL.jiguanKaohe_findAll}`,query).then((response) => {
        console.log(JSON.stringify(response));
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
          forusername:'',//人员姓名
          zjhm:'',//证件号码
      };
      that.getList();
    },
    //新增摄像头
    add(formName,status) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(that.uploadType=='add'){
            that.addForm.tbtime = new Date().toLocaleDateString()
            that.addForm.status = 1;
          }
          if(that.uploadType=='change'&&!that.isSh){
            that.addForm.status = 1;
            that.addForm.shbz = '';
          }
          if(that.isSh){
            that.addForm.shrid =  localStorage.getItem('uid');
            that.addForm.shrname = localStorage.getItem('uname');
            that.addForm.status = status;
          }
          that.addForm.filepath = JSON.stringify(that.addForm.filepath)
          if(that.uploadType=='add'){
              postAction(`${_URL.jiguanKaohe_save}`, that.addForm).then((response) => {
                console.log(JSON.stringify(response))
                if (response.flag) {
                  that.$message.success(response.message);
                  //清空数据
                  that.resetForm("addForm");
                  that.clear()
               //   that.getList();
                } else {
                  that.$message.error(response.message);
                  //清空数据
                  that.resetForm("addForm");
                }
              });
          }else if(that.uploadType=='change'){
              putAction(`${_URL.zy_update}`, that.addForm).then((response) => {
                console.log(JSON.stringify(response))
                if (response.flag) {
                  that.$message.success(response.message);
                  //清空数据
                  that.resetForm("addForm");
                  that.clear()
                  // that.getList();
                } else {
                  that.$message.error(response.message);
                  //清空数据
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
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addForm={
        id:'',
        forusername:'',//正面人姓名
        foruserid:'',//正面人ID
        zjlx:'居民身份证',//证件类型
        zjhm:'',//证件号码
        tbtime:'',//填表日期，自动
        zynr:'',//志愿服务内容
        zyfwsc:'',//志愿服务时长
        zytime:'',//志愿服务开始日期
        filepath:[],//附件地址
        bz:'',//备注
        //审核部门
        shbmname:'',
        //以下是审核信息
        shrid:'',//审核人ID
        shrname:'',//审核人名称
        shbz:'',//审核备注
        status:'',//状态
        sbrid:localStorage.getItem('uid')//上报人ID
      },
      this.addIsShow = false;
      this.addIsShowCg = false;
    },
    //删除摄像头
    cdelete(id) {
      let that = this;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          let obj = {
            id: id,
          };
          deleteAction(`${_URL.jiguanKaohe_delete}`, obj).then((response) => {
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
            message: "已取消删除",
          });
        });
    },
    goChange(obj,canEdit,isSh) {
      //切断变量之间的绑定关系
      let s = { ...obj}
      // let s = { ...this.xxx}
      let that = this;
      if(s.filepath){
          s.filepath = JSON.parse(s.filepath);
      }
      //自动填入相关信息
      that.addForm = s
      that.addIsShow = true
      //提交类型
      that.uploadType = 'change'
      //是否允许编辑
      that.canEdit = canEdit
      //是否为审核
      that.isSh = isSh
    },
    goAdd(obj) {
      let that = this;
      that.addIsShow = true;
      //自动填入相关信息
      that.uploadType = 'add'
      that.canEdit = true,
      that.isSh = false
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.vol {
  .line{
    border-top:solid 1px rgb(230,230,230)
  }
  .input__inner{
    display: none;
  }
  .zbItem{
    margin:10px;
  }
  .zbItem2{
    width: 300px;
    display: inline-block;
    margin:10px;
  }
  .addItem{
    width: 300px;
    display: inline-block;
    margin:10px;
    .el-upload-list{
      float:right;
      margin-top:-8px
    }
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
  .tableSelect{
    position: absolute;
    width:300px;
    top:37px;
  }
  .hinput input{
    border:none
  }
  .fjItem{
    display: inline-block;
    margin:10px;
  }
  .covers{
    position: absolute;
    width: 950px;
    height: 180px;
    background:rgba(0,0,0,0);
    z-index: 9999;
    top:10px;
  }
}
.sp-table{
  th,td{
    width:33% !important
  }
}
</style>