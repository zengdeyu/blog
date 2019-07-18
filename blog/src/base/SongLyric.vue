<template>
  <Row class="Lyric" v-if="lyrics">
    <Col>
      <p ref="lyricLine" v-for="line in lyrics">{{line.txt}}</p>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "SongLyric",
    props: {
      lyrics:{}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "../common/stylus/variable.styl"

  .Lyric {

    li {
      font-size 14px
      text-align center
      line-height 1.8
    }

    .Lyactive {
      font-size 16px
      color $color-red
    }
  }
</style>
