<template>
  <div id="app">
    <router-view></router-view>
    <Player></Player>
  </div>
</template>

<script>
  import Player from './components/Player'

  export default {
    name: 'App',
    components: {
      Player
    }
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .box {
    padding-top: 50px;
    padding-bottom: 56px;
    position: relative;
    top: 56px;
  }

  .ivu-slider-button-wrap {
    top: -6px
  }

  .ivu-slider-bar {
    background-color: #e71d36
  }

  .ivu-slider-button {
    border-color: #e71d36;
  }

  .ivu-slider-button:hover {
    border-color: #e71d36;
  }

  .ivu-badge-count {
    vertical-align: middle;
    position: absolute;
    transform: translateX(50%);
    top: -6px;
    right: 0;
    height: 14px;
    border-radius: 7px;
    min-width: 14px;
    min-height: 14px;
    padding: 0;
    line-height: 12px;
  }

  .song .list:hover {
    background-color: #bbb
  }

  .search .ivu-input {
    border: 1px solid rgba(1, 22, 39, .6);
    background-color: #fdfffc;
    text-align: center;
    color: #011627;
    border-radius: 16px;
  }

  .search .ivu-input:focus {
    box-shadow: 0 0 0 1px rgba(1, 22, 39, .8);
  }

  .ivu-avatar {
    cursor: pointer
  }

  .search .ivu-tabs-ink-bar {
    display: none;
  }

  .search .ivu-tabs-nav {
    width: 100%;
    display: -webkit-flex;
    display: -moz-box;
    display: -o-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
</style>
