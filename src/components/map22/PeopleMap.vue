<template lang="html">
  <div class='mapContent'>
    <div class="mapContent-search" v-if="type==1000">
      <div class="inputbox">
        <a-input  v-model="areaName">
          <a-icon slot="suffix" type="search" />
        </a-input>
      </div>
      <div class="arealist mt-1">
        <p class="mb-1">企业</p>
        <div class="areaul" v-if="cfilterList.length">
          <div class="areaitem" v-for="(item,index) in cfilterList" >
            <div>
              <a-checkbox :checked="item.checked" @change="selCom($event,item)">
                <span :title="item.name">{{getName(item.name)}}</span>
              </a-checkbox>
            </div>
          </div>
          
        </div>
        <div class="areaul dialogs-flexrow dialogs-flexcenter" v-if="!cfilterList.length">暂无数据</div>
        <p class="mt-1 mb-1">园区功能区</p>
        <div class="areaul dialogs-flexrow dialogs-flexcenter" v-if="!pfilterList.length">暂无数据</div>
        <div class="areaul " v-if="pfilterList.length">
          <div class="areaitem" v-for="(item,index) in pfilterList">
            <a-checkbox :checked="item.checked" @change="selPark($event,item)">
              <span :title="item.name">{{getName(item.name)}}</span>
            </a-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div :class="type==1000?'amap-warp amap-container amap1000':'amap-warp amap-container amap1001'" id='GisPeople'></div>
    <!-- <div class="amap-warp " id='GisPeople'></div> -->
  </div>

</template>

