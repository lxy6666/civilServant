<template>
  <div class="app-container index">
    <center style="margin-top:100px">欢迎使用{{roles}}</center>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import store from '@/store'
import uploadDoc2 from '@/components/uploadDoc2';
import changeDoc2 from '@/components/changeDoc2';
import _URL from "../../lib/url";
import { getAction, postAction, deleteAction, putAction } from "@/api/manage";
import { mapGetters } from "vuex";
export default {
  components: {
    uploadDoc2,
    changeDoc2
  },
  name: "ComplexTable",
  data() {
    return {
      
    };
  },
  computed: {
     ...mapGetters([
      'roles',
     
    ])
  },
  created() {
   
  },
  mounted() {
    
  },
  methods: {
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.index {
  
}
</style>