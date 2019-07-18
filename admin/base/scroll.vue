<template>
  <div ref="wrapper" class="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from '@better-scroll/core'

  export default {
    name: "scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        defaulut: false
      },
      beforeScrool: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted() {
      setTimeout(() => {
        this.init();
      }, 20)
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
          probeType: 3 // listening scroll hook
        })
        this._registerHooks(['scroll', 'scrollEnd'], (pos) => {
          console.log('done')
        })
      },
      clickHandler(item) {
        alert(item)
      },
      _registerHooks(hookNames, handler) {
        hookNames.forEach((name) => {
          this.bs.on(name, handler)
        })
      }
    ,
    refresh() {
      this.scroll && this.scroll.refresh()
    }

    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    },
  }
</script>

<style scoped lang="stylus">
  .wrapper{
    position: fixed;
    height: 100%;
    top: 106px;
  }
</style>
