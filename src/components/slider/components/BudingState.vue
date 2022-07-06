<template lang="html">
  <div class="budingState">
    <div @click='click(item)'  v-for='item in list' :key='item.status'  :class="getClassName(item.status)  " >
      <p class='budingState-number'>{{item.count}}</p>
      <p class='budingState-text'>{{item.status_name}}</p>
    </div>


  </div>
</template>

<script>
export default {
  name:'BudingState',
  props:{
    resetCode:{
      type:Number,
      default:0
    },
    list:{
      type:Array,
      default:()=>{
        return [
          {status: 16001, status_name: "拟建", count: 11},
          {status: 16002, status_name: "在建", count: 17},
          {status: 16003, status_name: "已建", count: 21},
        ]
      }
    }
  },
  data(){
    return{
      activeCode:0,
    }
  },
  watch:{
    resetCode(n,o){
      this.activeCode = 0;
    }
  },
  methods:{
    click(item){
      let self = this;
      if(self.activeCode == item.status){
        self.activeCode = 0;
      }else{
        self.activeCode = item.status;
      }
      self.$emit('tabClick',self.activeCode);
    },
    getClassName(status){
      let self = this;
      let isActive = '';
      if(status === 16002){
        if(status == self.activeCode){
          isActive = 'budingState-item-buding-active'
        }
        return 'budingState-item budingState-item-buding '  + isActive
      }else if(status === 16003){
        if(status == self.activeCode){
          isActive = 'budingState-item-finish-active'
        }
        return 'budingState-item budingState-item-finish '  + isActive
      }else if(status === 16001){
        if(status == self.activeCode){
          isActive = 'budingState-item-plan-active'
        }
        return 'budingState-item budingState-item-plan ' + isActive
      }else {
        return 'budingState-item'
      }
    }
  }
}
</script>

<style lang="less">
.budingState{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 88px;
  padding: 0 4px;
  &-item{
    display: flex;
    flex:1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 86px;
    height: 80px;
    margin: 4px;
    color:#fff;
    p{
      margin-bottom: 0;
    }
  }
  &-number{
    font-size: 24px;
  }
  &-text{
    font-size: 12px;
  }

  &-item-plan{
    background: url('../imgs/plan.png') no-repeat center ;
    background-size: cover;
    p{
      color:rgba(207, 147, 53, 1);
    }
    transition: all 0.3s;
  }
  &-item-plan-active,&-item-plan:hover{
    background: url('../imgs/plan_select.png') no-repeat center ;
    background-size: cover;
    p{
      color:rgba(255, 190, 88, 1);
    }
    transition: all 0.3s;

  }
  &-item-buding{
    background: url('../imgs/buding.png') no-repeat center ;
    background-size: cover;
    p{
      color:rgba(77, 192, 163, 1);
    }
    transition: all 0.3s;

  }
  &-item-buding-active,&-item-buding:hover{
    background: url('../imgs/buding_select.png') no-repeat center ;
    background-size: cover;
    p{
      color:rgba(92, 232, 189, 1);
    }
    transition: all 0.3s;

  }
  &-item-finish{
    background: url('../imgs/finish.png') no-repeat center ;
    background-size: cover;
    p{
      color:rgba(25, 152, 211, 1);
    }
    transition: all 0.3s;
  }
  &-item-finish-active,&-item-finish:hover{
    background: url('../imgs/finish_select.png') no-repeat center ;
    background-size: cover;
    p{
      color:rgba(82, 202, 255, 1);
    }
    transition: all 0.3s;

  }
}


</style>
