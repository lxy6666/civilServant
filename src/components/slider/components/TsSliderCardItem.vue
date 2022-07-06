<template lang="html">
  <div v-if='getRowLen()' class="TsSliderCardItem TsSliderCardItem-row" @click='click'>
    <i :class="`TsSliderCardItem-icon iconfont ${item.icon_string||item.icon||'iconcategory'}`" ></i>
    <span>{{item.classify_name}}</span>
    <span class='TsSliderCardItem-number'>{{item.count||'0'}}</span>
  </div>
  <div v-else  class="TsSliderCardItem " @click='click'>
    <span class='TsSliderCardItem-number'>{{item.count||'0'}}</span>
    <p class='TsSliderCardItem-text'>
      <i  :class="`TsSliderCardItem-icon iconfont ${item.icon_string||item.icon||'iconcategory'}`" ></i>
      <span>{{item.classify_name}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name:'TsSliderCardItem',
  props:{
    item:{
      type:Object,
      default:()=>{
        return{
          classify_name:'测试数据',
          count:16,
          icon_string:'icon-environment_protect'
        }
      }
    }
  },
  methods:{
    getRowLen(){
      let self = this;
      let f    ;
      if(self.item.classify_name && self.item.classify_name.length > 8){
        f = true;
      }else{
        f = false
      }
      return f;
    },
    click(){
      this.$emit('tabClick')
    }
  }
}
</script>

<style lang="less">

.TsSliderCardItem
{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(~ '50%  - 4px');
  border:1px solid transparent;
  padding: 4px 12px;
  margin-bottom: 12px;
  transition:  all 0.3s;
  background: url('../imgs/finish.png') no-repeat center;
  background-size: 100% 0;
  min-height: 64px;
  cursor: pointer;
  p{
    margin-bottom: 0;
  }
  &-number{
    font-size: 24px;
    color:rgba(255, 190, 88, 1);
    margin-left: 22px;
  }
  &-icon{
    font-size: 16px;

    color:rgba(255, 190, 88, 1);
    margin-right: 8px;

  }
  &-text
  {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    span{
      font-size:12px;
      font-family:'PingFangSC-Medium,PingFang SC';
      font-weight:500;
      color:rgba(228,247,255,1);
    }
  }
}


.TsSliderCardItem-row{
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  transition:  all 0.3s;
  min-height: 44px;

  span{
    font-size:12px;
    font-family:'PingFangSC-Medium,PingFang SC';
    font-weight:500;
    color:rgba(228,247,255,1);
  }

  .TsSliderCardItem-number{
    font-size: 24px;
    color:rgba(255, 190, 88, 1);
    margin-left: 22px;
  }
}

.TsSliderCardItem:hover,.TsSliderCardItem-active{
  background: url('../imgs/boxbg.png') no-repeat center;
  background-size: 100% 100%;
  transition:  all 0.3s;
}

.TsSliderCardItem-row:hover,.TsSliderCardItem-row-active{
  background: url('../imgs/boxbg_long.png') no-repeat center;
  background-size: 100% 100%;
  transition:  all 0.3s;
}
</style>
