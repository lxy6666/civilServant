const baseURL = "https://m.ts-it.cn/third/icarus/static/dawenkou";

const DaWenKou_POSTION = [117.053202,36.015929 ];
const DaWenKou_SCALE = 0.393;
const DaWenKou_Z = 0;

const Point = {
    title: "Point",
    url: `${baseURL}/point/point.gltf`,
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
const HanWei_dm = {
    title: "HanWei_dm",
    url: `${baseURL}/hanwei/hw_dm/hw_dm.gltf`,
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
const HanWei_jz = {
    title: "HanWei_jz",
    url: `${baseURL}/hanwei/hw_jz/hw_jz.gltf`,
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
const HanWei_sbo = {
    title: "HanWei_sbo",
    url: `${baseURL}/hanwei/hw_sb/sb_o/hw_sb.gltf`,
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
const HanWei_sbt = {
    title: "HanWei_sbt",
    url: `${baseURL}/hanwei/hw_sb/sb_t/hw_sb.gltf`,
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
const HanWei_fyo = {
    title: "HanWei_fyo",
    url: `${baseURL}/hanwei/hw_fy/fy_o/hw_fy.gltf`,
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
const HanWei_fyt = {
    title: "HanWei_fyt",
    url: `${baseURL}/hanwei/hw_fy/fy_t/hw_fy.gltf`,
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
const HanWei_fyth = {
    title: "HanWei_fyth",
    url: `${baseURL}/hanwei/hw_fy/fy_th/hw_fy.gltf`,
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
const HanWei_fyf = {
    title: "HanWei_fyf",
    url: `${baseURL}/hanwei/hw_fy/fy_f/hw_fy.gltf`,
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
    // Point,
    HanWei_dm,
    HanWei_jz,
    HanWei_sbo,
    HanWei_sbt,
    HanWei_fyo,
    HanWei_fyt,
    HanWei_fyth,
    HanWei_fyf
];
export default {
    outList
}