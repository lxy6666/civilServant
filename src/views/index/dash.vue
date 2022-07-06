<template>
  <div class="indexPage setBox noLine" style="background-image: url('image/bg.jpg');background-size:cover">
    <div class="headers">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <div
        class="htitles"
        style="background: url('image/tbgs.png')"
      >
        泰山区双积分平台数据看板
      </div>
      <!-- {{nowDate}}  -->
      <el-date-picker
          v-model="nowDate"
          type="daterange"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          class="datePicker"
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="getNew()"
        >
      </el-date-picker>
      <font class="titleSelect">
        日期：
      </font>
    </div>
   <div class="setBox">
    
   
      <div class="flex5 setBox noLine">
        <div class="hbuild noMarginLR flex2 setBox noLine">
          <div class="hstitles">
            <div class="marks"></div>
            志愿服务次数
          </div>
          <div class="flex1 setBox yjs">
            <div class="flex1 yjItem getWidth"  >  
              <!-- <div v-if='key.length>1'> -->
                  <font class="bjNum" >126</font>
                  <br />
                  <font>数量</font>
              <!-- </div> -->
            </div>
            <!-- <div class="flex1 yjItem getWidth"  >   -->
              <!-- <div v-if='key.length>1'> -->
                  <!-- <font class="bjNum" >1980</font>
                  <br />
                  <font>总时长</font> -->
              <!-- </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
       <div class="flex5 setBox noLine">
        <div class="hbuild noMarginLR flex2 setBox noLine">
          <div class="hstitles">
            <div class="marks"></div>
            志愿服务时长
          </div>
          <div class="flex1 setBox yjs">
            <div class="flex1 yjItem getWidth"  >  
              <!-- <div v-if='key.length>1'> -->
                  <font class="bjNum" >2802</font>
                  <br />
                  <font>小时</font>
              <!-- </div> -->
            </div>
            <!-- <div class="flex1 yjItem getWidth"  >   -->
              <!-- <div v-if='key.length>1'> -->
                  <!-- <font class="bjNum" >1980</font>
                  <br />
                  <font>总时长</font> -->
              <!-- </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
   
    
    <div class="setBox flex1 getMarginB">
      <div class="flex5 setBox noLine">
        <div class="hbuild  flex2 setBox noLine">
         <div class="hstitles">
            <div class="marks"></div>
            通知公告
          </div>
          <div class="flex1 buildItem setBox  noLine getHeight" style="overflow:auto;">
            <div v-for="item in noticeList" :key="item.id" class="setBox lineItem" @click="showDt2(item)">
                <div class="flex3 getWidth names stext">{{item.title}}</div>
                <div>{{item.tbTime}}&nbsp;&nbsp;&nbsp;</div>
              </div>
          </div>
        </div>
        <div class="hbuild  flex2 setBox noLine">
         <div class="hstitles">
            <div class="marks"></div>
            信息数量对比
          </div>
          <div class="flex1 buildItem setBox  noLine getHeight" id="bingtu">
            

          </div>
        </div>
      </div>
      <div class="flex9 setBox noLine">
        <div class="hbuild noMarginLR flex2 setBox noLine">
          <div class="hstitles">
            <div class="marks"></div>
            志愿服务时长统计
          </div>
          <div class="flex1 buildItem getHeight" id="zmxxt"></div>
        </div>
        <div class="hbuild noMarginLR flex2 setBox noLine" style="display:none">
           <div class="hstitles">
            <div class="marks"></div>
            公益捐款
          </div>
          <div class="flex1 buildItem getHeight" id="jk"></div>
          
        </div>
      </div>
      <div class="flex5 setBox noLine"  style="display:none">
        <div class="hbuild noMarginLR flex2 setBox noLine">
          <div class="hstitles">
            <div class="marks"></div>
             负面信息
          </div>
          <div class="flex1 buildItem getHeight" id="fmxx"></div>
        </div>
        <div class="hbuild flex2 noMarginLR setBox noLine">
          <div class="hstitles">
              <div class="marks"></div>
              志愿服务
          </div>
          <div class="flex1 buildItem getHeight" id="zy"></div>
        </div>
      </div>
      <div class="flex5 setBox noLine">
        <div class="hbuild noMarginLR flex2 setBox noLine">
          <div class="hstitles">
            <div class="marks"></div>
            信用数据排名
          </div>
          <div class="flex1 buildItem setBox noLine getHeight" style="overflow:auto;">
              <!-- <div v-for="item in noticeList" :key="item.id" @click="showDt2(item)" class="setBox lineItem2 noLine">
                &nbsp;&nbsp;{{item.title}}
                <div class="flex1">
                   &nbsp;&nbsp;发布人：管理员
                  <font style="float:right">
                    日期：
                    {{item.startTime}} &nbsp;&nbsp;
                  </font>
                </div>
              </div> -->
              <!-- <div v-for="item in noticeList" :key="item.id" class="setBox lineItem" @click="showDt2(item)">
                <div class="flex3 getWidth names stext">{{item.title}}</div>
                <div>{{item.startTime}}&nbsp;&nbsp;&nbsp;</div>
              </div> -->

                <div v-for="item in phb" :key="item.foruserid" class="setBox lineItem" @click="showDt(item.foruserid)">
                  {{weici.indexOf(item.zbdf)+1}}
                  <div class="flex2 getWidth names">
                    <center>
                      {{item.forusername}}
                    </center>
                  </div>
                  <div class="flex1 getWidth" style="text-align:right">{{item.zbdf}}分</div>
                </div>
          </div>
        </div>
      </div>
    </div>
     <!-- 弹出层 -->
    <el-dialog
        title="得分详情"
        class="indig"
        :visible.sync="dtIsShow"
        >
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
        <el-table
          :data="zmList"
          border
          fit
          highlight-current-row
        >
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
        <br>
        <font class="dftit">负面信息:</font>
         <el-table
          :data="fmList"
          border
          fit
          highlight-current-row
        >
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
    <el-dialog
        :title="nowNotice.title"
        class="indig noticesd"
        :visible.sync="dtIsShow2"
        >
       
        <p>{{nowNotice.tbTime}}</p>
         <p class="ncon" v-html="nowNotice.nr"></p>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dtIsShow2 = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="报警信息详情"
        class="indig"
        :visible.sync="dtIsShow3"
        >
         <el-table
            :data="getWarn3(nowWarn3)"
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
            <!-- <el-table-column
            prop="tbrid"
            label="工号">
            </el-table-column> -->
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
        </el-table>
        <img class="bjImg2" :src="'data:image/png;base64,'+nowWarn3.file" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dtIsShow3 = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="报警信息详情"
        class="indig"
        :visible.sync="dtIsShow4"
        >
         <el-table
            :data="getWarn4(nowWarn4)"
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
            <!-- <el-table-column
            prop="tbrid"
            label="工号">
            </el-table-column> -->
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
        </el-table>
        <img class="bjImg2" :src="'data:image/png;base64,'+nowWarn4.file" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dtIsShow4 = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import _URL from "../../lib/url";
