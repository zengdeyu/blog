<template>
  <Row class="edit">
    <Col class="info-input" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
      <Input v-model="userName" placeholder="输入用户名"/>
    </Col>
    <Col class="info-input" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
      <Input v-model="userPassword" placeholder="输入密码"/>
    </Col>
    <Col class="info-input" :xs="{span:2,offset:11}" :md="{span:2,offset:11}" :xl="{span:2,offset:11}">
      <Button type="success" @click="sure">保存</Button>
    </Col>
  </Row>
</template>

<script>
  import {addUser,getUserDetail} from "../../api/user";

  export default {
    name: "editUser",
    data(){
      return{
        userName:'',
        userPassword:'',
      }
    },
    mounted() {
      if(this.$route.params.id!=='new'){
        let params={
          id:this.$route.params.id
        }
        getUserDetail(params).then(res=>{
          this.userName=res.data.userName;
          this.userPassword=res.data.password;
          this.id=res.data._id
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    methods:{
      sure(){
        let body={
          'userName':this.userName,
          'userPassword':this.userPassword,
          'id':this.id
        }
        addUser(body).then(res=>{
          this.$Message.success(res.message);
          this.$router.push({
            path:'/user'
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


  .edit {
    .info-input {
      padding 10px 0
    }
  }
</style>
