import dmb1 from './dmb_1.js';
import dmbBlue from './dmb_blue.js';
import dmbGround from './dmb_ground.js';


// const baseURL = "https://m.ts-it.cn/third/icarus/static/dongming/";
const JCZ = [];

const DMB1 = dmb1.outList;
const DMB_BLUE = dmbBlue.outList;
const DMB_GROUND = dmbGround.outList;

let Models = [
  // ...DMB1, 
  ...DMB_BLUE,
  ...DMB_GROUND,
];

let QXZS  = [

  {name:"园区-6#空气监测区",position:[115.129126,35.34564]},
  {name:"园区-5#空气监测区",position:[115.14697,35.353752]},
  {name:"园区-4#空气监测区",position:[115.148193,35.360045]},
  {name:"园区-3#空气监测区",position:[115.124534,35.363154]},
  {name:"园区-2#空气监测区",position:[115.122498,35.355491]},
  {name:"园区-1#空气监测区",position:[115.120235,35.341757]},
  {name:"园区-9#空气监测区",position:[115.129921,35.332594]},
  {name:"园区-8#空气监测区",position:[115.155659,35.331143]},
  {name:"园区-7#空气监测区",position:[115.145496,35.346835]}
]

QXZS.forEach((x)=>{
  x.type = 'qxz';
  x.opt  = {
    scale: 0.03, // 非必须，默认1
    height:0, // 非必须，默认0
    rotateZ:0,
  };
})





let ROADS =
[
  {name:"园区-园区闸口区-2#道闸","options":{position:[115.144344,35.351568],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":96}},
  {name:"园区-园区闸口区-1#道闸","options":{position:[115.124134,35.351769],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":96}},
  {name:"园区-园区闸口区-3#道闸","options":{position:[115.122443,35.345547],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":96}},
  {name:"园区-园区闸口区-4#道闸","options":{position:[115.143933,35.345787],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":96}},
  {name:"园区-园区闸口区-5#道闸","options":{position:[115.14332,35.338264],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":96}},
]

ROADS.forEach((x)=>{
  x.type = 'road';
})



Models.forEach((x)=>{
  x.type = "build";
})

Models = [...Models, ...QXZS, ...ROADS];

const factorys = [
  {
    name:"东明前海化工有限公司",
    id:"790756681553416192",
    cameraPostion:[20,120,20],
    baseURL:'https://m.ts-it.cn/third/icarus/static/three_model/dongmingbei/qianhai/huagong/',
    models:[
      'Aglb.glb','B1glb.glb','B2glb.glb','Cglb.glb','Dglb.glb','E1glb.glb','E2glb.glb',
      'E3glb.glb','E4glb.glb','E5glb.glb','E6glb.glb','E7glb.glb','E8glb.glb',
    ]
    // models:[
    // 'qianhai0629.glb'
    // ]

  },
  {
    name:"菏泽天矗建材有限公司",
    id:"790756109282578432",
    cameraPostion:[20,120,20],
    baseURL:'https://m.ts-it.cn/third/icarus/static/three_model/dongmingbei/tianchu/',
    models:[
      'Aglb.glb','Bglb.glb'
    ]
  },
  {
    name:"东明石化",
    id:"778024933149249536",
    cameraPostion:[20,120,20],
    baseURL:'https://m.ts-it.cn/third/icarus/static/three_model/dongmingbei/shihua/',
    models:[
      'Aglb.glb','Bglb.glb'
    ]
  },
  {
    name:"山东晟原石化科技有限公司",
    id:"770497031746752512",
    cameraPostion:[20,120,20],
    baseURL:'https://m.ts-it.cn/third/icarus/static/three_model/dongmingbei/shengyuan/',
    models:[
      'Aglb.glb','B.glb','C.glb','D.glb'
    ]
  },
  {
    name:"山东东明梨树化学有限公司",
    id:"770496924448067584",
    cameraPostion:[20,120,20],
    baseURL:'https://m.ts-it.cn/third/icarus/static/three_model/dongmingbei/lishu/',
    models:[
      'A1glb.glb','B.glb','C.glb','D.glb'
    ]
  },
  {
    name:"山东润泽化工有限公司",
    id:"770496753064611840",
    cameraPostion:[20,120,20],
    baseURL:'https://m.ts-it.cn/third/icarus/static/three_model/dongmingbei/runze/',
    models:[
      'Aglb.glb',
      'fy/M_o.glb','fy/M_t.glb','fy/N.glb','fy/O.glb',
      'jz/B.glb','jz/C.glb','jz/D.glb','jz/E.glb',
      'sb/F.glb','sb/G.glb','sb/H.glb','sb/I.glb','sb/J.glb','sb/K.glb','sb/L.glb',
    ]
  }
 ]

export default {
  Models: Models,
  JCZ:JCZ,
  factorys:factorys
};
