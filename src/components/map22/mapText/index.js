import Store from "../../../store.js";
import Router from "../../../router.js"
import config from "../../../util/config.js" //弃用



let itemList = [
  {
    title: "大成生物",
    position: [118.154276, 36.768248],
    loadId: "dc",
    des:'储存 2#危险品罐区单元',
    data:[
      {
        level:'一级',
        content:'液氯储罐'
      },
      {
        level:'三级',
        content:'液氯库单元'
      }
    ]
  },
  {
    title: "联创",
    position: [118.139597, 36.771285],
    loadId: "lc",
    des:'使用 环氧丙烷罐区储存单元,一级',
    data:[
    ]
  },
  {
    title: "新华",
    position: [118.157023, 36.772267],
    loadId: "xh",
    des:'暂无',
    data:[
    ]
  },
  {
    title: "民基",
    position: [118.149001, 36.776394],
    loadId: "mj",
    des:' 生产 环氧原料及成品罐',

    data:[
      {
        level:'一级',
        content:'碳五树脂生产单元'
      },
      {
        level:'一级',
        content:'异丁烯罐区'
      },
      {
        level:'三级',
        content:'环氧氯丙烷装置'
      },
      {
        level:'三级',
        content:'切片包装车间'
      },
      {
        level:'四级',
        content:'氯乙酸原料及产品罐区'
      }

    ]

  },
  {
    title: "管委会",
    position: [118.149988, 36.76765],
    loadId: "gwh"
  },
  {
    title: "新塑",
    position: [118.162671, 36.773901],
    loadId: "xs"
  },
  {
    title: "鲁华",
    position: [118.163833, 36.771838],
    loadId: "lh"
  },
  {
    title: "齐隆",
    position: [118.163902, 36.776088],
    loadId: "ql"
  },
  {
    title: "建刚",
    position: [118.161451, 36.774753],
    loadId: "jg"
  },
  {
    title: "元丰",
    position: [118.147498, 36.767465],
    loadId: "yf"
  },
  {
    title: "热电厂",
    position: [118.149115, 36.770328],
    loadId: "fdc"
  }
];

const spotTypes =[
  {
		"id": "718175429625778176",
		"name": "测试",
		"creator_id": "测试用户3029",
		"creator": "686270853259857920",
		"describe": "这是一个测试",
		"createtime": 1575446974693,
		"updatetime": 1575080860232
	}, {
		"id": "717810861045059584",
		"name": "卫生院",
		"creator_id": "测试用户3029",
		"creator": "686270853259857920",
		"describe": "1",
		"createtime": 1574993940310,
		"updatetime": 1574993940310
	}, {
		"id": "717810420458590208",
		"name": "村庄",
    'icon':'fa fa',
		"creator_id": "测试用户3029",
		"creator": "686270853259857920",
		"describe": "111",
		"createtime": 1574993888763,
		"updatetime": 1574993835266
	}, {
		"id": "717608934076190720",
		"name": "小区",
		"creator_id": "测试用户3029",
		"creator": "686270853259857920",
		"describe": "居民",
		"createtime": 1574945797169,
		"updatetime": 1574945797169
	}, {
		"id": "717411163331235840",
		"name": "学校",
		"creator_id": "测试用户3029",
		"creator": "686270853259857920",
		"describe": "arr",
		"createtime": 1574945696610,
		"updatetime": 1574898644949
	}
]


let typeIcon = {
    '热电厂':'icon-hot',
    "围子变电站":"icon-electric",
    '道闸':'icon-roadgatehl',
    '专用洗车场':'icon-washing',
    '危化品车辆专用停车场':'icon-parking',
    '危化品车辆专用通道':'icon-cheliangtongdao',
    '交通':'icon-category',
    '环保':'icon-environment_protect',
    '污水处理厂':'icon-effluent_deal',
    "公共管道":"icon-tunnel",
    '防潮防洪设施':'icon-dampproof',
    '地下水监测区':'icon-underground_well',
    '地表水监测区':'icon-surfacewater',
    '危废安全处置':'icon-dangerous_waste_deal',
    '村落':'icon-village',
    '学校':'icon-school',
    '消防站':'icon-fire_station',
    '消防栓':'icon--FireHydrant',
    '卫生院':'icon-weishengyuan',
    '医院':'icon-hospital',
    '小区':'icon-xiaoqu',
    "707720085959217152":'#icon-lianchuang',//联创
    "701135894127710208":'#icon-dacheng',//大成
    "707725167157186560":'#icon-minji',//民基
    "707725395407015936":'#icon-luhua',//鲁华同方
    "707725511320801280":'#icon-luhua',//鲁华
    "707725643453960192":'#icon-qilong',//齐隆
    "707725772151984128":'#icon-xinhua',//新华
    "716385859418591232":'#icon-xinsu',//新塑
    "716385958819401728":'#icon-yuanfengnor',//元丰
    "716797119163404288":'#icon-jiangang',//建刚
    "732030262472478720":'icon-shandongruiyingzhiyao',//睿鹰
    "736646916431024128":'icon-qiye',//鼎泰
    "736647567026294784":'icon-qiye',//四新
    "736647965434843136":'icon-qiye',//泰瑞
    "736648528042004480":'icon-qiye',//金沃泰
    "736648679062114304":'icon-qiye',//天拓
    "736648855101247488":'icon-shandongjuanchengnangang',//南港
    "736649497895112704":'icon-qiye',//祥顺
    "736649749976977408":'icon-juanchengbaolilai',//宝利莱
    "736649869577555968":'icon-qiye',//鼎晟
    "736649997432524800":'icon-hezehuayihuagong',//华意化工
    "736649612806459392":'icon-qiye',
}

