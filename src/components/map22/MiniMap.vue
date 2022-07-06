<template lang="html">
  <div class="amap-warp" id='miniMap'>
  </div>
</template>
<script>
import * as tool from "./tool.js";
import AreaJson from "./area/index.js";
import _API from '../../util/api';
import _URL from '../../util/url';
import _Cookie from '../../util/cookie';
// import _FORM from '../../util/form.js';
import card from "@/components/card/BorderCard";
export default {
  name: "miniMap",
  data() {
		const self = this;
		return {
      GisMap: window.GisMap,
      areaList:[],
		};
	},
	mounted() {
    let self = this;
    async function load() {
      console.log(window.AMap,'window.AMapwindow.AMap')
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

		setAreaBase(){//地面基色
      var list = [];
      var colors = [ "#88ffcc", "#3bb2d0", "#005be2", "#c2ff00",
                     "#50667f", "#41afa5", "#f9886c", "#e55e5e",
                     "#fbb03b", "#f42dac"  ];
      var keys    = Object.keys(AreaJson.wallPath);
      if(!keys.length){ return  list};
      let opt   = {
              c : '#005be2',
             bg : '#005be2',
        opacity : 0.2
      };
      var objectBase = tool.createBase(AreaJson.areaPath['overWalls'], opt, 100);
      list.push(objectBase);
      GisMap.add(list);
      return list
    },
		initMap() {
      let self = this;
      self.$store.commit("setMapLoading", true);
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      //init map
      window.GisMap = new AMap.Map("miniMap", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        //layers: [new AMap.TileLayer.Satellite()],
        zoom: 13,
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
			self.setMapPlugin(GisMap);
			self.setWalls();
			self.setAreaBase();
		},
		 setMapPlugin(GisMap){
      AMap.plugin(
        ["AMap.ToolBar", "AMap.Scale", "AMap.MapType", "AMap.ControlBar","AMap.PolyEditor"],
        function() {
        }
      );
    },
	}
}
</script>
<style lang="less" scoped>
	.amap-warp {
    width: 100%;
    // margin: 8px;
    height: 220px;
    transition: all 0.4s;
  }
</style>
