<template lang="html">
  <div class="roadMap"  id='GisSecurity'>
    <div class="monit-head gateTools mt-50" v-show='showName === "gate" || showName ==="securityOver"'>
      <jj-card  v-for='item in typeList' :key='item.value'
      :class="activeType==item.value?'jjcardActive':''"@tabClick="setType(item)">{{item.name}}</jj-card>
    </div>
  </div>
</template>

<script>
import * as tool from "./tool.js";
import AreaJson from "./area/index.js";
import JjCard from '@/components/card/JJCard.vue';
export default {
  name:'GisSecurity',
  data(){
    return{
      runCardFlage:false,
      loadCount:0,
      typeList:[
        {
          name:'全部',
          value:1000
        },
        {
          name:'园区',
          value:1001
        },
        {
          name:'企业',
          value:1002
        },
      ],
      activeType:1000,
      makersList:[],
    }
  },
  beforeRouteLeave(n,o,next){ //路由离开事件
    let self = this;

    next();
  },
  components:{
    JjCard
  },
  mounted(){
    window.GisSecurityMapCars = [];
    let self = this;
    let load = function(){
      if(window.AMap){
        self.initRoadMap();
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
    setType(item){
      let self = this;
      self.activeType = item.value;
      self.getMakers();
    },
    initRoadMap(){
      let self   = this;
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);


      window.mks = []; //设置容器
      window.GisSecurityMapCars = [];


      let GisSecurityMap = new AMap.Map("GisSecurity", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 15.4,
        rotation: 0,
        viewMode: "3D", //开启3D视图,默认为关闭
        buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        // zooms: [15, 20],
        center: window.ProjectConfig.MapCenter,
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building","point"],
        layers:[
          new AMap.TileLayer.RoadNet({
            zooms:[15,20],    //可见级别
            visible:true,    //是否可见
            opacity:0.2,
          }),
          new AMap.TileLayer.Traffic({
            zooms:[15,20],    //可见级别
            visible:true,    //是否可见
            opacity:1,
          }),
        ]
      });

      window.GisSecurityMap = GisSecurityMap;

      self.getRoadGates();
      self.getCars();
      self.getPatrols();
      self.setOverBase()
        //
        // let move = function move(){
        //   let postion = makers.getPosition();
        //   console.log(postion);
        //   let x = postion.lat + 0.00001;
        //   let y = postion.lng + 0.00001;
        //   GisRoadMap.panTo([y,x])
        //   let newP = new AMap.LngLat(y,x)
        //   makers.setPosition(newP);
        //   setTimeout(()=>{
        //     move()
        //   },50)
        // }

        var markerP = new AMap.Marker({
          title:'执法仪测试点',
          map:GisSecurityMap,
          position:new AMap.LngLat(118.153405,36.767607),
        });
        let content = `
          <div class='lawcard'>
            <h2 class='lawcard-head'><i class='iconfont icon-xungenghl'></i> <span>巡更人:邓力夫</span> </h2>
            <div class="lawcard-content">
              <img src="https://cdn.ts-it.cn/727581004654579712xungengceshitupian.jpg" />
            </div>
          </div>
        `
        markerP.setLabel({
          offset: new AMap.Pixel(-26, -32), //设置文本标注偏移量
          content: content, //设置文本标注内容
          direction: "right" //设置文本标注方位
        });


        markerP.on('click',()=>{
          console.log("点击测试人员===");
          self.$router.push({
            name:'PatrolDetail',query:{devIdno:'725486362056331264'}
          });
        })
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
      GisSecurityMap.add(objectBase);
      return objectBase
    },
    getCars(){ // 车辆点位列表 实时更新 地图点位移动 暂停
      return
      let self = this;
      self.$api.getRestTree(`${_URL._GET_CARS}`).then(res=>{
        let Json = res.data;
        if(Json && Json.length){
          if(window.GisSecurityMapCars){
          //  let
          }
          Json.forEach((item)=>{
            AMap.convertFrom([item.track_detail.mlng,item.track_detail.mlat],'baidu',function(status, result){
              if (result.info === 'ok') {
                var resLnglat = result.locations[0];

                let  postion = [resLnglat.lng, resLnglat.lat];

                if(window.GisSecurityMapCars){
                  let target =  GisSecurityMapCars.find(x=> x.device_id === item.device_id);
                  if(target){
                    let p = new AMap.LngLat(postion[0],postion[1]);
                    target.setPosition(p);
                  //  GisSecurityMap.panTo(p);
                  }else{
                    var maker = new AMap.Marker({
                      title:item.device_id,
                      content:`<i class=' markerGate-icon iconfont icon-car'></i>`,
                      postion:postion,
                    });
                    maker.device_id = item.device_id;
                    maker.movePostion = postion;

                    let content =`
                    <div class="markerV2 markerV2-cool">
                      <div class="markerV2-content">
                        <p class="markerV2-text">${item.license}</p>
                      </div>
                      <div class="markerV2-bottom"></div>
                    </div>`

                    maker.setLabel({
                      offset: new AMap.Pixel(-26, -32), //设置文本标注偏移量
                      content: content, //设置文本标注内容
                      direction: "right" //设置文本标注方位
                    });

                    maker.on('click',(e)=>{
                      self.$router.push({
                        name:'trafficDetail',
                        query:{license:item.license,device_id:item.device_id}
                      })
                      //self.getCarDetail(item.license)
                    })
                    GisSecurityMapCars.push(maker);
                    GisSecurityMap.add(maker);

                  }
                }
              }
            });

          });
        }


        setTimeout(()=>{
          self.getCars()
        },3000)
      })
    },
    getRoadGates(gid){
      let self = this;
      let search ;
      if(gid){
        search = `?gid=${gid}`;
      }else{
        search = '';
      }
      self.$api.getRestTree(`${_URL._GET_GATES_LIST}${search}`).then(res=>{
        let Json = res.data;
        let list = [];
        let areas = [];
        console.log(Json,"道闸---");
        if(Json && Json.length){
          Json.forEach((item)=>{
            if(item.area && item.area.longitudelatitude){
              let area = item.area;
              areas.push(area);
              var makers = new AMap.Marker({
                map:GisSecurityMap,
                content:`<i class=' markerGate-icon iconfont icon-roadgatehl '></i>`,
                title:item.name,
                position:[item.longitude, item.latitude],
                zIndex:1000
              });
              let content = '';

              if(item.gid === "683913282272235520"){
                 content = `
                  <div class='markerGate markerGateBlue'>
                    <h2 class='markerGate-head'><i class='markerGate-icon iconfont icon-roadgatelinenor '></i> ${item.company_name}道闸</h2>
                    <h2 class='markerGate-title'>${item.name}<em>园区道闸</em></h2>
                  </div>
                `;
                makers.type = '园区';
              }else{
                 content = `
                  <div class='markerGate'>
                    <h2 class='markerGate-head'><i class=' markerGate-icon iconfont icon-roadgatelinenor '></i> ${item.company_name}</h2>
                    <h2 class='markerGate-title'>${item.name} <em>企业道闸</em></h2>
                  </div>
                `;
                makers.type = '企业';
              }
              makers.setLabel({
                offset: new AMap.Pixel(-16, -37), //设置文本标注偏移量
                content: content, //设置文本标注内容
                direction: "right" //设置文本标注方位
              });

              makers.on('click',(e)=>{
                console.log(item,'----点击道闸--------');
                self.$router.push({name:'gateDatail',query:{gateId:item.id}});
              })
              self.makersList.push(makers);
            }
          })
        }
        self.gataSetAreas(areas)

      })
    },
    getMakers(){
      let self = this;
      if(self.makersList&&self.makersList.length){
        self.makersList.forEach((item)=>{
          if(self.activeType==1000){//全部
            item.show();
          }else if(self.activeType==1001){
            if(item.type=='园区'){
              item.show();
            }else{
              item.hide();
            }
          }else if(self.activeType==1002){
            if(item.type=='企业'){
              item.show();
            }else{
              item.hide();
            }
          }
        });
      }
    },
    gataSetAreas(areas){
      let listNew = [];
      let walllayer   = new AMap.Object3DLayer({
        map:GisSecurityMap,
        zIndex:100,
        opacity:1
      })
      if(areas.length){
        areas.forEach((item)=>{
          let paths = JSON.parse(item.longitudelatitude);
          if(listNew.length){
            let target = listNew.find( x=> x.id === item.id );
            if(!target && paths.length){
              let obj = {
                id:item.id,
                paths:paths,
              }
              listNew.push(obj);
            }
          }else{
            if(paths.length){

              let obj = {
                id:item.id,
                paths:paths,
              }
              listNew.push(obj);
            }

          }
        })
      };
      if(listNew.length){
        listNew.forEach((x)=>{
          //创建围墙
          let wallOpt={h:120,c:'#005be2'}
          let wall =  tool.createdWall(x.paths,wallOpt);
          if(wall){
            walllayer.add(wall);
          }


          //创建底图色
          let AreaOpt   = {
                  c : '#005be2',
                 bg : '#005be2',
            opacity : 0.3
          };


          let baseArea = tool.createBase(x.paths,AreaOpt,200);

          GisSecurityMap.add(baseArea);
          // console.log(wall,'-----obj-------------')
        })
      }
      return listNew;
    },
    getCarDetail(carId){
      let self = this;
      self.$api.getRestTree(`${_URL._GET_CAR_DETAIL}?license=${carId}`).then(res=>{
        console.log(res.data,'==更具车牌号查询--------');
      })
    },
    getPatrols(){ //创建巡逻的点位
      let self = this;
      self.$api.getRestTree(`${_URL._GET_LAW_RECORDS}?page=1&size=99`).then(res=>{
        console.log(res.data,'查询执法仪列表');
        let Json = res.data;
        if(!Json.length){
          Json =  [
              {
                  "id": "725486362056331264",
                  "recorder_id": "725164602450644992",
                  "dev_name": "gwhzfy0001",
                  "employees_id": 60,
                  "employees_name": "李欣",
                  "employees_mobile": "18853851200",
                  "type": 47001,
                  "start_time": 1576818720000,
                  "online_status": 1,
                  "is_alarm": false,
                  "electric": 30,
                  "company": "东部化工区管委会",
                  "patrol_status": 1002,
                  "live_address": "http://39.106.118.255:8088/808gps/open/hls/index.html?lang=zh&devIdno=90007262&account=TSXICS&password=000000",
                  "patrol_route": "http://39.106.118.255:8088/808gps/open/trackReplay/Track.html?vehiIdno=90007262&jsession=35636f15-85f8-449e-b823-3527ab0c3760&begintime=2019-12-20 13:12:00&endtime=2019-12-27 13:12:00",
                  "having_alarm": true,
                  "mlng": "117.189951",
                  "mlat": "36.211191",
                  "snap_address":"https://cdn.ts-it.cn/727581004654579712xungengceshitupian.jpg"
              }
          ]
        }
        if(Json && Json.length){
          Json.forEach((item)=>{
            var makers = new AMap.Marker({
              map:GisSecurityMap,
              title:item.name,
              position:[item.mlng, item.mlat],
            });
            // <img src="http://${item.snap_address}" />
            let content = `
              <div class='lawcard'>
                <h2 class='lawcard-head'><i class='iconfont icon-xungenghl'></i> <span>巡更人:${item.employees_name}</span> </h2>
                <div class="lawcard-content">
                  <img src="http://${item.snap_address}" />
                </div>
              </div>
            `
            // <iframe src='${item.live_address}' class='pvideo'></iframe>
            makers.setLabel({
              offset: new AMap.Pixel(-26, -32), //设置文本标注偏移量
              content: content, //设置文本标注内容
              direction: "right" //设置文本标注方位
            });


            makers.on('click',()=>{
              console.log(item,'----点击执法仪--------');
              self.$router.push({
                name:'PatrolDetail',query:{devIdno:item.id}
              });
            })
            makers.movePostion = [item.mlng, item.mlat];
          })
        }

      });
      return
    },

  }
}
</script>

<style lang="less">
.roadMap{
  display: flex;
  flex-direction: column;
  flex:1;
  width: 100%;
}

.pvideo
{
  width: 120px;
  height: 80px;
}
.markePatrol{
  display: flex;
  flex-direction: column;
  background: rgba(0, 56, 118, 1);
  border:1px solid #eee;
}
.gateTools {
    position: fixed;
    z-index: 200;
    display: flex;
    flex-direction: row;
    background: none;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    max-width: 398px;
  }
</style>
