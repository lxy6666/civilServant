const baseURL = "https://m.ts-it.cn/third/icarus/static/zhangdian/";

const SS_SCALE = 0.11;
const SS_POSTION = [118.144588, 36.772305];
const SS_Z = 96.5;
const DC_BASE = {
  title: "DC_BASE",
  url: `${baseURL}base/base.gltf`,
  options: {
    position: SS_POSTION, // 必须
    scale: SS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: SS_Z
  }
};

const outList = [
  DC_BASE,
];

export default {
  outList
}
