import cx from './cx.js';
const baseURL = "https://m.ts-it.cn/third/icarus/static/caoxian/";


const CX = cx.outList;

let Models = [
  ...CX,
];
let QXZS = [

  { name: "园区-6#空气监测区", position: [115.566051, 34.954272] },
  { name: "园区-5#空气监测区", position: [115.559333,34.954498] },
  { name: "园区-4#空气监测区", position: [115.550476, 34.954368] },
  { name: "园区-3#空气监测区", position: [115.554521,34.95855] },
  { name: "园区-2#空气监测区", position: [115.553802, 34.962826] },
  { name: "园区-1#空气监测区", position: [115.541832, 34.954668] },
  { name: "园区-9#空气监测区", position: [115.536485, 34.944644] },
  { name: "园区-8#空气监测区", position: [115.570343,34.941436] },
  { name: "园区-7#空气监测区", position: [115.572452, 34.954396] },
  { name: "园区-10#空气监测区", position: [115.551136,34.948119] },

]

QXZS.forEach((x) => {
  x.type = 'qxz';
  x.opt = {
    scale: 0.05, // 非必须，默认1
    height: 0, // 非必须，默认0
    rotateZ: 0,
  };
})

let ROADS =
  [
    { name: "园区-园区闸口区-2#道闸", "options": { position: [115.558248, 34.963506], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 180 } },
    { name: "园区-园区闸口区-1#道闸", "options": { position: [115.53797, 34.951583], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 90 } },
    { name: "园区-园区闸口区-3#道闸", "options": { position: [115.56115, 34.944806], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 180 } },
    { name: "园区-园区闸口区-4#道闸", "options": { position: [115.571987,34.954542], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 90 } },
    { name: "园区-园区闸口区-5#道闸", "options": { position: [115.566471, 34.958975], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 90 } },
    { name: "园区-园区闸口区-6#道闸", "options": { position: [115.548151, 34.948151], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 90 } },
    { name: "园区-园区闸口区-7#道闸", "options": { position: [115.547901, 34.94889], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 180 } },


  ]

ROADS.forEach((x) => {
  x.type = 'road';
})

Models.forEach((x) => {
  x.type = "build";
})
Models = [...Models, ...QXZS, ...ROADS]


export default {
  Models: Models
};