import jc from './jc.js';
const baseURL = "https://m.ts-it.cn/third/icarus/static/dongming/";



const JC = jc.outList;


let Models = [
  ...JC
];

Models.forEach((x) => {
  x.type = "build";
})

const factorys = [
  {
    name: "山东林耀生物科技有限公司",//原一糠化工
    id: "796832378172608512",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/linyaoshengwu/',
    models:[
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb'  
    ]
  },
  {
    name: "山东祥顺生物科技有限公司",
    id: "796832221448245248",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/xiangshun/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb', 'Dglb.glb'
    ]
  },
  {
    name: "山东鄄城南港化工有限公司",
    id: "796832100501295104",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/nangang/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb', 'Dglb.glb'
    ]
  },
  {
    name: "鄄城天拓生物科技有限公司",
    id: "796831949460213760",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/tiantuoshengwu/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb', 'Dglb.glb'  
    ]
  },
  {
    name: "鄄城泰瑞化工有限公司",
    id: "796831713824215040",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/tairuihuagong/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb', 'Dglb.glb'
    ]
  },
  {
    name: "山东四新阻燃材料有限公司",
    id: "796831600372486144",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/sixinzuran/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb'
    ]
  },
  {
    name: "菏泽华意化工有限公司",
    id: "796833185290915840",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/huayi/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb', 'Dglb.glb'
    ]
  },
  {
    name: "鄄城鼎晟化工科技有限公司",
    id: "796833336176807936",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/dingsheng/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb', 'Dglb.glb'
    ]
  },
  {
    name: "菏泽市金沃泰化工有限公司",
    id: "796831840290869248",
    cameraPostion: [20, 120, 20],
    baseURL: 'https://m.ts-it.cn/third/icarus/static/three_model/juancheng/jinwotai/',
    models: [
      'Aglb.glb', 'Bglb.glb', 'Cglb.glb', 'Dglb.glb'
    ]
  },
]


export default {
  Models: Models,
  factorys:factorys
};
