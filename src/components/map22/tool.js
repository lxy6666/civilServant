import Router from "../../router.js"
import Store from "../../store.js"

let createLayer = function createLayer(zoom) {
  var layer = new AMap.Object3DLayer({ zIndex: zoom || 100 });
  return layer;
};
// opt={h:300,c:'#0088ffcc'}
let createdWall = function Wall(wallPaths, opt={h:120,c:'#88ffcc'}) {
  if (!wallPaths) {
    console.error("paths is be need");
    return;
  }
  var bounds = wallPaths.map(function(path) {
    return new AMap.LngLat(path[0], path[1]);
  });
  var wall = new AMap.Object3D.Wall({
    path: bounds,
    height: opt.h,
    color: opt.c //rgba
  });
  wall.backOrFront = "both";
  wall.transparent = true;
  return wall;
};

let createArea = function Area(p, opt = { h: 80, c: "#88ffcc" }) {
  if (!opt.obj) {
    console.log("object3Dlayer is be need");
    return;
  }
  let prism = new AMap.Object3D.Prism({
    path: p,
    height: opt.h,
    color: opt.c //rgba
  });
  prism.transparent = true;
  return prism;
};

let createBase = function baseMap(  path, opt = {
  c:"#FF33FF",
  bg:"#1791fc",
  opacity:0.4,
},zoom){
  if(!path.length){return }
  var polygon = new AMap.Polygon({
    path: path,
    strokeColor:opt.c,
    strokeWeight: 6,
    strokeOpacity: 0.2,
    fillOpacity: opt.opacity,
    fillColor: opt.bg,
    zIndex: 10,
  });
  return polygon
}
let createBulis = function Bulis(
  arr,
  opt = { h: 30, color: "rgb(101, 213, 253)", transparent: true }
) {
  //arr  路径数组
  //transparent boolean
  // color
  var paths = arr || [
    [116.395951, 39.907129],
    [116.399127, 39.907178],
    [116.399534, 39.900413],
    [116.396316, 39.900331]
  ];
  var bounds = paths.map(function(p) {
    return new AMap.LngLat(p[0], p[1]);
  });
  // 创建 Object3D 对象

  var prism = new AMap.Object3D.Prism({
    path: bounds,
    height: opt.h,
    color: "rgba(100, 150, 230, 0.9)" || opt.color // 支持 #RRGGBB、rgb()、rgba() 格式数据
  });
  prism.name = opt.name || "E" + Math.random() * 100;
  prism.transparent = true || opt.transparent;
  return prism;
};

