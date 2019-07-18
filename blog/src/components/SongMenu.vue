<template>
  <div class="bar">
    <Row type="flex" justify="center">
      <Col class="content" ref="content" :xs="23" :md="20" :xl="18">
        <Row class="intro" type="flex">
          <Col class="img" :xs="8" :md="7" :xl="5">
            <img :src="data.pic" alt="">
          </Col>
          <Col class="song" :xs="16" :md="14" :xl="19">
            <Row type="flex" justify="space-between">
              <Col class="name" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
                {{data.name}}
              </Col>
              <Col class="author" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
                {{author}}
              </Col>
              <Col class="info" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}"
                   v-html="data.desc"></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <SongList :songs="songs"></SongList>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import SongList from '../base/SongList'
  import {getDisc} from "../../api/music";
  import {formatSongs,formatDiscInfo} from "../common/js/songTools";

  export default {
    name: "SongMenu",
    components: {
      SongList
    },
    data() {
      return {
        source: '',
        data: {},
        author: '',
        songs: {}
      }
    },
    created(){
      this.source = this.$route.query.type;
      getDisc(this.source, 'songList', {id: this.$route.query.id}).then(res => {
        this.data=formatDiscInfo(this.source,res.data);
      }).catch(err => {
        console.log(err)
      })
      getDisc(this.source, 'songList', {id: this.$route.query.id,format:1}).then(res => {
        this.songs=res.data;
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"

  .bar {
    width 100%
    background-color $color-black
    .header {
      height 60px
      position fixed
      width 100%
      z-index 1000
      background-color $color-black

      .close {
        i {
          font-size 44px
          color: $color-c
          font-weight bold
          cursor pointer
        }
      }
    }
  }

  .content {
    margin-top 110px
    background-color $color-black
    padding-bottom 30px
    .intro {
      height auto
      .img {
        border-radius 5%

        img {
          max-width 200px
          max-height 200px
          border-radius 5%
          width 100%
        }
      }

      .song {
        padding 5px 0

        & > div {
          height 100%

          .author {
            margin-top 10px
            margin-bottom 10px
          }

          .name {
            font-size 16px
          }

          .author {
            font-size 14px
          }

          .info {
            font-size 12px
            line-height 1.4
            max-height 34px
            overflow hidden
            text-overflow ellipsis
          }

          .button {
            position relative
            bottom -5px

            button {
              background-color $color-c
            }
          }
        }
      }
    }


  }
</style>
