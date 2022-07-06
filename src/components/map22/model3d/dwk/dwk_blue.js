const baseURL = "https://m.ts-it.cn/third/icarus/static/blue_model/";

const DaWenKou_POSTION = [117.053202, 36.015929 ];
const DaWenKou_SCALE = 0.393;
const DaWenKou_Z = 0;

const blueModel_A = {
    title: "blueModel_A",
    url: `${baseURL}/dawenkou/blue_A/blue_A.gltf`,
    options: {
        position: DaWenKou_POSTION, // 必须
        scale: DaWenKou_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DaWenKou_Z
    }
};
const blueModel_B = {
    title: "blueModel_B",
    url: `${baseURL}/dawenkou/blue_B/blue_B.gltf`,
    options: {
        position: DaWenKou_POSTION, // 必须
        scale: DaWenKou_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DaWenKou_Z
    }
};
const outList = [
    blueModel_A,
    blueModel_B
];
export default {
    outList
}