<template lang="html">
  <div class='trafficScreenSider'>
    <div class="trafficScreenSider-card mb-1">
      <ItemTitle title='' class='mb-2'>
        <div class='flex-title'>
          <span>今日报警统计</span>
          <!-- <i class=' iconfont iconicon-'></i> -->
        </div>
      </ItemTitle>
      <GlassCard >
        <div class='warnBoxt' slot='rightPart'>
          <noData title="暂无数据"/>
          <!-- <p class='warnBoxt-item' >
            <span>鲁G3467E8</span>
            <span>驾驶员:张三</span>
            <span class='warnRed'>驾驶时打电话</span>
          </p>
          <p class='warnBoxt-item' >
            <span>鲁G3467E8</span>
            <span>驾驶员:张三</span>
            <span class='warnRed'>驾驶时打电话</span>
          </p>
          <p class='warnBoxt-item' >
            <span>鲁G3467E8</span>
            <span>驾驶员:张三</span>
            <span class='warnRed'>驾驶时打电话</span>
          </p>
          <p class='warnBoxt-item' >
            <span>鲁G3467E8</span>
            <span>驾驶员:张三</span>
            <span class='warnRed'>驾驶时打电话</span>
          </p> -->
        </div>
      </GlassCard>
    </div>


    <div class="trafficScreenSider-card mb-1">
      <ItemTitle title='' class='mb-2'>
        <div class='flex-title'>
          <span>车辆分布统计</span>
          <!-- <i class=' iconfont iconicon-'></i> -->
        </div>
      </ItemTitle>
      <div class="shadowBlue chartWarnToday">
        <Pinlr title='车辆分布' :item='carChart' class='pinChartToday'/>
      </div>
    </div>


    <div class="trafficScreenSider-card ">
      <ItemTitle title='' class='mb-2'>
        <div class='flex-title'>
          <span>告警数量统计</span>
          <!-- <i class=' iconfont iconicon-'></i> -->
        </div>
      </ItemTitle>
      <div class="shadowBlue chartWarnToday">
        <BarSingle :item='warnChart'  />

      </div>
    </div>
  </div>
</template>

<script>

import ItemTitle from '@/components/title/ItemTitle';
import GlassCard from '@/components/card/GlassCard';
import Pinlr from '@/components/charts/warn/PinLR.vue';
import BarSingle from '@/components/charts/warn/BarSingle.vue';


const carChartMock ={
  legend:[
    '道路运输中',
    '清洗厂内',
    '装卸厂',
    '维修厂内',
    '化工园区内',
  ],
  data:[
      {value: 0, name: '道路运输中'},
      {value: 0, name: '清洗厂内'},
      {value: 0, name: '装卸厂'},
      {value: 0, name: '维修厂内'},
      {value: 0, name: '化工园区内'}
  ]
  // data:[
  //     {value: 8, name: '道路运输中'},
  //     {value: 6, name: '清洗厂内'},
  //     {value: 4, name: '装卸厂'},
  //     {value: 1, name: '维修厂内'},
  //     {value: 12, name: '化工园区内'}
  // ]
};

const warnChartMock ={
  xAxisData:['07-14','07-15','07-16','07-17','07-18','07-19','07-20'],
  series:[{
    name: '个',
    type: 'bar',
    barGap: 0.2,
    barWidth :'16px',
    interval: 5,
  //  label: labelOption,
    // data: [450, 332, 301, 334,315,453],
    data: [0,0,0,0,0,0,0]
  },]
};



export default {
  name:'trafficScreenSider',
  data(){
    return {
      carChart:carChartMock,
      warnChart:warnChartMock
    }
  },
  props:{

  },
  components:{
    ItemTitle,
    GlassCard,
    Pinlr,
    BarSingle
  },
  computed:{

  },
  methods:{

  }
}
</script>

<style lang="less">


.trafficScreenSider{
  display: flex;
  width: 456px;
  height: calc(~ ' 100vh - 86px' );
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 12px;

  &-card{
    width: 100%;
    background:rgba(34,47,84,1);
    padding: 8px 12px;
    background:#151D3F;
    border:1px solid rgba(51,75,143,0.56);
  }
  .flex-title
  {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  .warnBoxt{
    display: block;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    padding: 8px 12px;
    &-item{
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      color:rgba(228,247,255,1);
      line-height: 2em;
      .warnRed{
        color:#FF5959;
      }
    }
  }
  .chartWarnToday
  {
    padding: 8px 12px;

  }
  .pinChartToday{
    height: 196px;

  }
  .barsingle{
    height: 240px;
  }
}

</style>
