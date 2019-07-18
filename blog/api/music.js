import {getHttp} from "./baseHttp";
import {platform,discId} from "./sourceConfig";



//获取歌单
export function getDisc(musicSource,todo,params) {
  let varriable=platform[musicSource][todo];
  let url=`/${musicSource}/${varriable}`;
  return getHttp(url,params)
}


//获取歌词
export function  getLyric(url) {
  return getHttp(url)
}
