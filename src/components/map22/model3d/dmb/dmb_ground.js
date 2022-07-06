const baseURL = "https://m.ts-it.cn/third/icarus/static/dongmingbei/";

const DMBground_SCALE = 0.18;
const DMBground_POSTION = [115.127844, 35.351085];
const DMBground_Z = 0;
const Ground_dm = {
    title: "Ground_dm",
    url: `${baseURL}ground/jz/ground_jz.gltf`,
    options: {
        position: DMBground_POSTION, // 必须
        scale: DMBground_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0, // 非必须，默认0
    },
    optConfig: [0.26, 0.6, 1, 0.8],
    transform: {
        x: 90,
        z: DMBground_Z,
    },
};
const Ground_nt = {
    title: "Ground_nt",
    url: `${baseURL}ground/nongtian/ground_nt.gltf`,
    options: {
        position: DMBground_POSTION, // 必须
        scale: DMBground_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0, // 非必须，默认0
    },
    optConfig: [0.07, 0.4, 0.2, 0.72],
    transform: {
        x: 90,
        z: DMBground_Z,
    },
};
const outList = [
    Ground_dm,
    Ground_nt
];

export default {
    outList
}