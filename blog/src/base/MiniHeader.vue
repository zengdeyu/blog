<template>
  <div class="miniHeader">
    <Row class="header" type="flex" justify="space-between">
      <Col class="menu" :xs="3" :md="0" :xl="0" @click.native="showList">
        <Row type="flex" justify="center" align="middle">
          <Col>
            <i class="iconfont iconlist"></i>
          </Col>
        </Row>

      </Col>
      <Col class="title" :xs="18" :md="0" :xl="0">
        <Row type="flex" justify="center" align="middle">
          <Col>

          </Col>
        </Row>
      </Col>
      <Col class="search" :xs="3" :md="0" :xl="0" @click.native="$router.push('/search')">
        <Row type="flex" justify="center" align="middle">
          <Col>
            <i class="iconfont iconsearch-line"></i>
          </Col>
        </Row>
      </Col>
    </Row>
    <transition name="slideIn" tag="div">
      <Row class="bar" v-show="listFlag" >
        <Col :xs="{span:20,offset:4}" @click.native="showList">
          <router-link tag="div" to="/article"><i class="iconfont iconhome-line"></i>文章</router-link>
        </Col>
        <Col :xs="{span:20,offset:4}" @click.native="showList">
          <router-link tag="div" to="/tag"><i class="iconfont iconlink"></i>标签</router-link>
        </Col>
        <Col :xs="{span:20,offset:4}" @click.native="showList">
          <router-link tag="div" to="/tool"><i class="iconfont iconsend-line"></i>杂项</router-link>
        </Col>
        <Col :xs="{span:20,offset:4}" @click.native="showList">
          <router-link tag="div" to="/music"><i class="iconfont iconyinle"></i>音乐</router-link>
        </Col>
        <Col :xs="{span:20,offset:4}" @click.native="showList">
          <router-link tag="div" to="/search"><i class="iconfont iconsearch-line"></i>搜索</router-link>
        </Col>
        <Col :xs="{span:20,offset:4}" @click.native="showList">
          <router-link tag="div" to="/about"><i class="iconfont iconnote"></i>关于</router-link>
        </Col>
      </Row>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "MiniHeader",
    data() {
      return {
        listFlag: false
      }
    },
    methods: {
      showList() {
        this.listFlag = !this.listFlag;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"

  .miniHeader {

    .header {
      height 56px
      background-color $color-black

      .menu, .title, .search {
        & > div {
          height 100%
        }
      }

      .menu, .search {
        i {
          font-size 24px
        }

      }

      .title {
        font-size 14px
      }
    }

    .bar {
      width 35%
      position absolute
      top 56px
      left 0
      background-color $color-black
      z-index 1000
      font-size 14px
      padding 16px 0
      overflow hidden
      & > div {
        padding 5px 0

        i {
          margin-right 26px
        }
      }

      & > div:hover {
        color $color-c
      }
    }
  }
  .slideIn-enter{
    height:16px
  }
  .slideIn-enter-to,.slideIn-leave{
    height:188px
  }
  .slideIn-enter-active,.slideIn-leave-active{
    -webkit-transition: all 0.3s linear
    -moz-transition: all 0.3s linear
    -ms-transition: all 0.3s linear
    -o-transition: all 0.3s linear
    transition: all 0.3s linear
  }
  .slideIn-leave-to{
    height 0
  }
</style>
