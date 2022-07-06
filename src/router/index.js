import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
// 解决replace路由重复报错，看着闹心
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
Vue.use(Router)
//第一块
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/dash'),
        name: 'index',
        meta: { title: '首页', icon: 'dashboard', noCache: false, affix: true },
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
//第二块菜单
export const asyncRouterMap = [
  {
    path: '/organ',
    component: Layout,
    redirect: '/organ/person',
    alwaysShow: true, // will always show the root menu
    name:'organ',
    meta: {
      title: '系统管理',
      icon: 'component',
      roles: ['0','1']
    },
    children: [
      {
        path: 'basis',
        name: 'basis',
        component: () => import('@/views/basis/list'),
        meta: {
          title: '志愿服务管理',
          roles: ['0']
        }
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/organ/department'),
        meta: {
          title: '组织架构',
          roles: ['0']
        }
      },
      {
        path: 'person',
        name: 'person',
        component: () => import('@/views/organ/person'),
        meta: {
          title: '人员管理',
          roles: ['0','1']
        }
      },
    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/bet',
    alwaysShow: true, // will always show the root menu
    name:'info',
    meta: {
      title: '信用信息采集',
      icon: 'form',
      roles: ['0','1']
    },
    children: [
      // {
      //   path: 'bet',
      //   name: 'bet',
      //   component: () => import('@/views/info/list_bet.vue'),
      //   meta: {
      //     title: '正面信息采集',
      //     roles: ['0','1']
      //   }
      // },
      // {
      //   path: 'neg',
      //   name: 'neg',
      //   component: () => import('@/views/info/list_neg.vue'),
      //   meta: {
      //     title: '负面信息采集',
      //     roles: ['0','1']
      //   }
      // },
      // {
      //   path: 'con',
      //   name: 'con',
      //   component: () => import('@/views/info/list_con.vue'),
      //   meta: {
      //     title: '社会公益捐款信息采集',
      //     roles: ['0','1']
      //   }
      // },
      {
        path: 'vol',
        name: 'vol',
        component: () => import('@/views/info/list_vol.vue'),
        meta: {
          title: '志愿服务信息采集',
          roles: ['0','1']
        }
      },
      {
        path: 'vol2',
        name: 'vol2',
        component: () => import('@/views/info/list_vol.vue'),
        meta: {
          title: '红色物业',
          roles: ['0','1']
        }
      },
    ]
  },
  {
    path: '/info_exa',
    component: Layout,
    redirect: '/info/bet',
    alwaysShow: true, // will always show the root menu
    name:'info_exa',
    meta: {
      title: '信用信息审核',
      icon: 'guide',
      roles: ['0','2','4']
    },
    children: [
      // {
      //   path: 'bet_exa',
      //   name: 'bet_exa',
      //   component: () => import('@/views/info/list_bet.vue'),
      //   meta: {
      //     title: '正面信息审核',
      //     roles: ['0','2','4']
      //   }
      // },
      // {
      //   path: 'neg_exa',
      //   name: 'neg_exa',
      //   component: () => import('@/views/info/list_neg.vue'),
      //   meta: {
      //     title: '负面信息审核',
      //     roles: ['0','2','4']
      //   }
      // },
      // {
      //   path: 'con_exa',
      //   name: 'con_exa',
      //   component: () => import('@/views/info/list_con.vue'),
      //   meta: {
      //     title: '社会公益捐款信息审核',
      //     roles: ['0','2','4']
      //   }
      // },
      {
        path: 'vol_exa',
        name: 'vol_exa',
        component: () => import('@/views/info/list_vol.vue'),
        meta: {
          title: '志愿服务信息审核',
          roles: ['0','2','4']
        }
      },
    ]
  },
  // {
  //   path: '/yearInfo',
  //   component: Layout,
  //   redirect: '/info/comp',
  //   alwaysShow: true, // will always show the root menu
  //   name:'yearInfo',
  //   meta: {
  //     title: '年度考核信息',
  //     icon: 'documentation',
  //     roles: ['0','2']
  //   },
  //   children: [
  //     {
  //       path: 'comp',
  //       name: 'comp',
  //       component: () => import('@/views/info/year_comp.vue'),
  //       meta: {
  //         title: '区直机关绩效考核信息',
  //         roles: ['0','2']
  //       }
  //     },
  //     {
  //       path: 'person',
  //       name: 'person',
  //       component: () => import('@/views/info/year_person.vue'),
  //       meta: {
  //         title: '公职人员年度考核信息',
  //         roles: ['0','2']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/list',
    alwaysShow: true, // will always show the root menu
    name:'message',
    meta: {
      title: '通知公告',
      icon: 'message',
      roles: ['0']
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/message/list'),
        meta: {
          title: '管理通知公告',
          roles: ['0']
        }
      },
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'evaluation',
    meta: {
      title: '评判标准',
      icon: 'table',
      roles: ['0']
    },
    children: [
      {
        path: 'evaluation',
        component: () => import('@/views/evaluation/index'),
        name: 'order',
        meta: { title: '评判标准', icon: 'table', noCache: false,roles: ['0']},
      }
    ]
  },
  // {
  //   path: '/attendance',
  //   component: Layout,
  //   redirect: '/attendance/list',
  //   alwaysShow: true, // will always show the root menu
  //   name:'attendance',
  //   meta: {
  //     title: '考勤管理',
  //     icon: 'example',
  //     roles: ['0','4']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'list',
  //       component: () => import('@/views/attendance/list'),
  //       meta: {
  //         title: '闸机出入明细',
  //         roles: ['0','4']
  //       }
  //     },
  //     {
  //       path: 'statistics',
  //       name: 'statistics',
  //       component: () => import('@/views/attendance/statistics'),
  //       meta: {
  //         title: '考勤统计',
  //         roles: ['0','4']
  //       }
  //     },
  //   ]
  // },
  {
    path: '',
    component: Layout,
    redirect: 'order',
    children: [
      {
        path: 'order',
        component: () => import('@/views/order/index'),
        name: 'order',
        meta: { title: '排行榜', icon: 'list', noCache: false},
      }
    ]
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'syslog',
  //   children: [
  //     {
  //       path: 'syslog',
  //       component: () => import('@/views/systemlog/index'),
  //       name: 'order',
  //       meta: { title: '操作日志', icon: 'table', noCache: false ,roles: ['0','4']},
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]