<template>
    <Row class="header" type="flex" align="middle">
        <Col class="logo" :xs="0" :md="6" :xl="6">
            <Row type="flex" justify="center">
                <Col >
                    <img src="../../static/logo/logo.png" alt="">
                </Col>
            </Row>
        </Col>
        <Col class="menu" :xs="0" :md="13" :xl="13" >
            <Menu mode="horizontal"  :active-name="currentPage">
                <Row type="flex" justify="space-around">
                    <Col>
                        <menu-item name="/article">
                            <router-link tag="div" to="/article">文章</router-link>
                        </menu-item>
                    </Col>
                    <Col>
                        <menu-item name="/tag">
                            <router-link tag="div" to="/tag">标签</router-link>
                        </menu-item>
                    </Col>
                    <Col>
                        <menu-item name="/tool">
                            <router-link tag="div" to="/tool">杂项</router-link>
                        </menu-item>
                    </Col>
                    <Col>
                        <menu-item name="/music">
                            <router-link tag="div" to="/music">音乐</router-link>
                        </menu-item>
                    </Col>
                    <Col>
                        <menu-item name="/search">
                            <router-link tag="div" to="/search">搜索</router-link>
                        </menu-item>
                    </Col>
                    <Col>
                        <menu-item name="/about">
                            <router-link tag="div" to="/about">关于</router-link>
                        </menu-item>
                    </Col>
                </Row>
            </Menu>
        </Col>
        <Col class="user" :xs="0" :md="5" :xl="5">
            <Row type="flex" justify="center" align="middle">
                <Col @click.stop='$router.push("/login")'>
                    <Avatar  src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                </Col>
            </Row>

        </Col>
        <Col class="nimiHeader" :xs="24" :md="0" :xl="0">
            <miniHeader></miniHeader>
        </Col>
    </Row>

</template>

<script>
    import miniHeader from '../base/miniHeader'
    export default {
        name: "Header",
        components:{
            miniHeader
        },
      data(){
          return {
            currentPage:'article'
          }
      },
    created() {
      this.currentPage=this.$route.path;
    },
      watch:{
        $route(to, from) {
          this.currentPage=this.$route.path;
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .header{
        height 56px
        position fixed
        width 100%
        z-index 1000
        background-color #fff
        .logo{
            img{
                width 56px
                height 56px
            }
        }
        .logo{
            height 100%
        }
        .menu{
            & ul:after{
                height 0
            }
            & li{
                padding 0
            }
            & div{
                padding 0 10px
            }
        }
    }
</style>
