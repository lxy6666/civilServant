<template lang="html">
  <div :class="showRight?'icontotal activeicon':'icontotal '">
    <div class="icontotal-top" @click="up">
        图例
    </div>
    <div :class="sliderUp?'icontotal-btm ':'icontotal-btm iconslider'" >
        <div class="icontotal-btm-item" v-for="(item,index) in iconList" :key="index">
            <p class="icontotal-btm-title">
                <i :class=" ` iconfont ${item.icon}`"></i>{{item.name}}
            </p>
        </div>
    </div>
    <div :class="sliderUp?'icontotal-btn':'icontotal-btn iconslider'" @click="up"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    type: {
      type: String,
    },
    iconList:{
      type: Array,
      default: () => {
        return {};
      }
    }
  },
  computed:{
    showRight(){
      return this.$store.state.showRight
    },
  },
  data(){
      return{
        sliderUp:true,
      }
  },
  methods: {
    tabClick() {
      this.$emit("tabClick");
    },
    up(){
        let self = this;
        self.sliderUp = !self.sliderUp;
    }
  }
};
</script>

<style lang="less">
.activeicon{
  transform: translateX(-466px);
}
.icontotal{
    position: absolute;
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    right: 18px;
    top:60px;
    transition:  transform .4s;
    &-top{
        width: 60px;
        height: 24px;
        background-image: url("../../assets/icons/icontotal.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:12px;
        color:rgba(179,235,255,1);
        line-height:16px;
    }
    &-btm{
        width:158px;
        max-height:532px;
        padding-bottom: 16px;
        background:rgba(29,52,109,0.7);
        box-shadow:0px 0px 40px 0px rgba(41,157,245,0.3) inset;
        border:1px solid rgba(78,165,210,1);
        display:flex;
        flex-direction: column;
        transition:  transform .4s;
        overflow-y: auto;
        &-item{
            margin:16px 0 0 16px;
            display: flex;
            justify-content: flex-start;
            // align-items: center;
        }
        &-title{
            margin:0;
            font-size:12px;
            color:rgba(179,235,255,1);
            line-height:21px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            i{
                font-size:16px;
                color: rgba(89, 255, 249, 1);
                margin-right:8px;
            }
        }
        &-btm::-webkit-scrollbar{
          display:none;
        }
    }
    &-btn{
        width: 16px;
        height: 16px;
        background-image: url("../../assets/icons/button_up.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .iconslider
    {
      transform: translateY(-900px);
    }
}
</style>
