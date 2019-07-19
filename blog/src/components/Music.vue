<template>
  <div class="music">
    <Tabs :value="source" @on-click="selectPlatform">
      <TabPane label="qq音乐" name="tencent">
        <keep-alive>
          <MusicItem v-if="data" :songs="data"></MusicItem>
        </keep-alive>
      </TabPane>
      <TabPane label="网易云音乐" name="netease">
        <keep-alive>
          <MusicItem v-if="data" :songs="data"></MusicItem>
        </keep-alive>
      </TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>
<script>
  import MusicItem from '../base/MusicItem'
  import {getDisc} from "../../api/music";
  import {formatDiscs} from "../common/js/songTools";

  export default {
    name: 'Music',
    components: {
      MusicItem
    },
    data() {
      return {
        pageTitle: '音乐',
        source: 'tencent',
        data: {},
        currentPage: 1,
        getflag: true
      }
    },
    mounted() {
      var _that = this;
      window.addEventListener("scroll", function (event) {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let bottom = document.documentElement.scrollHeight - (document.documentElement.clientHeight + scrollTop);
        if (bottom <= 60) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            if (_that.getflag === true) {
              let params = {};
              if (_that.source === 'tencent') {
                params = {
                  categoryId: 10000000, sortId: 5, pageSize: 15, page: _that.currentPage + 1
                }
              } else{
                params = {
                  cat: '全部',
                  pageSize: 15,
                  page: _that.currentPage + 1
                }
              }
              getDisc(_that.source, 'hot', params).then(res => {
                let listData = formatDiscs(_that.source, res.data);
                for (let item of listData) {
                  _that.data.push(item);
                }
                _that.getflag = true;
              }).catch(e => {
                console.log(e)
              })
            }
            _that.getflag = false
          }, 100)

        }
      });
    },
    created() {
      this.getList(this.source, 'hot', {categoryId: 10000000, sortId: 5, pageSize: 15, page: this.currentPage});
    },
    methods: {
      getList(source, todo, params) {
        getDisc(source, todo, params).then(res => {
          this.data = formatDiscs(this.source, res.data)
        }).catch(e => {
          console.log(e)
        })
      },
      selectPlatform(name) {
        this.source = name;
        switch (this.source) {
          case "tencent": {
            let params = {
              categoryId: 10000000,
              sortId: 5,
              pageSize: 15,
              page: 1
            };
            this.getList(this.source, 'hot', params);
            break
          }
          case 'netease': {
            let params = {
              cat: '全部',
              pageSize: 45,
              page: 0
            };
            this.getList(this.source, 'hot', params);
            break
          }
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
