import dmn from './dmn.js';


const DMN = dmn.outList;


let Models = [

  ...DMN
];

Models.forEach((x)=>{
  x.type = "build";
})

let QXZS  = [
  {name:"园区-2#环境监测区",position:[115.117054,35.237764]},
  {name:"园区-1#环境监测区",position:[115.125705,35.234635]},
  {name:"园区-7#环境监测区",position:[115.147329,35.249228]},
  {name:"园区-12#环境监测区",position:[115.123496,35.226152]},
  {name:"园区-11#环境监测区",position:[115.147255,35.223733]},
  {name:"园区-10#环境监测区",position:[115.133343,35.240238]},
  {name:"园区-9#环境监测区",position:[115.126675,35.24657]},
  {name:"园区-8#环境监测区",position:[115.140316,35.249305]},
  {name:"园区-6#环境监测区",position:[115.146898,35.242701]},
  {name:"园区-5#环境监测区",position:[115.145916,35.239226]},
  {name:"园区-4#环境监测区",position:[115.140928,35.235772]},
  {name:"园区-3#环境监测区",position:[115.131806,35.226829]}
];


QXZS.forEach((x)=>{
  x.type = 'qxz';
  x.opt  = {
    scale: 0.03, // 非必须，默认1
    height:0, // 非必须，默认0
    rotateZ:0,
  };
})


Models = [...DMN,...QXZS];


export default {
  Models: Models
};
