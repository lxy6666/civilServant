<template lang="html">
  <div class="riskItem-item" @click='click'>
    <div class="itemleft">
      <p class="namep">
        <i :class='"  iconfont " + (item.icon_string ? item.icon_string :  item.icon ?  item.icon : " iconcategory") '></i>
         {{item.name}}
      </p>
      <p v-if="item.first_type==1110000">
        负责人：{{item.personnel_name||'松江'}}
      </p>
      <p v-if="item.first_type==1120000">
        基于{{item.second_type_name}}
      </p>
    </div>
    <!-- <div class="itemright">
      <i slot='left' class='btnStatusCode btnStatusCode-red'>{{item.level}}</i>
    </div> -->
  </div>
</template>

<script>
export default {
  //企业下功能区
  name:'riskItem',
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

.riskItem-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin-bottom: 16px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset 0px 1px 8px rgba(46, 130, 255, 0.5);
  box-shadow: inset 0px 1px 8px rgba(46, 130, 255, 0.5);
  border: 1px solid rgba(9, 95, 180, 0.5);
  background: url('../imgs/company.png') no-repeat center;
  background-size:100% 100%;
  border: 1px solid transparent;
  // background-image:
  //   url('../imgs/blue_corner_lt.png'),
  //   url('../imgs/blue_corner_rb.png');
  // background-repeat: no-repeat;
  // background-size:
  //   16px 16px,
  //   16px 16px;
  // background-position:
  //   left top,
  //   right bottom;
  padding: 12px 16px;
  transition:  all 0.3s;
  color:#64d2ff;
  .itemleft{
    p{
      margin:0;
    }
    .namep{
      margin-bottom: 8px;
      color:rgba(228,247,255,1);
      i{
        color:rgba(255, 190, 88, 1);
        margin-right: 8px;
      }
    }
  }
}

.riskItem-item-active,.riskItem-item:hover{
  background: url('../imgs/company_active.png') no-repeat center;
  background-size:100% 100%;
  border: 1px solid transparent;
  transition:  all 0.3s;
}
</style>
