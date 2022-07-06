<template>
  <div class="app-container index">
    <!-- <div class="filter-container">
      <el-input
        v-model="keywords"
        clearable
        placeholder="ip地址"
        style="width: 200px"
        class="filter-item"
      />
      <el-cascader
        v-model="address"
        :options="depment"
        :props="{
          value: 'id',
          label: 'name',
          children: 'children'
        }"
        class="filter-item"
        placeholder="所在地点"
        style="width:260px"
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
        icon="el-icon-circle-plus-outline"
        @click="addIsShow = true"
      >
        新增
      </el-button>
    </div> -->
    <!-- <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="ip" label="摄像头IP"> </el-table-column>
      <el-table-column prop="fgsName" label="分公司"> </el-table-column>
      <el-table-column prop="cjName" label="车间"> </el-table-column>
      <el-table-column prop="spl" label="视频流地址"> </el-table-column>
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
    </el-table> ]=
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
    <div class="zTree">
      <el-input
        placeholder="输入关键字搜索"
        v-model="keywords"
        clearable
        class="keywords"
        ref="search"
      >
      </el-input>
      <el-button type="primary" class="sBtn" @click="onSearch">搜索</el-button>
      <div class="tree" >
        <tree :nodes="nodes" :setting="setting" @onCreated="handleCreated" />
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog title="新建目录" :visible.sync="addIsShow" width="400px">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        class="demo-ruleForm"
      >
        <el-form-item label="目录名称" prop="name">
          <el-input
            v-model="addForm.name"
            placeholder="请输入目录名称"
            style="width: 360px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取 消</el-button>
        <el-button type="primary" @click="addDir('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出层 -->
    <el-dialog title="新建志愿服务" :visible.sync="zbIsShow" width="400px">
      <el-form
        :model="zbForm"
        :rules="zbRules"
        ref="zbForm"
        class="demo-ruleForm"
      >
        <el-form-item label="志愿服务名称" prop="name">
          <el-input
            v-model="zbForm.name"
            placeholder="请输入志愿服务名称"
            style="width: 360px"
          ></el-input>
        </el-form-item>
         <el-form-item label="志愿服务编码" prop="code">
          <el-input
            v-model="zbForm.code"
            placeholder="请设置志愿服务编码"
            style="width: 360px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属部门" prop="type">
          <el-select 
            v-model="zbForm.type" 
            placeholder="请选择部门"
            style="width: 360px"
          >
            <el-option
              key="办公室"
              label="办公室"
              value="办公室">
            </el-option>
            <el-option
              key="政治部"
              label="政治部"
              value="政治部">
            </el-option>
            <el-option
              key="机关党委"
              label="机关党委"
              value="机关党委">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="分值" prop="number">
          <el-input
            v-model="zbForm.number"
            placeholder="请输入志愿服务分值,扣分请输入负数"
            style="width: 360px"
          ></el-input>
        </el-form-item>
       <el-form-item label="是否推送至区" prop="onchange">
          <el-select 
            v-model="zbForm.onchange" 
            placeholder="请选择是否推送"
            style="width: 360px"
          >
            <el-option
              key="n"
              label="不推送"
              value="n">
            </el-option>
            <el-option
              key="y"
              label="推送"
              value="y">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期（月）" prop="number">
          <el-input
            v-model="zbForm.time"
            placeholder="请输入志愿服务有效期"
            style="width: 360px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('zbForm')">取 消</el-button>
        <el-button type="primary" @click="addZb('zbForm')">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="修改志愿服务" :visible.sync="zbCgIsShow" width="400px">
      <el-form
        :model="zbForm"
        :rules="zbRules"
        ref="zbForm"
        class="demo-ruleForm"
      >
        <el-form-item label="志愿服务名称" prop="name">
          <el-input
            v-model="zbForm.name"
            placeholder="请输入志愿服务名称"
            style="width: 360px"
          ></el-input>
        </el-form-item>
        <el-form-item label="志愿服务编码" prop="code">
          <el-input
            v-model="zbForm.code"
            placeholder="请设置志愿服务编码"
            style="width: 360px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属部门" prop="type">
          <el-select 
            v-model="zbForm.type" 
            placeholder="请选择部门"
            style="width: 360px"
          >
            <el-option
              key="办公室"
              label="办公室"
              value="办公室">
            </el-option>
            <el-option
              key="政治部"
              label="政治部"
              value="政治部">
            </el-option>
            <el-option
              key="机关党委"
              label="机关党委"
              value="机关党委">
            </el-option>
          </el-select>
        </el-form-item>  -->
        <el-form-item label="每小时分值" prop="number">
          <el-input
            v-model="zbForm.number"
            placeholder="请输入分值"
            style="width: 360px"
          ></el-input>
        </el-form-item>
       <!-- <el-form-item label="是否推送至区" prop="onchange">
          <el-select 
            v-model="zbForm.onchange" 
            placeholder="请选择是否推送"
            style="width: 360px"
          >
            <el-option
              key="n"
              label="不推送"
              value="n">
            </el-option>
            <el-option
              key="y"
              label="推送"
              value="y">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期（月）" prop="number">
          <el-input
            v-model="zbForm.time"
            placeholder="请输入志愿服务有效期"
            style="width: 360px"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('zbForm')">取 消</el-button>
        <el-button type="primary" @click="addZbCg('zbForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
