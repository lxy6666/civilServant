<template lang="html">
  <div  class="screenMap  mapPart"  id='GisTraffic'></div>
</template>
<script>
import * as tool from "./tool.js";
import AreaJson from "./area/index.js";
import Model from "./Model.js";
import MapMethods from "@/components/map/tool/mapMethods.js";
export default {
  name:'GisTraffic',
  data(){
    return{
      loadCount:0,
      makersList:[],
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
  },
  methods:{
    initMap(){
      let self   = this;
      let GisTrafficMap = new AMap.Map("GisTraffic", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 15.4,
        // rotation: 44,
        // pitch:65,
        // rotation: 0,
        // pitch:65,
        viewMode: "3D", //开启3D视图,默认为关闭
        buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        zooms: [10, 20],
        center:window.ProjectConfig.MapCenter,
        // center:[115.122399, 35.23551],
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building"],
      });
      window.GisTrafficMap = GisTrafficMap;
      self.setLigth(GisTrafficMap);
      //加载地图缩略控制器
      self.setMapPlugin(GisTrafficMap);
      self.setBorder(GisTrafficMap);
      //self.setMapClick(GisTrafficMap);
      self.setCars(GisTrafficMap);
    },
    setMapClick(GisMap){
      GisMap.on('click',(e)=>{
        let marker = new AMap.Marker({
          position: new AMap.LngLat(e.lnglat.getLng(),  e.lnglat.getLat()), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "点位",
          draggable:true,
          icon: "https://cdn.ts-it.cn/692511086720716800sxttss.png",
          animation: "AMAP_ANIMATION_DROP",
        });
        marker.on('dragging',(e)=>{
          console.log(e.lnglat.getLng()+',' + e.lnglat.getLat()  ,'----测试--')
        })
        marker.setMap(GisMap)
      })
    },
    setCars(GisMap){
      let self = this;

      let statusCode = {
        1000:'carRed',
        1001:'carWarn',
        1002:'carCool',
        1003:'carGreen',
        1004:'carCool',
      }
      //东明北车辆
      let dongmingbei = {
        status:1004,
        center:[115.128631,35.345885],
        // center:[115.147414,35.28548],
      };

      let dongmingnan = {
        status:1004,
        center:[115.128448,35.238652],
      };

      let shanxian = {
        status:1004,
        center:[116.157704,34.819905],
      };

      let juye = {
        status:1004,
        center:[115.979829,35.299141],

      }

      let caoxian ={
        status:1004,
        center:[115.55873,34.955082],
      }


      let dawenkou ={
        status:1004,
        center:[117.067302,36.033744],
      }



      let yiyuan ={
        status:1004,
        center:[118.222871,36.175356],
      }


      let juancheng ={
        status:1004,
        center:[115.566381,35.567807],
      }




      let list = [
        dongmingbei,
        dongmingnan,
        shanxian,
        juye,
        caoxian,
        dawenkou,
        yiyuan,
        juancheng,
        // {
        //   status:1003,
        //   center:[115.121562,35.222047],
        //
        // },
        // {
        //   status:1003,
        //   center:[115.121672,35.222063],
        // },
        // {
        //   status:1000,
        //   center:[115.121428,35.222666],
        // },
        // {
        //   status:1003,
        //   center:[115.115882,35.239826 ],
        // },
        // {
        //   status:1003,
        //   center:[115.116719,35.239758],
        // },
        // {
        //   status:1000,
        //   center:[115.115941,35.238393],
        // },
        // {
        //   status:1003,
        //   center:[115.117876,35.359617 ],
        // },
        // {
        //   status:1003,
        //   center:[115.117841,35.359316],
        // },
        // {
        //   status:1000,
        //   center:[115.119123,35.359316],
        // },
        // {
        //   status:1003,
        //   center:[115.117876,35.359617 ],
        // },
        // {
        //   status:1003,
        //   center:[115.117841,35.359316],
        // },
        // {
        //   status:1000,
        //   center:[115.119123,35.359316],
        // },
        // {
        //   status:1003,
        //   center:[115.134721,35.253595],
        // },
        // {
        //   status:1003,
        //   center:[115.124294,35.213668 ],
        // },
        // {
        //   status:1003,
        //   center:[115.177502,35.276133],
        // },
        // {
        //   status:1003,
        //   center:[115.197198,35.284048],
        // },
        // {
        //   status:1003,
        //   center:[115.163703,35.319312],
        // },
        // {
        //   status:1003,
        //   center:[115.124015,35.363519 ],
        // },
        // {
        //   status:1003,
        //   center:[115.118013,35.333582],
        // },
        // {
        //   status:1003,
        //   center:[115.127623,35.347265],
        // },
        // {
        //   status:1000,
        //   center:[115.127419,35.346612],
        //
        // },
        // {
        //   status:1000,
        //   center:[115.127211,35.346127],
        // },
      ];
      let markerCars = [];
      list.forEach((x)=>{
        let id = x.center[1].toString().substr(3);
        let carName =`鲁J${id}`;
        let textTest = x.status == 1004 ? '鲁J · SD331' : carName;
        let marker = new AMap.Marker({
          position: new AMap.LngLat(x.center[0],x.center[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: carName,
          draggable:false,
          offset:new AMap.Pixel(-49, -54),
          content:`<div class='carMaker ${statusCode[x.status]} '>
            <p class='carMaker-Text'>${textTest}</p>
            <i class=" carIcon iconfont iconcheliang"></i>
          </div>`,
          animation: "AMAP_ANIMATION_DROP",
        });
        marker.setMap(GisMap);
        marker.on('click',(e)=>{
          let sendData = {
            showType:'TrafficDetail',
            name:carName,
          };
          console.log(sendData,'===车牌号码===')
          GisMap.panTo(x.center);
          GisMap.setZoom(18);
          self.$store.commit('setTrafficObject',sendData)
        });
        marker.code = x.status;
        marker.center = x.center;
        markerCars.push(marker);
      })
      window._MARKER_CARS = markerCars;
    },
    setBorder(GisMap){
      let opts = {
        subdistrict: 0,
        extensions: 'all',
        level: 'city'
      };
      let district = new AMap.DistrictSearch(opts);
       district.search('东明县', function (status, result) {
           var bounds = result.districtList[0].boundaries;
           var Polygon = new AMap.Polygon({
              path: bounds,            // 设置线覆盖物路径
              strokeColor: "#251AC1",
              strokeWeight: 6,
              strokeOpacity: 0.8,
              fillOpacity: 0.1,
              strokeStyle:'dashed',
              strokeDasharray:[10,10],
              fillColor: '#1791fc80',
              zIndex: 50,
           });
           GisMap.add(Polygon)
       });
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
    setLigth(map){ //添加环境光
      if(!map){return}
      map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.8);
      map.DirectionLight = new AMap.Lights.DirectionLight(
        [1, 200, 120],
        [1, 1, 1],
        0.3
      );
      let layer  = new AMap.Object3DLayer();
      map.add(layer);
    },
  }
}
</script>

<style lang="less">
@import './index';
.carMaker{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .carIcon{
    display: flex;
    font-size: 16px;

    color:#20D3FF;
    align-items: center;
    justify-content: flex-start;
    margin-top: 4px;
  }
  .carMaker-Text{
    width: 8em;
    white-space: nowrap;
    color:#20D3FF;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    padding: 2px 16px;
    font-size: 12px;
    margin-bottom: 0;
  };
}
.carRed{
  .carIcon,.carMaker-Text{
    color:#FF0049!important;
    transition: all 0.3s;
  }
  .carMaker-Text{
    border:1px solid  transparent !important;
    transition: all 0.3s;
  }
  .carMaker-Text:hover{
    color:#ff3d75!important;
    border:1px solid  #ff3d75 !important;
    transition: all 0.3s;
  }
}
.carWarn{
  .carIcon,.carMaker-Text{
    color:#cf9335!important;
    transition: all 0.3s;
  }
  .carMaker-Text{
    border:1px solid  transparent !important;
    transition: all 0.3s;
  }
  .carMaker-Text:hover{
    color:#ffbe58!important;
    border:1px solid  #ffbe58 !important;
    transition: all 0.3s;
  }
}
.carCool{
  .carIcon,.carMaker-Text{
    color:#20D3FF!important;
    transition: all 0.3s;
  }
  .carMaker-Text{
    border:1px solid  transparent !important;
    transition: all 0.3s;
  }
  .carMaker-Text:hover{
    color:#1998d3!important;

    border:1px solid  #1998d3 !important;
    transition: all 0.3s;
  }
}
.carGreen{
  .carIcon,.carMaker-Text{
    color:#32F7A9!important;
    transition: all 0.3s;
  }
  .carMaker-Text{
    border:1px solid  transparent !important;
    transition: all 0.3s;
  }
  .carMaker-Text:hover{
    color:#32F7A9!important;
    border:1px solid  #32F7A9 !important;
    transition: all 0.3s;
  }
}






</style>
