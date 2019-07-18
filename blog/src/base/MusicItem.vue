<template>
  <Row :gutter="36">
    <Col :xs="12" :md="8" :xl="6" v-for="(item,index) in songs" :key="index" :data-type="item.source" :data-id="item.id" @click.native="selectItem">
      <Row class="item">
        <Col class="img">
          <img :src="item.dissPic" alt="">
        </Col>
        <Col class="info">
          <p class="name">{{item.disName}}</p>
          <p class="author">{{item.author}}</p>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "music-item",
    props:{
      songs:{}
    },
    methods:{
      selectItem(e){
        this.$router.push({
          name:'musicmenu',
          query:{
            id:e.currentTarget.getAttribute('data-id'),
            type:e.currentTarget.getAttribute('data-type')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .item {
    margin 20px 0
    cursor pointer
    .img {
      img {
        width 200px
        height 200px
        border-radius 4%
      }
    }

    .info {
      padding-left 10px

      .name {
        font-size 14px
        color $color-black
        max-width  210px
        margin 6px 0
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      }

      .author {
        font-size 12px
        color $color-6
      }
    }
  }

</style>
