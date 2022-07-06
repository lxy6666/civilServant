<template lang="html">
  <div :class="leftSlider?'total':'total activetotal'">
    <div class="total-top" @click="up">
        建设总览
    </div>
    <div :class="sliderUp?'total-btm ':'total-btm slider'">
        <div class="total-btm-item" v-for="(item,index) in countList" :key="index">
            <div class="total-btm-icon">
              <i :class="`iconfont ${item.icon}`"></i>
            </div>
            <div class="total-btm-right">
              <p class="total-btm-title">{{item.name}}</p>
              <span class='total-btm-analysis'>
                  <span class="total-btm-num">{{item.numed}}</span>
                  <span class="total-btm-num small">/{{item.num}}</span>
              </span>
            </div>

        </div>
    </div>
    <div :class="sliderUp?'total-btn':'total-btn slider'" @click="up" ></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    type: {
      type: String,
    },
    countList:{
      type: Array,
      default: () => {
        return {};
      }
    }
  },
  data(){
    return{
      sliderUp:true,
    }
  },
  computed:{
    leftSlider(){
      let self = this;
      return self.$store.state.sliderUp;
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
.activetotal{
  // left:22px !important;
  transform: translateX(-236px);
}
.total{
    position: absolute;
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    left: 258px;
    top:60px;
    transition:  transform .4s;
    &-top{
        width: 100px;
        height: 30px;
        background-image: url("../../assets/icons/boxtotal.png");
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
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 320px;
        padding-top: 8px;
        max-height:532px;
        // min-height:532px;
        background:rgba(29,52,109,0.7);
        box-shadow:0px 0px 40px 0px rgba(41,157,245,0.3) inset;
        border:1px solid rgba(78,165,210,1);
        // display:flex;
        // flex-wrap: wrap;
        // align-items: flex-start;
        transition:  transform .4s;
        overflow-y: auto;
        &-item{
            position: relative;
            padding:8px 16px 8px;
          //  border-bottom: 1px solid #4ea5d2;
            min-width:50%;
            // height:70px;
            display: flex;
            // flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
        &-item:nth-child(odd){
          // border-right: 1px solid #4ea5d2;
        }

        &-item::after{
          display: block;
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          left: 0;
          bottom: -1px;
          background: radial-gradient(rgba(143, 207, 250, 0.8) 20%, transparent 75%);
          background-image: radial-gradient(rgba(143, 207, 250, 0.8) 20%, transparent 75%);
          background-position-x: initial;
          background-position-y: initial;
          background-size: initial;
          background-repeat-x: initial;
          background-repeat-y: initial;
          background-attachment: initial;
          background-origin: initial;
          background-clip: initial;
          background-color: initial;
        }
        &-icon{
          width:30px;
          height:30px;
          border-radius:50%;
          border:1px solid rgba(78,165,210,1);
          color:rgba(78,165,210,1);
          margin-right:12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &-right{
          width: 6em;
          position: relative;
          height: 50px;
          p{
            line-height: 2em;
            margin:0 !important;
            text-align: justify;
          }
        }
        &-analysis{
          position: absolute;
          bottom:0;
          right: 0;
        }
        &-title{
            font-size:12px;
            color:rgba(179,235,255,1);
            line-height:21px;
        }
        &-num{
            font-size:16px;
            font-weight:bold;
            color:rgba(208, 255, 111, 1);
            line-height:28px;
        }
        .small{
            font-size:12px;
            color:rgba(179, 235, 255, 1);
            line-height:28px;
        }
        &-btm::-webkit-scrollbar{
          display:none;
        }
    }
    &-btn{
        width: 16px;
        height: 16px;
        margin-left: 304px;
        transition:  transform .4s;
        background-image: url("../../assets/icons/button_up.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .slider
    {
      transform: translateY(-900px);
    }
}
</style>
