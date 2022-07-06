<template lang="html">
  <div class='mapArea'>
    <loading  class='loadingMap'   v-show='loadingFlage' /></loading>
    <tool/>
    <div class="monit-head cardTools">
      <jj-card v-for='item in typeCardList' :key='item.id' :class="activeType==item.id?'jjcardActive':''"
       @tabClick="setType(item)">{{item.name}}</jj-card>
    </div>
    <div class="monit-head cardTools mt-50" v-show="activeType=='714979098165907000'&&isChart">
      <jj-card  v-for='item in rankList' :key='item.value'
      :class="rankType==item.value?'jjcardActive':''"@tabClick="setRankType(item)">{{item.name}}</jj-card>
    </div>
    <div class="monit-head cardTools mt-50">
      <jj-card  v-for='item in subInfraList' :key='item.id' v-show="subInfraList.length"
      :class="subInfraActive==item.id?'jjcardActive':''"@tabClick="setInfraType(item)">{{item.name}}</jj-card>
    </div>
    <Total v-if="isTJ" :countList="countList[oneType]"/>
    <icon-total v-if="isTB" :iconList="iconList[iconType]"/>
    <!--isSlider true是展开状态 false是收起  -->
    <div :class="isSlider?'mapchart':'mapchart mapchartactive'">
      <CardBarSingle  v-show='isChart' :item='superChart'/>
      <CardBarSingle  v-show='isChart' :item='rankChart'/>
      <CardPin  v-show='isEnChart' :item='envirChart'/>
    </div>
    <map-three   v-if='showThree'/>
    <Gis :class='!showThree ? "":"deepHide" '/>
  </div>
</template>

