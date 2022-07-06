import dwk from './dwk.js';
import dwkBlue from './dwk_blue.js';

// const baseURL = "https://m.ts-it.cn/third/icarus/static/caoxian/";


const DWK = dwk.outList;
const DWK_BLUE = dwkBlue.outList;


let Models = [
    ...DWK,
    ...DWK_BLUE
];
let QXZS = [

    { name: "园区-4#空气监测站监测区", position: [117.075575, 36.045181] },
    { name: "园区-3#空气监测站监测区", position: [117.073073, 36.037106] },
    { name: "园区-2#空气监测站监测区", position: [117.077335, 36.032685] },
    { name: "园区-1#空气监测站监测区", position: [117.06362, 36.020351] },

]
let ROADS =[

    { name: "园区-1#道闸", "options": { position: [117.074829, 36.019933], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
    { name: "园区-2#道闸", "options": { position: [117.084626, 36.025914], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
    { name: "园区-3#道闸", "options": { position: [117.082418, 36.032466], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
    { name: "园区-4#道闸", "options": { position: [117.079829, 36.046098], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 100 } },
    { name: "园区-5#道闸", "options": { position: [117.076249, 36.047864], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 190 } },
    { name: "园区-6#道闸", "options": { position: [117.067806, 36.047526], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z":190 } },
    { name: "园区-7#道闸", "options": { position: [117.066547, 36.047428], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 100 } },
    { name: "园区-8#道闸", "options": { position: [117.053471, 36.035111], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 100 } },
    { name: "园区-9#道闸", "options": { position: [117.052679, 36.021441], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 90 } },
    { name: "园区-10#道闸", "options": { position: [117.070037, 36.019707], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 180 } },
    


    
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

Models.forEach((x) => {
    x.type = "build";
})

Models = [...Models, ...QXZS,...ROADS]


export default {
    Models: Models
};