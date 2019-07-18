import {postHttp, deleteHttp,getHttp} from "./basehttp";

//新增标签
export function addTag(body) {
  let url = '/tag/add';
  return postHttp(url, body);
}

//获取所有标签
export function getTags() {
  let url='/tag/taglist';
  return getHttp(url)
}

//获取标签详情
export function getTagDetail(params) {
  let url='/tag/detail';
  return getHttp(url,params)
}

//删除标签
export function deleteTag(params) {
  let url='/tag/drop';
  return deleteHttp(url,params);
}
