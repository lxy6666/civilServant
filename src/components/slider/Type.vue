<template lang="html">
  <div class=" tsSlider" :data-type='homePageModel.slider' >
    <CardTitle :title='typeCofing.typeName||"监测区域"' @tabClick='clearSelect' :data-type='typeCofing' class='subTitleCard-active' />
    <div class="tsSlider-content ">
      <div class='tsSlider-item'>
        <BudingState :resetCode='restCode' @tabClick='showStatus' :list='status'/>
      </div>
      <!-- <div class='tsSlider-item pd-1' v-show='getShowType(item.subList)'
        v-for="(item,index) in siders" :key="item.id">
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>{{item.name}}</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(sub)'
             v-show='sub.count'
             :item='sub' :key='sub.id' v-for='sub in item.subList' @tabClick="setSider(sub.classify)"/>
          </div>
        </div>
      </div> -->
      <div class='tsSlider-item pd-1' v-show='getShowType(item.counts)'
        v-for="(item,index) in siders" :key="item.id">
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>{{item.type_name}}</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(sub)'
             v-show='sub.count'
             :item='sub' :key='sub.classify' v-for='sub in item.counts' @tabClick="setSider(sub.classify)"/>
          </div>
        </div>
      </div>

      <loading  class='loadingModel' v-show='showTypeLoading'/>

      <!-- <div class='tsSlider-item pd-1' >
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>监测区域</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(sub)'
             :item='sub' :key='sub.id' v-for='sub in typeList' @tabClick='setSider(sub.classify)' />
          </div>
        </div>
      </div> -->
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



import MapMethods from "@/components/map/tool/mapMethods.js";

