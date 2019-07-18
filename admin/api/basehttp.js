import axios from 'axios'
import qs from 'qs'

export function getHttp(url,params) {
  return new Promise((resolve,reject)=>{
    axios.get(url,{params:params})
      .then(response=>{
        if(response.data.success===false){
          Message.error(response.data.message)
          reject(response.data.message)
        }
        setTimeout(()=>{
          resolve(response.data)
        },300)
      })
      .catch(error=>{
        reject(error.message)
      })
  })
}
export function deleteHttp(url,params) {

  return new Promise((resolve,reject)=>{
    axios.delete(url,{params:params})
      .then(response=>{
        if (response.data.success === false) {
          Message.error(response.data.message)
          reject(response.data.message)
        }
        setTimeout(() => {
          resolve(response.data)
        }, 300)
      })
      .catch(error => {
        reject(error.message)
      })
  })
}
export function postHttp(url,body,params) {
  return new Promise((resolve,reject)=>{
    axios({
      method:'post',
      url:url,
      params:params,
      data:body
    })
      .then(response=>{

        if (response.data.success === false) {
          Message.error(response.data.message)
          reject(response.data.message)
        }
        setTimeout(() => {
          resolve(response.data)
        }, 300)
      })
      .catch(error => {
        reject(error.message)
      })
  })
}

//axios配置
axios.defaults.baseURL='http://132.232.14.150:3000';
axios.defaults.timeout=5000;

//post传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
    config.transformRequest = [function (data, headers) {
      return qs.stringify(data);
    }];
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) =>{
  if(!res.data.success){
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  //404等问题可以在这里处理
  switch (error.response.status) {
    case 101:
      break
    case 403:
      error.message = '禁止访问!'
      break
    case 408:
      error.message = '请求超时!'
      break
    case 500:
      error.message = '服务内部异常!'
      break
    case 503:
      error.message = '服务器升级中!'
      break
    case 504:
      error.message = '网关超时!'
      break
    default:
      error.message = '未知错误'
      break
  }
  return Promise.reject(error);
});


