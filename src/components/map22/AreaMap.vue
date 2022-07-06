<template lang="html">
  <div class='mapContent'>
    <!-- <div class="amap-warp" id='GisComponent'></div> -->
    <div class="amap-warp" :id='gisid'></div>
    <div class="actionPart">
      <div class="">
        <span class='mr-2' >放大级别:{{angleData.zoom}}</span>
      </div>
      <div class="dialogs-flexrow" v-if="areatype==1000" >
        <button class="dialogs-btnshadow mr-1" @click='setCircle'>开始编辑</button>
        <!-- <button  class='dialogs-btnshadow copyBtn mr-1' :data-clipboard-text="sendDataJson"
         @click='copyData' >复制参数</button> -->
        <button class="dialogs-btnshadow mr-1" @click='sendData'>确认提交</button>
        
        <!-- <button :disabled='!hasData' :class="hasData ? 'dialogs-btnshadow': 'dialogs-btnshadow btndisabled'"
         v-show='viewType== "area"'  @click='resetMap' >重绘</button> -->
      </div>
    </div>
  </div>

</template>

<script>
import Clipboard from 'clipboard';

import Model from "./Model.js";
// console.log(Clipboard,'---Clipboard--')
export default {
  name:'GisComponent',
  props:{
    setMoldeType:{
      type:String,
      default:'area',
    },
    showSatellite:{
      type:Boolean,
      default:false,
    },
    timeStamp:{
      type:Number
    },
    angleobj:{
      type:Object,
    },
    areaobj:{
      type:Object,
    },
    areatype:{
      type:Number
    },
    mapAccept:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data(){
    return{
      formData:{},//输出数据
      GisComponent:{},// map对象
      targetPolygon:{},//编辑区域多边形
      polyEditor:{},//多边形编辑器
      targetMarker:{},// 多边形 标记自动生成的绘制 点标记
      path:[],//多边形path
      drawState:'init',
      // state : init drawing edit
      viewType:'marker', // area 区域模式
      mouseTool:{},// 鼠标工具.
      retryCount:0,
      hasData:false,
      circle:{},
      circleEditor:null,//编辑圆形区域
      isedit:false
    }
  },
  computed:{
    sendDataJson(){
      let self = this;
      return JSON.stringify(this.formData);
    },
    gisid(){
      let self = this;
      // console.log('GisComponent'+self.areatype,'gisid--');
      return 'GisComponent'+self.areatype
    },
    angleData(){
      let self   = this;
      let data = {};
      let center ={
        lng:118.144588,
        lat:36.772305
      };
      let map    = self.GisComponent;
      if(self.targetMarker && self.targetMarker.getPosition){
        // console.log('有marker');
        center = self.targetMarker.getPosition();
      }
      if(map && map.getZoom){
        let rotation = map.getRotation();
        let pitch = map.getPitch();
        let zoom  = map.getZoom();
          data = {
            type:self.viewType,
            center : {
              lng:center.lng||0,
              lat:center.lat||0
            },
            lng:center.lng||0,
            lat:center.lat||0,
            rotation:rotation,
            pitch:pitch,
            zoom:zoom,
          };

      }
      // console.log(data,"data---");
      return data
    }
  },
  watch:{
    timeStamp(newVal,oldVal){
      let self = this;
      console.log(self.areatype,"type==");
      self.initMap();
    },
  },
  mounted(){
    let self = this;
    //初始化进程
    function loadMapCheck(){
      if(self.retryCount > 10){ //判断重连次数
        console.log('地图加载失败网络异常');
      }
      if(window.AMap){
        self.viewType = self.setMoldeType ||'area';
        self.initMap();
      }else{
        self.retryCount ++;
        setTimeout(()=>{
          loadMapCheck()
        },1000)
      }
    }
    loadMapCheck()
  },
  beforeDestroy(){
    // console.log("地图销毁--");
  },
  methods:{
    setMapPlugin(GisMap) {
      AMap.plugin(//通过AMap.plugin方法按需引入插件
        [
          // "AMap.ToolBar",//缩放工具条
          "AMap.Scale",//地图比例尺
          "AMap.MapType",//地图类型切换插件
          // "AMap.ControlBar",//地图移动旋转插件
          "AMap.PolyEditor",//多边形区域编辑插件
          "AMap.CircleEditor"
        ],
        function() {
          GisMap.addControl(new AMap.Scale()); // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          GisMap.addControl(new AMap.MapType());// 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        }
      );
    },
    panTo(center){
      this.GisComponent.panTo(JSON.parse(center))
    },
    getMapAccept(){
      let self = this;
      let map    = self.GisComponent;
      let rowData = self.mapAccept
      console.log(self.mapAccept,'-----self.mapAccept-----');
      if(self.areaobj&&self.areaobj.state=='add'){
        return
      }
      if((self.areaobj&&self.areaobj.state=='edit')||(self.areaobj&&self.areaobj.state=='detail')){
        let marker = self.createPointTag(JSON.parse(self.areaobj.center),false);
        let polyon = self.createPolyon(JSON.parse(self.areaobj.path));
        if(self.areaobj.state=='edit'&&self.viewType === 'area'){
          console.log(JSON.parse(self.areaobj.path),'editpath');
          self.path = JSON.parse(self.areaobj.path);
          self.targetPolygon = polyon;
          self.setDrawEdit(map,self.targetPolygon);
        }
        marker.setMap(self.GisComponent);
        self.GisComponent.add(polyon);
      }
    },
    copyData(){
      let self = this;
      let data = self.getData();
      let clipboard = new Clipboard('.copyBtn');
      clipboard.on('success', e => {
        // 释放内存
        alert('复制成功'+JSON.stringify(data));
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('当前浏览器暂时不支持复制')
        // 释放内存
        clipboard.destroy()
      })
    },


    getData(){
      let self = this;
      let map    = self.GisComponent;
      if(self.viewType === 'area'){
        let center =  self.circle.getCenter();
        console.log(center,"中心点");
        console.log(self.circle.getRadius(),"banjing");
        self.formData  = {
          radius:self.circle.getRadius(),
          center : {
            lng:center.lng,
            lat:center.lat
          }
        };
      }
      return self.formData
    },
    sendData(){
      let self = this;
      let data = self.getData();
      if(self.circleEditor != null){
        self.circleEditor.close();
      }
      self.$store.commit('setEmertwoModel',{
        show:false,
        dialog:'',
      });
      console.log(data,"sendData");
      self.$emit('sendData',data);
    },
    setMapOption(type){ //控制地图 视角 倾角
      let self = this;
      let map  = self.GisComponent;
      let statesConfig;
      self.viewType = type || 'area';
      if(self.viewType === 'area'){
        let mouseTool = new AMap.MouseTool(map);   //在地图中添加MouseTool插件
        self.mouseTool = mouseTool;
        statesConfig ={
          pitchEnable: false,//禁止仰角
          resizeEnable: false,
        }
        self.createCircle(map);
      }

      if(self.GisComponent.setStatus){
        map.setStatus(statesConfig)
      }
    },
    resetMap(){
      let self = this;
      let map  = self.GisComponent;
      if(self.polyEditor && self.polyEditor.close){
        self.polyEditor.close(true);
        self.polyEditor = {};
      }

      if(self.targetMarker && self.targetMarker.setMap){
        map.remove(self.targetMarker);
        self.targetMarker = {};
      }

      if(self.targetPolygon && self.targetPolygon.getPath){
        map.remove(self.targetPolygon);
        self.targetPolygon = {};
      }
      self.path = [];

      if(self.areaobj.state=='edit'&&self.viewType=='area'){
        self.drawState = 'drawing';
        self.setDrawTool(map);
        self.hasData = false;
      }else{
        self.drawState = 'drawing';
        self.mouseTool.polyline();
        self.hasData = false;
      }

    },
    getCalcCenter(path){
      let center = {
        lng:[],
        lat:[],
      };
      let len = path.length;
      path.forEach((x)=>{
        center.lng.push(x[0])
        center.lat.push(x[1])
      });
      center.lng = center.lng.reduce((a,b)=> a+b);
      center.lat = center.lat.reduce((a,b)=> a+b);
      center = {
        lng:center.lng/len,
        lat:center.lat/len
      };

      return center;
    },
    createPointTag(center,isDraggable,callback = function(e){}){
      let self   = this;
      let mcontent = '';
      let lcontent = ''
      console.log(center,"marker标志--");
      if(self.viewType=='marker'){
        mcontent = ``
      }else{
        mcontent = `<span class="iconNone"'></span> `;
        lcontent = `
          <div class="marker">
            <div class="marker-top">
                <div class="marker-top-icon">
                  <i class="iconfont iconanfang"></i>
                </div>
                <div class="marker-top-text">${self.mapAccept.name}</div>
            </div>
            <div class="marker-line"></div>
            <div class="marker-dotted"></div>
          </div>`;
      }
      let marker = new AMap.Marker({
        position:new AMap.LngLat(center.lng,center.lat),
        content:mcontent,
        offset:new AMap.Pixel(-5,-16.5),
        draggable:(!!isDraggable),
      });
      if(self.viewType!='marker'){
        marker.setLabel({
          offset: new AMap.Pixel(0, -74), //设置文本标注偏移量
          content: lcontent, //设置文本标注内容
          direction: "center" //设置文本标注方位
        });
      }

      self.targetMarker = marker;
      marker.on('dragend',function(e){
        callback(e)
      });
      return marker;
    },
    resetPostion(marker,postion){
      marker.setPosition(postion);
    },
    createPolyon(path){
      console.log(path,"path---");
      let self = this;
      let polygon = new AMap.Polygon({
        path: path,
        strokeColor: '#F7B500',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillOpacity: 0.5,
        fillColor: '#FFBB00',
        zIndex: 50,
        strokeStyle:'dashed',
        strokeDasharray:[0,0]
      });
     return polygon;
    },
    createCircle(map){
      let self = this;
      console.log(self.areaobj,"circle--");
      let circle  = new AMap.Circle({
        center: self.areaobj.center,
        radius: self.areaobj.radius, //半径
        borderWeight: 3,
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: '#1791fc',
        zIndex: 1000, //调整层级 便于拖拽 层级大于覆盖物marker
      })
      self.circle  =  circle;

      self.circle.setMap(map)
      // 缩放地图到合适的视野级别
      map.setFitView([ self.circle ])

    },
    setCircle(){
      let self = this;
      if(self.isedit){return;}
      self.isedit = true;
      let circleEditor = new AMap.CircleEditor(self.GisComponent, self.circle);
      self.circleEditor = circleEditor;
      circleEditor.open();//开始编辑
      // circleEditor.close();//结束编辑
      self.circleEditor.on('move', function(event) {

      })

      self.circleEditor.on('adjust', function(event) {
          let list = [];
          // window.testMakers.forEach((item)=>{
          //   let isInCircle = self.circle.contains(item.getPosition());
          //   console.log(isInCircle,'--e--');
          //   if(isInCircle == true){
          //     list.push(item);
          //   };
          //   console.log(list,'-圆形内的maker--');
          // })
          console.log('触发事件：adjust')
      })

      self.circleEditor.on('end', function(event) {
          console.log('触发事件： end')
          // event.target 即为编辑后的圆形对象
      })
    },
    setDrawEdit(map,polygon){
      let self = this;
      let polyEditor = new AMap.PolyEditor(map, polygon);
      self.polyEditor = polyEditor;
      polyEditor.open();
      polyEditor.on('end', function(event) {
        let t = event.target;
        let afPath = t.getPath();
        self.path = afPath.map((x)=>{
          return [x.lng, x.lat];
        })
       // event.target 即为编辑后的多边形对象
       console.log(event.target,'--------------')
      })

      polyEditor.on('adjust', function(event) {
        //
        let t = event.target;
        let afPath = t.getPath();
        self.path = afPath.map((x)=>{
          return [x.lng, x.lat];
        });
        console.log(self.path,'------self.path--------');

        let center = self.getCalcCenter(self.path);
        center = new AMap.LngLat(center.lng,center.lat);
        self.resetPostion(self.targetMarker, center);

      })


    },
    setDrawTool(map){
      let self = this;
      self.mouseTool.polyline(); //用鼠标工具画折线
      console.log('画线--');
      map.on('click',(e)=>{

      });

      map.on('dblclick',(e)=>{
        if(self.drawState === 'drawing'){ // 结束drawing状态 切换 eidt状态
          if(self.path.length < 3){
            console.log('小于3的话 不进行绘制暂停')
            return
          }else{
            self.mouseTool.close();// 暂停绘制 不传参数
            self.drawState = 'editing';
            let path    = self.path;
            let polygon = self.createPolyon([...path,path[0]]);
            let center  = self.getCalcCenter(path);
            marker.setMap(map);
            map.add(polygon);
            // polygon.on('rightclick',(e)=>{
            //   console.log(e,'鼠标右键点试')
            // });
            self.targetPolygon = polygon;
            self.setDrawEdit(map,polygon);
            self.mouseTool.close(true);

            self.hasData = true;
          }
        }
      });
    },
    initMap(){ // 初始化地图
      let self = this;
      let AMap = window.AMap;
      let center = self.areaobj.center;
      console.log(center,"center-");
      let mapOption ={
        viewMode:'3D',
        zoom: 15.4,
        rotation: 0,
        pitch:0,
        expandZoomRange:true,
        showIndoorMap: true, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
        resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
        dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
        doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
        zoomEnable: true, //地图是否可缩放，默认值为true
        rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
        pitchEnable:false,
        zooms: [14, 20],
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building","point"],
        center:center
      }
      if(self.showSatellite){
        mapOption.layers = [new AMap.TileLayer.Satellite()];
      }
      let gis = 'GisComponent'+self.areatype;
      console.log(gis,"gis-");
      // self.GisComponent = new AMap.Map('GisComponent', mapOption);
      self.GisComponent = new AMap.Map(gis, mapOption);
      // self.getMapAccept();
      self.setMapOption(self.viewType);
      self.setMapPlugin(self.GisComponent);


    //  console.log(_URL._IsDev,'--eisDev--');

    //  if(_URL._IsDev){

    //    let list = [
    //    {
    //      center:new AMap.LngLat(118.142045,36.772139),
    //    },
    //    {
    //      center:new AMap.LngLat(118.144245,36.772339),
    //    },
    //    {
    //      center:new AMap.LngLat(118.144145,36.772429),
    //    },
    //   ]
    //   let mList = [];

    //    list.forEach((item)=>{
    //      var testMaker = new AMap.Marker({
    //        position:item.center,
    //        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    //        // offset: new AMap.Pixel(Math.random()*90, Math.random()*120)
    //      })
    //      testMaker.setMap(self.GisComponent);
    //      mList.push(testMaker);
    //    })

    //    window.testMakers = mList;

    //  };
   }
  }
}
</script>

<style lang="less">
@import "../dialogs/dialogs.less";
.mapContent
{
  width: 100%;
  height: 100%;
  .actionPart{
    padding-top: 16px;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.marker{
  min-width:150px;
  display: flex;
  flex-direction: column;
  position: relative;
  &-top{
    height:32px;
    background:rgba(47,35,2,1);
    border:1px solid rgba(255,190,88,1);
    display: flex;
    align-items: center;
    font-size:14px;
    color:rgba(255,190,88,1);
    padding-right: 16px;
    &-icon{
      width:32px;
      height:100%;
      background:rgba(92,68,26,1);
      border-right:1px solid rgba(255,190,88,1);
      margin-right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        font-size: 16px;
        color:#FFBE58;
      }
    }
  }
  &-line{
    width:2px;
    height:70px;
    background:rgb(80, 57, 17);
    position: absolute;
    margin-left:-1px;
    left:50%;
    top:32px;
  }
  &-dotted{
    width:6px;
    height:6px;
    background:rgb(80, 57, 17);
    border-radius: 50%;
    position: absolute;
    margin-left:-3px;
    left:50%;
    top:102px;
  }
}
#GisComponent
{
  height:calc(~' 100% - 64px');
}
#GisComponentmodel{
  height:calc(~' 100% - 64px');
}
#GisComponentdetail{
  height:calc(~' 100% - 64px');
}
#GisComponentedit{
  height:calc(~' 100% - 64px');
}
#GisComponentfile{
  height:calc(~' 100% - 64px');
}
#GisComponent1000{
  height:calc(~' 100% - 64px');
}
#GisComponent1001{
  height:calc(~' 100% - 64px');
}
#GisComponent1002{
  height:calc(~' 100% - 64px');
}
.amap-marker-label{
  border:0;
  background-color: transparent;
}
.amap-logo{
display: none!important;
}
.amap-copyright{
opacity:0;
}

.myMapMenu
{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 2px 2px 3px rgba(66,66,66,.3);
  background: #fff;
  list-style: none;
  border-radius: 3px;
  overflow: hidden;
  &-item{
    cursor: pointer;
    min-width: 6.5em;
    padding: 8px 16px;
    color:rgba(80, 156, 228, 0.8);
    font-weight: 500;
    background: #fff;
    border:1px solid rgba(233,233,233,.8);
    margin-top: -1px;
    font-size: 14px;
    text-align: center;
  }
  &-item:hover{
    background: rgba(233,233,233,.8);
  }

}
.iconNone
{
  display: block;
  width: 20px;
  height: 32px;
  top:0;
  left: 0;
  border:none;
}
.area_btn{
  // border:10px solid red;
  top: 40px;
  left: 40px;
  position: absolute;
  z-index: 10000;
}
.amap-warp{
  // border: 1px solid green;
  position: relative;
}
</style>