export default {
  name:'maincontrol',
  created(){
    let self = this;
    //self.getCompanyList();
    self.getFullArea();//地板
    // self.getMonitList();
    // self.getMonitArea();
  },
  components:{
    SubTitle,
    CardTitle,
    BudingState,
    TsSliderCardItem,

  },
  beforeCreate(){
    if(window.GisScreenMap && window._NEW_FUN_MONITS_AREA_TYPE){
      window.GisScreenMap.remove(window._NEW_FUN_MONITS_AREA_TYPE.tags);
    }
    if(window.GisScreenMap && window.NEW_AREAS_M_OTHER){
      window.GisScreenMap.remove(window.NEW_AREAS_M_OTHER.tags);
    }
  },
  beforeDestroy(){
    if(window.GisScreenMap && window._NEW_FUN_MONITS_AREA_TYPE){
      window.GisScreenMap.remove(window._NEW_FUN_MONITS_AREA_TYPE.tags);
    }
    if(window.GisScreenMap && window.NEW_AREAS_M_OTHER){
      window.GisScreenMap.remove(window.NEW_AREAS_M_OTHER.tags);
    }
  },
  computed:{
    tagLevelActive(){
      return this.$store.state.tagLevelActive;
    },
    homePageModel(){
      let self = this;
      let homePageModel = this.$store.state.homePageModel;
      let showName = homePageModel.slider;
      if(showName.indexOf('monitor') === 0 ){
        if(window.GisScreenMap && window.NEW_AREAS_M_OTHER){
          window.NEW_AREAS_M_OTHER.tags.forEach((x)=>{
            x.show();
            if(x.area){
              x.area.show();
            }
          })
        }
        if(window.GisScreenMap && window._NEW_FUN_MONITS_AREA_TYPE){
          window._NEW_FUN_MONITS_AREA_TYPE.tags.forEach((x)=>{
            if(self.activeTag === ''){
              x.show();
            }else if(x.extData.showType === self.activeTag){
              if(x.extData.type_name == '重大危险源'){
                let tid = self.$store.state.tagLevelActive;
                if(x.tagLevelId == tid){
                  x.show()
                }
              }else{
                x.show();
              }
            }
            if(x.area){
              x.area.show();
            }
          })
        }
      }else{
        self.showStatusType = 0;
        self.restCode = (self.restCode + 1);
        if(window.GisScreenMap && window.NEW_AREAS_M_OTHER){
          window.NEW_AREAS_M_OTHER.tags.forEach((x)=>{
            x.hide()
            if(x.area){
              x.area.hide();
            }
          })
        }
        if(window.GisScreenMap && window._NEW_FUN_MONITS_AREA_TYPE){
          window._NEW_FUN_MONITS_AREA_TYPE.tags.forEach((x)=>{
            x.hide()
            if(x.area){
              x.area.hide();
            }
          })
        }
      }
      return showName
    },
    typeCofing(){
      let self = this;
      let t = this.$store.state.homePageModel;
      let j =JSON.parse(JSON.stringify(t));
      console.log(j,"j----");
      if(t.rightView.indexOf('monitoring') > -1){
        self.typeObj = j;
        //self.getMonitList();

        self.getMonitArea();
        // self.getTypeIdList();
        self.getStates();
        self.getMonitSide();
      }
      return this.$store.state.homePageModel;
    },
    showTypeName(){
    }
  },
  watch:{
    $route(n,o) {
      let self = this;
      if(n.name === o.name && n.name === 'factoryDetail'){
          let gid = self.$route.query.gid;
          let target = self.companyList.find(x=>x.gid === gid);
          self.activeTag = target.name;
      }else if(n.name === 'factoryDetail' && o.name!== 'factoryDetail'){
          let gid = self.$route.query.gid;
          let target = self.companyList.find(x=>x.gid === gid);
          self.activeTag = target.name;
      }
    },
    tagLevelActive(n,o){
      let self = this;
      self.setSider(610101);
      if(window._NEW_FUN_MONITS_AREA_TYPE && window._NEW_FUN_MONITS_AREA_TYPE.tags){
        let tags = window._NEW_FUN_MONITS_AREA_TYPE.tags;
        if(tags.length){
          tags = tags.filter(x=> x.isZDWXY);
          if(tags.length){
            if(n == 1000){
              tags.forEach((x)=>{
                x.show()
              })
            }else{
              tags.forEach((x)=>{
                if(x.tagLevelId == n){
                  x.show()
                }else{
                  x.hide()
                }
              })

            }

          }
        }
      }
    }
  },
  data(){
    return{
      restCode:0,
      showStatusType:0,
      showTypeLoading:false,
      siders:[],
      typeObj :{},
      status:[],
      activeTag:'',
      typeList:[
      ]
    }
  },
  methods:{
    getShowType(list){
      let f = false;
      if(list.length){
        list.forEach((x)=>{
          if(x.count){
            f = true;
          }
        });
      }
      return f;
    },
    getFullArea(){ //地图交互 默认加载所有区域
      let self = this;
      ///frame/function/area
      let searchCode = self.$projectConfig.SearchCode;
      let filterType = searchCode.companyFun;
      let otherType  = searchCode.parkFun;
      self.$api.getRestTree(`${_URL._V3._FULL_AREA}`).then(res=>{
        let list = res.data;
        let fullArea = {
          tags:[],
        };
        list = list.filter(x=> x.area);
        list = list.filter((x)=> {
          return (x.type_value !== filterType && x.type_value !== otherType)
        });

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

        });
        // fullArea.
        window.NEW_AREAS_M_OTHER = fullArea;
      })
    },
    setSider(value){
      let self = this;
      self.showTypeLoading = true;
      setTimeout(()=>{
        self.showTypeLoading = false;
      },500);
      self.activeTag = value||'';
      let showList    = [];
      if(window._NEW_FUN_MONITS_AREA_TYPE){
        let areaObejct = window._NEW_FUN_MONITS_AREA_TYPE;
        window.GisScreenMap.remove(areaObejct.tags);
        if(value){ //activeTag 存在筛选
          areaObejct.tags.forEach((item)=>{
            let showType = item.showType;
            if(showType === value){
              showList.push(item);
            }
          });
        }else{//activeTag 不存在 全选
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
          GisScreenMap.setZoom(14.5);
          let logList  = showList.map((x)=> {
            let t = {}
            t.name = x.extData.name
            t.position =x.extData.position
            return t
          });
        }
      }
    },
    showStatus(type){
      let self = this;
      self.showStatusType = type;
      self.setSider(self.activeTag);
    },
    clearSelect(){
      let self = this;
      self.activeTag = '';
      self.restCode = (self.restCode + 1);
      self.showStatusType = 0;

      if(window._NEW_FUN_MONITS_AREA_TYPE){
        let areaObejct = window._NEW_FUN_MONITS_AREA_TYPE;
        window.GisScreenMap.remove(areaObejct.tags);
        setTimeout(()=>{
          window.GisScreenMap.add(areaObejct.tags);
        },200);
      }
    },
    getClass(sub){
      let self = this;
      let className = '';
      if(self.activeTag === sub.classify){
        if(sub.classify_name){
          if(sub.classify_name.length > 8){
            className = "TsSliderCardItem-row-active";
          }else{
            className = "TsSliderCardItem-active";
          }
        }
      }
      return className
    },
    moveMap(item){
      let center = JSON.parse(item.coordinate)
      GisScreenMap.setZoom(item.rank);//缩放级别
      GisScreenMap.setPitch(item.inclination);//倾角
      GisScreenMap.setRotation(item.rotation);//旋转角度
      GisScreenMap.panTo([center.lng,center.lat]);//聚焦中心点
    },
    sortStatus(a, b) {
      return a.status - b.status
    },
    getStates(){
      let self = this;
      let typeId = self.typeObj.id || ''
      let url  = _URL._V3._AREA_STATE_MONIT + `/${typeId}`
      self.$api.getRestTree(url).then(res=>{
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
    getMonitArea(){
      let self = this;
      let query = `?firstId=${self.typeObj.id}`;
      self.$api.getRestTree(`${_URL._V3._MAREA}/${query}`).then(res=>{
        let Json = res.data;
        if(!Json.length){
          console.log('没有数据');
        }
        let Gis_v3_BLock =  new AMap.Object3DLayer({zIndex:300});

        let Gis_V3_Markers = [];
        let Gis_V3_AreaList = [];

        if(window._NEW_FUN_MONITS_AREA_TYPE){
          //GisScreenMap.remove(_NEW_FUN_MONITS_AREA_TYPE.layer)
          GisScreenMap.remove(_NEW_FUN_MONITS_AREA_TYPE.tags)
        }
        if(window.GisScreenMap){
          GisScreenMap.add(Gis_v3_BLock)

          Json = Json.filter(x=> x.area);

          Json.forEach((item)=>{
            let center = JSON.parse(item.area.center);
            item.dataType = 'monitorArea';
            item.title = item.name;
            item.position = [center.lng,center.lat];
            item.showType = item.type_value;
            item.fTypeValue = self.typeObj.typeValue;
            item.showStatus = item.status;
            if(item.attrs && item.attrs.length){
              let tt = item.attrs.find(i=> i.key == "重大危险源分级");
              if(tt){
                item.tagLevelName = tt.int_value_name;
                item.tagLevelId = tt.int_value;
              }
            }
          })
          let tx = Json.filter((x)=>{
            return x.tagLevelName;
          });
          self.getLevelTags(Json);
          let tags = MapMethods.setTags(Json, window.GisScreenMap, function(item,tag){
            if(item.tagLevelName){
              tag.isZDWXY = true;
              tag.tagLevelName = item.tagLevelName;
              tag.tagLevelId = item.tagLevelId;
            }
            tag.on('click',(e)=>{
              let modelConfig = self.$store.state.homePageModel;
              modelConfig.rightView = 'factoryDevice';
              modelConfig.name = 'homePageModel';
              modelConfig.dialog = 'factoryDevice';
              self.$store.commit('setModelConfig',{
                ...modelConfig
              });



              self.$store.commit('setRightQuery',{name:'homePageModel',id:item.id});
              self.$store.commit('addOverCount');
              GisScreenMap.panTo(item.position);

            })
          });

          window._NEW_FUN_MONITS_AREA_TYPE ={
            tags:tags,
          }
        }
      });
    },
    getMonitList(){
      let self = this;
      ///frame/function/area
      //v2
      // self.$api.getRestTree(_URL._GET_AREA_V2).then((res)=>{
      //v3
      self.$api.getRestTree(`${_URL._V3._MTYPE_CONT}/${self.typeObj.id}`).then((res)=>{
        let Json =res.data;
        console.log(Json,'---Json-typeObj--');
        Json.forEach((x)=>{
          x.classify_name = x.type_name;
          x.classify =x.type_value;

        })
        self.typeList = Json;
      }).catch(err=>{
        console.log(err,'--异常--')
      })

    },
    tabClick() {
      this.$emit("tabClick");
    },
    getTypeIdList(){
      let self= this;
      let query = `?firstId=${self.typeObj.id}&level=1002`;

      self.$api.getRestTree(_URL._V3._PARK_AREA_TYPE + query).then(res=>{
        let list = res.data;
        let promselist = [];
        list.forEach((item)=>{
          promselist.push(self.getTypeList(item))
        });
        Promise.all(promselist).then(res=>{
          self.siders = list;
        }).catch(err=>{
          console.log(err,'-----输出异常')
        })
      })
    },
    getMonitSide(){
      let self = this;
      let query =  `/${self.typeObj.typeValue}`;//固定 部署调整
      self.$api.getRestTree(_URL._V3._SIDE_MOINT_COUNT + query).then(res=>{
        let list = res.data;
        list.forEach(item=>{
          if(item.counts&&item.counts.length){
            item.counts.forEach(sub=>{
              sub.classify = sub.type_value;
              sub.classify_name = sub.type_name;
              if(sub.type_name.length > 8){
                sub.longer = true;
              }else{
                sub.longer = false;
              }
            });
          }
        })
        self.siders = list;
        console.log(self.siders,'-----self.siders--')
      })
    },
    getTypeList(target){
      let self = this;
      return self.$api.getRestTree(`${_URL._V3._M_AREA_TYP_COUNT}/${target.id}`).then(res=>{
        // console.log(res,"区域类型");
        let Json = res.data;
        if(Json){
          Json.sort((a,b)=>{
            //v2
            //return a.name.length - b.name.length;
            //v3
            //return a.type_name.length - b.type_name.length;
            return a.sort - b.sort;
          });
          Json.forEach((item)=>{
            //v2
            // if(item.name.length > 8){
            //v3
            item.classify = item.type_value;
            item.classify_name = item.type_name;
            if(item.type_name.length > 8){
              item.longer = true;
            }else{
              item.longer = false;
            }
          })
        }
        target.subList = Json||[];// 单元对象赋值
      })
    },
    getLevelTags(list){//辣鸡数据
      let self = this;
      let m = this.$store.state.homePageModel;
      let t = m.typeName;
      let tags = [];
      let tagNames = [];
      if(t == '安监' && list && list.length){
        list = list.filter(x=>x.tagLevelName);
        if(list.length){//套娃 套娃
          list.forEach((x)=>{
            if(tagNames.indexOf(x.tagLevelName) == -1){
              //查重
              tagNames.push(x.tagLevelName);
              tags.push({
                name:x.tagLevelName,
                id:x.tagLevelId,
              });
            }
          })
        }
        tags.unshift({name:'全部',id:1000});
        tags = tags.sort((a,b)=>{
          return  a.id - b.id;
        })
        self.$store.commit('setStateDIY',{
          name:'tagLevels',
          val:tags
        });
      }

    }
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


.planColor{
  border:1px dashed  #F7B500!important;
  .markerMonit-content{
    background: #5c441a85;
    h2{
      color:#F7B500
    }
  }
  .markerMonit-line{
    background:linear-gradient(120deg, #e3ff72, #02263b)
  }

}
.budingColor{
  border: 1px dotted  #0DC498!important;
  .markerMonit-content{
    background: #02202F;
    h2{
      color:#0DC498
    }
  }
  .markerMonit-line{
    background:linear-gradient(120deg, #34b149, #02263b);
  }


}
.finishColor{
  border:1px solid  #0079c1!important;
}

</style>
