import {postHttp,deleteHttp,getHttp} from "./basehttp";


//获取文章列表
export function getArticleList() {
  let url='/article/all';
  return getHttp(url);
}

//获取单篇文章
export function getArticleById(params) {
  let url='/article/detail';
  return getHttp(url,params)
}

//发布文章
export function publishArticle(body) {
  let url='/article/publish';
  return postHttp(url,body)
}

//删除文章
export function dropArticle(params) {
  let url='/article/drop';
  return deleteHttp(url,params);
}
