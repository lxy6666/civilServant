

const statusCode = {
  16001:{
    statusColor:'planColor',
    areaConfig:{
      strokeColor:'#F7B500',
      strokeStyle:'dashed',
      strokeDasharray:[10,10],
      fillColor:'#FFBB00',
      fillOpacity:0,
    }
  },
  16002:{
    statusColor:'budingColor',
    areaConfig:{
      strokeColor:'#0DC498',
      strokeStyle:'dashed',
      strokeDasharray:[10,2,10],
      fillColor:'#00523E',
      fillOpacity:0,
    }
  },
  16003:{
    statusColor:'finishColor',
    areaConfig:{
      strokeColor:'#42EEFF',
      strokeStyle:'dashed',
      strokeDasharray:[0,0],
      fillColor:'#42EEFF',
      fillOpacity:0,
    }
  },

}


//简易 label 图标
const setSimpleContent = function setSimpleContent(item,opt){
  let lcontent = `<p class="${opt.statusColor}  simpleTag">${item.title}</p>`;
  return lcontent
}


//默认 功能区通用图标
const setLabelContent = function setLabelContent(item,type){
  //默认的 普通labelContent
  let content = '';
  let buildclass = {
    16001:'',
    16002:'cockpitmark',
    16003:'cockpitmark',
  };
  // console.log(type,"lexing");
  // ${buildclass[item.status]}               <i class="cockpitmark   ${item.icon||item.icon_string|| 'iconcategory'}"></i>
  // let 
  content = `
    <div class="cockpitmark ">
      <div class="cockpitmark-top">
          <div class="cockpitmark-top-icon mr-1">
            <svg  class="tagSvg" aria-hidden="true" '>
              <use xlink:href="${item.icon||item.icon_string|| '#iconjuanchengbaolilai'}"></use>
            </svg>
          </div>
          <div class="cockpitmark-top-text">${item.name}</div>
      </div>
      <div class="cockpitmark-btm">
        <p v-if="${type}=='cockpit'">AQI:179</p>
        <div class="aqibtn" v-if="${type}=='cockpit'">重度污染</div>
      </div>
    </div>`;
  return content;
};





const setArea  = function(item,textMarker,GisMap){
  let area = createArea(item);
  // //area.hide();
  // area.on('mouseover',function(e){
  //   area.show();
  // });
  // area.on('mouseover',function(e){
  //   area.show();
  // });
  // area.on('mouseout',function(e){
  //   area.hide();
  // })
  // textMarker.on('mouseover',function(e){
  //   area.show()
  // });
  // textMarker.on('mouseout',function(e){
  //   area.hide();
  // })
  // textMarker.on('click',function(e){
  //   area.hide();
  // })

  GisMap.add(area);
  return area
}


const createArea = function createArea(item){
  let opt = statusCode[item.status].areaConfig || statusCode[16001].areaConfig;
  let path = JSON.parse(item.area.path);
  var polygon = new AMap.Polygon({
    path: path||[],
    strokeColor:opt.strokeColor,
    strokeWeight: 1.5,
    strokeOpacity: 1,
    strokeStyle:opt.strokeStyle,
    strokeDasharray:opt.strokeDasharray,
    fillOpacity: opt.fillOpacity,
    fillColor: opt.fillColor,
    zIndex: 300,
  });
  polygon.opt = opt;
  polygon.on('mouseover',function(e){
    polygon.setOptions({
      // fillOpacity:0.3
    });
  });
  polygon.on('mouseout',function(e){
    polygon.setOptions({
      fillOpacity:0
    });
  })
  return polygon
}

const setTags = function cockpitTag(list,GisMap,type,tagClick = function(item,tag){}){
  let textMarkers = [];
  console.log(list,'----查看list数据特征---');
  if (list && list.length) {
    list.forEach(item => {
      let opt = statusCode[item.status]|| statusCode[16001];

      // 简单icon 模式的 icon
      let lcontent ='';

      let offset;

      // lcontent = setLabelContent(item,type);
      lcontent = setSimpleContent(item,opt);

      offset = new AMap.Pixel(0,0);  //设置文本标注偏移量

      let textMarker = new AMap.Marker({
        position: new AMap.LngLat(item.position[0], item.position[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: item.title,
        cursor: "pointer",
        zIndex: 300,
        content: `<span class="iconNone"'></span> `,
      });
      textMarker.setLabel({
        offset: offset, //设置文本标注偏移量
        content: lcontent, //设置文本标注内容
        direction: "center" //设置文本标注方位
      });
      textMarker.showType = item.type_value ||'';
      textMarker.extData = item;
      textMarkers.push(textMarker);




      let area = createArea(item);
      textMarker.area = area;
      GisMap.add(area);

      textMarker.setMap(GisMap);
      tagClick(item,textMarker);

    });
  }
  return textMarkers
};



export default {
  setSimpleContent:setSimpleContent,
  setLabelContent: setLabelContent,
  createArea:createArea,
  setTags:setTags,
  statusCode:statusCode,
};
