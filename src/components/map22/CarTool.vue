<template lang="html">
  <div class="mapToolsOut">
    <!-- {{sensitivedetail}}
    {{lineArr}} -->
    <!-- <card class='opacityCard'  >
      <div  class='toolItem' @click='startAnimation'> <i class='fa fa-arrow-circle-left' style='margin-right:.3em'></i><span>开始运动</span></div>
    </card>
     <card class='opacityCard'  >
      <div  class='toolItem' @click='pauseAnimation'> <i class='fa fa-arrow-circle-left' style='margin-right:.3em'></i><span>暂停运动</span></div>
    </card>
     <card class='opacityCard'  >
      <div  class='toolItem' @click='resumeAnimation'> <i class='fa fa-arrow-circle-left' style='margin-right:.3em'></i><span>继续运动</span></div>
    </card>
     <card class='opacityCard'  >
      <div  class='toolItem' @click='stopAnimation'> <i class='fa fa-arrow-circle-left' style='margin-right:.3em'></i><span>停止运动</span></div>
    </card> -->
  </div>
</template>
<script>
import tool from "./tool.vue";
import _API from "../../util/api";
import _URL from "../../util/url";
import _Cookie from "../../util/cookie";
import card from "@/components/card/BorderCard";
// import E from "wangeditor";
export default {
  name: "mapTools",
  components: {
    card
  },
  props: {
    sensitivedetail: {
      type: Object
    },
    lineArr: {
      type: Array
    },
    useType: {
      type: String,
      default:'gps'
    }
  },
  data() {
    return {
      GisMap: window.GisMap,
      map: new AMap.Map("container", {
        resizeEnable: true,
        center: [118.130602, 36.769688],
        zoom: 17
      }),
      info: [],
      marker: null,
      olyline: null,
      passedPolyline: null,
      infoWindow: [],
      outInfo: [],
      outWindow: null,
      geocoder: null,
      loadCount: 0
    };
  },
  mounted() {
    let self = this;
    async function load() {
      if (self.lineArr.length) {

        self.initMap();
        self.getAddressName(
          self.lineArr[0],
          self.lineArr[self.lineArr.length - 1]
        );
        // 未载入高德地图API，则先载入API再初始化
      } else {
        if(self.loadCount<1000){
          self.loadCount++;
          setTimeout(() => {
            load();
          }, 500);
        } else {
          return;
        }
      }
    }
    load();
  },
  methods: {
    startAnimation() {
      console.log(this.marker, "this.markerthis.marker");
      this.marker.moveAlong(this.lineArr, 2000);
    },
    getAddressName(inarr, outarr) {
      let inaddr;
      let outaddr;
      let self = this;
      console.log(self.lineArr,'self.lineArrself.lineArr');
      console.log(self.sensitivedetail,"轨迹详情");
      this.geocoder = new AMap.Geocoder({
        city: "010", //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });
      this.geocoder.getAddress(inarr, function(status, result) {
        console.log(result, "resultresult");
        if (status === "complete" && result.regeocode) {
          console.log(
            result.regeocode.formattedAddress,
            "result.regeocode.formattedAddress111"
          );
          inaddr = result.regeocode.formattedAddress;
          // document.getElementById('address').value = address;
          if (self.useType === "gps") {
            self.infoWindow[0] = new AMap.Marker({
              // offset: new AMap.Pixel(-125, -40),
              position: self.lineArr[0],
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
            });
          }else if(self.useType=='zfy'){
            self.infoWindow[0] = new AMap.Marker({
              // offset: new AMap.Pixel(-125, -40),
              position: self.lineArr[0],
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            });
          }
          self.infoWindow[0].setMap(window.GisMap);
        } else {
          log.error("根据经纬度查询地址失败");
        }
      });
      this.geocoder.getAddress(outarr, function(status, result) {
        console.log(result, "resultresult");
        if (status === "complete" && result.regeocode) {
          console.log(
            result.regeocode.formattedAddress,
            "result.regeocode.formattedAddress111"
          );
          outaddr = result.regeocode.formattedAddress;
          // document.getElementById('address').value = address;
          console.log(self.sensitivedetail,'self.sensitivedetail')
          // return
          if (self.useType === "gps") {
            self.infoWindow[1] = new AMap.Marker({
            position: self.lineArr[self.lineArr.length - 1],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            });
            self.infoWindow[2] = new AMap.Marker({
              position: self.lineArr[self.lineArr.length - 1],
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            });
            if (self.sensitivedetail && self.sensitivedetail.out_time) {
              self.infoWindow[2].setMap(window.GisMap);
            } else {
              self.infoWindow[1].setMap(window.GisMap);
            }
          }else if(self.useType === "zfy"){
            self.infoWindow[1] = new AMap.Marker({
            offset: new AMap.Pixel(-125, -20),
            position: self.lineArr[self.lineArr.length - 1],
            content: `<div style="width:250px;position: absolute; bottom: 0px; left: 0px;">
                      <div class="bottom-center amap-info-contentContainer">
                      <div class="amap-info-content amap-info-outer">
                      <b>设备名称</b>:${self.sensitivedetail.dev_name}<br><b>巡更人</b>:${self.sensitivedetail.employees_name}<br>
                      <b>巡更状态</b>:巡更中<br>
                      <b>当前位置</b>:${outaddr}<br>
                      </div><div class="amap-info-sharp"></div></div></div>'`
            });
            self.infoWindow[2] = new AMap.Marker({
              offset: new AMap.Pixel(-125, -20),
              position: self.lineArr[self.lineArr.length - 1],
              content: `<div style="width:250px;position: absolute; bottom: 0px; left: 0px;">
                        <div class="bottom-center amap-info-contentContainer">
                        <div class="amap-info-content amap-info-outer">
                        <b>设备名称</b>:${self.sensitivedetail.dev_name}<br><b>巡更人</b>:${self.sensitivedetail.employees_name}<br>
                        <b>巡更状态</b>:巡更结束<br>
                        <b>结束时间</b>:${self.sensitivedetail.end_time}<br>
                        <b>结束位置</b>:${outaddr}<br>
                        </div><div class="amap-info-sharp"></div></div></div>'`
              });
              if (self.sensitivedetail.patrol_status==1002) {
                self.infoWindow[1].setMap(window.GisMap);
              } else {
                self.infoWindow[2].setMap(window.GisMap);
              }
          }


        } else {
          log.error("根据经纬度查询地址失败");
        }
      });
    },
    pauseAnimation() {
      this.marker.pauseMove();
    },
    resumeAnimation() {
      this.marker.resumeMove();
    },
    stopAnimation() {
      this.marker.stopMove();
    },
    initMap() {
      let self = this;
      console.log(
        GisMap,
        this.lineArr[this.lineArr.length / 2],
        "this.lineArr[(this.lineArr.length)/2]"
      );
      GisMap.panTo(this.lineArr[0]);
      this.marker = new AMap.Marker({
        position: this.lineArr[0],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      });
      console.log(GisMap, "GisMapGisMapGisMap");
      // GisMap.add(this.marker);
      this.polyline = new AMap.Polyline({
        path: self.lineArr,
        map: GisMap,
        showDir: true,
        strokeColor: "rgba(237,135,135,1)", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      this.passedPolyline = new AMap.Polyline({
        map: GisMap,
        // path: lineArr,
        strokeColor: "#AF5", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      console.log(this.info, "this.infothis.infothis.info");
      this.marker.on("moving", function(e) {
        self.passedPolyline.setPath(e.passedPath);
      });
    },
    setLine() {
      this.checkFlag = true;
      window.polyline = new AMap.Polyline(window.GisMap);
      function drawPolyline() {
        polyline.polyline({
          path: this.lineArr,
          showDir: true,
          strokeColor: "#28F", //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 //线宽
          // strokeStyle: "solid"  //线样式
        });
      }
      polyline.on("moving", function(e) {
        passedPolyline.setPath(e.passedPath);
      });
      drawPolyline();
    },
    makeMap() {
      let self = this;
      this.marker = new AMap.Polygon({
        path: this.lineArr,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      // window.drawMap = [];
    }
  }
};
</script>

<style lang="less">
.mapToolsOut {
  position: absolute;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  flex-direction: row;
  background: none;
  left: 50%;
  top: 36px;
}
.toolItem {
  cursor: pointer;
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .fa {
    position: relative;
    top: 1px;
  }
}
.m-colorPicker {
  z-index: 10003;
}
.amap-info-combo {
  display: none;
}
.windowInfo {
  border: 1px solid red;
}
</style>
