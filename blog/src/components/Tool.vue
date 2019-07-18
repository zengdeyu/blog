<template>
  <div class="article">
    <ToolList v-if="data" :articles="data"></ToolList>
    <router-view></router-view>
  </div>
</template>

<script>
  import ToolList from '../base/ToolList'
  import {getTool} from "../../api/tool";

  export default {
    name: "Tool",
    data(){
      return{
        data:{},
        lastId:null
      }
    },
    components:{
      ToolList
    },
    methods:{
    },
  mounted() {
    var _that=this;
    window.addEventListener("scroll", function (event) {
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      let bottom=document.documentElement.scrollHeight-(document.documentElement.clientHeight + scrollTop);
      if(bottom<=60){
        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
          getTool({lastId:_that.lastId}).then(res => {
            if(res.data.length>0){
              for(let item of res.data){
                _that.data.push(item);
              }
              _that.lastId=res.data[res.data.length-1]._id;
            }
          }).catch(err => {
            console.log(err)
          })
        },100)

      }
    });
  },
    created() {
      getTool({lastId:this.lastId}).then(res => {
        this.data = res.data;
        this.lastId=this.data[this.data.length-1]._id;
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
