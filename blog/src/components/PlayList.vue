<template>
  <div class="bar" v-show="listFlag">
    <Row type="flex" justify="center">
      <Col class="content" :xs="23" :md="20" :xl="22">
        <Carousel v-if="listFlag" style="" v-model="value1" :radius-dot="showdot">
          <CarouselItem style="">
            <Scroll :data="sequenceList" ref="listContent" style="max-height: 380px;overflow: hidden; padding:20px 0">
              <div>
                <Row ref="listItem" type="flex" justify="center" class="list" v-for="(item,index) in sequenceList"
                     :data-id="item.id"
                     :key="index"
                     @click.native="SelectItem($event,item,index)" :data-source="item.source">
                  <Col :xs="2" :md="2" :xl="4"><i class="iconfont" :class="getCurrentIcon(item)"></i></Col>
                  <Col :xs="8" :md="8" :xl="6">{{item.songName}}</Col>
                  <Col :xs="6" :md="6" :xl="6">{{item.singer}}</Col>
                  <Col :xs="3" :md="3" :xl="2"><i class="iconfont icondelete" @click.stop="deleteOne(item)"></i></Col>
                </Row>
              </div>
            </Scroll>
          </CarouselItem>
          <CarouselItem>
            <Scroll ref="lyricList" style="max-height: 350px;overflow: hidden; padding:20px 0">
              <div class="lyricWrapper">
                <div class="Lyric" v-if="currentLyric">
                  <p class="lyricLine" :class="{'current':currentLineNum===index}" ref="lyricLine" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
                </div>
              </div>
            </Scroll>
          </CarouselItem>
        </Carousel>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="close" align="middle">
      <Col class="content" :xs="2" :md="3" :xl="4" @click.native="hide">
        <i class="iconfont iconclose-line"></i>
      </Col>
    </Row>
  </div>

</template>

<script>
  import SongList from '../base/SongList'
  import SongLyric from '../base/SongLyric'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {currentSong, playlist, sequenceList} from "../store/getters";
  import Scroll from '../base/Scroll'
  import {SET_CURRENT_INDEX, SET_PLAYING_STATE} from "../store/mutation-types";
  import {playMode} from "../common/js/config";
  import {getDisc} from "../../api/music";
  import Lyric from 'lyric-parser'

  export default {
    name: "PlayList",
    data() {
      return {
        listFlag: false,
        value1: 0,
        showdot: true,
        currentLyric: null,
        currentLineNum:0
      }
    },
    components: {
      SongList,
      SongLyric,
      Scroll
    },
    computed: {
      ...mapGetters([
        'sequenceList',
        'currentSong',
        'playlist',
        'playMode',
        'playing',
      ])
    }
    ,
    methods: {
      show() {
        this.listFlag = true;
        setTimeout(() => {
          this.$refs.listContent.refresh();
        }, 20)
      },
      hide() {
        this.listFlag = false
      },
      getCurrentIcon(item) {
        if (this.currentSong.id === item.id) {
          return 'iconlink-line'
        }
        return ''
      },
      SelectItem(e, item, index) {
        if (this.playMode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === e.currentTarget.getAttribute('data-id');
          })
        }
        this.setCurrentIndex(index);
        this.setPlayingState(true)
      },
      deleteOne(item) {
        this.deleteSong(item)
      },
      handleLyric(lineNum) {
        this.currentLineNum = lineNum;
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
      },
      ...mapMutations({
        'setCurrentIndex': 'SET_CURRENT_INDEX',
        'setPlayingState': 'SET_PLAYING_STATE'
      }),
      ...mapActions([
        'deleteSong'
      ])
    }
    ,
    watch: {
      currentSong() {

        getDisc(this.currentSong.source, 'lyric', {id: this.currentSong.id}).then(res => {
          this.currentLyric = new Lyric(res,this.handleLyric);
          if (this.playing) {
            this.currentLyric.play()
          }
        })
        if(this.currentLyric){
          this.currentLyric.stop();
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .bar {
    position absolute
    width 100%
    height 440px
    bottom 0
    z-index 999
    background-color rgba(1, 22, 39, 0.95)
    padding-top 20px

    .content {
      background-color $color-black
      position relative

      .list {
        cursor pointer

        &:hover {
          color #fff
        }

        & div {
          font-size 12px
          padding 5px 0
        }
      }

      .lyricLine {
        text-align center
        font-size 14px
        padding 6px 0
      }
      .current{
        color #fff
      }
    }

    .close {
      height 40px
      text-align center

      & i {
        font-size 18px
        color $color-white
        cursor pointer
      }
    }
  }


</style>