let createPoint = function createPoint(Point) {
  var marker = new AMap.Marker({
    position: new AMap.LngLat(Point[0], Point[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: "点位",
    icon: "https://cdn.ts-it.cn/692511086720716800sxttss.png",
    id: "es13",
    animation: "AMAP_ANIMATION_DROP",
    exDate: {
      id: "3123",
      age: "3112ee"
    }
  });
  // 触发事件的像素坐标，AMap.Pixel 类型
  return marker;
};

//废弃 createMeshAcceptTextures
const createMeshAcceptTextures = function createMeshAcceptTextures (center, length, width, height,ObjectLayer) {
        var box = new AMap.Object3D.MeshAcceptLights();
        var geometry = box.geometry;
        box.textures.push('https://a.amap.com/jsapi_demos/static/texture3d/shuilifang.png');
      //  box.rotateX(20);
        box.rotateY(0);
        box.rotateZ(-20);
        var halfLength = length / 2;
        var halfWidth = width / 2;

        // var distance = Math.round(p1.distance(p2));


        var path = [
            [-halfLength, halfWidth],
            [halfLength, halfWidth],
            [halfLength, -halfWidth],
            [-halfLength, -halfWidth]
        ];





      //  var path =[[1180.147132,360.771349],[-1180.147018,-360.768447],[-1180.150252,360.769043],[1180.150326,-360.771344]];
        // var path = [
        //   [1180.150997,360.770741],
        //   [-1180.150971,-360.770112],
        //   [1180.151677,-360.770008],
        //   [-1180.151721,360.770713],
        // ];

        //构造4个侧面
        for (var i = 0; i < 4; i += 1) {
            var x1 = path[i][0];
            var y1 = path[i][1];

            var x2 = path[(i + 1) % 4][0];
            var y2 = path[(i + 1) % 4][1];

            // 每个侧面四个顶点
            geometry.vertices.push(x1, y1, 0);
            geometry.vertices.push(x1, y1, -height);
            geometry.vertices.push(x2, y2, 0);
            geometry.vertices.push(x2, y2, -height);

            var v1 = new AMap.Vector3(0, 0, -height);
            var v2 = new AMap.Vector3(x2 - x1, y2 - y1, 0);

            // 各面的法向量
            var normal = new AMap.Vector3().crossVectors(v2, v1).normalize().elements;

            geometry.vertexNormals.push(normal[0], normal[1], normal[2]);
            geometry.vertexNormals.push(normal[0], normal[1], normal[2]);
            geometry.vertexNormals.push(normal[0], normal[1], normal[2]);
            geometry.vertexNormals.push(normal[0], normal[1], normal[2]);

            // 四个顶点的纹理坐标
            geometry.vertexUVs.push(0, 1);
            geometry.vertexUVs.push(0, 0);
            geometry.vertexUVs.push(1, 1);
            geometry.vertexUVs.push(1, 0);

            var bottomIndex = i * 4;
            var topIndex = bottomIndex + 1;
            var nextBottomIndex = (bottomIndex + 2);
            var nextTopIndex = (bottomIndex + 3);

            // 侧面三角形1
            geometry.faces.push(topIndex, bottomIndex, nextBottomIndex);
            // 侧面三角形2
            geometry.faces.push(topIndex, nextBottomIndex, nextTopIndex);
        }
        //构造顶面
        for (var i = 0; i < 4; i += 1) {
            geometry.vertices.push(path[i][0], path[i][1], -height);
            geometry.vertexNormals.push(0, 0, -1);
        }

        // 四个顶点的纹理坐标
        geometry.vertexUVs.push(0, 2);
        geometry.vertexUVs.push(1, 2);
        geometry.vertexUVs.push(1, 0);
        geometry.vertexUVs.push(0, 0);

        // 侧面三角形1
        geometry.faces.push(16 + 0, 16 + 1, 16 + 2);
        // 侧面三角形2
        geometry.faces.push(16 + 0, 16 + 2, 16 + 3);

        box.position(center);

        // 如果使用了透明颜色，请设置true
        box.transparent = true;
        ObjectLayer.add(box);
    };

const setWarning   = function setWarning(area){//设置遮罩层 透明效果警告



};
const setDeviceMark = function setDeviceMark(item,map){
  let content =
  `
        <div class="device">
          <div class="device-left"></div>
          <div class="device-center">
            <p><i class="device-center-icon iconfont icon-major_hazard"></i>${item.title}</p>
            <div class="device-center-state">
              <p>在线:2/3</p>
            </div>
          </div>
          <div class="device-right"></div>
        </div>
      `;


  var marker = new AMap.Marker({
    position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: item.title,
    content:content,
  });
  marker.exData = item.exData;
  marker.on('click',function(e){
      // Router.push({name:'workPlace',query:{mid:item.functionId}});
  });

  return marker
};
const setMarkerV3 = function setMarkerV3(item,map){
  let content ='<p>监测点</p>'
  if(item.type === 'factoryArea'){//企业下功能区
    content = `<div class='markerV2 markerV2-func'>
      <div class='markerV2-content'>
        <div class="markerV2-body">
          <i class="markerV2-icon iconfont ${item.icon_string}"></i>
          <p class="markerV2-text">${item.title}</p>
        </div>
        <div class="markerV2-state"><span>${item.status_name}</span></div>
      </div>
      <div class='markerV2-bottom'></div>
      <div class="fixLine fixFunc">
        <div class="fixLeft"></div>
        <div class="fixRight"></div>
      </div>
    </div>`
  }


  if(item.type === 'factoryMonits'){//功能检测区下区域
    content = `
    <div class="markfunArea ">
      <div class="markfunArea-title"><i class='markfunArea-icon iconfont ${item.icon_string}'></i>${item.title}</div>
      <div class="markfunArea-state"><span>${item.status_name}</span></div>
      <div class='markfunArea-bottom'></div>
    </div>`;
  }



  if(item.type === 'supervision'){//安监
    if(item.subtype==300005&&item.rank==20001){
      content = `
      <div class="areaV3all">
        <div class="areaV3">
          <div class="areaV3-left"></div>
          <div class="areaV3-center">
            <p><i class="areaV3-center-icon iconfont icon-major_hazard"></i>${item.title}${'('}${'一级'}${')'}</p>
            <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
            <div class="areaV3-center-state">
              <p>${item.status_name}</p>
              <p>在线:2/3</p>
            </div>
          </div>
          <div class="areaV3-right"></div>
        </div>
      </div>`;
    }
    if(item.subtype==300005&&item.rank==20002){
      content = `
      <div class="areaV3all">
        <div class="areaV3 areaV3two">
          <div class="areaV3-left"></div>
          <div class="areaV3-center">
            <p><i class="areaV3-center-icon iconfont icon-major_hazard"></i>${item.title}${'('}${'二级'}${')'}</p>
            <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
            <div class="areaV3-center-state">
              <p>${item.status_name}</p>
              <p>在线:2/3</p>
            </div>
          </div>
          <div class="areaV3-right"></div>
        </div>
      </div>`;
    }
    if(item.subtype==300005&&item.rank==20003){
      content = `
      <div class="areaV3all">
      <div class="areaV3 areaV3three">
        <div class="areaV3-left"></div>
        <div class="areaV3-center">
          <p><i class="areaV3-center-icon iconfont icon-major_hazard"></i>${item.title}${'('}${'三级'}${')'}</p>
          <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
          <div class="areaV3-center-state">
            <p>${item.status_name}</p>
            <p>在线:2/3</p>
          </div>
        </div>
        <div class="areaV3-right"></div>
      </div></div>`;
    }
    if(item.subtype==300005&&item.rank==20004){
      content = `
      <div class="areaV3all">
      <div class="areaV3 areaV3four">
        <div class="areaV3-left"></div>
        <div class="areaV3-center">
          <p><i class="areaV3-center-icon iconfont icon-major_hazard"></i>${item.title}${'('}${'四级'}${')'}</p>
          <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
          <div class="areaV3-center-state">
            <p>${item.status_name}</p>
            <p>在线:2/3</p>
          </div>
        </div>
        <div class="areaV3-right"></div>
      </div></div>`;
    }
    if(item.subtype==300006){
      content = `<div class="areaV3all">
      <div class="areaV3 areaV3imptan">
        <div class="areaV3-left"></div>
        <div class="areaV3-center">
          <p><i class="areaV3-center-icon iconfont icon-chemical_process"></i>${item.title}</p>
          <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
          <div class="areaV3-center-state">
            <p>${item.status_name}</p>
            <p>在线:2/3</p>
          </div>
        </div>
        <div class="areaV3-right"></div>
      </div></div>`;
    }
    if(item.subtype==300007){
      content = `<div class="areaV3all">
      <div class="areaV3 areaV3imptan">
        <div class="areaV3-left"></div>
        <div class="areaV3-center">
          <p><i class="areaV3-center-icon iconfont icon-chemical"></i>${item.title}</p>
          <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
          <div class="areaV3-center-state">
            <p>${item.status_name}</p>
            <p>在线:2/3</p>
          </div>
        </div>
        <div class="areaV3-right"></div>
      </div></div>`;
    }

  }

  if(item.type === 'precaution'){//安防
    content = `<div class="areaV3all">
    <div class="areaV3 areaV3protect">
      <div class="areaV3-left"></div>
      <div class="areaV3-center">
        <p><i class="areaV3-center-icon iconfont icon-anfang_"></i>${item.title}</p>
        <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
        <div class="areaV3-center-state">
            <p>${item.status_name}</p>
            <p>在线:2/3</p>
          </div>
      </div>
      <div class="areaV3-right"></div>
    </div></div>`;
  }
  if(item.type === 'environment'){//环保
    content = `<div class="areaV3all">
    <div class="areaV3 areaV3envir">
      <div class="areaV3-left"></div>
      <div class="areaV3-center">
        <p><i class="areaV3-center-icon iconfont icon-environment_protaction"></i>${item.title}</p>
        <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
        <div class="areaV3-center-state">
            <p>${item.status_name}</p>
            <p>在线:2/3</p>
          </div>
      </div>
      <div class="areaV3-right"></div>
    </div></div>`;
  }
  if(item.type === 'enery'){//环保
    content = `<div class="areaV3all">
    <div class="areaV3 areaV3energy">
      <div class="areaV3-left"></div>
      <div class="areaV3-center">
        <p><i class="areaV3-center-icon iconfont icon-environment_protaction"></i>${item.title}</p>
        <p>${item.exData.type_name}${'-'}${item.exData.type_desc}</p>
        <div class="areaV3-center-state">
            <p>${item.status_name}</p>
            <p>在线:2/3</p>
          </div>
      </div>
      <div class="areaV3-right"></div>
    </div></div>`;
  }

  var marker = new AMap.Marker({
    position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: item.title,
    content:`<span class="iconNone"'></span>`,
    // offset: new AMap.Pixel(-220,-120)
  });


  marker.setLabel({
    offset: new AMap.Pixel(-36, -46), //设置文本标注偏移量
    content: content, //设置文本标注内容
    direction: "right" //设置文本标注方位
  });

  marker.exData = item.exData;
  let rankState = {
    20001:'one',
    20002:'two',
    20003:'three',
    20004:'four'
  };
  let typerank = rankState[item.rank];
  marker.on('click',function(e){
    // if(this.exData.type_name ==='智慧安监'){
    //   // console.log(typerank,"等级type");
    //   // Router.push({name:'Point',query:{pid:item.exData.point_id,type:typerank}});
    //   Router.push({name:'workPlace',query:{mid:item.functionId}});
    // }
    // if(this.exData.type_name ==='智慧环保'){
    //   // Router.push({name:'Point',query:{pid:item.exData.point_id}});
    //   Router.push({name:'workPlace',query:{mid:item.functionId}});
    // }
    if(item.type ==='factoryArea'){
      Store.commit('setModelConfig',{
        name:'homePageModel',
        rightView:'factoryDiffer',
        slider:'factoryDiffer',
        dialog:'factoryDiffer'
      });
      Store.commit('setRightQuery',{name:'factoryDiffer',id:item.functionId})
      //旧版
      return
      Router.push({name:'factoryDiffer',query:{functionId:item.functionId}});
    }
    if(item.type ==='enery'||item.type ==='precaution'||item.type ==='supervision'||item.type ==='environment'){
      //字段得重构 tool工具类重新整理

      Store.commit('setModelConfig',{
        name:'homePageModel',
        rightView:'factoryDevice',
        slider:'factoryDevice',
        dialog:'factoryDevice'
      });
      Store.commit('setRightQuery',{name:'factoryDevice',id:item.functionId})
      //旧版
      return
      Router.push({name:'workPlace',query:{mid:item.functionId}});
    }
  });
  //可以move
  // marker.on('mousemove',(e)=>{
  //   console.log('I am moveing-----')
  // });

  return marker
};

const setPrismColor  = function(item,c){
  item.needUpdate = true
  item.B.color = c || 'rgba(220,121,194,1)';
  item.reDraw();
}


const loadBuilds = function loadBuilds(pathsList, obj) {
  if (pathsList.length) {
    pathsList.forEach((item, index) => {
      let build = createBulis(item.path, {
        name: item.name,
        c: item.color,
        h: item.height
      });
      obj.add(build);
    });
  } else {
  }
};




//测试动画
var circle = new AMap.Circle({
  center: new AMap.LngLat(118.150762, 36.768623), // 圆心位置
  radius: 800, //半径
  strokeColor: "#F33", //线颜色
  strokeOpacity: 1, //线透明度
  strokeWeight: 3, //线粗细度
  fillColor: "#ee2200", //填充颜色
  fillOpacity: 0.35, //填充透明度
  zIndex: 1,
  offset: new AMap.Pixel(-142, -240)
});

let i = 10;
function scan() {
  i = i + 5;
  if (i == 1000) {
    i = 0;
  }

  circle.setOptions({
    center: new AMap.LngLat(118.146542, 36.773585), // 圆心位置
    radius: (2000-i), //半径
    strokeColor: "#F33", //线颜色
    strokeOpacity: 1, //线透明度
    strokeWeight: 3, //线粗细度
    fillColor: "#ee2200", //填充颜色
    fillOpacity: 0.35, //填充透明度
    zIndex: 1
  });
//  AMap.Util.requestAnimFrame(scan);
}
//circle.setMap(GisMap);



export {
  createdWall,
  createArea,
  createBulis,
  loadBuilds,
  createPoint,
  createLayer,
  createBase,
  setMarkerV3,
  setDeviceMark
};
