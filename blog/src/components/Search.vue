<template>
  <div class="search">
    <div class="slowIn">
      <Row class="toSearch" type="flex" justify="center">
        <Col :xs="14" :md="8" :xl="8">
          <Input ref="query" v-model="query" placeholder="搜索文章、音乐、歌手" clearable/>
        </Col>
      </Row>
      <Row class="searchContent">
        <Col>
          <Tabs ref="tabName" :value="tabs" @on-click="selectTab">
            <TabPane label="文章" name="name1">
              <Row>
                <Col class="artItem" :xs="{span:22,offset:1}" :md="{span:22,offset:2}" :xl="{span:22,offset:1}" v-if="!isshow" v-for="(item,index) in data" :key="index" :data-article="item._id" @click.native="selectArticle">
                  {{item.title}}
                </Col>
                <Col class="tips" :xs="{span:22,offset:1}" :md="{span:22,offset:2}" :xl="{span:22,offset:1}" v-if="isshow">
                  {{message}}
                </Col>
              </Row>
            </TabPane>
            <TabPane label="" name="name2">
            </TabPane>
            <TabPane label="音乐" name="name3">
              <Row class="source" type="flex" justify="center">
                <Col>
                  <RadioGroup v-model="platform">
                    <Radio label="qq音乐"></Radio>
                    <Radio label="酷狗音乐"></Radio>
                    <Radio label="网易音乐"></Radio>
                    <Radio label="酷我音乐"></Radio>
                  </RadioGroup>
                </Col>
              </Row>
              <Row class="result" v-if="songs">
                <Col class="resultItem" :xs="{span:22,offset:1}" :md="{span:22,offset:2}" :xl="{span:22,offset:1}"
                     v-for="(item,index) in songs" :key="index" :data-id="item.id"
                     @click.native="selectItem(item)"
                >
                  {{item.name}}-{{item.singer}}
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {search} from "../../api/article";
  import {debounce} from "../common/js/util";
  import {getDisc} from "../../api/music";
  import {mapActions} from 'vuex'
  import {insertSong} from "../store/actions";

  export default {
    name: "Search",
    data() {
      return {
        isShow: true,
        query:'',
        data:{},
        isshow:true,
        message:'搜索一下吧...',
        tabs:'name1',
        platform:'qq音乐',
        source:'',
        songs:null
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        if(newQuery!==''){
          this.isshow=false;
          //文章搜索
          if(this.tabs==='name1'){
            search({title:newQuery}).then(res=>{
              if(!res.data.length){
                this.message='暂无数据哟...';
                this.isshow=true
              }
              else{
                this.data=res.data
              }
            })
          }
          //歌曲搜索
          if(this.tabs==='name3'){
            this.choosePlatform(this.platform);
          }
        }
        else{
          this.message='搜索一下吧...';
          this.isshow=true
        }
      }, 600))
    },
    watch:{
      platform(newSource){
        if(this.query){
          this.choosePlatform(newSource);
        }
      }
    }
  ,
    methods: {
      hide() {
        this.isShow = false
      },
      selectArticle(e){
        this.$router.push({
          name:'read',
          params:{id:e.currentTarget.getAttribute('data-article')}
        })
      },
      selectTab(name){
        this.tabs=name;
        this.query=''
      },
      choosePlatform(platform){
        switch(platform) {
          case "qq音乐":{
            this.source='tencent';
            break;
          }
          case "酷狗音乐":{
            this.source='kugou';
            break;
          }
          case "网易音乐":{
            this.source='netease';
            break;
          }
          case "酷我音乐":{
            this.source='kuwo';
            break;
          }
        }
        let params={
          keyword:this.query,
          type:'song',
          pageSize:30,
          page:0,
          format:1
        };
        getDisc(this.source,'search',params).then(res=>{
          this.songs=res.data;
        })
      },
      selectItem(item){
        console.log(item)
        this.insertSong(item);
      }
    ,
      ...mapActions([
        'insertSong'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "../common/stylus/variable.styl"

  .search {
    overflow hidden
    .searchContent {
      margin-top 60px

      .artItem, .resultItem {
        font-size 14px
        color rgba(1, 22, 39, .8)
        cursor pointer
        padding 10px 0
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          color $color-black
          text-decoration underline
        }
      }
      .tips{
        text-align center
        font-size 14px
        color rgba(1, 22, 39, .8)
      }

      .source {
        padding-top 10px
      }

      .result {
        margin-top 10px
      }

    }
  }
  .slowIn {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInLeft;
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(0, 5%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
