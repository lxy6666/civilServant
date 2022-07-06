<template lang="html">
  <div class="cockpitMap"  id='CockpitMap'></div>
</template>

<script>
import * as tool from "./tool.js";
import Model from "./Model.js";
import MapMethods from "@/components/map/Cockpit.js";
window._COCKPIT_AREA = [];
export default {
  name:'CockpitMap',
  data(){
    return{
      loadCount:0,
      makersList:[],
      areaList:[],
      areaMarker:[],
      CockpitMap:{},
      aqiList:[],
    }
  },
  props:{
    type:{
      type:String,
    }
  },
  beforeRouteLeave(n,o,next){ //路由离开事件
    let self = this;

    next();
  },
  components:{
  },
  mounted(){
    let self = this;
    let load = function(){
      if(window.AMap){
        self.initMap();
      }else{
        if(self.loadCount < 10){
          self.loadCount ++;
          setTimeout(()=>{
            load();
          },500)
        }else{
          console.log('加载失败网络异常 刷新重试')
          return
        }
      }
    }()
  },
  computed:{
    showName(){
      return this.$route.name
    },
    dayAQI(){
      console.log(this.$store.state.dayAQI,'this.$store.state.dayAQI')
      return this.$store.state.dayAQI;
    }
  },
  methods:{
    initMap(){
      console.log('init');
      let self   = this;
      let CockpitMap = new AMap.Map("CockpitMap", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 14.4,
        rotation: 0,
        buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        zooms: [14.4, 20],
        // dragEnable:false,//不可拖拽
        // zoomEnable:false,//不可缩放
        center: window.ProjectConfig.MapCenter,
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building"],
        viewMode: "3D",
      });
      self.CockpitMap = CockpitMap;
      // self.setMapBorder(CockpitMap);
      self.getArea();
    },
    clearTag(){//清除marker样式
      let self = this;
      self.areaMarker.forEach((x)=>{
        let opt = MapMethods.statusCode[x.extData.status]|| statusCode[16001];
        let lcontent = MapMethods.setSimpleContent(x.extData,opt);
        x.setLabel({
          offset: new AMap.Pixel(0,0), //设置文本标注偏移量
          content: lcontent, //设置文本标注内容
          direction: "center" //设置文本标注方位
        });
      });
    },
    clearAreaColor(){//清除选中的样式 clear
      let self = this;
      self.areaMarker.forEach((x)=>{
        if(x.area){
          let opt = x.area.opt
          x.area.setOptions({
            strokeWeight: 1.5,
            strokeOpacity: 1,
            strokeColor:opt.strokeColor,
            fillOpacity:opt.fillOpacity,
            fillColor:opt.fillColor,
            zIndex:300,
          });
        }
      });
    },
    setMapBorder(map){
      //张店 边界
      let southWest = new AMap.LngLat(118.112128,36.749653);
      let northEast = new AMap.LngLat(118.187082,36.788418);
      let mapBorder = new AMap.Bounds(southWest, northEast);
      map.setLimitBounds(mapBorder)
    },
    getAQI(item,callback){
      let self = this;
      let id = item.gid;
      let st   = TimeTool.BeforeAweekStart; //一周之前
      let et   = TimeTool.DayEnd;// 今天结束
      let list = TimeTool.getWeekList();
      self.aqiList = [];
      let body = {
        end_time:et,
        start_time:st,
        time:list,
      };
      if(item.type_value_name == "企业"){
        // item.gid
        body.gid = id;
      }
      let params = {
        url:`${_URL._V3._COCKPIT_AQI}`,
        body:body
      };
      self.$api.postRestTree(params).then(res=>{
        let Json = res.data.data;
        list.forEach(item=>{
          let target = Json.find(x=>x.datetime==item);
          let rank ;
          let color = '';
          let backgroundcolor = '';
          let border = '';
          if(!target){
            return;;
          }
          if(target.value<=50&&target.value>=0){
            rank = '优'; color = 'rgba(109,212,0,1);'; backgroundcolor = 'rgba(15,114,15,0.2) !important;'; border = '1px solid rgba(20,100,20,1);!important;';
          }else if(target.value<=100&&target.value>50){
            rank = '良'; color = 'rgba(214,181,30,1);'; backgroundcolor = 'rgba(79,73,0,0.38) !important;';  border = '1px solid rgba(105,95,13,1);!important;';
          }else if(target.value<=150&&target.value>100){
            rank = '轻度污染';  color = 'rgba(255,127,2,1);'; backgroundcolor = 'rgba(150,77,15,0.25) !important;'; border = '1px solid rgba(120,81,20,1);!important;';
          }else if(target.value<=200&&target.value>150){
            rank = '中度污染'; color = 'rgba(255,92,91,1);'; backgroundcolor = 'rgba(215,71,70,0.26) !important;'; border = '1px solid rgba(163,58,68,1);!important;';
          }else if(target.value<=300&&target.value>200){
            rank = '重度污染'; color = 'rgba(230,45,204,1);'; backgroundcolor = 'rgba(50,27,73,1) !important;';    border = '1px solid rgba(141,48,111,1);!important;';
          }else if(target.value>300){
            rank = '严重污染'; color = 'rgba(235,24,1,1);'; backgroundcolor = 'rgba(199,15,15,0.25) !important;';  border = '1px solid rgba(147,31,31,1);!important;';
          }
          let style = '';
          style = `color:${color}background-color:${backgroundcolor}border:${border}`;
          console.log(style,'stylestylestyle')
          let obj = {
            rank:rank,
            date:target.datetime.substring(8,10)+'日',
            value:target.value,
            time:target.datetime,
            style:style,
          };
         self.aqiList.push(obj);
        });
        callback();
        // let obj = {
        //   string : 'dayAQI',
        //   thing : self.aqiList[6]
        // };
        // self.$store.commit('setThing',obj);
      }).catch(err=>{
        console.log(err,'aqi=err');
      });
      return self.aqiList[6];
    },
    getArea(){//_FULL_AREA  园区：510000  企业：530000
      let self = this;
      async function load(){
        let park = await self.$api.getRestTree(`${_URL._V3._FULL_AREA}?typeValue=510000`);
        let company = await self.$api.getRestTree(`${_URL._V3._FULL_AREA}?typeValue=530000`);
        self.areaList = [...park.data,...company.data];
        cockpitList = self.areaList;
        self.areaList.forEach((item)=>{
          let center = JSON.parse(item.area.center);
          item.title = item.name;
          item.position = [center.lng,center.lat];
        });
        self.areaMarker = MapMethods.setTags(cockpitList,self.CockpitMap,self.type,function(item,tag){
          tag.on('click',(e)=>{
            console.log(item,'eeeeeeee')
            self.$emit('mapClick',item)
            self.clearTag();
            self.clearAreaColor();
            let aqi = {};
            self.getAQI(item,() => {
              aqi = self.aqiList[6];
              console.log(aqi,'aqiaqiaqiaqiaqi');
              console.log(self.aqiList,'aqiaqiaqiaqiaqi');
              let content = `
                <div class="cockpitmark ">
                  <div class="cockpitmark-top">
                      <div class="cockpitmark-top-icon mr-1">
                        <svg  class="tagSvg" aria-hidden="true" '>
                          <use xlink:href="${item.icon||item.icon_string|| '#iconjuanchengbaolilai'}"></use>
                        </svg>
                      </div>
                      <div class="cockpitmark-top-text">${item.name}</div>
                  </div>
                  <div class="cockpitmark-btm">
                    <p v-if="${self.type}=='cockpit'" style='${aqi.style} border:none;background-color:rgba(0,0,0,0) !important;'>AQI:${aqi.value}</p>
                    <div class="aqibtn" style='${aqi.style}' v-if="${self.type}=='cockpit'">${aqi.rank}</div>
                  </div>
                </div>`;
            // let lcontent = MapMethods.setLabelContent(item,self.type);
                tag.setLabel({
                  offset: new AMap.Pixel(0,0), //设置文本标注偏移量
                  content: content, //设置文本标注内容
                  direction: "center" //设置文本标注方位
                });
                tag.area.setOptions({
                  strokeOpacity:1,
                  strokeWeight:2,
                  strokeColor:'#FFFF00',
                  zIndex:3000,
                });
              });
            
            // setTimeout(, 400);
            // return 
            
          });
        });
      }
      load();
    },
  }
}
</script>

<style lang="less">
.cockpitMap
{
  width:100%;
  height:100%;
}


</style>