import { getAction, postAction } from "@/api/manage";
import store from "@/store";
import Hamburger from "@/components/Hamburger";
import * as echarts from "echarts";
import Swiper from "swiper"
import "swiper/dist/css/swiper.css";

export default {
  name: "Dashboard",
  components: {
    Hamburger,
  },
  data() {
    return {
      tjban:{
        zm:{
          num:'',
          zf:''
        },
        fm:{
          num:'',
          zf:''
        },
        jk:{
          num:'',
          money:''
        },
        zy:{
          num:''
        }
      },
      weici:[],
      nowNotice:{},
      zmList:[],
      fmList:[],
      noticeList:'',
      phb:'',
      swiper:'',
      depts:['机关党委','政治部','办公室'],
      numViews:{},
      currentRole: "adminDashboard",
      nowDate:[],
      // nowDate:this.getNowFormatDate(),
      cjs:'1',
      //挡墙报警信息id
      nowBjID:'start',
      nowBjID2:'start',
      //获取数据时的部门
      address:[],
      //获取摄像头时的部门
      cAddress:[],
      depment:[],
      nowWarn:false,
      nowWarn2:false,
      nowWarn3:false,
      nowWarn4:false,
      //日期选择器需要的数据
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
      //车间选择器
      options: [],
      //实时报警数据
      
      c1:'',
      c2:'',
      c3:'',
      c4:'',
      dtIsShow:false,
      dtIsShow2:false,
      dtIsShow3:false,
      dtIsShow4:false,
      //各类型报警数据
      bjSum:12,
      //柱状图数据
      deBj:[],
      deNumBj:[],
      //饼图数据
      bingNum:[],
    };
  },
  computed: {
    ...mapGetters(["roles", "sidebar"]),
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard";
    }
  },
  mounted() {
    //  alert(store.getters.token+'-'+store.getters.name);
    let that = this;
    // that.c1 = echarts.init(document.getElementById("myChart"));
    // that.c3 = echarts.init(document.getElementById("bjzb"));
    //第二个
    // that.getZS();
 
    // //最后一个
    // that.getBjzb();
    // //获取部门下拉框
    // that.getSelect()
    // //获取报警类型字典
    // that.getBjType()
    //自动填入今年第一天至今
    var date = new Date();       
    var mon = date.getMonth() + 1;       
    var day = date.getDate();
    var currDate = date.getFullYear() + "-"+ (mon<10?"0"+mon:mon) + "-"+(day<10?"0"+day:day);
    // var fDate = date.getFullYear() + "-01-01";
    var fDate = "2019-01-01";
    that.nowDate = [fDate,currDate];
    //获取上面的数据统计
    that.getTopView()
    //获取排行榜
    that.getOrder()
    //获取通知公告
    that.getNotice()

    // that.getBjzb()
  },
  methods: {
      getSumNun(val){
       
          let sum = 0
          for(var i=0;i<val.length;i++){
            sum+= val[i]
          }
          return sum
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
    getNew(){
      let that = this;
      //获取顶部数据
      that.getTopView()
      //获取排行榜
      that.getOrder()
    },
    getOrder(){
        let that = this;
        let obj = {
          // startTime:that.nowDate[0],
          // endTime:that.nowDate[1],
        };
        getAction(`${_URL.zfm_findOrder}`, obj).then( (response) => {
          if (response.flag) {
              that.phb = response.data
                let weici = [];
                for(var i = 0;i<response.data.length;i++){
                  if(weici.indexOf(response.data[i]['zbdf'])==-1){
                    weici.push(response.data[i]['zbdf']);
                  }
                }
                that.weici = weici;
          } 
        });
    },
    getTopView(){
        let that = this;
        let obj = {
          startTime:that.nowDate[0],
          endTime:that.nowDate[1],
        };
        getAction(`${_URL.zfm_findAllShu}`, obj).then( (response) => {
          if (response.flag) {
              that.numViews = response.data
              //各车间违章数量对比
              // that.getC1('zmxxt',that.numViews.zm);
              // that.getC1('fmxx',that.numViews.fm);
              // that.getC1('zy',that.numViews.zy);
              // that.getC1('jk',that.numViews.jk);
              //正面
              var dept1 = response.data.zm.map(function(item) {
                return item.dept;
              });
              var num1 = response.data.zm.map(function(item) {
                return item.num;
              });
              var zf1 = response.data.zm.map(function(item) {
                return item.zbdf;
              });
              // that.tjban.zm.num = num1;
              // that.tjban.zm.zf = zf1;
              //负面
              var dept2 = response.data.fm.map(function(item) {
                return item.dept;
              });
              var num2 = response.data.fm.map(function(item) {
                return item.num;
              });
              var zf2 = response.data.fm.map(function(item) {
                return item.zbdf;
              });
              // that.tjban.fm.num = num2;
              // that.tjban.fm.zf = zf2;
              //志愿服务
              var dept3 = response.data.zy.map(function(item) {
                return item.dept;
              });
              var num3 = response.data.zy.map(function(item) {
                return item.num;
              });
              // that.tjban.zy.num = num3;
              //捐款
              var dept4 = response.data.jk.map(function(item) {
                return item.dept;
              });
              var num4 = response.data.jk.map(function(item) {
                return item.num;
              });
              var money = response.data.jk.map(function(item) {
                return item.money;
              });
              // that.tjban.jk.num = num4;
              // that.tjban.jk.money = money;

              that.getC1('zmxxt',[100,98,46,76,88,123,199,108,22,63,89],['村庄1','村庄2','村庄3','村庄5','村庄6','村庄7','村庄8','村庄9','村庄10','村庄11']);
              that.getC1('fmxx',num2,dept2);
              that.getC1('zy',num3,dept3);
              that.getC1('jk',num4,dept4);
              //左下角饼图
              that.getBjzb();
          } 
        });


        //顶部统计
        getAction(`${_URL.zfm_findAllShu2}`, obj).then( (response) => {
          if (response.flag) {
              // alert(response.data.zm.num)
          
              that.tjban.zm.num = response.data.zm.num;
              that.tjban.zm.zf = response.data.zm.zbdf;
              //负面
             
           
              that.tjban.fm.num = response.data.fm.num;
              that.tjban.fm.zf = response.data.fm.zbdf;
              //志愿服务
             
           
              that.tjban.zy.num = response.data.zy.num;
              //捐款
             
            
             
              that.tjban.jk.num = response.data.jk.num;
              that.tjban.jk.money = response.data.jk.money;

        
             
          } 
        });
    },
    getNotice(){
        let that = this;
        let obj = {
          pageNum:1,
          pageSize:999
        };
        getAction(`${_URL.notice_findAll}`, obj).then( (response) => {
         
          if (response.flag) {
              that.noticeList = response.data.rows
          } 
        });
    },
    // notice_findAll
    getBjType(){
      let that = this;
      let obj = {};
      getAction(`${_URL.type_findAll}?pageNum=1&pageSize=999`, obj).then( (response) => {
        if (response.flag) {
         // alert(response.data.rows.length);
           // that.deBj = response.data.rows;
            //把结果中的value转为key，出现新数据时避免循环定位，可以直接定位
            let allType = {}
            for(let i = 0;i<response.data.rows.length;i++){
              let sid = response.data.rows[i]['sid'].replace('(','').replace(')','')
              eval("allType."+sid+"={value:'0',label:'"+response.data.rows[i]['name']+"'}")
              //类型给图表
              that.deBj.push(response.data.rows[i]['name'])
            }
            //console.log(JSON.stringify(allType))
            that.bjSum = allType;
           
        } 
      });
    },
    getWarn(){
      let that = this
      let sd = [];
      sd.push(that.nowWarn);
     // alert(sd[0]['id'])
      return sd;
    },
    getWarn2(){
      let that = this
      let sd = [];
      sd.push(that.nowWarn2);
     // alert(sd[0]['id'])
      return sd;
    },
    getWarn3(){
      let that = this
      let sd = [];
      sd.push(that.nowWarn3);
     // alert(sd[0]['id'])
      return sd;
    },
    getWarn4(){
      let that = this
      let sd = [];
      sd.push(that.nowWarn4);
     // alert(sd[0]['id'])
      return sd;
    },
    //查看当前警报详情
    showDt(id){
        let that = this;
        that.dtIsShow = true;
        that.listLoading = true;
        let obj = {
          startTime:that.nowDate[0],
          endTime:that.nowDate[1],
          foruserid:id,
          status:''
        };
        getAction(`${_URL.zm_findMingXi}`, obj).then( (response) => {
          if (response.flag) {
              that.zmList = response.data
          }
        });
    },
    showDt2(val){
        let that = this;
        that.dtIsShow2 = true;
        that.nowNotice = val;
    },
    showDt3(){
        let that = this;
        that.dtIsShow3 = true;
    },
    showDt4(){
        let that = this;
        that.dtIsShow4 = true;
    },
    showMore(){
     this.$router.push('/warn/list')
    },
    //获取选择框
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
           //监控和数据都设置上默认选项
            that.cAddress=[jsonDataTree[0].id,jsonDataTree[0].children[0].id,jsonDataTree[0].children[0].children[0].id]
            that.address=[jsonDataTree[0].id,jsonDataTree[0].children[0].id,jsonDataTree[0].children[0].children[0].id]
            //播放视频
            that.playVideo()
            //获取最新的报警信息，仅一条即可
            that.getBJ1();
            //获取各报警类型数量对比数据
            that.getSum();
            //设置轮询获取
            setInterval(function(){
              that.getBJ1();
              that.getSum();
            },5000)
            //获取近一周违章走势数据
            that.getWeek();
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
    //播放视频
    playVideo(){
        let that = this;
        let obj = {};
        //所属地点,若有则加入查询条件
        //if (that.address && that.address.length != 0) {
          obj.cjId = that.cAddress[2];
       // }
       // alert()
        postAction(`${_URL.camera_findAll}?pageNum=1&pageSize=1`, obj).then((response) => {
          // console.log(JSON.stringify(response));
          if (response.flag&&response.data.total>0) {
            // that.tableData = response.data.rows;
            // that.total = response.data.total;
              var vlc = document.getElementById("vlc");  
              var mrl=response.data.rows[0]['tbr']; 
              //将地址添加到播放列表
              //固定使用火狐播放
               var userAgent = navigator.userAgent;
              if (userAgent.indexOf("Firefox") > -1) {
                  vlc.playlist.stop();
                  vlc.playlist.clear();
                  vlc.playlist.add(mrl);  
                  //播放  
                  vlc.playlist.play();
              } 
          } else {
            that.tableData = [];
           // that.$message.error(response.message);
            var vlc = document.getElementById("vlc"); 
            vlc.playlist.stop();
            vlc.playlist.clear();
          }
        });
    },
    //获取今天的日期
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getData() {
      let obj = {
        ab: "123",
      };
      postAction(`${_URL.userList}`, obj).then((response) => {
        console.log(JSON.stringify(response));
      });
    },
    //获取最新的报警信息
    // getBJ1(){

    // },
    getBJ1() {
      // that.listLoading = true
      let that = this;
      let obj = {
        id:that.nowBjID,
      };
      if(that.address.length==1){
            obj.zgsId = that.address[0]
      }
      if(that.address.length==2){
          obj.zgsId = that.address[0]
          obj.fgsId = that.address[1]
      }
      if(that.address.length==3){
          obj.zgsId = that.address[0]
          obj.fgsId = that.address[1]
          obj.cjId =  that.address[2]
      }
      postAction(`${_URL.illegaladdimg_findNew}`,obj).then(response => {
          if(response.flag&&response.message==1){
            that.nowWarn = response.data[0]
            that.nowBjID = response.data[0].id
            that.nowWarn2 = response.data[1]
            that.nowBjID2 = response.data[1].id
            that.nowWarn3 = response.data[2]
            that.nowBjID3 = response.data[2].id
            that.nowWarn4 = response.data[3]
            that.nowBjID4 = response.data[3].id
           // alert(that.nowBjID)
          }else{
           // that.$message.error();
           // that.nowWarn = false
          }
      })
    },
    getSum(){
      let that = this;
      let obj = {
        startTime:that.nowDate,
        endTime:that.nowDate
      };
      if(that.address.length==1){
            obj.zgsId = that.address[0]
      }
      if(that.address.length==2){
          obj.zgsId = that.address[0]
          obj.fgsId = that.address[1]
      }
      if(that.address.length==3){
          obj.zgsId = that.address[0]
          obj.fgsId = that.address[1]
          obj.cjId =  that.address[2]
      }
      postAction(`${_URL.report_getSum}`,obj).then(response => {
        //console.log(JSON.stringify(response))
          if(response.flag){
            for(var i =0;i<response.data.length;i++){
              let type = response.data[i]['type'].replace('(','').replace(')','')
              eval("that.bjSum."+type+".value='"+response.data[i]['num']+"'");
            }
          }
          let bjNumbers = []
          let bingNum = []
          for(var key in that.bjSum){
            bjNumbers.push(that.bjSum[key]['value'])
            bingNum.push({value:that.bjSum[key]['value'], name:that.bjSum[key]['label']})
          }
          that.deNumBj=bjNumbers;
          that.bingNum = bingNum;
          //获取数量对比
          that.getSldb();
          //最后一个
          that.getBjzb();
      })
    },
    getWeek(){
          let that = this;
          let obj = {
            // id:that.nowBjID,
          };
          if(that.address.length==1){
                obj.zgsId = that.address[0]
          }
          if(that.address.length==2){
              obj.zgsId = that.address[0]
              obj.fgsId = that.address[1]
          }
          if(that.address.length==3){
              obj.zgsId = that.address[0]
              obj.fgsId = that.address[1]
              obj.cjId =  that.address[2]
          }
          postAction(`${_URL.report_getDaySum}`,obj).then(response => {
              if(response.flag){
                console.log(JSON.stringify(response))
                //alert(1);
                // that.nowWarn = response.data
                // that.nowBjID = response.data.id
              // alert(that.nowBjID)
              }else{
              // that.$message.error();
              // that.nowWarn = false
              }
          })
    },
    //切换部门时，清除当前报警信息
    clearBj(){
        let that = this;
        that.nowWarn = false;
        that.nowBjID = 'start';
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
      let that = this;
      setTimeout(function(){
          //that.$router.go(0)
          //第一个
          // myChart.
          //第二个
          // that.getZS();
          // //各车间违章数量对比
          // that.getCjdb();
          // //最后一个
          // that.getBjzb();
          // that.c1.clear();
          // that.getSldb();
      },1000)
    },
    getSldb() {
      let that = this;
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      that.c1.setOption({
        type:'pie',
        tooltip: {},
         grid:{
            left:'5%',
            top:'15%',
            right:'5%',
            bottom:'0',
            containLabel:true
        },
        xAxis: {
          //key
          data:that.deBj,
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: "#caecff",
            },
          },
        },
        yAxis: {
          type: "value",
          //字体颜色
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#caecff",
            },
          },
          //背景线
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#315070"],
              width: 1,
              type: "solid",
            },
          },
        },
        series: [
          {
            type: "bar",
            data: that.deNumBj,
            barWidth :20,//柱图宽度
            itemStyle: {
              normal: {
                color: function (params) {
                  //首先定义一个数组
                  var colorList = [
                    "#eb6b7c",
                    "#6c6ed8",
                    "#0aaf51",
                    "#2cb1e8",
                    "#2de7cd",
                    "#91e5ae",
                    "#acdf1c",
                    "#ad830c",
                    "#5c6164",
                    "#84177a",
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: false,
                },
              },
            },
          },
        ],
      });
    },
    getZS(){
       this.c2 = echarts.init(document.getElementById("jqzs"));
      // 绘制图表
       this.c2.setOption(
          {
            // title: {
            //     text: '折线图堆叠'
            // },
            tooltip: {},
            // legend: {
            //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            // },
            grid: {
                left:'5%',
                top:'15%',
                right:'5%',
                bottom:'0',
                containLabel:true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLabel: {
                  interval: 0,
                  rotate: 40,
                  textStyle: {
                    color: "#caecff",
                  },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#caecff",
                  },
                },
                //背景线
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ["#315070"],
                    width: 1,
                    type: "solid",
                  },
                },
            },
            series: [
                {
                    name: '未戴安全帽',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '高空未系安全带',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '未穿工作服',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '打电话',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '抽烟',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                },
                {
                    name: '未戴口罩',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [12, 225, 123, 23, 112, 123, 12]
                },
                {
                    name: '危险区域入侵',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [123, 413, 217, 179, 432, 123, 345]
                },
                {
                    name: '烟火识别',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [879, 345, 678, 654, 564, 739, 730]
                },
                {
                    name: '睡岗',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [32, 249, 238, 567, 482, 152, 657]
                },
                {
                    name: '脱岗',
                    type: 'line',
                    stack: '总量',
                    smooth:true, //这句就是让曲线变平滑的
                    data: [897, 234, 642, 893, 293, 892, 276]
                }
            ]
        }
      );
    },
    getBjzb(){
     
      // return false;
      let that = this;
      // 绘制图表
      that.c3 = echarts.init(document.getElementById("bingtu"));
      that.c3.setOption(
        {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              //   orient: 'vertical',
              //  x: 'bottom',
                        y: 'bottom',
                 padding:[0,0,20,0],
                textStyle: {
                   color: "#caecff",
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    label: {
                        color:'#caecff'
                    },
                    center: ['50%', '40%'], //图的位置，距离左跟上的位置
                    data: [
                      {
                        value:10,
                        name:'未成年人保护'
                      },
                      {
                        value:16,
                        name:'保护环境'
                      },
                      {
                        value:10,
                        name:'爱老敬老'
                      },
                      {
                        value:15,
                        name:'文明城市建设'
                      },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }
            ]
        }
      );
    },
     getC1(dom,num,depts) {
      let that = this;
      // let data = []
      // let num = []
      // for(var i=0;i<cdata.length;i++){
      //   data.push(cdata[i]['dept']);
      //   num.push(cdata[i]['num']);
      // }
      // 基于准备好的dom，初始化echarts实例
      this.c4 = echarts.init(document.getElementById(dom));
      // 绘制图表
      this.c4.setOption({
        tooltip: {},
        grid:{
            left:'5%',
            top:'5%',
            right:'5%',
            bottom:'1%',
            containLabel:true
        },
        xAxis: {
          data:depts,
          axisLabel: {
            interval: 0,
            rotate: 50,//x倾斜
            textStyle: {
              color: "#caecff",
            },
          },
        },
        yAxis: {
          type: "value",
          //字体颜色
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#caecff",
            },
          },
          //背景线
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#315070"],
              width: 1,
              type: "solid",
            },
          },
        },
        series: [
          {
            type: "bar",
            data: num,
            barWidth :35,//柱图宽度
            itemStyle: {
              normal: {
                color: function (params) {
                  //首先定义一个数组
                  var colorList = [
                    "#eb6b7c",
                    "#6c6ed8",
                    "#0aaf51",
                    "#2cb1e8",
                    "#2de7cd",
                    "#91e5ae",
                    "#acdf1c",
                    "#ad830c",
                    "#5c6164",
                    "#84177a",
                    "#6c6ed8",
                    "#0aaf51",
                    "#91e5ae",
                    "#acdf1c",
                    "#ad830c",
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: false,
                },
              },
            },
          },
        ],
      });
    }
    // getC1(dom,cdata) {
    //   let that = this;
    //   let data = []
    //   let num = []
    //   for(var i=0;i<cdata.length;i++){
    //     data.push(cdata[i]['dept']);
    //     num.push(cdata[i]['num']);
    //   }
    //   // 基于准备好的dom，初始化echarts实例
    //   this.c4 = echarts.init(document.getElementById(dom));
    //   // 绘制图表
    //   this.c4.setOption({
    //     tooltip: {},
    //     grid:{
    //         left:'5%',
    //         top:'10%',
    //         right:'5%',
    //         bottom:'15%',
    //         containLabel:true
    //     },
    //     xAxis: {
    //       data: data,
    //       axisLabel: {
    //         interval: 0,
    //         rotate: 0,//x倾斜
    //         textStyle: {
    //           color: "#caecff",
    //         },
    //       },
    //     },
    //     yAxis: {
    //       type: "value",
    //       //字体颜色
    //       axisLabel: {
    //         formatter: "{value}",
    //         textStyle: {
    //           color: "#caecff",
    //         },
    //       },
    //       //背景线
    //       splitLine: {
    //         show: true,
    //         lineStyle: {
    //           color: ["#315070"],
    //           width: 1,
    //           type: "solid",
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         type: "bar",
    //         data: num,
    //         barWidth :20,//柱图宽度
    //         itemStyle: {
    //           normal: {
    //             color: function (params) {
    //               //首先定义一个数组
    //               var colorList = [
    //                 "#eb6b7c",
    //                 "#6c6ed8",
    //                 "#0aaf51",
    //                 "#2cb1e8",
    //                 "#2de7cd",
    //                 "#91e5ae",
    //                 "#acdf1c",
    //                 "#ad830c",
    //                 "#5c6164",
    //                 "#84177a",
    //               ];
    //               return colorList[params.dataIndex];
    //             },
    //             label: {
    //               show: false,
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   });
    // }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.indexPage {
  .bjNum{
    font-family:'digital-7';
  }
  .stext{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .names{
    text-indent:15px;
  }
  .nums{
   text-align:center;
    width:20px;
    margin-left:10px
  }
  .lineItem{
    height: 40px;
    line-height: 40px;
    border-bottom:solid 1px #253c66;
    margin:0 10px 0 10px;
    cursor: pointer;
     -webkit-user-select:none; /*webkit浏览器*/
  }
  .lineItem2{
    padding:8px 0 7px 0;
    line-height:25px;
    border-bottom:solid 1px #253c66;
    margin:0 10px 0 10px;
    cursor: pointer;
     -webkit-user-select:none; /*webkit浏览器*/
  }
  .getHeight::-webkit-scrollbar {
    width: 8px;
  }
  .getHeight::-webkit-scrollbar-track {
    background-color:rgba($color: #141e3c, $alpha: 0);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
  }
  .getHeight::-webkit-scrollbar-thumb {
    background-color:rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
  }
 .el-date-editor{
   background-color:rgba(0,0,0,0);
   ::v-deep.el-range-input{
      background-color:rgba(0,0,0,0) !important;
      color:#afe7f9;
      margin-top: -2px;
   }
   ::v-deep.el-range-separator{
      color:#afe7f9;
   }
 }
  .bjImg{
    //  width:100%;
    //  margin-top:20px;
    width:22px;float:left;margin-left:10px;margin-right:10px;margin-top:1px;
  }
  .bjImg2{
      width:100%;
      margin-top:20px;
  }
  .mBtn{
    background:rgba(0,0,0,0);
    border-color:#2d7ecf;
      color:#afe7f9;
      float: right;
      background: #224176;
      margin-right:15px;
      position: relative;
      top:2px;
      // border-radius:0 !important;
  }
  .titleSelect{
    float:right;
    margin-top:3vh;
    font-weight: bold;
    color:#afe7f9;
  }
  .videoInnerBtn{
      width:230px;
        border:none;
        float:right;
        margin-top:3vh;
        height: 22px;
        margin-right:0px;
        cursor: pointer;
        ::v-deep.el-input__inner{
          border:none;
          background: rgba(0,0,0,0);
          color:#afe7f9;
          height: 22px;
          font-size:16px;
        };
        ::v-deep.el-input__suffix-inner{
          display: none;
        }
        ::v-deep.el-input{
         top:-8px
        }
        ::v-deep.el-input__icon{
           color:#afe7f9;
           height:19px;
           line-height:19px;
            font-size:19px;
        }
  }
 
  // 滚动条的宽度
  //   ::v-deep.el-dialog{
  //    background: #1f396b !important;
  //    color:white !important
  //  }
//   ::v-deepth,::v-deeptr,::v-deeptd,::v-deeptbody{
//     scrollbar-color: transparent transparent;

//     color:#f3ffff;
//     background:rgba(0,0,0,0);
//      border-bottom: 1px solid #1d3a72 !important;
//   }
//   ::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td{
//     background-color:rgba(0,0,0,0.2);
//   }
//  ::v-deep.el-table, .el-table__expanded-cell{
//    background:rgba(0,0,0,0);
//    border:none !important
//  }
// ::v-deep.el-table::before{
//   height: 0;
// }
  // background-color: rgb(240, 242, 245);
  height: 100vh;
  .headers {
    // border:solid 1px blue;
    color: #f5ffff;
    border-bottom: solid 2px #2e4a72;
    width: 100%;
    height:8vh;
      .datePicker{
        border:none;
        float:right;
        margin-top:2vh;
        width:300px;
        margin-right:0px;
        cursor: pointer;
        ::v-deep.el-date-editor{
          border:none;
          background: rgba(0,0,0,0) !important;
          color:#afe7f9;
          height:19px;
          width:200px;
          font-size:18px;
        };
        ::v-deep.el-input__icon{
           color:#afe7f9;
           height:19px;
           line-height:19px;
           font-size:18px;
        }
      }
    .htitles {
      display: inline-block;
      font-size: 3.2vh;
      margin-top: 1.1vh;
      height: 5.7vh;
      // width: 32vh;
      width: 44vh;
      text-align: center;
      line-height: 5.7vh;
      background-size: 100% 100% !important;
    }
  }
  .hamburger-container {
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 3vh;
  }
  .noMarginLR {
    margin-left: 0 !important;
  }
  .getMarginB {
    margin-bottom: 10px;
  }
  .mainView {
    width: 40%;
  }
  .hbuild {
    background: rgba(25, 34, 73, 0.7);
    margin: 10px 10px 0px 10px;
    border: solid 1px #2b386b;
    .hstitles {
      color: #a7e8f7;
      line-height: 22px;
      margin-top: 5px;
      .marks {
        height: 18px;
        width: 4px;
        background: #5bf9f2;
        float: left;
        margin-left: 11px;
        margin-right: 5px;
        position: relative;
        top: 2px;
      }
      .marks2 {
        height: 18px;
        width: 4px;
        background: #5bf9f2;
        float: left;
     
        margin-right: 5px;
        position: relative;
        top: 2px;
      }
    }
    .yjs {
      padding: 2px 5px 5px 5px;
    }
    .yjItem {
      border: Solid 1px #20427d;
      margin: 5px;
      box-shadow: inset 0px 0px 15px 3px #1a3260;
      height: 9vh;
      color: #afe7f9;
      text-align: center;
      .bjNum {
        font-size: 4.2vh;
        margin-top: 0.3vh;
        display: inline-block;
      }
    }
    .buildItem {
      border: Solid 1px #20427d;
      margin: 10px;
      box-shadow: inset 0px 0px 15px 3px #1a3260;
      color: #afe7f9;
    }
   
  }
   .dftit{
      display: block;
      top:30px;
      line-height: 30px;
      font-size:15px;
    }
    .ntit{
      font-size:20px;
      color: black;
    }
    .ncon{
      font-size:15px;
      color: black;
    }
    ::v-deep.noticesd .el-dialog__body{
      padding-top:0 !important
    }
}
    .swiper-container {
      width: 100%;
    }
</style>

