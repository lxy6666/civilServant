<template >
  <div class="mapTools">
    <div class="toolContrl" @click='switchShow'>
    </div>
    <div :class="showIt ? 'tootContent' :'tootContent hideIt'">
      <ul class="tootContent-tabs">
        <li class="tootContent-tab ml_14">

          <div  @click='backCenter' class="tootContent-tab-Tleft">
            <i class='fa fa-crosshairs mr-1'></i>

            <!-- <i class="iconfont icon-opoint tootContent-tab-Tleft-icon"></i> -->
            <span>回到原点</span>
          </div>
          <!-- <div class="tootContent-tab-right"></div> -->
        </li>
        <li class="tootContent-tab">
          <div @click='changeGis3D' class="tootContent-tab-middle">
            <i :class='" fa mr-1 " + (showGis3D ? " fa-eye-slash":" fa-eye") '></i>

            <!-- <i v-if="showGis3D" class="iconfont icon-hidemodel tootContent-tab-Tleft-icon"></i> -->
            <span v-if="showGis3D" >隐藏模型</span>

            <span v-if="!showGis3D" >显示模型</span>
          </div>
        </li>
        <li class="tootContent-tab">
          <div @click='changeHeatMap' class="tootContent-tab-middle">
            <!-- <i v-if="!showHeatMap" class="iconfont icon-on tootContent-tab-Tleft-icon"></i> -->
            <i :class=' "fa fa-thermometer-quarter mr-1 " + (showHeatMap ? "fa-active" :"")'></i>
            <span v-if="!showHeatMap" >打开热力</span>
            <!-- <i v-if="showHeatMap" class="iconfont icon-off tootContent-tab-Tleft-icon"></i> -->
            <span v-if="showHeatMap" class='fa-active' >关闭热力</span>
          </div>
        </li>
        <li class="tootContent-tab ml_14" v-show='true'>
          <div @click='changeRisk' class="tootContent-tab-Bleft tootContent-tab-Bleft-longer">
            <i v-if="!showRisk" class="iconfont iconxianshibaimo  tootContent-tab-Tleft-icon"></i>
            <span v-if="!showRisk" >风险四色图</span>
            <i v-if="showRisk" class="iconfont  iconyincangbaimo tootContent-tab-Tleft-icon"></i>
            <span v-if="showRisk" >风险四色图</span>
          </div>
        </li>
        <li class="tootContent-tab ml_14" v-if='false'>
          <div @click='changeEasyModel' class="tootContent-tab-Bleft">

            <!-- <i v-if="showEasyModel" class="iconfont icon-show tootContent-tab-Tleft-icon"></i> -->
            <span v-if="showEasyModel" >关闭白模</span>

            <!-- <i v-if="!showEasyModel" class="iconfont icon-hide tootContent-tab-Tleft-icon"></i> -->
            <span v-if="!showEasyModel" >显示白模</span>
          </div>
        </li>
      </ul>
    </div>
    <a-modal
    title="数据添加"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    >
    height:
      <a-radio-group  v-model="meshsList.height">
        <a-radio-button :value="120">120</a-radio-button>
        <a-radio-button :value="240">240</a-radio-button>
        <a-radio-button :value="360">360</a-radio-button>
        <a-radio-button :value="480">480</a-radio-button>
      </a-radio-group>
      </br>
    color:
    <a-radio-group  v-model="meshsList.color">
        <a-radio-button value="rgba(160,185,236,.8)">青</a-radio-button>
        <a-radio-button value="rgba(110,121,194,.8)">蓝</a-radio-button>
        <a-radio-button value="rgba(139,148,215,.8)">紫</a-radio-button>
        <a-radio-button value="rgba(100, 150, 230, 0.7)">罐子</a-radio-button>
    </a-radio-group>
    </br>
    name: <a-input placeholder="Basic usage" v-model="meshsList.name"/>
    </a-modal>
  </div>
</template>

<script>



