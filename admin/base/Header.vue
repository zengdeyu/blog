<template>
  <Row class="headerBox" type="flex" align="middle">
    <Col :xs="{span:1,offset:1}" :md="0" :xl="0">
      <MiniMenu></MiniMenu>
    </Col>
    <Col :xs="{span:18,offset:1}" :md="{span:18,offset:1}" :xl="{span:21,offset:1}">
      <Breadcrumb class="header" type="flex">
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </Col>
    <Col class="user" :xs="1" :md="1" :xl="1">
      <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="">
    </Col>
  </Row>

</template>

<script>
  import MiniMenu from "../base/miniHeader"

  export default {
    name: "Header",
    components: {
      MiniMenu
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .headerBox {
    background-color #515a6e
    height 64px
    position fixed
    width 100%
    z-index 1000

    .header {
      text-align left
      vertical-align middle
    }

    .user {
      img {
        width 30px
        height 30px
        border-radius 100%
      }
    }
  }

</style>
