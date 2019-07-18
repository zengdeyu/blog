<template>
  <div class="article">
    <Row>
      <Col class="bar">
        <Row type="flex" align="middle">
          <Col :xs="4" :md="4" :xl="2">日期</Col>
          <Col :xs="12" :md="12" :xl="14">标题</Col>
          <Col :xs="4" :md="4" :xl="4"><Input search placeholder="Enter something..."/></Col>
          <Col :xs="4" :md="4" :xl="4">
            <Button type="primary" @click="$router.push('/edit/new')" disabled>
              <Icon type="ios-plus-empty"></Icon>
              新建
            </Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row ref="articleId" v-for="(item ,index) in data" :key="index" class="list" type="flex" align="middle">
          <Col :xs="4" :md="4" :xl="2">{{item.publishDate.substr(0,10)}}</Col>
          <Col class="title" :xs="12" :md="12" :xl="14">{{item.title}}</Col>
          <Col :xs="4" :md="4" :xl="4">{{item.kind}}</Col>
          <Col :xs="4" :md="4" :xl="4">
            <Button type="warning" @click="sure" :data-id="item._id">
              修改
            </Button>
            <Button type="error" @click="drop" :data-id="item._id">
              删除
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {getDraftList,dropDraft} from "../../api/draft";

  export default {
    inject:['reload'],
    name: "articlelist",
    components: {},
    data() {
      return {
        data: {}
      }
    },
    mounted() {
      this.draftList()
    },
    methods: {
      draftList: function () {
        getDraftList().then(res => {
          this.data = res.data;
        })
      },
      sure(event) {
        this.$router.push({
          name: 'editDraft',
          params:{id:event.currentTarget.getAttribute('data-id')}
        })
      },
      drop(){
        let params={
          id:event.currentTarget.getAttribute('data-id')
        }
        dropDraft(params).then((res)=>{
          this.$Message.success(res.message)
          this.reload();
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .bar {
    background-color #eee

    & > div {
      padding 5px 0
    }
  }

  .list {
    padding 5px 0

    &:hover {
      background-color #eee
    }

    .title {
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    }
  }
</style>
