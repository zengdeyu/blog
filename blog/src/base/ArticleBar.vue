<template>
  <div class="bar">
    <Row class="header" type="flex" align="middle" justify="center">
      <Col class="close" :xs="{span:3,offset:1}" :md="2">
        <i class="iconfont iconreturn"></i>
      </Col>
      <Col class="close" :xs="{span:3,offset:17}" :md="{span:2,offset:22}" :xl="{span:2,offset:22}">
        <i class="iconfont iconlist"></i>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "ArticleBar"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "../common/stylus/variable.styl"

  .bar {
    width 100%
    position fixed
    top 0
    left 0
    z-index 1000
    background-color $color-white

    .header {
      height 56px
      background-color $color-black

      .close {
        i {
          font-size 24px
          color: $color-c
          font-weight bold
          cursor pointer
        }
      }
    }
  }
</style>
