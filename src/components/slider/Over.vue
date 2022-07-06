<template lang="html">
  <div class=" tsSlider" :data-typeName='homePageModel'>
    <loading v-show='loading'></loading>
    <CardTitle title='化工园区' class='subTitleCard-active' @tabClick='clearSelect'/>

    <!-- <div class="overslider-title" @click='clearSelect'>
      <span :data-typeName='showTypeName'>化工园区</span>
    </div> -->
    <div class="tsSlider-content">
      <div class='tsSlider-item'>
        <BudingState  :resetCode='restCode' @tabClick='showStatus' :list='status'/>
      </div>
      <!-- <div class='tsSlider-item pd-1'>
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>园区规划</h2>
          <div class="overslider-row">
            <div
              :class='item.select ? "overslider-plan overslider-plan-one"
                                  : "overslider-plan overslider-plan-one overslider-disabled"'
               v-for='item in planningList'  @click='setPlanningChange(item)'>
              <div class="plansize plansize-one" :style='"background:"+item.color'></div>
              <span :style='"color:"+item.color'>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class='tsSlider-item pd-1' >
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>园区/企业</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(item)' :item='item'  @tabClick='setSider(item.classify)'
            :key='item.id' v-for='item in pcList' />
          </div>
        </div>
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
    </div>

  </div>
</template>

<script>
import SubTitle from '@/components/card/SubTitle.vue';
// import sData from './data.js';

import * as tool from "@/components/map/tool.js";
import MapText from "@/components/map/mapText/index.js";


import CardTitle from '@/components/card/SubTitleCard';
import BudingState from './components/BudingState';
import TsSliderCardItem from './components/TsSliderCardItem';


import MapMethods from "@/components/map/tool/mapMethods.js";

