<template lang="html">
  <div class="tsSlider" >
    <CardTitle title='危化品车辆监测预警一张图' class='subTitleCard-active'@tabClick='clearSelect' />
    <div class="tsSlider-content ">
      <div class='tsSlider-item'>
        <BudingState :list='status'/>
      </div>
      <div class='tsSlider-item pd-1' v-show='item.subList.length'
        v-for="(item,index) in siders" :key="item.id">
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>{{item.name}}</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(sub)'
             :item='sub' :key='sub.id' v-for='sub in item.subList'   @tabClick="setSider(sub.classify)"/>
          </div>
        </div>
      </div>
      <div class='tsSlider-item pd-1' >
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>交通区域</h2>
          <div class="tsSlider-card-cotents">
            <!-- <TsSliderCardItem :class='getClass(terminal)' :item='terminal' @tabClick='setSider(terminal.list)'/> -->
            <TsSliderCardItem  :class='getClass(sidezx)' :item='terminal' @tabClick='setSider(sidezx.classify)'/>
            <TsSliderCardItem :class='getClass(item)' :item='item' :data-d ='item.classify'
            @tabClick='setSider(item.classify)'
            :key='item.id' v-for='item in typeList' />
          </div>
        </div>
      </div>
      <div class='tsSlider-item pd-1' >
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>园区/企业</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(item)' :item='item'  @tabClick='setSider(item.classify)'
            :key='item.id' v-for='item in pcList' />
          </div>
        </div>
      </div>
      <loading  class='loadingModel' v-show='showTypeLoading'/>
      <!-- <div class='tsSlider-item pd-1' >
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>监测区域</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(sub)'
             :item='sub' :key='sub.id' v-for='sub in typeList' @tabClick='setSider(sub.classify)' />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import SubTitle from '@/components/card/SubTitle.vue';
import * as tool from "@/components/map/tool.js";
import MapText from "@/components/map/mapText/index.js";
import CardTitle from '@/components/card/SubTitleCard';
import BudingState from './components/BudingState';
import TsSliderCardItem from './components/TsSliderCardItem';
import MapMethods from "@/components/map/tool/mapMethods.js";

