<template>
  <Row class="PlayerBar" v-show="playlist.length>0">
    <Col>
      <ProgressBar :percent="percent" @progressChange="onprocessChange"></ProgressBar>
    </Col>
    <Col>
      <Row>
        <Col class="info" :xs="14" :md="6" :xl="6">
          <Row type="flex">
            <Col class="img">
              <img :src="currentSong.pic" alt="">
            </Col>
            <Col :xs="16" :md="18" :xl="18">
              <Row type="flex" align="middle">
                <Col class="song" :xs="{span:23,offset:1}" :md="{span:23,offset:1}" :xl="{span:23,offset:1}">
                  {{currentSong.name}}
                </Col>
                <Col class="author" :xs="{span:23,offset:1}" :md="{span:23,offset:1}" :xl="{span:23,offset:1}">
                  {{currentSong.singer}}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col class="control" :xs="10" :md="12" :xl="12">
          <Row type="flex" justify="center" align="middle">
            <Col class="order" :xs="0" :md="3" :xl="2" @click.native="changeMode">
              <i class="iconfont" :class="iconMode"></i>
            </Col>
            <Col class="prev" :xs="{span:6}" :md="3" :xl="2">
              <i class="iconfont iconbackward" @click="prev"></i>
            </Col>
            <Col class="play" :xs="{span:6}" :md="3" :xl="2">
              <i class="iconfont" :class="playIcon" @click="togglePlaying"></i>
            </Col>
            <Col class="next" :xs="{span:6}" :md="3" :xl="2">
              <i class="iconfont iconforward" @click="next"></i>
            </Col>
            <Col class="list" :xs="{span:6,offset:0}" :md="3" :xl="2">
                <i class="iconfont iconflow-line" @click.stop="ShowPlayList"></i>
            </Col>
          </Row>
        </Col>
        <Col class="volume" :xs="0" :md="6" :xl="6">
          <Row type="flex" justify="center" align="middle">
            <Col :xs="0" :md="3" :xl="2">
              <i class="iconfont iconvolume"></i>
            </Col>
            <Col :xs="0" :md="10" :xl="8">
              <Slider v-model="myvolume" :tip-format="format" :step="10"></Slider>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
    <div class="bar" v-show="listFlag">
      <Row type="flex" justify="center">
        <Col class="content" :xs="23" :md="20" :xl="22">
          <Carousel v-if="listFlag" style="" v-model="value1" :arrow="arrow" :radius-dot="showdot">
            <CarouselItem style="padding-bottom: 20px" >
              <Scroll :data="sequenceList" ref="listContent" style="max-height: 400px;overflow: hidden;">
                <transition-group ref="list" tag="div">
                  <Row ref="listItem" type="flex" justify="center" class="list" v-for="(item,index) in sequenceList"
                       :data-id="item.id"
                       :key="item.id"
                       @click.native="SelectItem(item,index)" :data-source="item.source">
                    <Col :xs="2" :md="2" :xl="4"><i class="iconfont" :class="getCurrentIcon(item)"></i></Col>
                    <Col :xs="8" :md="8" :xl="6">{{item.name}}</Col>
                    <Col :xs="6" :md="6" :xl="6">{{item.singer}}</Col>
                    <Col :xs="3" :md="3" :xl="2"><i class="iconfont icondelete" @click.stop="deleteOne(item)"></i></Col>
                  </Row>
                </transition-group>
              </Scroll>
            </CarouselItem>
            <CarouselItem style="padding-bottom: 20px">
              <Scroll ref="lyricList" v-if="currentLyric" :data="currentLyric.lines"
                      style="max-height: 400px;overflow: hidden;">
                <div class="lyricWrapper">
                  <div class="Lyric" v-if="currentLyric">
                    <p class="lyricLine" :class="{'current':currentLineNum===index}" ref="lyricLine"
                       v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
                  </div>
                </div>
              </Scroll>
            </CarouselItem>
          </Carousel>
        </Col>
      </Row>
    </div>
    <audio id="audio" style="display: none" ref="audio" :src="currentSong.url" controls @canplay="ready" @error="error"
           @timeupdate="updateTime"
           @ended="end"></audio>
  </Row>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {getDisc,getLyric} from "../../api/music";
  import {currentIndex, playing, sequenceList} from "../store/getters";
  import {SET_CURRENT_INDEX, SET_PLAY_MODE, SET_PLAYING_STATE, SET_PLAYLIST} from "../store/mutation-types";
  import ProgressBar from '../base/Progress'
  import {playMode} from "../common/js/config";
  import {shuffle} from "../common/js/util";
  import Scroll from '../base/Scroll';
  import Lyric from 'lyric-parser'

  export default {
    name: "Player",
    components: {
      ProgressBar,
      Scroll,
    },
    data() {
      return {
        pic: '',
        musicUrl: '',
        musicId: '',
        songReady: false,
        currentTime: 0,
        myvolume: 100,
        listFlag: false,
        value1: 0,
        showdot: true,
        currentLyric: null,
        currentLineNum: 0,
        arrow:'always'
      }
    },
    methods: {
      format(val) {
        return '音量:' + val + '%';
      },
      ShowPlayList() {
        this.listFlag = !this.listFlag;
        if (this.listFlag === true) {
          setTimeout(() => {
            this.$refs.listContent.refresh();
          }, 20);
          clearTimeout(this.timer3);
          this.timer3=setTimeout(()=>{
            this.scrollToCurrent(this.currentSong);
          },100)

        }
      },
      getCurrentIcon(item) {
        if (this.currentSong.id === item.id) {
          return 'iconlink-line'
        }
        return ''
      },
      SelectItem(item, index) {
        if (this.playMode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === item.id;
          })
        }
        this.setCurrentIndex(index);
        this.setPlayingState(true)
      },
      deleteOne(item) {
        this.deleteSong(item)
      },
      handleLyric({lineNum, txt}) {
        if(this.listFlag){
          this.currentLineNum = lineNum;
          clearTimeout(this.timer2);
          if (lineNum > 5) {
            let lineEl = this.$refs.lyricLine[lineNum - 6];
            this.$refs.lyricList.scrollToElement(lineEl, 1000)
          } else {
            this.timer2=setTimeout(() => {
              this.$refs.lyricList.scrollTo(0, 0, 1000)
            }, 6000)
          }
        }
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing);
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      }
      ,
      next() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
        } else {
          let index = this.currentIndex + 1;
          if (index === this.playlist.length) {
            index = 0;
          }
          this.setCurrentIndex(index);
          if (!this.playing) {
            this.togglePlaying()
          }
        }

        this.songReady = false;
      }
      ,
      prev() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop();
        } else {
          let index = this.currentIndex - 1;
          if (index === -1) {
            index = this.playlist.length - 1;
          }
          this.setCurrentIndex(index);
          if (!this.playing) {
            this.togglePlaying()
          }
        }

        this.songReady = false;
      },
      ready() {
        this.songReady = true;
        this.$refs.audio.volume = this.myvolume / 100;
      },
      error() {
        this.songReady = true;
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      formatTime(interval) {
        interval = interval | 0;
        const minute = interval / 60 | 0;
        const second = this._pad(interval % 60);
        return `${minute}:${second}`
      },
      onprocessChange(percent) {
        const currentTime = this.currentSong.time * percent;
        this.$refs.audio.currentTime = currentTime;
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      changeMode() {
        const mode = (this.playMode + 1) % 3;
        this.setPlayMode(mode);
        let list = null;
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList;
        }
        this.resetCurrentIndex(list);
        this.setPlayList(list);
      },
      resetCurrentIndex(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      loop() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      end() {
        if (this.playMode === playMode.loop) {
          this.loop();
        } else {
          this.next()
        }
      },
      _pad(num, n = 2) {
        let len = num.toString().length;
        while (len < n) {
          num = '0' + num;
          len++;
        }
        return num;
      },
      scrollToCurrent(current){
        const index=this.sequenceList.findIndex((song)=>{
          return current.id===song.id;
        });
        this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index],600);
      },
      ...mapMutations({
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST'
      }),
      ...mapActions([
        'deleteSong'
      ])
    },

    computed: {
      playIcon() {
        return this.playing ? 'iconpause' : 'iconplay'
      },
      percent() {
        return this.currentTime / this.currentSong.time;
      },
      iconMode() {
        return this.playMode === playMode.sequence ? 'iconshunxubofang' : this.playMode === playMode.loop ? 'icondanquxunhuan' : 'iconsuijibofang'
      }
      ,
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIndex',
        'playMode',
        'sequenceList'
      ])
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
        }
        clearTimeout(this.timer);
        this.timer=setTimeout(() => {
          getLyric(this.currentSong.lrc).then(res => {
            this.currentLyric = new Lyric(res, this.handleLyric);
            if (this.playing) {
              this.currentLyric.play()
            }
          }).catch(() => {
            this.currentLyric = null;
            this.currentLineNum = 0;
          })
          this.$refs.audio.play()
        }, 1000);

        if(!this.listFlag||newSong.id===oldSong.id){
          return
        }
        this.scrollToCurrent(newSong);
      },
      playing(newPlaying) {
        const audio = this.$refs.audio;
        this.$nextTick(()=>{
          newPlaying ? audio.play() : audio.pause();
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"


  .PlayerBar {
    position fixed
    bottom 0
    width 100%
    height 53px
    background-color $color-black
    z-index 100
    .info, .control, .volume {
      height 50px
    }

    .info {
      img {
        width 50px
        height 50px
      }

      .song {
        font-size 14px
        color $color-white
        margin-top 8px
        margin-bottom 6px
        white-space nowrap
        text-overflow ellipsis
      }

      .author {
        font-size 12px
        color $color-c
        white-space nowrap
        text-overflow ellipsis
      }
    }

    .control {
      & > div {
        height 100%
      }

      i {
        cursor pointer
        text-align center
      }

      .order, .prev, .next, .list {
        text-align center

        i {
          font-size 20px
        }
      }

      .play {
        text-align center

        i {
          font-size 22px
        }

      }
    }

    .volume {
      & > div {
        height 100%
      }

      i {
        font-size 18px
        cursor pointer
      }
    }
  }
  .bar {
    position absolute
    width 100%
    height 440px
    bottom 53px
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
        padding 8px 0
      }

      .current {
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
