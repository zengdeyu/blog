<template>
  <div class="tag">
    <div class="slowIn">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {getTagTotal} from "../../api/article";
  export default {
    name: 'm-tag',
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
      // selectItem(e) {
      //   console.log(e.currentTarget.getAttribute('data-tag'));
      //   this.$router.push({
      //     path: `/tag/${e.currentTarget.getAttribute('data-tag')}`
      //   })
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .tag{
    overflow hidden
  }
  .slowIn {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInLeft;
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(0, 8%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
