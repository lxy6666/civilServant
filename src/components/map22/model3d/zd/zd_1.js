const baseURL = "https://m.ts-it.cn/third/icarus/static/zhangdian/";


const JG_SCALE = 3.6;
const JG_POSTION = [118.161019, 36.774968];
const JG_Z = 2;
const JGA= {
  title: "JGA",
  url: `${baseURL}jg/agltf/a.gltf`,
  options: {
    position: JG_POSTION, // 必须
    scale: JG_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JG_Z
  }
};
const JGB = {
  title: "JGB",
  url: `${baseURL}jg/bgltf/b.gltf`,
  options: {
    position: JG_POSTION, // 必须
    scale: JG_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JG_Z
  }
};

const XS_SCALE = 3.6;
const XS_POSTION = [118.160245, 36.7741];
const XS_Z = -1;

const XS_dm = {
  title: "XS_dm",
  url: `${baseURL}xs/mxz/dm/dm.gltf`,
  options: {
    position: XS_POSTION, // 必须
    scale: XS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XS_Z
  }
};
const  XS_jz= {
  title: "XS_jz",
  url: `${baseURL}xs/mxz/jz/jz.gltf`,
  options: {
    position: XS_POSTION, // 必须
    scale: XS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XS_Z
  }
};
const XS_sb = {
  title: "XS_sb",
  url: `${baseURL}xs/mxz/sb/sb.gltf`,
  options: {
    position: XS_POSTION, // 必须
    scale: XS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XS_Z
  }
};
const XS_fybz = {
  title: " XS_fybz",
  url: `${baseURL}xs/mxz/fybz/gybz.gltf`,
  options: {
    position: XS_POSTION, // 必须
    scale: XS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XS_Z
  }
};







// const JGGZ_GROUP_1_Scale = 10;
// const JGGZ_GROUP_1_Height = 80;
// const JGGZ_GROUP_1 =[
//   {
//     center:[188,36],
//     name:'gz1',
//     scale: JGGZ_GROUP_1_Scale,
//     height: JGGZ_GROUP_1_Height,
//   },
//   {
//     center: [188, 36.1],
//     name: 'gz1',
//     scale: JGGZ_GROUP_1_Scale,
//     height: JGGZ_GROUP_1_Height,
//   },
//   {
//     center: [188, 36.2],
//     name: 'gz1',
//     scale: JGGZ_GROUP_1_Scale,
//     height: JGGZ_GROUP_1_Height,
//   }
// ]

// const JGGZ_GROUP_2_Scale = 5;
// const JGGZ_GROUP_2_Height = 40;
// const JGGZ_GROUP_2 = [
//   {
//     center: [188, 36],
//     name: 'gz1',
//     scale: JGGZ_GROUP_2_Scale,
//     height: JGGZ_GROUP_2_Height,
//   },
//   {
//     center: [188, 36.1],
//     name: 'gz1',
//     scale: JGGZ_GROUP_2_Scale,
//     height: JGGZ_GROUP_2_Height,
//   },
//   {
//     center: [188, 36.2],
//     name: 'gz1',
//     scale: JGGZ_GROUP_2_Scale,
//     height: JGGZ_GROUP_2_Height,
//   }
// ]


const outList = [
  JGA,
  JGB,
  XS_dm,
  XS_jz,
  XS_sb,
  XS_fybz,
];

export default {
  outList
}
