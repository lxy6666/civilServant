<template lang="html">
  <div class=" tsSlider threeArea" >
    <loading v-show='loading'></loading>
    <CardTitle :title='companyform.name' class='subTitleCard-active ' />
    <switch-sky-box/>
    <div class="threeArea-switchHead">
      <CardTitle title='功能区' :class='active === "funArea" ? "subTitleCard subTitleCard-active": "subTitleCard" '
      @tabClick='setTap("funArea")'/>
      <CardTitle title='监测区' :class='active === "monitor" ? "subTitleCard subTitleCard-active": "subTitleCard" '
      @tabClick='setTap("monitor")' />
      <CardTitle title='项目' :class='active === "project" ? "subTitleCard subTitleCard-active": "subTitleCard" '
      @tabClick='setTap("project")' />
    </div>
<!--    <div class="tsSlider-content clearBorder maxCalc202" v-show='active == "funArea"'>-->
    <div class="tsSlider-content clearBorder" v-show='active == "funArea"'>
      <div class="tsSlider-content-funArea">
        <ThreeFun :class='threeSliderActive === item.id ? " threeFun-item-active " : "" '
        :item='item' v-for='item in funAreas' @tabClick='linkDiffer(item)'/>
      </div>
    </div>
<!--    <div class="tsSlider-content clearBorder maxCalc202" v-show='active == "monitor"'>-->
    <div class="tsSlider-content clearBorder" v-show='active == "monitor"'>
      <div class="tsSlider-content-funArea">
        <div class="outer" v-for='item in monitors' :key='item.name'>
          <ItemTitle class='mb-1' :title='item.name'/>
          <ThreeFun  :class='threeSliderActive === i.id ? "  threeFun-item-active " : "" '
           :key='"mid"+i.id'
           :item='i' v-for='i in item.list' @tabClick='linkMonit(i)'/>
        </div>
      </div>
    </div>
<!--    <div class="tsSlider-content clearBorder maxCalc202" v-show='active == "project"'>-->
    <div class="tsSlider-content clearBorder" v-show='active == "project"'>
      <div class="tsSlider-content-funArea">
        <ThreeFun :class='threeActiveProject === item.id ? " threeFun-item-active " : "" '
         :item='item' v-for='item in projects ' @tabClick='linkProejct(item)'/>
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from '@/components/card/SubTitle.vue';
import sData from './data.js';

import  * as ThreeTool from "@/components/three/threeTool.js";
import MapText from "@/components/map/mapText/index.js";


import CardTitle from '@/components/card/SubTitleCard';
import BudingState from './components/BudingState';
import TsSliderCardItem from './components/TsSliderCardItem';
import SwitchSkyBox from './components/SwitchSkyBox';
import ItemTitle from '@/components/title/ItemTitle.vue'




