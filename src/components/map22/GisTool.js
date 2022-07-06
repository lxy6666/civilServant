import store from "../../store.js";
const typeIcons = {
  camera: {
    offset: {
      x: 0,
      y: 0
    },
    ptype: "precaution",
    url: require("../../assets/icons/camera.png")
  },
  risk: {
    offset: {
      x: -30,
      y: -30
    },
    ptype: "supervision",
    url: require("../../assets/icons/dangerous_resources.png")
  },
  //'gas':require('../../assets/icons/hazardous_gas.png'),
  //'gas':'https://cdn.ts-it.cn/699683388025606144gas.png',
  chemical: {
    offset: {
      x: -30,
      y: 0
    },
    ptype: "supervision",
    url: require("../../assets/icons/dangerous_chemicals.png")
  },
  //'chemical':'https://cdn.ts-it.cn/701320613658234880chemicals.png',
  technology: {
    offset: {
      x: 0,
      y: -30
    },
    ptype: "supervision",
    url: require("../../assets/icons/dangerous_process.png")
  },
  //'technology':'https://cdn.ts-it.cn/701323813987684352technology.png',
  atmosphere: {
    offset: {
      x: 0,
      y: -30
    },
    ptype: "environment",
    url: require("../../assets/icons/atmospheric.png")
  },
  //'atmosphere':'https://cdn.ts-it.cn/699683388025606144gas.png',
  groundwater: {
    offset: {
      x: -30,
      y: -30
    },
    ptype: "environment",
    url: require("../../assets/icons/under.png")
  },
  //'groundwater':'https://cdn.ts-it.cn/701354943327637504ground_water.png',
  smoke: {
    offset: {
      x: -30,
      y: 0
    },
    ptype: "environment",
    url: require("../../assets/icons/smoke.png")
  },
  //'smoke':'https://cdn.ts-it.cn/701355131878379520smoke.png',
  solidWaste: {
    offset: {
      x: -30,
      y: 0
    },
    ptype: "environment",
    url: require("../../assets/icons/solid_waste.png")
  }, //固废
  //'solidWaste':'https://cdn.ts-it.cn/70135630826321-3008under_water.png',
  surfaceWater: {
    offset: {
      x: 20,
      y: -20
    },
    ptype: "environment",
    url: require("../../assets/icons/surface.png")
  },
  //'surfaceWater':'https://cdn.ts-it.cn/701356626539581440s_water.png',
  toxicGas: {
    offset: {
      x: 20,
      y: -30
    },
    ptype: "environment",
    url: require("../../assets/icons/hazardous_gas.png")
  },
  //'toxicGas':'https://cdn.ts-it.cn/701356799474929664yq.png',
  //废气
  wasteGas: {
    offset: {
      x: 20,
      y: 0
    },
    ptype: "environment",
    url: require("../../assets/icons/flue_gas.png")
  },
  //'wasteGas':'https://cdn.ts-it.cn/701357130858500096sq.png',
  wasteWater: {
    offset: {
      x: 20,
      y: -20
    },
    ptype: "environment",
    url: require("../../assets/icons/waste_water.png")
  }
  //'wasteWater':'https://cdn.ts-it.cn/701357450275721216ww.png',
};

