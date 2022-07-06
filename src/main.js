import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import Cookies from 'js-cookie'
import i18n from './lang' // Internationalization
import * as filters from './filters' // global filters
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/styles/font.scss' // global css
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
// import the component
// import Treeselect from '@riophae/vue-treeselect'
// // import the styles
import vSelectPage from 'v-selectpage';
Vue.use(vSelectPage);
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Contextmenu from "vue-contextmenujs"
Vue.use(Contextmenu);
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// Vue.use(Treeselect)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// if(!global.consoleSwitch){
//   console.log = ()=>{}
// }

Vue.config.productionTip = false
// Vue.config.silent = true


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
