<template>
  <div ref="wrapper" class="scroll">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Slide from '@better-scroll/slide'
  BScroll.use(Slide);
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll=new BScroll(this.$refs.wrapper,{
          probeType: this.probeType,
          click: this.click,
          stopPropagation: true,

          scrollX: false,
          scrollY: true,
          slide: {
            loop: false,
            threshold: 10
          }
        })
      },
      enable(){
        this.scroll&&this.scroll.enable()
      },
      disable(){
        this.scroll&&this.scroll.disable()
      },
      refresh(){
        this.scroll&&this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch:{
      data(){
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped>

</style>
