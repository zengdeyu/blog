<template>
  <Row>
    <Col class="Progress" @click.native="progressClick">
      <div ref="bar" class="progressBar" >
        <div class="ProgressLine" ref="progress"></div>
      </div>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "Progress",
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    methods:{
      progressClick(e){
        const per=e.x/this.$refs.bar.clientWidth;
        this.$refs.progress.style.width = `${e.x}px`
        this.$emit('progressChange',per);
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0) {
          const barWidth = this.$refs.bar.clientWidth;
          this.$refs.progress.style.width = `${newPercent * barWidth}px`
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable.styl"
  .Progress {
    height 3px
    background-color $color-c
    border-radius 2px
    cursor pointer

    .progressBar {
      width 100%
    }

    .ProgressLine {
      height 3px
      background-color $color-red
      border-radius 2px
    }
  }
</style>
