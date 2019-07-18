import * as types from './mutation-types'
import {sequenceList} from "./getters";

const mutations = {
  [types.SET_PLAYING_STATE](state,flag){
    state.playing=flag
  },
  [types.SET_FULL_SCREEN](state,flag){
    state.fullScreen=flag
  },
  [types.SET_PLAYLIST](state,list){
    state.playlist=list
  },
  [types.SET_SEQUENCE_LIST](state,list){
    state.sequenceList=list
  },
  [types.SET_PLAY_MODE](state,mode){
    state.playMode=mode
  },
  [types.SET_CURRENT_INDEX](state,index){
    state.currentIndex=index
  },
};

export default mutations
