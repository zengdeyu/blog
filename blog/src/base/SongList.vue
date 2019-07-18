<template>
  <Row>
    <Col class="song">
      <Row class="title" type="flex" align="middle">
        <Col :xs="2" :md="2" :xl="2">*</Col>
        <Col :xs="8" :md="8" :xl="8">歌名</Col>
        <Col :xs="6" :md="6" :xl="6">歌手</Col>
        <Col :xs="5" :md="5" :xl="5">时长</Col>
        <Col :xs="3" :md="3" :xl="3">操作</Col>
      </Row>
      <Row class="list" v-for="(item,index) in songs" :key="item.id"
           @click.native="SelectItem(item,index)" :data-source="item.source">
        <Col :xs="2" :md="2" :xl="2">{{parseInt(index)+1}}</Col>
        <Col :xs="8" :md="8" :xl="8">{{item.name}}</Col>
        <Col :xs="6" :md="6" :xl="6">{{item.singer}}</Col>
        <Col :xs="5" :md="5" :xl="5">{{formatTime(item.time)}}</Col>
        <Col :xs="3" :md="3" :xl="3"><i class="iconfont icontianjia" @click.stop="addOne(item)"></i></Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
  import {mapActions} from 'vuex'
  import {insertSong} from "../store/actions";

  export default {
    name: "SongList",
    props: {
      songs: {}
    },
    data() {
      return {
        singer: ''
      }
    }
    ,
    methods: {
      SelectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      addOne(item) {
        this.insertSong(item);
      },
      formatTime(interval) {
        interval = interval | 0;
        const minute = interval / 60 | 0;
        const second = this._pad(interval % 60);
        return `${minute}:${second}`
      }, _pad(num, n = 2) {
        let len = num.toString().length;
        while (len < n) {
          num = '0' + num;
          len++;
        }
        return num;
      }
      ,
      ...mapActions([
        'selectPlay',
        'insertSong'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .song {

    padding 20px 0

    .title {
      margin 10px 0

      & > div {
        text-align center
      }
    }

    .list {
      cursor pointer

      & > div {
        text-align center
        margin 10px 0
        font-size 14px
      }

    }

  }

</style>
