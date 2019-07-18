import {postHttp, deleteHttp,getHttp} from "./basehttp";

//新增标签
export function addUser(body) {
  let url = '/user/add';
  return postHttp(url, body);
}

//获取所有标签
export function getUser() {
  let url='/user/list';
  return getHttp(url)
}

//获取标签详情
export function getUserDetail(params) {
  let url='/user/detail';
  return getHttp(url,params)
}

//删除标签
export function deleteUser(params) {
  let url='/user/drop';
  return deleteHttp(url,params);
}
