import request from '@/utils/request'
import qs from 'qs'
//post
export function postAction(url, data) {
   // data = qs.stringify(data)
    return request({
        url   : url,
        method: 'post',
        data
    })
}
//get
export function getAction(url,params) {
    return request({
        url:url ,
        method: 'get',
        params
    })
}
//delete
export function deleteAction(url,params) {
    return request({
        url   : url,
        method: 'delete',
        params
    })
}
//put
export function putAction(url, data) {
    return request({
        url: url,
        method: 'put',
        data
    })
}