var nowId = '';
import { parseTime } from "@/utils";
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
import { mapGetters } from "vuex";
import tree from "vue-giant-tree";
export default {
  name: "ComplexTable",
  components: {
    tree,
  },
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
      zbIsShow:false,
      zbCgIsShow:false,
      //发生地点
      address: [],
      //ip地址
      keywords: "",
      //发生地点
      depment: [],
      dtObj: [],
      addForm: {
        name:''
      },
      zbForm: {
        id:'',
        name:'',
        type:'办公室',
        number:'',
        onchange:'',
        code:''
      },
      //添加时的表单验证规则
      addRules: {
        name: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
        ]
      },
      zbRules: {
        name: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输设置志愿服务编号", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入分值", trigger: "blur" },
        ],
        onchange: [
          { required: true, message: "请选择是否推送", trigger: "blur" },
        ],
      },
      setting: {
        data: {
          simpleData: {
            enable: true,
            pIdKey: "pid",
          },
        },
        view: {
          showIcon: true,
          showLine: true,
        },
        callback: {
          onRightClick: function (event, treeId, treeNode) {
            //判断是否为点击事件;如果是节点点击事件，给全局变量ztreeNode赋值
           // alert(1);
            if (treeNode) {
              nowId = treeNode.id;
              // console.log(JSON.stringify(treeNode))
              //  alert(treeNode.isdir)
              let dir = treeNode.hasOwnProperty("children")
              onContextmenu(event,treeNode.isdir,dir,treeNode)
            }
          },
        },
      },
      nodes: [],
      zTree: null,
      firstNode: true,
      expandNode: []
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
    // that.getSelect();
  },
  mounted() {
     window.onContextmenu = this.onContextmenu;    // 方法赋值给window
    // let that = this;
    // setInterval(function(){
    //   that.getList();
    // },20000)
  },
  methods: {
    onContextmenu(event,isdir,dir,node) {
      let that = this;
      let items = []
      if(isdir==1){
        items = [
          {
            label: "新建目录",
            onClick: () => {
              //that.add()
              that.addIsShow = true;
            },
            icon: "el-icon-folder" 
          },
          {
            label: "新建志愿服务",
            onClick: () => {
              that.zbIsShow = true;
            },
            icon: "el-icon-document" 
          },
          {
            label: "删除目录",
            onClick: () => {
              that.cdelete(dir);
            },
            icon: "el-icon-delete"
          },
        ]
      }else{
         items = [
          {
            label: "查看/编辑志愿服务",
            onClick: () => {
             that.goChange(node)
            },
            icon: "el-icon-view" 
          },
          {
            label: "删除志愿服务",
            onClick: () => {
              that.cdelete(dir)
            },
            icon: "el-icon-delete" 
          },
        ]
      }
      this.$contextmenu({
        items: items,
        event,
        // x: event.clientX,
        // y: event.clientY,
        zIndex: 3,
        minWidth: 130
      });
      return false;
    },
    rightClick() {
      alert(1);
    },
    handleCreated(ztreeObj) {
      this.zTree = ztreeObj;
      // let firstTree = ztreeObj.getNodes()[0]
      // ztreeObj.expandNode(firstTree); // 展开第一行
    },
    onSearch() {
      let that = this;
      let value = that.keywords;
      if (value) {
        this.zTree.refresh();
        let nodeList = this.zTree.getNodesByParamFuzzy("name", value); //模糊搜索
        if (this.expandNode.length > 0) {
          for (let j in this.expandNode) {
            this.closeParentNode(this.expandNode[j]);
          }
        }
        this.expandNode = [];
        let timeout = setTimeout(() => {
          clearTimeout(timeout);
          for (let i in nodeList) {
            this.firstNode = true;
            this.getParentNode(nodeList[i]);
          }
        }, 300);
      }
    },
    closeParentNode(node) {
      //关闭之前展开的节点
      if (node) {
        let parentNode = node.getParentNode();
        if (parentNode) {
          this.zTree.expandNode(parentNode, false, false, false); //关闭节点

          this.closeParentNode(parentNode);
        }
      }
    },
    getParentNode(node) {
      let parentNode = node.getParentNode();

      this.expandNode.push(parentNode); //保存展开节点

      if (this.firstNode) {
        this.firstNode = false;

        node.searchNode = "searchNode";

        this.zTree.expandNode(parentNode, true, false, false); //展开节点

        this.zTree.updateNode(node);
        node.searchNode = "";
      }
    },
    getList() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
      });
      // that.listLoading = true
      let that = this;
      let obj = {

      };
      getAction(
        `${_URL.zhibiao_findAll}?pageNum=${that.nowPage}&pageSize=${that.pageSize}`,
        obj
      ).then((response) => {
        console.log(JSON.stringify(response))
        loading.close();
        if (response.flag) {
          that.nodes = response.data;
        } else {
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
    //添加目录
    addDir(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert(that.addForm.addAddres);
          // alert(that.addForm.addAddres[2]);
          let obj = {
            pid:nowId,
            isdir: '1',
            name: that.addForm.name
          };
          postAction(`${_URL.zhibiao_save}`, obj).then((response) => {
            console.log(JSON.stringify(response));
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加志愿服务
    addZb(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert(that.addForm.addAddres);
          // alert(that.addForm.addAddres[2]);
          let obj = that.zbForm;
          obj.isdir = '0'
          obj.pid = nowId
          
          // obj.code = Date.now()

          console.log(JSON.stringify(obj));
          postAction(`${_URL.zhibiao_save}`, obj).then((response) => {
            console.log(JSON.stringify(response));
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              // that.addForm.gs = "";
              // that.addForm.cj = "";
              that.resetForm("zbForm");
              that.getList();
            } else {
              that.$message.error(response.message);
              //清空数据
              // that.addForm.gs = "";
              // that.addForm.cj = "";
              that.resetForm("zbForm");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //变更
     addZbCg(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = that.zbForm;
          putAction(`${_URL.zhibiao_update}`, obj).then((response) => {
            console.log(JSON.stringify(response));
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              that.resetForm("zbForm");
              that.getList();
            } else {
              that.$message.error(response.message);
              //清空数据
              that.resetForm("zbForm");
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
      this.zbIsShow = false;
      this.zbCgIsShow = false;
    },
    //删除摄像头
    cdelete(dir) {
      if(dir){
        this.$confirm("该目录下存在志愿服务，请勿删除", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
      }else{
        let that = this;
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          let obj = {
            id:nowId,
          };
         // alert(JSON.stringify(obj))
          deleteAction(`${_URL.zhibiao_delete}`, obj).then((response) => {
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
      }
    },
    goChange(obj) {
      console.log(JSON.stringify(obj));
      let that = this;
      that.zbForm = obj
      //自动填入相关信息
      // that.changeForm.id = obj.id;
      that.zbCgIsShow = true;
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
            var jsonDataTree = that.transData(
              response.data.rows,
              "id",
              "cid",
              "children"
            );
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
          if (aVal.cid == "0") {
            r.push(aVal);
          }
        }
      }
      return r;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.index {
  .ico_open {
    background-image: url("~@/assets/image/o.png");
    background-size: cover;
    background-size: 21px 19px;
    background-repeat: no-repeat;
    background-position: center;
    background-position: -2px 1px;
  }
  .ico_close {
    background-image: url("~@/assets/image/c.png");
    background-size: cover;
    background-size: 16px 14px;
    background-repeat: no-repeat;
    background-position: 0px 3px;
  }
  .ico_docu {
    background-image: url("~@/assets/image/f.png");
    background-size: cover;
    background-size: 18px 16px;
    background-repeat: no-repeat;
    background-position: center;
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
  .keywords {
    width: 200px;
  }
  .sBtn {
    margin-left: 10px;
  }
  .tree {
    margin-top: 10px;
    border: solid 1px #eaebf0;
    border-radius: 5px;
    padding: 10px;
  }
}
</style>