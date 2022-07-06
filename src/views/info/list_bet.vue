<template>
  <div class="app-container index bet">
    <div class="filter-container">
      <!-- {{changeForm.addAddres}} -->
      <el-input
        v-model="query.forusername"
        clearable
        placeholder="姓名"
        style="width: 200px"
        class="filter-item"
      />
      <el-input
        v-model="query.zjhm"
        clearable
        placeholder="证件号码"
        style="width: 200px"
        class="filter-item"
      />
      <el-select v-model="query.status" placeholder="审核状态" clearable style="width:200px;" class="filter-item">
        <el-option v-for="item in bjtypes" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> 
      <el-date-picker
          v-model="query.nowDate"
          type="daterange"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          class="datePicker"
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
      </el-date-picker>
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
        style="width: 200px;margin-left:20px"
        @change="getList"
        clearable
      >
      </el-cascader>
      <br> 
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
     
      <br>
      <!-- {{srow}} -->
       <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="goAdd"
        v-if="!exa"
        size="mini"
         style="float: left;margin-right:-5px !important"
      >
        新增
      </el-button>
     <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="goSh"
        v-if="exa"
        size="mini"
        style="float: left;margin-right:5px !important"
      >
        审核
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="getExcel"
        size="mini"
        style="float: left;margin-right:5px !important"
      >
        导出
      </el-button>
       <el-button
       
        class="filter-item"
        type="primary"
        icon="el-icon-upload2"
        @click="uploadss"
        v-if="!exa"
        size="mini"
         style="float: left;margin-right:0px !important;margin-left:0;"
      >
        导入
      </el-button>
       <el-button
        
        class="filter-item"
        type="primary"
        icon="el-icon-document"
         @click="getExcelMb"
        v-if="!exa"
        size="mini"
         style="float: left;margin-left:5px !important"
      >
        下载导入模板
      </el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      ref="mainList"
      @select="getRow"
      @select-all	="getRow"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="exa"
        align="center"
      >
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
         {{getStatusText(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column prop="forusername" label="姓名"> </el-table-column>
      <el-table-column prop="zjhm" label="身份证号"> </el-table-column>
      <el-table-column prop="zbname" label="指标名称"> </el-table-column>
      <el-table-column prop="zbdf" label="得分"> </el-table-column>
      <el-table-column prop="tbtime" label="采集时间"> </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope" >
          <el-button type="primary" size="mini" @click="goChange(scope.row,false,false)"
            >查看</el-button
          >
          <el-button v-if="scope.row.status==0||scope.row.status==-1" v-show="!exa" type="primary" size="mini" @click="goChange(scope.row,true,false)"
            >编辑</el-button
          >
          <el-button v-if="scope.row.status==0" v-show="exa" type="primary" size="mini" @click="goChange(scope.row,false,true)"
            >审核</el-button
          >
          <el-button v-if="scope.row.status==0"  v-show="!exa" @click="cdelete(scope.row.id)" type="danger" size="mini"
            >删除</el-button
          >
          <el-button v-if="scope.row.status==1"  v-show="!exa" @click="doPush(scope.row.id)" type="primary" size="mini"
            >推送至区平台</el-button
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
        <el-form-item label="姓名" class="addItem"  prop="forusername" >
           <el-input
            v-model="addForm.forusername"
            class="hinput"
          ></el-input>
          <v-selectpage 
            v-model="addForm.foruserid"
            :data="list"
            :tb-columns="columns"
            class="tableSelect" 
            title="请选择人员"
            placeholder="请选择人员"
            :width="500"
            @values="getVals"
          />
        </el-form-item>
        <el-form-item label="信息等级" prop="djxx" class="addItem">
          <el-select
            v-model="addForm.djxx"
            placeholder="请选择信息等级"
            style="width: 300px"
          >
            <el-option
              key="授权查询信息"
              label="授权查询信息"
              value="授权查询信息">
            </el-option>
            <el-option
              key="社会公开信息"
              label="社会公开信息"
              value="社会公开信息">
            </el-option>
            <el-option
              key="部门共享信息"
              label="部门共享信息"
              value="部门共享信息">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="zjhm" class="addItem">
          <el-input
            v-model="addForm.zjhm"
            placeholder="请输入身份证号"
          ></el-input>     
        </el-form-item>
        <el-form-item label="正面指标" prop="zbname" class="zbItem">
            <treeselect
              :value="addForm.zbid"
              :multiple="false"
              :options="nodes"
              :normalizer="normalizer"
              :flat="true"
              placeholder="请选择指标"
              @select="getZb"
            />
        </el-form-item>
        <el-form-item label="指标得分" prop="zbdf" class="addItem">
          <el-input
            v-model="addForm.zbdf"
            placeholder="请输入指标得分"
             disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="业务日期"  prop="ywtime" class="addItem">
          <el-date-picker
            v-model="addForm.ywtime"
            type="date"
            style="width:300px"
            placeholder="选择日期时间"
            @change = "setDqtime"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日期" prop="dqtime" class="addItem">
          <el-date-picker
            v-model="addForm.dqtime"
            type="date"
            style="width:300px"
            placeholder="选择日期时间"
            disabled
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="得分说明" prop="dfremark" class="zbItem">
          <el-input
            type="textarea"
            v-model="addForm.dfremark"
            placeholder="请输入得分说明"
            :rows="2"
             disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="发生数量" class="addItem">
          <el-input
            v-model="addForm.shu"
            placeholder="请输入发生数量"
          ></el-input>
        </el-form-item>

        <el-form-item label="数量单位" class="addItem">
          <el-input
            v-model="addForm.numberunit"
            placeholder="请输入数量单位"
          ></el-input>
        </el-form-item>
        <br>
         <el-form-item label="事件描述"  class="zbItem2">
          <el-input
            type="textarea"
            v-model="addForm.remark"
            placeholder="请输入事件描述"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="奖励措施" class="zbItem2">
          <el-input
            type="textarea"
            v-model="addForm.jlcs"
            placeholder="请输入奖励措施"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="奖励依据" class="zbItem2">
          <el-input
            type="textarea"
            v-model="addForm.jlyj"
            placeholder="请输入奖励依据"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="经办人"  class="addItem">
          <el-input
            v-model="addForm.sbrname"
            placeholder="请输入经办人"
          ></el-input>
        </el-form-item>
        <el-form-item label="经办人电话"  class="addItem">
          <el-input
            v-model="addForm.sbrphone"
            placeholder="请输入经办人电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注"  class="zbItem">
          <el-input
            type="textarea"
            v-model="addForm.bz"
            placeholder="请输入备注"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件" class="fjItem">
          <el-upload
            class="upload-demo"
            :action="upLoadUrl"
            :before-remove="beforeRemove"
            :on-success="onUpload"
            :on-preview="getFiles"
            multiple
            :limit="3"
            :disabled="!canEdit"
            :on-exceed="handleExceed"
            :file-list="addForm.filepath">
            <el-button size="small" type="primary" v-if="canEdit">点击上传</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
        <div v-if="isSh">
              <div class="line"></div>
              <el-form-item label="审核意见"  class="zbItem">
                <el-input
                  type="textarea"
                  v-model="addForm.shbz"
                  placeholder="请输入审核意见"
                  :rows="2"
                ></el-input>
              </el-form-item>
        </div>
        <div v-if="addForm.status&&addForm.status!=0">
              <div class="line"></div>
              <el-form-item label="审核结果" class="addItem">
                <el-input
                  :value="addForm.status==1?'同意':'拒绝'"
                   readonly="readonly"
                ></el-input>
              </el-form-item>
              <el-form-item label="审核意见" class="zbItem">
                <el-input
                  type="textarea"
                  v-model="addForm.shbz"
                  :rows="2"
                   readonly="readonly"
                ></el-input>
              </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取 消</el-button>
        <el-button v-if="canEdit" type="primary" @click="add('addForm',false)">确 定</el-button>
        <el-button v-if="isSh" type="primary" @click="add('addForm',1)">审核通过</el-button>
        <el-button v-if="isSh" type="danger" @click="add('addForm',-1)">审核拒绝</el-button>
      </span>
      <div class="covers" @click="showSh()" v-if="!canEdit"></div>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog 
      title="审核" 
      :visible.sync="addIsShow2" 
      top="3vh"
      :close-on-click-modal="false" 
      width="700px"
      :destroy-on-close="true"
      @close="resetForm('addForm')"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        class="demo-ruleForm"
      >
        <el-form-item label="审核意见" class="zbItem">
            <el-input
              type="textarea"
              v-model="addForm.shbz"
              :rows="2"
            ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取 消</el-button>
      
        <el-button type="primary" @click="pishen('addIsShow2',1)">审核通过</el-button>
        <el-button  type="danger" @click="pishen('addIsShow2',-1)">审核拒绝</el-button>
      </span>
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
      departmentName:'',
       depts: [],
      srow:[],
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
      addIsShow2: false,
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
          status:'',//状态
          nowDate:[],
      },
      addForm: {
        id:'',
        forusername:'',//正面人姓名
        foruserid:'',//正面人ID
        djxx:'授权查询信息',//社会公开信息
        zjlx:'居民身份证',//证件类型
        zjhm:'',//证件号码
        zbid:null,//指标ID
        zbcode:'',//指标编码
        zbname:'',//指标名称
        zbdf:'',//指标得分
        tbtime:'',//填表日期，自动
        ywtime:'',//业务日期，选择
        dqtime:'',//到期日期，选择
        dfremark:'',//得分说明
        shu:'',//发生数量
        numberunit:'',//数量单位
        remark:'',//事件描述
        jlcs:'',//奖励措施
        jlyj:'',//奖励依据
        sbrname:'',//经办人名称
        sbrphone:'',//经办人电话
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
      pickTitle:'正面信息',
      //添加时的表单验证规则
      addRules: {
        forusername: [
          { required: true, message: "请选择人员", trigger: "blur" },
        ],
        djxx: [
          { required: true, message: "请选择信息等级", trigger: "blur" },
        ],
        zjhm: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        zbname: [
          { required: true, message: "请选择指标", trigger: "blur" },
        ],
        zbdf: [
          { required: true, message: "请输入指标得分", trigger: "blur" },
        ],
        ywtime: [
          { required: true, message: "请选择业务日期", trigger: "blur" },
        ],
        dqtime: [
          { required: true, message: "请选择到期日期", trigger: "blur" },
        ],
        dfremark: [
          { required: true, message: "请输入得分说明", trigger: "blur" },
        ],
        shu: [
          { required: true, message: "请输入发生数量", trigger: "blur" },
        ],
        numberunit: [
          { required: true, message: "请输入数量单位", trigger: "blur" },
        ],
        jlyj: [
          { required: true, message: "请输入奖励依据", trigger: "blur" },
        ],
        sbrname: [
          { required: true, message: "请输入经办人", trigger: "blur" },
        ],
        sbrphone: [
          { required: true, message: "请输入经办人电话", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入事件描述", trigger: "blur" },
        ],
        jlcs: [
          { required: true, message: "请输入奖励措施", trigger: "blur" },
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
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

    that.getBmList();
  },
  mounted() {
    let that = this;
    let s = that.$route.path;
    let p = s.substring(s.length-3,s.length);
    if(p=='exa'){
      that.exa = true;
    }
    //设置日期
    var date = new Date();       
              var mon = date.getMonth() + 1;       
              var day = date.getDate();
              var currDate = date.getFullYear() + "-"+ (mon<10?"0"+mon:mon) + "-"+(day<10?"0"+day:day);
              var currDate2 = date.getFullYear()+1 + "-"+ (mon<10?"0"+mon:mon) + "-"+(day<10?"0"+day:day);
      that.addForm.ywtime = currDate;
      that.addForm.dqtime = currDate2;
  },
  methods: {
    uploadss(){
      let input = document.createElement('input');
      input.value = '选择文件';
      input.type = 'file';
      input.onchange = event => {
          let file = event.target.files[0];
          let file_reader = new FileReader();
          file_reader.onload = () => {
              let fc = file_reader.result;
              console.log(fc); // 打印文件文本内容
          };
          file_reader.readAsText(file, 'UTF-8');
      };
      input.click();
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
    getExcel(){
      let that = this;
      let url = _URL.excelURL+"toExcel/zm"
      let querys = ''
      if(that.query.nowDate.length>0){
        querys="?startTime="+that.query.nowDate[0]+"&endTime="+that.query.nowDate[1]
        // query.startTime= that.query.nowDate[0]
        // query.endTime= that.query.nowDate[1]
      };
      window.location.href=url+querys
    },
    getExcelMb(){
        window.location.href="http://222.132.158.254:7000/govent/template/正面信息模板.xls"
    },
    upMb(){

    },
    pishen(a,val){
        let that = this;
        let obj = {
          ids:that.srow.toString(),
          shrid:localStorage.getItem('uid'),
          shrname:localStorage.getItem('shrname'),
          shbz:that.addForm.shbz,
          status:val
        }
        postAction(`${_URL.zm_piliang}`,obj).then((response) => {
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
    },
    getRow(selection, row){
        let that = this;
        let spo = [];
        for(var i=0;i<selection.length;i++){
          spo.push(selection[i]['id'])
        }
        that.srow = spo;
    },
    goSh(){
      if(this.srow.length>0){
        this.addIsShow2 = true;
      }else{
         this.$message('请勾选要审核的条目');
      }
    },
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
        // let that = this;
        // //日期对象转2021/66/88
        // let ywtime = val.toLocaleDateString();
        // //处理
        // let dqtime =val;
        // dqtime = dqtime.setDate(dqtime.getDate()+365)
        // //时间戳转回日期
        // dqtime = new Date(dqtime).toLocaleDateString();
        // that.addForm.ywtime = ywtime
        // that.addForm.dqtime = dqtime
        let that = this;
        let s = val.split('-')
        let year = Number(s[0])+1
        let fuday = year+'-'+s[1]+'-'+s[2]
        that.addForm.dqtime= fuday;
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
            // for(var i = 0;i<response.data.length;i++){
            //   if(response.data[i]['type']){
            //       response.data[i]['name'] = response.data[i]['name']+"【"+response.data[i]['type']+"】"
            //   }
            // }
           that.nodes = response.data
        }
      });
    },
    // transData(a, idStr, pidStr, chindrenStr){  
    //     var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;  
    //     for(; i < len; i++){  
    //         hash[a[i][id]] = a[i];  
    //     }  
    //     for(; j < len; j++){  
    //         var aVal = a[j], hashVP = hash[aVal[pid]];  
    //         if(hashVP){  
    //             !hashVP[children] && (hashVP[children] = []);  
    //             hashVP[children].push(aVal);  
    //         }else{  
    //             r.push(aVal);  
    //         }  
    //     }  
    //     return r;  
    //  },
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
    getStatusText(val){
        if(val==0){
          return "待审核"
        }
        if(val==1){
          return "审核通过"
        }
        if(val==2){
          return "审核通过,已推送至区平台"
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
        pageSize:that.pageSize,
        // sbrid:localStorage.getItem('uid')//上报人ID
      };
      if(that.departmentName){
        obj.dept = that.departmentName[0]
      }else{
        obj.dept = ''
      }
      let query = Object.assign({},obj,that.query); //合并查询条件
      //加入时间段
      if(that.query.nowDate.length>0){
        query.startTime= that.query.nowDate[0]
        query.endTime= that.query.nowDate[1]
      };
      //审核过滤
      let s = that.$route.path;
      let p = s.substring(s.length-3,s.length);
      if(p=="exa"){
        query.status = '0'
      }
      delete query.nowDate
      console.log(JSON.stringify(query))
      //所属地点,若有则加入查询条件
      getAction(`${_URL.zm_findAll}`,query).then((response) => {
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
          status:'',//状态
          nowDate:[]
      };
      that.getList();
    },
    //新增摄像头
    add(formName,status) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(that.uploadType=='add'){
              var date = new Date();       
              var mon = date.getMonth() + 1;       
              var day = date.getDate();
              var currDate = date.getFullYear() + "-"+ (mon<10?"0"+mon:mon) + "-"+(day<10?"0"+day:day);
              that.addForm.tbtime = currDate;
          }
          if(that.uploadType=='change'&&!that.isSh){
            that.addForm.status = 0;
            that.addForm.shbz = '';
          }
          if(that.isSh){
            that.addForm.shrid =  localStorage.getItem('uid');
            that.addForm.shrname = localStorage.getItem('uname');
            that.addForm.status = status;
          }
          that.addForm.filepath = JSON.stringify(that.addForm.filepath)
          if(that.uploadType=='add'){
              postAction(`${_URL.zm_save}`, that.addForm).then((response) => {
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
              putAction(`${_URL.zm_update}`, that.addForm).then((response) => {
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
        djxx:'授权查询信息',//社会公开信息
        zjlx:'居民身份证',//证件类型
        zjhm:'',//证件号码
        zbid:null,//指标ID
        zbcode:'',//指标编码
        zbname:'',//指标名称
        zbdf:'',//指标得分
        tbtime:'',//填表日期，自动
        ywtime:'',//业务日期，选择
        dqtime:'',//到期日期，选择
        dfremark:'',//得分说明
        shu:'',//发生数量
        numberunit:'',//数量单位
        remark:'',//事件描述
        jlcs:'',//奖励措施
        jlyj:'',//奖励依据
        sbrname:'',//经办人名称
        sbrphone:'',//经办人电话
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
      this.addIsShow2 = false;
      this.addIsShowCg = false;
      //设置日期
      var date = new Date();       
      var mon = date.getMonth() + 1;       
      var day = date.getDate();
      var currDate = date.getFullYear() + "-"+ (mon<10?"0"+mon:mon) + "-"+(day<10?"0"+day:day);
      var currDate2 = date.getFullYear()+1 + "-"+ (mon<10?"0"+mon:mon) + "-"+(day<10?"0"+day:day);
      this.addForm.ywtime = currDate;
      this.addForm.dqtime = currDate2;
      this.srow = [];
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
          deleteAction(`${_URL.zm_delete}`, obj).then((response) => {
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
    //推送至区平台
    doPush(id) {
      let that = this;
      this.$confirm("确定要推送至区平台吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          let obj = {
            id: id,
          };
          // getAction(`${_URL.zm_up}`, obj).then((response) => {
          //   alert(JSON.stringify(response))
          //   if (response.flag) {
          //     that.$message.success(response.message);
          //     //清空数据
          //     that.getList();
          //   } else {
          //     that.$message.error(response.message);
          //     //清空数据
          //   }
          // });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
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
.bet {
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
    height: 920px;
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