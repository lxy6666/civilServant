<template>
  <div class="changeDoc">
    <!-- {{ruleForm.ids}} -->
    <!-- {{changObj}} -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormCg"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="级别" prop="jb">
        <el-select v-model="ruleForm.jb" placeholder="请选择级别" @change="getFgs">
          <el-option label="总公司级" value="zgs"></el-option>
          <el-option label="分公司级" value="fgs"></el-option>
          <el-option label="车间级" value="cj"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="接收单位" prop="ids">
        <el-checkbox-group v-model="ruleForm.ids">
          <el-checkbox v-for="item in fgsItems" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="分公司" v-if="ruleForm.jb=='cj'">
        <el-select v-model="nowFgs" placeholder="请选择级别" @change="getCj">
          <el-option v-for="item in fgsItems" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-checkbox-group v-model="ruleForm.ids">
          <el-checkbox v-for="item in fgsItems" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="车间权限" prop="ids" v-if="ruleForm.jb=='cj'">
        <el-checkbox-group v-model="ruleForm.ids">
          <el-checkbox v-for="item in cjItems" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="阅读权限" prop="ids" v-if="ruleForm.jb=='fgs'">
        <el-checkbox-group v-model="ruleForm.ids">
          <el-checkbox v-for="item in fgsItems" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="内容" prop="nr">
        <div id="div2"></div>
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="close">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
      </el-form-item> -->
    </el-form>
    <span class="footers">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleFormCg')">确 定</el-button>
    </span>
  </div>
</template>
<script>
import E from 'wangeditor'
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
export default {
  props: {
    changObj: {
        type: Object
    },
  },
  name: "changeDoc",
  data() {
      return {
        editor2:null,
        ruleForm: {
            title:'',
            jb:'',
            ids:[],
            type:'',
            nr:''
        },
        nowFgs:'',
        nowId:'',
        fgsItems:[],
        cjItems:[],
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          jb: [
            { required: true, message: '请选择级别', trigger: 'blur' },
          ],
          nr: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
          ids: [
            { required: true, message: '请选择权限', trigger: 'blur' },
          ],
        },

      };
    },
    mounted(){
        let that = this;
        that.editor2 = new E(`#div2`);
        // 配置菜单栏，删减菜单，调整顺序
        that.editor2.config.menus = [
            'head',
            'bold',
            'fontSize',
            'italic',
            'underline',
            'strikeThrough',
            'foreColor',
            'backColor',
            'link',
            'justify',
            'image',
            'table',
        ]
        that.editor2.create();
        this.setDatas(this.changObj);
        //获取分公司选项们
        // that.getFgs('fgs');
    },
    watch: {
      changObj (val) {
        this.setDatas(val);
      }
    },
    methods: {
      submitForm(formName) {
        let that = this;
        //这句为了验证富文本
        that.ruleForm.nr = that.editor2.txt.text().trim() === '' ? '' : that.editor2.txt.html();
        that.$refs[formName].validate((valid) => {
          if (valid) {
            if(that.ruleForm.jb=='zgs'){
                that.ruleForm.ids=[1]
            }
            that.$emit('submit',that.ruleForm,that.nowFgs,that.nowId)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.ruleForm.jb = 'zgs';
        this.ruleForm.ids = [];
        this.fgsItems = [];
        this.cjItems=[];
        this.editor2.txt.html('')
        this.$refs[formName].resetFields();
      },
      close(){
        this.resetForm('ruleFormCg');
        this.$emit('close')
      },
      //分公司级，车间级获取分公司选项
      getFgs(val){
        let that = this;
        that.ruleForm.ids=[];
        that.fgsItems = [];
        //console.log(val);
        if(val=='fgs'||val=='cj'){
          //获取分公司
          let that = this;
          let obj = {
            cid:'1'
          };
          getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
            (response) => {
              if (response.message != "暂无数据") {
                console.log(JSON.stringify(response));
                that.fgsItems = response.data.rows;
              } else {
                resolve([]);
              }
            }
          );
        }
      },
      getCj(val){
        let that = this;
        that.ruleForm.ids=[];
        that.cjItems=[];
        //console.log(val);
        //获取分公司
        let obj = {
          cid:val
        };
        getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
          (response) => {
            if (response.message != "暂无数据") {
              console.log(JSON.stringify(response));
              that.cjItems = response.data.rows;
            } else {
              resolve([]);
            }
          }
        );
      },
      setDatas(val){
          let that =this;
          if(Object.keys(val).length != 0){
            that.ruleForm.title=val.title;
            that.ruleForm.jb=val.jb;
            that.ruleForm.type=val.type;
            that.ruleForm.nr=val.nr;
            that.editor2.txt.html(val.nr);
            that.nowId = val.id;
          //  alert(val.id);
            //如果是分公司级
            // if(val.jb=='fgs'){
              that.getFgs('fgs');
              let obj = {
                cid:'1'
              };
              getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
                (response) => {
                  if (response.message != "暂无数据") {
                    console.log(JSON.stringify(response));
                    that.fgsItems = response.data.rows;
                    let s =(val.fgsIds).replace('[','').replace(']','').replace(/\s/g, "");
                    let p = s.split(",")
                    that.ruleForm.ids = p;
                  } else {
                    resolve([]);
                  }
                }
              );
            // }
            //如果是车间级
            // if(val.jb=='cj'){
            //   that.getFgs('fgs');
            //   let obj = {
            //     cid:'1'
            //   };
            //   //获取分公司选项卡
            //   getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
            //     (response) => {
            //       if (response.message != "暂无数据") {
            //         console.log(JSON.stringify(response));
            //         that.fgsItems = response.data.rows;
                   
            //         //先选中分公司
            //         that.nowFgs = val.bz;
            //         //根据分公司获取车间选项卡
            //         let obj = {
            //           cid:val.bz
            //         };
            //         getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
            //           (response) => {
            //             if (response.message != "暂无数据") {
            //               that.cjItems = response.data.rows;
            //               //选中相应选项
            //               let s =(val.ids).replace('[','').replace(']','').replace(/\s/g, "");
            //               let p = s.split(",")
            //               that.ruleForm.ids = p;
            //             } else {
            //               resolve([]);
            //             }
            //           }
            //         );
            //       } else {
            //         resolve([]);
            //       }
            //     }
            //   );
            // }
            
          }
          // ruleForm: {
          //   title:'',
          //   jb:'',
          //   ids:[],
          //   type:'',
          //   nr:''
          // },
      }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.changeDoc {
    padding-right:70px;
    overflow: hidden;
    .footers{
        float: right;
        position: relative;
    }
}
</style>