export default {
  name:'maincontrol',
  components:{
    SubTitle,
    CardTitle,
    BudingState,
    TsSliderCardItem,
  },
  data(){
    return{
      restCode:0,
      selectclassify:0,
      showStatusType:0,
      pcList:[],
      loading:false,
      status:[],
      planningActives:[],
      planningList:[],//规划区域tabs 一期二期三期;
      sList:[],// 建设中 已建成, 代建
      siders:[],
      activename:'',
      //园区功能区类型：环保，交通，消防，能源，敏感园区规划
      areaCode:[520100,520200,520500,520600,520400,520700,520500],
    }
  },
  beforeCreate(){
    if(window.GisScreenMap && window.NEW_AREAS_V2){
      GisScreenMap.remove(NEW_AREAS_V2.tags);
      //GisScreenMap.remove(_NEW_PLAN_AREA_V2.tags);
      //GisScreenMap.remove(NEW_AREAS_V2.areas);
      //GisScreenMap.remove(_NEW_PLAN_AREA_V2.areas);
    }
  },
  beforeDestroy(){
    if(window.GisScreenMap && window.NEW_AREAS_V2){
      GisScreenMap.remove(NEW_AREAS_V2.tags);
      //GisScreenMap.remove(_NEW_PLAN_AREA_V2.tags);
      //GisScreenMap.remove(NEW_AREAS_V2.areas);
      //GisScreenMap.remove(_NEW_PLAN_AREA_V2.areas);
    }
  },
  created(){
    let self = this;
  },
  mounted(){
    let self = this;
    self.getParkCompanyCount();
    self.getParkArea();
    // self.getTypeIdList();
    self.getSide();
    self.getStates();
    self.getFullArea();
    self.setLoading(1000);
  },

  computed:{
    runThree(){
      return this.$store.state.runThree;
    },
    homePageModel(){
      let self  = this;
      let homePageModel = this.$store.state.homePageModel;
      let showName = homePageModel.slider;
      if(showName.indexOf('park') === 0 ){
        if(window.GisScreenMap && window.NEW_AREAS_V2){
          window.NEW_AREAS_V2.tags.forEach((x)=>{
            if(self.activename === ''){
              x.show();
            }else if(x.extData.classify === self.activename){
              x.show();
            }
            if(x.area){
              x.area.show();
            }
          })
        }
      }else{
        if(window.GisScreenMap && window.NEW_AREAS_V2){
          window.NEW_AREAS_V2.tags.forEach((x)=>{
            x.hide()
            if(x.area){
              x.area.hide();
            }
          })
        }
      }
      return showName
    },
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
    showStatus(type){
      let self = this;
      self.showStatusType = type;
      self.setSider(self.activename);
    },
    getParkArea(){
      let self = this;
      //单独做区域
      let typeValue = self.$projectConfig.SearchCode.park;
      self.$api.getRestTree(`${_URL._V3._FULL_AREA}?typeValue=${typeValue}`).then(res=>{
        let Json = res.data;
      })
    },
    getParkCompanyCount(){
      let self = this;
      let searchCode = self.$projectConfig.SearchCode;
      self.$api.getRestTree(`${_URL._V3._PARK_COM_COUNT}`).then(res=>{
        let Json =  res.data;
        Json.forEach((x)=>{
          if(x.type == 11001) {
            x.classify_name = '企业';
            x.icon = 'iconfont iconqiye'
            x.classify = searchCode.company;
          }else{
            x.classify_name = '园区';
            x.icon = 'iconfont iconyuanqu1'
            x.classify = searchCode.park;
          };
        });
        self.pcList = res.data;
      }).catch(err=>{
        console.log(err,'---调试 p/c-----')
      })
    },
    getClass(sub){
      let self = this;
      let className = '';
      if(self.activename === sub.classify){
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
    setLoading(time = 800){
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      },time)
    },
    sortStatus(a, b) {
      return a.status - b.status
    },
    getStates(){
      let self = this;
      self.$api.getRestTree(_URL._V3._AREA_STATE_PARK).then(res=>{
        let Json = res.data;
        Json = Json.sort(self.sortStatus)
        if(Json && Json.length){
          self.status = res.data ||[]
        }
      })
    },
    getFullArea(){ //地图交互 默认加载所有区域
      let self = this;
      ///frame/function/area
      let searchCode = self.$projectConfig.SearchCode;
      let filterType = searchCode.companyFun;
      self.$api.getRestTree(`${_URL._V3._FULL_AREA}`).then(res=>{
        let list = res.data;
        let fullArea = {
          tags:[],
        };
        list = list.filter(x=> x.area);
        list = list.filter(x=> x.type_value !== filterType);

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
          if(item.type_value === searchCode.parkFun){
            item.dataType = 'funArea';
          }

          item.title = item.name;
          item.position = [center.lng,center.lat];
        });
        fullArea.tags = MapMethods.setTags(list, window.GisScreenMap, function(item,tag){
          if(item.type_value === searchCode.company){
            tag.on('dblclick',(e)=>{
              //alert(1);
              // self.$store.commit('setStateDIY',{name:'overLoading',val:true})

              let runThree = self.runThree;
              if(runThree){
                console.log('three状态无交互')
                return
              }
              self.$store.commit('setModelType',  {
                  name:'company',
                  value:1002,
              },);

              //three控制对象  整个 主页地图控制逻辑 6月重构含钙store
              let tObject = {
                slider:'factoryDetail',
                right:'factoryDetail',
                query:{
                  name:'factoryDetail',
                  id:item.id
                }
              };


              self.$store.commit('setStateDIY',{name:'activeFactory',val:{
                name:item.name,
                id:item.id,
              }})

              self.$store.commit('setStateDIY',{name:'threeObject',val:tObject})

              self.$store.commit('setStateDIY',{name:'runThree',val:true})
              self.$store.commit('setStateDIY',{name:'isMainCode',val:1002})

              // setTimeout(()=>{
              //   self.$store.commit('setStateDIY',{name:'overLoading',val:false})
              // },1500)
            });
          };
          tag.on('click',(e)=>{
            let runThree = self.runThree;
            if(runThree){
              console.log('three状态无交互')
              return
            }

            setTimeout(()=>{
              self.clearAreaColor();
              tag.area.setOptions({
                strokeOpacity:1,
                strokeWeight:5,
                strokeColor:'#FFFF00',
                zIndex:3000,
              });
              if(item.type_value === searchCode.company){
                self.$store.commit('setModelConfig',{
                  name:'homePageModel',
                  rightView:'factoryDetail',
                  slider:'park',
                  dialog:'factoryDetail',
                });
                self.$store.commit('setRightQuery',{name:'factoryDetail',id:item.id});
              }else{
                self.$store.commit('setModelConfig',{
                  name:'homePageModel',
                  rightView:'parkDiffer',
                  slider:'park',
                  dialog:'factoryDiffer',
                });
                self.$store.commit('setRightQuery',{name:'factoryDiffer',id:item.id,gid:item.gid});

              }
              GisScreenMap.panTo(item.position);
              GisScreenMap.setZoom(item.rank||14.5);
              //切换监测区域指示符
              self.$store.commit('addOverCount');

              self.$store.commit('setStateDIY',{name:'activeFactory',val:{
                name:item.name,
                id:item.id,
              }});

            },300)

          })
        });


        // fullArea.
        window.NEW_AREAS_V2 = fullArea;
      })
    },
    getTypeIdList(){
      let self= this;
      let query =  `?code=FUNCTION`;//固定 部署调整
      self.$api.getRestTree(_URL._V3._PARK_AREA_TYPE + query).then(res=>{
        let list = res.data;
        let promselist = [];
        list.forEach((item)=>{
          promselist.push(self.getTypeList(item))
        });
        // console.log(promselist,"promselist");
        Promise.all(promselist).then(res=>{
          self.siders = list;
          console.log(self.siders,'-----self.siders--')
        }).catch(err=>{
          console.log(err,'-----输出异常')
        });
      })
    },
    clearAreaColor(){//清除选中的样式 clear
      let self = this;
      if(window.NEW_AREAS_V2){
        let areaObejct = window.NEW_AREAS_V2;
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
    clearSelect(){ //清空当前侧边选中项 clear
      let self = this;
      self.activename = '';
      self.clearAreaColor();
      self.restCode = (self.restCode + 1);
      if(window.NEW_AREAS_V2){
        let areaObejct = window.NEW_AREAS_V2;
        window.GisScreenMap.add(areaObejct.tags);
      }
      let modelConfig = self.$store.state.homePageModel;
      modelConfig.rightView = 'park';
      self.$store.commit('setModelConfig',{
        ...modelConfig
      });
    },
    getSide(){
      let self= this;
      let query =  `/520000`;//固定 部署调整
      self.$api.getRestTree(_URL._V3._SIDE_COUNT + query).then(res=>{
        let list = res.data;
        list.sort((a,b)=>{
          return a.sort - b.sort;
        });
        list.forEach(item=>{
          if(item.counts&&item.counts.length){
            item.counts.forEach(sub=>{
              if(sub.classify_name.length > 8){
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
      return self.$api.getRestTree(`${_URL._V3._PARK_AREA_TYPE_COUNT}/${target.id}`).then(res=>{
        // console.log(res,"区域类型");
        if(res.data){
          res.data.sort((a,b)=>{
            //v2
            //return a.name.length - b.name.length;
            //v3
            //return a.classify_name.length - b.classify_name.length;
            return a.sort - b.sort;
          });
          res.data.forEach((item)=>{
            //v2
            // if(item.name.length > 8){
            //v3
            if(item.classify_name.length > 8){
              item.longer = true;
            }else{
              item.longer = false;
            }
            //item.color= sData.superior_idObject[target.id]||'#66CCCC';
          })
        }
        target.subList = res.data||[];// 单元对象赋值
      })
    },
    setSider(value){
      let self = this;
      self.activename = value||'';
      let showList    = [];
      if(window.NEW_AREAS_V2){
        let areaObejct = window.NEW_AREAS_V2;
        window.GisScreenMap.remove(areaObejct.tags);
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
    }
  },

}
</script>

<style lang="less">
@import './slider.less';

</style>
