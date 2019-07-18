<template>
    <Row class="footer" type="flex" align="middle" justify="center">
        <Col class="info">
            <span><a href="">网站备案号:蜀ICP备17020968号</a></span>
        </Col>
        <Col class="info">
            <span>已在线运行{{this.day}}天{{this.hour}}时{{this.minute}}分{{this.second}}秒</span>
        </Col>
    </Row>
</template>

<script>
    export default {
        name: "Footer",
        data(){
          return {
              hour:null,
              minute:null,
              second:null,
              day:null,
          }
        },
        mounted() {
          const createTime=new Date('2019/7/16 17:00:00');
          setInterval(()=>{
            let totalSecond=parseInt(new Date() - createTime) / 1000;
            let seconds=parseInt(totalSecond%60);
            let minute=parseInt(totalSecond/60);
            let hours=parseInt(totalSecond/3600);
            let day=parseInt(totalSecond/(24*3600));
            if(seconds<10){
              seconds='0'+seconds;
            }
            this.hour=hours%24;
            this.minute=minute%60;
            this.second=seconds;
            this.day=day;
          },1000)

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../common/stylus/variable.styl"
    .footer{
        background-color $color-white
        height 32px
        position fixed
        bottom 0
        width 100%
        z-index 10
        .info{
            margin 0 auto;
            font-size 12px;
            color #7e8c8d
        }
    }

</style>
