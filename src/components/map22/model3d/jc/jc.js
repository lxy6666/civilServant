// const baseURL = "http://argus.web.ts-it.cn/third/icarus/static/models/";
const baseURL = "https://m.ts-it.cn/third/icarus/static/juancheng/";


const JC_SCALE = 0.095;
const JC_POSTION = [115.54442122578622,35.6021269304725];
const JC_Z = 0;
const JC_BASE = {
  title: "JC_BASE",
  url: `${baseURL}blue/JC_BASE/JC_BASE.gltf`,
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
const WeiFei_SCALE = 0.095;
const WeiFei_POSTION = [115.54442122578622, 35.6021269304725];
const WeiFei_Z = 0;
const WeiFei_dm = {
  title: "WeiFei_dm",
  url: `${baseURL}weifei/wf_dm/wf_dm.gltf`,
  options: {
    position: WeiFei_POSTION, // 必须
    scale: WeiFei_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: WeiFei_Z
  }
};
const WeiFei_jz = {
  title: "WeiFei_jz",
  url: `${baseURL}weifei/wf_jz/wf_jz.gltf`,
  options: {
    position: WeiFei_POSTION, // 必须
    scale: WeiFei_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: WeiFei_Z
  }
};
const DingTai_SCALE = 0.095;
const DingTai_POSTION = [115.55289566516876,35.60189375897577];
const DingTai_Z = 0;
const DingTai_dm = {
  title: "DingTai_dm",
  url: `${baseURL}dingtai/dt_dm/dt_dm.gltf`,
  options: {
    position: DingTai_POSTION, // 必须
    scale: DingTai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: DingTai_Z
  }
};
const DingTai_jz = {
  title: "DingTai_jz",
  url: `${baseURL}dingtai/dt_jz/dt_jz.gltf`,
  options: {
    position: DingTai_POSTION, // 必须
    scale: DingTai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: DingTai_Z
  }
};
const DingTai_sbo = {
  title: "DingTai_sbo",
  url: `${baseURL}dingtai/dt_sb/one/dt_sbo.gltf`,
  options: {
    position: DingTai_POSTION, // 必须
    scale: DingTai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: DingTai_Z
  }
};
const DingTai_sbt = {
  title: "DingTai_sbt",
  url: `${baseURL}dingtai/dt_sb/two/dt_sbt.gltf`,
  options: {
    position: DingTai_POSTION, // 必须
    scale: DingTai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: DingTai_Z
  }
};
const DingTai_fyo = {
  title: "DingTai_fyo",
  url: `${baseURL}dingtai/dt_fy/one/dt_fyo.gltf`,
  options: {
    position: DingTai_POSTION, // 必须
    scale: DingTai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: DingTai_Z
  }
};
const DingTai_fyt = {
  title: "DingTai_fyt",
  url: `${baseURL}dingtai/dt_fy/two/dt_fyt.gltf`,
  options: {
    position: DingTai_POSTION, // 必须
    scale: DingTai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: DingTai_Z
  }
};
const BaoLiLai_SCALE = 0.095;
const BaoLiLai_POSTION = [115.57031393051149,35.59327519340869];
const BaoLiLai_Z = 0;
const BaoLiLai_dm = {
  title: "BaoLiLai_dm",
  url: `${baseURL}baolilai/bll_dm/bll_dm.gltf`,
  options: {
    position: BaoLiLai_POSTION, // 必须
    scale: BaoLiLai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: BaoLiLai_Z
  }
};
const BaoLiLai_jz = {
  title: "BaoLiLai_jz",
  url: `${baseURL}baolilai/bll_jz/bll_jz.gltf`,
  options: {
    position: BaoLiLai_POSTION, // 必须
    scale: BaoLiLai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: BaoLiLai_Z
  }
};
const BaoLiLai_sb = {
  title: "BaoLiLai_sb",
  url: `${baseURL}baolilai/bll_sb/bll_sb.gltf`,
  options: {
    position: BaoLiLai_POSTION, // 必须
    scale: BaoLiLai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: BaoLiLai_Z
  }
};
const BaoLiLai_fy = {
  title: "BaoLiLai_fy",
  url: `${baseURL}baolilai/bll_fy/bll_fy.gltf`,
  options: {
    position: BaoLiLai_POSTION, // 必须
    scale: BaoLiLai_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: BaoLiLai_Z
  }
};
const ShengMing_SCALE = 0.095;
const ShengMing_POSTION = [115.57159870862964, 35.589827989232916];
const ShengMing_Z = 0;
const ShengMing_dm = {
  title: "ShengMing_dm",
  url: `${baseURL}shengming/sm_dm/sm_A.gltf`,
  options: {
    position: ShengMing_POSTION, // 必须
    scale: ShengMing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ShengMing_Z
  }
};
const ShengMing_jzB = {
  title: "ShengMing_jzB",
  url: `${baseURL}shengming/sm_jz/jz_B/sm_B.gltf`,
  options: {
    position: ShengMing_POSTION, // 必须
    scale: ShengMing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ShengMing_Z
  }
};
const ShengMing_jzC = {
  title: "ShengMing_jzC",
  url: `${baseURL}shengming/sm_jz/jz_C/sm_C.gltf`,
  options: {
    position: ShengMing_POSTION, // 必须
    scale: ShengMing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ShengMing_Z
  }
};
const ShengMing_jzD = {
  title: "ShengMing_jzD",
  url: `${baseURL}shengming/sm_jz/jz_D/sm_D.gltf`,
  options: {
    position: ShengMing_POSTION, // 必须
    scale: ShengMing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ShengMing_Z
  }
};
const NanGang_SCALE = 0.095;
const NanGang_POSTION = [115.57334482669832,35.58979836415882];
const NanGang_Z = 0;
const NanGang_dm = {
  title: "NanGang_dm",
  url: `${baseURL}nangang/ng_dm/ng_dm.gltf`,
  options: {
    position: NanGang_POSTION, // 必须
    scale: NanGang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NanGang_Z
  }
};
const NanGang_jz = {
  title: "NanGang_jz",
  url: `${baseURL}nangang/ng_jz/ng_jz.gltf`,
  options: {
    position: NanGang_POSTION, // 必须
    scale: NanGang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NanGang_Z
  }
};
const NanGang_sb = {
  title: "NanGang_sb",
  url: `${baseURL}nangang/ng_sb/ng_sb.gltf`,
  options: {
    position: NanGang_POSTION, // 必须
    scale: NanGang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NanGang_Z
  }
};
const NanGang_fy = {
  title: "NanGang_fy",
  url: `${baseURL}nangang/ng_fy/ng_fy.gltf`,
  options: {
    position: NanGang_POSTION, // 必须
    scale: NanGang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NanGang_Z
  }
};
const RuiDing_SCALE = 0.095;
const RuiDing_POSTION = [115.57560324668886,35.57164908428249];
const RuiDing_Z = 0;
const RuiDing_dm = {
  title: "RuiDing_dm",
  url: `${baseURL}ruiding/rd_dm/rd_dm.gltf`,
  options: {
    position: RuiDing_POSTION, // 必须
    scale: RuiDing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiDing_Z
  }
};
const RuiDing_jz = {
  title: "RuiDing_jz",
  url: `${baseURL}ruiding/rd_jz/rd_jz.gltf`,
  options: {
    position: RuiDing_POSTION, // 必须
    scale: RuiDing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiDing_Z
  }
};
const RuiDing_sb = {
  title: "RuiDing_sb",
  url: `${baseURL}ruiding/rd_sb/rd_sb.gltf`,
  options: {
    position: RuiDing_POSTION, // 必须
    scale: RuiDing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiDing_Z
  }
};
const RuiDing_fy = {
  title: "RuiDing_fy",
  url: `${baseURL}ruiding/rd_fy/rd_fy.gltf`,
  options: {
    position: RuiDing_POSTION, // 必须
    scale: RuiDing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiDing_Z
  }
};
const ChangQing_SCALE = 0.095;
const ChangQing_POSTION = [115.57116687297822,35.57956939848681];
const ChangQing_Z = 0;
const ChangQing_dm = {
  title: "ChangQing_dm",
  url: `${baseURL}changqing/cq_dm/cq_dm.gltf`,
  options: {
    position: ChangQing_POSTION, // 必须
    scale: ChangQing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ChangQing_Z
  }
};
const ChangQing_jz = {
  title: "ChangQing_jz",
  url: `${baseURL}changqing/cq_jz/cq_jz.gltf`,
  options: {
    position: ChangQing_POSTION, // 必须
    scale: ChangQing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ChangQing_Z
  }
};
const ChangQing_sb = {
  title: "ChangQing_sb",
  url: `${baseURL}changqing/cq_sb/cq_sb.gltf`,
  options: {
    position: ChangQing_POSTION, // 必须
    scale: ChangQing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ChangQing_Z
  }
};
const ChangQing_fy = {
  title: "ChangQing_fy",
  url: `${baseURL}changqing/cq_fy/cq_fy.gltf`,
  options: {
    position: ChangQing_POSTION, // 必须
    scale: ChangQing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: ChangQing_Z
  }
};
const NingLu_SCALE = 0.095;
const NingLu_POSTION = [115.56382834911348,35.575317018742886];
const NingLu_Z = 0;
const NingLu_dm = {
  title: "NingLu_dm",
  url: `${baseURL}ninglu/nl_dm/nl_dm.gltf`,
  options: {
    position: NingLu_POSTION, // 必须
    scale: NingLu_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NingLu_Z
  }
};
const NingLu_jz = {
  title: "NingLu_jz",
  url: `${baseURL}ninglu/nl_jz/nl_jz.gltf`,
  options: {
    position: NingLu_POSTION, // 必须
    scale: NingLu_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NingLu_Z
  }
};
const NingLu_sb = {
  title: "NingLu_sb",
  url: `${baseURL}ninglu/nl_sb/nl_sb.gltf`,
  options: {
    position: NingLu_POSTION, // 必须
    scale: NingLu_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NingLu_Z
  }
};
const NingLu_fy = {
  title: "NingLu_fy",
  url: `${baseURL}ninglu/nl_fy/nl_fy.gltf`,
  options: {
    position: NingLu_POSTION, // 必须
    scale: NingLu_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: NingLu_Z
  }
};
const XiangShun_SCALE = 0.095;
const XiangShun_POSTION = [115.57063579559328,35.575695171740946];
const XiangShun_Z = 0;
const XiangShun_dm = {
  title: "XiangShun_dm",
  url: `${baseURL}xiangshun/xs_dm/xs_dm.gltf`,
  options: {
    position: XiangShun_POSTION, // 必须
    scale: XiangShun_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XiangShun_Z
  }
};
const XiangShun_jz = {
  title: "XiangShun_jz",
  url: `${baseURL}xiangshun/xs_jz/xs_jz.gltf`,
  options: {
    position: XiangShun_POSTION, // 必须
    scale: XiangShun_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XiangShun_Z
  }
};
const XiangShun_sb = {
  title: "XiangShun_sb",
  url: `${baseURL}xiangshun/xs_sb/xs_sb.gltf`,
  options: {
    position: XiangShun_POSTION, // 必须
    scale: XiangShun_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XiangShun_Z
  }
};
const XiangShun_fy = {
  title: "XiangShun_fy",
  url: `${baseURL}xiangshun/xs_fy/xs_fy.gltf`,
  options: {
    position: XiangShun_POSTION, // 必须
    scale: XiangShun_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XiangShun_Z
  }
};
const XiaoFang_SCALE = 0.095;
const XiaoFang_POSTION = [115.56235313415529,35.571728716651066];
const XiaoFang_Z = 0;
const XiaoFang_dm = {
  title: "XiaoFang_dm",
  url: `${baseURL}xaiofangzhongdui/xf_dm/xf_dm.gltf`,
  options: {
    position: XiaoFang_POSTION, // 必须
    scale: XiaoFang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XiaoFang_Z
  }
};
const XiaoFang_jz = {
  title: "XiaoFang_jz",
  url: `${baseURL}xaiofangzhongdui/xf_jz/xf_jz.gltf`,
  options: {
    position: XiaoFang_POSTION, // 必须
    scale: XiaoFang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: XiaoFang_Z
  }
};
const YiKang_SCALE = 0.095;
const YiKang_POSTION = [115.56876361370088,35.571863741625954];
const YiKang_Z = 0;
const YiKang_dm = {
  title: "YiKang_dm",
  url: `${baseURL}yikang/yk_dm/yk_dm.gltf`,
  options: {
    position: YiKang_POSTION, // 必须
    scale: YiKang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YiKang_Z
  }
};
const YiKang_jz = {
  title: "YiKang_jz",
  url: `${baseURL}yikang/yk_jz/yk_jz.gltf`,
  options: {
    position: YiKang_POSTION, // 必须
    scale: YiKang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YiKang_Z
  }
};
const YiKang_sb = {
  title: "YiKang_sb",
  url: `${baseURL}yikang/yk_sb/yk_sb.gltf`,
  options: {
    position: YiKang_POSTION, // 必须
    scale: YiKang_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: YiKang_Z
  }
};
const HuaYi_SCALE = 0.095;
const HuaYi_POSTION = [115.56129097938539,35.56277055603807];
const HuaYi_Z = 0;
const HuaYi_dm = {
  title: "HuaYi_dm",
  url: `${baseURL}huayi/hy_dm/hy_dm.gltf`,
  options: {
    position: HuaYi_POSTION, // 必须
    scale: HuaYi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: HuaYi_Z
  }
};
const HuaYi_jz = {
  title: "HuaYi_jz",
  url: `${baseURL}huayi/hy_jz/hy_jz.gltf`,
  options: {
    position: HuaYi_POSTION, // 必须
    scale: HuaYi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: HuaYi_Z
  }
};
const HuaYi_sb = {
  title: "HuaYi_sb",
  url: `${baseURL}huayi/hy_sb/hy_sb.gltf`,
  options: {
    position: HuaYi_POSTION, // 必须
    scale: HuaYi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: HuaYi_Z
  }
};
const HuaYi_fy = {
  title: "HuaYi_fy",
  url: `${baseURL}huayi/hy_fy/hy_fy.gltf`,
  options: {
    position: HuaYi_POSTION, // 必须
    scale: HuaYi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: HuaYi_Z
  }
};
const RuiYing_SCALE = 0.095;
const RuiYing_POSTION = [115.55913448333742,35.55934396882894];
const RuiYing_Z = 0;
const RuiYing_dm = {
  title: "RuiYing_dm",
  url: `${baseURL}ruiying/ry_dm/ry_dm.gltf`,
  options: {
    position: RuiYing_POSTION, // 必须
    scale: RuiYing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiYing_Z
  }
};
const RuiYing_jzo = {
  title: "RuiYing_jzo",
  url: `${baseURL}ruiying/ry_jz/jz_o/ry_jz.gltf`,
  options: {
    position: RuiYing_POSTION, // 必须
    scale: RuiYing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiYing_Z
  }
};
const RuiYing_jzt = {
  title: "RuiYing_jzt",
  url: `${baseURL}ruiying/ry_jz/jz_t/ry_jz.gltf`,
  options: {
    position: RuiYing_POSTION, // 必须
    scale: RuiYing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiYing_Z
  }
};
const RuiYing_jzth = {
  title: "RuiYing_jzth",
  url: `${baseURL}ruiying/ry_jz/jz_th/ry_jz.gltf`,
  options: {
    position: RuiYing_POSTION, // 必须
    scale: RuiYing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiYing_Z
  }
};
const RuiYing_fyo = {
  title: "RuiYing_fyo",
  url: `${baseURL}ruiying/ry_fy/fy_o/ry_fy.gltf`,
  options: {
    position: RuiYing_POSTION, // 必须
    scale: RuiYing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiYing_Z
  }
};
const RuiYing_fyt = {
  title: "RuiYing_fyt",
  url: `${baseURL}ruiying/ry_fy/fy_t/ry_fy.gltf`,
  options: {
    position: RuiYing_POSTION, // 必须
    scale: RuiYing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiYing_Z
  }
};
const RuiYing_fyth = {
  title: "RuiYing_fyth",
  url: `${baseURL}ruiying/ry_fy/fy_th/ry_fy.gltf`,
  options: {
    position: RuiYing_POSTION, // 必须
    scale: RuiYing_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: RuiYing_Z
  }
};
const WuShuiChuLi_SCALE = 0.095;
const WuShuiChuLi_POSTION = [115.56934833526613,35.57965459342716];
const WuShuiChuLi_Z = 0;
const WuShuiChuLi_dm = {
  title: "WuShuiChuLi_dm",
  url: `${baseURL}wushuichuli/wscl_dm/wscl_dm.gltf`,
  options: {
    position: WuShuiChuLi_POSTION, // 必须
    scale: WuShuiChuLi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: WuShuiChuLi_Z
  }
};
const WuShuiChuLi_jz = {
  title: "WuShuiChuLi_jz",
  url: `${baseURL}wushuichuli/wscl_jz/wscl_jz.gltf`,
  options: {
    position: WuShuiChuLi_POSTION, // 必须
    scale: WuShuiChuLi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: WuShuiChuLi_Z
  }
};
const WuShuiChuLi_sb = {
  title: "WuShuiChuLi_sb",
  url: `${baseURL}wushuichuli/wscl_sb/wscl_sb.gltf`,
  options: {
    position: WuShuiChuLi_POSTION, // 必须
    scale: WuShuiChuLi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: WuShuiChuLi_Z
  }
};
const WuShuiChuLi_fy = {
  title: "WuShuiChuLi_fy",
  url: `${baseURL}wushuichuli/wscl_fy/wscl_fy.gltf`,
  options: {
    position: WuShuiChuLi_POSTION, // 必须
    scale: WuShuiChuLi_SCALE, // 非必须，默认1
    height: 0, // 非必须，默认0
    scene: 0 // 非必须，默认0
  },
  transform: {
    x: 90,
    z: WuShuiChuLi_Z
  }
};


// const Models = [JCHG_BASE]
let Models = [
  JC_BASE,
  DingTai_dm,
  DingTai_jz,
  DingTai_sbo,
  DingTai_sbt,
  DingTai_fyo,
  DingTai_fyt,
  BaoLiLai_dm,
  BaoLiLai_jz,
  BaoLiLai_sb,
  BaoLiLai_fy,
  ShengMing_dm,
  ShengMing_jzB,
  ShengMing_jzC,
  ShengMing_jzD,
  NanGang_dm,
  NanGang_jz,
  NanGang_sb,
  NanGang_fy,
  RuiDing_dm,
  RuiDing_jz,
  RuiDing_sb,
  RuiDing_fy,
  ChangQing_dm,
  ChangQing_jz,
  ChangQing_sb,
  ChangQing_fy,
  NingLu_dm,
  NingLu_jz,
  NingLu_sb,
  NingLu_fy,
  XiangShun_dm,
  XiangShun_jz,
  XiangShun_sb,
  XiangShun_fy,
  XiaoFang_dm,
  XiaoFang_jz,
  YiKang_dm,
  YiKang_jz,
  YiKang_sb,
  HuaYi_dm,
  HuaYi_jz,
  HuaYi_sb,
  HuaYi_fy,
  RuiYing_dm,
  RuiYing_jzo,
  RuiYing_jzt,
  RuiYing_jzth,
  RuiYing_fyo,
  RuiYing_fyt,
  RuiYing_fyth,
  WuShuiChuLi_dm,
  WuShuiChuLi_jz,
  WuShuiChuLi_sb,
  WuShuiChuLi_fy,
  WeiFei_dm,
  WeiFei_jz,
  
];


Models.forEach((x)=>{
  x.type = "build";
})

export default {
  outList: Models
};
