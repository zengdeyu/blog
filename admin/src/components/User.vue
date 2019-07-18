<template>
  <div class="user">
    <Row>
      <Col class="bar">
        <Row type="flex" align="middle">
          <Col :xs="4" :md="4" :xl="2">日期</Col>
          <Col :xs="12" :md="12" :xl="14">用户名</Col>
          <Col :xs="4" :md="4" :xl="4"><Input search placeholder="Enter something..."/></Col>
          <Col :xs="4" :md="4" :xl="4">
            <Button type="primary" @click="$router.push('/edituser/new')">
              <Icon type="ios-plus-empty"></Icon>
              新增
            </Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row class="list" v-for="(item,index) in data" :key="index" type="flex" align="middle">
          <Col :xs="4" :md="4" :xl="2">2019-6-20</Col>
          <Col :xs="12" :md="12" :xl="14">{{item.userName}}</Col>
          <Col :xs="4" :md="4" :xl="4"></Col>
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
  import {getUser,deleteUser} from "../../api/user";

  export default {
    inject:['reload'],
    name: "articlelist",
    data(){
      return{
        data:{}
      }
    },
    mounted() {
      getUser().then(res=>{
        this.data=res.data
      })
    },
    methods:{
      sure(event){
        this.$router.push({
          name: 'editUser',
          params:{id:event.currentTarget.getAttribute('data-id')}
        })
      },
      drop(){
        let params={
          id:event.currentTarget.getAttribute('data-id')
        }
        deleteUser(params).then(res=>{
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
