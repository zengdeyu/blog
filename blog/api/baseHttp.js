import axios from 'axios'
import qs from 'qs'

export function getHttp(url,params) {
  return new Promise((resolve,reject)=>{
    axios.get(url,{params:params}).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err.message)
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
// 132.232.14.150
axios.defaults.baseURL='http://132.232.14.150:3000';
axios.defaults.timeout=45000;

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



