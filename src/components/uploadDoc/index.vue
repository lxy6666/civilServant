<template>
  <div class="uploadDoc">
    <!-- {{ruleForm.ids}} -->
    <!-- {{changObj}} -->
    <!-- {{ruleForm.ids}} -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="ids">
        <!-- <el-select v-model="ruleForm.jb" placeholder="请选择级别" @change="getFgs">
          <el-option  value="">
          </el-option>
        </el-select> -->
        <!-- <treeselect 
          v-model="value" 
          :multiple="true" 
          :options="options"
          placeholder="请选择阅读权限"
          :disable-branch-nodes="true"
          value-consists-of="ALL_WITH_INDETERMINATE"
         /> -->

        <treeselect
          :multiple="true"
          :options="depment"
          value-consists-of="ALL_WITH_INDETERMINATE"
          v-model="ruleForm.ids"
          placeholder="请选择阅读权限"
           :normalizer="normalizer"
        />
      </el-form-item>
      <!-- <el-form-item label="分公司权限" prop="ids" v-if="ruleForm.jb=='fgs'">
        <el-checkbox-group v-model="ruleForm.ids">
          <el-checkbox v-for="item in fgsItems" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="分公司" v-if="ruleForm.jb=='cj'">
        <el-select v-model="nowFgs" placeholder="请选择级别" @change="getCj">
          <el-option v-for="item in fgsItems" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select> -->
      <!-- <el-checkbox-group v-model="ruleForm.ids">
          <el-checkbox v-for="item in fgsItems" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group> -->
      <!-- </el-form-item> -->
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
        <div id="div1"></div>
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
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </div>
</template>
<script>
import E from "wangeditor";
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  props: {
    changObj: {
      type: Object,
    },
  },
  components: {
    Treeselect,
  },
  name: "uploadDoc",
  data() {
    return {
      editor: null,
      ruleForm: {
        title: "",
        jb: "",
        ids: [],
        type: "",
        nr: "",
      },
      nowFgs: "",
      fgsItems: [],
      cjItems: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        jb: [{ required: true, message: "请选择级别", trigger: "blur" }],
        nr: [{ required: true, message: "请输入内容", trigger: "blur" }],
        ids: [{ required: true, message: "请选择权限", trigger: "blur" }],
      },
      value: null,
      // define options
      options: [
        {
          id: "company",
          label: "Company 🏢",
          children: [
            {
              id: "team-i",
              label: "Team I 👥",
              children: [
                {
                  id: "person-a",
                  label: "Person A 👱",
                },
                {
                  id: "person-b",
                  label: "Person B 🧔",
                },
              ],
            },
            {
              id: "team-ii",
              label: "Team II 👥",
              children: [
                {
                  id: "person-c",
                  label: "Person C 👳",
                },
                {
                  id: "person-d",
                  label: "Person D 👧",
                },
              ],
            },
            {
              id: "person-e",
              label: "Person E 👩",
            },
          ],
        },
      ],
      depment: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        }
      },
    };
  },
  mounted() {
    let that = this;
    that.editor = new E(`#div1`);
    // 配置菜单栏，删减菜单，调整顺序
    that.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "italic",
      "underline",
      "strikeThrough",
      "foreColor",
      "backColor",
      "link",
      "justify",
      "image",
      "table",
    ];
    that.editor.config.uploadImgServer = "/upload-img";
    that.editor.create();
    that.editor.config.uploadImgMaxLength = 1;
    this.setDatas(this.changObj);
    that.getSelect()
  },
  watch: {
    changObj(val) {
      this.setDatas(val);
    },
  },
  methods: {
    submitForm(formName) {
      let that = this;
      //这句为了验证富文本
      that.ruleForm.nr =
        that.editor.txt.text().trim() === "" ? "" : that.editor.txt.html();
      that.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.ruleForm.jb == "zgs") {
            that.ruleForm.ids = [1];
          }
          that.$emit("submit", that.ruleForm, that.nowFgs);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.ruleForm.jb = "zgs";
      this.ruleForm.ids = [];
      this.fgsItems = [];
      this.cjItems = [];
      this.editor.txt.html("");
      this.$refs[formName].resetFields();
      // this.editor.destroy()
      // this.editor = null
    },
    close() {
      this.resetForm("ruleForm");
      this.$emit("close");
    },
    //分公司级，车间级获取分公司选项
    getFgs(val) {
      let that = this;
      that.ruleForm.ids = [];
      that.fgsItems = [];
      //console.log(val);
      if (val == "fgs" || val == "cj") {
        //获取分公司
        let that = this;
        let obj = {
          cid: "1",
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
    getCj(val) {
      let that = this;
      that.ruleForm.ids = [];
      that.cjItems = [];
      //console.log(val);
      //获取分公司
      let obj = {
        cid: val,
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
    setDatas(val) {
      if (Object.keys(val).length != 0) {
        console.log("修改");
        // console.log(JSON.stringify(val));
      }
      // ruleForm: {
      //   title:'',
      //   jb:'',
      //   ids:[],
      //   type:'',
      //   nr:''
      // },
    },
    //获取下拉框
    getSelect() {
      let that = this;
      let obj = {};
      getAction(`${_URL.company_findAll}?pageNum=1&pageSize=999`, obj).then(
        (response) => {
          if (response.message != "暂无数据") {
            console.log(JSON.stringify(response));
            // let bdata = response.data.rows;
            // for(let i = 0;i<bdata.length;i++){
            //   bdata[i].cjname=bdata[i].na
            //   delete bdata[i].name;
            // }
            // resolve(response.data.rows)
            var jsonDataTree = that.transData(response.data.rows, 'id', 'cid', 'children');
            console.log(JSON.stringify(jsonDataTree));
            that.depment = jsonDataTree;
          } else {
            resolve([]);
          }
        }
      );
    },
    transData(a, idStr, pidStr, chindrenStr) {
      var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        len = a.length;
        for (; i < len; i++) {
          hash[a[i][id]] = a[i];
        }
        for (; j < len; j++) {
          var aVal = a[j],
            hashVP = hash[aVal[pid]];
          if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
          } else {
            if(aVal.cid=='0'){
              r.push(aVal);
            }
          }
        }
        return r;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.uploadDoc {
  padding-right: 70px;
  overflow: hidden;
  .footers {
    float: right;
    position: relative;
  }
  .vue-treeselect__menu-container {
    z-index: 99999 !important;
  }
  // .el-form-item__content{
  //   z-index:10 !important
  // }
}
</style>
