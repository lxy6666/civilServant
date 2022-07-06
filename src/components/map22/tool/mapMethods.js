import Store from "../../../store.js";
import Router from "../../../router.js"

const baseURL = "https://m.ts-it.cn/third/icarus/static/";

const statusCode = {
  16001:{
    statusColor:'planColor',
    areaConfig:{
      strokeColor:'#F7B500',
      strokeStyle:'dashed',
      strokeDasharray:[10,10],
      fillColor:'#FFBB00',
      fillOpacity:0.3,
    }
  },
  16002:{
    statusColor:'budingColor',
    areaConfig:{
      strokeColor:'#0DC498',
      strokeStyle:'dashed',
      strokeDasharray:[10,2,10],
      fillColor:'#00523E',
      fillOpacity:0.3,
    }
  },
  16003:{
    statusColor:'finishColor',
    areaConfig:{
      // strokeColor:'#42EEFF',
      strokeColor:'#0079c1',
      strokeStyle:'dashed',
      strokeDasharray:[0,0],
      // fillColor:'#42EEFF',
      fillColor:'#001d4c',
      fillOpacity:0.3,
    }
  },

}

//检测区域类型
const mCode = {
  300001:'m_anquan',
  300002:'m_anfang',
  300003:'m_huangbao',
  300004:'m_nenghao',
  300024:'m_xiaofang'
}


const setAngle = function setAngle(GisMap,height){
  var angleLayer =  new AMap.Object3DLayer({zIndex:2000,opacity:0.8});
  angleLayer.name ='测试';
  let list = [
    { //5path
      url: `${baseURL}angle/angle1.gltf`,
      height:40,
      // path:[118.153549,36.771116]
      path:[118.153673,36.767841],

    },
    { // 6path
      url: `${baseURL}angle/angle3.gltf`,
      height:40,
      // path:[118.153525,36.770673]
      path:[118.153813,36.767472],

    },
    {
      url: `${baseURL}angle/angle7.gltf`,
      height:40,
      // path:[118.155075,36.770673]
      path:[118.154575,36.767653],

    },
    {
      url: `${baseURL}angle/angle5.gltf`,
      height:40,
      // path:[118.155106,36.771101]
      path:[118.154431,36.768032]
    },
    {
      url: `${baseURL}angle/angle2.gltf`,
      height:height,
      // path:[118.153549,36.771116]
      path:[118.153673,36.767841],

    },
    {
      url: `${baseURL}angle/angle4.gltf`,
      height:height,
      // path:[118.153525,36.770673]
      path:[118.153813,36.767472],

    },
    {
      url: `${baseURL}angle/angle8.gltf`,
      height:height,
      // path:[118.155075,36.770673]
      path:[118.154575,36.767653],

    },
    {
      url: `${baseURL}angle/angle6.gltf`,
      height:height,
      // path:[118.155106,36.771101]
      path:[118.154431,36.768032]

    },
  ]
  GisMap.add(angleLayer);
  GisMap.plugin(["AMap.GltfLoader"], function() {
    const Loader = new AMap.GltfLoader(); //加载器loader
    let len = list.length;
    list.forEach((x)=>{
      var modelUrl = x.url || `${baseURL}test/h.gltf`;
      var param = {
        position: new AMap.LngLat(x.path[0], x.path[1]), // 必须
        scale: 0.01, // 非必须，默认1
        height:x.height, // 非必须，默认0
        scene: 0 // 非必须，默认0
      };
      Loader.load(modelUrl, function(gltf) {
        gltf.setOption(param);
        //gltf.rotateX(item.transform.x);
        //gltf.rotateZ(item.transform.z);
        angleLayer.add(gltf);
      });



    })

  });
};

//简易 label 图标
const setSimpleContent = function setSimpleContent(item,opt){
  let lcontent = `<p class="${opt.statusColor}  simpleTag">${item.title}</p>`;
  return lcontent
}