function setLabelContent(item,state){
  let content = '';
  let stateText = '';
  let icon = typeIcon[item.typeName];
  let infraicon = typeIcon[item.twoType];
  let facicon = typeIcon[item.gid];
  if(state){
    // stateText = `<span class='setMarginBack'>在线:<em>${state.in_line||0}</em>/ ${state.count||0}</span>`;
    stateText = ``;

  }

  if(item.type=='newType'){// 工厂标签  //type分为spot:敏感点 infra:基础设施 分别为其写样式
    content = `<div class='markerV2 markerV2-cool'>
      <div class='markerV2-content'>
        <div class="markerV2-body">
          <i class="markerV2-icon iconfont ${item.icon_string}"></i>
          <p class="markerV2-text">${item.title}</p>
        </div>
        <div class="markerV2-state"><span>${state.status_name}</span> ${stateText}</div>
      </div>
      <div class='markerV2-bottom'></div>
      <div class="fixLine fixBlue">
        <div class="fixLeft"></div>
        <div class="fixRight"></div>
      </div>
    </div>`
  };




  if(item.type=='planArea'){// 工厂标签  //type分为spot:敏感点 infra:基础设施 分别为其写样式
    content = `
    <div class="markfunArea markfunArea-long">
      <div class="markfunArea-title"><i class='markfunArea-icon iconfont ${item.icon_string}'></i>${item.title}</div>
      <div class='markfunArea-bottom '></div>
    </div>`;
  };



  let iconText = '';
  if(config.IconType === 'svg'){
    iconText=` <svg style="margin-right:8px;" class="icon" aria-hidden="true">
       <use xlink:href="${facicon}"></use>
    </svg>`
  }else if(config.IconType === 'iconfont'){
    iconText=`<i class=" markerV2-icon iconfont ${facicon}"></i>`
  }
  if(item.type=='factory'){// 工厂标签  //type分为spot:敏感点 infra:基础设施 分别为其写样式
    content = `<div class='markerV2 markerV2-cool'>
      <div class='markerV2-content'>
        <div class="markerV2-body">
          ${iconText}
          <p class="markerV2-text">${item.title}</p>
        </div>
        <div class="markerV2-state"><span>${item.status_name}</span> ${stateText}</div>
      </div>
      <div class='markerV2-bottom'></div>
      <div class="fixLine fixBlue">
        <div class="fixLeft"></div>
        <div class="fixRight"></div>
      </div>
    </div>`
  };
  if(item.type=='areafunc'){// 园区功能区
    content = `<div class='markerV2 markerV2-green markerV2-cool'>
      <div class='markerV2-content'>
        <div class="markerV2-body">
          <i class="markerV2-icon iconfont ${item.icon_string}"></i>
          <p class="markerV2-text">${item.title}</p>
        </div>
        <div class="markerV2-state"><span>${state.status_name}</span> ${stateText}</div>
      </div>
      <div class='markerV2-bottom'></div>
      <div class="fixLine fixGreen">
        <div class="fixLeft"></div>
        <div class="fixRight"></div>
      </div>
    </div>`
  };
  if(item.type=='spot'){// 敏感点标签
    content = `<div class='markerV2 markerV2-warn markerV2-cool'>
      <div class='markerV2-content'>
        <div class="markerV2-body">
          <i class="markerV2-icon iconfont ${item.icon_string}"></i>
          <p class="markerV2-text">${item.title}</p>
        </div>
        <div class="markerV2-state"><span>${state.status_name}</span> ${stateText}</div>
      </div>
      <div class='markerV2-bottom'></div>
      <div class="fixLine fixYellow">
        <div class="fixLeft"></div>
        <div class="fixRight"></div>
      </div>
    </div>`
  };
  return content
};