import ThreeFun from "./components/ThreeFun";
export default {
  name:'threeArea',
  components:{
    SubTitle,
    CardTitle,
    BudingState,
    TsSliderCardItem,
    ThreeFun,
    ItemTitle,
    SwitchSkyBox,
  },
  data(){
    return{
      nMlist:[],
      workShops:[],
      monitors:[],
      funAreas:[],
      projects:[],
      companyform:{},
      loading:false,
      active:'funArea'
    }
  },
  beforeCreate(){

  },
  beforeDestroy(){

  },
  computed:{
    threeActiveProject(){
      return  this.$store.state.threeActiveProject;
    },
    threeSliderActive(){
      return this.$store.state.threeSliderActive;
    },
    threeObject(){
      return this.$store.state.threeObject;
    },
    showModelType(){
      return this.$store.state.showModelType
    }
  },
  watch:{
    showModelType(n,o){
      let self = this;
      if(n === 1002){
        if(self.threeObject && self.threeObject.query){
          let companyId = this.threeObject.query.id;
          self.getDetail(companyId);
        }
      }
    }
  },
  mounted(){
    let self = this;

    if(self.threeObject && self.threeObject.query){
      let companyId = this.threeObject.query.id;
      self.getDetail(companyId);
    }
  },

  methods:{
    getRisks(gid){
      let self = this;
      let url  = `${_URL._V3._DUAL_RISK}?gid=${gid}`
      self.$api.getRestTree(url).then(res=>{
        let Json = res.data;
        let list = Json.data;
        self.$store.commit('setStateDIY',{name:'threeTags_risk',val:[]});
        console.log(list,'--list-')
        if(window.CompanyThree && window.CompanyThree.scene){
          let scene = window.CompanyThree.scene;
          if(list.length){
            list = list.filter((x)=>{
              return x.model_x && x.model_y;
            });
            list.forEach((x)=>{
              let position = {}
              position.x = x.model_x;
              position.y = x.model_y;
              position.z = x.model_z;
              x.tagType  = 'risk';
              self.$set(x,'position',position);
            })
            self.$store.commit('setStateDIY',{name:'threeTags_risk',val:list});
          }
        }
        self.threeTags_risk = res.data;
      })
    },
    getProject(gid){
      let self = this;
      let query = `/search?gid=${gid}&page=1&size=99`;
      self.$api.getRestTree(`${_URL._V3._DUAL_PROJECT}${query}`).then(res => {
        let Json = res.data.data;
        self.projects = Json;
        self.$store.commit('setStateDIY',{name:'threeTags_workShop',val:[]})
        self.workShops = [];
        Json.forEach((x)=>{
          self.getWorkShop(x)
        })
      });
    },
    getDetail(id) {
      let self = this;
      self.$api.getRestTree(`${_URL._V3._AREA_DETAIL}/${id}`).then(res => {
        let Json = res.data;
        self.companyform = res.data;
        self.getFactoryArea(Json.gid);
        self.getMonitArea(Json.gid);
        self.getProject(Json.gid);
        self.getRisks(Json.gid)
      });
    },
    setTap(name){
      this.active = name;
      this.$store.commit('setStateDIY',{name:'showTagThree',val:name});
    },
    getMonitArea(gid){
      let self = this;
      self.$api.getRestTree(`${_URL._V3._MAREA}?gid=${gid}`).then(res=>{
        let Json = res.data;
        let list = Json;
        self.$store.commit('setStateDIY',{name:'threeTags_monitor',val:[]});
        if(window.CompanyThree && window.CompanyThree.scene){
          let scene = window.CompanyThree.scene;
          if(list.length){
            list = list.filter((x)=>{
              return x.position && x.position.model_x;
            });
            list.forEach((x)=>{
              if(x.position){
                let position = {}
                position.x = x.position.model_x;
                position.y = x.position.model_y;
                position.z = x.position.model_z;
                x.tagType  = 'monitor';
                self.$set(x,'position',position);
              }
            })
            self.$store.commit('setStateDIY',{name:'threeTags_monitor',val:list});
            let typeList = [];
            list.forEach((x)=>{
              if(typeList.indexOf(x.first_name) == -1){
                typeList.push(x.first_name);
              };
            });
            typeList = typeList.map((x)=>{
              return {
                name:x,
                list:[]
              }
            });
            list.forEach((x)=>{
              let t = typeList.find(i=> i.name == x.first_name )
              t.list.push(x);
            });
            self.monitors = typeList;
          }
        }



      });
    },
    getFactoryArea(gid){
      let self = this;
      let typeValue = self.$projectConfig.SearchCode.companyFun;
      self.$api.getRestTree(`${_URL._V3._FULL_AREA}?gid=${gid}&typeValue=${typeValue}`).then(res=>{
        let Json = res.data;
        let list = Json;
        self.$store.commit('setStateDIY',{name:'threeTags_funArea',val:[]});
        if(window.CompanyThree && window.CompanyThree.scene){
          let scene = window.CompanyThree.scene;
          if(list.length){
            list = list.filter((x)=>{
              return x.position && x.position.model_x;
            });
            list.forEach((x)=>{
              if(x.position){
                let position = {}
                position.x = x.position.model_x;
                position.y = x.position.model_y;
                position.z = x.position.model_z;
                x.tagType  = 'funArea';
                self.$set(x,'position',position);
              }
            })
            self.funAreas = list;
            self.$store.commit('setStateDIY',{name:'threeTags_funArea',val:list});

          }
        }
        console.log(ThreeTool,'--ThreeTool--')
      });
    },
    linkProejct(item){//点击项目
      let self = this;
      self.$store.commit('setStateDIY',{name:'threeActiveProject',val:item.id});
      let resetCount = self.$store.state.riskResetCount;
      resetCount = resetCount + 1;

      self.$store.commit('setStateDIY',{name:'riskResetCount',val:resetCount});
      //重置单元标签
      self.$store.commit('setStateDIY',{name:'threeTags_units',val:[]});


      //
      //清空状态
      let doms = document.querySelectorAll('.threeFun-item-project');
      if(doms && doms.length){
        doms.forEach((x)=>{
          x.className = 'threeFun-item-project CompanyThreeTags-item CompanyThreeTags-item-three'
        })
      }


      let tObject = {
        slider:'factoryDetail',
        right:'projectDetail',
        query:{
          id:item.id,
          name:'projectDetail'
        }
      }
      let riskFilterObject  = self.$store.state.showRiskFilter;
      let val  = {
        riskFilterObject,
        project_id:item.id,
      };
      //给定过滤的 项目id;
      self.$store.commit('setStateDIY',{name:'showRiskFilter',val:val});
      self.$store.commit('setStateDIY',{name:'dualProjectTime',val:new Date()*1});
      self.$store.commit('setStateDIY',{name:'threeObject',val:tObject});
    },
    linkMonit(item){
      let self = this;
      self.$store.commit('setStateDIY',{name:'threeSliderActive',val:item.id});
      let tObject = {
        slider:'factoryDetail',
        right:'factoryDevice',
        query:{name:'factoryDevice',id:item.id}
      };
      self.$store.commit('setStateDIY',{name:'rightQuery',val:{id:item.id}});
      self.$store.commit('addOverCount');
      // self.$store.commit('setStateDIY',{name:'monitDeviceShow',val:true});
      self.$store.commit('setStateDIY',{name:'threeObject',val:tObject});
      self.lookIt(item);
    },
    linkDiffer(item){
      let self = this;
      console.log(item,item.id,'---')
      self.$store.commit('setStateDIY',{name:'threeSliderActive',val:item.id});
      let tObject = {
        slider:'factoryDetail',
        right:'factoryDiffer',
        query:{name:'factoryDetail',id:item.id,gid:item.gid}
      }
      console.log(item,item.name,'---查看i')
      self.$store.commit('setStateDIY',{name:'threeObject',val:tObject});
      self.lookIt(item);
    },
    getWorkShop(item){//根据项目id获取车间列表
      let self = this;
      let query = `/search?projectId=${item.id}&page=1&size=99`;
      self.$api.getRestTree(`${_URL._V3._DUAL_WORKSHOP}${query}`).then(res => {
        let Json = res.data.data;
        let list = [];

        if(Json.length){
          list = Json;
          list = list.filter((x)=>{
            return x.model_x;
          });
          list.forEach((x)=>{
            x.icon_string = 'iconweixianhuaxuepin';
            x.tagType  = 'project';
            x.position = {
              x:x.model_x,
              y:x.model_y,
              z:x.model_z
            };
          });
        }else{
          // let obj = {
          //   id :'',
          //   name:item.name+'==车间',
          //   icon_string:'iconweixianhuaxuepin',
          //   position:{
          //     x:-20,
          //     y:20,
          //     z:100
          //   },
          // };

          // list.push(obj);
        }
        self.workShops = [...self.workShops,...list]
        console.log(self.workShops,'--每次数据-')

        self.$store.commit('setStateDIY',{name:'threeTags_workShop',val:self.workShops})
      });
    },
    lookIt(item){
      let self = this;
      let camera = window.CompanyThree.camera;
      let controls = window.CompanyThree.controls;
      if(!item.position){
        console.log('没有3d位置对象 无法切换摄像头')
        return
      }
      console.log(item,'--e--item')
      let p  = item.position;
      let h  = camera.position.y;
      camera.position.set(p.x,h ,p.z);
      controls.target.set(p.x,0,p.z);

      camera.lookAt(p.x,0,p.z);
    //  threeMap.camera.lookAt(p.x,70,p.z);
    },
  },
}
</script>

<style lang="less">
@import './slider.less';
.threeArea{
  &-switchHead{
    width: 100%;
    flex-direction: row;
    display: flex;
    .subTitleCard{
      padding-top: 16px;
      padding-bottom: 16px;
      background: #151D3F;
      border: none;
      box-shadow: none;
    }
  }
  .clearBorder{
    border:none;
    overflow: scroll;
    height: 510px;
  }

}
.tsSlider-content-funArea{
  width: 100%;
  padding: 0 12px;

  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
}
/*.maxCalc202{*/
/*  max-height:calc(~ '100vh - 202px')!important;*/
/*}*/
.divTest{
  width: 108px;
  height: 32px;
  background: red;
  color:#fff;
}

</style>
