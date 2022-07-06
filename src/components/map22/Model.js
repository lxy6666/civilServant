import store from "../../store.js";
import jc from "./model3d/jc/Index.js";
import sx from "./model3d/sx/Index.js";
import dmn from "./model3d/dm/Index.js";
import dmb from "./model3d/dmb/Index.js";
import zd from "./model3d/zd/Index.js";
import jy from "./model3d/jy/Index.js";
import cx from "./model3d/cx/Index.js";
import dwk from "./model3d/dwk/Index.js"
import yy from "./model3d/yy/Index.js"

const baseURL = "https://m.ts-it.cn/third/icarus/static/";


//const baseURL = '/static/'

const gz_size = 0.22;
const gz_trans = 1;
//停车场
const TCC_Postion = new AMap.LngLat(118.159162, 36.778059);
const tcc_scale = 0.28;
//10往shang
const tcc_model_z = 0.8;
const TCC_BASE = {
  title: "TCC_BASE",
  url: `${baseURL}tcc/base/base.gltf`,
  options: {
    position: TCC_Postion, // 必须
    scale: tcc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: tcc_model_z
  }
};
//118.158745, 36.777711
function list_CAR(list,num) {
  let newList = [];
  list.forEach((item, index) => {
    let obj = {
      title: `TCC_CAR${index}`,
      url: `${baseURL}tcc/car/car.gltf`,
      options: {
        position: new AMap.LngLat(item[0], item[1]), // 必须
        scale: tcc_scale, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
      },
      transform: {
        x: 90,
        z: num
      }
    };
    newList.push(obj);
  });

  return newList;
}
let CAR_LIST = [
  [118.158744, 36.777708],
  [118.158749, 36.777769],
  [118.158742, 36.777826],
  [118.158745, 36.777886],
  [118.158749, 36.777942],
  [118.15875, 36.778003],
  [118.158748, 36.778058],
  [118.158749, 36.778111],
  [118.15875, 36.778171],
  [118.158753, 36.778231],
  [118.158754, 36.778284],
  [118.158756, 36.778347],
  [118.158759, 36.778403],
  [118.158759, 36.778464]
];

let CAR_LIST2 = [
  [118.159697, 36.777682],
  [118.159691, 36.777741],
  [118.159684, 36.777799],
  [118.159681, 36.777856],
  [118.159672, 36.77791],
  [118.159663, 36.777969]
];

CAR_LIST  = list_CAR(CAR_LIST,-5);
CAR_LIST2 = list_CAR(CAR_LIST2,180);

const TCC_M = {
  title: "TCC_M",
  url: `${baseURL}tcc/model/model.gltf`,
  options: {
    position: TCC_Postion, // 必须
    scale: tcc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: tcc_model_z
  }
};
const TCC_TREE = {
  title: "TCC_TREE",
  url: `${baseURL}tcc/tree/tree.gltf`,
  options: {
    position: TCC_Postion, // 必须
    scale: tcc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: tcc_model_z
  }
};

//消防站 118.144022, 36.767728
const XFZ_Postion = new AMap.LngLat(118.144022, 36.767795);
const xfz_scale = 0.23;
//10往左偏
const xfz_model_z = 3;
const XFZ_BASE = {
  title: "XFZ_BASE",
  url: `${baseURL}xfz/base/base.gltf`,
  options: {
    position: XFZ_Postion, // 必须
    scale: xfz_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xfz_model_z
  }
};
const XFZ_TREE = {
  title: "XFZ_TREE",
  url: `${baseURL}xfz/tree/tree.gltf`,
  options: {
    position: XFZ_Postion, // 必须
    scale: xfz_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xfz_model_z
  }
};

const FDC_Postion = new AMap.LngLat(118.148562, 36.769991);
const fdc_scale = 0.23;
//10往左偏
const fdc_model_z = 1;
const FDC_BASE = {
  title: "FDC_BASE",
  url: `${baseURL}fdc/base/fdc.gltf`,
  options: {
    position: FDC_Postion, // 必须
    scale: fdc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: fdc_model_z
  }
};

