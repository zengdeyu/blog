import {getHttp} from "./baseHttp";


//获取工具列表
export function getTool(params) {
  let url='/tool/list';
  return getHttp(url,params);
}
//获取单篇工具
export function getToolById(params) {
  let url='/tool/detail';
  return getHttp(url,params)
}
