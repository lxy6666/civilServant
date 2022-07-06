// const baseURL = "http://argus.web.ts-it.cn/third/icarus/static/models/";
const baseURL = "https://m.ts-it.cn/third/icarus/static/jcV1.2/";
//我叼尼玛 的强转了https我他妈还要放别的项目目录下

const JC_SCALE = 440;
const JC_POSTION = [115.558883, 35.554763];
const JC_Z = 0;
const JCHG_BASE = {
  title: "JCHG_BASE",
  url: `${baseURL}base/base.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

const JCHG_LVBUILD = {
  title: "JCHG_LVBUILD",
  url: `${baseURL}lvbuild/lvbuild.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

const JCHG_PIPE = {
  title: "JCHG_PIPE",
  url: `${baseURL}pipe/pipe.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

const JCHG_WATER = {
  title: "JCHG_WATER",
  url: `${baseURL}water/water.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

const JCHG_BUILD1 = {
  title: "JCHG_BUILD1",
  url: `${baseURL}build1/build1.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

const JCHG_BUILD2 = {
  title: "JCHG_BUILD2",
  url: `${baseURL}build2/build2.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

const JCHG_BUILD3 = {
  title: "JCHG_BUILD3",
  url: `${baseURL}build3/build3.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

const JCHG_BLOCK = {
  title: "JCHG_BLOCK",
  url: `${baseURL}mesh/mesh.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  optConfig: [0.26, 0.6, 1, 0.8],
  transform: {
    x: 90,
    z: JC_Z
  }
};
const JCHG_GZ = {
  title: "JCHG_GZ",
  url: `${baseURL}gz/gz.gltf`,
  options: {
    position: JC_POSTION, // 必须
    scale: JC_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: JC_Z
  }
};

// const Models = [JCHG_BASE]
let Models = [
  JCHG_BASE,
  JCHG_LVBUILD,
  JCHG_BLOCK,
  JCHG_WATER,
  JCHG_PIPE,
  JCHG_BUILD1,
  JCHG_BUILD2,
  JCHG_BUILD3,
  JCHG_GZ
];


Models.forEach((x)=>{
  x.type = "build";
})

export default {
  Models: Models
};
