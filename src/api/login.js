import request from '@/utils/request'
import qs from 'qs'
//登录
export function loginByUsername(username, password) {
    // const data = {
    //     username,
    //     password
    // }
    return request({
        url: 'user/getToken?username='+username+'&password='+password,
        method: 'get',
        // data
    })
}
//登出
export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}
//获取用户信息
export function getUserInfo(token) {
    return request({
        url: '/user/login',
        method: 'get',
        params: { token }
    })
}

