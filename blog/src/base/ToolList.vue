<template>
  <div class="toolList">
    <Row class="tool slowIn" type="flex" v-for="(item,index) in articles" :key="index">
      <Col class="ALeft" :xs="0" :md="11" :xl="8">
        <img :src="item.img" alt="">
      </Col>
      <Col class="ARight" :xs="24" :md="13" :xl="16">
        <Row>
          <Col class="title" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
            {{item.title}}
          </Col>
        </Row>
        <Row>
          <Col class="info" :xs="{span:21,offset:2}" :md="{span:21,offset:2}" :xl="{span:21,offset:2}">
            {{item.subTitle}}
          </Col>
        </Row>
        <Row>
          <Col class="button">
            <Row type="flex" align="middle">
              <Col :xs="{span:7,offset:1}" :md="{span:7,offset:2}" :xl="{span:5,offset:2}">
                <Row type="flex" justify="center">
                  <Col>
                    <i class="iconfont iconcalendar-line"></i>
                    <span>{{item.publishDate.substr(0,10)}}</span>
                  </Col>
                </Row>
              </Col>
              <Col :xs="4" :md="4" :xl="5">
                <Row type="flex" justify="center">
                  <Col>
                    <i class="iconfont iconcheck-line"></i>
                    <span>{{item.lookNum}}</span>
                  </Col>
                </Row>

              </Col>
              <Col :xs="4" :md="4" :xl="5">
                <Row type="flex" justify="center">
                  <Col>
                    <i class="iconfont iconfill"></i>
                    <span>{{item.commentNum}}</span>
                  </Col>
                </Row>

              </Col>
              <Col :xs="{span:5,offset:1}" :md="5" :xl="{span:5,offset:1}">
                <Row type="flex" justify="center">
                  <Col>
                    <Button type="primary" :data-id="item._id" @click="selectItem">
                      Read More
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "ArticleList",
    props: {
      articles: {}
    },
    methods: {
      selectItem(e) {
        this.$router.push({
          name: 'readtool',
          params: {id: e.currentTarget.getAttribute('data-id')}
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .toolList {
    overflow hidden

    .tool {
      margin-bottom 40px
      position relative

      .ALeft {
        img {
          width auto
          height auto
          max-width 100%
          max-height 100%
        }
      }

      .ARight {
        padding 15px 0

        .title {
          font-size 16px
          line-height 1.6
          color $color-black
        }

        .info {
          font-size 14px
          color $color-6
          line-height 1.6
          padding 25px 0
          max-height 140px
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .button {
          i {
            font-size 16px
          }

          span {
            font-size 14px
          }

          button {
            border-color $color-red
            background-color $color-red
          }
        }
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
