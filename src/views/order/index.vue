<template>
  <div class="app-container index bet">
    <div class="filter-container">
      <!-- {{changeForm.addAddres}} -->

      <!-- <el-button
        style="float: right"
        class="filter-item"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="goAdd"
        v-if="!exa"
      >
        新增
      </el-button> -->
      <el-button
        style="float: right"
        class="filter-item"
        type="primary"
        @click="exportExcel"
        v-if="!exa"
      >
        导出
      </el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="display:none"
      id="out-table"
    >
      <el-table-column label="位次">
        <template slot-scope="scope">
          {{ weici.indexOf(scope.row.zbdf) + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="forusername" label="姓名"> </el-table-column>
      <el-table-column prop="zbdf" label="得分"> </el-table-column>
      <el-table-column label="等次">
        <template slot-scope="scope">
          {{ getDc(scope.row.zbdf) }}
        </template>
      </el-table-column>
     
    </el-table>
    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="位次">
        <template slot-scope="scope">
          {{ weici.indexOf(scope.row.zbdf) + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="forusername" label="姓名"> </el-table-column>
      <el-table-column label="村/社区">
          <template slot-scope="scope">
          {{ getPart(scope.row.hyzk)}}
        </template>
      </el-table-column>
      <el-table-column prop="zbdf" label="得分"> </el-table-column>
      <el-table-column label="等次">
        <template slot-scope="scope">
          {{ getDc(scope.row.zbdf) }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="showDt(scope.row.foruserid)"
            >查看得分明细</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
    <div style="height: 66px"></div>
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
        <el-form-item label="姓名" class="addItem" prop="forusername">
          <el-input v-model="addForm.forusername" class="hinput"></el-input>
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
              value="授权查询信息"
            >
            </el-option>
            <el-option
              key="社会公开信息"
              label="社会公开信息"
              value="社会公开信息"
            >
            </el-option>
            <el-option
              key="部门共享信息"
              label="部门共享信息"
              value="部门共享信息"
            >
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
        <el-form-item label="业务日期" prop="ywtime" class="addItem">
          <el-date-picker
            v-model="addForm.ywtime"
            type="date"
            style="width: 300px"
            placeholder="选择日期时间"
            @change="setDqtime"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日期" prop="dqtime" class="addItem">
          <el-date-picker
            v-model="addForm.dqtime"
            type="date"
            style="width: 300px"
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

        <el-form-item label="发生数量" prop="shu" class="addItem">
          <el-input
            v-model="addForm.shu"
            placeholder="请输入发生数量"
          ></el-input>
        </el-form-item>

        <el-form-item label="数量单位" prop="numberunit" class="addItem">
          <el-input
            v-model="addForm.numberunit"
            placeholder="请输入数量单位"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="事件描述" class="zbItem2">
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
        <el-form-item label="经办人" class="addItem">
          <el-input
            v-model="addForm.sbrname"
            placeholder="请输入经办人"
          ></el-input>
        </el-form-item>
        <el-form-item label="经办人电话" class="addItem">
          <el-input
            v-model="addForm.sbrphone"
            placeholder="请输入经办人电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" class="zbItem">
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
            :file-list="addForm.filepath"
          >
            <el-button size="small" type="primary" v-if="canEdit"
              >点击上传</el-button
            >
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
        <div v-if="isSh">
          <div class="line"></div>
          <el-form-item label="审核意见" class="zbItem">
            <el-input
              type="textarea"
              v-model="addForm.shbz"
              placeholder="请输入审核意见"
              :rows="2"
            ></el-input>
          </el-form-item>
        </div>
        <div v-if="addForm.status && addForm.status != 0">
          <div class="line"></div>
          <el-form-item label="审核结果" class="addItem">
            <el-input
              :value="addForm.status == 1 ? '同意' : '拒绝'"
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
        <el-button v-if="canEdit" type="primary" @click="add('addForm', false)"
          >确 定</el-button
        >
        <el-button v-if="isSh" type="primary" @click="add('addForm', 1)"
          >审核通过</el-button
        >
        <el-button v-if="isSh" type="danger" @click="add('addForm', -1)"
          >审核拒绝</el-button
        >
      </span>
      <div class="covers" @click="showSh()" v-if="!canEdit"></div>
    </el-dialog>
    <el-dialog title="得分详情" class="indig" :visible.sync="dtIsShow">
      <!-- <el-table
            :data="getWarn(nowWarn)"
            border
            style="width: 100%">
            <el-table-column
            prop="option"
            label="报警类型">
            </el-table-column>
            <el-table-column
           
            label="人员姓名">
             <template slot-scope="scope">
                    /
                </template>
            </el-table-column>
            <el-table-column
            label="发生地点">
                <template slot-scope="scope">
                     {{ scope.row.fgsName}}
                     {{ scope.row.cjName}}
                </template>
            </el-table-column>
            <el-table-column
            prop="tbtime"
            label="时间">
            </el-table-column>
        </el-table> -->
      <font class="dftit">正面信息:</font>
      <el-table :data="zmList" border fit highlight-current-row>
        <!-- <el-table-column label="状态">
            <template slot-scope="scope">
            {{getStatusText(scope.row.status)}}
            </template>
          </el-table-column> -->
        <el-table-column prop="forusername" label="姓名"> </el-table-column>
        <!-- <el-table-column prop="zjhm" label="身份证号"> </el-table-column> -->
        <el-table-column prop="zbname" label="指标名称"> </el-table-column>
        <el-table-column prop="zbdf" label="得分"> </el-table-column>
        <el-table-column prop="tbtime" label="采集时间"> </el-table-column>
      </el-table>
      <br />
      <font class="dftit">负面信息:</font>
      <el-table :data="fmList" border fit highlight-current-row>
        <!-- <el-table-column label="状态">
            <template slot-scope="scope">
            {{getStatusText(scope.row.status)}}
            </template>
          </el-table-column> -->
        <el-table-column prop="forusername" label="姓名"> </el-table-column>
        <!-- <el-table-column prop="zjhm" label="身份证号"> </el-table-column> -->
        <el-table-column prop="zbname" label="指标名称"> </el-table-column>
        <el-table-column prop="zbdf" label="得分"> </el-table-column>
        <el-table-column prop="tbtime" label="采集时间"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dtIsShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
import { mapGetters } from "vuex";
import { userInfo } from 'os';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
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
      allpart:[],
      weici: [],
      exa: false,
      upLoadUrl: "", //上传路径
      nodes: [],
      value: null,
      bjtypes: [
        {
          value: "",
          label: "全部指标",
        },
        {
          value: "y",
          label: "区指标",
        },
        {
          value: "n",
          label: "院指标",
        },
      ],
      rytypes: [
        {
          value: "",
          label: "全部人员",
        },
        {
          value: "聘用人员",
          label: "聘用人员",
        },
        {
          value: "正式干警",
          label: "正式干警",
        },
      ],
      depts: [],
      listLoading: false,
      tableData: [],
      total: 0,
      pageSizes: [200],
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
      query: {
        istui: "", //人员姓名
        dept: "", //部门
        hyzk:"",//人员类型
      },
      addForm: {
        id: "",
        forusername: "", //正面人姓名
        foruserid: "", //正面人ID
        djxx: "授权查询信息", //社会公开信息
        zjlx: "居民身份证", //证件类型
        zjhm: "", //证件号码
        zbid: null, //指标ID
        zbcode: "", //指标编码
        zbname: "", //指标名称
        zbdf: "", //指标得分
        tbtime: "", //填表日期，自动
        ywtime: "", //业务日期，选择
        dqtime: "", //到期日期，选择
        dfremark: "", //得分说明
        shu: "", //发生数量
        numberunit: "", //数量单位
        remark: "", //事件描述
        jlcs: "", //奖励措施
        jlyj: "", //奖励依据
        sbrname: "", //经办人名称
        sbrphone: "", //经办人电话
        filepath: [], //附件地址
        bz: "", //备注
        //审核部门
        shbmname: "",
        //以下是审核信息
        shrid: "", //审核人ID
        shrname: "", //审核人名称
        shbz: "", //审核备注
        status: "", //状态

        sbrid: localStorage.getItem("uid"), //上报人ID
      },
      dtIsShow: false,
      listLoading: false,
      zmList: [],
      fmList: [],
      uploadType: "",
      canEdit: "",
      isSh: "",
      list: "", //人员列表
      columns: [
        { title: "姓名", data: "name" },
        { title: "部门", data: "ssbm" },
        { title: "身份证号", data: "idCode" },
      ],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.zhibiaoListst,
          isDisabled: node.isdir == "1" ? true : false,
        };
      },
      pickTitle: "正面信息",
      //添加时的表单验证规则
      addRules: {
        forusername: [
          { required: true, message: "请选择人员", trigger: "blur" },
        ],
        djxx: [{ required: true, message: "请选择信息等级", trigger: "blur" }],
        zjhm: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        zbname: [{ required: true, message: "请选择指标", trigger: "blur" }],
        zbdf: [{ required: true, message: "请输入指标得分", trigger: "blur" }],
        ywtime: [
          { required: true, message: "请选择业务日期", trigger: "blur" },
        ],
        dqtime: [
          { required: true, message: "请选择到期日期", trigger: "blur" },
        ],
        dfremark: [
          { required: true, message: "请输入得分说明", trigger: "blur" },
        ],
        shu: [{ required: true, message: "请输入发生数量", trigger: "blur" }],
        numberunit: [
          { required: true, message: "请输入数量单位", trigger: "blur" },
        ],
        jlyj: [{ required: true, message: "请输入奖励依据", trigger: "blur" }],
        sbrname: [{ required: true, message: "请输入经办人", trigger: "blur" }],
        sbrphone: [
          { required: true, message: "请输入经办人电话", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入事件描述", trigger: "blur" },
        ],
        jlcs: [{ required: true, message: "请输入奖励措施", trigger: "blur" }],
      },
      allDc:[]
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar","userInfo"]),
  },
  created() {
    let that = this;
    //获取数据
    //
    //获取部门
    that.getBmList();
    //获取等次排序
    that.getAllDc();
    // that.getPerson();
    // that.upLoadUrl =  _URL.uploadFile_file
  },
  mounted() {
    let that = this;
    let s = that.$route.path;
    let p = s.substring(s.length - 3, s.length);
    if (p == "exa") {
      that.exa = true;
    }
    that.getOrder()
  },
  methods: {
    getPart(val){
      let that = this;
      if(val.length>15){
        val=JSON.parse(val);
        let id = String(val.pop());
        let data = JSON.parse(JSON.stringify(that.allpart))
        var queryData = data.filter(function (_data) {
            return _data.id == id
        });
        return queryData[0].departName;
      }else{
        return '';
      }
    },
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
    //  exportExcel () {
    //    let that=this
    //     //  /* out-table关联导出的dom节点  */
    //     //  var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
    //     //  /* get binary string as output */
    //     //  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    //     //  try {
    //     //      FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), that.query.date+'考勤统计.xlsx')
    //     //  } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    //     //  return wbout


    //     /* generate workbook object from table */
    //       // 判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去，
    //       var id = "#out-table"
    //       var fix = document.querySelector('.el-table__fixed');
    //       var wb;
    //       if (fix) {
    //         wb = XLSX.utils.table_to_book(document.querySelector(id).removeChild(fix));
    //         document.querySelector(id).appendChild(fix);
    //       } else {
    //         wb = XLSX.utils.table_to_book(document.querySelector(id));
    //       }
    //       /* get binary string as output */
    //       var wbout = XLSX.write(wb, {
    //         bookType: 'xlsx',
    //         bookSST: true,
    //         type: 'array'
    //       });
    //       try {
    //         FileSaver.saveAs(
    //           new Blob([wbout], {
    //             type: 'application/octet-stream'
    //           }),
    //           that.query.date+'考勤统计.xlsx'
    //         );
    //       } catch (e) {
    //         if (typeof console !== 'undefined') console.log(e, wbout);
    //       }
    //       return wbout;
    //  },
     exportExcel () {
         /* out-table关联导出的dom节点  */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '排行榜.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
    getAllDc() {
      let that = this;
      let obj = {};
      getAction(
        `${_URL.pf_findAll}?pageNum=1&pageSize=999`,
        obj
      ).then((response) => {
        console.log(JSON.stringify(response));
        if (response.flag) {
          that.allDc = response.data.rows;
        } else {
          that.allDc = [];
          that.$message.error(response.message);
        }
      });
    },
    getDc(num) {
        let that = this;
        let dcText = ''
        for(let i=0;i<that.allDc.length;i++){
            if(Number(that.allDc[i]['bz']) <=Number(num) && Number(num)<=Number(that.allDc[i]['number'])){
                dcText = that.allDc[i]['name'] 
            }
        }
        return dcText;
    },
    // function isRangeIn(str,maxnum,minnum ) {
    //         debugger;
    //     var num = parseFloat(str);

    //     if(num <=maxnum && num>=minnum){

    //         return true;

    //     }

    //     return false;

    // },
    getExcel() {
      window.open("排行榜.xls");
    },
    showDt(id) {
      let that = this;
      that.dtIsShow = true;
      let obj = {
        foruserid: id,
        status: "",
      };
      let query = Object.assign({}, obj, that.query); //合并查询条件
      getAction(`${_URL.zm_findMingXi}`, query).then((response) => {
        if (response.flag) {
          that.zmList = response.data;
        }
      });
    },
    showSh() {
      // alert('审核')
    },
    onUpload(response, file, fileList) {
      let that = this;
      that.addForm.filepath = [];
      if (response.flag) {
        that.addForm.filepath.push({
          name: file.name,
          url: response.data,
        });
      }
    },
    getFiles(file) {
      window.open(_URL.DURL + file.url);
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
    beforeRemove(file, fileList) {
      let that = this;
      let n = "";
      for (var i = 0; i < that.addForm.filepath.length; i++) {
        if (that.addForm.filepath[i]["name"] == file.name) {
          n = i;
        }
      }
      // alert(n);
      that.addForm.filepath = that.addForm.filepath.splice(1, n);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${ file.name }？`);
    // },
    setDqtime(val) {
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
      let s = val.split("-");
      let year = Number(s[0]) + 1;
      let fuday = year + "-" + s[1] + "-" + s[2];
      that.addForm.dqtime = fuday;
    },
    // 选择了人员
    getVals(Array) {
      let that = this;
      that.addForm.forusername = Array[0].name;
      that.addForm.foruserid = Array[0].id;
      that.addForm.zjhm = Array[0].idCode;
    },
    getPerson() {
      //部门
      let dept = localStorage.getItem("dept").split(",");
      let isDw = dept.indexOf("机关党委");
      let isBgs = dept.indexOf("办公室");
      let isZzb = dept.indexOf("政治部");

      //党支部
      let type = localStorage.getItem("type");
      //   alert(dept);
      let that = this;
      that.listLoading = true;
      let obj = {
        pageNum: 1,
        pageSize: 999,
      };
      if (isDw != -1 && isBgs == -1 && isZzb == -1) {
        obj.type = type;
      }
      getAction(`${_URL.user_findAll}`, obj).then((response) => {
        that.listLoading = false;
        console.log(JSON.stringify(response));
        if (response.flag) {
          that.list = response.data.rows;
          // that.total = response.data.total;
        } else {
          that.list = [];
          that.$message.error(response.message);
        }
      });
    },
    getZb(node, instanceId) {
      let that = this;
      console.log(JSON.stringify(node));
      that.addForm.zbid = node.id; //指标ID
      that.addForm.zbcode = node.code; //指标编码
      that.addForm.zbname = node.name; //指标名称
      that.addForm.zbdf = node.number; //指标得分
      //自动填入得分说明
      that.addForm.dfremark = node.name; //指标名称
      //根据指标自动划分审核部门
      that.addForm.shbmname = node.type;
    },
    //获取部门选项
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
    getStatusText(val) {
      if (val == 0) {
        return "待审核";
      }
      if (val == 1) {
        return "审核通过";
      }
      if (val == -1) {
        return "审核未通过";
      }
    },
    getList() {
      // that.listLoading = true
      let that = this;
      let obj = {
        // pageNum:that.nowPage,
        // pageSize:that.pageSize,
        // sbrid:localStorage.getItem('uid')//上报人ID
      };
      let query = Object.assign({}, obj, that.query); //合并查询条件
      if (query.dept) {
        query.dept = query.dept[0];
      }
      //所属地点,若有则加入查询条件
      getAction(`${_URL.zfm_findOrder}`, query).then((response) => {
        //console.log('啊啊啊啊啊'+JSON.stringify(response));
        if (response.flag) {
              //前端数据筛选
              if(!that.query.hyzk||that.query.hyzk==""){
                //提报员只能看自己社区的人员
                let arr = []
                console.info(that.userInfo.role,'userInfo.role',that.userInfo.jdmc)
                if(that.userInfo.role == 1){
                  arr = response.data.filter(item => {
                    return that.getPart(item.hyzk) == that.userInfo.ssbm
                  })
                //审核员排行榜只能看到自己街道的人
                }else if(that.userInfo.role == 2){
                  arr = response.data.filter(item => {
                    console.info('item',item.jdmc)
                    if(item.jdmc){
                      console.info(item)
                    }
                    return item.jdmc == that.userInfo.jdmc
                  })
                }else{
                    
                  arr = response.data;
                }
                that.tableData = arr;
                that.total = arr.length;
                let weici = [];
                for (var i = 0; i < arr.length; i++) {
                  if (weici.indexOf(arr[i]["zbdf"]) == -1) {
                    weici.push(arr[i]["zbdf"]);
                  }
                }
                that.weici = weici;
              }else{
                    let nowData = []
                    for (var i = 0; i < response.data.length; i++) {
                      if (response.data[i]["hyzk"]==that.query.hyzk) {
                        nowData.push(response.data[i])
                      }
                    }
                    that.tableData = nowData;
                    that.total = nowData.length;
                    let weici = [];
                    for (var i = 0; i < response.data.length; i++) {
                      if (weici.indexOf(response.data[i]["zbdf"]) == -1) {
                        weici.push(response.data[i]["zbdf"]);
                      }
                    }
                    that.weici = weici;
              }
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
        istui: "", //人员姓名
        dept: "", //部门
        hyzk:"",//人员类型
      };
      that.getList();
    },
    //新增摄像头
    add(formName, status) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.uploadType == "add") {
            var date = new Date();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            var currDate =
              date.getFullYear() +
              "-" +
              (mon < 10 ? "0" + mon : mon) +
              "-" +
              (day < 10 ? "0" + day : day);
            that.addForm.tbtime = currDate;
          }
          if (that.uploadType == "change" && !that.isSh) {
            that.addForm.status = 0;
            that.addForm.shbz = "";
          }
          if (that.isSh) {
            that.addForm.shrid = localStorage.getItem("uid");
            that.addForm.shrname = localStorage.getItem("uname");
            that.addForm.status = status;
          }
          that.addForm.filepath = JSON.stringify(that.addForm.filepath);
          if (that.uploadType == "add") {
            postAction(`${_URL.zm_save}`, that.addForm).then((response) => {
              console.log(JSON.stringify(response));
              if (response.flag) {
                that.$message.success(response.message);
                //清空数据
                that.resetForm("addForm");
                that.clear();
                //   that.getList();
              } else {
                that.$message.error(response.message);
                //清空数据
                that.resetForm("addForm");
              }
            });
          } else if (that.uploadType == "change") {
            putAction(`${_URL.zm_update}`, that.addForm).then((response) => {
              console.log(JSON.stringify(response));
              if (response.flag) {
                that.$message.success(response.message);
                //清空数据
                that.resetForm("addForm");
                that.clear();
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
      (this.addForm = {
        id: "",
        forusername: "", //正面人姓名
        foruserid: "", //正面人ID
        djxx: "", //社会公开信息
        zjlx: "居民身份证", //证件类型
        zjhm: "", //证件号码
        zbid: null, //指标ID
        zbcode: "", //指标编码
        zbname: "", //指标名称
        zbdf: "", //指标得分
        tbtime: "", //填表日期，自动
        ywtime: "", //业务日期，选择
        dqtime: "", //到期日期，选择
        dfremark: "", //得分说明
        shu: "", //发生数量
        numberunit: "", //数量单位
        remark: "", //事件描述
        jlcs: "", //奖励措施
        jlyj: "", //奖励依据
        sbrname: "", //经办人名称
        sbrphone: "", //经办人电话
        filepath: [], //附件地址
        bz: "", //备注
        //审核部门
        shbmname: "",
        //以下是审核信息
        shrid: "", //审核人ID
        shrname: "", //审核人名称
        shbz: "", //审核备注
        status: "", //状态
        sbrid: localStorage.getItem("uid"), //上报人ID
      }),
        (this.addIsShow = false);
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goChange(obj, canEdit, isSh) {
      //切断变量之间的绑定关系
      let s = { ...obj };
      // let s = { ...this.xxx}
      let that = this;
      if (s.filepath) {
        s.filepath = JSON.parse(s.filepath);
      }
      //自动填入相关信息
      that.addForm = s;
      that.addIsShow = true;
      //提交类型
      that.uploadType = "change";
      //是否允许编辑
      that.canEdit = canEdit;
      //是否为审核
      that.isSh = isSh;
    },
    goAdd(obj) {
      let that = this;
      that.addIsShow = true;
      //自动填入相关信息
      that.uploadType = "add";
      (that.canEdit = true), (that.isSh = false);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.bet {
  .line {
    border-top: solid 1px rgb(230, 230, 230);
  }
  .input__inner {
    display: none;
  }
  .zbItem {
    margin: 10px;
  }
  .zbItem2 {
    width: 300px;
    display: inline-block;
    margin: 10px;
  }
  .addItem {
    width: 300px;
    display: inline-block;
    margin: 10px;
    .el-upload-list {
      float: right;
      margin-top: -8px;
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
  .tableSelect {
    position: absolute;
    width: 300px;
    top: 37px;
  }
  .hinput input {
    border: none;
  }
  .fjItem {
    display: inline-block;
    margin: 10px;
  }
  .covers {
    position: absolute;
    width: 950px;
    height: 920px;
    background: rgba(0, 0, 0, 0);
    z-index: 9999;
    top: 10px;
  }
}
.sp-table {
  th,
  td {
    width: 33% !important;
  }
}
</style>