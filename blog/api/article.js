import {getHttp} from "./baseHttp";

//获取文章列表
export function getArticleList(params) {
  let url='/article/list';
    return getHttp(url,params)
}
//获取单篇文章
export function getArticleById(params) {
  let url='/article/detail';
  return getHttp(url,params)
}
//根据标签查找文章
export function getArticleByTag(params) {
  let url='/article/find';
  return getHttp(url,params)
}

//获取标签
export function getTag() {
  let url='/tag/taglist';
  return getHttp(url)
}

//获取标签
export function getTagTotal() {
  let url='/article/eachtotal';
  return getHttp(url)
}

//搜索
export function search(params) {
  let url='/article/search';
  return getHttp(url,params)
}
