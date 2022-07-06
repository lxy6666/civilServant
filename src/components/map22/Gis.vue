<template lang="html">
  <div class="amap-warp" id='mapId'>

  </div>
</template>

<script>
//import GisJs from './Gis0.js';
import remoteLoad from "@/util/load.js";
import * as tool from "./tool.js";
import Model from "./Model.js";
import LoadMesh from "./loadMesh.js";
import AreaJson from "./area/index.js";
import MapText from "./mapText/index.js";

export default {
  name: "Gis",
  data() {
    const self = this;
    return {
      markerStats:{},
      isClock:false,
      v2List:[],
      GisMap: window.GisMap,
      areaList:[],
    };
  },
  computed: {
    showRight() {
      return this.$store.state.showRight;
    },
  },
  watch:{
    v2List(o,n){
      if(n.length === 3){
        window.v2List = this.v2List;
      }
    }
  },
  beforeRouteLeave(n,o,next){
    let self = this;
    self.$store.commit('setClock',false);
  },
  created(){
    let self = this;
    self.$store.commit('setClock',true);
    //self.initClock();
  },
  mounted() {
    let self = this;
    //self.$store.commit('loadMap',4000);

    function load() {
      if (window.AMap) {
        self.initMap();
        // 未载入高德地图API，则先载入API再初始化
      } else {
        setTimeout(() => {
          load();
        }, 500);
      }
    }
    load();
    setTimeout(()=>{
      self.initClock();
    },3000);


  },
  methods: {

    initClock(){
      let self = this;
      let clockFlage = self.$store.state.gisClock;
      if(clockFlage){
        setTimeout(()=>{
          self.getOverStates();
          self.initClock();
        },20000)

      }else{
        console.log('close clock')
        return
      }

    },
    getDiffList(oList=[],nList=[]){
      let diffList  =[];
      let sameList  = nList.filter(x=> oList.find((e)=>{
        return  (e.entity_id === x.entity_id && e.in_line   === x.in_line
                                             && e.count    === x.count)
      }));
      nList.forEach((x)=>{
          if(sameList.indexOf(x) == -1){
            diffList.push(x);
          }
      });
      return diffList;
    },
    markersResetContentV3(typeName,Json){
      let target = window.v3List.find(x=>x.type === typeName);
      console.log()
    },
    markersResetContent(typeName,Json){
      let self = this;
      let target = window.v2List.find(x=>x.type === typeName);
      if(self.markerStats && self.markerStats[typeName]){
        let diffList = self.getDiffList(self.markerStats[typeName],Json);
        if(diffList.length){
          diffList.forEach((x)=>{
            let t = target.markers.find(e=> e.entity_id === x.entity_id);
            if(t){ //设置更新后的状态标签
               let  content = MapText.setLabelContent(t.__Data,x);
               t.setLabel({
                 offset: new AMap.Pixel(-36, -46), //设置文本标注偏移量
                 content: content, //设置文本标注内容
                 direction: "right" //设置文本标注方位
               });
            }
          })
        }
        self.markerStats[typeName] = Json;
      }else{
        self.markerStats[typeName] = Json;
        Json.forEach((x)=>{
          let t = target.markers.find(e=> e.entity_id === x.entity_id);
          if(t){
            let  content = MapText.setLabelContent(t.__Data,x);
            t.setLabel({
              offset: new AMap.Pixel(-36, -46), //设置文本标注偏移量
              content: content, //设置文本标注内容
              direction: "right" //设置文本标注方位
            });
          }
        })
      }
    },
    getOverStates(){
      let self = this;
      if(!window.v2List){
        console.log('暂无数据list')
        return
      }
      //企业的
      self.$api.getRestTree(`${_URL._GET_DEVICE_STATE_C}`).then(res=>{
        if(res.data && res.data.length){
           let Json   = res.data;
           self.markersResetContent('factoryList',Json);
         }
      });
      //基础设施的
      self.$api.getRestTree(`${_URL._GET_DEVICE_STATE_I}`).then(res=>{
        if(res.data && res.data.length){
           let Json   = res.data;
           self.markersResetContent('infraList',Json);

        }
      });
      //敏感点的
      self.$api.getRestTree(`${_URL._GET_DEVICE_STATE_S}`).then(res=>{
        if(res.data && res.data.length){
           let Json   = res.data;
           self.markersResetContent('spotList',Json);
        }
      });
      //环保的




    },
    initMap() {
      let self = this;
      self.$store.commit("setMapLoading", true);
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      //init map
      window.GisMap = new AMap.Map("mapId", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 15.4,
        rotation: 0,
        viewMode: "3D", //开启3D视图,默认为关闭
        buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        zooms: [15, 20],
        center: window.ProjectConfig.MapCenter,
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building"]
        //["bg", "road", "building","point"]
      });


      //设置厂区加墨
      if(self.$store.state.gis3d){

        self.setMapFactoy();

      }

      self.setHeatMap();


      //地理
      //self.getArea();

      //设置白模
      //self.setModelBlock();
      self.setMapPlugin(GisMap);


      //设置热力图
      //设置title
      //self.setMapFactoyTitle();


      //地图缩放级别变化
      GisMap.on("zoomchange", function(e) {
        //zoom 层级 15 - 20 ;
        // 15 - 16 园区名字
        // 16 - 18 厂区名字
        // 18 - 20  区域名;
        self.setView()

      });



      //获取地图所有对象---
      let overlaysList = GisMap.getAllOverlays();


      self.$store.commit("setMapLoading", false);


      self.setLigth();

      //网络资源

      //self.setWalls();


      self.setOverBase()
      self.setOverTip();
      //self.setLocalArea();


      let factoryList = self.getAreaList('factoryList',{c:"#005be2",bg:"#005be2",opacity:0.6});
      let infraList   = self.getAreaList('infraList',{c:"#88ffcc",bg:"#88ffcc",opacity:0.6});
      let spotList    = self.getAreaList('spotList',{c:"#f9886c",bg:"#f9886c",opacity:0.6});

      //self.setCavnas(); //用于区域设置

      //  self.setWarn();
      //scan();
      //城墙

      //
      // var roundUnder  = new AMap.Circle({
      //   center:point_set,
      //   radius:500,
      //   strokeColor:'#005be2',
      //   fillColor:'#005be2',
      //   fillOpacity:'0.6',
      //   zIndex:1000
      // });
      //
      // GisMap.add(roundUnder);
      self.initWarn();
    },
    addRegularPrism (object3Dlayer,center, segment, height, radius) {
      var topColor = [0, 1, 1, 0.9];
      var topFaceColor = [1, 0.5, 1, 0.6];
      var bottomColor = [0, 0, 1, 0.8];
      var cylinder = new AMap.Object3D.Mesh();
      var geometry = cylinder.geometry;
      var verticesLength = segment * 2;
      var path = []
      for (var i = 0; i < segment; i += 1) {
        var angle = 2 * Math.PI * i / segment;
        var x = center.x + Math.cos(angle) * radius;
        var y = center.y + Math.sin(angle) * radius;

        path.push([x, y]);
        geometry.vertices.push(x, y, 0); //底部顶点
        geometry.vertices.push(x, y, -height); //顶部顶点

        geometry.vertexColors.push.apply(geometry.vertexColors, bottomColor); //底部颜色
        geometry.vertexColors.push.apply(geometry.vertexColors, topColor); //顶部颜色

        var bottomIndex = i * 2;
        var topIndex = bottomIndex + 1;
        var nextBottomIndex = (bottomIndex + 2) % verticesLength;
        var nextTopIndex = (bottomIndex + 3) % verticesLength;

        geometry.faces.push(bottomIndex, topIndex, nextTopIndex); //侧面三角形1
        geometry.faces.push(bottomIndex, nextTopIndex, nextBottomIndex); //侧面三角形2
      }

      // 构建顶面三角形,为了区分顶面点和侧面点使用不一样的颜色,所以需要独立的顶点
      for (var i = 0; i < segment; i += 1) {
        geometry.vertices.push.apply(geometry.vertices, geometry.vertices.slice(i * 6 + 3, i * 6 + 6)); //底部顶点
        geometry.vertexColors.push.apply(geometry.vertexColors, topFaceColor);
      }

      var triangles = AMap.GeometryUtil.triangulateShape(path);
      var offset = segment * 2;

      for (var v = 0; v < triangles.length; v += 3) {
        geometry.faces.push(triangles[v] + offset, triangles[v + 2] + offset, triangles[v + 1] + offset);
      }

      cylinder.transparent = true; // 如果使用了透明颜色，请设置true
      object3Dlayer.add(cylinder);
      GisMap.add(object3Dlayer);
      return cylinder
    },
    setLocalArea(){
      let self = this;
      var list = [];
      var colors = [ "#005be2","#88ffcc", "#3bb2d0", "#005be2", "#c2ff00",
      "#50667f", "#41afa5", "#f9886c", "#e55e5e",
      "#fbb03b", "#f42dac", ];
      var keys    = Object.keys(AreaJson.wallPath);
      if(!keys.length){ return  list};
      keys.forEach((key,index)=>{
        let opt   = {
          c : colors[index%10],
          bg : colors[index%10],
          opacity : 0.6
        };
        //  console.log(AreaJson.wallPath[key],'--------AreaJson.wallPath[key]-')
        var objectArea = tool.createBase(AreaJson.wallPath[key], opt, 100);
        list.push(objectArea);
      })
      window.map_area_part = list;
      GisMap.add(list);
      return list
    },
    setView(){
      var zoom = GisMap.getZoom();

      //if(!window.factoyTitles){return}
      if(!window.map_over_Tip){return}

      if(zoom >15.5 ){
        GisMap.remove(window.map_over_Tip)
        return
        GisMap.add(window.factoyTitles)
        GisMap.add(window.map_area_part)
        GisMap.add(window.map_area_factorys)



      }else{
        GisMap.add(window.map_over_Tip);
        return
        GisMap.remove(window.factoyTitles)
        GisMap.remove(window.map_area_part)
        GisMap.remove(window.map_area_factorys)

      }
    },
    setOverTip(){
      return
      let self = this;
      var content = `<div class="warnTip">
      <div class="borderCard active">
      <i class="borderCard-top"></i>
      <i class="borderCard-right"></i>
      <div class="borderCard-content">张店东部化工区</div>
      <i class="borderCard-left"></i>
      <i class="borderCard-bottom"></i>
      </div>
      <div class="warnTip-content">
      <div class="warnTip-item warnTip-item-half"><span class="t1">企业总数:</span><p>12个</p></div>

      <div class="warnTip-item warnTip-item-half"><span>污水处理厂:</span><p>1座</p></div>
      <div class="warnTip-item warnTip-item-half"><span>热电厂:</span><p>1座</p></div>
      <div class="warnTip-item warnTip-item-half"><span>一级危险源:</span><p>7处</p></div>
      <div class="warnTip-item warnTip-item-half"><span>二级危险源:</span><p>2处</p></div>
      <div class="warnTip-item warnTip-item-half"><span>三级危险源:</span><p>8处</p></div>
      <div class="warnTip-item warnTip-item-half"><span>四级危险源:</span><p>8处</p></div>
      </div>
      </div>`
      //
      var Marker =  new AMap.Marker({
        position: new AMap.LngLat(118.146981, 36.773704), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        content:content,
        map: GisMap,
        offset: new AMap.Pixel(260, -160),
        zIndex:1000
      });
      Marker.on('click',function(){
        if(self.$route.name ==='over'){return};
        self.$store.commit('loadMap',2000);
        self.$store.commit('changeRight',true);
        self.$router.push({name:'over'})
      });
      window.map_over_Tip =  Marker;
      return Marker
    },
    setOverBase(){
      let self = this;
      //单区域
      let opt   = {
        c : '#005be2',
        bg : '#005be2',
        opacity : 0.2
      };
      var objectBase = tool.createBase(AreaJson.areaPath['overWalls'], opt, 0);
      window.map_area_over = objectBase;
      GisMap.add(objectBase);
      return objectBase
    },
    setDomTest(){
      var div = document.createElement('div');
      // 将 canvas 宽高设置为地图实例的宽高
      div.className = 'testDiv'
      // 创建一个自定义图层
      var customLayer = new AMap.CustomLayer(div, {
        zIndex: 5,
        zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
      });
      GisMap.add(customLayer);
    },
    initWarn(){
      let self = this;
      self.$api.getRestTree(`${_URL._GET_ALARMS_ALL}?status=1000`).then(res=>{
        let Json = res.data;
        var object3Dlayer = new AMap.Object3DLayer({zIndex:1000});
        Json.filter(x=>x.area).forEach((item=>{
          let area  = item.area;
          let point_set = [area.longitude*1, area.latitude*1]
          var center_3d = GisMap.lngLatToGeodeticCoord(point_set);
          //self.addRegularPrism(object3Dlayer,center_3d.add(new AMap.Pixel(0, 0)),32, 34000, 40)//圆柱
          //self.setCavnas(point_set);
        }))
      });
    },
    setCavnas(center){
      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = 50;

      var context = canvas.getContext('2d')
      context.fillStyle = 'rgb(0,100,255)';
      context.strokeStyle = 'white';
      context.globalAlpha = 1;
      context.lineWidth = 2;

      var radious = 0;
      var draw = function () {
        context.clearRect(0, 0, 50, 50)
        context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
        radious = (radious + 1) % 25;

        context.beginPath();
        context.arc(25, 25, radious, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        //2D视图时可以省略
        CanvasLayer.reFresh();

        AMap.Util.requestAnimFrame(draw);
      };
      let sw = [center[0] - 0.002  ,center[1] - 0.002]
      let ne = [center[0] + 0.002  ,center[1] + 0.002]
      var CanvasLayer = new AMap.CanvasLayer({
        canvas: canvas,
        zIndex:600,
        bounds: new AMap.Bounds(
          sw,
          ne
        ),
        zooms: [3, 20],
      });

      CanvasLayer.setMap(GisMap);
      draw();
    },
    setMapFactoyTitle(){
      //创建文本
      let  factoyTitles = MapText.setText(MapText.itemList, GisMap);
      window.factoyTitles = factoyTitles;
    },
    setAreaBase(typeId,pathList=[]){//地面基色
      var list = [];
      let self = this;
      var colors = [ "#005be2","#88ffcc", "#3bb2d0", "#005be2", "#c2ff00",
      "#50667f", "#41afa5", "#f9886c", "#e55e5e",
      "#fbb03b", "#f42dac", ];
      if(!pathList.length){return list};

      pathList.forEach((item,index)=>{
        let opt   = {
          c : colors[index%10],
          bg : colors[index%10],
          opacity : 0.6
        };
        var objectArea = tool.createBase(JSON.parse([item.longitudelatitude]), opt, 200);
        list.push(objectArea);
      });

      window[`map_area_${typeId}`] = list;
      GisMap.add(list);
      return list
    },
    getArea(){
      let self = this;
      self.$api.getRestTree(`${_URL._GET_AREA}?page=1&size=999`).then(res=>{
        console.log(res,"get区域===");
        let list = res.data.data;
        if(list.length){
          let roadList = [];
          let f = [];

          list.forEach((item)=>{
            if(item.gid == '683913282272235520'){
              roadList.push(item);
            }else{
              f.push(item);
            }
          })
          window['map_area_roadList'] = self.setAreaBase('road',roadList);
          window['map_area_factorys'] = self.setAreaBase('factorys',f);


          setTimeout(()=>{
            self.setView();
          },1000)
        }
      });
    },
    setWalls(){
      var wallLayer = tool.createLayer(100);
      GisMap.add(wallLayer);
      var colors = [ "#88ffcc", "#3bb2d0", "#005be2", "#c2ff00",
      "#50667f", "#41afa5", "#f9886c", "#e55e5e",
      "#fbb03b", "#f42dac"  ];
      var keys    = Object.keys(AreaJson.wallPath);
      if(!keys.length){ return  wallLayer};
      keys.forEach((key,index)=>{
        var objectWall = tool.createdWall(AreaJson.wallPath[key],{h:80,c:colors[index%10]});
        wallLayer.add(objectWall);
      })
      return wallLayer
    },
    setModelBlock(){//白模
      //LoadMesh 设置白模
      let meshBlockContent =  new AMap.Object3DLayer(0);
      GisMap.add(meshBlockContent);
      let oMlist = [...LoadMesh.zl, ...LoadMesh.mx, ...LoadMesh.yss,...LoadMesh.zzl];
      let meshBlocks = LoadMesh.getMeshBlock(oMlist);
      meshBlocks.forEach(x => {
        meshBlockContent.add(x);
      });
      //暴露全局白模
      window.meshBlockContent = meshBlockContent;


      return meshBlockContent;
    },
    setMapPlugin(GisMap){
      AMap.plugin(
        ["AMap.ToolBar", "AMap.Scale", "AMap.MapType", "AMap.ControlBar"],
        function() {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          // GisMap.addControl(
          //   new AMap.ToolBar({
          //     position: "RB"
          //   })
          // );
          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          GisMap.addControl(new AMap.Scale());
          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          //  GisMap.addControl(new AMap.Geolocation());
          GisMap.addControl(new AMap.MapType());

          GisMap.addControl(
            new AMap.ControlBar({
              position: {
                bottom: "-176px",
                right: "0"
              }
            })
          );
        }
      );
    },
    setMapFactoy(){ // glft模型为 200 层级
      //模拟3D建模  models文件

      var modelPlace = new AMap.Object3DLayer({zIndex:200,opacity:0.8});
      GisMap.add(modelPlace);
      //Model.setBuilsAwait(GisMap, modelPlace,,Model.Models); //递归单一加载
      Model.setBuilsAysnc(GisMap, modelPlace,Model.Models); // 异步同时加载
      //Model.loadQXZ(GisMap, modelPlace);
      window.modelPlace = modelPlace;
    },
    setHeatMap() {
      let self = this;
      let Dlist = AreaJson.Dlist;
      let heatList = [];
      Dlist.forEach(item => {
        let num = Math.random() * 85;
        let obj = {
          lng: item[0],
          lat: item[1],
          count: num
        };
        heatList.push(obj);
      });

      var heatMap = new Loca.HeatmapLayer({
        map: window.GisMap,
        zIndex:80,
      });

      var list = [];
      var i = -1,
      length = heatList.length;
      while (++i < length) {
        var item = heatList[i];
        list.push({
          coordinate: [item.lng, item.lat],
          count: item.count
        });
      }

      heatMap.setData(list, {
        lnglat: "coordinate",
        value: "count",
      });

      heatMap.setOptions({
        style: {
          radius: 30,
          color: {
            0.5: "#2c7bb6",
            0.65: "#abd9e9",
            0.7: "#ffffbf",
            0.9: "#fde468",
            1.0: "#d7191c"
          },
        },
      });
      window.heatMap = heatMap;
      /// 3d相关
    },
    setLigth(){
      //环境光 蓝色
      // GisMap.AmbientLight = new AMap.Lights.AmbientLight([0,0.156, 0.486],1);
      // GisMap.DirectionLight = new AMap.Lights.DirectionLight(
      //   [1, 200, 120],
      //   [1,1, 1],
      //   0.4
      // );

      //白色
      GisMap.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.8);
      GisMap.DirectionLight = new AMap.Lights.DirectionLight(
        [1, 200, 120],
        [1, 1, 1],
        0.3
      );


      // GisMap.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.8);
      // GisMap.DirectionLight = new AMap.Lights.DirectionLight([-1, -1, 2], [1, 1, 1], 0.3);
      var center = GisMap.getCenter();
      var layer  = new AMap.Object3DLayer();
      GisMap.add(layer);
    },
    getAreaList(key,option={c:"#005be2",bg:"#005be2",opacity:0.6}){// 敏感点
      let self = this;
      let list =  self.$store.state[key];
      if(!window[`${key}Count`]){
        window[`${key}Count`] = 0;
      }
      list =list.filter(x=>x.longitudelatitude);
      if(list && list.length){
        let AreaList = [];
        let opt   = {
          c : (option.c),
          bg : (option.bg),
          opacity : (option.opacity) || 0.6
        };
        list.forEach((item)=>{
          var objectArea = tool.createBase(JSON.parse(item.longitudelatitude),opt, 100);
          AreaList.push(objectArea);
          item.title = item.name;
          item.position = [item.longitude,item.latitude];
          item.loadId   = item.gid;
          objectArea.exData = item;
          objectArea.areaType = item.type;  // 类型
          objectArea.areaTypeName = item.typeName; //类型名称 2级名称;
          GisMap.add(AreaList);
        });
        console.log(key,list,"类型和对应的list===chuanru1111");
        let Markers = MapText.setText(list,GisMap);
        self.v2List.push({
          type:key,
          areas:AreaList,
          markers:Markers
        });
        console.log(self.v2List,"v2List--");
        return {
          type:key,
          areas:AreaList,
          markers:Markers
        }
      }else{
        if(window[`${key}Count`]>10){
          window[`${key}Count`]= 0;
          return {
            type:key,
            areas:[],
            markers:[]
          }
        }else{
          window[`${key}Count`] = window[`${key}Count`]*1 +1;
        }
        setTimeout(()=>{
          this.getAreaList(key,option);
        },1000)
      }
    },
  }
};
</script>

