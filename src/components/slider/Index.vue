<template lang="html">
  <div :class="sliderUp == true ? 'sliderPart ' : 'sliderPart sliderPartClose' ">
    <!-- <ParkSlider   v-if='showFlage.park && showFlage.park === true'
      v-show="showType == 'park'" /> -->
    <div v-show='isMainCode == 1002 || isMainCode == 1003'>
      <ThreeArea  v-if='threeObject.slider == "factoryDetail"' v-show='isMainCode == 1002'/>
      <ThreeList  v-if='threeDetail.slider == "dual"' v-show='isMainCode == 1003'/>
    </div>
    
    <div  v-show='isMainCode == 1001'>
      <over-slider
        v-if='showFlage.park && showFlage.park === true'
        v-show="showType == 'park'" >
      </over-slider>
      <company-slider
        v-if='showFlage.factorys && showFlage.factorys === true'
        v-show="showType.indexOf('factory') > -1">
      </company-slider>
      <type-slider   v-if='showFlage.monitoring && showFlage.monitoring === true'
        v-show="showType.indexOf('monitoring') > -1"
      ></type-slider>
    </div>




    <div class="tsSlider-leftBtn tsSlider-leftBtn-active">
      <i @click='switchSlider'></i>
    </div>


  </div>
</template>

<script>

import OverSlider from '@/components/slider/Over.vue';
import CompanySlider from '@/components/slider/Company.vue';
import TypeSlider from '@/components/slider/Type.vue';
import ThreeArea from  '@/components/slider/ThreeArea.vue';
import ThreeList from  '@/components/slider/ThreeList.vue';

//新版本 UI

// import ParkSlider from '@/components/slider/Park.vue';



export default {
  name:'sliderPart',
  data(){
    return{
      showList:[],
    }
  },
  props:{
    showType:{
      type:String,
      default:'park'
    }
  },
  computed:{
    sliderUp(){
      return this.$store.state.sliderUp;
    },
    threeObject(){
      return this.$store.state.threeObject;
    },
    threeDetail(){
      return this.$store.state.threeDetail;
    },
    showFlage(){
      let list = this.$store.state.showTypeList;
      let showObject = {
        park:false,
        factory:false,
        monitoring:false,
      };
      let obj = {};
      if(list.length){
        list.forEach((x)=>{
          obj[x] = true;
        })
      }
      showObject = obj;
      return showObject
    },
    isMainCode(){
      return this.$store.state.isMainCode;
    },
  },
  components:{
    OverSlider,
    CompanySlider,
    TypeSlider,
    ThreeArea,
    ThreeList
  },
  watch:{
    showType(n,o){
      if(o.indexOf('factory') == -1 && n.indexOf('factory') > -1){
        if(window.Gis_Shop_Markers){
          window.Gis_Shop_Markers.forEach((x)=>{
            x.show();
          })
        }
      }else if (o.indexOf('factory') > -1 && n.indexOf('factory') == -1){
        if(window.Gis_Shop_Markers){
          window.Gis_Shop_Markers.forEach((x)=>{
            x.hide();
          })
        }
      }
    }
  },
  methods:{
    switchSlider(){
      let self = this;
      let slider = this.$store.state.sliderUp;
      slider = !slider;
      self.$store.commit('setStateDIY',{name:'sliderUp',val:slider})
    }
  }

}
</script>

<style lang="less">
@import './Index.less';

</style>
