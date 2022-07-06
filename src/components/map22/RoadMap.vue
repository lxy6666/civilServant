<template lang="html">
  <div  class="screenMap  mapPart"  id='GisRoad'></div>
</template>

<script>
import * as tool from "./tool.js";
import AreaJson from "./area/index.js";
import Model from "./Model.js";

export default {
  name:'GisRoad',
  data(){
    return{
      loadCount:0,
      makersList:[],
    }
  },
  props:{
    points:{
      type:Array,
      default:()=>{
        return [
          {
            type:1000,
            msgId:'zq1001310',
            name:'东明宏昌化工有限公司',
            center:[115.128827,35.222434],
            time:'2020-04-29 15:20:48',
          },
          {
            type:1000,
            msgId:'zq1001310',
            name:'宏昌内部道路',
            center:[115.12858,35.221981],
            time:'2020-04-29 15:20:48',
          },
          {
            type:1001,
            msgId:'zq1001323',
            name:'⼯业⼀路南段岔⼝',
            center:[115.132288,35.221916],
            time:'2020-04-29 15:22:48',

          },
          {
            type:1001,
            msgId:'zq1001310',
            name:'⼯业⼀路',
            center:[115.133457,35.238962],
            time:'2020-04-29 15:32:48',

          },
          {
            type:1001,
            msgId:'zq1001314',
            name:'华营路岔⼝',
            center:[115.134377,35.248072],
            time:'2020-04-29 15:42:48',

          },
          {
            type:1001,
            msgId:'zq1001314',
            name:'⼯业⼀路北段岔⼝',
            center:[115.136127,35.284907],
            time:'2020-04-29 16:10:48',
          },
          {
            type:1001,
            msgId:'zq1001314',
            name:'经开路',
            center:[115.147414,35.28548],
            time:'2020-04-29 16:30:48',
          },
        ]
      }
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

  },
  methods:{
    initMap(){
      let self   = this;
      let GisRoadMap = new AMap.Map("GisRoad", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 15.2,
        rotation: 44,
        pitch:65,
        viewMode: "3D", //开启3D视图,默认为关闭
        buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        zooms: [10, 20],
        center:[115.132399, 35.24651],
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building","point"],
      });
      window.GisRoadMap = GisRoadMap;
      self.setLigth(GisRoadMap);



      //加载地图缩略控制器
      self.setMapPlugin(GisRoadMap);
      self.setBorder(GisRoadMap);
      self.setRoadLine(GisRoadMap);



    },
    setRoadLine(GisMap){
      let self = this;
      let list = self.points || [
        {
          type:1000,
          msgId:'zq1001310',
          name:'东明宏昌化工有限公司',
          center:[115.128827,35.222434],
          time:'2020-04-29 15:20:48',
        },
        {
          type:1001,
          msgId:'zq1001323',
          name:'道路A端XX 地点',
          center:[115.12858,35.221981],
          time:'2020-04-29 15:22:48',

        },
        {
          type:1001,
          msgId:'zq1001310',
          name:'XXX道路岔口',
          center:[115.132288,35.221916],
          time:'2020-04-29 15:32:48',

        },
        {
          type:1001,
          msgId:'zq1001314',
          name:'XXX道路岔口',
          center:[115.133457,35.238962],
          time:'2020-04-29 15:42:48',

        },
        {
          type:1002,
          msgId:'zq1001314',
          name:'XXX道路岔口',
          center:[115.134377,35.248072],
          time:'2020-04-29 15:52:48',

        },
        {
          type:1001,
          msgId:'zq1001314',
          name:'XXX道路岔口',
          center:[115.136127,35.284907],
          time:'2020-04-29 16:10:48',

        },
        {
          type:1001,
          msgId:'zq1001314',
          name:'XXX道路岔口',
          center:[115.147414,35.28548],
          time:'2020-04-29 16:30:48',
        },
      ]

      let path = list.map(x=>x.center);

      var polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: "#3366FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
      })
      polyline.setMap(GisMap)
      list.forEach((x)=>{
        let marker = new AMap.Marker({
           position: x.center,
           content:'',
           offset: new AMap.Pixel(-13, -30)
         });
         marker.setLabel({
           offset: new AMap.Pixel(0, -30),
           content: `<div><p class="deviceTag" style=''>${x.name} ${x.time}</p></div>`, //设置文本标注内容
           direction: "center" //设置文本标注方位
         })
         marker.setMap(GisMap);
         marker.on('click',(e)=>{
           console.log('测试 ')
           self.$store.commit('setDeviceEventItem', {
               id:"780598758940479488"
            });


          self.$store.commit('setStateDIY',{name:'monitWarnCarShow',val:true});

         })
        //var maker = new AMap.
      })
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
    color:#20D3FF;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    padding: 4px 16px;
    font-size: 12px;
    margin-bottom: 0;
  };




}

#GisRoad{
  width: 100%;
  height: 100%;
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
