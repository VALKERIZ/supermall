import { request } from "./request";

// 统一管理所有请求

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}