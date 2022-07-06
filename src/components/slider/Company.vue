<template lang="html">
  <div class=" tsSlider" :data-type='homePageModel'>
    <CardTitle title='企业' class='subTitleCard-active' />
    <div class="tsSlider-content">
      <loading v-show='showCompanyLoading'/>
      <div class='tsSlider-item'>
        <BudingState :resetCode='restCode' @tabClick='showStatus'  :list='status'  />
      </div>
      <h2 class='tsSliderItem-title'>入驻企业</h2>
      <div class="tsSliderItem-company">
        <CompanyItem :class='sliderActiveCompany==item.name && "companyItem-active"' :key='item.id'
        v-for="(item,index) in sliders" @tabClick="setCompany(item)" :item='item' />
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from '@/components/card/SubTitle.vue';
import * as tool from "@/components/map/tool.js";
import MapText from "@/components/map/mapText/index.js";



import CardTitle from '@/components/card/SubTitleCard';
import BudingState from './components/BudingState';
import TsSliderCardItem from './components/TsSliderCardItem';

import CompanyItem from './components/CompanyItem';


import MapMethods from "@/components/map/tool/mapMethods.js";

export default {
  name:'maincontrol',
  created(){
    let self = this;
    self.getCompanyList();
    self.getStates();
    //self.setOutShadow();
  },
  components:{
    SubTitle,



    CardTitle,
    BudingState,
    TsSliderCardItem,
    CompanyItem,

  },
  beforeCreate(){
    if(window.GisScreenMap && window.NEW_FACTORYS_V2){
      window.GisScreenMap.remove(window.NEW_FACTORYS_V2.tags);
      //window.GisScreenMap.remove(window.NEW_FACTORYS_V2.areas);
    }
  },
  beforeDestroy(){
    if(window.GisScreenMap && window.NEW_FACTORYS_V2){
      window.GisScreenMap.remove(window.NEW_FACTORYS_V2.tags);
      //window.GisScreenMap.remove(window.NEW_FACTORYS_V2.areas);
    }
  },
  computed:{
    sliderActiveCompany(){
      let self = this;
      return self.$store.state.sliderActiveCompany;
    },
    sliders(){
      let self = this;
      let type = self.$projectConfig.SearchCode.park;
      let list = self.companyList.filter(x=> x.type_value !== type);
      return list
    },
    homePageModel(){
      let homePageModel = this.$store.state.homePageModel;
      let showName = homePageModel.slider;
      if(showName.indexOf('factory') === 0 ){
        if(window.GisScreenMap && window.NEW_FACTORYS_V2){
          if(  window.NEW_FACTORYS_V2.tags){
            window.NEW_FACTORYS_V2.tags.forEach((x)=>{
              x.show();
              if(x.area){
                x.area.show();
              }
            })
          }
          if(window._NEW_FUN_AREA && window._NEW_FUN_AREA.tags){
            window._NEW_FUN_AREA.tags.forEach((x)=>{
              x.show();
              if(x.area){
                x.area.show();
              }
            })
          }
        }
      }else{
        if(window.GisScreenMap && window.NEW_FACTORYS_V2){
          if(window.NEW_FACTORYS_V2.tags){
            window.NEW_FACTORYS_V2.tags.forEach((x)=>{
              x.hide();
              if(x.area){
                x.area.hide();
              }
            })
          }
          if(window._NEW_FUN_AREA && window._NEW_FUN_AREA.tags){
            window._NEW_FUN_AREA.tags.forEach((x)=>{
              x.hide();
              if(x.area){
                x.area.hide();
              }
            })
          }
        }
      }
      return showName
    },
    showTypeName(){ //通过show Name控制图标加载
      let showName = this.$store.state.showType;

      if(showName.indexOf('factory') > -1 ){
        if(window.GisScreenMap && window.NEW_FACTORYS_V2){
          window.NEW_FACTORYS_V2.tags.forEach((x)=>{
            x.show();
          })
        }
      }else{
        if(window.GisScreenMap && window.NEW_FACTORYS_V2){
          window.NEW_FACTORYS_V2.tags.forEach((x)=>{
            x.hide();
          })
        }
      }
      return this.$store.state.showType
    }
  },
  watch:{
    $route(n,o) {
      let self = this;
      if(n.name === o.name && n.name === 'factoryDetail'){
          let gid = self.$route.query.gid;
          let target = self.companyList.find(x=>x.gid === gid);
          self.$store.commit('setStateDIY',{name:'sliderActiveCompany',val:target.name});
      }else if(n.name === 'factoryDetail' && o.name!== 'factoryDetail'){
          let gid = self.$route.query.gid;
          let target = self.companyList.find(x=>x.gid === gid);
          self.$store.commit('setStateDIY',{name:'sliderActiveCompany',val:target.name});
      }
    }
  },
  data(){
    return{
      restCode:0,
      showCompanyLoading:false,
      status:[],
      typeName:window.ProjectConfig.IconType,
      filterName:'',
      companyList:[
      ]
    }
  },
  methods:{
    showStatus(type){
      let self = this;
      self.showStatusType = type;
      self.setSider();
    },
    setSider(value){
      let self = this;
      //self.activename = value||'';
      let showList    = [];
      if(window.NEW_FACTORYS_V2){
        let areaObejct = window.NEW_FACTORYS_V2
        let hideList  = areaObejct.tags.filter((x)=>{
          return  x.showType == 530000;
        });
        window.GisScreenMap.remove(hideList);
        if(value){ //activeName 存在筛选
          areaObejct.tags.forEach((item)=>{
            let extData = item.extData;
            if(extData.classify === value){
              showList.push(item);
            }
          });
        }else{//activeName 不存在 全选
          showList = areaObejct.tags;
        }
        if(self.showStatusType != 0){
          showList = showList.filter((x)=>{
            x.extData.status == self.showStatusType;
            return   x.extData.status == self.showStatusType;
          });
        }
        window.GisScreenMap.add(showList);
        if(showList.length){ // 计算平均经纬度逻辑
          let center = [];
          let lats = [];
          let lngs = [];
          let postions = showList.map(x=>x.extData.position);
          let len      = postions.length;
          postions.forEach((x)=>{
            lats.push(x[0]);
            lngs.push(x[1]);
          });
          if(lats.length > 1){
            center[0] = lats.reduce((a,b) =>  (a*1 + b*1))/len;
            center[1] = lngs.reduce((a,b) =>  (a*1 + b*1))/len;
          }else if( lats.length === 1){
            center = [lats[0],lngs[0]];
          }else{
            return
          }
          GisScreenMap.panTo(center);
          GisScreenMap.setZoom(15);
          let logList  = showList.map((x)=> {
            let t = {}
            t.name = x.extData.name
            t.position =x.extData.position
            return t
          });
          console.log(JSON.stringify(logList),'--logList-')
        }
      }
    },
    moveMap(item){
      let center = JSON.parse(item.coordinate)
      GisScreenMap.setZoom(item.rank);//缩放级别
      GisScreenMap.setPitch(item.inclination);//倾角
      GisScreenMap.setRotation(item.rotation);//旋转角度
      GisScreenMap.panTo([center.lng,center.lat]);//聚焦中心点
    },
    sortStatus(a, b) {
      return b.status - a.status
    },
    getStates(){
      let self = this;
      self.$api.getRestTree(_URL._V3._AREA_STATE_FACTORY).then(res=>{
        let Json = res.data;
        Json = Json.sort(self.sortStatus)
        if(Json && Json.length){
          self.status = res.data ||[]
        }
      })
    },
    getName(name){
      return name.replace('有限公司','')
    },
    getCompanyList(){
      let self = this;
      ///frame/function/area
      //v2
      // self.$api.getRestTree(_URL._GET_AREA_V2).then((res)=>{
      //v3

      let searchCode = self.$projectConfig.SearchCode;
      let filterType = searchCode.companyFun;
      let otherType  = searchCode.parkFun;

      self.$api.getRestTree(`${_URL._V3._FULL_AREA}`).then((res)=>{
        let Json =res.data;
        let list = Json.filter(x=>x.area);
        let fullArea = {
          areas:[],
          tags:[],
        };

        list = list.filter(x=> x.area);
        list = list.filter((x)=> {
          return (x.type_value !== filterType && x.type_value !== otherType)
        });
        self.companyList = list;


        list.forEach((item)=>{
          let center = JSON.parse(item.area.center);

          if(item.type_value === searchCode.park){
            item.dataType = 'funArea';
            item.classify = item.type_value;
          }
          if(item.type_value === searchCode.company){
            item.dataType = 'funArea';
            item.classify = item.type_value;
          }
          item.title = item.name;
          item.position = [center.lng,center.lat];
        });
        fullArea.tags = MapMethods.setTags(list, window.GisScreenMap, function(item,tag){
          tag.on('click',(e)=>{
            self.$store.commit('setModelConfig',{
              name:'homePageModel',
              rightView:'factoryDetail',
              slider:'factoryDetail',
              dialog:'factoryDetail',
            });
            self.clearAreaColor();
            if(tag.area){
              tag.area.setOptions({
                strokeOpacity:1,
                strokeWeight:5,
                strokeColor:'#FFFF00',
                zIndex:3000,
              });
            }
            self.$store.commit('setStateDIY',{name:'sliderActiveCompany',val:item.name});
            self.$store.commit('setRightQuery',{name:'factoryDetail',id:item.id,gid:item.gid});
          })
        });
        window.NEW_FACTORYS_V2 = fullArea;
      })
      //MapMethods.setAngle(window.GisScreenMap,220);


    },
    tabClick() {
      this.$emit("tabClick");
    },
    setCompany(item){
      let self = this;
      if(item){

        self.$store.commit('setStateDIY',{name:'sliderActiveCompany',val:item.name});
        //self.$store.commit("setModalCompany",false);
        //self.$router.push({name:'factoryDetail',query:{gid:item.gid}});
        //新模式

        self.showCompanyLoading = true;
        setTimeout(()=>{
          self.showCompanyLoading = false;
        },500)
        self.$store.commit('setModelConfig',{
          name:'homePageModel',
          rightView:'factoryDetail',
          slider:'factoryDetail',
          dialog:'factoryDetail',
        });


        //v2
        //self.$store.commit('setRightQuery',{name:'factoryDetail',id:item.gid})
        //v3
        self.$store.commit('setRightQuery',{name:'factoryDetail',id:item.id,gid:item.gid})

        //self.$store.commit('setShowType','factoryDetail');
        //self.$store.commit('setRightQuery',{name:'factoryDetail',id:item.gid})

        if(window.GisScreenMap){
          self.moveMap(item);
        }
      }
    },
    clearAreaColor(){//清除选中的样式
      let self = this;
      if(window.NEW_FACTORYS_V2){
        let areaObejct = window.NEW_FACTORYS_V2;
        areaObejct.tags.forEach((x)=>{
          if(x.area){
            let opt = x.area.opt
            x.area.setOptions({
              strokeWeight: 2,
              strokeOpacity: 1,
              strokeColor:opt.strokeColor,
              fillOpacity:opt.fillOpacity,
              fillColor:opt.fillColor,
              zIndex:300,
            });
          }

        });
      }
    },

  }

}
</script>

<style lang="less">
@import './slider.less';
.cicon
{
  color:rgb(114,218,255);
  font-size: 16px;
  margin-right: 0.5em;
}


</style>
