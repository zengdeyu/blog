<template>
  <Row class="item">
    <Col :xs="12" :md="6" :xl="6" v-for="(item,index) in data" :key="index">
      <p class="tag_name" :data-tag="item._id[0]" @click="selectItem">
        <span>{{item._id[0]}}</span>
        <i>({{item.num}})</i>
      </p>
    </Col>
  </Row>
</template>

<script>

  import {getTagTotal} from "../../api/article";

  export default {
    name: "TagList",
    data() {
      return {
        data: {}
      }
    },
    mounted() {
      getTagTotal().then(total => {
        this.data = total.data
      })
    },
    methods: {
      selectItem(e) {
        this.$router.push({
          path: `/tag/${e.currentTarget.getAttribute('data-tag')}`
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable.styl"
  .item {
    margin-bottom 20px

    .tag_name {
      text-align center
      cursor pointer

      & i, & span {
        color $color-6
        font-size 22px
      }

      &:hover i, &:hover span {
        color $color-blue
      }
    }
  }
</style>
