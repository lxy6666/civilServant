const baseURL = "https://m.ts-it.cn/third/icarus/static/yiyuan/";

const YiYuan_SCALE = 0.445;
const YiYuan_POSTION = [118.229405, 36.188305];
const YiYuan_Z = 0;
// optConfig: [0.26, 0.6, 1, 0.8],
const GROUND_bx = {
    title: "GROUND_bx",
    url: `${baseURL}ground/bianxian/YY_ground_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    optConfig: [0.26, 0.6, 1, 0.8],
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const GROUND_cz = {//企业以及村庄
    title: "GROUND_cz",
    url: `${baseURL}ground/cunzhuang/YY_ground_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    optConfig: [0.26, 0.6, 1, 0.8],
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const GROUND_nt = {//草地
    title: "GROUND_nt",
    url: `${baseURL}ground/nongtian/YY_ground_C.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    optConfig: [0.05, 0.42, 0.23, 0.72],
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const GROUND_cd = {//空地的草地
    title: "GROUND_cd",
    url: `${baseURL}ground/chedao/YY_ground_D.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const GROUND_zgd = {
    title: "GROUND_zgd",
    url: `${baseURL}ground/zhugandao/YY_ground_E.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const HuiJia_dm = {
    title: "HuiJia_dm",
    url: `${baseURL}huijia/huijia_dm/hj_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const HuiJia_jz = {
    title: "HuiJia_jz",
    url: `${baseURL}huijia/huijia_jz/hj_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const XinQuanYiYao_dm = {
    title: "XinQuanYiYao_dm",
    url: `${baseURL}xinquanyiyao/xinquan_dm/xq_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const XinQuanYiYao_jz = {
    title: "XinQuanYiYao_jz",
    url: `${baseURL}xinquanyiyao/xinquan_jz/xq_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const RuiFeng_dm = {
    title: "RuiFeng_dm",
    url: `${baseURL}ruifeng/rf_dm/rf_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const RuiFeng_jz = {
    title: "RuiFeng_jz",
    url: `${baseURL}ruifeng/rf_jz/rf_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const RuiYangZhiYao_dm = {
    title: "RuiYangZhiYao_dm",
    url: `${baseURL}ruiyangzhiyao/ruiyang_dm/ry_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const RuiYangZhiYao_jz = {
    title: "RuiYangZhiYao_jz",
    url: `${baseURL}ruiyangzhiyao/ruiyang_jz/ry_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const TaoYuanMeiHua_dm = {
    title: "TaoYuanMeiHua_dm",
    url: `${baseURL}taoyuanmeihua/taoyuanmeihua_dm/tymh_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const TaoYuanMeiHua_jz = {
    title: "TaoYuanMeiHua_jz",
    url: `${baseURL}taoyuanmeihua/taoyuanmeihua_jz/tymh_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const AGuanWeiHui_dm = {
    title: "AGuanWeiHui_dm",
    url: `${baseURL}Aguanweihui/guanweihui_dm/gwh_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const AGuanWeiHui_jz = {
    title: "AGuanWeiHui_jz",
    url: `${baseURL}Aguanweihui/guanweihui_jz/gwh_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const BXiaoFangZhan_dm = {
    title: "BXiaoFangZhan_dm",
    url: `${baseURL}Bxiaofangzhan/xiaofang_dm/xfz_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const BXiaoFangZhan_jz = {
    title: "BXiaoFangZhan_jz",
    url: `${baseURL}Bxiaofangzhan/xiaofang_jz/xfz_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const CShuiChang_dm = {
    title: "CShuiChang_dm",
    url: `${baseURL}Cshuichang/shuichang_dm/Csc_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const CShuiChang_jz = {
    title: "CShuiChang_jz",
    url: `${baseURL}Cshuichang/shuichang_jz/Csc_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const DLaJiChang_dm = {
    title: "DLaJiChang_dm",
    url: `${baseURL}Dlajichang/lajichang_dm/Dljc_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const DLaJiChang_jz = {
    title: "DLaJiChang_jz",
    url: `${baseURL}Dlajichang/lajichang_jz/Dljc_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const EZaiJianPart_dm = {
    title: "EZaiJianPart_dm",
    url: `${baseURL}EzaijianPart/zaijianPart_dm/Epart_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const EZaiJianPart_jz = {
    title: "EZaiJianPart_jz",
    url: `${baseURL}EzaijianPart/zaijianPart_jz/Epart_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const FWuShuiChang_dm = {
    title: "FWuShuiChang_dm",
    url: `${baseURL}Fwushuichang/wushuichang_dm/Fws_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const FWuShuiChang_jz = {
    title: "FWuShuiChang_jz",
    url: `${baseURL}Fwushuichang/wushuichang_jz/Fws_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const GReYuanChang_dm = {
    title: "GReYuanChang_dm",
    url: `${baseURL}Greyuanchang/reyuan_dm/Gry_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const GReYuanChang_jz = {
    title: "GReYuanChang_jz",
    url: `${baseURL}Greyuanchang/reyuan_jz/Gry_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const HBianDianZhan_dm = {
    title: "HBianDianZhan_dm",
    url: `${baseURL}Hbiandianzhan/biandianzhan_dm/Hbdz_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const HBianDianZhan_jz = {
    title: "HBianDianZhan_jz",
    url: `${baseURL}Hbiandianzhan/biandianzhan_jz/Hbdz_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const JBianDianZhan_dm = {
    title: "JBianDianZhan_dm",
    url: `${baseURL}Jbiandianzhan/Jbiandian_dm/Jbdz_A.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const JBianDianZhan_jz = {
    title: "JBianDianZhan_jz",
    url: `${baseURL}Jbiandianzhan/Jbiandian_jz/Jbdz_B.gltf`,
    options: {
        position: YiYuan_POSTION, // 必须
        scale: YiYuan_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: YiYuan_Z
    }
};
const outList = [
    HuiJia_dm,
    XinQuanYiYao_dm,
    RuiFeng_dm,
    RuiYangZhiYao_dm,
    TaoYuanMeiHua_dm,
    AGuanWeiHui_dm,
    BXiaoFangZhan_dm,
    CShuiChang_dm,
    DLaJiChang_dm,
    EZaiJianPart_dm,
    FWuShuiChang_dm,
    GReYuanChang_dm,
    HBianDianZhan_dm,
    JBianDianZhan_dm,
    GROUND_bx,
    GROUND_cz,
    GROUND_nt,
    GROUND_cd,
    GROUND_zgd,
    HuiJia_jz,
    XinQuanYiYao_jz,
    RuiFeng_jz,
    RuiYangZhiYao_jz,
    TaoYuanMeiHua_jz,
    AGuanWeiHui_jz,
    BXiaoFangZhan_jz,
    CShuiChang_jz,
    DLaJiChang_jz,
    EZaiJianPart_jz,
    FWuShuiChang_jz,
    GReYuanChang_jz,
    HBianDianZhan_jz,
    JBianDianZhan_jz,
]

export default {
    outList
}