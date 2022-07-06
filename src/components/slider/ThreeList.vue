<template lang="html">
  <div class=" tsSlider threeList" >
    <loading v-show='loading'></loading>
    <CardTitle :title='threeDetail.query.unitName' @click="back" class='subTitleCard-active ' />

    <!-- 普通（单元 车间）列表 -->
    <!-- <div class="tsSlider-content clearBorder maxCalc202" v-if='threeDetail.type == "workshoplist"' >
      <div class="tsSlider-content-funArea mt-2">
        <ThreeFun :class='threeSliderActive === item.id ? " threeFun-item-active " : "" '
        :item='item' v-for='item in list' />
      </div>
    </div> -->
    <!-- 风险点设备列表 -->
    <div class="tsSlider-content clearBorder maxCalc202" >
      <div class="tsSlider-content-funArea mt-2" v-for="x in riskList">
        <ItemTitle  :title='x.type_name' class='mb-2'/>
        <RiskItem  :class='threeSliderActive === y.id ? " riskItem-item-active " : "" '
        :item='y' v-for='y in x.list' @tabClick="linkRisk(y)"/>
      </div>
    </div>
    <!-- 单元风险点统计 -->
    <!-- <div class="tsSlider-content clearBorder maxCalc202" >
      <div class='tsSlider-item pd-1'
        v-for="(x,index) in typeList" :key="x.id">
        <div class="tsSlider-card">
          <h2 class='tsSlider-card-title'>{{x.type_name}}</h2>
          <div class="tsSlider-card-cotents">
            <TsSliderCardItem :class='getClass(y)'
             :item='y' :key='y.id' v-for='y in x.list' @tabClick="setSider(y.id)"/>
          </div>
        </div>
      </div>
    </div> -->
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
import ItemTitle from '@/components/title/ItemTitle';




import ThreeFun from "./components/ThreeFun";
import RiskItem from "./components/RiskItem";
export default {
  name:'threeList',
  components:{
    SubTitle,
    CardTitle,
    BudingState,
    TsSliderCardItem,
    ThreeFun,
    RiskItem,
    ItemTitle
  },
  data(){
    return{
      monitors:[],
      funAreas:[],
      list:[
        {
          id:10001,
          name:'环丙项目',
          icon:'iconcategory',
        },
        {
          id:10002,
          name:'环丁项目',
          icon:'iconcategory',
        },
      ],
      companyform:{},
      loading:false,
      active:'funArea',
      activeid:'',
      riskList:[],
      siders:[],
    }
  },
  beforeCreate(){

  },
  beforeDestroy(){

  },
  computed:{
    threeSliderActive(){
      return this.$store.state.threeSliderActive;
    },
    threeDetail(){
      return this.$store.state.threeDetail;
    },
  },
  mounted(){
    let self = this;
    self.getSlider();
  },


  methods:{
    setSider(value){
      let self = this;
      if(value){
        self.activename = value;
      }
    },
    getSlider(){
      let self= this;
      if(!self.threeDetail.query.id){return}
      let query = `/search?riskUnitId=${self.threeDetail.query.id}`
      self.$api.getRestTree(`${_URL._V3._DUAL_POINT}${query}`).then(res => {
        console.log(res,"风险点列表-");
        let Json = res.data.data;
        let riskobj = _.groupBy(Json,(x)=>{
          return x.first_type;
        });
        let list = [];
        Object.keys(riskobj).forEach(key=>{
          let obj = {
            type_name:riskobj[key][0].first_type_name,
            list:riskobj[key]
          }
          list.push(obj);
        });
        self.riskList = list;

        self.$store.commit('setStateDIY',{name:'riskThree',val:list})


      });
    },
    back(){},
    getClass(sub){
      let self = this;
      let className = '';
      if(self.activeid === sub.id){
        if(sub.name){
          if(sub.name.length > 8){
            className = "TsSliderCardItem-row-active";
          }else{
            className = "TsSliderCardItem-active";
          }
        }
      }
      return className
    },
    setTap(name){
      this.active = name;
      this.$store.commit('setStateDIY',{name:'showTagThree',val:name});
    },
    linkRisk(item){
      let self = this;
      let threeDetail = self.threeDetail;
      let tObject = {
        slider:'factoryDetail',
        right:'risk',
        unitname:item.name,
        unitid:threeDetail.query.id,
        query:{
          name:'risk',
          id:item.id||''
        }
      }
      self.$store.commit('setStateDIY',{name:'threeSliderActive',val:item.id});

      self.$store.commit('setStateDIY',{name:'threeObject',val:tObject});


      // let tObject = {
      //   slider:'fa',
      //   right:'risk',
      //   unitname:self.threeDetail.unitname,
      //   unitid:self.threeDetail.id,
      //   query:{
      //     name:'risk',
      //     id:item.id||''
      //   }
      // }
      // self.$store.commit('setStateDIY',{name:'threeObject',val:tObject});
    },


  },

}
</script>

<style lang="less">
@import './slider.less';
.threeList{
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
  }

}
.tsSlider-content-funArea{
  width: 100%;
  padding: 0 12px;

  display: flex;
  flex-direction: column;
}
.maxCalc202{
  max-height:calc(~ '100vh - 202px')!important;
}
.divTest{
  width: 108px;
  height: 32px;
  background: red;
  color:#fff;
}

</style>