<script>
import Gis from './Gis.vue';
import tool from './tool.vue';
import Total from './Total.vue';
import IconTotal from './IconTotal.vue';
import JjCard from '../card/JJCard.vue';
import mapThree from '../three/Index.vue'
//import Three from './Three.vue';
import CardBarSingle from '@/components/charts/CardBarSingle.vue';
import CardPin from '@/components/charts/CardPin.vue';
export default {
  name:'mapView',
  components:{
    Gis,
    tool,
    mapThree,
    JjCard,
    Total,
    IconTotal,
    CardBarSingle,
    CardPin
    //Three
  },
  created(){
    let self = this;
    self.$store.commit('loadMap',4000);
  },
  data(){
    return{
      subInfraList:[],
      subInfraActive:'',
      activeType:'all',
      activeName:'',
      isChart:false,//
      superChart:{},
      rankChart:{},
      envirChart:{},
      isEnChart:false,
      rankList:[
        {
          name:'全部',
          value:0
        },
        {
          name:'一级',
          value:20001
        },
        {
          name:'二级',
          value:20002
        },
        {
          name:'三级',
          value:20003
        },
        {
          name:'四级',
          value:20004
        },
      ],
      rankType:0,
      typeCardList:[],
      typeCardCode:{
        'base':[
          {
            name:'全部',
            code:'all'
          },
          {
            name:'消防',
            code:'fire'
          },
          {
            name:'能源',
            code:'enery'
          },
          {
            name:'环保',
            code:'envir'
          },
          {
            name:'公用设施',
            code:'public'
          }
        ],
        'sensitive':[
          {
            name:'全部',
            code:'all'
          },
          {
            name:'小区',
            code:'fire'
          },
          {
            name:'卫生院',
            code:'enery'
          },
          {
            name:'村庄',
            code:'envir'
          },
        ],
        'supervision':[
          {
            name:'全部',
            code:'all'
          },
          {
            name:'重大危险源',
            code:'fire'
          },
          {
            name:'重点危化品',
            code:'enery'
          },
          {
            name:'重点危险工艺',
            code:'envir'
          },
        ]
      },
      countList:{
        "nodata":[],
        "zl":[
          {
            icon:'icon-qiye',
            name:'入驻企业数',
            numed:9,
            num:10
          },
          {
            icon:'icon-effluent_deal',
            name:'污水厂',
            numed:1,
            num:1
          },
          {
            icon:'icon-hot',
            name:'热电厂',
            numed:1,
            num:1
          },
          {
            icon:'icon-fire_station',
            name:'消防站',
            numed:1,
            num:1
          },
          {
            icon:'icon-parking',
            name:'危化品停车场',
            numed:1,
            num:2
          },
          {
            icon:'icon-park',
            name:'普通车辆停车场',
            numed:1,
            num:2
          },
          {
            icon:'icon-weihuapincheshiguweichuli',
            name:'危化品装卸区',
            numed:1,
            num:2
          },
          {
            icon:'icon-anjian',
            name:'安监',
            numed:17,
            num:20
          },
          {
            icon:'icon-environment_protect',
            name:'环保',
            numed:15,
            num:20
          },
          {
            icon:'icon-xiaoqu',
            name:'小区',
            numed:15,
            num:20
          },
          {
            icon:'icon-hospital',
            name:'医院',
            numed:15,
            num:20
          },
          {
            icon:'icon-school',
            name:'学校',
            numed:15,
            num:20
          },
          {
            icon:'icon-village',
            name:'村庄',
            numed:15,
            num:20
          },

        ],
        "basic":[
          {
            icon:'icon-effluent_deal',
            name:'污水厂',
            numed:1,
            num:1
          },
          {
            icon:'icon-hot',
            name:'热电厂',
            numed:1,
            num:1
          },
          {
            icon:'icon-fire_station',
            name:'消防站',
            numed:1,
            num:1
          },
          {
            icon:'icon-parking',
            name:'危化品停车场',
            numed:1,
            num:2
          },
          {
            icon:'icon-effluent_deal',
            name:'普通车辆停车场',
            numed:1,
            num:2
          },
          {
            icon:'icon-park',
            name:'危化品装卸区',
            numed:1,
            num:2
          },
        ],
        "sensitive":[
          {
            icon:'icon-xiaoqu',
            name:'小区',
            numed:15,
            num:20
          },
          {
            icon:'icon-hospital',
            name:'医院',
            numed:15,
            num:20
          },
          {
            icon:'icon-school',
            name:'学校',
            numed:15,
            num:20
          },
          {
            icon:'icon-village',
            name:'村庄',
            numed:15,
            num:20
          },
        ],
      },
      oneType:'zl',
      isTJ:true,//统计是否显示
      iconType:'zl',
      isTB:true,//图标是否显示
      iconList:{
        'nodata':[],
        'zl':[
          {
            name:"污水厂",
            icon:'icon-effluent_deal'
          },
          {
            name:"地下水监测区",
            icon:'icon-underground_well'
          },
          {
            name:"地表水监测区",
            icon:'icon-surfacewater'
          },
          {
            name:"危废安全处置",
            icon:'icon-dangerous_waste_deal'
          },
          {
            name:"热电厂",
            icon:'icon-hot'
          },
          {
            name:"变电站",
            icon:'icon-electric'
          },
          {
            name:"消防站",
            icon:'icon-fire_station'
          },
          {
            name:"消防栓",
            icon:'icon--FireHydrant'
          },
          {
            name:"危化品停车场",
            icon:'icon-parking'
          },
          {
            name:"普通车辆停车场",
            icon:'icon-park'
          },
          {
            name:"危化品车辆专用通道",
            icon:'icon-cheliangtongdao'
          },
          {
            name:"专用洗车场",
            icon:'icon-washing'
          },
          {
            name:"危化品装卸区",
            icon:'icon-weihuapincheshiguweichuli'
          },
          {
            name:"道闸",
            icon:'icon-roadgatehl'
          },
          {
            name:"公共管道",
            icon:'icon-tunnel'
          },
          {
            name:"防潮防洪设施",
            icon:'icon-dampproof'
          },
          {
            name:"村落",
            icon:'icon-village'
          },
          {
            name:"医院",
            icon:'icon-hospital'
          },
          {
            name:"小区",
            icon:'icon-xiaoqu'
          },
          {
            name:"学校",
            icon:'icon-school'
          },
          {
            name:"重大危险源",
            icon:'icon-major_hazard'
          },
          {
            name:"重点危化品",
            icon:'icon-chemical'
          },
          {
            name:"重点危险工艺",
            icon:'icon-chemical_process'
          },
          {
            name:"废水",
            icon:'icon-effluent'
          },
          {
            name:"有毒有害气体",
            icon:'icon-dangerous_gas'
          },
          {
            name:"固废",
            icon:'icon-solid_waste'
          },
          {
            name:"烟气",
            icon:'icon-smoke'
          },
          {
            name:"大气",
            icon:'icon-air_monitoring_point'
          },
          {
            name:"地表水",
            icon:'icon-surfacewater'
          },
          {
            name:"地下水",
            icon:'icon-groundwater'
          },
          {
            name:"废气",
            icon:'icon-exhaust_gas'
          },
        ],
        'basic':[
          {
            name:"污水厂",
            icon:'icon-effluent_deal'
          },
          {
            name:"地下水监测区",
            icon:'icon-underground_well'
          },
          {
            name:"地表水监测区",
            icon:'icon-surfacewater'
          },
          {
            name:"危废安全处置",
            icon:'icon-dangerous_waste_deal'
          },
          {
            name:"热电厂",
            icon:'icon-hot'
          },
          {
            name:"变电站",
            icon:'icon-electric'
          },
          {
            name:"消防站",
            icon:'icon-fire_station'
          },
          {
            name:"消防栓",
            icon:'icon--FireHydrant'
          },
          {
            name:"危化品停车场",
            icon:'icon-parking'
          },
          {
            name:"普通车辆停车场",
            icon:'icon-park'
          },
          {
            name:"危化品车辆专用通道",
            icon:'icon-cheliangtongdao'
          },
          {
            name:"专用洗车场",
            icon:'icon-washing'
          },
          {
            name:"危化品装卸区",
            icon:'icon-weihuapincheshiguweichuli'
          },
          {
            name:"道闸",
            icon:'icon-roadgatehl'
          },
          {
            name:"公共管道",
            icon:'icon-tunnel'
          },
          {
            name:"防潮防洪设施",
            icon:'icon-dampproof'
          },
        ],
        'sensitive':[
          {
            name:"村落",
            icon:'icon-village'
          },
          {
            name:"医院",
            icon:'icon-hospital'
          },
          {
            name:"小区",
            icon:'icon-xiaoqu'
          },
          {
            name:"学校",
            icon:'icon-school'
          },
        ],
        'super':[
          {
            name:"重大危险源",
            icon:'icon-major_hazard'
          },
          {
            name:"重点危化品",
            icon:'icon-chemical'
          },
          {
            name:"重点危险工艺",
            icon:'icon-chemical_process'
          },
        ],
        'envir':[
          {
            name:"废水",
            icon:'icon-effluent'
          },
          {
            name:"有毒有害气体",
            icon:'icon-dangerous_gas'
          },
          {
            name:"固废",
            icon:'icon-solid_waste'
          },
          {
            name:"烟气",
            icon:'icon-smoke'
          },
          {
            name:"大气",
            icon:'icon-air_monitoring_point'
          },
          {
            name:"地表水",
            icon:'icon-surfacewater'
          },
          {
            name:"地下水",
            icon:'icon-groundwater'
          },
          {
            name:"废气",
            icon:'icon-exhaust_gas'
          },
        ],
      },
    }
  },
  watch:{
    $route(n,o) {
      let self = this;
      let name  = this.$route.name;
      let typeValue = this.$route.query.typeValue?this.$route.query.typeValue:'';
      if(n.name=='overBase'||n.name=='overSensitive'||n.name=='Analysis'){
        if(n.name=='overBase'&&o.name!=='overBase'){//基础设施类型列表
          self.oneType = 'basic';
          self.isTJ = true;
          self.iconType = 'basic';
          self.isTB = true;
          self.isChart = false;
          self.isEnChart = false;
          if(!this.$route.query.type){
            self.activeType = 'all';
          }
          let url = `${_URL._GET_DICT}/?code=_INFRATRUCTURE&level=1001`;
          self.getTypeList(url);
        }
        if(n.name=='overSensitive'){//敏感点类型列表 _GET_DETAIL_SPOT
          self.oneType = 'sensitive';
          self.isTJ = true;
          self.iconType = 'sensitive';
          self.isTB = true;
          self.isChart = false;
          self.isEnChart = false;
          self.subInfraList =[];//基础设施子类型
          if(!this.$route.query.type){
            self.activeType = 'all';
          }
          let url = `${_URL._GET_DICT}/?code=_SENSITIVE&level=1001`;
          // let url = `${_URL._GET_DETAIL_SPOT}/type/search?page=1&size=99`;
          self.getTypeList(url);
        }
        if(n.name=='Analysis'){//安监 环保  _GET_TYPE_CODE
          self.isTJ = false;
          self.oneType = 'nodata';
          self.subInfraList =[];//基础设施子类型
          if(!this.$route.query.twoTypeId){
            self.activeType = 'all';
          }
          if(n.query.typeValue&&!n.query.gid){//只在总览的安监环保中显示地图中的类型
            if(n.query.typeValue==300001){//安监
              self.iconType = 'super';
              self.isTB = true;
              self.isChart = true;
              self.isEnChart = false;
              console.log(self.isChart,"ischart---");
              let url = `${_URL._GET_DICT}/?code=_MONITOR&level=1002&superiorId=714975229973237760`;
              self.getTypeList(url);
              //按监测点一级类型统计
              let typeurl = `${_URL._GET_COUNT}?typeValue=300001`;
              self.getTypeCount(typeurl,'super');
              //重大危险源等级
              let rankurl = `${_URL._GET_D_LIST}/level/300005`;
              self.getRankList(rankurl);
            }
            if(n.query.typeValue==300003){//环保
              self.iconType = 'envir';
              self.isTB = true;
              self.isChart = false;
              self.isEnChart = true;
              let url = `${_URL._GET_DICT}/?code=_MONITOR&level=1002&superiorId=714978214996480000`;
              self.getTypeList(url);
              //按监测点一级类型统计
              let typeurl = `${_URL._GET_COUNT}?typeValue=300003`;
              self.getTypeCount(typeurl,'envir');
            }else if(n.query.typeValue==300002||n.query.typeValue==300004){
              self.typeCardList = [];
              self.iconType = 'nodata';
              self.isTB = false;
              self.isChart = false;
            }
          }
        }
      }else{
        if(n.name=='over'){
          self.isTJ = true;
          self.oneType = 'zl';
          self.iconType = 'zl';
          self.isTB = true;
          self.isChart = false;
        }else{
          self.oneType = 'nodata';
          self.isTJ = false;
          self.iconType = 'nodata';
          self.isTB = false;
          self.isChart = false;
        }
        self.isEnChart = false;
        self.subInfraList =[];//基础设施子类型
        self.typeCardList = [];
      }
    }
  },
  computed:{
    loadingFlage(){
      return this.$store.state.mapLoad
    },
    showThree(){
      return this.$store.state.showThree
    },
    isSlider(){
      return this.$store.state.sliderUp;
    },
  },
  methods:{
    setType(item){
      let self = this;
      self.activeType = item.id;
      let name = self.$route.name;
      let typeValue = self.$route.query.typeValue;
      console.log(name,typeValue,"路由名称和类型字典码");
      if(name=='overBase'){
        if(item.id!=='all'){
          self.getInfraType(item.id);
          self.activeName = item.name;
          self.subInfraActive = 1;
        }else{
          self.subInfraList =[];
        }
        self.$router.push({name:'overBase',query:{type:item.name,twoType:'全部'}});
      }
      if(name=='overSensitive'){
        self.$router.push({name:'overSensitive',query:{type:item.name}});
      }
      if(name=='Analysis'){
        if(typeValue==300001){//安监
          console.log("222--");
          if(item.id=='714979098165907000'){//重大危险源
            self.rankType = 0;
            self.$router.push({
              name:'Analysis',
              query:{
                typeValue:300001,
                twoTypeId:300005,//重大危险源
                threeTypeId:0
              }
            });
          }else{
            self.$router.push({name:'Analysis',query:{typeValue:300001,twoTypeId:item.value}});
          }
        }
        if(typeValue==300003){//环保
          self.$router.push({name:'Analysis',query:{typeValue:300003,twoTypeId:item.value}});
        }
      }
    },
    setInfraType(item){
      let self = this;
      self.subInfraActive = item.id;
      self.$router.push({
        name:'overBase',
        query:{
          type:self.activeName,
          twoType:item.name
        }
      });
    },
    getInfraType(pid){
      let self = this;
      let url = `${_URL._GET_DICT}/?code=_INFRATRUCTURE&superiorId=${pid}`;
      self.$api.getRestTree(url).then(res=>{
        console.log(res,"子类型--");
        self.subInfraList= res.data.data;
        self.subInfraList.unshift({
          id:1,
          name:'全部'
        });
      });
    },
    getTypeCount(url,name){
      let self = this;
      console.log(url,name,"url---name");
      self.$api.getRestTree(url).then(res=>{
        console.log(res,"监测点一级类型统计---");
        let title = res.data.title;
        let list = res.data.data;
        if(name=='super'){
          let chartData ={
            title:title,
            xAxisData:list.map(x=>x.type_value_name),
            height:'220px',
            series:[
              {
                name: '类型',
                type: 'bar',
                barGap: 0.2,
                barWidth :'20px',
                data: list.map(x=>x.count),
              }
            ]
          };
          self.superChart = chartData;
        }else if(name=='envir'){
          let data = [];
          list.forEach((x)=>{
            let obj = {
              name: x.type_value_name,
              value: x.count
            };
            data.push(obj);
          });
          let chartData ={
            title:title,
            legendData:list.map(x=>x.type_value_name),
            height:'220px',
            seriesData:data
          };
          console.log(chartData,"智慧环保统计");
          self.envirChart = chartData;
        }

      });
    },
    getRankList(url){
      let self = this;
      console.log(url,"url---");
      self.$api.getRestTree(url).then(res=>{
        console.log(res,"危险源等级统计---");
        let list = res.data.data.filter((x)=>{
          if(x.name){
            return x;
          }
        });
        //等级排序
        list.sort(function(a,b){
          return a.level_id - b.level_id;
        });
        let chartData ={
          title:'危险源级别分布',
          xAxisData:list.map(x=>x.name),
          height:'220px',
          series:[
            {
              name: '等级',
              type: 'bar',
              barGap: 0.2,
              barWidth :'20px',
              data: list.map(x=>x.count),
            }
          ]
        };
        self.rankChart = chartData;
      });
    },
    setRankType(item){
      let self = this;
      self.rankType = item.value;
      self.$router.push({
        name:'Analysis',
        query:{
          typeValue:300001,
          twoTypeId:300005,//重大危险源
          threeTypeId:item.value
        }
      });
    },
    getTypeList(url) {
      let self = this;
      console.log(url,"url---");
      self.$api.getRestTree(url).then(res=>{
        console.log(res,"类型--");
        self.typeCardList = res.data.data;
        self.typeCardList.unshift({
          id:'all',
          name:'全部'
        });
      });
    },
  }
}
</script>

<style lang="less">
.cardTools {
  position: fixed;
  z-index: 200;
  display: flex;
  flex-direction: row;
  background: none;
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
  max-width: 398px;
}
.mapArea
{
  position: relative;
}
.fixTest
{
  position: fixed;
  width: 100%;
  height: 80px;
  color:#fff;
  top:20px;
}

.deepHide
{
  position: absolute!important;
  z-index: -10000;
  left: 8px;
  top:0;
}
.mapchart{
  position: absolute;
  top: 60px;
  left: 260px;
  z-index: 200;
  transition:  transform .4s;
}
.mapchartactive{
  transform: translateX(-236px);
}
</style>
