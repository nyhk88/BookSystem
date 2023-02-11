import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})

// request 拦截器 请求发送前做一些处理
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器 接口响应后统一处理
request.interceptors.response.use(
    response => {
        let res = response.data;
        //兼容服务器返回的字符串数据
        if(typeof res === 'string'){
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)
export default request