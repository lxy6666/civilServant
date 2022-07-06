<template lang="html">
  <div  class="screenMap  mapPart"  id='GisScreenMap'></div>
</template>

<script>
import * as tool from "./tool.js";
import AreaJson from "./area/index.js";
import Model from "./Model.js";

export default {
  name:'GisScreenMap',
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
      let GisScreenMap = new AMap.Map("GisScreenMap", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 16.2,
        rotation: 44,
        pitch:65,
        viewMode: "3D", //开启3D视图,默认为关闭
        buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        zooms: [13, 20],
        center: window.ProjectConfig.MapCenter,
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building"],
        // features: ["bg", "road", "building","point"],
        // layers:[
        //   new AMap.TileLayer.RoadNet({
        //     zooms:[15,20],    //可见级别
        //     visible:true,    //是否可见
        //     opacity:1,
        //   }),
        //   new AMap.TileLayer.Traffic({
        //     zooms:[15,20],    //可见级别
        //     visible:true,    //是否可见
        //     opacity:1,
        //   }),
        // ]
      });
      window.GisScreenMap = GisScreenMap;
      self.setMapFactoy(GisScreenMap);
      self.setLigth(GisScreenMap);


      // 热力图
      self.setHeatMap();


      //加载道闸
      self.setPubilc(GisScreenMap);
      //加载地图缩略控制器
      self.setMapPlugin(GisScreenMap);


      if(!_URL._IsDev){
        console.log('is not local')
        return //
      }




      //调试用代码

      self.setMapClick(GisScreenMap);
      let listTest = [
        {
          height:300,
          path:new AMap.LngLat(118.15365,36.766982)
        },
        {
          height:300,
          path:new AMap.LngLat(118.154004,36.767159)
        },
        {
          height:300,
          path:new AMap.LngLat(118.154448,36.767249)
        },
        {
          height:300,
          path:new AMap.LngLat(118.154426,36.766949)
        },
        {
          height:300,
          path:new AMap.LngLat(118.153671,36.76698)
        }
      ];

      self.setLineTest(GisScreenMap,listTest);
      self.setPrism(GisScreenMap,listTest);

    },
    setPubilc(GisMap){
      let self = this;
      let object3Dlayer = new AMap.Object3DLayer();
      let hydrantLayer = new AMap.Object3DLayer();
      let qxzLayer = new AMap.Object3DLayer();
      let hydrants = [
        {
          name:'1#消火栓',
          position:new AMap.LngLat(118.130465,36.769994),
        },
        {
          name:'2#消火栓',
          position:new AMap.LngLat(118.141604,36.769402),
        },
        {
          name:'3#消火栓',
          position:new AMap.LngLat(118.151154,36.769348),
        }
      ]




      if(window.ProjectConfig.ModelName == 'ZD'){ //老旧书数据 会移除
        Model.loadDZ(GisMap,object3Dlayer,Model.ZD_DZLIST);
        Model.loadRoundModel(GisMap,hydrantLayer,hydrants,'public/hydrant/hydrant.gltf');
        Model.loadQXZ(GisMap,qxzLayer);
      };


      if(window.ProjectConfig.ModelName == 'DMN'){ //老旧书数据 会移除
        Model.loadDZ(GisMap,object3Dlayer,Model.DMN_DZLIST);
        //Model.loadRoundModel(GisMap,hydrantLayer,hydrants,'public/hydrant/hydrant.gltf');
        //Model.loadQXZ(GisMap,qxzLayer);
      };


      let LOADING_MODEL =   Model[window.ProjectConfig.ModelName];

      if(!LOADING_MODEL){return;}
      let LOAD_QXZS = LOADING_MODEL.filter(x => x.type == 'qxz');

      if(LOAD_QXZS && LOAD_QXZS.length){
        let Layer = new AMap.Object3DLayer();
        Layer.name = 'qxzList';

        Model.loadRoundModel(GisMap,Layer,LOAD_QXZS,'public/qxz/qxz.gltf');
      }


      //道闸相关

      let LOAD_ROAD_KEEPER = LOADING_MODEL.filter(x => x.type =='road');

      if(LOAD_ROAD_KEEPER && LOAD_ROAD_KEEPER.length){

        let Layer = new AMap.Object3DLayer();
        Layer.name = 'roadList';
        Model.loadDZ(GisMap,Layer,LOAD_ROAD_KEEPER);
      }

    },
    setPrism(GisMap,ps){
      let object3Dlayer = new AMap.Object3DLayer();
      GisMap.add(object3Dlayer);
      let paths = ps||[
        {
          height:300,
          path:new AMap.LngLat(118.153673,36.767841),
        },
        {
          height:300,
          path:new AMap.LngLat(118.153813,36.767472),
        },
        {
          height:300,
          path:new AMap.LngLat(118.154575,36.767653),
        },
        {
          height:300,
          path:new AMap.LngLat(118.154431,36.768032)
        },
        {
          height:300,
          path:new AMap.LngLat(118.153673,36.767841),
        },

      ];
      let bounds = paths.map(function(x) {
        return x.path
      });
      let height = paths[0].height;
      // 创建 Object3D 对象

      let prism = new AMap.Object3D.Prism({
        path: bounds,
        height: height,
        color: "rgba(100, 150, 230, 0.3)"  // 支持 #RRGGBB、rgb()、rgba() 格式数据
      });
      prism.name =  "E" + Math.random() * 100;
      prism.transparent = true ;
      object3Dlayer.add(prism)
    },
    setMapClick(GisMap){
      if(!localStorage.openSet =='open'){
        return
      }
      GisMap.on('click',(e)=>{
        let marker = new AMap.Marker({
          position: new AMap.LngLat(e.lnglat.getLng(),  e.lnglat.getLat()), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "点位",
          draggable:true,
          icon: "https://cdn.ts-it.cn/692511086720716800sxttss.png",
          animation: "AMAP_ANIMATION_DROP",
        });
        marker.on('dragging',(e)=>{
          console.log(e.lnglat.getLng(),  e.lnglat.getLat(),'----测试--')
        })
        marker.setMap(GisMap)
      })
    },
    setHeatMap() {
      let self = this;
      let heatList = [];
      // self.$api.getRestTree(`${_URL._V3._ALL_DEVICES}?deviceAbilityCode=100001&page`).then(res=>{
      self.$api.getRestTree(`${_URL._V3._ALL_DEVICES}?page=1&deviceAbilityCode=100001&size=999`).then(res=>{
        let Json = res.data;

        // let list = Json;
        let list = Json.data;

        if(list && list.length){
          list = list.filter((x)=>{
            return x.device_type_sup_name.match('大气') || x.device_type_sup_name.match('废气')
          });
          list = list.filter(x=>x.longitude);
          var plist = [];
          list.forEach((x)=>{
            let num = Math.random() * 85;
            let obj = {
              coordinate: [x.longitude, x.latitude],
              count: num
            };
            plist.push(obj);
          })
          let heatMap = new Loca.HeatmapLayer({
            map: window.GisScreenMap,
            zIndex:1000,
          });
          heatMap.setData(plist, {
            lnglat: "coordinate",
            value: "count",
          });
          heatMap.setOptions({
            style: {
              radius: 80,
              color: {
                0.5: "#abd9e9",
                0.6: "#abd9e9",
                0.8: "#ffffbf",
                0.9: "#fde468",
                1.0: "#d7191c"
              },
            },
          });
          window.heatMap = heatMap;
        }
      });


      // Dlist.forEach(item => {
      //   let num = Math.random() * 85;
      //   let obj = {
      //     lng: item[0],
      //     lat: item[1],
      //     count: num
      //   };
      //   heatList.push(obj);
      // });


      /// 3d相关
    },
    setLineTest(GisMap,ps){

      let object3Dlayer = new AMap.Object3DLayer();

      let list = ps||[
        {
          height:300,
          path:new AMap.LngLat(118.153673,36.767841),
        },
        {
          height:300,
          path:new AMap.LngLat(118.153813,36.767472),
        },
        {
          height:300,
          path:new AMap.LngLat(118.154575,36.767653),
        },
        {
          height:300,
          path:new AMap.LngLat(118.154431,36.768032)
        },
        {
          height:300,
          path:new AMap.LngLat(118.153673,36.767841),
        },

      ]

      let meshLine = new AMap.Object3D.MeshLine({
      	path: list.map(x=>x.path) ,
      	height: list.map(x=>x.height*0),
      	color: 'rgba(255,0,0,1)',
      	width: 3
      });

      let meshLineButton = new AMap.Object3D.MeshLine({
      	path: list.map(x=>x.path) ,
      	height: list.map(x=>(x.height/10)),
        color: 'rgba(255,0,0,0.8)',
      	width: 3
      });

      let meshLineMid = new AMap.Object3D.MeshLine({
        path: list.map(x=>x.path) ,
        height: list.map(x=>(x.height/10*2)),
        color: 'rgba(255,0,0,0.6)',
        width: 3
      });

      let meshLineTop = new AMap.Object3D.MeshLine({
        path: list.map(x=>x.path) ,
        height: list.map(x=>(x.height/10*3)),
        color: 'rgba(55,129,240, 0.4)',
        width: 3
      });


      list.forEach((x,index)=>{
        // let next;
        // if(list[index + 1]){
        //   next = list[index + 1].path;
        // }else{
        //   next = list[0].path
        // }

        // let lineItem = new AMap.Object3D.MeshLine({
        //   path: [x.path, next],
        //   height: [40,x.height],
        //   color: 'red',
        //   width: 3
        // });
        //
        // let lineItemR = new AMap.Object3D.MeshLine({
        //   path: [next, x.path],
        //   height: [40,x.height],
        //   color: 'red',
        //   width: 3
        // });
        //
        // object3Dlayer.add(lineItem);
        // object3Dlayer.add(lineItemR);
      });


      // let meshLineBase = new AMap.Object3D.MeshLine({
      //     path: list.map(x=>x.path) ,
      //     height: [40,40,40,40,40],
      //     color: 'red',
      //     width: 3
      // });

      meshLine.transparent = true;
      meshLineButton.transparent = true;
      meshLineMid.transparent = true;
      meshLineTop.transparent = true;

      object3Dlayer.add(meshLine);
      // object3Dlayer.add(meshLineBase);
      object3Dlayer.add(meshLineButton);
      object3Dlayer.add(meshLineMid);
      object3Dlayer.add(meshLineTop);



      GisMap.add(object3Dlayer)
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
    setMapFactoy(map){ // glft模型为 200 层级
      //模拟3D建模  models文件
      let self = this;
      let modelPlace = new AMap.Object3DLayer({zIndex:500,opacity:0.8});
      map.add(modelPlace);
      let isShow3d = JSON.parse(self.$store.state.show3d) ;
      if(isShow3d){
        if(Model[window.ProjectConfig.ModelName]){
          let builds = Model[window.ProjectConfig.ModelName].filter( x => x.type == 'build');
          //  console.log(Model[window.ProjectConfig.ModelName],'-Model[window.ProjectConfig.ModelName]--')
          Model.setBuilsAysnc(map, modelPlace, builds); // 异步同时加载
        }
        console.log('模型开启')
      }else{
        console.log('模型未开启')
      }
      window.modelPlace = modelPlace;
    },
    setLigth(map){ //添加环境光
      if(!map){return}
      map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.8);
      map.DirectionLight = new AMap.Lights.DirectionLight(
        [1, 200, 120],
        [1, 1, 1],
        0.5
      );
      let layer  = new AMap.Object3DLayer();
      map.add(layer);
    },
  }
}
</script>