<style lang="less">
  .amap-warp {
    width: 100%;
    // margin: 8px;
    // height: calc(~"100vh - 60px");
    height:100vh;
    transition: all 0.4s;
  }

.amap-toolbar {
  position: absolute;
  bottom: 30px !important;
  right: 30px !important;
}
.amap-scale-text {
  color: #fff;
}

.amap-overlay-text-container {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  background-color: rgba(59, 68, 137, 0.8);
  width: 15rem;
  border-radius: 0 24px 0 4px;
  //transform: scale(0.86);
  text-align: center;
  font-size: 20px;
  color: #95c8ff;
  border-right: none;
  border-top: none;
  border-left: 2px solid rgba(126, 169, 248, 0.8);
  border-bottom: 2px solid rgba(126, 169, 248, 0.8);
  border: none;
  overflow: visible;
}

.amap-overlay-text-container::before {
  display: block;
  content: "";
  position: absolute;
  width: 90%;
  left: 5%;
  bottom: 0;
  height: 2px;
  color: rgba(5, 173, 210, 8);
  background: rgba(5, 173, 210, 8);
  box-shadow: 0 0 10px rgb(5, 173, 210);
}
.amap-overlay-text-container::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 20px;
  //background: red;
  left: 0;
  bottom: -20px;
}


@bc: rgba(59, 68, 137, 0.4);
.warnTip{
  width: 320px;
  min-height: 240px;
  background:@bc;
  //  transform: translateX(260px);
}

.warnTip-content
{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top:12px;
  padding-bottom: 12px;
}

.warnTip-item
{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color:#fff;
  padding-left: 12px;
  line-height: 2em;
  span{
    font-size: 16px;
    text-align: justify;
  }
  p{
    font-size: 16px;
    padding-left:.6em;
    margin: 0;
    color:rgba(65,255,255,1);
    text-shadow: 0 0 3px rgba(65,255,255,.8);
    text-align: right;
  }
}
.warnTip-item-half
{
  width: 50%;
}
.testDiv{
  width: 80px;
  height: 80px;
  background: red;
}
</style>
