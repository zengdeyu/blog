<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <Menu v-show="isShow" ref="menu" :theme="theme2" :open-names="['1']" accordion style="width: auto"

    >
      <Submenu name="1" >
        <template slot="title">
          <Icon type="ios-paper"/>
          内容管理
        </template>
        <menu-item name="1-1">
          <router-link tag="div" to="/articlelist">文章管理</router-link>
        </menu-item>
        <menu-item name="1-2">
          <router-link tag="div" to="/tag">标签管理</router-link>
        </menu-item>
        <menu-item name="1-3">
          <router-link tag="div" to="/tool">工具管理</router-link>
        </menu-item>
        <menu-item name="1-4">
          <router-link tag="div" to="/comment">评论管理</router-link>
        </menu-item>
        <menu-item name="1-5">
          <router-link tag="div" to="/draft">草稿箱</router-link>
        </menu-item>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people"/>
          用户管理
        </template>
        <menu-item name="2-2">
          <router-link tag="div" to="/user">活跃用户</router-link>
        </menu-item>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats"/>
          统计分析
        </template>
        <MenuGroup title="使用">
          <menu-item name="3-1">
            <router-link tag="div" to="/">新增和启动</router-link>
          </menu-item>
          <menu-item name="3-2">
            <router-link tag="div" to="/">活跃分析</router-link>
          </menu-item>
          <menu-item name="3-3">
            <router-link tag="div" to="/">时段分析</router-link>
          </menu-item>
        </MenuGroup>
      </Submenu>
    </Menu>
  </transition>

</template>

<script>
  import Bus from '../../common/js/eventBus'

  export default {
    name: "Admin",
    components: {},
    data() {
      return {
        theme2: 'dark',
        isShow: true
      }
    },
    mounted() {
      let me=this
      Bus.$on('showmenu',function (flag) {
        me.isShow=flag
      })
    },
    methods:{
      beforeEnter: function (el) {
        el.style.left = '-300px'
      },
      enter: function (el, done) {
        Velocity(el, { left:'0px'}, { duration: 300 }, { complete: done })
      },
      leave: function (el, done) {
        Velocity(el, {left:'-300px'}, { complete: done })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
