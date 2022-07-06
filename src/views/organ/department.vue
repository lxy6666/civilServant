<template>
  <div class="app-container index">
    <div class="filter-container">
     
    </div>
      <!-- <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getCj"
        :expand-row-keys = "parry"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="zname"
          label="总公司"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="分公司"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="cjname"
          label="车间">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope" align="center" v-if="scope.row.type=='cj'">
            <el-button type="primary" size="mini" @click="goChange(scope.row)">变更</el-button>
            <el-button @click="cdelete(scope.row.id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table> -->
      <el-table
        :data="tableDataTest"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="departName"
          label="名称"
          sortable
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope" v-if="scope.row.parentId!='-1'">
            <el-button type="primary" size="mini" @click="goChange(scope.row.parentId)">新增同级</el-button>
            <el-button type="primary" size="mini" @click="goChange(scope.row.id)">新增下级</el-button>
            <el-button @click="cdelete(scope.row.id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    <!-- 弹出层 -->
    <el-dialog title="新增" :visible.sync="addIsShow" width="400px">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        class="demo-ruleForm"
      >
       
        <el-form-item label="名称" prop="departName">
          <el-input
            v-model="addForm.departName"
            placeholder="请输入名称"
            style="width: 360px"
          ></el-input>
        </el-form-item>
      </el-form>
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
import { getAction, postAction, deleteAction,putAction } from "@/api/manage";
import { mapGetters } from "vuex";
export default {
  name: "ComplexTable",
  data() {
    return {
      listLoading: false,
      currentPage4: 4,
      parry:['1'],
      nowFgsId:'',
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
      fgs:'',
      dtObj: [],
      addForm: {
        departName:'',
        parentId:''
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
        fgs:'',
      },
      //添加时的表单验证规则
      addRules: {
        departName: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        fgs: [
          {
            required: true,
            message: "请选择车间所属分公司",
            trigger: "change",
          },
        ],
      },
      fgsOptions:[],
      tableDataTest: [
        {
          parentId:'-1',
          id: 1,
          departName: '泰山区',
          children: []
        }],
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar"]),
  },
  created() {
    let that = this;
    //获取分公司下拉框数据
    // that.getFgs();
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
      let that = this;
      let obj = {
        //上级id
        cid:that.fgs
      };
      //所属地点,若有则加入查询条件
      if (that.keywords && that.keywords != '') {
        obj.name = that.keywords;
      };
      getAction(`${_URL.dept_findPageAll}?pageNum=1&pageSize=9999`,obj).then((response) => {
        if (response.flag) {
          let treeObj = that.transData(response.data.rows,'id', 'parentId', 'children')
          console.info(JSON.stringify(treeObj));
          that.tableDataTest[0].children = treeObj;
        //  console.
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
          postAction(`${_URL.dept_save}`, that.addForm).then((response) => {
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              that.resetForm("addForm");
              that.getList();
            //  that.goClear();
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
            type:'cj',
            cid:that.changeForm.fgs
          };
          putAction(`${_URL.company_update}`, obj).then((response) => {
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              that.resetForm("changeForm");
               that.goClear();
              //that.getList();
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
          deleteAction(`${_URL.dept_delete}`, obj).then((response) => {
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
    goChange(pid){
        let that = this;
        that.addIsShow = true;
        that.addForm.parentId = pid;
    },
    //获取分公司
    getFgs(){
        let that = this;
        let obj = {
            // cid:1
        };
        getAction(`${_URL.dept_findPageAll}?pageNum=${that.nowPage}&pageSize=${that.pageSize}`,obj).then((response) => {
            if (response.flag) {
                that.fgsOptions = response.data.rows;
                let sdata = response.data.rows;
                for(let i = 0;i<sdata.length;i++){
                  sdata[i].hasChildren=true;
                }
                that.tableData[0].children = sdata;
            } 
        });
    },
    //获取车间
    getCj(tree, treeNode, resolve){
        let that = this;
        let obj = {
            cid:tree.id
        };
        getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`,obj).then((response) => {
            if (response.message!='暂无数据') {
                let bdata = response.data.rows;
                for(let i = 0;i<bdata.length;i++){
                  bdata[i].cjname=bdata[i].name;
                  delete bdata[i].name;
                }
                resolve(response.data.rows)
            }else{
              resolve([])
            }
        });
    },
    //新增部门
    addBm(id){
        this.nowFgsId = id;
        this.addIsShow  = true;
    },
    //重新获取组织架构
    goClear(){
      let that = this;
      that.tableData=[{
          id: 1,
          zname: '总公司',
          children:[]
      }]
      that.getFgs()
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

