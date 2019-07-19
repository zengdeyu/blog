<template>
  <Row class="articleDetail slowIn" type="flex">
    <Col class="miniBar" :xs="0" :md="0" :xl="0">
      <MiniBar></MiniBar>
    </Col>
    <Col class="Article" :xs="24" :md="24" :xl="19">
      <Row>
        <Col class="date">{{date.substr(0,10)}}</Col>
        <Col class="title">{{title}}</Col>
        <Col class="aImg" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
          <img :src="img" alt="">
        </Col>
        <Col class="content" v-html="content" :xs="{span:22,offset:1}" :md="{span:22,offset:1} "
             :xl="{span:22,offset:1}"></Col>
      </Row>
    </Col>
      <Col class="sideBar" ref="sideBar" :xs="0" :md="0" :xl="5">
        <ArticleSearch></ArticleSearch>
        <Row class="list">
          <Col class="tip" :xs="{span:20,offset:2}" :md="{span:20,offset:2}" :xl="{span:20,offset:2}">文章列表</Col>
          <Col class="item" v-for="(item,index) in data" :key="index"  :xs="{span:20,offset:2}" :md="{span:20,offset:2}" :xl="{span:20,offset:2}">
            <Row :data-id="item._id" @click.native="selectItem">
              <Col class="itemTime">{{item.publishDate.substr(0,10)}}</Col>
              <Col class="itemTitle" >{{item.title}}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row class="viewMore">
          <Col :xs="{span:20,offset:2}" :md="{span:20,offset:2}" :xl="{span:20,offset:2}">view More...</Col>
        </Row>
      </Col>
  </Row>
</template>

<script>
  import SimpleMDE from "simplemde"
  import "simplemde/dist/simplemde.min.css"
  import MiniBar from '../base/ArticleBar'
  import ArticleSearch from '../base/ArticleSearch'
  import {getArticleById,getArticleList} from "../../api/article";

  export default {
    name: "ArticleDetail",
    components: {
      MiniBar,
      ArticleSearch
    },
    data() {
      return {
        title: '',
        date: '',
        img: '',
        content: '',
        data:{},
      }
    },
    created() {
      getArticleList().then(res=>{
        this.data=res.data;
      }).catch(err=>{
        console.log(err)
      });

    },
    mounted() {
      this.getArticle();
    },
    methods: {
      getArticle(){
        getArticleById(this.$route.params).then(res => {
          this.title = res.data.title;
          this.date = res.data.publishDate;
          this.img = res.data.img;
          this.content =SimpleMDE.prototype.markdown(res.data.content);
        }).catch(err => {
          console.log(err)
        })
      },
      selectItem(e) {
        this.$router.push({
          name:'read',
          params:{id:e.currentTarget.getAttribute('data-id')}
        });
        this.getArticle();
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"

  .articleDetail {
    width 100%
    overflow hidden
    padding-bottom 60px
    .miniBar {
      height 60px
      background-color $color-black

    }

    .Article {
      height 100%
      background-color $color-white
      padding-top 60px

      .date, .title {
        text-align center
      }

      .date {
        font-size 12px
        text-decoration underline
        color $color-blue
      }

      .title {
        font-size 16px
        font-weight bold
        margin 20px
        margin-bottom 60px
        line-height 1.6
      }

      .aImg {
        img {
          width 100%
          min-height 100%
        }
      }
      .content{
        &>>>h1{
          font-size 24px
        }
        &>>>h2{
          font-size 22px
        }
        &>>>h3{
          font-size 20px
        }
        &>>>h4{
          font-size 18px
        }
        &>>>h5{
          font-size 16px
        }
        &>>>h6{
          font-size 14px
        }
        &>>>h1,&>>>h2,&>>>h3,&>>>h4,&>>>h5,&>>>h6{
          font-weight bold
          padding 20px 0
        }
        &>>>p{
          padding 10px
          line-height 1.4
          position relative
          img{
            max-width 100%
            min-height 100%
            display block
            margin 0 auto
          }
        }
        &>>>pre{
          padding 15px
          line-height 1.2
          background-color $color-black
          color $color-blue
          overflow-x scroll
          -ms-overflow-style: none; //IE 10+
          overflow: -moz-scrollbars-none; //Firefox
        }
        &>>>pre::-webkit-scrollbar{
          display none
        }
        &>>>li{
          padding 5px
          font-size 18px
        }
      }
    }

    .sideBar {
      background-color black
      padding-bottom 15px
      position fixed
      right 0
      .list {
        .tip {
          margin-bottom 20px
          font-size 14px
          color $color-c
        }

        .item {
          font-size 12px
          color $color-c
          cursor pointer
          padding 5px 0

          & > div:hover {
            color $color-white
          }

          .itemTime {
            margin 5px 0
          }

          .itemTitle {
            line-height 1.4
          }
        }

      }

      .viewMore {
        font-size 12px
        color $color-c
        cursor pointer
        margin-top 15px

        &:hover {
          color $color-white
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
