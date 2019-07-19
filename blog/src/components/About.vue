<template>
  <div class="about">
    <div class="slowIn">
      <Row>
        <Col>
          <img src="../../static/1.jpg" alt="">
        </Col>
      </Row>
      <Row>
        <Col class="info">一些关于我的简介</Col>
      </Row>
      <Row type="flex">
        <Col class="left" :xs="12" :md="12" :xl="12">
          <Row>
            <Col class="contact">
              联系方式
            </Col>
          </Row>
          <Row class="detail">
            <Col>
              邮箱:1285351154@qq.com
            </Col>
            <Col>
              思否:1285351154@qq.com
            </Col>
            <Col>
              GitHub:1285351154@qq.com
            </Col>
          </Row>
        </Col>
        <Col class="right" :xs="12" :md="12" :xl="12">
          <Row>
            <Col class="linkTo">友情链接</Col>
          </Row>
          <Row class="detail">
            <Col><a href="">鼻子亲了脸</a></Col>
            <Col><a href="">小寒博客</a></Col>
            <Col><a href="">小伟博客</a></Col>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"

  .about {
    padding-bottom 20px
    overflow: hidden

    img {
      width 100%
      min-height 100%
    }

    .info {
      padding 20px 0
      font-size 16px
    }

    .contact, .linkTo {
      font-size 14px
      padding 10px 0
    }

    .detail {
      & > div {
        font-size 14px
        padding 5px 2px
        color #7e8c8d
      }
    }
  }

  .slowIn {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInLeft;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(0, 5%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
