import axios from 'axios'
import service from './api'
import Vue from 'vue'
import { LoadingPlugin,ToastPlugin  } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
// service 循环遍历输出不同的请求方法
let instance = axios.create({
    baseURL: 'http://115.238.142.66:8882/camera',
    // baseURL: 'http://20.28.10.111:8993/camera',
    timeout: 1000
})
const Http = {}; // 包裹请求方法的容器

// 请求格式/参数的统一
for (let key in service) {
    let api = service[key]; // url method
    // async 作用：避免进入回调地狱
    Http[key] = async function (
        params, // 请求参数 get：url，put，post，patch（data），delete：url
        isFormData = false,// 标识是否是form-data请求
        config = {} // 配置参数
    ) {
        let newParams = {}

        //  content-type是否是form-data的判断
        if (params && isFormData) {
            newParams = new FormData()
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params
        }
        // 不同请求的判断
        let response = {}; // 请求的返回值
        if (api.method === 'post') {
            config.params = newParams
            try {
                response = await instance[api.method](api.url, newParams, config)
            } catch (err) {
                response = err
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams
            try {
                response = await instance[api.method](api.url, config)
            } catch (err) {
                response = err
            }
        }
        return response; // 返回响应值
    }
}

// 拦截器的添加
// 请求拦截器
instance.interceptors.request.use(config => {
    Vue.$vux.loading.show({
        text: 'loadin'
    })
    return config
}, () => {
    // 请求错误

    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('请求错误，稍后重试', 'middle')
    // Toast('请求错误，请求稍后重试')
})
// 响应拦截器
instance.interceptors.response.use(res => {
    // 请求成功
    Vue.$vux.loading.hide()
    return res.data
}, () => {
    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('请求错误，稍后重试', 'middle')
})

export default Http