<template lang="html">
  <div class='mapArea'>
    <p class='fixTest'></p>
    <!-- {{sensitivedetail}} -->
    <!-- <loading  class='loadingMap'   v-show='loadingFlage' /></loading> -->
    <!-- <tool
      :PointRow='PointRow' :PointType='PointType'
      @saveAdd='saveAdd' @backBefor='backBefor'
      :areaType='areaType' :entityID='entityID'
      :centerList='[center_X,center_Y]'
      :updateFlag ='updateFlag'
      :pointList='pathList[JSON.stringify(PointRow.id)]'> </tool> -->
    <!-- <map-three   v-if='showThree'/> -->
    <Gis  :class='!showThree ? "":"deepHide" '/>
    <car-tool :lineArr='lineArr' :sensitivedetail='sensitivedetail' :useType="useType"></car-tool>
  </div>
</template>

<script>
import Gis from './MiniMap.vue';
import CarTool from './CarTool.vue';
import _API from '../../util/api';
import _URL from '../../util/url';
import { now } from 'moment';
// import _Cookie from '../../util/cookie';
// import _FORM from '../../util/form.js';
// import mapThree from '../three/Index.vue'
//import Three from './Three.vue';

export default {
  name:'mapView',
  components:{
    Gis,
    CarTool,
  },
  props: {
    PointRow: {
      type: Object
    },
    entityID:{
      type: String
    },
    PointType:{
      type: String
    },
    NowTime:{
      type:Date
    },
    areaType:{
      type:String
    },
    sensitivedetail:{
      type: Object
    },
    lineArr:{
      type: Array
    },
    useType:{
      type:String,
      default:'gps'
    }
  },
  data(){
    return{
      polygon:{},
      areaList:[],
      pathList:{},
      polyEditor:{},
      marker:{},
      center_X:null,
      center_Y:null,
      updateFlag:true,
      areaLists:{
        cular:{//特定区域
        name:'特定区域',
        url:_URL._MONITOR_AREA,
        },
        car:{//车辆区域
        name:'车辆区域',
        url:_URL._ROAD_AREA,
        },
        point:{//车辆区域
        name:'监测点',
        url:_URL._MONITOR_AREA,
        },
      },
      // lineArr:[[118.130602, 36.769688],[118.132957, 36.770371],[118.135046, 36.770644],[118.137283, 36.770507],[118.139595, 36.769825],[118.141683, 36.769116],[118.142355, 36.770328],[118.142813, 36.771421],[118.143186, 36.772786],[118.143378, 36.773554],[118.14472, 36.773563],[118.145967, 36.773529],[118.147192, 36.773512]],
    }
  },
  created(){
    let self = this;
    // this.getList();
    self.$store.commit('loadMap');
  },
  methods:{
    cleanArea(){
      let  self = this;
      if(!!(self.PointRow.id)){
        console.log(self.polyEditor,'self.polyEditor')
        self.polyEditor[JSON.stringify(self.PointRow.id)].close();
      }
      console.log(self.areaList,'areaListareaListareaList')
      // return
      console.log(self.polygon,'self.polygon')
      this.areaList.forEach(item=>{
          console.log('11111')
          let name = JSON.stringify(item.id)
          if(!!(self.polygon[name])){
            self.polyEditor[name].close();
            GisMap.remove(self.polygon[name]);
          }
          self.clearMarker(name);
      })
    },
    saveAdd(){
      this.cleanArea();
      this.getList();
      // self.polyEditor[JSON.stringify(PointRow.id)].close();

      // this.$emit('saveAdd')
    },
    backBefor(){
      this.cleanArea();
      console.log('backBefor3')
      this.$emit('backBefor')
    },
    makeMap(paths,center_x,center_y,name,row){
      let self = this;
      self.pathList[name] = paths;
      self.polygon[name] = new AMap.Polygon({
        path: self.pathList[name],
        strokeColor: "#FF33FF",
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: row.area_color,
        zIndex: 50,
      })
      // return
      window.GisMap.add(self.polygon[name])
      self.polyEditor[name] = new AMap.PolyEditor(window.GisMap, self.polygon[name])
      self.polyEditor[name].on('adjust', function(event) {//移动原有点时出发
        console.log('触发事件：adjust')
        console.log(self.pathList[name],'this.pathhhhh1111 ')
        // console.log(self.PointRow.id,'this.pathhhhh ')
        self.updateFlag = false;
        self.clearMarker(name);//清除原有中心点标记
        self.getPolygonAreaCenter(self.pathList[name],name,row);//设置新的标记
      })
      self.polyEditor[name].on('addnode', function(event) {
        self.updateFlag = false;
        self.clearMarker(name);//清除原有中心点标记
        self.getPolygonAreaCenter(self.pathList[name],name,row);//设置新的标记
      })
      self.polyEditor[name].on('removenode', function(event) {
        // log.info('触发事件：removenode')
        self.updateFlag = false;
        self.clearMarker(name);//清除原有中心点标记
        self.getPolygonAreaCenter(self.pathList[name],name,row);//设置新的标记
      })
      // console.log(self.polygon,'self.polygonself.polygon')
      // 缩放地图到合适的视野级别
      // window.GisMap.setFitView([self.polygon[name]]);
      // console.log(self.polygon,'polygonpolygon')
      this.addMarker(center_x,center_y,name,row);//添加标记
    },
    addMarker(xx,yy,name,row) {//添加标记方法
       var content = `<div class="warnTip">
          <div class="borderCard active">
            <i class="borderCard-top"></i>
            <i class="borderCard-right"></i>
            <div class="borderCard-content" style="background-color:${row.background_color} !important;color:${row.word_color}">${row.name}</div>
            <i class="borderCard-left"></i>
            <i class="borderCard-bottom"></i>
          </div>
      </div>`
      this.marker[name] = new AMap.Marker({
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          position: [xx,yy],
          map: GisMap,
          content:content,
          offset: new AMap.Pixel(-60, -20),
      });
      this.center_X = xx;
      this.center_Y = yy;
      this.marker[name].setMap(GisMap);
    },
    getList(){//获取当前区域列表
        let self  = this;
        let query = `?page=1&size=999`;
        _API.getRestTree(`${self.areaLists[self.areaType].url}${query}`).then(res=>{
            console.log(res,"区域列表 res====");
            this.areaList = res.data.data;
            let index = 1;
            // return
            this.areaList.forEach((item,index)=>{
              // console.log(item.longitudelatitude,"item.longitudelatituderes====",index++);
              self.makeMap(JSON.parse(item.longitudelatitude),item.longitude,item.latitude,JSON.stringify(item.id),item)
            })
            // return
            if(!!(self.PointRow.id)){
              console.log(self.polyEditor,"self.polyEditor");
              console.log(self.PointRow.id,"self.polyEditor");
              let poloy = self.polyEditor[JSON.stringify(self.PointRow.id)];
              console.log(poloy,"self.polyEditor");
              poloy.open();
            }
        }).catch(err=>{
            console.log(err,"监测点err");
            self.$Message.error({
                content: err.response,
            });
        });
    },
    clearMarker(name) {//清除中心点标记
      if (this.marker[name]) {
         console.log(this.marker[name],'namename')
          this.marker[name].setMap(null);
          this.marker[name] = null;
      }
    },
    Area(p0,p1,p2){//计算中心点坐标
      var area = 0.0 ;
      area = p0.lng * p1.lat + p1.lng * p2.lat + p2.lng * p0.lat - p1.lng * p0.lat - p2.lng * p1.lat - p0.lng * p2.lat;
      return area / 2 ;
    },
    getPolygonAreaCenter(points,name,row) {
      let self = this;
      let sum_x = 0;
      let sum_y = 0;
      let sum_area = 0;
      let p1 = points[1];
      let p2 = [];
      // debugger;
      console.log(points,'pointspointspoints')
      for (var i = 2; i < points.length; i++) {
          p2=points[i];
          let area = self.Area(points[0],p1,p2) ;
          sum_area += area ;
          sum_x += (points[0].lng + p1.lng + p2.lng) * area;
          sum_y += (points[0].lat + p1.lat + p2.lat) * area;
          p1 = p2 ;
      }
      this.center_X = sum_x / sum_area / 3;
      this.center_Y = sum_y / sum_area / 3;
      this.addMarker(this.center_X,this.center_Y,name,row);//添加标记
    },
  },
  watch:{
    NowTime:{
      handler(newName,oldName){
        this.getList();
      }
    },
    PointRow:{
      handler(newName,oldName){
        // let self = this;
        // // self.saveAdd();
        // console.log(oldName,'oldNameoldNameoldName')
        // if(oldName){
        //   let oldname = oldName.id;
        //   if(self.polyEditor[oldname]){
        //     self.polyEditor[oldname].close();
        //   }
        // }
        if(newName){
          console.log(newName,'newNamenewNamenewName')
          if(!!(newName.latitude)){
            GisMap.panTo([newName.longitude,newName.latitude]);
          }
          let name = JSON.stringify(newName.id)
          localStorage.setItem('oldPoint',name);
          // GisMap.setFitView([self.polygon[name]]);
          let pointList = [];
          // GisMap.remove(self.polygon)
          // this.makeMap(JSON.parse(newName.longitudelatitude),newName.latitude,newName.longitude,name)
          // pointList = self.pathList[name],
          // self.polyEditor[name].open();
          // this.polyEditor = new AMap.PolyEditor(window.GisMap, this.polygon)
          // this.polyEditor.open();
          // self.polyEditor[name].on('adjust', function(event) {//移动原有点时出发
            // console.log('触发事件：adjust')
            // console.log(pointList,'self.polyEditorself.polyEditor')
            // self.clearMarker(name);//清除原有中心点标记
            // self.getPolygonAreaCenter(pointList,name);//设置新的标记
          // })
        }
      }
    }
  },
  computed:{
    loadingFlage(){
      return this.$store.state.mapLoad
    },
    showThree(){
      return this.$store.state.showThree
    }
  },
}
</script>

<style lang="less">
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
</style>
