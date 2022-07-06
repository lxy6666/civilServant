<template lang="html">
  <div class='dmapContent'>
    <div class="dmapContent-search" >
      <!-- <div class="inputbox">
        <a-input  v-model="areaName">
          <a-icon slot="suffix" type="search" />
        </a-input>
      </div> -->
      <div class="arealist mt-1">
        <div class="areaul">
          <!-- <div class="areaitem" >
            <div>
              <a-checkbox @change="selCom($event)">
                <span>全部</span>
              </a-checkbox>
            </div>
          </div> -->
          <div class="areaitem" v-for="(item,index) in abilityList" >
              <a-checkbox @change="selCom($event,item)">
                <span :title="item.name">{{item.name}}</span>
              </a-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="amap-warp" id='GisDevice'></div>
    <div class="dialogs-flexrow dialogs-flexend mt-2" >
      <a-button class="dialogs-btnshadow" :loading="btnloading" @click='saveDevice'>确认提交</a-button>
    </div>
  </div>

</template>

<script>
// import Clipboard from './clipboard.min.js';
import Model from "./Model.js";
import MapMethods from "@/components/map/tool/mapMethods.js";
export default {
  name:'GisDevice',
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
    funcList:{
      type:Array
    },
  },
  data(){
    return{
      btnloading:false,
      formData:{},//输出数据
      GisDevice:{},// map对象
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
      areaName:'',
      tagList:[],
      checkList:[],
      abilityList:[],
      deviceList:[],
    }
  },
  computed:{
    sendDataJson(){
      let self = this;
      return JSON.stringify(this.formData);
    },
    cfilterList(){
      let self = this;
      let list = self.$store.state.careaList;
      let arr = list.filter(x=>x.name.includes(self.areaName));
      return arr;
    },
    type(){
      let self = this;
      //控制表单是否禁用 detail edit
      return self.$store.state.acdtState;
    },
  },
  watch:{
    timeStamp(newVal,oldVal){
      let self = this;
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
    getArea(){
      let self = this;
      let list = self.$store.state.deviceList;
      let deviceTags = [];
      list.forEach((x)=>{
        let obj = {
          id:x.id||'',
          icon:x.icon||'',
          dataType:'device',
          title:x.name||'',
          latitude:x.latitude||'',
          longitude:x.longitude||'',
          device_ability_code:x.device_ability_code,
          device_id:x.id,
          name:x.name,
          device_type_id:x.device_type_id
        };

        if(obj.latitude && obj.longitude){
          let tagItem = MapMethods.setDeviceMark(obj, self.GisDevice, function(item,tag){
            tag.on('click',(e)=>{
            })
          });
          deviceTags.push(tagItem);
        }
      });
      self.tagList = deviceTags;
      console.log(self.tagList,"--list-");
      self.tagList.forEach(x=>{
        x.hide();
      });
      //已框选功能区显示功能去
      self.deviceList = self.$store.state.seldeviceList;
      console.log(self.deviceList,"self.deviceList----");
      if(self.deviceList&&self.deviceList.length){
        let list = [];
        self.deviceList.forEach((x)=>{
          let obj = self.tagList.find(y=>y.extData.id ==x.device_id);
          console.log(obj,"obj--");
          if(obj){
            obj.show();
          }
        });
      }
      // console.log(self.tagList,"tagList--");
    },
    selCom(e,item){
      let self = this;
      // console.log(e,item,"check");
      if(e.target.checked){
        if(self.checkList.length==0){
          self.checkList.push(item);
          // console.log(self.checkList,'eee');
          self.checkList.forEach((x)=>{
            self.tagList.forEach(y=>{
              if(y.extData.device_ability_code==x.value){
                y.show();
              }else{
                y.hide();
              }
            });
          });
        }else{
          let obj = self.checkList.find(x=>x.value==item.value);
          if(!obj){
            self.checkList.push(item);
            // console.log(self.checkList,'ok--');
            self.checkList.forEach((x)=>{
              self.tagList.forEach(y=>{
                if(y.extData.device_ability_code==x.value){
                  y.show();
                }
              });
            });
          }
        }
      }else{
        self.checkList = self.checkList.filter(x=>x.value!=item.value);
        // console.log(self.checkList,'cancel');
        if(self.checkList.length==0){
          self.tagList.forEach(x=>{
            x.hide();
          });
        }
        let islist = [],nolist = [];
        self.tagList.forEach(x=>{
          let obj = self.checkList.find(y=>y.value==x.extData.device_ability_code);
          if(obj){
            islist.push(x);
          }else{
            nolist.push(x);
          }
        });
        islist.forEach(x=>{
          x.show();
        });
        nolist.forEach(x=>{
          x.hide();
        });
      }
    },
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
    loadMarkers(){
      let self = this;
      let list = [];
      list.forEach((x)=>{

      });
    },
    saveDevice(){
      let self = this;
      self.btnloading = true;
      self.circleEditor.close();//圆环结束编辑



      //新增项 JC2.0
      let response_id = self.$route.query.response_id;
      let task_name =self.$store.state.taskForm.name;


      let taskid = self.$store.state.taskForm.id;
      let center = self.circle.getCenter();
      let radius = self.circle.getRadius();
      self.deviceList.forEach((item)=>{
        item.longitude = center.lng;
        item.latitude = center.lat;

        item.radius = radius;
        //新增
        item.response_id = response_id;
        item.task_name = task_name;
      });
      console.log(center,radius,"zhongxin--");
      let body = self.deviceList;

      let params = {
        url: `${_URL._V3._EMER_TASKDVC}/${taskid}`,
        body: body
      };

      console.log(params, "params---");
      // return;
      self.$api.putRestTree(params).then(function(res) {
        console.log(res, "任务关联设备--res");
        setTimeout(() => {
          self.getDeviceList();
        }, 500);

      }).catch(err => {
        self.circleEditor.open();
        console.log(err.response, "任务关联设备--err");
      });
    },
    getTask(){
      let self = this;
      let taskid = self.$store.state.taskForm.id;
      self.$api.getRestTree(`${_URL._V3._EMER_TASK}/${taskid}`).then(res=>{
        console.log(res,'任务详情');
        let Json = res.data;
        self.$store.commit('setTaskForm',Json);
        self.$store.commit('setEmertwoModel',{
          show:false,
          dialog:'',
        });
      });
    },
    getDeviceList(){
      let self = this;
      let resid = self.$route.query.response_id?`?responseId=${self.$route.query.response_id}`:'';
      let taskid = self.$store.state.taskForm.id?`&taskId=${self.$store.state.taskForm.id}`:'';
      self.$api.getRestTree(`${_URL._V3._EMER_TASKDVC}${resid}${taskid}`).then(res=>{
        console.log(res,'设备列表');
        let Json = res.data;
        self.getTask();
        if(Json.length){
          Json.forEach((item)=>{
            item.name = item.device_name;
          });
          let obj = {
            string: 'seldeviceList',
            thing: res.data,
          };
          self.$store.commit("setThing", obj);
        }else{
          let obj = {
            string: 'seldeviceList',
            thing: [],
          };
          self.$store.commit("setThing", obj);
        }

      });
    },
    getAbilityList(){
      let self = this;
      self.$api.getRestTree(`${_URL._V3._DICT_CODE}/DEVICE_ABILITY`).then(res=>{
        console.log(res,"设备能力列表");
        self.abilityList = res.data;
      });
    },
    createCircle(map){
      let self = this;
      let taskform = self.$store.state.taskForm;
      console.log(taskform,"taskform--");
      let center = taskform.longitude?[taskform.longitude,taskform.latitude]:window.ProjectConfig.MapCenter;
      let radius = taskform.radius?taskform.radius:500;
      let circle  = new AMap.Circle({
        center: center,
        radius: radius, //半径
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
      map.setFitView([ self.circle ]);
      self.setCircle();
    },
    setCircle(){
      let self = this;
      let circleEditor = new AMap.CircleEditor(self.GisDevice, self.circle);
      self.circleEditor = circleEditor;
      circleEditor.open();//开始编辑
      // circleEditor.close();//结束编辑


      self.circleEditor.on('move', function(event) {
        console.log('move');
      });
      self.circleEditor.on('adjust', function(event) {
          console.log('触发事件：adjust');

      })
      self.circleEditor.on('end', function(event) {
        let list = [];
        console.log(self.deviceList,"deviceList--");
        self.tagList.forEach((item)=>{
          if(self.checkList.length){//如果选中了设备能力
            let obj = self.checkList.find(x=>x.value==item.extData.device_ability_code);
            if(obj){
              let isInCircle = self.circle.contains(item.getPosition());
              if(isInCircle == true){
                list.push(item);
              };
            }
          }else if(!self.checkList.length&&self.deviceList.length){//如果没选中设备能力，但是关联了设备
            let obj = self.deviceList.find(x=>x.device_ability_code==item.extData.device_ability_code);
            if(obj){
              let isInCircle = self.circle.contains(item.getPosition());
              if(isInCircle == true){
                list.push(item);
              };
            }
          }

        });
        console.log(self.checkList,"checklist--");
        console.log(list,"list===");
        if((self.deviceList.length==0)||
           (self.deviceList.length&&list.length)){
            //如果选中设备数组长度为0则保存||数组长度不为0选择了设备
          self.deviceList = list.map((x)=>{
            let obj = {
              device_ability_code:x.extData.device_ability_code,
              device_id:x.extData.id,
              device_type_id:x.extData.device_type_id,
              name:x.extData.name,
            };
            return obj;
          });
        }//其他保存设备

        console.log('触发事件： end')
      });
    },
    initMap(){ // 初始化地图
      let self = this;
      let AMap = window.AMap;
      let taskform = self.$store.state.taskForm;
      let center = taskform.longitude?[taskform.longitude,taskform.latitude]:window.ProjectConfig.MapCenter;
      console.log(center,"cent---");
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
        zooms: [0, 20],
        mapStyle: "amap://styles/f43bad33293e1da877382d43f35830bb",
        features: ["bg", "road", "building","point"],
        center:center
      }

      self.GisDevice = new AMap.Map("GisDevice", mapOption);
      self.setMapPlugin(self.GisDevice);
      self.getArea();
      self.getAbilityList();
      self.createCircle(self.GisDevice);
    },

  }
}
</script>

<style lang="less">
@import "../dialogs/dialogs.less";
.dmapContent
{
  width: 100%;
  height: calc(100% - 44px);
  position: relative;
  &-search{
    z-index:3000;
    position: absolute;
    top:12px;
    left:12px;
    .ant-input {
        background-color: rgba(9, 20, 59, 1) !important;
        border: 1px solid rgba(11, 64, 131, 1) !important;
        color: rgba(145, 195, 249, 1) !important;
        border-radius: 2px !important;
    }
    .arealist{
      width:194px;
      height:160px;
      background:rgba(9,20,59,1);
      border:1px solid rgba(11,64,131,1);
      .areaul{
        height:140px;
        overflow: auto;
        .areaitem{
          height:30px;
          padding:4px 4px 4px 12px;
          .ant-checkbox-wrapper {
              color: rgba(145, 195, 249, 1);
          }
          .ant-checkbox-inner {
              border: 1px solid rgba(145, 195, 249, 1);
          }
        }
        .areaitem:hover{
          background:rgba(28,47,99,1);
        }
      }
      .areaul::-webkit-scrollbar{
        display:none;
      }
    }
  }
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
#GisDevice
{
  height:100%;
  .amap-marker-label{
    border:0;
    background-color: transparent;
    // transform:translateX(-50%);
  }
}

.amap-logo{
display: none!important;
}
.amap-copyright{
opacity:0;
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
