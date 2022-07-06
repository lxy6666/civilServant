import yy from './yy.js'

const YY = yy.outList;

let Models = [
    ...YY
]
let QXZS = [

    // { name: "园区-6#空气监测区", position: [115.129126, 35.34564] },
    // { name: "园区-5#空气监测区", position: [115.14697, 35.353752] },
    { name: "园区-4#空气监测区", position: [118.22989, 36.178366] },
    { name: "园区-3#空气监测区", position: [118.282472, 36.188118] },
    { name: "园区-2#空气监测区", position: [118.232582, 36.189738] },
    { name: "园区-1#空气监测区", position: [118.243577, 36.184293] },
    // { name: "园区-9#空气监测区", position: [115.129921, 35.332594] },
    // { name: "园区-8#空气监测区", position: [115.155659, 35.331143] },
    // { name: "园区-7#空气监测区", position: [115.145496, 35.346835] }
]

QXZS.forEach((x) => {
    x.type = 'qxz';
    x.opt = {
        scale: 0.03, // 非必须，默认1
        height: 0, // 非必须，默认0
        rotateZ: 0,
    };
})
let ROADS =
    [
        { name: "园区-园区闸口区-2#道闸", "options": { position: [118.229191, 36.188559], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 170 } },
        { name: "园区-园区闸口区-1#道闸", "options": { position: [118.218507, 36.175281], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
        { name: "园区-园区闸口区-3#道闸", "options": { position: [118.236963, 36.193855], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
        { name: "园区-园区闸口区-4#道闸", "options": { position: [118.246598, 36.195797], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
        { name: "园区-园区闸口区-5#道闸", "options": { position: [118.283099, 36.185179 ], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 96 } },
        { name: "园区-园区闸口区-6#道闸", "options": { position: [118.281005, 36.178813], "scale": 0.1, "height": 0, "scene": 0 }, "transform": { "x": 90, "z": 90 } },
    ]

ROADS.forEach((x) => {
    x.type = 'road';
})


Models.forEach((x) => {
    x.type = "build";
})

Models = [...Models,...ROADS,...QXZS];

export default {
    Models:Models,
}