function setText(list, GisMap) {//获取区域时调用
  let textMarkers = [];
  console.log(list,'图标maker');
  if (list && list.length) {
    list.forEach(item => {
      item.entity_id = item.gid || item.id;
      let textMarker = new AMap.Marker({
        position: new AMap.LngLat(item.position[0], item.position[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: item.title,
        cursor: "pointer",
        zIndex: 300,
        content:`<span class="iconNone"'></span>`,
        extData:{
          ...item,
          loadId: item.loadId
        }
      });
      // 用于替换统计数据部分
      textMarker.__Data    = item;
      textMarker.entity_id = item.gid || item.id;
      textMarker.areaType = item.type;  // 类型
      textMarker.areaTypeName = item.typeName; //类型名称
      let content;
      if(item.buildState){
        textMarker.buildState = item.buildState;
      }
      if(item.type=='spot'){
        let state = {status_name:item.area.status_name};
        content = setLabelContent(item,state);
      }
      if(item.type=='infra'){
        // textMarker.areaTwoType = item.twoType;
        let state = {status_name:item.area.status_name};
        content = setLabelContent(item,state);
      }

      if(item.type == 'areafunc'){
        let state = {status_name:item.area.status_name};
        content = setLabelContent(item,state);
      }
      if(item.type=='factory'){
        content = setLabelContent(item);
      }

      if(item.type=='planArea'){
        content = setLabelContent(item);
      }

      textMarker.setLabel({
        offset: new AMap.Pixel(-36, -46), //设置文本标注偏移量
        content: content, //设置文本标注内容
        direction: "right" //设置文本标注方位
      });
      textMarker.setMap(GisMap);
      textMarkers.push(textMarker);

      if(item.type =='factory'){
        var textRightContent = new AMap.ContextMenu();
        textRightContent.addItem("进入内部", function(e) {
          Store.commit("changeThree", true);
          sessionStorage.ThreeShowType = true;
          let loadId = Store.state.loadId;
          Store.commit('changeRight',true);
          // Router.push({name:'factory',query:{loadId:loadId}})
          //Router.push({name:'companyDetailThree',query:{loadId:loadId}});
        });
        textMarker.on("rightclick", function(e) {
          let loadId = e.target.B.extData.loadId;
          Store.commit("setLoadId", loadId);
          textRightContent.open(GisMap, e.lnglat);
        });

        textMarker.on("click", function(e) {
          Store.commit('loadMap',800);
          Store.commit('changeRight',true);

          // if(item.isNew){ //新版详情
          //   Router.push({name:'factoryDetail',query:{gid:item.gid}});
          // }else{
          //   Router.push({name:'companyDetail',query:{loadId:item.gid}});
          // }
          GisMap.setZoom(17.8);
          GisMap.panTo([item.longitude,item.latitude]);
        });
      }else if(item.type =='newType'){
        textMarker.on("click", function(e) {
          console.log('测试其他详情--------')
          //Router.push({name:'overDetail',query:{id:item.id,type:item.type}})
          GisMap.setZoom(17.8);
          GisMap.panTo([item.area.longitude,item.area.latitude]);
        });
      }else if(item.type =='planArea'){
        textMarker.on("click", function(e) {
          //Router.push({name:'overDetail',query:{id:item.id,type:item.type}})
          GisMap.setZoom(15.5);
          GisMap.panTo([item.area.longitude,item.area.latitude]);
        });
      }else{
        textMarker.on("click", function(e) {
          console.log('测试其他详情--------')
          //Router.push({name:'overDetail',query:{id:item.id,type:item.type}})
          GisMap.setZoom(17.8);
          GisMap.panTo([item.longitude,item.latitude]);
        });
      }

    });
  }
  console.log(textMarkers,'-----e--------textMarkers---')
  return textMarkers;
}

function setTab(){
 let  style='background: linear-gradient(-135deg, transparent 7px, rgba(29, 75, 183, 0.9) 0);'
}

function setGateText(list,map){
  let gates = [];
  if(list && list.length){
    list.forEach((item)=>{

      let textMarker = new AMap.Marker({
        position: new AMap.LngLat(item.position[0], item.position[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        content:'',
        title: item.title,
        cursor: "pointer",
        zIndex: 300,
      });

      let content = ``;
      textMarker.setLabel({
        offset: new AMap.Pixel(-26, -32), //设置文本标注偏移量
        content: content, //设置文本标注内容
        direction: "right" //设置文本标注方位
      });

    })
  }
}

export default {
  setText: setText,
  itemList: itemList,
  setLabelContent: setLabelContent,
};
