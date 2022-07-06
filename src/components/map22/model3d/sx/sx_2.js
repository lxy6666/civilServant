const baseURL = "https://m.ts-it.cn/third/icarus/static/sx/";

const SS_SCALE = 0.012;
const SS_POSTION = [116.141082,34.794205];
const SS_Z = 96.5;
const DC_BASE = {
  title: "DC_BASE",
  url: `${baseURL}dc/base/base.gltf`,
  options: {
    position: [116.144925,34.79636], // 必须
    scale: 0.0028, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 184
  }
};
const DC_BUILD = {
  title: "DC_BUILD",
  url: `${baseURL}dc/build/build.gltf`,
  options: {
    position: [116.144925,34.79636], // 必须
    scale: 0.0028, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 184
  }
};
const DC_ELECT = {
  title: "DC_ELECT",
  url: `${baseURL}dc/elect/elect.gltf`,
  options: {
    position: [116.144925,34.79636], // 必须
    scale: 0.0028, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 184
  }
};
const LJ_BASE = {
  title: "LJ_BASE",
  url: `${baseURL}laji/base/base.gltf`,
  options: {
    position: [116.142593,34.819608], // 必须
    scale: 0.005, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 10
  }
};
const LJ_BUILD = {
  title: "LJ_BUILD",
  url: `${baseURL}laji/build/build.gltf`,
  options: {
    position: [116.142593,34.819608], // 必须
    scale: 0.005, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 10
  }
};
const FB_BASE = {
  title: "FB_BASE",
  url: `${baseURL}fb/base/base.gltf`,
  options: {
    position: [116.142058,34.81669], // 必须
    scale: 0.002, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: -7
  }
};
const FB_BUILD = {
  title: "FB_BUILD",
  url: `${baseURL}fb/build/build.gltf`,
  options: {
    position: [116.142058,34.81669], // 必须
    scale: 0.002, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: -7
  }
};
const WSC_BASE = {
  title: "WSC_BASE",
  url: `${baseURL}wsc/base/base.gltf`,
  options: {
    position: [116.154938,34.816208], // 必须
    scale: 0.0029, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 12
  }
};
const WSC_BUILD = {
  title: "WSC_BUILD",
  url: `${baseURL}wsc/build/build.gltf`,
  options: {
    position: [116.154938,34.816208], // 必须
    scale: 0.0029, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 12
  }
};
const WSC_WATER = {
  title: "WSC_WATER",
  url: `${baseURL}wsc/water/water.gltf`,
  options: {
    position: [116.154938,34.816208], // 必须
    scale: 0.0029, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 12
  }
};
const RM_ABLG= {
  title: "RM_ABLG",
  url: `${baseURL}rm/ablg/Aglb.gltf`,
  options: {
    position: [116.139527,34.818394], // 必须
    scale: 0.57, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 14
  }
};
const RM_BGLB= {
  title: "RM_BGLB",
  url: `${baseURL}rm/bglb/Bglb.gltf`,
  options: {
    position: [116.139527,34.818394], // 必须
    scale: 0.57, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 14
  }
};
const SS_A = {
  title: "SS_A",
  url: `${baseURL}ss/shangshunA/shangshunA.gltf`,
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
const SS_B = {
  title: "SS_B",
  url: `${baseURL}ss/shangshunB/shangshunB.gltf`,
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
const SS_C = {
  title: "SS_C",
  url: `${baseURL}ss/shangshunC/shangshunC.gltf`,
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
const SS_D = {
  title: "SS_D",
  url: `${baseURL}ss/shangshunD/shangshunD.gltf`,
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
const SS_E = {
  title: "SS_E",
  url: `${baseURL}ss/shangshunE/shangshunE.gltf`,
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
const SS_F = {
  title: "SS_F",
  url: `${baseURL}ss/shangshunF/shangshunF.gltf`,
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
const SS_G = {
  title: "SS_G",
  url: `${baseURL}ss/shangshunG/shangshunG.gltf`,
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
const SS_H = {
  title: "SS_H",
  url: `${baseURL}ss/shangshunH/shangshunH.gltf`,
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
const SS_I = {
  title: "SS_I",
  url: `${baseURL}ss/shangshunI/shangshunI.gltf`,
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
const SS_J = {
  title: "SS_J",
  url: `${baseURL}ss/shangshunJ/shangshunJ.gltf`,
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
const SS_K = {
  title: "SS_K",
  url: `${baseURL}ss/shangshunK/shangshunK.gltf`,
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
const SS_L = {
  title: "SS_L",
  url: `${baseURL}ss/shangshunL/shangshunL.gltf`,
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
const dc = [
  DC_BASE,
  DC_BUILD,
  DC_ELECT
];
const rm = [
  RM_ABLG,
  RM_BGLB
]
const lj = [
  LJ_BASE,
  LJ_BUILD
]
const fb = [
  FB_BASE,
  FB_BUILD
]
const wsc = [
  WSC_BASE,
  WSC_BUILD,
  WSC_WATER,
]
const ss = [
  SS_A,
  SS_B,
  SS_C,
  SS_D,
  SS_E,
  SS_F,
  SS_G,
  SS_H,
  SS_I,
  SS_J,
  SS_K,
  SS_L,
]
const outList = [
  ...dc,
  ...rm,
  ...lj,
  ...fb,
  ...wsc,
  ...ss
];

export default {
  outList
}
