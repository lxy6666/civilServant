const baseURL = "https://m.ts-it.cn/third/icarus/static/dongmingnan/";

const DMN_SCALE = 0.109;
const DMN_Z = 0;

const GROUND_POSTION = [115.12090578675272, 35.24611743636186];
const ground_SCALE = 0.109;
const GROUND_green = {
    title: "GROUND_green",
    url: `${baseURL}ground/ground_A/ground_A.gltf`,
    options: {
        position: GROUND_POSTION, // 必须
        scale: ground_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    optConfig: [0.07, 0.4, 0.2, 0.72],
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const GROUND_blue = {
    title: "GROUND_blue",
    url: `${baseURL}ground/ground_B/ground_B.gltf`,
    options: {
        position: GROUND_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    optConfig: [0.26, 0.6, 1, 0.8],
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//洪丰面粉场
const HF_POSTION = [115.11771261692047, 35.24309568826577];
const HF_dm = {
    title: "HF_dm",
    url: `${baseURL}hongfeng/hf_A/A.gltf`,
    options: {
        position: HF_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const HF_jz = {
    title: "HF_jz",
    url: `${baseURL}hongfeng/hf_B/B.gltf`,
    options: {
        position: HF_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//盛荣化工
const SRHG_POSTION = [115.12090578675272, 35.24611743636186];
const SRHG_dm = {
    title: "SRHG_dm",
    url: `${baseURL}shengronghuagong/srhg_dm/srhg_A.gltf`,
    options: {
        position: SRHG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const SRHG_jz = {
    title: "SRHG_jz",
    url: `${baseURL}shengronghuagong/srhg_jz/srhg_B.gltf`,
    options: {
        position: SRHG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const SRHG_sb = {
    title: "SRHG_sb",
    url: `${baseURL}shengronghuagong/srhg_sb/srhg_C.gltf`,
    options: {
        position: SRHG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//盛荣恒力供热
const SRHL_POSTION = [115.12094199657442, 35.2437680822446];
const SRHL_dm = {
    title: "SRHL_dm",
    url: `${baseURL}shengronghengli/srhl_dm/srhl_A.gltf`,
    options: {
        position: SRHL_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const SRHL_jz = {
    title: "SRHL_jz",
    url: `${baseURL}shengronghengli/srhl_jz/srhl_B.gltf`,
    options: {
        position: SRHL_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//华谊玉皇
const HY_POSTION = [115.12752, 35.243489];
const HY_a = {
    title: "HY_a",
    url: `${baseURL}huayiyuhuang/hy_A/hy_A.gltf`,
    options: {
        position: HY_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const HY_b = {
    title: "HY_b",
    url: `${baseURL}huayiyuhuang/hy_B/hy_B.gltf`,
    options: {
        position: HY_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const HY_c = {
    title: "HY_c",
    url: `${baseURL}huayiyuhuang/hy_C/hy_C.gltf`,
    options: {
        position: HY_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//中海亚环保材料
const ZHY_POSTION = [115.123082, 35.239505];
const ZHY_dm = {
    title: "ZHY_dm",
    url: `${baseURL}zhonghaiya/zhy_dm/zhy_A.gltf`,
    options: {
        position: ZHY_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const ZHY_jz = {
    title: "ZHY_jz",
    url: `${baseURL}zhonghaiya/zhy_jz/zhy_B.gltf`,
    options: {
        position: ZHY_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//停车场
const PARK_POSTION = [115.12639, 35.239172 ];
const PARK_dm = {
    title: "PARK_dm",
    url: `${baseURL}park/park_dm/park_A.gltf`,
    options: {
        position: PARK_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const PARK_jz = {
    title: "PARK_jz",
    url: `${baseURL}park/park_jz/park_B.gltf`,
    options: {
        position: PARK_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//东巨化工
const DJHG_POSTION = [115.122851,35.237723];
const DJHG_Z = 0;
const DJHG_A = {
    title: "DJHG_A",
    url: `${baseURL}dongjuhuagong/dj_A/dj_A.gltf`,
    options: {
        position: DJHG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DJHG_Z
    }
};
const DJHG_B = {
    title: "DJHG_B",
    url: `${baseURL}dongjuhuagong/dj_B/dj_B.gltf`,
    options: {
        position: DJHG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const DJHG_C = {
    title: "DJHG_C",
    url: `${baseURL}dongjuhuagong/dj_C/dj_C.gltf`,
    options: {
        position: DJHG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const DJHG_D = {
	title: "DJHG_D",
	url: `${baseURL}dongjuhuagong/dj_D/dj_D.gltf`,
	options: {
		position: DJHG_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
const DJHG_E = {
	title: "DJHG_E",
	url: `${baseURL}dongjuhuagong/dj_E/dj_E.gltf`,
	options: {
		position: DJHG_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
const DJHG_F = {
	title: "DJHG_F",
	url: `${baseURL}dongjuhuagong/dj_F/dj_F.gltf`,
	options: {
		position: DJHG_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
//方明化工
const FangMing_SCALE = 0.106;
const FangMing_O_POSTION = [115.123149,35.231049];
const FangMing_O_A = {
    title: "FangMing_O_A",
    url: `${baseURL}fangming/one/one_A/one_A.gltf`,
    options: {
        position: FangMing_O_POSTION, // 必须
        scale: FangMing_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const FangMing_O_B = {
    title: "FangMing_O_B",
    url: `${baseURL}fangming/one/one_B/one_B.gltf`,
    options: {
        position: FangMing_O_POSTION, // 必须
        scale: FangMing_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const FangMing_T_POSTION = [115.127941,35.230849];
const FangMing_z = -0.5;
const FangMing_T_A = {
	title: "FangMing_T_A",
	url: `${baseURL}fangming/two/two_A/two_A.gltf`,
	options: {
		position: FangMing_T_POSTION, // 必须
		scale: FangMing_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: FangMing_z,
	},
};
const FangMing_T_B = {
	title: "FangMing_T_B",
	url: `${baseURL}fangming/two/two_B/two_B.gltf`,
	options: {
		position: FangMing_T_POSTION, // 必须
		scale: FangMing_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: FangMing_z,
	},
};
const FangMing_TH_POSTION = [115.128221,35.234224];
const FangMing_TH_A = {
    title: "FangMing_TH_A",
    url: `${baseURL}fangming/three/three_A/three_A.gltf`,
    options: {
        position: FangMing_TH_POSTION, // 必须
        scale: FangMing_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const FangMing_TH_B = {
    title: "FangMing_TH_B",
    url: `${baseURL}fangming/three/three_B/three_B.gltf`,
    options: {
        position: FangMing_TH_POSTION, // 必须
        scale: FangMing_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//恒顺供热
// const HengShun_SCALE = 0.09;
const HengShun_POSTION = [115.125981,35.230772];
const HengShun_dm = {
	title: "HengShun_dm",
	url: `${baseURL}hengshungongre/hsgr_dm/hsgr_A.gltf`,
	options: {
		position: HengShun_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
const HengShun_jz = {
	title: "HengShun_jz",
	url: `${baseURL}hengshungongre/hsgr_jz/hsgr_B.gltf`,
	options: {
		position: HengShun_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
//元创化工
const YC_POSTION = [115.133052, 35.230658];
const YC_SCALE = 0.106;
const YC_A = {
    title: "YC_A",
    url: `${baseURL}yuanchuang/yc_dm/yc_A.gltf`,
    options: {
        position: YC_POSTION, // 必须
        scale: YC_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const YC_B = {
    title: "YC_B",
    url: `${baseURL}yuanchuang/yc_jz/yc_B.gltf`,
    options: {
        position: YC_POSTION, // 必须
        scale: YC_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//洪智生物
const HongZhi_POSTION = [115.135289, 35.231407];
const HongZhi_Z = -0.5;
const HongZhi_SCALE = 0.106;
const HongZhi_A = {
	title: "HongZhi_A",
	url: `${baseURL}hongzhishengwu/hz_dm/hz_A.gltf`,
	options: {
		position: HongZhi_POSTION, // 必须
		scale: HongZhi_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: HongZhi_Z,
	},
};
const HongZhi_B = {
	title: "HongZhi_B",
	url: `${baseURL}hongzhishengwu/hz_jzB/hz_B.gltf`,
	options: {
		position: HongZhi_POSTION, // 必须
		scale: HongZhi_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: HongZhi_Z,
	},
};
const HongZhi_C = {
    title: "HongZhi_C",
    url: `${baseURL}hongzhishengwu/hz_jzC/hz_C.gltf`,
    options: {
        position: HongZhi_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//百成新材料
const BC_POSTION = [115.137995,35.23489];
const BC_Z = -2;
const BC_A = {
    title: "BC_A",
    url: `${baseURL}baicheng/bc_dm/bc_A.gltf`,
    options: {
        position: BC_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: BC_Z
    }
};
const BC_B = {
    title: "BC_B",
    url: `${baseURL}baicheng/bc_jz/bc_B.gltf`,
    options: {
        position: BC_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: BC_Z
    }
};
//联成化学
const LianCheng_POSTION = [115.137683,35.23043];
const LianCheng_dm = {
    title: "LianCheng_dm",
    url: `${baseURL}lianchenghuaxue/lchx_dm/lchx_A.gltf`,
    options: {
        position: LianCheng_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const LianCheng_jz = {
    title: "LianCheng_jz",
    url: `${baseURL}lianchenghuaxue/lchx_jz/lchx_B.gltf`,
    options: {
        position: LianCheng_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
// 中信兆邦
const ZHAOBANG_SCALE = 0.109;
const ZHAOBANG_POSTION = [115.125595,35.226069];
const ZHAOBANG_Z = -1;
const ZHAOBANG_dm = {
	title: "ZHAOBANG_dm",
	url: `${baseURL}zhaobang/zb_dm/zb_A.gltf`,
	options: {
		position: ZHAOBANG_POSTION, // 必须
		scale: ZHAOBANG_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: ZHAOBANG_Z,
	},
};
const ZHAOBANG_jz = {
	title: "ZHAOBANG_jz",
	url: `${baseURL}zhaobang/zb_jz/zb_B.gltf`,
	options: {
		position: ZHAOBANG_POSTION, // 必须
		scale: ZHAOBANG_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: ZHAOBANG_Z,
	},
};
//澳科精细化工
const AK_POSTION = [115.127297, 35.226247];
const AOKE_A = {
    title: "AOKE_A",
    url: `${baseURL}aoke/ak_dm/ak_A.gltf`,
    options: {
        position: AK_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const AOKE_B = {
    title: "AOKE_B",
    url: `${baseURL}aoke/ak_jz/ak_B.gltf`,
    options: {
        position: AK_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//宏昌化工
const HONGCHANG_POSTION = [115.125864, 35.224463];
const HONGCHANG_A = {
    title: "HONGCHANG_A",
    url: `${baseURL}hongchanghuagong/hc_A/hc_A.gltf`,
    options: {
        position: HONGCHANG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const HONGCHANG_B = {
    title: "HONGCHANG_B",
    url: `${baseURL}hongchanghuagong/hc_B/hc_B.gltf`,
    options: {
        position: HONGCHANG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//中信国安
const ZXGA_SCALE = 0.110;
const ZXGA_POSTION = [115.132832,35.226605 ];
const ZXGA_Z = 0.5;
const ZXGA_A = {
    title: "ZXGA_A",
    url: `${baseURL}zhongxinguoan/A/zxga_A.gltf`,
    options: {
        position: ZXGA_POSTION, // 必须
        scale: ZXGA_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: ZXGA_Z
    }
};
const ZXGA_B = {
    title: "ZXGA_B",
    url: `${baseURL}zhongxinguoan/B/zxga_B.gltf`,
    options: {
        position: ZXGA_POSTION, // 必须
        scale: ZXGA_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: ZXGA_Z
    }
};
const ZXGA_C = {
    title: "ZXGA_C",
    url: `${baseURL}zhongxinguoan/C/zxga_C.gltf`,
    options: {
        position: ZXGA_POSTION, // 必须
        scale: ZXGA_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: ZXGA_Z
    }
};
//嘉瑞
// const JIARUI_SCALE = 0.119;
const JIARUI_POSTION = [115.140592,35.226859];
// const JIARUI_Z = 1.5;
const JIARUI_A = {
	title: "JIARUI_A",
	url: `${baseURL}jiarui/jr_A/A.gltf`,
	options: {
		position: JIARUI_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
const JIARUI_B = {
	title: "JIARUI_B",
	url: `${baseURL}jiarui/jr_B/B.gltf`,
	options: {
		position: JIARUI_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
// 迪奥
const DIOR_POSTION = [115.140484, 35.224493];
// const DIOR_Z = 0.8;
const DIOR_A = {
	title: "DIOR_A",
	url: `${baseURL}diao/da_A/da_A.gltf`,
	options: {
		position: DIOR_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
const DIOR_B = {
	title: "DIOR_B",
	url: `${baseURL}diao/da_B/da_B.gltf`,
	options: {
		position: DIOR_POSTION, // 必须
		scale: DMN_SCALE, // 非必须，默认1
		height: 0, // 非必须，默认0
		scene: 0, // 非必须，默认0
	},
	transform: {
		x: 90,
		z: DMN_Z,
	},
};
// 唐庄变电站D
const BDD_POSTION = [115.130874, 35.221578];
const BDD_A = {
    title: "BDD_A",
    url: `${baseURL}Dbiandianzhan/A/A.gltf`,
    options: {
        position: BDD_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const BDD_B = {
    title: "BDD_B",
    url: `${baseURL}Dbiandianzhan/B/B.gltf`,
    options: {
        position: BDD_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//E给水厂
const EG_POSTION = [115.14430403709413, 35.21374482678742];
const EG_A = {
    title: "EG_A",
    url: `${baseURL}Egeishuichang/Egs_A/Egs_A.gltf`,
    options: {
        position: EG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const EG_B = {
    title: "EG_B",
    url: `${baseURL}Egeishuichang/Egs_B/Egs_B.gltf`,
    options: {
        position: EG_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
// 国网供电变电站A
const BDA_POSTION = [115.115994, 35.249103];
const BDA_A = {
    title: "BDA",
    url: `${baseURL}bdA/bdA_A/A.gltf`,
    options: {
        position: BDA_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const BDA_B = {
    title: "BDA",
    url: `${baseURL}bdA/bdA_B/B.gltf`,
    options: {
        position: BDA_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//变电站B
const BDB_POSTION = [115.122579,35.235747];
const BDB_A = {
    title: "BDB_A",
    url: `${baseURL}bdB/bdB_A/bdB_A.gltf`,
    options: {
        position: BDB_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const BDB_B = {
    title: "BDB_B",
    url: `${baseURL}bdB/bdB_B/bdB_B.gltf`,
    options: {
        position: BDB_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//变电站C
const BDC_POSTION = [115.120774, 35.228345];
const BDC_A = {
    title: "BDC_A",
    url: `${baseURL}bdC/bdC_A/bdC_A.gltf`,
    options: {
        position: BDC_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const BDC_B = {
    title: "BDC_B",
    url: `${baseURL}bdC/bdC_B/bdC_B.gltf`,
    options: {
        position: BDC_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//FG消防站
const FGX_POSTION = [115.1155185699463, 35.23983377193683];
const FGX_A = {
    title: "FGX_A",
    url: `${baseURL}FGxiaofang/xfFG_A/A.gltf`,
    options: {
        position: FGX_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const FGX_B = {
    title: "FGX_B",
    url: `${baseURL}FGxiaofang/xfFG_B/B.gltf`,
    options: {
        position: FGX_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
//鸿奥
const HA_POSTION = [115.124725, 35.213571];
const HA_A = {
    title: "HA_A",
    url: `${baseURL}Hhongao/ha_A/A.gltf`,
    options: {
        position: HA_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const HA_B = {
    title: "HA_B",
    url: `${baseURL}Hhongao/ha_B/B.gltf`,
    options: {
        position: HA_POSTION, // 必须
        scale: DMN_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
// 污水处理厂
const WSCL_SCALE = 0.117;
const WSCL_POSTION = [115.13129, 35.250774];
const WSCL_A = {
    title: "WSCL",
    url: `${baseURL}Iwushuichang/Iws_A/Iws_A.gltf`,
    options: {
        position: WSCL_POSTION, // 必须
        scale: WSCL_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};
const WSCL_B = {
    title: "WSCL",
    url: `${baseURL}Iwushuichang/Iws_B/Iws_B.gltf`,
    options: {
        position: WSCL_POSTION, // 必须
        scale: WSCL_SCALE, // 非必须，默认1
        height: 0, // 非必须，默认0
        scene: 0 // 非必须，默认0
    },
    transform: {
        x: 90,
        z: DMN_Z
    }
};

const outList = [
    GROUND_green,
    GROUND_blue,
    HF_dm,
    SRHG_dm,
    SRHL_dm,
    HY_a,
    ZHY_dm,
    PARK_dm,
    DJHG_A,
    FangMing_O_A,
    FangMing_T_A,
    FangMing_TH_A,
    HengShun_dm,
    YC_A,
    HongZhi_A,
    BC_A,
    LianCheng_dm,
    ZHAOBANG_dm,
    AOKE_A,
    HONGCHANG_A,
    ZXGA_A,
    JIARUI_A,
    DIOR_A,
    BDA_A,
    BDB_A,
    BDC_A,
    BDD_A,
    EG_A,
    FGX_A,
    HA_A,
    WSCL_A,


    HF_jz,
    SRHG_jz,
    SRHG_sb,
    SRHL_jz,
    HY_b,
    HY_c,
    ZHY_jz,
    PARK_jz,
    DJHG_B,
    DJHG_C,
    DJHG_D,
    DJHG_E,
    DJHG_F,
    FangMing_O_B,
    FangMing_T_B,
    FangMing_TH_B,
    HengShun_jz,
    YC_B,
    HongZhi_B,
    HongZhi_C,
    BC_B,
    LianCheng_jz,
    ZHAOBANG_jz,
    AOKE_B,
    HONGCHANG_B,
    ZXGA_B,
    ZXGA_C,
    JIARUI_B,
    DIOR_B,
    BDA_B,
    BDB_B,
    BDC_B,
    BDD_B,
    EG_B,
    FGX_B,
    HA_B,
    WSCL_B,
]

export default {
    outList
}