<template>
  <div class="tag">
    <Row>
      <Col class="bar">
        <Row type="flex" align="middle">
          <Col :xs="4" :md="4" :xl="2">日期</Col>
          <Col :xs="12" :md="12" :xl="14">名称</Col>
          <Col :xs="4" :md="4" :xl="4"><Input search placeholder="Enter something..."/></Col>
          <Col :xs="4" :md="4" :xl="4">
            <Button type="primary" @click="$router.push('/edittag/new')">
              <Icon type="ios-plus-empty"></Icon>
              新建
            </Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row class="list" v-for="(item,index) in data" type="flex" align="middle" :key="index">
          <Col :xs="4" :md="4" :xl="2">{{item.createDate.substr(0,10)}}</Col>
          <Col :xs="12" :md="12" :xl="14">{{item.tagName}}</Col>
          <Col :xs="4" :md="4" :xl="4">{{item.tagAuthor}}</Col>
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
  import {getTags,deleteTag} from "../../api/tag";

  export default {
    inject:['reload'],
    name: "Tag",
    data(){
      return{
        data:{}
      }
    },
    mounted() {
      getTags().then(res=>{
        this.data=res.data
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      sure(event){
        this.$router.push({
          name: 'editTag',
          params:{id:event.currentTarget.getAttribute('data-id')}
        })
      },
      drop(){
        let params={
          id:event.currentTarget.getAttribute('data-id')
        }
        deleteTag(params).then(res=>{
          this.$Message.success(res.message);
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
  }
</style>