import RISK from './tool/risk.js';
import card from "@/components/card/BorderCard";
export default {
  name: "mapTools",
  components: {
    card
  },
  props:{
    mapName:{
      type:String,
      default:'GisScreenMap'
    }
  },
  data() {
    return {
      riskLayer:{},
      showRisk:false,
      canSetPoint:false,
      showBase:true,
      showEasyModel:true,
      showIt:false,
      showHeatMap:false,
      showGis3D: true,
      mapType: 1001,
      visible: false,
      meshsList: {},
      meshs: []
    };
  },
  computed: {
    showThree() {
      return this.$store.state.showThree;
    }
  },
  mounted() {
    let self = this;
    async function load() {
      if (window.AMap && window[self.mapName]) {
        self.initTool();
        self.setRiskLayer();
        // 未载入高德地图API，则先载入API再初始化
      } else {
        setTimeout(() => {
          load();
        }, 500);
      }
    }
    load();
  },
  methods: {
    changeRisk(){
      let self = this;
      self.showRisk = !self.showRisk;
      if(self.showRisk){
        if(self.showGis3D){
          self.changeGis3D();
        }
        self.riskLayer.show();
      }else{
        self.riskLayer.hide();
        if(self.showGis3D == false){
          self.changeGis3D();
        }
      }
    },
    setRiskLayer(){
      let self = this;
      let checkMap = function checkMap(){
        let map  = window.GisScreenMap;
        if(map && map.add){
          let loadRisk = function loadRisk (list){
            let outList = [];
            list.forEach((x)=>{
              let area  = new AMap.Polygon({
                path:x.path,
                fillColor: x.color || '#fff', // 多边形填充颜色
                borderWeight: 1, // 线条宽度，默认为 1
                strokeColor: x.borderColor|| '#fff', // 线条颜色
                zIndex:5000,
              })
              outList.push(area)
            });
            return outList;
          };
          let areas = loadRisk(RISK);
          var overlayGroup = new AMap.OverlayGroup(areas);
          overlayGroup.hide();
          map.add(overlayGroup);
          self.riskLayer = overlayGroup;

        }else{
          setTimeout(()=>{
            checkMap();
          },1000)
        }
      };
      checkMap();
    },
    setBit(ev) {
      let self = this;
      var target = ev.target;
      // 触发事件的地理坐标，AMap.LngLat 类型
      //latitude 纬度 lat
      //Longitude 经度

      var pixel = ev.pixel;
      var px = new AMap.Pixel(pixel.x, pixel.y);

      var long = ev.lnglat.getLng();
      var lat = ev.lnglat.getLat();

      if(self.canSetPoint){
        var marker = new AMap.Marker({
          position: new AMap.LngLat(long, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title:"点位",
          map: window[self.mapName],
          offset: new AMap.Pixel(-9,-33),
        });

        let divtag = `<div class='blueinfo'>点位:${long}${lat}</div>`;


        var markerL = new AMap.Marker({
          position: new AMap.LngLat(long + 0.0005, lat + 0.0005), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title:"点位",
          map: window[self.mapName],
          offset: new AMap.Pixel(-9,-33),
        });


        var markerR = new AMap.Marker({
          position: new AMap.LngLat(long - 0.0005, lat - 0.0005), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title:"点位",
          map: window[self.mapName],
          offset: new AMap.Pixel(-9,-33),
        });


        marker.setLabel({
          offset: new AMap.Pixel(-26, -32), //设置文本标注偏移量
          content: divtag, //设置文本标注内容
          direction: "right" //设置文本标注方位
        });
        window[self.mapName].add(marker)
        window[self.mapName].add(markerL)
        window[self.mapName].add(markerR)
      }
      console.log([long, lat], "点位");
      window.drawMap.push([long, lat]);
    },
    setMaker(){
      let self = this;
      self.canSetPoint = true;
    },
    changeBase(){
      let self = this;
      self.showBase = !self.showBase;
      if (window[self.mapName] && map_area_over) {
        if (self.showBase) {
          window[self.mapName].add(window.map_area_part);
          window[self.mapName].add(window.map_area_over);
          window[self.mapName].add(window.map_area_factorys);
        } else {
          window[self.mapName].remove(window.map_area_part);
          window[self.mapName].remove(window.map_area_over);
          window[self.mapName].remove(window.map_area_factorys);
        }
      }
    },
    switchShow(){
      this.showIt = !(this.showIt);
    },
    switchModel(type){
      let self = this;
      if(modelParent){
        for(var i = 0; i < modelParent.children.length; i++){
          console.log(modelParent.children[i],'-');
          if(modelParent.children[i].JsonID.match(type)){
            let target = modelParent.children[i];
            target.visible = true;
          }else{
            let target = modelParent.children[i];
            target.visible = false;
          }
        }
      }
    },
    changeEasyModel(){
      let self = this;
      self.showEasyModel = !self.showEasyModel;
      return
      if (window[self.mapName] && meshBlockContent) {
        if (self.showEasyModel) {
          window[self.mapName].add(meshBlockContent);
        } else {
          window[self.mapName].remove(meshBlockContent);
        }
      }
    },
    changeHeatMap(){
      let self = this;
      console.log(window.heatMap,'---heatMap--')
      heatMap.render();
      self.showHeatMap = !self.showHeatMap;
      if(self.showHeatMap){
        heatMap.show();
      }else{
        heatMap.hide();
      }
    },
    changeGis3D() {
      let self = this;
      self.showGis3D = !self.showGis3D;

      if (window[self.mapName] && modelPlace) {
        if (self.showGis3D) {
          window[self.mapName].add(modelPlace);
        } else {
          window[self.mapName].remove(modelPlace);
        }
      }
    },
    handleCancel(e) {
      let self = this;
      console.log("Clicked cancel button");
      this.visible = false;
    },
    backGis() {
      let self = this;
      self.$store.commit("changeThree", false);
      self.$store.commit('setThreeActive','infor');
      sessionStorage.ThreeShowType = false;
      self.$router.go(-1);
    },
    setLine() {
      let self = this;
      window.mouseTool = new AMap.MouseTool(window[self.mapName]);
      function drawPolyline() {
        mouseTool.polyline({
          strokeColor: "#3366FF",
          strokeOpacity: 1,
          strokeWeight: 2,
          // 线样式还支持 'dashed'
          strokeStyle: "solid"
          // strokeStyle是dashed时有效
          // strokeDasharray: [10, 5],
        });
      }
      mouseTool.on("drawPolyline", function(event) {
        // event.obj 为绘制出来的覆盖物对象
        console.log("注册绘制");
      });
      drawPolyline();
    },
    handleOk(e) {
      let self = this;
      let Json = {};
      this.meshsList.paths = JSON.parse(JSON.stringify(window.drawMap));
      let len = this.meshsList.paths.length - 1;
      this.meshsList.paths[len] = this.meshsList.paths[0];
      Json = JSON.parse(JSON.stringify(this.meshsList));
      this.meshs.push(Json);
      console.info(JSON.stringify(this.meshs), "------标记点输出路径------");
      window.drawMap = [];
      this.visible = false;
    },
    print() {
      let self = this;
      console.log(JSON.stringify(window.drawMap), "------标记点输出路径------");
      this.visible = true;
      return
      window.drawMap = [];
      mouseTool.close(true)

    },
    initTool() {
      let self = this;
      if (window.drawMap) {
        return;
      }
      window.drawMap = [];
    },
    backCenter() {
      let self = this;
      if (window[self.mapName]) {
        window[self.mapName].panTo(window.ProjectConfig.MapCenter);
      }
    },
    switchMap() {
      let self = this;
      // var satellite = new AMap.TileLayer.Satellite({
      //     map: window.window[self.mapName],
      // });
      console.log(window.window[self.mapName].layers, "before");

      if (window.window[self.mapName]) {
        if (self.mapType === 1001) {
          console.log("添加图层");
          //satellite.setMap(window.window[self.mapName])
          console.log(window.window[self.mapName], "after");
          self.mapType = 1002;
        } else {
          //satellite.setMap(null)
          self.mapType = 1001;
        }
      }
    }
  }
};
</script>

<style lang="less">
.mapTools {
  // border: 1px solid red;
  position: absolute;
//  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  left: 324px;
  bottom: 13px;
}
.toolItem {
  width: 100%;
  min-width: 88px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // position: relative;
  cursor: pointer;
  .fa {
    // position: relative;
    top: 1px;
  }
}
.toolContrl{
  width: 53px;
  height: 53px;
  background-image: url("../../assets/icons/toolContrl.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.tootContent
{
  // position: absolute;
  height: 121px;
  width: 200px;
  transition: all 0.4s;
  // border: 1px solid red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &-tabs{

    // align-items: center;
    // border: 1px solid green;
  }
  &-tab{
    // border: 1px solid black;
    height: 24px;
    margin-bottom: 4px !important;
    &-middle{
      display: inline-block;
      height: 24px;
      width: 84px;
      margin-right: 14px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(114,218,255,1);
      line-height:24px;
      background:rgba(44,65,103,0.85);
      border:1px solid rgba(80,109,181,1);
      padding-left: 8px;
      .fa{
        width: 12px;
        font-size: 14px;
        text-align: center;
        transition:  text-shadow 0.3s;
      }
      .fa-active{
        width: 12px;
        text-shadow: 0 0 3px rgba(114,218,255,1);
        transition:  text-shadow 0.3s;
      }
    }
    &-Tleft{
      height: 24px;
      width: 92px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(114,218,255,1);
      line-height:24px;
      background-image: url("../../assets/icons/topLeft.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding-left: 14px;
      &-icon{
        margin-right: 4px;
        // border: 1px solid red;
      }
    }
    &-Bleft{
      height: 24px;
      width: 92px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(114,218,255,1);
      line-height:24px;
      background-image: url("../../assets/icons/bottomLeft.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding-left: 14px;
      display: inline-block;
      margin-right: 18px;
    }
    .tootContent-tab-Bleft-longer{
      width:108px;
      transform: translateX(-26px);
    }
  }
}
.hideIt{
  transform: translateX(-100%);
  opacity: 0;
  z-index: -2000;
  transition: all 0.4s;
}
.ml_14{
  margin-left: -14px;
}
</style>
