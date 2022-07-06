<template>
  <div class="app-container index">
    <!-- {{changeForm.addAddres}} -->
    <div class="filter-container">
      <!-- {{changeForm.addAddres}} -->
       <el-input
        v-model="keywords2"
        clearable
        placeholder="账号"
        style="width: 200px"
        class="filter-item"
      />
      <el-input
        v-model="keywords"
        clearable
        placeholder="姓名"
        style="width: 200px"
        class="filter-item"
      />
      <!-- <el-input
        v-model="address"
        clearable
        placeholder="部门"
        style="width: 200px"
        class="filter-item"
      /> -->
      <!-- {{departmentName}} -->
      <!-- <el-cascader
        v-model="departmentName"
        :options="depts"
        :props="{
          value: 'departName',
          label: 'departName',
          children: 'children',
        }"
        class="filter-item"
        placeholder="选择部门"
        style="width: 200px"
        @change="getList"
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
        @click="addIsShow = true"
      >
        新增人员
      </el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
 
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="ssbm" label="村/社区"> </el-table-column>
      <el-table-column label="性别">
          <template slot-scope="scope">
          {{scope.row.xb==1?'男':'女'}}
         </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column label="角色">
         <template slot-scope="scope">
          {{getRoleTxt(scope.row.role)}}
         </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="290px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goChange(scope.row)"
            >查看/编辑</el-button
          >
          <el-button @click="cgPwd(scope.row.id)" type="primary" size="mini"
            >重置密码</el-button
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
    <!-- 弹出层 -->
    <el-dialog title="修改用户信息" :visible.sync="addIsShowCg" width="690px">
       <el-form
        :model="changeForm"
        :rules="addRules"
        ref="changeForm"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" class="addItem" >
          <el-input
            v-model="changeForm.name"
            placeholder="请输入姓名"
          
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" class="addItem" >
          <el-input
            v-model="changeForm.username"
            placeholder="请输入账号"
          
          ></el-input>
        </el-form-item>
    
        <el-form-item label="手机号" class="addItem" >
            <el-input
              v-model="changeForm.phone"
              placeholder="请输入手机号"
            ></el-input>
        </el-form-item>
         <el-form-item label="身份证号" prop="idCode" class="addItem" >
          <el-input
            v-model="changeForm.idCode"
            placeholder="请输入身份证号"
             @input="checkNum()"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="xb" class="addItem">
          <el-select v-model="changeForm.xb" placeholder="请选择" style="width:300px">
            <el-option :key="1" label="男" :value="1"></el-option>
            <el-option :key="2" label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" class="addItem" v-if="changeForm.csrq">
          <el-input
            v-model="changeForm.csrq"
            placeholder="生日"
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" class="addItem" v-if="changeForm.jg">
          <el-input
            v-model="changeForm.jg"
            placeholder="籍贯"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role" class="addItem" v-show="userInfo.role != 1">
          <el-select v-model="changeForm.role" placeholder="请选择" style="width:300px">
            <el-option key="0" label="超级管理员" value="0"></el-option>
            <el-option key="1" label="提报员" value="1"></el-option>
            <el-option key="2" label="审核员" value="2"></el-option>
            <el-option key="3" label="普通用户" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="hyzk" class="addItem">
            <el-cascader
              v-model="changeForm.hyzk"
              :options="tableDataTest"
              @change="getpart"
              class="filter-item"
              placeholder="请选择所在部门"
              style="width:300px !important"
              :props="{
                value: 'id',
                label: 'departName',
                children: 'children',
                checkStrictly: true 
              }"
            
                ref="elCascader"
              clearable
            >
            </el-cascader>
        </el-form-item>
      </el-form>
      <div style="height:20px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('changeForm')">取 消</el-button>
        <el-button type="primary" @click="change('changeForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

     <el-dialog title="添加用户" :visible.sync="addIsShow" width="690px">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name" class="addItem" >
          <el-input
            v-model="addForm.name"
            placeholder="请输入姓名"
          
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username" class="addItem" >
          <el-input
            v-model="addForm.username"
            placeholder="请输入账号"
          
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" class="addItem" >
          <el-input
            v-model="addForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCode" class="addItem" >
          <el-input
            v-model="addForm.idCode"
            placeholder="请输入身份证号"
             @input="checkNum2()"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="xb" class="addItem">
          <el-select v-model="addForm.xb" placeholder="请选择" style="width:300px">
            <el-option :key="1" label="男" :value="1"></el-option>
            <el-option :key="2" label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" class="addItem" >
            <el-input
              v-model="addForm.phone"
              placeholder="请输入手机号"
            ></el-input>
        </el-form-item>
        <el-form-item label="生日" class="addItem" v-if="addForm.csrq">
          <el-input
            v-model="addForm.csrq"
            placeholder="生日"
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" class="addItem" v-if="addForm.jg">
          <el-input
            v-model="addForm.jg"
            placeholder="籍贯"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role" class="addItem">
          <el-select v-model="addForm.role" placeholder="请选择" style="width:300px">
            <el-option 
              v-for="(item,index) in userList" 
              :key="index" 
              :value="item.value" 
              :label="item.name"
              :disabled="userIdentity == 1 && item.value != 3">
            </el-option>
            <!-- <el-option key="0" label="超级管理员" value="0" :disabled="value != userIdentity"></el-option>
            <el-option key="1" label="提报员" value="1" :disabled="value != userIdentity"></el-option>
            <el-option key="2" label="审核员" value="2" :disabled="value != userIdentity"></el-option>
            <el-option key="3" label="观察员" value="3" :disabled="value != userIdentity"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="hyzk" class="addItem">
          <!-- <el-input
            v-model="addForm.hyzk"
            placeholder="所属单位"
          ></el-input> -->
          <!-- {{addForm.addAddres}} -->
              <el-cascader
                v-model="addForm.hyzk"
                :options="tableDataTest"
                class="filter-item"
                 @change="getpart2"
                placeholder="请选择所在部门"
                style="width:300px !important"
                :props="{
                  value: 'id',
                  label: 'departName',
                  children: 'children',
                  checkStrictly: true 
                }"
                
                 ref="elCascader2"
                clearable
              >
              </el-cascader>
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
import {
  setCookie,getCookie
} from '@/utils/index1'
import { get } from "http";
import { userInfo } from 'os';
export default {
  name: "ComplexTable",
  data() {
    return {
       departmentName:'',
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
        : 60,
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
        name:'',
        username:'',
        idCode:'',
        role:'',
        type:'',
        istui:'',
        csrq:'',
        jg:'',
        isdel:0,
        xb:'',
        phone:'',
        hyzk: [],
        ssbm:'',
        jdmc:''
      },
      changeForm: {
        id:'',
        name:'',
        username:'',
        idCode:'',
        role:'',
        type:'',
        istui:'',
        csrq:'',
        jg:'',
        isdel:0,
        xb:'',
        phone:'',
        hyzk: [],
        ssbm:'',
        jdmc:''
      },
      //添加时的表单验证规则
      addRules: {
        name:[
           { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        username:[
           { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        idCode: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        xb: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        role: [
          { required: true, message: "请选择角色", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        hyzk: [
          { required: true, message: "请选择所属单位", trigger: "blur" },
        ]
      },
      fileList: [],
      //身份证号处理器
      validatorL:'',
      tableDataTest: [
      {
        parentId:'-1',
        id: 1,
        departName: '泰山区',
        children: []
      }],
      userIdentity:'',
      community:'',
      userList: [
        {
          name:'超级管理员',
          value:'0'
        },
        {
          name:'提报员',
          value:'1'
        },
        {
          name:'审核员',
          value:'2'
        },
        {
          name:'观察员',
          value:'3'
        },
        {
          name:'普通人员',
          value:'9'
        },
      ],
      allpart:[],
      deptList:[],
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar","userInfo"]),
  },
  created() {
    let that = this;
    //获取数据
    that.getList();
    //获取下拉框数据
    //that.getSelect();
    that.getBmList();
    //获取单位
    that.getDept()
  },
  mounted() {
    let that = this;
    var IDValidator = require('id-validator');
    var GB2260 = require('id-validator/src/GB2260');
    that.Validator = new IDValidator( GB2260 );
    this.userIdentity = this.userInfo.role
    this.community = this.userInfo.ssbm
  },
  methods: {
    getpart(val){
      const checkedNode =  this.$refs["elCascader"].getCheckedNodes();
      let s = JSON.parse(JSON.stringify(checkedNode[0].pathLabels))
      let street;
      if(val.length > 1){
        street = val[1]
      }
      console.info(street)
      if(street){
        this.deptList.forEach((deptItem) => {
          if(deptItem.id == street){
            this.changeForm.jdmc = deptItem.departName
          }
        })
      }
      this.changeForm.ssbm = s.pop()
    },
     //选择单位处理
    getpart2(val){
      console.info(val,'shs')
      const checkedNode =  this.$refs["elCascader2"].getCheckedNodes();
      console.info('checkedNode',checkedNode)
      let s = JSON.parse(JSON.stringify(checkedNode[0].pathLabels))
      //如果获取到的值大于两个，则包含街道
      let street;
      if(val.length > 1){
        street = val[1]
      }
      console.info(street)
      if(street){
        this.deptList.forEach((deptItem) => {
          if(deptItem.id == street){
            this.addForm.jdmc = deptItem.departName
          }
        })
      }
      this.addForm.ssbm = s.pop()
    },
    //处理数据
    filterData(val){
      let that = this;
      if(val.length>15){
        val=JSON.parse(val);
        let id = String(val.pop());
        let data = JSON.parse(JSON.stringify(that.allpart))
        var queryData = data.filter(function (_data) {
          console.info('uuuuuuuuu',_data)
          return _data.id == id
        });
        return queryData[0].departName;
      }else{
        return '';
      }
    },
    //
    getOrder() {
     // alert(1);
      let that = this;
      let obj = {
        //上级id
        cid:1
      };
      getAction(`${_URL.dept_findPageAll}?pageNum=1&pageSize=99999`,obj).then((response) => {
        if (response.flag) {
          that.allpart = response.data.rows
         // console.info(JSON.stringify(response.data.rows)+'啊啊啊啊啊啊啊');
          that.getList();
        } 
      });
    },
    getDept(){
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
          that.deptList = response.data.rows
          let treeObj = that.transData(response.data.rows,'id', 'parentId', 'children',this.community)
          console.info('treeObj!!!!!!!!!',treeObj);
          that.tableDataTest[0].children = treeObj;
        //  console.
        }
      });
    },
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
        // console.info(JSON.stringify(response));
        loading.close();
        if (response.flag) {
          that.depts = response.data;

          var jsonDataTree = that.transData(
            response.data,
            "id",
            "parentId",
            "children"
          );
          // console.log(JSON.stringify(jsonDataTree));
          that.depts = jsonDataTree[0]["children"];
        }
      });
    },
    checkNum(){
      let that =this;
      let s = that.Validator.getInfo(that.changeForm.idCode);
      if(that.changeForm.idCode.length==18){
        if(!s){
            this.$alert('身份证号格式不正确，请重新输入', '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                that.changeForm.idCode = ''
              }
            });
        }
      }
      if(s){
        that.changeForm.jg=s.addr;
        that.changeForm.csrq=s.birth;
    //    that.xingbie=s.sex==1?'男':'女';
      }else{
        that.hasIdnum = false;
      }
    },

 
    checkNum2(){
      let that =this;
      let s = that.Validator.getInfo(that.addForm.idCode);
      if(that.addForm.idCode.length==18){
        if(!s){
            this.$alert('身份证号格式不正确，请重新输入', '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                that.addForm.idCode = ''
              }
            });
        }
      }
      if(s){
        that.addForm.jg=s.addr;
        that.addForm.csrq=s.birth;
    //    that.xingbie=s.sex==1?'男':'女';
      }else{
        that.hasIdnum = false;
      }
    },
    //人员信息同步
    getPerson(){
        // let that = this;
        // that.listLoading = true
        // let obj = {};
        // getAction(`${_URL.user_copy}`,obj).then((response) => {
        //     that.listLoading = false;
        //     if (response.flag) {
        //         that.$notify({
        //           title: '成功',
        //           message: response.message,
        //           type: 'success'
        //         });
        //          that.getList();
        //     } else {
        //         that.$notify({
        //           title: '警告',
        //           message: '同步失败，请重试',
        //           type: 'warning'
        //         });
        //     }
        //     console.log(JSON.stringify(response))
        // });
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
      let obj = {
        pageNum:that.nowPage,
        pageSize:that.pageSize,
        name:that.keywords,
        username:that.keywords2,
        // dept:that.address,
        // role:"2"
      };
      if(that.departmentName){
        obj.dept = that.departmentName[0]
      }else{
        obj.dept = ''
      }
        getAction(`${_URL.user_findAll}`,obj).then((response) => {
        // console.log(response,'列表')
        that.listLoading = false;
        console.info(response.data.rows,'ssssssssssssss')
        if (response.flag) {
          let arr = []
          response.data.rows.forEach((item) => {
            if(that.userInfo.role == 1){
              if(that.community == item.ssbm){
                arr.push(item)
              }
              console.info(arr,'wwwww')
              that.tableData = arr;
              that.total = arr.length;
            }else{
              that.tableData = response.data.rows;
              that.total = response.data.rows.length;
            }
            
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
      // alert(1);
      let that = this;
       this.$refs[formName].validate((valid) => {
        // alert(2)
         if (valid) {
          // let obj = {
          //   realName:that.addForm.realName,
          //   username:that.addForm.username,
          //   password:that.addForm.password,
          //   roleId:that.addForm.role,
          //   zgsId:that.addForm.addAddres[0],
          //   fgsId:that.addForm.addAddres[1],
          //   cjId:that.addForm.addAddres[2],
          //   img:that.addForm.imgUrl
          // };
            let obj = JSON.parse(JSON.stringify(that.addForm));
          obj.hyzk = JSON.stringify( obj.hyzk)
          postAction(`${_URL.user_save}`, obj).then((response) => {
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
        // } else {
        //   console.log("error submit!!");
        //   return false;
         }
       });
    },
    //变更
    change(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(that.changeForm));
          obj.hyzk = JSON.stringify( obj.hyzk)
          putAction(`${_URL.user_update}`, obj).then((response) => {
            if (response.flag) {
              that.$message.success(response.message);
              //清空数据
              // that.changeForm.gs = "";
              // that.changeForm.cj = "";
              that.resetForm("changeForm");
              that.getList();
            } else {
              that.$message.error(response.message);
              //清空数据
              // that.changeForm.gs = "";
              // that.changeForm.cj = "";
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
      
      },
      this.changeForm={
       
      },
      this.addIsShow = false;
      this.addIsShowCg = false;
    },
    //删除用户
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
          deleteAction(`${_URL.user_delete}`, obj).then((response) => {
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
    cgPwd(id){
      let that = this;
      this.$confirm("确定将用户密码重置为123456？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
              let obj = {
            id: id,
            password:'D68D99AFEEA9EF0540C406E9F0B497E9'
          };
              putAction(`${_URL.user_update}`, obj).then((response) => {
                if (response.flag) {
                  that.$message.success('重置成功');
                  //清空数据
                  // that.changeForm.gs = "";
                  // that.changeForm.cj = "";
                  // that.resetForm("changeForm");
                  // that.getList();
                } else {
                  that.$message.error(response.message);
                  //清空数据
                  // that.changeForm.gs = "";
                  // that.changeForm.cj = "";
               //   that.resetForm("changeForm");
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
      // console.log(JSON.stringify(obj));
      let that = this;
      if(obj.hyzk.length>10){
          obj = JSON.parse(JSON.stringify(obj));
          obj.hyzk = JSON.parse(obj.hyzk);
      }
      //自动填入相关信息
      that.changeForm = obj;
      that.addIsShowCg = true;
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
            // console.log(JSON.stringify(jsonDataTree));
            that.depment = jsonDataTree;
          } else {
            resolve([]);
          }
        }
      );
    },
    transData(a, idStr, pidStr, chindrenStr,data) {
      console.info(data,11111)
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
        // console.info('hashVP:ssss',hashVP)
        // if(data && hashVP.departName){
        //   if(hashVP.departName != data && !hashVP.children){
        //     hashVP.disabled = true;

        //   }
        // }
        let pid1;
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
          // console.info('aVal',aVal)
          if(data && aVal.departName != data){
            // console.info(aVal,'aVal')
            aVal.disabled = true;
            
          }
          if(data && aVal.departName == data){
            pid1 = aVal.parentId
            console.info(pid1,222222)
            
          }
          if(hashVP.id != pid1){
              hashVP.disabled = true
            }
          // 
        } else {
          r.push(aVal);
        }
      }
      return r;
    },
    getRoleTxt(val){
      if(val==0){
        return '超级管理员';
      }
      if(val==1){
        return '提报员';
      }
      if(val==2){
        return '审核员';
      }
      if(val==3){
        return '普通用户';
      }
      if(val==4){
        return '镇领导';
      }
      if(val==99){
        return '普通人员';
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