const rightType = {
  camera: [
    {
      title: "查看摄像头",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({ name: "monitoring", query: { ...query } });
      }
    }
  ],
  risk: [
    {
      title: "查看重大危险源",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "supDetail",
          query: { typeCode: "risk", ...query }
        });
      }
    }
  ],
  chemical: [
    {
      title: "查看危险化学品",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "supDetail",
          query: { typeCode: "chemical", ...query }
        });
      },
      offset: {
        x: -30,
        y: 0
      }
    }
  ],
  technology: [
    {
      title: "查看危险化学工艺",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "supDetail",
          query: { typeCode: "technology", ...query }
        });
      },
      offset: {
        x: -30,
        y: -30
      }
    }
  ], //环境
  atmosphere: [
    {
      title: "查看大气监测",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "atmosphere", ...query }
        });
      },
      offset: {
        x: 0,
        y: -30
      }
    }
  ],
  groundwater: [
    {
      title: "查看地下水监测",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "groundwater", ...query }
        });
      },
      offset: {
        x: 0,
        y: -30
      }
    }
  ],
  smoke: [
    {
      title: "查看烟雾监测",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "smoke", ...query }
        });
      },
      offset: {
        x: -30,
        y: -30
      }
    }
  ],
  solidWaste: [
    {
      title: "查看固废监测",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "solidWaste", ...query }
        });
      },
      offset: {
        x: -30,
        y: 0
      }
    }
  ],
  surfaceWater: [
    {
      title: "查看地表水监测",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "surfaceWater", ...query }
        });
      },
      offset: {
        x: -30,
        y: -30
      }
    }
  ],
  toxicGas: [
    {
      title: "查看有害气体",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "toxicGas", ...query }
        });
      },
      offset: {
        x: -30,
        y: 20
      }
    }
  ],
  wasteGas: [
    {
      title: "查看废气",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "wasteGas", ...query }
        });
      },
      offset: {
        x: -30,
        y: -20
      }
    }
  ],
  wasteWater: [
    {
      title: "查看废水",
      event: function(router, query) {
        if (query.id) {
          store.commit("setMarkerLink", query.id);
        }
        store.commit("changeRight", true);
        router.push({
          name: "envDetail",
          query: { typeCode: "wasteWater", ...query }
        });
      },
      offset: {
        x: 20,
        y: 20
      }
    }
  ]
};

//监测站经纬度数组
const jczArr = function jczArr(list){
  let arr=[];
  if (!list.length) {
    // 没有数据 直接返回
    console.log("加载list 为空");
    return [];
  }
  if(list){
    list.forEach((item)=>{
      if(item.type=="atmosphere"){
        let address = {lng:item.lng,lat:item.lat};
        arr.push(address);
      }
    })
  }
  return arr;
};

//右键类型
const loadMarker = function loadMarker(GisMap, list, router) {
  let markers = [];
  if (!list.length) {
    // 没有数据 直接返回
    console.log("加载list 为空");
    return [];
  }
  var menu = new AMap.ContextMenu();
  let type = list[0].type;
  if (!rightType[type]) {
    console.log("不合规范的list");
    return [];
  }
  var contextMenu = new AMap.ContextMenu();
  //右键事件
  rightType[type].forEach((item, index) => {
    contextMenu.addItem(
      item.title,
      function(e) {
        let routerId = store.getters.markerLink;
        let pointId = store.getters.pointLink;
        let itemClick = item.event.bind(this, router, {
          id: routerId,
          pid: pointId
        });
        itemClick();
      },
    );
  });
  // const jczArr ;
  if (list && list.length) {
    list.forEach(item => {
      let mType = item.type;
      let MarkerOffset = typeIcons[item.type].offset || { x: 0, y: 0 };
      //console.log(MarkerOffset,'-offset----')
      //let random = Math.random()*120

      var marker = new AMap.Marker({
        position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: item.title || "风险点",
        icon:
          typeIcons[item.type].url ||
          "https://cdn.ts-it.cn/699018517168656384bigrisk.png",
        map: GisMap,
        offset: new AMap.Pixel(-26, -32)
      });
      marker.extData = {
        routerId: item.id,
        pointId: item.pid
      };
      //environment supervision安监 precaution安防
      let divtag;
      if (typeIcons[item.type].ptype == "precaution") {
        divtag = `<div class='blueinfo'>${item.title}</div>`;
      } else if (typeIcons[item.type].ptype == "supervision") {
        if (item.type == "risk") {
          divtag = `<div class='redinfo'>${item.title}</div>`;
        } else {
          divtag = `<div class='orangeinfo'>${item.title}</div>`;
        }
      } else if (typeIcons[item.type].ptype == "environment") {
        divtag = `<div class='yellowinfo'>${item.title}</div>`;
      }

      marker.setLabel({
        offset: new AMap.Pixel(-26, -32), //设置文本标注偏移量
        content: divtag, //设置文本标注内容
        direction: "right" //设置文本标注方位
      });
      marker.on("click", function(e) {
        let routerId = e.target.extData.routerId;
        let pid = e.target.extData.pointId;
        console.log(e.target,'e.target.extDatae.target.extData')
        store.commit("setMarkerLink", routerId);
        store.commit("setPointLink", pid);
        contextMenu.open(GisMap, e.lnglat);
      });

      markers.push(marker);
    });
  }
  return markers;
};

export { loadMarker,jczArr };
