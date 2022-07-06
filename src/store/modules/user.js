import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
import {
  setCookie,getCookie
} from '@/utils/index1'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    nowindex:'',
    setting: {
      articlePlatform: []
    },
    userInfo:{

    },//存储当前登录人信息
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    // SET_SETTING: (state, setting) => {
    //   state.setting = setting
    // },
    // SET_STATUS: (state, status) => {
    //   state.status = status
    // },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NOWINDEX: (state, index) => {
      // alert(index+'2222');
      state.nowindex = index
    },
    SET_USERINFO: (state, userInfo) => {
      // alert(index+'2222');
      state.userInfo = userInfo
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      // const afp = localStorage.getItem('pro__Login_Username');
      // const p = JSON.parse(afp);
      // const username = p.value
   
      return new Promise((resolve, reject) => {
    
        loginByUsername(username, userInfo.password).then(response => {
          if(response.flag){
            const data = response.data
            commit('SET_TOKEN',data)
            setToken(data)
            //登录的时候，根据权限生成路由菜单
            // store.dispatch('GenerateRoutes',{roles}).then(() => { // 根据roles权限生成可访问的路由表
            //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // })
            //结束
            resolve()
          }else{
             reject("登录失败，请检查用户名或密码")
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          //存储当前登录人信息
          commit('SET_USERINFO',response.data)
          // 由于mockjs 不支持自定义状态码只能这样hack
          if (!response.flag) {
            reject('Verification failed, please login again.')
          }
          const data = response.data
          // if (data.role && data.role.length > 0) {//验证返回的roles是否是一个非空数组
          if (data.role) {
            let roles = [];
            roles.push(String(data.role));
           //roles.push('admins');
            commit('SET_ROLES', roles);
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', 'image/adminIcon.png')
          commit('SET_INTRODUCTION', '')
          // console.log(response);
          //用户id
          localStorage.setItem('uid',data.id)
          //用户名称
          localStorage.setItem('uname',data.name)
          //部门
          localStorage.setItem('dept',data.dept)
          //党支部
          localStorage.setItem('type',data.type)
          // if(data.fgs){
          //   localStorage.setItem('fgsid',data.fgs.id)
          // }
          // if(data.cj){
          //   localStorage.setItem('cjid',data.cj.id)
          // }
          // localStorage.setItem('role',data.role.type)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    //设置当前页面
    SetNowIndex({ commit },index) {
      commit('SET_NOWINDEX',index)
    },
    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          console.log(response,'oooooo?')
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
