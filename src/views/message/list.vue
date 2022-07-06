<template>
  <div class="app-container index">
    <div class="filter-container">
      <el-input
        v-model="title"
        clearable
        placeholder="请输入标题关键字"
        style="width: 200px"
        class="filter-item"
      />
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
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column label="内容" width="1200"> 
        <template slot-scope="scope">
          <div v-html="scope.row.nr"></div>
        </template>
      </el-table-column>
     
      <el-table-column prop="tbTime" label="发布时间"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goChange(scope.row)"
            >变更</el-button
          >
          <el-button @click="cdelete(scope.row.id)" type="danger" size="mini"
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
    <!-- 弹出层 ，又写了一个组件，changObj没用了-->
    <el-dialog title="添加通知公告" :visible.sync="addIsShow">
      <uploadDoc2  @close="addIsShow=false" @submit="add" ref="uploadDoc" :changObj="changObj"/>
    </el-dialog>
     <!-- 弹出层2 -->
    <el-dialog title="修改内容" :visible.sync="addIsShowCg">
      <changeDoc2  @close="addIsShowCg=false" @submit="change" ref="changeDoc" :changObj="changObj"/>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import uploadDoc2 from '@/components/uploadDoc2';
import changeDoc2 from '@/components/changeDoc2';
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
import { mapGetters } from "vuex";
export default {
  components: {
    uploadDoc2,
    changeDoc2
  },
  name: "ComplexTable",
  data() {
    return {
      listLoading: false,
      currentPage4: 4,
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
      title: '',
      //发生地点
      depment: [],
      dtObj: [],
      addForm: {
        //添加摄像头时的车间部门
        addAddres: [],
        //添加时的摄像头ip
        cameraIp: "",
        // gs: "",
        // cj: "",
      },
      changeForm: {
        //添加摄像头时的车间部门
        addAddres: [],
        //添加时的摄像头ip
        cameraIp: "",
        // gs: "",
        // cj: "",
        id: "",
      },
      //添加时的表单验证规则
      addRules: {
        cameraIp: [
          { required: true, message: "请输入摄像头IP地址", trigger: "blur" },
        ],
        addAddres: [
          {
            required: true,
            message: "请选择摄像头所在地点",
            trigger: "change",
          },
        ],
      },
      changObj:{}
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar","name"]),
  },
  created() {
    let that = this;
    //获取数据
    that.getList();
    //获取下拉框数据
    //that.getSelect();
  },
  mounted() {
    // let that = this;
    // setInterval(function(){
    //   that.getList();
    // },20000)
  },
  methods: {
    getList() {
      let that = this;
      that.listLoading = true
      let obj = {
        pageNum:that.nowPage,
        pageSize:that.pageSize,
        title:that.title
      };
      getAction(`${_URL.notice_findAll}`,obj).then((response) => {
        //console.log(JSON.stringify(response));
        that.listLoading = false
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
      that.address = [];
      that.keywords = "";
      that.getList();
    },
    //新增
    add(formData,fgsIDbz) {
          let that = this;
          let obj = {
            title: formData.title,
            nr: formData.nr,
            tbr:that.name,
            tbTime:that.getCurrentTime(),
          };
          postAction(`${_URL.notice_save}`, obj).then((response) => {
            if (response.flag) {
              //关闭窗口
              that.addIsShow = false;
              that.$message.success(response.message);
              //清空数据
              //重置表单
              that.$refs.uploadDoc.resetForm('ruleForm');
              that.getList();
            } else {
              that.$message.error(response.message);
            }
          });
    },
    getCurrentTime() {
        //获取当前时间并打印
    　　let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1;
    　　let dd = new Date().getDate();
    　　let hh = new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    　　return(yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss);
    },
    close(){
        let that = this;
        // that.$refs.uploadDoc.resetForm('ruleForm');
        //关闭窗口
        that.addIsShow = false;
    },
    closeCg(){
        let that = this;
        // that.$refs.changeDoc.resetForm('ruleForm');
        //关闭窗口
        that.addIsShowCg = false;
    },
    //变更
    change(formData,fgsIDbz,id) {
          let that = this;
          let obj = {
            id:id,
            title: formData.title,
            nr: formData.nr,
            tbr:that.name,
            tbTime:that.getCurrentTime(),
          };
          putAction(`${_URL.notice_update}`, obj).then((response) => {
            if (response.flag) {
              //关闭窗口
              that.addIsShowCg = false;
              that.$message.success(response.message);
              //清空数据
              //重置表单
              that.$refs.changeDoc.resetForm('ruleFormCg');
              that.getList();
            } else {
              that.$message.error(response.message);
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
      })
        .then(() => {
          let obj = {
            id: id,
          };
          deleteAction(`${_URL.notice_delete}`, obj).then((response) => {
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
      //console.log(JSON.stringify(obj));
      let that = this;
      that.addIsShowCg=true;
      that.changObj = obj;
      //自动填入相关信息
      // that.changeForm.cameraIp = obj.ip;
      // that.changeForm.addAddres = ['1',obj.fgsId, obj.cjId];
      // that.changeForm.gs=obj.fgsName;
      // that.changeForm.cj=obj.cjName;
      // that.changeForm.id = obj.id;
      // that.addIsShowCg = true;
    },
    //获取下拉框
    getSelect() {
      let that = this;
      let obj = {};
      getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
        (response) => {
          if (response.message != "暂无数据") {
           // console.log(JSON.stringify(response));
            // let bdata = response.data.rows;
            // for(let i = 0;i<bdata.length;i++){
            //   bdata[i].cjname=bdata[i].na
            //   delete bdata[i].name;
            // }
            // resolve(response.data.rows)
            var jsonDataTree = that.transData(response.data.rows, 'id', 'cid', 'children');
          //  console.log(JSON.stringify(jsonDataTree));
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
    getJb(val){
        if(val=='zgs'){
          return '总公司级'
        }
        if(val=='fgs'){
          return '分公司级'
        }
        if(val=='cj'){
          return '车间级'
        }
    },
    goAdd(){
      let that = this;
      that.changObj = {};
      that.addIsShow = true;
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.index {
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