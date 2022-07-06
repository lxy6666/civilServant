<template>
  <div class="app-container index">
    <div class="filter-container">
      <!-- {{tableData}} -->
      <el-input v-model="keywords" clearable placeholder="分公司名称" style="width: 200px;" class="filter-item" />
      <!-- <el-cascader
        v-model="address"
        :options="depment"
        class="filter-item"
        placeholder="所在地点"
        style="width: 200px"
        clearable
      >
      </el-cascader> -->
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
        @click="addIsShow = true"
      >
        新增
      </el-button>
        </div>
        <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: true}">
        <el-table-column
          prop="zname"
          label="总公司"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="分公司"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          >
          <template slot-scope="scope" v-if="scope.row.type=='fgs'">
            <el-button type="primary" size="mini" @click="goChange(scope.row)">变更</el-button>
            <el-button @click="cdelete(scope.row.id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    <!-- <div style="height: 66px"></div> -->
    <!-- <footer class="footer" :class="sidebar.opened ? 'bwidth' : 'swidth'">
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
    </footer> -->
    <!-- 弹出层 -->
    <el-dialog title="添加分公司" :visible.sync="addIsShow" width="400px">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        class="demo-ruleForm"
      >
        <el-form-item label="分公司名称" prop="name">
          <el-input
            v-model="addForm.name"
            placeholder="请输入分公司名称"
            style="width: 360px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取 消</el-button>
        <el-button type="primary" @click="add('addForm')">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 弹出层2 -->
    <el-dialog title="变更分公司" :visible.sync="addIsShowCg" width="400px">
      <el-form
        :model="changeForm"
        :rules="addRules"
        ref="changeForm"
        class="demo-ruleForm"
      >
        <el-form-item label="分公司名称" prop="name">
          <el-input
            v-model="changeForm.name"
            placeholder="请输入分公司名称"
            style="width: 360px"
          ></el-input>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('changeForm')">取 消</el-button>
        <el-button type="primary" @click="change('changeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction,putAction } from "@/api/manage";
import { mapGetters } from "vuex";
export default {
  name: "ComplexTable",
  data() {
    return {
      listLoading: false,
      currentPage4: 4,
      tableData: [
        {
          id: 1,
          zname: '总公司',
          children:[]
        }
      ],
      total: 0,
      pageSizes: [15, 30, 60, 100],
      pageSize: this.$route.query.pageSize
        ? Number(this.$route.query.pageSize)
        : 9999,
      nowPage: this.$route.query.page ? Number(this.$route.query.page) : 1,
      addIsShow: false,
      addIsShowCg:false,
      //发生地点
      address: [],
      //ip地址
      keywords:null,
      dtObj: [],
      addForm: {
        //添加摄像头时的车间部门
        addAddres: [],
        //添加时的摄像头ip
        cameraIp: "",
        gs: "",
        cj: "",
        name:'',
      },
      changeForm: {
        //添加摄像头时的车间部门
        addAddres: [],
        //添加时的摄像头ip
        cameraIp: "",
        gs: "",
        cj: "",
        id:"",
        name:'',
      },
      //添加时的表单验证规则
      addRules: {
        name: [
          { required: true, message: "请输入分公司名称", trigger: "blur" },
        ],
        addAddres: [
          {
            required: true,
            message: "请选择摄像头所在地点",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar"]),
  },
  created() {
    let that = this;
    that.getList();
  },
  mounted() {
    // let that = this;
    // setInterval(function(){
    //   that.getList();
    // },20000)
  },
  methods: {
    getList() {
      // that.listLoading = true
      let that = this;
      let obj = {
        //上级id
        cid:1
      };
      //所属地点,若有则加入查询条件
      if (that.keywords && that.keywords != '') {
        obj.name = that.keywords;
      };
      getAction(`${_URL.company_findAll}?pageNum=${that.nowPage}&pageSize=${that.pageSize}`,obj).then((response) => {
       //console.log(JSON.stringify(response));
       if (response.flag) {
        //  (1);alert
          that.tableData[0].children = response.data.rows;
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
      that.keywords = '';
      that.getList();
    },
    //新增分公司
    add(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            name: that.addForm.name,
            type:'fgs',
            cid:'1'
          };
          postAction(`${_URL.company_save}`, obj).then((response) => {
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              that.resetForm("addForm");
              that.getList();
            } else {
              that.$message.error(response.message);
              //清空数据
              that.resetForm("addForm");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //变更
    change(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            id:that.changeForm.id,
            name: that.changeForm.name,
            type:'fgs',
            cid:'1'
          };
          putAction(`${_URL.company_update}`, obj).then((response) => {
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              that.resetForm("changeForm");
              that.getList();
            } else {
              that.$message.error(response.message);
              //清空数据
              that.resetForm("changeForm");
            }
          });
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
    handleAddressFunChange(){
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
          deleteAction(`${_URL.company_delete}`, obj).then((response) => {
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
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
    goChange(obj){
        let that = this;
        //自动填入相关信息
        that.changeForm.name=obj.name;
        that.changeForm.id=obj.id;
        that.addIsShowCg = true;
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