export default {
  name:'maincontrol',
  created(){
    let self = this;
    //self.getCompanyList();
    self.getStates();
    self.getTerminalCount();
    self.getParkCompanyCount();
    self.getTypeCount();
    self.getFullArea();
    self.getTerminalArea();
    // self.getFullArea();//地板
    // self.getMonitList();
    // self.getMonitArea();
  },
  components:{
    SubTitle,
    CardTitle,
    BudingState,
    TsSliderCardItem,
  },
  beforeCreate(){
    if(window.GisTrafficMap && window._NEW_TRAFFIC_AREA_TYPE){
      window.GisTrafficMap.remove(window._NEW_TRAFFIC_AREA_TYPE.tags);
    }
  },
  beforeDestroy(){
    if(window.GisTrafficMap && window._NEW_TRAFFIC_AREA_TYPE){
      window.GisTrafficMap.remove(window._NEW_TRAFFIC_AREA_TYPE.tags);
    }
  },
  computed:{
    typeCofing(){
    },

  },
  data(){
    return{
      terminal:{
        // classify_name:'装卸区',
        // count:33,
        // icon_string:''
        }, //装卸区count  接口传
      showTypeLoading:false,
      terminalList:[],
      siders:[],
      typeObj :{},
      status:[],
      pcList:[],
      activename:'',
      typeList:[
      ],
      sidezx:{},
    }
  },
  methods:{
    clearSelect(){
      let self = this;
      self.activename = '';
      //self.clearAreaColor();
      if(window._NEW_TRAFFIC_AREA_TYPE){
        window.GisTrafficMap.remove(window._NEW_TRAFFIC_AREA_TYPE.tags);
        window.GisTrafficMap.add(window._NEW_TRAFFIC_AREA_TYPE.tags);
      }
    },
    getParkCompanyCount(){
      let self = this;
      let searchCode = self.$projectConfig.SearchCode;
      console.log(searchCode,'--searchCode---')
      self.$api.getRestTree(`${_URL._V3._Traffic_FUN_COUNT}`).then(res=>{
        let Json =  res.data;
        Json.forEach((x)=>{
          x.classify = x.type_value;
          x.classify_name = x.type_name;
        });
        console.log(Json,'--searchCode---')

        self.pcList = Json;
      }).catch(err=>{
        console.log(err,'---调试 p/c-----')
      })
    },
     getTerminalCount(){
      let self = this;
      self.$api.getRestTree(`${_URL._V3._Traffic_TERMINAL_COUNT}`).then(res=>{
        let Json =  res.data;
        Json.classify_name = Json.name;
        Json.icon_string = ' iconzhuangxiepingtai';
        self.terminal = Json;

        console.log(Json,"weihua--res");
      }).catch(err=>{
        console.log(err,'---调试 p/c-----')
      })
      // this.terminal = {}//Json;
    },
    getFullArea(){ //地图交互 默认加载所有区域
      let self = this;
      let searchCode = self.$projectConfig.SearchCode;
      let typePark  = searchCode.parkFun;
      let parkCode  = searchCode.park;
      let factoryCode  = searchCode.company;

      self.$api.getRestTree(`${_URL._V3._Traffic_FULL_AREAS}`).then(res=>{
        let sendList = [];
        let list = res.data;
        let fullArea = {
          tags:[],
        };
        console.log(list,"list---");
        let oList = list = list.filter(x=> x.area);
        list = list.filter((x)=> {

          return  (x.classify_name && x.type_value == typePark&&x.classify!=520511)
        });
        let companys   = oList.filter((x)=>{
          return x.type_value == factoryCode
        });

        let parks = oList.filter((x)=>{
          return x.type_value == parkCode
        });

        let factroyFuns = list.filter((x)=>{
          return  x.classify_name.indexOf('危化品') > -1
        })

        factroyFuns.filter((x)=>{
          return  x.classify_name !== '危化品车辆专用通道' && x.classify_name !== '危化品车辆专用停车场'

        })
        companys.forEach((item)=>{
          let center = JSON.parse(item.area.center);
          item.dataType = 'funArea';
          item.clickType = 'companyFun';
          item.title = item.name;
          item.position = [center.lng,center.lat];
          item.showType = item.type_value;
        })

        parks.forEach((item)=>{
          let center = JSON.parse(item.area.center);
          item.dataType = 'funArea';
          item.clickType = 'park';
          item.title = item.name;
          item.position = [center.lng,center.lat];
          item.showType = item.type_value;
        })

        factroyFuns.forEach((item)=>{
          let center = JSON.parse(item.area.center);
          item.dataType = 'taffic';
          item.clickType = 'taffic';
          item.title = item.name;
          item.position = [center.lng,center.lat];
          item.showType = item.classify;
        });
        sendList = [...factroyFuns,...parks,...companys];
        console.log(sendList,'-----e--sendList')
        fullArea.tags = MapMethods.setTags(sendList, window.GisTrafficMap, function(item,tag){
          tag.showType = item.showType;
          if(item.clickType === 'taffic'){ // 危化品类 功能区 园区功能区
            tag.on('click',(e)=>{
              console.log(item,'--查看对应item数据--');
              let sendData = {
                id:item.id,
                showType:'TrafficDiffer'
              }
              console.log(sendData,'===查看sendData数据====')
              self.$store.commit('setTrafficObject',sendData);
              self.moveMap(item);
              setTimeout(()=>{
                // self.
              },50)
            })
          }
        });
        window._NEW_TRAFFIC_AREA_TYPE = fullArea;
      })
    },
    getTerminalArea(){
      let self = this;
      self.showTypeLoading = true;
      setTimeout(()=>{
        self.showTypeLoading = false;
      },500);
      self.$api.getRestTree(`${_URL._V3._Traffic_TERMINAL_AREA}?page=1&size=99&isDisable=1000`).then(res=>{
        console.log(res,'危化品功能区内容')
        let Json = res.data.data;
        let terminalArea = {
          tags:[],
        };
        let code = {
          1000:16001,
          1001:16002,
          1002:16003,
          40001:16003,
          40002:16001,
          40003:16002
        };
        Json = Json.filter((x)=>{return x.function_resource&&x.function_resource.area});
        Json.forEach((item)=>{
          let center = JSON.parse(item.function_resource.area.center);
          item.position = [center.lng,center.lat];
          item.dataType = 'taffic';
          item.clickType = 'taffic';
          item.id = item.function_resource.id;
          item.title = item.name;
          item.showType = item.function_resource.classify;
          item.classify = item.showType;
          item.status = code[item.status];
          item.area = item.function_resource.area;
          item.coordinate = item.function_resource.area.center;
          item.rank = 18.06;
          item.rotation = 0.54;
          item.inclination = 51.25;
          if(!item.icon){
            item.icon = 'iconzhuangxiepingtai'
          }
        });
        self.terminalList = Json;
        // self.terminal.list = Json[0].function_resource;
        self.sidezx = Json[0].function_resource;
        // self.$set(self.terminal,"list",Json[0].function_resource);
        // self.terminal.list = 520511;
        console.log(self.terminalList,"危化品功能区域加载-----");
        terminalArea.tags = MapMethods.setTags(self.terminalList, window.GisTrafficMap, function(item,tag){
          tag.showType = item.showType;
          if(item.clickType === 'taffic'){ // 危化品类 功能区 园区功能区
            tag.on('click',(e)=>{
              console.log(item,'--查看对应item数据--');
              let sendData = {
                id:item.id,
                showType:'TrafficDiffer'
              }
              console.log(sendData,'===查看sendData数据====')
              self.$store.commit('setTrafficObject',sendData);
              self.moveMap(item);
            })
          }
        });
        window._NEW_TRAFFIC_TERMINALAREA_TYPE = terminalArea;
      })
    },
    setSider(value){
      let self = this;
      console.log(value,"value--sider==========");
      self.showTypeLoading = true;
      setTimeout(()=>{
        self.showTypeLoading = false;
      },500);
      if(value){
        self.activename = value;
        let showList    = []// 存放选中的列表 计算地图显示位置;
        if(window._NEW_TRAFFIC_AREA_TYPE){
          let areaObejct = window._NEW_TRAFFIC_AREA_TYPE;
          areaObejct.tags.forEach((item)=>{
            let showType = item.showType;
            if(showType === value){
              showList.push(item);
            }
          })
          //移除全部
          window.GisTrafficMap.remove(window._NEW_TRAFFIC_AREA_TYPE.tags);
          //显示该显示的
          setTimeout(()=>{
            window.GisTrafficMap.add(showList);
          },50)
          if(showList.length){ // 计算平均经纬度逻辑
            let center = [];
            let lats = [];
            let lngs = [];
            let postions = showList.map(x=>x.extData.position);

            let len      = postions.length;
            postions.forEach((x)=>{
              lats.push(x[0]);
              lngs.push(x[1]);
            });
            if(lats.length > 1){
              center[0] = lats.reduce((a,b) =>  (a*1 + b*1))/len;
              center[1] = lngs.reduce((a,b) =>  (a*1 + b*1))/len;
            }else if( lats.length === 1){
              center = [lats[0],lngs[0]];
            }else{
              return
            }
            GisTrafficMap.panTo(center);
            GisTrafficMap.setZoom(14.5);
          }
        }
        if(window._NEW_TRAFFIC_TERMINALAREA_TYPE){
           let areaObejct = window._NEW_TRAFFIC_TERMINALAREA_TYPE;
          areaObejct.tags.forEach((item)=>{
            let showType = item.showType;
            // if(showType === value){
              showList.push(item);
            // }
          })
          //移除全部
          window.GisTrafficMap.remove(window._NEW_TRAFFIC_TERMINALAREA_TYPE.tags);
          //显示该显示的
          setTimeout(()=>{
            window.GisTrafficMap.add(showList);
          },50)
          if(showList.length){ // 计算平均经纬度逻辑
            let center = [];
            let lats = [];
            let lngs = [];
            let postions = showList.map(x=>x.extData.position);

            let len      = postions.length;
            postions.forEach((x)=>{
              lats.push(x[0]);
              lngs.push(x[1]);
            });
            if(lats.length > 1){
              center[0] = lats.reduce((a,b) =>  (a*1 + b*1))/len;
              center[1] = lngs.reduce((a,b) =>  (a*1 + b*1))/len;
            }else if( lats.length === 1){
              center = [lats[0],lngs[0]];
            }else{
              return
            }
            GisTrafficMap.panTo(center);
            GisTrafficMap.setZoom(14.5);
          }
        }else{
          console.log(window._NEW_TRAFFIC_AREA_TYPE,'--查询不到?=')
        }
      }else{
        console.log('没有value')
      }
    },
    getClass(sub){
      let self = this;
      // console.log(sub,"sub--");
      let className = '';
      if(!sub){
        return
      }
      if(!sub.classify){
        return
      }
      if(self.activename == sub.classify){
        if(sub.classify_name){
          if(sub.classify_name.length > 8){
            className = "TsSliderCardItem-row-active ";
          }else{
            className = "   TsSliderCardItem-active";
          }
        }
      }
      return className
    },
    moveMap(item){
      let center = JSON.parse(item.coordinate)
      GisTrafficMap.setZoom(item.rank);//缩放级别
      GisTrafficMap.setPitch(item.inclination);//倾角
      GisTrafficMap.setRotation(item.rotation);//旋转角度
      GisTrafficMap.panTo([center.lng,center.lat]);//聚焦中心点
    },
    sortStatus(a, b) {
      return a.status - b.status
    },
    getStates(){
      let self = this;
      self.$api.getRestTree(_URL._V3._Traffic_STATUS).then(res=>{
        let Json = res.data;
        Json = Json.sort(self.sortStatus)
        if(Json && Json.length){
          self.status = res.data ||[]
        }
      })
    },
    getTypeCount(){
      let self = this;
      self.$api.getRestTree(`${_URL._V3._Traffic_TYPE_COUNT}`).then(res=>{
        // console.log(res,"区域类型");
        let Json = res.data;

        if(Json){
          Json = Json.sort((a,b)=>{
            //v2
            //return a.name.length - b.name.length;
            //v3
            //return a.type_name.length - b.type_name.length;
            return a.sort - b.sort;
          });
          Json.forEach((item)=>{
            //v2
            // if(item.name.length > 8){
            //v3
            if(item.classify_name.length > 6){
              item.longer = true;
            }else{
              item.longer = false;
            }
          })
        }
        Json = Json.filter(x=> x.classify_name.indexOf('危化品')> -1&&x.classify!=520511)
        Json = Json.filter(x=> x.classify_name !== ('危化品-危化品物流企业'));
        Json = Json.filter((x)=>{
          return  x.classify_name !== '危化品车辆专用通道' && x.classify_name !== '危化品车辆专用停车场'
        })


        self.typeList = Json||[];// 单元对象赋值
      })
    },
  }
}
</script>

<style lang="less">
@import './Index.less';

@import './slider.less';
.cicon
{
  color:rgb(114,218,255);
  font-size: 16px;
  margin-right: 0.5em;
}
// .clickActive:active {
//   background: url('imgs/boxbg.png') no-repeat center;
//   background-size: 100% 100%;
//   transition:  all 0.3s;
// }
</style>
