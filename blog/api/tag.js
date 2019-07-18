import {getHttp} from "./baseHttp";

//获取标签列表
export function getTagList() {
  let url='/tag/taglist';
  return getHttp(url)
}
