const baseURL = "https://m.ts-it.cn/third/icarus/static/sx/";

const SX_SCALE = 0.0028;
const LR_A = {
  title: "LR_A",
  url: `${baseURL}ls/Aglb/Aglb.gltf`,
  options: {
    position: [116.140776,34.805045], // 必须
    scale: SX_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: -87
  }
};

const LR_B = {
  title: "LR_B",
  url: `${baseURL}ls/Bglb/Bglb.gltf`,
  options: {
    position: [116.140776,34.805045], // 必须
    scale: SX_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: -87
  }
};



const RDC110P = [116.144902,34.831007];
const RDC110Z = 14;
const RDC110S = 0.0038;

const RDC_110_A = {
  title: "RDC_110",
  url: `${baseURL}rdc110/Aglb/Aglb.gltf`,
  options: {
    position: RDC110P, // 必须
    scale: RDC110S, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z:RDC110Z
  }
};

const RDC_110_B = {
  title: "RDC_110_B",
  url: `${baseURL}rdc110/Bglb/Bglb.gltf`,
  options: {
    position: RDC110P, // 必须
    scale: RDC110S, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RDC110Z
  }
};


const RDC_110_C = {
  title: "RDC_110_C",
  url: `${baseURL}rdc110/Cglb/Cglb.gltf`,
  options: {
    position: RDC110P, // 必须
    scale: RDC110S, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RDC110Z
  }
};


const SNHBP=[116.14229,34.813754];
const SNHBZ= 18;
const SNHBS=0.0052;

const SNHB_A = {
  title: "SNHB_A",
  url: `${baseURL}snhb/Aglb/Aglb.gltf`,
  options: {
    position: SNHBP, // 必须
    scale: SNHBS, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: SNHBZ
  }
};

const SNHB_B = {
  title: "SNHB_B",
  url: `${baseURL}snhb/Bglb/Bglb.gltf`,
  options: {
    position: SNHBP, // 必须
    scale: SNHBS, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: SNHBZ
  }
};



const XRP =[116.143953,34.806939];
const XRZ = 6;
const XRS =0.0032;



const XR_A = {
  title: "XR_A",
  url: `${baseURL}xr/Aglb/Aglb.gltf`,
  options: {
    position: XRP, // 必须
    scale: XRS, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XRZ
  }
};

const XR_B = {
  title: "XR_B",
  url: `${baseURL}xr/Bglb/Bglb.gltf`,
  options: {
    position: XRP, // 必须
    scale: XRS, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XRZ
  }
};




const ZJP = [116.142396,34.805919];
const ZJZ = -87;
const ZJS =0.0048;



const ZJ_A = {
  title: "ZJ_A",
  url: `${baseURL}zj/Aglb/Aglb.gltf`,
  options: {
    position: ZJP, // 必须
    scale: ZJS, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ZJZ
  }
};

const ZJ_B = {
  title: "ZJ_B",
  url: `${baseURL}zj/Bglb/Bglb.gltf`,
  options: {
    position: ZJP, // 必须
    scale: ZJS, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ZJZ
  }
};







const SX_M_3 = [
  LR_A,
  LR_B,
  RDC_110_A,
  RDC_110_B,
  RDC_110_C,
  SNHB_A,
  SNHB_B,
  XR_A,
  XR_B,
  ZJ_A,
  ZJ_B
];


const outList = [
  ...SX_M_3
];

export default {
  outList
}