const setDeviceMark = function setDeviceMark(item,GisMap,callback){
  let imgUrl =  '' ;
  try {
    imgUrl = item.icon ? require(`./imgs/${item.icon}.png`) : require(`./imgs/m_zxpt.png`);
  } catch (e) {
    console.log(JSON.stringify(item),'---瞎录的什么--');
    item.icon = require(`./imgs/m_zxpt.png`);
  }
  let textMarker = new AMap.Marker({
    position: new AMap.LngLat(item.longitude, item.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: item.name,
    cursor: "pointer",
    zIndex: 300,
    content: `<img class='iconDevice' src='${imgUrl}'>`,
    offset:new AMap.Pixel(-23, -54),
  });
  let lcontent = '';
  let opt = statusCode[item.status]|| statusCode[16001];



  let offset = new AMap.Pixel(0, -46);

  textMarker.setLabel({
    offset: offset, //设置文本标注偏移量
    content: `<p class="deviceTag">${item.title}</p>`, //设置文本标注内容
    direction: "center" //设置文本标注方位
  });
  textMarker.extData = item;
  // textMarker.on('click',(e)=>{
  //   Store.commit('setLoading');
  // })
  callback(item,textMarker)
  textMarker.setMap(GisMap);
  return textMarker
}
//默认 功能区通用图标
const setLabelContent = function setLabelContent(item){
  //默认的 普通labelContent
  let content = '';
  let buildclass = {
    16001:'',
    16002:'markernewing',
    16003:'markernewed',
  };
  content = `
    <div class="markernew ${buildclass[item.status]}">
      <div class="markernew-top">
          <div class="markernew-top-icon mr-1">
            <i class="iconfont   ${item.icon||item.icon_string|| 'iconcategory'}"></i>
          </div>
          <div class="markernew-top-text">${item.name}</div>
      </div>
      <div class="markernew-line"></div>
      <div class="markernew-dotted"></div>
    </div>`;
  return content;
};

//企业列表特有
const setFactoryContent =  function setFactoryContent(item){
  //企业专用的labelCotent
  let content = '';
  let buildclass = {
    16001:'',
    16002:'markernewing',
    16003:'markernewed',
  };
  let iconText = ''
  if(!item.icon && !item.icon_string){
    iconText = '<i class="iconfont  iconqiye"></i>'
  }else{
    iconText = `<svg  class="tagSvg" aria-hidden="true" '>
      <use xlink:href="${item.icon||item.icon_string}"></use>
    </svg>`
  }
  content = `
    <div class="markernew  ${buildclass[item.status]}">
      <div class="markernew-top">
          <div class="markernew-top-icon clearBG clearBorder">
            ${iconText}
          </div>
          <div class="markernew-top-text">${item.name}</div>
      </div>
      <div class="markernew-line"></div>
      <div class="markernew-dotted"></div>
    </div>`;
  return content;
};


//检测区特有图标
const setMonitoringContent = function setMonitoringContent(item){
  //企业专用的labelCotent
  let content = '';
  let buildclass = {
    16001:'planColor',
    16002:'budingColor',
    16003:'finishColor',
  };
  content = `
    <div class="markerMonit ${buildclass[item.status]} ${mCode[item.fTypeValue]} ">
      <div class="markerMonit-content">
        <h2>
          <i class='iconfont ${item.icon_string || item.icon || "iconcategory"}'></i>
          ${item.name}
        </h2>
        <div class='markerMonit-bottomLine'></div>
      </div>
      <div class="markerMonit-line"></div>
      <div class="markerMonit-dotted"></div>
    </div>`;
  return content;
}



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

const setModel = function(){

}

const createArea = function createArea(item){
  let opt = statusCode[item.status].areaConfig || statusCode[16001].areaConfig;
  let path = JSON.parse(item.area.path);
  var polygon = new AMap.Polygon({
    path: path||[],
    strokeColor:opt.strokeColor,
    strokeWeight: 2,
    strokeOpacity: 1,
    strokeStyle:opt.strokeStyle,
    strokeDasharray:opt.strokeDasharray,
    fillOpacity: opt.fillOpacity,
    fillColor: opt.fillColor,
    zIndex: 100,
  });
  polygon.opt = opt;
  return polygon
}

const cockpitTag = function cockpitTag(){

};
const setTags = function setTags(list,GisMap, tagClick = function(item,tag){
  console.log(item,'输入参数信息对象');
  console.log(tag,'生成tag对象');
}){
  let textMarkers = [];
  if (list && list.length) {
    list.forEach(item => {
      let opt = statusCode[item.status]|| statusCode[16001];

      // 简单icon 模式的 icon
      let mcontent = `<i class='${opt.statusColor}  iconfont ${item.icon||item.icon_string||"iconqiye"}'></i>`;
      let lcontent ='';

      let offset;

      //功能区tag
      if(item.dataType && item.dataType === 'funArea'){
        if(item.classify_parent_name&&item.classify_parent_name =='敏感区域'){
          // 敏感点特殊组对待
          offset = new AMap.Pixel(0, -26);
          //简单tag
          lcontent = setSimpleContent(item,opt);
        }else{
          if(item.type_value_name == '企业'){
            lcontent = setFactoryContent(item);
          }else{
            lcontent = setLabelContent(item);
          }
          mcontent = `<span class="iconNone"'></span> `;
          offset = new AMap.Pixel(0, -82);  //设置文本标注偏移量

        }

      }

      //监测区域tag区域
      if(item.dataType && item.dataType === 'monitorArea'){
        lcontent = setMonitoringContent(item);
        mcontent = `<span class="iconNone"'></span> `;

        offset = new AMap.Pixel(0, -82);  //设置文本标注偏移量

      }

      if(item.dataType === 'taffic'){ //功能区域地板
        //textMarkers.area = setArea(item,textMarker,GisMap);

        lcontent = setSimpleContent(item,opt);
        mcontent = `<i class='${opt.statusColor}  iconfont ${item.icon||item.icon_string||"iconcategory"}'></i>`;
        offset = new AMap.Pixel(0, -26);

      }

      let textMarker = new AMap.Marker({
        position: new AMap.LngLat(item.position[0], item.position[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: item.title,
        cursor: "pointer",
        zIndex: 300,
        content: mcontent,
      });
      textMarker.setLabel({
        offset: offset, //设置文本标注偏移量
        content: lcontent, //设置文本标注内容
        direction: "center" //设置文本标注方位
      });
      textMarker.showType = item.type_value ||'';
      textMarker.extData = item;
      textMarkers.push(textMarker);




      if(item.dataType === 'taffic'){ //功能区域地板
        //textMarkers.area = setArea(item,textMarker,GisMap);
        let area = createArea(item);
        GisMap.add(area);
        textMarker.area =area;
      }



      if(item.dataType === 'funArea'){ //功能区域地板
        //textMarkers.area = setArea(item,textMarker,GisMap);
        let area = createArea(item);
        GisMap.add(area);
        textMarker.area =area;
      }





      // textMarker.on('click',(e)=>{
      //   Store.commit('setLoading');
      // })

      textMarker.setMap(GisMap);
      tagClick(item,textMarker);

    });
  }
  return textMarkers
}


let setShop = function(list,callback=function(item){
  console.log(item)
}){
  let tags = [];
  if (list && list.length) {
    console.log(list,'----shop--list--')
    list.forEach((item)=>{
      let center = JSON.parse(item.center);
      let content =  `<div class="roundTag" >
          <div class="roundTag-body">
            <i class=" iconfont iconputongcunchuqu"></i>
            <p class="roundTag-title">${item.name}</p>
          </div>
          <div class="roundTag-foot">
            <div class="roundTag-line"></div>
            <i class='roundTag-point'></i>
          </div>
        </div>`
      let textMarker = new AMap.Marker({
        position: new AMap.LngLat(center.lng, center.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: item.name,
        cursor: "pointer",
        zIndex: 300,
        content: '<div></div>',
      });
       textMarker.setLabel({
        content: content, //设置文本标注内容
        direction: "center" //设置文本标注方位
      });
      textMarker._Data = item;
      callback(textMarker);
      tags.push(textMarker);
    });

    console.log(tags,'-查看tags----')
    return tags;
  }else{
    return []
  }
};
let typeIcon = {
    '热电厂':'icon-hot',
    "围子变电站":"icon-electric",
    '道闸':'icon-roadgatehl',
    '专用洗车场':'icon-washing',
    '危化品车辆专用停车场':'icon-parking',
    '危化品车辆专用通道':'icon-cheliangtongdao',
    '交通':'icon-category',
    '环保':'icon-environment_protect',
    '污水处理厂':'icon-effluent_deal',
    "公共管道":"icon-tunnel",
    '防潮防洪设施':'icon-dampproof',
    '地下水监测区':'icon-underground_well',
    '地表水监测区':'icon-surfacewater',
    '危废安全处置':'icon-dangerous_waste_deal',
    '村落':'icon-village',
    '学校':'icon-school',
    '消防站':'icon-fire_station',
    '消防栓':'icon--FireHydrant',
    '卫生院':'icon-weishengyuan',
    '医院':'icon-hospital',
    '小区':'icon-xiaoqu',
    "707720085959217152":'#icon-lianchuang',//联创
    "701135894127710208":'#icon-dacheng',//大成
    "707725167157186560":'#icon-minji',//民基
    "707725395407015936":'#icon-luhua',//鲁华同方
    "707725511320801280":'#icon-luhua',//鲁华
    "707725643453960192":'#icon-qilong',//齐隆
    "707725772151984128":'#icon-xinhua',//新华
    "716385859418591232":'#icon-xinsu',//新塑
    "716385958819401728":'#icon-yuanfengnor',//元丰
    "716797119163404288":'#icon-jiangang',//建刚
    "732030262472478720":'icon-shandongruiyingzhiyao',//睿鹰
    "736646916431024128":'icon-qiye',//鼎泰
    "736647567026294784":'icon-qiye',//四新
    "736647965434843136":'icon-qiye',//泰瑞
    "736648528042004480":'icon-qiye',//金沃泰
    "736648679062114304":'icon-qiye',//天拓
    "736648855101247488":'icon-shandongjuanchengnangang',//南港
    "736649497895112704":'icon-qiye',//祥顺
    "736649749976977408":'icon-juanchengbaolilai',//宝利莱
    "736649869577555968":'icon-qiye',//鼎晟
    "736649997432524800":'icon-hezehuayihuagong',//华意化工
    "736649612806459392":'icon-qiye',
}



export default {
  setTags:setTags,
  //setText: setText,
  setShop:setShop,
  setDeviceMark:setDeviceMark,
  setLabelContent: setLabelContent,
  createArea:createArea,
  cockpitTag:cockpitTag,
  setAngle:setAngle
};
