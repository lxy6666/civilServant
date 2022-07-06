const baseURL = "https://m.ts-it.cn/third/icarus/static/sx/";

const YR_SCALE = 0.016;
const YR_POSTION = [116.144309,34.83205];
const YR_Z = 13;
//10往上
const YUANRUN_A = {
  title: "YUANRUN_A",
  url: `${baseURL}yuanrun/runyuanA/runyuanA.gltf`,
  options: {
    position: YR_POSTION, // 必须
    scale: YR_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YR_Z
  }
};
const YUANRUN_B = {
  title: "YUANRUN_B",
  url: `${baseURL}yuanrun/runyuanB/runyuanB.gltf`,
  options: {
    position: YR_POSTION, // 必须
    scale: YR_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YR_Z
  }
};


const LY_SCALE = 0.0006;
const LY_POSTION = [116.138835,34.816965];
const LY_Z = -75;
const LONGYU_A = {
  title: "LONGYU_A",
  url: `${baseURL}longyu/longyuA/longyuA.gltf`,
  options: {
    position: LY_POSTION, // 必须
    scale: LY_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: LY_Z
  }
};
const LONGYU_B = {
  title: "LONGYU_B",
  url: `${baseURL}longyu/longyuB/longyuB.gltf`,
  options: {
    position: LY_POSTION, // 必须
    scale: LY_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: LY_Z
  }
};
const LONGYU_C = {
  title: "LONGYU_C",
  url: `${baseURL}longyu/longyuC/longyuC.gltf`,
  options: {
    position: LY_POSTION, // 必须
    scale: LY_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: LY_Z
  }
};
const XXW_SCALE = 0.027;
const XXW_POSTION = [116.137933 ,34.81422 ];
const XXW_Z = -75;
const XinXiWang_A = {
  title: "XinXiWang_A",
  url: `${baseURL}xinxiwang/jz/jz.gltf`,
  options: {
    position: XXW_POSTION, // 必须
    scale: XXW_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XXW_Z
  }
};
const GS_SCALE = 0.016;
const GS_POSTION = [116.140093,34.804923];
const GS_Z = -42;
const GUANGSHUN_A = {
  title: "GUANGSHUN_A",
  url: `${baseURL}guangshun/base/base.gltf`,
  options: {
    position: GS_POSTION, // 必须
    scale: GS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: GS_Z
  }
};
const GUANGSHUN_B = {
  title: "GUANGSHUN_B",
  url: `${baseURL}guangshun/buildone/buildone.gltf`,
  options: {
    position: GS_POSTION, // 必须
    scale: GS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: GS_Z
  }
};
const GUANGSHUN_C = {
  title: "GUANGSHUN_C",
  url: `${baseURL}guangshun/buildtwo/buildtwo.gltf`,
  options: {
    position: GS_POSTION, // 必须
    scale: GS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: GS_Z
  }
};
const GUANGSHUN_D = {
  title: "GUANGSHUN_D",
  url: `${baseURL}guangshun/buildthree/buildthree.gltf`,
  options: {
    position: GS_POSTION, // 必须
    scale: GS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: GS_Z
  }
};

const PARK_SCALE = 0.0065;
const PARK_POSTION = [116.140637 ,34.82332];
const PARK_Z = -75;
const PARK_A = {
  title: "PARK_A",
  url: `${baseURL}park/base/base.gltf`,
  options: {
    position: PARK_POSTION, // 必须
    scale: PARK_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: PARK_Z
  }
};
const PARK_B = {
  title: "PARK_B",
  url: `${baseURL}park/build/build.gltf`,
  options: {
    position: PARK_POSTION, // 必须
    scale: PARK_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: PARK_Z
  }
};

const NF_SCALE = 0.0028;
const NF_POSTION = [116.139089 ,34.817139];
const NF_Z = 15;
const NINGF_A = {
  title: "NINGF_A",
  url: `${baseURL}ningfeng/base/base.gltf`,
  options: {
    position: NF_POSTION, // 必须
    scale: NF_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NF_Z
  }
};
const NINGF_B = {
  title: "NINGF_B",
  url: `${baseURL}ningfeng/build/build.gltf`,
  options: {
    position: NF_POSTION, // 必须
    scale: NF_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NF_Z
  }
};

const YS_SCALE = 0.14;
const YS_POSTION = [116.141563 ,34.811851];
const YS_Z = -75;
const YONGS_A = {
  title: "YONGS_A",
  url: `${baseURL}yongshun/base/base.gltf`,
  options: {
    position: YS_POSTION, // 必须
    scale: YS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YS_Z
  }
};
const YONGS_B = {
  title: "YONGS_B",
  url: `${baseURL}yongshun/buildone/buildone.gltf`,
  options: {
    position: YS_POSTION, // 必须
    scale: YS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YS_Z
  }
};
const YONGS_C = {
  title: "YONGS_C",
  url: `${baseURL}yongshun/buildtwo/buildtwo.gltf`,
  options: {
    position: YS_POSTION, // 必须
    scale: YS_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YS_Z
  }
};


const yuanrun = [
  YUANRUN_A,
  YUANRUN_B,
  LONGYU_A,
  LONGYU_B,
  LONGYU_C,
  XinXiWang_A,
  GUANGSHUN_A,
  GUANGSHUN_B,
  GUANGSHUN_C,
  GUANGSHUN_D,
  PARK_A,
  PARK_B,
  NINGF_A,
  NINGF_B,
  YONGS_A,
  YONGS_B,
  YONGS_C,
];

const outList = [
  ...yuanrun
];

export default {
  outList
}
