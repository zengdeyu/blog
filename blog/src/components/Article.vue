<template>
  <div class="article" ref="article">
    <ArticleList v-if="data" :articles="data"></ArticleList>
    <router-view></router-view>
  </div>
</template>

<script>
  import ArticleList from '../base/ArticleList'
  import {getArticleList} from "../../api/article";

  export default {
    name: "Article",
    data() {
      return {
        data: [],
        last_id: null
      }
    },
    components: {
      ArticleList
    },
    mounted() {
      var _that = this;
      window.addEventListener("scroll", function (event) {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let bottom = document.documentElement.scrollHeight - (document.documentElement.clientHeight + scrollTop);
        if (bottom <= 60) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            getArticleList({lastId: _that.last_id}).then(res => {
              if (res.data.length > 0) {
                for (let item of res.data) {
                  _that.data.push(item);
                }
                _that.last_id = res.data[res.data.length - 1]._id;
              }
            }).catch(err => {
              console.log(err)
            })
          }, 100)

        }
      });
    },
    methods: {},
    created() {
      getArticleList({lastId: this.last_id}).then(res => {
        this.data = res.data;
        this.last_id = this.data[this.data.length - 1]._id;
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
