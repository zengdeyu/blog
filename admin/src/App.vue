<template>
  <div id="app">
    <Header></Header>
    <Row>
      <Col class="menu" :xs="12" :md="4" :xl="4">
        <Admin></Admin>
      </Col>

      <Col class="content" :xs="24" :md="20" :xl="20">
        <router-view v-if="isRouterAlive"></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
  import Admin from './components/Admin'
  import Header from '../base/Header'


  export default {
    name: 'App',
    provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      return{
        isRouterAlive:true
      }
    },
    components: {
      Admin,
      Header,
    },
    methods:{
      reload(){
        this.isRouterAlive=false
        this.$nextTick(function () {
          this.isRouterAlive=true
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .ivu-breadcrumb a {
    color: rgba(255, 255, 255, .7);
  }

  .ivu-breadcrumb > span:last-child {
    color: #fff
  }

  .ivu-icon-md-menu {
    font-size: 18px;
    color: #fff;
  }

  .CodeMirror.CodeMirror {
    text-align: left;
  }

  .menu {
    position: fixed;
    top:64px;
    z-index: 1000;
  }
  .content{
    position: relative;
    top: 64px;
  }
</style>