<script>
// import Clipboard from './clipboard.min.js';
import Model from "./Model.js";
import MapMethods from "@/components/map/tool/mapMethods.js";
export default {
  name:'GisPeople',
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
    areaobj:{
      type:Object,
    },
    funcList:{
      type:Array
    },
    type:{
      type:Number
    },
  },
  data(){
    return{
      formData:{},//输出数据
      GisPeople:{},// map对象
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
    pfilterList(){
      let self = this;
      let list = self.$store.state.pareaList;
      let arr = list.filter(x=>x.name.includes(self.areaName));
      return arr;
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
    getFunc(){
      let self = this;
      self.$api.getRestTree(`${_URL._V3._FULL_AREA}`).then(res=>{
        console.log(res,"区域列表");
        //企业：530000  园区功能区：520000
        let Json = res.data;
        let clist = Json.filter(x=>x.type_value==530000);
        let plist = Json.filter(x=>x.type_value==520000);
        self.$store.commit('setCareaList',clist);
        self.$store.commit('setPareaList',plist);
        self.getArea();
      });
    },
    getArea(){
      let self = this;
      let plist = self.$store.state.pareaList;
      let clist = self.$store.state.careaList;
      let list = [...plist,...clist];
      list.forEach((item)=>{
        let center = JSON.parse(item.area.center);
        item.dataType = 'funArea';
        item.classify = item.type_value;
        item.title = item.name;
        item.position = [center.lng,center.lat];
      });
      let fullArea = {};
      fullArea.tags = MapMethods.setTags(list, self.GisPeople, function(item,tag){
        // item.hide();
        tag.on('click',(e)=>{
          self.GisPeople.panTo(item.position);
          self.GisPeople.setZoom(14.5);
        })
      });
      self.tagList = fullArea.tags;
      self.tagList.forEach(x=>{
        x.hide();
        if(x.area){x.area.hide()}
      });
      //已框选功能区显示功能去 
      if(self.funcList&&self.funcList.length){
        let list = [];
        self.funcList.forEach((x)=>{
          let obj = self.tagList.find(y=>y.extData.id ==x);
          // console.log(obj,"obj--");
          if(obj){
            self.checkList.push(obj);
          }
        });
        self.checkList.forEach(x=>{
          x.show();
          if(x.area){x.area.show()}
        });
        // console.log(self.checkList,"checkList--");
      }
      // console.log(self.tagList,"tagList--");
    },
    selCom(e,item){
      let self = this;
      // console.log(e,item,"check");
      if(e.target.checked){
        self.$set(item,"checked",true);
        if(self.checkList.length==0){
          self.checkList.push(item);
          // console.log(self.checkList,'eee');
          self.checkList.forEach((x)=>{
            self.tagList.forEach(y=>{
              if(y.extData.name==x.name){
                y.show();
                if(y.area){y.area.show()}
              }else{
                y.hide();
                if(y.area){y.area.hide()}
              }
            });
          });
        }else{
          
          let obj = self.checkList.find(x=>x.name==item.name);
          if(!obj){
            self.checkList.push(item);
            // console.log(self.checkList,'ok--');
            self.checkList.forEach((x)=>{
              self.tagList.forEach(y=>{
                if(y.extData.name==x.name){
                  y.show();
                  if(y.area){y.area.show()}
                }
              });
            });
          }
        }
      }else{
        self.$set(item,"checked",false);
        self.checkList = self.checkList.filter(x=>x.name!=item.name);
        // console.log(self.checkList,'cancel');
        if(self.checkList.length==0){
          self.tagList.forEach(x=>{
            if(x.area){x.area.hide()}
            x.hide()
          });
        }
        let islist = [],nolist = [];
        self.tagList.forEach(x=>{
          let obj = self.checkList.find(y=>y.name==x.extData.name);
          if(obj){
            islist.push(x);
          }else{
            nolist.push(x);
          }
        });
        islist.forEach(x=>{
          x.show();
          if(x.area){x.area.show()}
        });
        nolist.forEach(x=>{
          if(x.area){x.area.hide()}
          x.hide()
        });
      }
      self.$store.commit('setCheckList',self.checkList);
    },
    selPark(e,item){
      let self = this;
      // console.log(e,item,"check");
      if(e.target.checked){
        self.$set(item,"checked",true);
        if(self.checkList.length==0){
          self.checkList.push(item);
          // console.log(self.checkList,'eee');
          self.checkList.forEach((x)=>{
            self.tagList.forEach(y=>{
              if(y.extData.name==x.name){
                y.show();
                if(y.area){y.area.show()}
              }else{
                y.hide();
                if(y.area){y.area.hide()}
              }
            });
          });
        }else{
          let obj = self.checkList.find(x=>x.name==item.name);
          if(!obj){
            self.checkList.push(item);
            // console.log(self.checkList,'ok--');
            self.checkList.forEach((x)=>{
              self.tagList.forEach(y=>{
                if(y.extData.name==x.name){
                  y.show();
                  if(y.area){y.area.show()}
                }
              });
            });
          }
        }
      }else{
        self.$set(item,"checked",false);
        self.checkList = self.checkList.filter(x=>x.name!=item.name);
        // console.log(self.checkList,'cancel');
        if(self.checkList.length==0){
          self.tagList.forEach(x=>{
            if(x.area){x.area.hide()}
            x.hide()
          });
        }
        let islist = [],nolist = [];
        self.tagList.forEach(x=>{
          let obj = self.checkList.find(y=>y.name==x.extData.name);
          if(obj){
            islist.push(x);
          }else{
            nolist.push(x);
          }
        });
        islist.forEach(x=>{
          x.show();
          if(x.area){x.area.show()}
        });
        nolist.forEach(x=>{
          if(x.area){x.area.hide()}
          x.hide()
        });
      }
      self.$store.commit('setCheckList',self.checkList);
    },
    getName(name){
      let nameback = '';
      if(name.length>7){
        nameback = name.substring(0,6)+'...'
      }else{
        nameback = name;
      }
      return nameback;
    },
    setMapPlugin(GisMap) {
      AMap.plugin(//通过AMap.plugin方法按需引入插件
        [
          // "AMap.ToolBar",//缩放工具条
          "AMap.Scale",//地图比例尺
          "AMap.MapType",//地图类型切换插件
          // "AMap.ControlBar",//地图移动旋转插件
          "AMap.PolyEditor"//多边形区域编辑插件
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
    sendData(){
      let self = this;
      console.log("1111--");
      let data = self.getData();
      console.log(data,"sendData");
      self.$emit('sendData',data);
    },
    initMap(){ // 初始化地图
      let self = this;
      let AMap = window.AMap;
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
        center:window.ProjectConfig.MapCenter
      }
      if(self.showSatellite){
        mapOption.layers = [new AMap.TileLayer.Satellite()];
      }
      self.GisPeople = new AMap.Map("GisPeople", mapOption);
      // console.log(self.funcList,"funcList-----");
      self.getFunc();
    },

  }
}
</script>

<style lang="less">
@import "../dialogs/dialogs.less";
.mapContent
{
  width: 100%;
  height: 100%;
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
      height:386px;
      background:rgba(9,20,59,1);
      border:1px solid rgba(11,64,131,1);
      padding:12px;
      .areaul{
        background:rgba(14,27,74,0.9);
        border:1px solid rgba(51,75,143,0.36);
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
#GisPeople
{
  height:100%;
  
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
.amap1000{
  .amap-marker-label{
    border:0;
    background-color: transparent;
    transform:translateX(-50%);
  }
}
.amap1001{
  .amap-marker-label{
    border:0;
    background-color: transparent;
  }
}
</style>