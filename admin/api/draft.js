import {postHttp,deleteHttp,getHttp} from "./basehttp";


//获取文章列表
export function getDraftList() {
  let url='/draft/list';
  return getHttp(url);
}

//获取单篇文章
export function getDraftById(params) {
  let url='/draft/detail';
  return getHttp(url,params)
}

//发布文章
export function publishDraft(body) {
  let url='/draft/publish';
  return postHttp(url,body)
}

//删除文章
export function dropDraft(params) {
  let url='/draft/drop';
  return deleteHttp(url,params);
}
