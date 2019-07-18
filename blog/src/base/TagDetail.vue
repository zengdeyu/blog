<template>
  <div class="tagdetail">
    <Row v-for="(item,index) in data" :key="index" class="detailItem">
      <Col :data-id="item._id" @click.native.stop="selectItem" class="itemTitle" :xs="{span:22,offset:1}" :md="{span:21,offset:2}" :xl="{span:21,offset:2}">
        {{item.title}}--{{item.publishDate.substr(0,10)}}
      </Col>
    </Row>

  </div>
</template>

<script>
  import {getArticleByTag} from "../../api/article";

  export default {
    name: "TagDetail",
    data() {
      return {
        data:{}
      }
    },
    mounted() {
      getArticleByTag(this.$route.params).then(res=>{
        this.data=res.data;
      })
    },
    methods:{
      selectItem(e){
        this.$router.push({
          name:'read',
          params:{id:e.currentTarget.getAttribute('data-id')}
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
@import "../common/stylus/variable.styl"
  .detailItem{
    padding 10px 0
    font-size 16px
    color $color-black
    cursor pointer
    &:hover{
      color $color-blue
      background-color #eee
    }
    .itemTitle{
      line-height 1.6
      cursor pointer
    }
  }
</style>
