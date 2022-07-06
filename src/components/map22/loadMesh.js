import zl from './meshs/zl.js';
import mx from './meshs/mx.js';
import yss from './meshs/yss.js';
import zzl from './meshs/zzl.js';


let getMeshBlock= function getMeshBlock(list){
  let bulis = [];
  console.log(list,'--传入参数');
  if(list && list.length){
    list.forEach((item,index)=>{
      var bounds = item.paths.map(function(path) {
         return new AMap.LngLat(path[0], path[1]);
      });
      var prism = new AMap.Object3D.Prism({
        path: bounds,
        height: item.height|| 80,
        color: item.color||'#0088ffcc' // 支持 #RRGGBB、rgb()、rgba() 格式数据
      });
      prism.transparent = true;
      if(item.exData){
        prism.exData = item.exData;
      };
      bulis.push(prism);
    })
  };

  return bulis;
}


export default {
  getMeshBlock:getMeshBlock,
  zl:zl.meshs,
  mx:mx.meshs,
  yss:yss.meshs,
  zzl:zzl.meshs,
}
