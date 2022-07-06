import zd1 from './zd_1.js';
import zd2 from './zd_2.js';
const baseURL = "https://m.ts-it.cn/third/icarus/static/zhangdian/";


const ZD1 = zd1.outList;
const ZD2 = zd2.outList;

let Models = [
  ...ZD1,
  ...ZD1,
];

Models.forEach((x)=>{
  x.type = "build";
})

export default {
  Models: Models
};
