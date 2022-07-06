<template lang="html">
  <div class="amap-warp" id='mapId'>
    <card class='opacityCard'  >
    <div  class='toolItem'> <i class='fa fa-arrow-circle-left' style='margin-right:.3em'></i><span>返回上一页</span></div>
  </card>
  <card class='opacityCard'   >
    <div  class='toolItem'> <i class='fa fa-arrow-circle-left' style='margin-right:.3em'></i><span>原点</span></div>
  </card>
  </div>
</template>
<script>
import * as tool from "./tool.js";
import AreaJson from "./area/index.js";
import _API from "../../util/api";
import _URL from "../../util/url";
import _Cookie from "../../util/cookie";
import card from "@/components/card/BorderCard";
export default {
  name: "Gis",
  data() {
    const self = this;
    return {
      GisMap: window.GisMap,
      areaList: [],
      lineArr: [
        [118.130602, 36.769688],
        [118.132957, 36.770371],
        [118.135046, 36.770644],
        [118.137283, 36.770507],
        [118.139595, 36.769825],
        [118.141683, 36.769116],
        [118.142355, 36.770328],
        [118.142813, 36.771421],
        [118.143186, 36.772786],
        [118.143378, 36.773554],
        [118.14472, 36.773563],
        [118.145967, 36.773529],
        [118.147192, 36.773512]
      ],
      marker: null,
      polyline: null,
      passedPolyline: null
    };
  },
  mounted() {
    let self = this;
    async function load() {
      console.log(window.AMap, "window.AMapwindow.AMap");
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
  },

  methods: {
    setWalls() {
      var wallLayer = tool.createLayer(100);
      GisMap.add(wallLayer);
      var colors = [
        "#88ffcc",
        "#3bb2d0",
        "#005be2",
        "#c2ff00",
        "#50667f",
        "#41afa5",
        "#f9886c",
        "#e55e5e",
        "#fbb03b",
        "#f42dac"
      ];
      var keys = Object.keys(AreaJson.wallPath);
      if (!keys.length) {
        return wallLayer;
      }
      keys.forEach((key, index) => {
        var objectWall = tool.createdWall(AreaJson.wallPath[key], {
          h: 80,
          c: colors[index % 10]
        });
        wallLayer.add(objectWall);
      });
      return wallLayer;
    },
    setAreaBase() {
      //地面基色
      var list = [];
      var colors = [
        "#88ffcc",
        "#3bb2d0",
        "#005be2",
        "#c2ff00",
        "#50667f",
        "#41afa5",
        "#f9886c",
        "#e55e5e",
        "#fbb03b",
        "#f42dac"
      ];
      var keys = Object.keys(AreaJson.wallPath);
      if (!keys.length) {
        return list;
      }
      let opt = {
        c: "#005be2",
        bg: "#005be2",
        opacity: 0.2
      };
      var objectBase = tool.createBase(
        AreaJson.areaPath["overWalls"],
        opt,
        100
      );
      list.push(objectBase);
      GisMap.add(list);
      return list;
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
        //layers: [new AMap.TileLayer.Satellite()],
        zoom: 15.79,
        //pitch: 75,
        rotation: 0,
        // viewMode: "3D", //开启3D视图,默认为关闭
        // buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        zooms: [0, 20],
        center: [118.160073, 36.773658],
        mapStyle: "amap://styles/blue",
        features: ["bg", "road", "building", "point"]
      });
      this.marker = new AMap.Marker({
        map: GisMap,
        position: [118.130602, 36.769688],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      });

      this.polyline = new AMap.Polyline({
        path: self.lineArr,
        map: GisMap,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      this.passedPolyline = new AMap.Polyline({
        map: GisMap,
        // path: lineArr,
        strokeColor: "#AF5", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      //GisMap.add(polyline)
      // console.log(GisMap, polyline, "----polyline----");
      // this.GisMap.setFitView();
      self.setMapPlugin(GisMap);
      self.setWalls();
      self.setAreaBase();
    },
    setMapPlugin(GisMap) {
      AMap.plugin(
        [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.MapType",
          "AMap.ControlBar",
          "AMap.PolyEditor"
        ],
        function() {
          GisMap.addControl(new AMap.Scale());
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
    }
  }
};
</script>
<style lang="less" scoped>
.amap-warp {
  width: 100%;
  margin: 8px;
  height: calc(~"100vh - 190px");
  transition: all 0.4s;
}
.mapToolsOut {
  position: absolute;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  flex-direction: row;
  background: none;
  left: 50%;
  top: 36px;
}
.toolItem {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .fa {
    position: relative;
    top: 1px;
  }
}
.m-colorPicker {
  z-index: 10003;
}
</style>
