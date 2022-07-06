import jy from './jy.js';
const baseURL = "https://m.ts-it.cn/third/icarus/static/juye/";


const JY = jy.outList;

let Models = [
  ...JY,
];
let QXZS = [
  { name: "巨野-南园区1#空气检测站（定制版）", position: [115.982317, 35.274885] },
  { name: "巨野-南园区2#空气检测站（定制版）", position: [115.975028, 35.312208] },
  { name: "巨野-南园区3#空气检测站（定制版）", position: [116.001181,35.347892] },
  { name: "巨野-南园区4#空气检测站（定制版）", position: [116.001525, 35.354464] },  
  { name: "巨野-南园区1#空气检测站", position: [115.965606, 35.2701435] },
  { name: "巨野-南园区2#空气检测站", position: [115.955301, 35.271125] },
  { name: "巨野-南园区3#空气检测站", position: [115.957697, 35.280637] },
  { name: "巨野-南园区4#空气检测站", position: [115.974927, 35.277299] },
  { name: "巨野-南园区5#空气检测站", position: [115.982618, 35.280267] },
  { name: "巨野-南园区6#空气检测站", position: [115.974927, 35.277299] },
  { name: "巨野-南园区7#空气检测站", position: [115.988821, 35.283332] },
  { name: "巨野-南园区8#空气检测站", position: [115.985321, 35.337663] },
  { name: "巨野-南园区9#空气检测站", position: [115.992721, 35.341794] },
  { name: "巨野-南园区10#空气检测站", position: [115.98429, 35.351052] },
  { name: "巨野-南园区11#空气检测站", position: [115.987074, 35.354039] },
  { name: "巨野-南园区12#空气检测站", position: [115.991534, 35.357095 ] },
  { name: "巨野-南园区13#空气检测站", position: [116.001525, 35.354464] },
  { name: "巨野-南园区14#空气检测站", position: [115.987987,35.303237 ] },
]
let ROADS = [

  { name: "巨野-北园区1#道闸", "options": { position: [116.002097, 35.354327], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
  { name: "巨野-北园区2#道闸", "options": { position: [115.982398, 35.354125], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 180 } },
  { name: "巨野-北园区3#道闸", "options": { position: [115.981544, 35.359628 ], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 180 } },
  { name: "巨野-南园区4#道闸", "options": { position: [115.979863, 35.310752], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 180 } },
  { name: "巨野-南园区5#道闸", "options": { position: [115.955746, 35.280886], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 100 } },
  { name: "巨野-南园区7#道闸", "options": { position: [115.974638, 35.270089], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 190 } },
  { name: "巨野-南园区6#道闸", "options": { position: [115.983255, 35.275002], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 120 } },
]
ROADS.forEach((x) => {
  x.type = 'road';
})
QXZS.forEach((x) => {
  x.type = 'qxz';
  x.opt = {
    scale: 0.03, // 非必须，默认1
    height: 0, // 非必须，默认0
    rotateZ: 0,
  };
})
Models.forEach((x)=>{
  x.type = "build";
})

Models = [...Models,...QXZS,...ROADS]

export default {
  Models: Models
};
