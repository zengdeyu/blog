<template>
  <div class="container">
    <Header></Header>
    <Row class="box" type="flex" justify="center">
      <Col class="content" :xs="23" :md="20" :xl="18">
        <transition name="myTransition" enter-active-class="animated fadeIn">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </Col>
    </Row>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './Header'
  import Footer from './Footer'

  export default {
    name: "index",
    components: {
      Header,
      Footer,
    }
  }
</script>

<style scoped lang="stylus">
  .content
    overflow-x hidden
</style>
