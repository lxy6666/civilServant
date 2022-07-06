<template lang="html">
  <div class="threeFun-item" @click='click'>
    <i :class='" iconThree iconfont " + (item.icon_string ? item.icon_string :  item.icon ?  item.icon : " iconcategory") '></i>
    {{item.name}}
  </div>
</template>

<script>
export default {
  //企业下功能区
  name:'threeFun',
  props:{
    item:{
      type:Object,
      default:{
        icon_string:'iconcategory'
      }
    }
  },
  methods:{
    click(){
      this.$emit('tabClick')
    }
  }

}
</script>

<style lang="less">

.threeFun-item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  margin-bottom: 16px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset 0px 1px 8px rgba(46, 130, 255, 0.5);
  box-shadow: inset 0px 1px 8px rgba(46, 130, 255, 0.5);
  border: 1px solid rgba(9, 95, 180, 0.5);
  background: url('../imgs/company.png') no-repeat center;
  background-size:100% 100%;
  padding: 12px 32px;
  transition:  all 0.3s;
  color:#64d2ff;
}
.iconThree
{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2em;
  height: 2.2em;
  margin-right: 12px;
  color:#64d2ff;
}
.threeFun-item:hover,.threeFun-item-active{
  background: url('../imgs/company_active.png') no-repeat center;
  background-size:100% 100%;
  border: 1px solid transparent;
  transition:  all 0.3s;
}
</style>