//118.157223, 36.772267  118.156834, 36.772118
const XH_Postion = new AMap.LngLat(118.157023, 36.772267);
const xh_scale = 0.0062;
//10往左偏
const xh_model_z = 1;
const XH_BASE = {
  title: "XH_BASE",
  url: `${baseURL}xh/base/base.gltf`,
  options: {
    position: XH_Postion, // 必须
    scale: xh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xh_model_z
  }
};
const XH_BUILD1 = {
  title: "XH_BUILD1",
  url: `${baseURL}xh/build1/build1.gltf`,
  options: {
    position: XH_Postion, // 必须
    scale: xh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xh_model_z
  }
};
const XH_BUILD2 = {
  title: "XH_BUILD2",
  url: `${baseURL}xh/build2/build2.gltf`,
  options: {
    position: XH_Postion, // 必须
    scale: xh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xh_model_z
  }
};
const XH_DOOR1 = {
  title: "XH_DOOR1",
  url: `${baseURL}xh/door1/door1.gltf`,
  options: {
    position: XH_Postion, // 必须
    scale: xh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xh_model_z
  }
};
const XH_DOOR2 = {
  title: "XH_DOOR2",
  url: `${baseURL}xh/door2/door2.gltf`,
  options: {
    position: XH_Postion, // 必须
    scale: xh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xh_model_z
  }
};
//118.162561, 36.773732 上调 118.162647, 36.773721  118.162593
const XS_Postion = new AMap.LngLat(118.162671, 36.773901);
const xs_scale = 5;
const xs_model_z = 0;
const XS_BASE = {
  title: "XS_BASE",
  url: `${baseURL}xshg/base/base.gltf`,
  options: {
    position: XS_Postion, // 必须
    scale: xs_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xs_model_z
  }
};
const XS_BUILD = {
  title: "XS_BASE",
  url: `${baseURL}xshg/build/build.gltf`,
  options: {
    position: XS_Postion, // 必须
    scale: xs_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: xs_model_z
  }
};
const GWH_BASE = {
  title: "GWH_BASE",
  url: `${baseURL}gwh/base/gwh.gltf`,
  options: {
    //118.147498, 36.767578
    //118.149905, 36.767718
    position: new AMap.LngLat(118.150321, 36.766944), // 必须
    scale: 0.2, // 非必须，默认1
    height: -100, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  //-14左偏
  transform: {
    x: 90,
    z: -21
  }
};

//118.147498, 36.767561   118.147535, 36.767451
const YF_Postion = new AMap.LngLat(118.147498, 36.767465);
const yf_scale = 15;
const yf_model_z = 172;
const YF_BASE = {
  title: "YF_BASE",
  url: `${baseURL}yf/base/base.gltf`,
  options: {
    position: YF_Postion, // 必须
    scale: yf_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE1 = {
  title: "YF_TREE",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147143, 36.767993), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE2 = {
  title: "YF_TREE2",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147305, 36.768013), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE3 = {
  title: "YF_TREE3",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147354, 36.768018), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE4 = {
  title: "YF_TREE4",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147414, 36.768026), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE5 = {
  title: "YF_TREE5",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147465, 36.768034), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE6 = {
  title: "YF_TREE6",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147521, 36.768038), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE7 = {
  title: "YF_TREE7",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147581, 36.768046), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE8 = {
  title: "YF_TREE8",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.147645, 36.768051), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};
const YF_TREE9 = {
  title: "YF_TREE9",
  url: `${baseURL}yf/tree/tree.gltf`,
  options: {
    position: new AMap.LngLat(118.14784, 36.768084), // 必须
    scale: 20, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: yf_model_z
  }
};

//118.161387, 36.774753   118.161451, 36.774579
const JG_Postion = new AMap.LngLat(118.161451, 36.774753);
const jg_scale = 6.7;
const jg_model_z = 177;
const JG_BASE = {
  title: "JG_BASE",
  url: `${baseURL}jg/base/base.gltf`,
  options: {
    position: JG_Postion, // 必须
    scale: jg_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: jg_model_z
  }
};
const QL_Postion = new AMap.LngLat(118.163902, 36.776088);
const ql_scale = 1.5;
const ql_model_z = 174;
const QL_BASE = {
  title: "QL_BASE",
  url: `${baseURL}ql/base/base.gltf`,
  options: {
    position: QL_Postion, // 必须
    scale: ql_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ql_model_z
  }
};
const QL_BUILD = {
  title: "QL_BUILD",
  url: `${baseURL}ql/build/build.gltf`,
  options: {
    position: QL_Postion, // 必须
    scale: ql_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ql_model_z
  }
};
const QL_RT = {
  title: "QL_RT",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165055, 36.777599), // 必须
    scale: 0.15, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC1 = {
  title: "QL_RC1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.164858, 36.777295), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC2 = {
  title: "QL_RC2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165035, 36.777304), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC3 = {
  title: "QL_RC3",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165228, 36.777324), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC4 = {
  title: "QL_RC4",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165438, 36.777342), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC5 = {
  title: "QL_RC5",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.164856, 36.777131), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC6 = {
  title: "QL_RC6",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165051, 36.777149), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC7 = {
  title: "QL_RC7",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165251, 36.77717), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RC8 = {
  title: "QL_RC1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165469, 36.777188), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB1 = {
  title: "QL_RB1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.164939, 36.77691), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB2 = {
  title: "QL_RB2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.16513, 36.776921), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB3 = {
  title: "QL_RB3",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165341, 36.776948), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB4 = {
  title: "QL_RB4",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165501, 36.776962), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB5 = {
  title: "QL_RB5",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.164937, 36.776725), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB6 = {
  title: "QL_RB6",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165137, 36.776748), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB7 = {
  title: "QL_RB7",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165348, 36.776763), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_RB8 = {
  title: "QL_RB8",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.165514, 36.776787), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
//20 第一个页20
const QL_LT1 = {
  title: "QL_LT1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162266, 36.77644), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_LT2 = {
  title: "QL_LT2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162443, 36.776271), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
// const QL_BALL1 = {
//   title: "QL_BALL1",
//   url: `${baseURL}lh/ball/ball.gltf`,
//   options: {
//     position: new AMap.LngLat(118.162516, 36.775985), // 必须
//     scale: 40, // 非必须，默认1
//     height: 0, // 非必须，默认0
//     scene: 0 // 非必须，默认0
//   },
//   transform: {
//     x: 90,
//     z: gz_trans
//   }
// };
// const QL_BALL2 = {
//   title: "QL_BALL2",
//   url: `${baseURL}lh/ball/ball.gltf`,
//   options: {
//     position: new AMap.LngLat(118.162543, 36.775785), // 必须
//     scale: 40, // 非必须，默认1
//     height: 0, // 非必须，默认0
//     scene: 0 // 非必须，默认0
//   },
//   transform: {
//     x: 90,
//     z: gz_trans
//   }
// };

const QL_LC = {
  title: "QL_LC",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.16225, 36.775168), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const ql_gz_size = 0.15;
const QL_LB1 = {
  title: "QL_LB1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162215, 36.77445), // 必须
    scale: ql_gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_LB2 = {
  title: "QL_LB2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162362, 36.7744584), // 必须
    scale: ql_gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_LB3 = {
  title: "QL_LB3",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162535, 36.774473), // 必须
    scale: ql_gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_LB4 = {
  title: "QL_LB4",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162656, 36.774486), // 必须
    scale: ql_gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_LB5 = {
  title: "QL_LB5",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162809, 36.774502), // 必须
    scale: ql_gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const QL_LB6 = {
  title: "QL_LB6",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.162958, 36.774521), // 必须
    scale: ql_gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const LU_Postion = new AMap.LngLat(118.163881, 36.771988);
const lh_scale = 0.282;
const lh_model_z = -6;
const LH_BASE = {
  title: "LH_BASE",
  url: `${baseURL}lh/base/base.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};

const LH_BUILD1 = {
  title: "LH_BUILD1",
  url: `${baseURL}lh/build1/build1.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};

const LH_CIRCLE1 = {
  title: "LH_CIRCLE1",
  url: `${baseURL}lh/circle_gz1/circle_gz1.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const LH_CIRCLE2 = {
  title: "LH_CIRCLE2",
  url: `${baseURL}lh/circle_gz2/circle_gz2.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const LH_GAOGZ1 = {
  title: "LH_GAOGZ1",
  url: `${baseURL}lh/gao_gz1/gao_gz1.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const LH_GAOGZ2 = {
  title: "LH_GAOGZ2",
  url: `${baseURL}lh/gao_gz2/gao_gz2.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const LH_GAOGZ3 = {
  title: "LH_GAOGZ3",
  url: `${baseURL}lh/gao_gz3/gao_gz3.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const LH_GAOGZ4 = {
  title: "LH_GAOGZ4",
  url: `${baseURL}lh/gao_gz4/gao_gz4.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const LH_DOOR1 = {
  title: "LH_DOOR1",
  url: `${baseURL}lh/door1/door1.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const LH_DOOR2 = {
  title: "LH_DOOR2",
  url: `${baseURL}lh/door2/door2.gltf`,
  options: {
    position: LU_Postion, // 必须
    scale: lh_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lh_model_z
  }
};
const MJ_Postion = new AMap.LngLat(118.149001, 36.776394);
const mj_scale = 8.6;
const mj_model_z = -89;
const MJ_BASE = {
  title: "MJ_BASE",
  url: `${baseURL}mj/base/base.gltf`,
  options: {
    position: MJ_Postion, // 必须
    scale: mj_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_BUILDONE = {
  title: "MJ_BUILDONE",
  url: `${baseURL}mj/buildone/buildone.gltf`,
  options: {
    position: MJ_Postion, // 必须
    scale: mj_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_BUILDTWO = {
  title: "MJ_BUILDTWO",
  url: `${baseURL}mj/buildtwo/buildtwo.gltf`,
  options: {
    position: MJ_Postion, // 必须
    scale: mj_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_BUILDTHREE = {
  title: "MJ_BUILDTHREE",
  url: `${baseURL}mj/buildthree/buildthree.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: MJ_Postion, // 必须
    scale: mj_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_BUILDTHREEA_1 = {
  title: "MJ_BUILDTHREEA_1",
  url: `${baseURL}mj/buildthreea/buildthreea.gltf`,
  options: {
    position: new AMap.LngLat(118.150899, 36.777561), // 必须
    scale: 10, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_BUILDTHREEA_2 = {
  title: "MJ_BUILDTHREEA_2",
  url: `${baseURL}mj/buildthreea/buildthreea.gltf`,
  options: {
    position: new AMap.LngLat(118.150899, 36.777847), // 必须
    scale: 10, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_BUILDTHREEA_3 = {
  title: "MJ_BUILDTHREEA_3",
  url: `${baseURL}mj/buildthreea/buildthreea.gltf`,
  options: {
    position: new AMap.LngLat(118.150889, 36.778125), // 必须
    scale: 10, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_B2LGZ_1 = {
  title: "MJ_B2LGZ_1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149313, 36.775434), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2LGZ_2 = {
  title: "MJ_B2LGZ_2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149313, 36.775674), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2LGZ_3 = {
  title: "MJ_B2LGZ_3",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149592, 36.775422), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2LGZ_4 = {
  title: "MJ_B2LGZ_4",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149582, 36.775676), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2RBGZ_1 = {
  //左一
  title: "MJ_B2RBGZ_1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149854, 36.776568), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2RBGZ_2 = {
  title: "MJ_B2RBGZ_2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149852, 36.776737), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2RBGZ_3 = {
  title: "MJ_B2RBGZ_3",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.150055, 36.776588), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2RBGZ_4 = {
  title: "MJ_B2RBGZ_4",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.150041, 36.776737), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2RBGZ_5 = {
  title: "MJ_B2RBGZ_5",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.150069, 36.776453), // 必须
    scale: 0.1, // 非必须，默认1
    height: 10, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2RTGZ_1 = {
  title: "MJ_B2RTGZ_1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149378, 36.776328), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B2RTGZ_2 = {
  title: "MJ_B2RTGZ_2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.149509, 36.776666), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B1GZ_1 = {
  title: "MJ_B1GZ_1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.147868, 36.774351),
    scale: 0.1,
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B1GZ_2 = {
  title: "MJ_B1GZ_2",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.147868, 36.774402), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B1GZ_3 = {
  title: "MJ_B1GZ_3",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.147868, 36.774461), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B1GZ_4 = {
  title: "MJ_B1GZ_4",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.147868, 36.774524), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const MJ_B1GZ_5 = {
  title: "MJ_B1GZ_5",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.147868, 36.77458), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};

const MJ_BUILDTHREEB = {
  title: "MJ_BUILDTHREEB",
  url: `${baseURL}mj/buildthreeb/buildthreeb.gltf`,
  options: {
    position: MJ_Postion, // 必须
    scale: mj_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const MJ_BUILDTHREEC = {
  title: "MJ_BUILDTHREEC",
  url: `${baseURL}mj/buildthreec/buildthreec.gltf`,
  options: {
    position: MJ_Postion, // 必须
    scale: mj_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: mj_model_z
  }
};
const OVER = {
  title: "BMAP",
  url: `${baseURL}dc/overview/over.gltf`,
  //  url: `${baseURL}test/jgg/jgg.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154184, 36.768444), // 必须
    scale: 34, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: -16.5
  }
};
const qxz_scale = 0.3;
const QXZ_LT = {
  title: "QXZ_BASE",
  url: `${baseURL}qxz/jcz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.151411, 36.768826), // 必须
    scale: qxz_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 1
  }
};
const QXZ_RT = {
  title: "QXZ_RT",
  url: `${baseURL}qxz/jcz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.156741, 36.769753), // 必须
    scale: qxz_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 1
  }
};
const QXZ_LB = {
  title: "QXZ_LB",
  url: `${baseURL}qxz/jcz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154276, 36.768248), // 必须
    scale: 1, // 非必须，默认1
    height: 200, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 1
  }
};
const QXZ_RB = {
  title: "QXZ_RB",
  url: `${baseURL}qxz/jcz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.156815, 36.767259), // 必须
    scale: qxz_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 1
  }
};
//118.151044, 36.768843  118.1512, 36.76887
//大成生物
const DC_Postion = new AMap.LngLat(118.151044, 36.768893);
const dc_scale = 10.1;
const dc_model_z = -16.5;




const DC_BLUE_BASE   = {
  title: "DC_BLUE_BASE",
  url: `${baseURL}blue_model/zd/dc/dc_sp.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154047,36.768213), // 必须
    scale: 0.0105, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
}

const DC_BLUE_BUILD   = {
  title: "DC_BLUE_BUILD",
  url: `${baseURL}blue_model/zd/dc/dc_build.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154047,36.768213), // 必须
    scale: 0.0105, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  optConfig: [0, 0.627, 1, 1],
  transform: {
    x: 90,
    z: dc_model_z
  }
}


const DC_BASE = {
  title: "DC_BASE",
  url: `${baseURL}dctest/base/ceshi3.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_BUILD = {
  title: "DC_BUILD",
  url: `${baseURL}dctest/build/build.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_BUILD1 = {
  title: "DC_BUILD1",
  url: `${baseURL}dcnew/build1/build1.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_BUILD2 = {
  title: "DC_BUILD2",
  url: `${baseURL}dcnew/build2/build2.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_BUILDT = {
  title: "DC_BUILDT",
  url: `${baseURL}dcnew/build5/build5.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_BUILDB = {
  title: "DC_BUILDB",
  url: `${baseURL}dcnew/build4/build4.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_BUILDC = {
  title: "DC_BUILDC",
  url: `${baseURL}dcnew/build3/build3.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_DOORL = {
  title: "DC_DOORL",
  url: `${baseURL}dcnew/door1/door1.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const DC_DOORR = {
  title: "DC_DOORR",
  url: `${baseURL}dcnew/door2/door2.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};

const DC_DOORT = {
  title: "DC_DOORT",
  url: `${baseURL}dcnew/door3/door3.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: DC_Postion, // 必须
    scale: dc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: dc_model_z
  }
};
const dc_gz = 0.1;
const gz_height = 40;
const DC_LGZ1 = {
  title: "DC_LGZ1",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.15237, 36.76731), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_LGZ2 = {
  title: "DC_LGZ2",
  url: `${baseURL}dcnew/blue_gz/blue_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.152496, 36.767332), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_LGZ3 = {
  title: "DC_LGZ3",
  url: `${baseURL}dcnew/blue_gz/blue_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.152621, 36.767364), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_LGZ4 = {
  title: "DC_LGZ4",
  url: `${baseURL}dcnew/blue_gz/blue_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.152756, 36.767395), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_LGZ5 = {
  title: "DC_LGZ5",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.15287, 36.767419), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_LGZ6 = {
  title: "DC_LGZ6",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.15299, 36.767446), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_RGZ1 = {
  title: "DC_RGZ1",
  url: `${baseURL}dcnew/blue_gz/blue_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154001, 36.767043), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_RGZ2 = {
  title: "DC_RGZ2",
  url: `${baseURL}dcnew/green_gz/green_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154116, 36.767039), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_RGZ3 = {
  title: "DC_RGZ3",
  url: `${baseURL}dcnew/green_gz/green_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154228, 36.767034), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_RGZ4 = {
  title: "DC_RGZ4",
  url: `${baseURL}dcnew/blue_gz/blue_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154338, 36.76703), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const DC_RGZ5 = {
  title: "DC_RGZ5",
  url: `${baseURL}dcnew/green_gz/green_gz.gltf`,
  options: {
    //118.154605,36.768269 118.154184,36.768444
    position: new AMap.LngLat(118.154284, 36.767107), // 必须
    scale: dc_gz, // 非必须，默认1
    height: gz_height, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
  }
};
const JCZ_BASE = {
  title: "JCZ_BASE",
  url: `${baseURL}jcz/jcz.gltf`,
  options: {
    position: new AMap.LngLat(118.15306, 36.765828), // 必须
    scale: 0.1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const LC_Postion = new AMap.LngLat(118.139876, 36.771079);
const lc_scale = 0.32;
const lc_model_z = -158.2;
const LC_BASE = {
  title: "LC_BASE",
  url: `${baseURL}lcnew/base/base.gltf`,
  options: {
    position: LC_Postion, // 必须
    scale: lc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lc_model_z
  }
};
const LC_BUILD1 = {
  title: "LC_BUILD1",
  url: `${baseURL}lcnew/build1/build1.gltf`,
  options: {
    position: new AMap.LngLat(118.139876, 36.771079), // 必须
    scale: lc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: -158.2
  }
};
const LC_BUILD2 = {
  title: "LC_BUILD2",
  url: `${baseURL}lcnew/build2/build2.gltf`,
  options: {
    position: LC_Postion, // 必须
    scale: lc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lc_model_z
  }
};
const LC_DOOR1 = {
  title: "LC_DOOR1",
  url: `${baseURL}lcnew/door1/door1.gltf`,
  options: {
    position: LC_Postion, // 必须
    scale: lc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lc_model_z
  }
};
const LC_DOOR2 = {
  title: "LC_DOOR2",
  url: `${baseURL}lcnew/door2/door2.gltf`,
  options: {
    position: LC_Postion, // 必须
    scale: lc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lc_model_z
  }
};
const LC_DOOR3 = {
  title: "LC_DOOR3",
  url: `${baseURL}lcnew/door3/door3.gltf`,
  options: {
    position: LC_Postion, // 必须
    scale: lc_scale, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: lc_model_z
  }
};


const OVERLC_GZ_1 = {
  title: "BMAP",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.139615, 36.772035), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const OVERLC_GZ_2 = {
  title: "BMAP",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.139553, 36.771816), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};
const OVERLC_GZ_3 = {
  title: "BMAP",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.139731, 36.771765), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};

const OVERLC_GZ_4 = {
  title: "BMAP",
  url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
  options: {
    position: new AMap.LngLat(118.139909, 36.771712), // 必须
    scale: gz_size, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
  }
};

const OVERLC_WALL = {
  title: "BMAP",
  url: `${baseURL}lc/wall/wall.gltf`,
  options: {
    position: new AMap.LngLat(118.139876, 36.771079), // 必须
    //  position: new AMap.LngLat(118.139861,36.770949), // 必须
    scale: 31, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: gz_trans
    //z:(-159.2)
  }
};

function list_GZ(list) {
  let newList = [];
  list.forEach((item, index) => {
    let obj = {
      title: `dcGZ_${index}`,
      url: `${baseURL}dcnew/white_gz/white_gz.gltf`,
      options: {
        position: new AMap.LngLat(item[0], item[1]), // 必须
        scale: 20, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
      },
      transform: {
        x: 90,
        z: 0.5
      }
    };
    newList.push(obj);
  });

  return newList;
}
let DC_LIST = [
  [118.15301, 36.767463],
  [118.152782, 36.767411],
  [118.152561, 36.76737],
  [118.15242, 36.767335],
  [118.152678, 36.767398],
  [118.152904, 36.767448]
];

let DC_LIST2 = [
  [118.153995, 36.767056],
  [118.154122, 36.767057],
  [118.154269, 36.767112],
  [118.154271, 36.767054]
];

DC_LIST = list_GZ(DC_LIST);
DC_LIST2 = list_GZ(DC_LIST2);


const GZ = {
  title: "GZ",
  url: `${baseURL}dc/gz2/gz2.gltf`,
  options: {
    position: new AMap.LngLat(118.152818, 36.767508), // 必须
    scale: 15, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0.5
  }
};

const TESTDEMO = {
  title: "TESTDEMO",
  url: `${baseURL}testdemo/a.gltf`,
  options: {
    position: new AMap.LngLat(118.139876, 36.771079), // 必须
    //  position: new AMap.LngLat(118.139861,36.770949), // 必须
    scale: 1, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: 0
    //z:(-159.2)
  }
};


const DC = [
  // DC_BASE,
  // DC_BUILD,
  DC_BLUE_BASE,
  DC_BLUE_BUILD,

  // DC_BLUE
  // DC_BUILD1,
  // DC_BUILD2,
  // DC_BUILDT,
  // DC_BUILDB,
  // DC_BUILDC,
  // DC_DOORT,
  // DC_DOORL,
  // DC_DOORR,
  // DC_LGZ1,
  // DC_LGZ2,
  // DC_LGZ3,
  // DC_LGZ4,
  // DC_LGZ5,
  // DC_LGZ6,
  // DC_RGZ1,
  // DC_RGZ2,
  // DC_RGZ3,
  // DC_RGZ4,
  // DC_RGZ5
];

const MJ = [
  MJ_BASE,
  MJ_BUILDONE,
  MJ_BUILDTWO,
  MJ_BUILDTHREE,
  MJ_BUILDTHREEA_1,
  MJ_BUILDTHREEA_2,
  MJ_BUILDTHREEA_3,
  MJ_B2LGZ_1,
  MJ_B2LGZ_2,
  MJ_B2LGZ_3,
  MJ_B2LGZ_4,
  MJ_B2RBGZ_1,
  MJ_B2RBGZ_2,
  MJ_B2RBGZ_3,
  MJ_B2RBGZ_4,
  MJ_B2RBGZ_5,
  MJ_B2RTGZ_1,
  MJ_B2RTGZ_2,
  MJ_B1GZ_1,
  MJ_B1GZ_2,
  MJ_B1GZ_3,
  MJ_B1GZ_4,
  MJ_B1GZ_5,
  MJ_BUILDTHREEB,
  MJ_BUILDTHREEC
];
const LH = [
  LH_BASE,
  LH_BUILD1,
  LH_GAOGZ1,
  LH_GAOGZ2,
  LH_GAOGZ3,
  LH_GAOGZ4,
  LH_CIRCLE1,
  LH_CIRCLE2,
  LH_DOOR1,
  LH_DOOR2
];
const QL = [ QL_BASE,
  QL_RT,
  QL_RC1,
  QL_RC2,
  QL_RC3,
  QL_RC4,
  QL_RC5,
  QL_RC6,
  QL_RC7,
  QL_RC8,
  QL_RB1,
  QL_RB2,
  QL_RB3,
  QL_RB4,
  QL_RB5,
  QL_RB6,
  QL_RB7,
  QL_RB8,
  QL_BUILD,
  QL_LT1,
  QL_LT2,
  QL_LC,
  QL_LB1,
  QL_LB2,
  QL_LB3,
  QL_LB4,
  QL_LB5,
  QL_LB6,
  // QL_BALL1,
  // QL_BALL2,
];
const YF = [
  YF_BASE,
  YF_TREE1,
  YF_TREE2,
  YF_TREE3,
  YF_TREE4,
  YF_TREE5,
  YF_TREE6,
  YF_TREE7,
  YF_TREE8,
  YF_TREE9
];
const XH = [
  XH_BASE,
  XH_BUILD1,
  XH_BUILD2,
  XH_DOOR1,
  XH_DOOR2
];


const ZD_DZLIST =[
  //每个道闸的 旋转角度不一样需要调整角度
  {
    name:'1#道闸',
    options: {
      position: new AMap.LngLat(118.141728,36.769349), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 28
    }
  },
  {
    name:'2#道闸',
    options: {
      position: new AMap.LngLat(118.134866,36.77999 ), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 0
    }
  },
  {
    name:'3#道闸',
    options: {
      position: new AMap.LngLat(118.166019, 36.778229), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 86
    }
  },
  {
    name:'4#道闸',
    options: {
      position: new AMap.LngLat(118.160009, 36.770565), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 0
    }
  }
];


const DMN_DZLIST =[
  //每个道闸的 旋转角度不一样需要调整角度
  {
    name:'东明南1#道闸',
    options: {
      position: new AMap.LngLat(115.134296, 35.24624), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 0
    }
  },
  {
    name:'2#道闸',
    options: {
      position: new AMap.LngLat(115.129877, 35.238823), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 86
    }
  },
  {
    name:'3#道闸',
    options: {
      position: new AMap.LngLat(115.121692, 35.239863), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 86
    }
  },
  {
    name:'4#道闸',
    options: {
      position: new AMap.LngLat(115.123638, 35.231126), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 86
    }
  },
  {
    name:'5#道闸',
    options: {
      position: new AMap.LngLat(115.140651, 35.230438), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 0
    }
  },
  {
    name:'6#道闸',
    options: {
      position: new AMap.LngLat(115.125406, 35.226204), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 86
    }
  },
  {
    name:'7#道闸',
    options: {
      position: new AMap.LngLat(115.132358, 35.221847), // 必须
      //  position: new AMap.LngLat(118.139861,36.770949), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0 // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 86
    }
  },
  {
    name: '8#道闸',
    options: {
      position: new AMap.LngLat(115.12228, 35.23244), // 必须
      scale: 0.1, // 非必须，默认1
      height: 0, // 非必须，默认0
      scene: 0, // 非必须，默认0
    },
    transform: {
      x: 90,
      z: 180
    }
  }
];

const ZD_XFSLIST =[

];
const Models = [
  LC_BASE,
  LC_BUILD1,
  LC_BUILD2,
  LC_DOOR1,
  LC_DOOR2,
  LC_DOOR3,
  OVERLC_GZ_1,
  OVERLC_GZ_2,
  OVERLC_GZ_3,
  OVERLC_GZ_4,
  // JCZ_BASE,
  ...DC,
  ...MJ,
  ...LH,
  ...QL,
  ...YF,
  JG_BASE,
  XS_BASE,
  XS_BUILD,
  ...XH,
  GWH_BASE,
  FDC_BASE,
  // QXZ_LT,
  // QXZ_LB,
  // QXZ_RT,
  // QXZ_RB,
  TCC_BASE,
  TCC_M,
  TCC_TREE,
  // ...CAR_LIST,
  // ...CAR_LIST2,
  XFZ_BASE,
  XFZ_TREE
];

let testDemo = [
  // LC_BASE,
  // LC_BUILD1,
  // LC_BUILD2,
  // LC_DOOR1,
  // LC_DOOR2,
  // LC_DOOR3,
  // OVERLC_GZ_1,
  // OVERLC_GZ_2,
  // OVERLC_GZ_3,
  // OVERLC_GZ_4,
  // DC_BASE,DC_BUILD1,DC_BUILD2,
  // QXZ_LB,
  ...DC,
  //  GWH_BASE,
  // // ...MJ,
  // ...LH,
  // ...XH,
  //
  // LH_BASE,
  // // XS_BASE
  // // LH_BUILD1
  // // ...QL,
  // ...YF,
  // TCC_BASE,
  // TCC_M,
  // TCC_TREE,
  // // ...CAR_LIST,
  // // ...CAR_LIST2
  // XFZ_BASE,
  // XFZ_TREE
]
const setBuilsAysnc = function setBuilsAysnc(GisMap, ModelLayer,Models) {
  let self = this;
  let list = Models|| self.Models;
  if (GisMap || window.GisMap) {
    GisMap.plugin(["AMap.GltfLoader"], function() {
      const Loader = new AMap.GltfLoader(); //加载器loader
      let len = list.length;
      list.forEach((item, index, arr) => {
        var modelUrl = item.url || `${baseURL}test/h.gltf`;
        // console.log(item,"item=====")
        var param = item.options || {
          position: new AMap.LngLat(118.152402, 36.767748), // 必须
          scale: 34, // 非必须，默认1
          height:200, // 非必须，默认0
          scene: 0 // 非必须，默认0
          //offset:(300,-900)
        };



        Loader.load(modelUrl, function(gltf) {
          gltf.setOption(param);
          gltf.rotateX(item.transform.x);
          gltf.rotateZ(item.transform.z);
          gltf.transparent = true;
          if (item.optConfig) {
            gltf.gltf.materials.forEach(x => {
              x.pbrMetallicRoughness.baseColorFactor = item.optConfig || [1,1,1,0.1];
            });
            ModelLayer.add(gltf);
            gltf.layerMesh.forEach(x => {
              x.transparent = true;
            });
          } else {
            ModelLayer.add(gltf);
          }
        });




      });
    });
  }
};

const setBuilsAwait = function setBuilsAwait(GisMap, ModelLayer, Models) {
  let self = this;
  let list = Models|| self.Models;
  if (GisMap || window.GisMap) {
    GisMap.plugin(["AMap.GltfLoader"], function() {
      const Loader = new AMap.GltfLoader(); //加载器loader
      let len = list.length;
      let index = 0;
      function setModul(index) {
        let item = list[index];
        var modelUrl = item.url || `${baseURL}test/h.gltf`;
        //var urlDuck = `${baseURL}base_map/0.gltf`;
        var param = item.options || {
          position: new AMap.LngLat(118.152402, 36.767748), // 必须
          scale: 34, // 非必须，默认1
          height: 0, // 非必须，默认0
          scene: 0 // 非必须，默认0
          //offset:(300,-900)
        };

        Loader.load(modelUrl, function(gltf) {
          gltf.setOption(param);
          gltf.rotateX(item.transform.x);
          gltf.rotateZ(item.transform.z);
          ModelLayer.add(gltf);
          index++;
          if (index === len) {
            console.log("单线程加载完毕");
            return;
          } else {
            setModul(index);
          }
        });
      }
      setModul(0); //run
    });
  }
};


// const loadGZ_W = function loadGZ_W(list,GisMap, ModelLayer){
//   GisMap.plugin(["AMap.GltfLoader"], function () {
//     const Loader = new AMap.GltfLoader(); //加载器loader
//     let modelUrl = `${baseURL}gz/wgz.gltf`;
//     Loader.load(modelUrl, function (gltf) {
//       list.forEach((x) => {
//         let obj = gltf;
//         //
//         list.forEach((x)=>{
//           var param = {
//             position: new AMap.LngLat(x.center[0], x.center[1]), // 必须
//             scale: x.scale, // 非必须，默认1
//             height: x.height, // 非必须，默认0
//           };
//           gltf.rotateX(90);
//           obj.setOption(param);
//           obj.transparent = true;
//           obj.fillOpacity = 0.2,
//           ModelLayer.add(obj);
//         })
//       })
//     });
//   });
// }
const loadDZ = function(GisMap, ModelLayer,DZlist){
  GisMap.add(ModelLayer)
  GisMap.plugin(["AMap.GltfLoader"], function() {
    const Loader = new AMap.GltfLoader(); //加载器loader
    let roadLeft =`${baseURL}public/road/road_left.gltf`;
    let roadRight =`${baseURL}public/road/road_right.gltf`;

    Loader.load(roadLeft, function(gltf) {
      let list = DZlist;
      list.forEach((x)=>{
        let opt = x.options;
        let obj = gltf;
        var param = {
          position: opt.position, // 必须
          scale: opt.scale, // 非必须，默认1
          height:opt.height, // 非必须，默认0
        };
        gltf.rotateX(x.transform.x);
        gltf.rotateZ(x.transform.z);

        obj.setOption(param);
        obj.transparent = true;

        obj.fillOpacity = 1;

        ModelLayer.add(obj);
      })
    });

    Loader.load(roadRight, function(gltf) {
      let list = DZlist;
      list.forEach((x)=>{
        let opt = x.options;
        let obj = gltf;
        var param = {
          position: opt.position, // 必须
          scale: opt.scale, // 非必须，默认1
          height:opt.height, // 非必须，默认0
        };
        gltf.rotateX(x.transform.x);
        gltf.rotateZ(x.transform.z);

        obj.setOption(param);
        obj.transparent = true;

        obj.fillOpacity = 0.2;
        ModelLayer.add(obj);
      })
    });
  });
};

const loadRoundModel = function(GisMap,ModelLayer,modelList,url){
  GisMap.add(ModelLayer)
  GisMap.plugin(["AMap.GltfLoader"], function() {
    const Loader = new AMap.GltfLoader(); //加载器loader
    let modelUrl =`${baseURL}${url}`;
    Loader.load(modelUrl, function(gltf) {
      let list = modelList;
      list.forEach((x)=>{
        let obj = gltf;
        let position = x.position;
        let opt  = {
          scale: 0.01, // 非必须，默认1
          height:0, // 非必须，默认0
          rotateZ:0,
        };
        if(x.opt){
          opt = x.opt ;
        };
        var param = {
          position: position, // 必须
          scale: opt.scale, // 非必须，默认1
          height:opt.height, // 非必须，默认0
        };
        gltf.rotateX(90);
        obj.setOption(param);

        ModelLayer.add(obj);
      })
    });
  });
}
const loadQXZ  = function loadQXZ(GisMap, ModelLayer){
  GisMap.add(ModelLayer);

  GisMap.plugin(["AMap.GltfLoader"], function() {
    const Loader = new AMap.GltfLoader(); //加载器loader
    // let modelUrl =`${baseURL}jcmodel/cjz/cjz.gltf`;
    let modelUrl =`${baseURL}public/qxz/qxz.gltf`;
    Loader.load(modelUrl, function(gltf) {

      // let list = [
      //   [118.148418,36.773841],[118.147465,36.775526],
      //   [118.150371,36.776135],[118.14956,36.777263],
      //   [118.1478,36.778216],[118.15119,36.779149]
      // ];

      let list = [
        [118.150531,36.768663],
        [118.126583,36.777961],
        [118.170142,36.772067],
        [118.122132,36.770339],
        [118.165688,36.778667],
        [118.131334,36.769262],
        [118.136836,36.780314],
        [118.159211,36.780752],
        [118.146705,36.774011],
        [118.153638,36.766212]
      ]
      list.forEach((x)=>{
        let obj = gltf;
        var param = {
          position: new AMap.LngLat(x[0], x[1]), // 必须
          scale: 0.03, // 非必须，默认1
          height:0, // 非必须，默认0
        };
        gltf.rotateX(90);
        obj.setOption(param);
        // obj.transparent = true;
        // obj.fillOpacity = 0.2,
        ModelLayer.add(obj);
      })
    });
  });

};

testDemo.forEach((x)=>{
  x.type ='build'
})

Models.forEach((x)=>{
  x.type = 'build'
})
//testDemo Models
export default {
  Models: Models,
  setBuilsAwait: setBuilsAwait,
  setBuilsAysnc: setBuilsAysnc,
  loadQXZ:loadQXZ,
  loadRoundModel:loadRoundModel,
  loadDZ:loadDZ,
  //临时用 ZD_DZLIST
  ZD_DZLIST:ZD_DZLIST,
  DMN_DZLIST:DMN_DZLIST,
  // loadGZ_W:loadGZ_W,
  JC: jc.Models,
  JC_FS:jc.factorys,
  // ZD: zd.Models,
  ZD: testDemo,
  SX: sx.Models,
  DMN: dmn.Models,
  DMB:dmb.Models,
  JY:jy.Models,
  CX:cx.Models,
  DWK:dwk.Models,
  YY:yy.Models,
  DMB_FS:dmb.factorys
};
