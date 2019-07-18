import {playMode} from '../common/js/config'
import {loadSearch, loadPlay, loadFavorite} from '../common/js/cache'

const state = {
  playing:false,
  fullScreen:false,
  playlist:[],
  //顺序播放列表
  sequenceList:[],
  playMode:playMode.sequence,
  //当前播放索引
  currentIndex:-1,
}

export default state
