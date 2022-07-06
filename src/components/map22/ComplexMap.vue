<template lang="html">
  <div class="complexMap mapViewOut">
    <loading class='mapViewOut-loding' v-show='showMapLoading' />


    <Tool :map='mapName'/>
    <!-- 风险点列表筛选控制器 -->
    <FixRisks @back='stopRun' v-show='isMainCode !== 1001 ' />
    <div v-show='showModeCheck("gis")' :data-id='getMiniPostion(isMainCode,"gis")' :class='isMainCode === 1001 ? "screenMap mapPart ":getVisibility(1001) +" miniMap " + getMiniPostion() ' >
      <i  v-show='isMainCode !== 1001 ' :class='isMin == false ? "miniIcon  miniIcon-top iconfont iconjiantou-zhankai" :"miniIcon  miniIcon-under   iconfont iconjiantou-zhankai"' @click='upView(1001)'></i>
      <i  v-show='isMainCode !== 1001 && isMin == false' class='miniIcon  miniIcon-under  iconfont iconjiantou-shouqi' @click='downView'></i>

      <GisScreenMap   />
    </div>

    <!-- <div class="threeMap  " id='threeMap'> -->
    <div id='companyThreeBox'  v-if='showModeCheck("company")' :class='isMainCode === 1002 ? "screenMap mapPart": getVisibility(1002) +" miniMap " + getMiniPostion() '>
      <!-- <i  v-show='isMainCode !== 1002 ' :class='isMin == false ? "miniIcon  miniIcon-top iconfont iconjiantou-zhankai" :"miniIcon  miniIcon-under   iconfont iconjiantou-zhankai"' @click='upView(1002)'></i>
      <i  v-show='isMainCode !== 1002 && isMin == false' class='miniIcon  miniIcon-under  iconfont iconjiantou-shouqi' @click='downView'></i> -->
      <CompanyThree />
    </div>

    <!-- 内部建模试图 -->
    <!-- <div  id='detailThreeBox' v-if='showModeCheck("detail")'  :class='isMainCode === 1003 ? "screenMap mapPart ": getVisibility(1003) + " miniMap " + getMiniPostion()' >
      <i  v-show='isMainCode !== 1003 ' :class='isMin == false ? "miniIcon  miniIcon-top iconfont iconjiantou-zhankai" :"miniIcon  miniIcon-under   iconfont iconjiantou-zhankai"' @click='upView(1003)'></i>
      <i  v-show='isMainCode !== 1003 && isMin == false' class='miniIcon  miniIcon-under  iconfont iconjiantou-shouqi' @click='downView'></i>
      <DetailTree />
    </div> -->


  </div>
</template>

<script>
import GisScreenMap from './GisScreenMap';
import CompanyThree from '../three/CompanyThree';
import DetailTree from '../three/DetailTree';
import FixRisks from '../header/FixRisks';
import Tool from './tool.vue';

export default {
  name:'complexMap', //z地图主入口
  components:{
    GisScreenMap,
    CompanyThree,
    DetailTree,
    FixRisks,
    Tool
  },
  data(){
    return {
      isMin:false,
      mapName:'GisScreenMap',
    }
  },
  computed:{
    isMainCode(){
      return this.$store.state.isMainCode;
    },
    showMapLoading(){
      return this.$store.state.mapLoad
    },
    showModeCheck(){
      let self = this;
      return (typeName)=>{
        return self.getShowType(typeName);
      }
    },
    sliderLeft(){
      return this.$store.state.sliderUp
    },
    sliderBottom(){
      return this.$store.state.sliderBottom
    }
  },
  methods:{
    stopRun(){
      let self = this;
      //调整
      self.$store.commit('setStateDIY',{name:'runThree',val:false});
      self.$store.commit('setStateDIY',{name:'isMainCode',val:1001});
      self.$store.commit('setStateDIY',{name:'showModelType',val:1001});
    },
    upView(thisCode){
      let self = this;
      let homeData = self.$store.state.homePageModel;
      let threeData = self.$store.state.threeObject;
      let stateIsMainCode = self.$store.state.isMainCode;
      let rightQuery = self.$store.state.rightQuery;
      if(self.isMin == false){
        if(stateIsMainCode == 1001 && thisCode == 1002){
          // 地图切3d 设置3d数据


          let threeObject = {
            slider: "factoryDetail",
            right: "factoryDetail",
            query: {
              name: "factoryDetail",
              id: "761364329336541184"
            }
          }
          self.$store.commit('setStateDIY',{name:'threeObject',val:threeObject})
        }
        if(stateIsMainCode == 1002 && thisCode == 1001){
          //3d 切 地图
        }
        self.setIsMainCode(thisCode);
      }else{
        self.isMin = false;
      }
    },
    downView(){
      console.log(this.isMainCode,'---downView--')
      this.isMin = true;
    },
    getVisibility(thisCode){
      let self = this;
      let cname = ''
      if(self.isMainCode !== thisCode && self.isMin){
        cname = 'visHidden'
      }else{
        cname = ''
      }
      return cname;
    },
    switchMin(){
      this.isMin = !this.isMin;
    },
    getMiniPostion(isMainCode,domId){
      let pullType = 'pullNone';
      let sliderUp = this.$store.state.sliderUp;
      let sliderBottom = this.$store.state.sliderBottom;
      if(sliderUp  === true  && sliderBottom === true ){ //左边下边都收起
        pullType = 'pullCenter'
      }else if(sliderUp == true && sliderBottom === false){ //左边打开 下边 打开
        pullType = 'pullBottom'
      }else if(sliderUp == false && sliderBottom === true){
        pullType = 'pullLeftCenter'
      }
      return pullType
    },
    setIsMainCode(code){
      this.$store.commit('setStateDIY',{name:'isMainCode',val:code})
    },
    getShowType(typeName){
      let self = this;
      let code = self.$store.state.showModelType;
      let showCode = {
        gis:{
          1001:true,
          1002:true,
          1003:false,
        },
        company:{
          1001:false,
          1002:true,
          1003:true,
        },
        detail:{
          1001:false,
          1002:false,
          1003:true,
        }
      };
      return showCode[typeName][code]
    }
  }
}
</script>

<style lang="less">
@import './index';

.pullLeft{
  transform: translateX(-300px);
  transition: transform 0.3s;
}
.pullBottom{
  transform: translateY(132px);
  transition: transform 0.3s;

}

.pullNone{
  transform: translate(-300px,132px;);
  transition: transform 0.3s;
}
.pullCenter{
  transiorm: translate(0);
  transition: transform 0.3s;
}
.pullLeftCenter{
  transiorm: translate(0);
  transition: transform 0.3s;
}


.miniIcon{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color:#A3E4FF;
  width: 32px;
  height: 32px;
  background:rgba(24,45,80,1);
  border:1px solid rgba(74,102,149,1);
  border-radius: 4px;
  visibility: visible;
  cursor: pointer;
  transition:  all 0.3s;

}
.miniIcon:hover{

  box-shadow: 0 0 6px rgba(74,102,149,1);
  background:#345285;
  color:#a3fffb;
  transition:  all 0.3s;
}
.miniIcon-top
{
  position: absolute;
  top:16px;
  right:16px;
  z-index: 1000;

}
.miniIcon-under{
  position: absolute;
  bottom:16px;
  left:16px;
  z-index: 1000;

}
.visHidden{
  visibility: hidden;
}
</style>
