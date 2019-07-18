import {postHttp,deleteHttp,getHttp} from "./basehttp";


//获取文章列表
export function getToolList() {
  let url='/tool/all';
  return getHttp(url);
}

//获取单篇文章
export function getToolById(params) {
  let url='/tool/detail';
  return getHttp(url,params)
}

//发布文章
export function publishTool(body) {
  let url='/tool/publish';
  return postHttp(url,body)
}

//删除文章
export function dropTool(params) {
  let url='/tool/drop';
  return deleteHttp(url,params);
}
