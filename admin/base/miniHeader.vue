<template>
  <Icon type="md-menu" @click="showMenu"/>
</template>

<script>
  import Bus from '../common/js/eventBus'

  export default {
    name: "miniHeader",
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      showMenu() {
        this.isShow=!this.isShow;
        Bus.$emit('showmenu',this.isShow)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
