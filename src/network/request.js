import axios from "axios";

export function request(config) {
    // 创建axios实例
    const instance = axios.create({
        baseURL: "http://123.207.32.32:8000/api/wh",
        // baseURL : "http://106.54.54.237:8000/api/wh", 
        timeout: 2000
    })

    // 拦截器
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })

    instance.interceptors.response.use(res => {
        // 过滤掉axios添加的其他数据
        return res.data
    }, err => {
        console.log(err);

    })

    // 发送真正的网络请求
    return instance(config)
}