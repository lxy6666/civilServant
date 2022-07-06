import sx1 from './sx_1.js';
import sx2 from './sx_2.js';
import sx3 from './sx_3.js';
const baseURL = "https://m.ts-it.cn/third/icarus/static/sx/";


const SX1 = sx1.outList;
const SX2 = sx2.outList;
const SX3 = sx3.outList;

let Models = [
  ...SX1,
  ...SX2,
  ...SX3,
];


Models.forEach((x)=>{
  x.type = "build";
})




let QXZS  = [
  {name:"园区12#空气检测站",position:[116.138451,34.834662]},
  {name:"园区1#空气检测站",position:[116.14446,34.797176]},
  {name:"园区2#空气检测站",position:[116.136096,34.794518]},
  {name:"园区3#空气检测站",position:[116.137662,34.805053]},
  {name:"园区4#空气检测站",position:[116.142921,34.806674]},
  {name:"园区5#空气检测站",position:[116.138254,34.807971]},
  {name:"园区6#空气检测站",position:[116.132522,34.81355]},
  {name:"园区7#空气检测站",position:[116.139134,34.816955]},
  {name:"园区8#空气检测站",position:[116.159331,34.81113]},
  {name:"园区9#空气检测站",position:[116.141076,34.825997]},
  {name:"园区10#空气检测站",position:[116.151561,34.82438]},
  {name:"园区11#空气检测站",position:[116.162597,34.822228]}
];







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
  {name:"园区-三号道闸","options":{position:[116.133916,34.81757],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":100}},
  {name:"园区-二号道闸","options":{position:[116.132894,34.811824],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":100}},
  {name:"园区-五号道闸","options":{position:[116.143578,34.831923],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":12}},
  {name:"园区-四号道闸","options":{position:[116.136113,34.826923],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":100}},
  {name:"园区-六号道闸","options":{position:[116.158104,34.829144],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":12}},
  {name:"园区-一号道闸","options":{position:[116.14169,34.79507],"scale":0.1,"height":0,"scene":0},"transform":{"x":90,"z":6}},
]

  ROADS.forEach((x)=>{
    x.type = 'road';
  })

  Models = [...Models, ...QXZS,...ROADS];


  export default {
    Models: Models
  };
