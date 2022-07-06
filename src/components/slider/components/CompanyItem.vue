<template lang="html">
  <div  class='companyItem' @click="click(item)">
    <svg class="iconSVG"  >
      <use :xlink:href="item.icon"></use>
    </svg>
    {{getName(item.name)}}
  </div>
</template>

<script>
export default {
  name:'CompanyItem',
  props:{
    item:{
      type:Object,
      default:{
        name:'',
        gid:133,
      }
    }
  },
  data(){
    return{
      typeName:window.ProjectConfig.IconType,
      typeIcon:{
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
      },
    }
  },
  methods:{
    click(item){
      this.$emit('tabClick',item);
    },
    getName(name){
      return name.replace('有限公司','')
    },
  }
}
</script>

<style lang="less">

.companyItem{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  margin-bottom: 16px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset 0px 1px 8px rgba(46, 130, 255, 0.5);
  box-shadow: inset 0px 1px 8px rgba(46, 130, 255, 0.5);
  border: 1px solid rgba(9, 95, 180, 0.5);
  background: url('../imgs/company.png') no-repeat center;
  background-size:100% 100%;
  color:#fff;
  padding: 12px 32px;
  transition:  all 0.3s;

}
.iconSVG
{
  width: 2.2em;
  height: 2.2em;
  margin-right: 12px;
}
.companyItem:hover,.companyItem-active{
  background: url('../imgs/company_active.png') no-repeat center;
  background-size:100% 100%;
  border: 1px solid transparent;
  transition:  all 0.3s;
}
</style>
