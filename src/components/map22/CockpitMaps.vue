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
      markForm:{},
      markerFlag:{},
    }
  },
  props:{
    type:{
      type:String,
    },
    markTime:{
      type:Number,
    },
    markList:{
      type:Array,
    },
    hideList:{
      type:Array,
    },
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
  },
  watch: {
    markTime :{
      handler(newName,oldName){
        let self = this;
        setTimeout(() => {
          let zoom = [14.4,20]
          self.CockpitMap.setZoom(zoom);
          this.hideList.forEach(item=>{
            if(item.center && item.center != '{}'){
              self.markerFlag[item.id].hide();
            }
          })
          this.markList.forEach(item=>{
            if(item.center && item.center != '{}'){
              // let marker = {};
              self.markerFlag[item.id]  = self.createPointTag(item,false);//中心点marker
              self.markerFlag[item.id].setMap(self.CockpitMap);
              self.markerFlag[item.id].show();
            }
          })

        }, 400);
      }
    }
  },
  methods:{
    createPointTag(item,isDraggable,callback = function(e){}){
      let self   = this;
      let mcontent = '';
      let lcontent = ''
      let center = JSON.parse(item.center);
      mcontent = `<span class="iconNone"'></span> `;
      lcontent = `
        <div class="markers">
          <div class='markers-title'>
          ${item.name}
          </div>
        </div>`;
      let marker = new AMap.Marker({
        position:new AMap.LngLat(center.lng,center.lat),
        content:`
        <div class="icon_border">
          <div class="icon_title">${item.name}</div>
          <i class='iconfont ${item.icon_string} icon_icon' >
        </div>
        `, //设置文本标注内容
        // offset: new AMap.Pixel(2, -58),
        direction: "center", //设置文本标注方位
        draggable:(!!isDraggable),
      });
      marker.on('click',()=>{
        self.$emit('tagClcik',item);
      })
      return marker;
    },
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
            self.$emit('mapClick',item)
            self.clearTag();
            self.clearAreaColor();
            let lcontent = MapMethods.setLabelContent(item,self.type);
            tag.setLabel({
              offset: new AMap.Pixel(0,0), //设置文本标注偏移量
              content:  `<div class="cockpitmark ">
                          <div class="cockpitmark-top">
                              <div class="cockpitmark-top-icon mr-1">
                                <svg  class="tagSvg" aria-hidden="true" '>
                                  <use xlink:href="${item.icon||item.icon_string|| '#iconjuanchengbaolilai'}"></use>
                                </svg>
                              </div>
                              <div class="cockpitmark-top-text">${item.name}</div>
                          </div>
                        </div>`, //设置文本标注内容
              direction: "center" //设置文本标注方位
            });
            tag.area.setOptions({
              strokeOpacity:1,
              strokeWeight:2,
              strokeColor:'#FFFF00',
              zIndex:3000,
            });
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
.markers{
  border: 1px solid red;
  display: flex;
  &-title{
    background:rgba(0,0,0,1);
    text-align: center;
    // height:19px;
    // display: flex;
    // border-radius:11px;
  }
}
 .icon_border{
  // border: 1px solid black;
  display: flex;
  flex-direction: column;

  // border:1px solid red;
  text-align: center;
  // justify-content: center;
  .icon_title{
    // border:1px solid red;
    background:rgba(0, 0, 0, 1);
    border-radius:100px;
    color:rgba(100, 210, 255, 1);
    line-height:30px;
    // margin: 12px 0;
    // text-align: center;
    padding: 0 8px;
    margin-left: -100%;
    margin-top: -50%;
  }
  .icon_icon{
    width: 46px;
    font-size: 20px;
    color:rgba(100, 210, 255, 1);
    height:54px;
    display: block;
    border:1px solid red;
    // margin: 0 auto;
    margin-left: -23px;
    // margin-top: -50%;
  }
}
.icon_icon{
    width: 46px;
    font-size: 20px;
    color:rgba(100, 210, 255, 1);
    height:54px;
    display: none;
    border:1px solid red;
    margin: 0 auto;
  }
</style>
