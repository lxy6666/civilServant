<template>
 <div class="has-logo">
  <logo :collapse="isCollapse" />
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="true"
      mode="vertical"
    >
    
      <sidebar-item v-for="(route,index) in permission_routers" :key="index" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Logo from './Logo'
export default {
  components: { SidebarItem,Logo},
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.has-logo{
  .el-menu-item,.el-submenu__title{
    font-size:16px !important
  }
}

</style>

