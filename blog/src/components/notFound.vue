<template>
  <div class="error">
    <div class="container-floud">
      <Row type="flex" justify="center" class="ground-color text-center">
        <Col class="container-error-404" style="text-align: center">
          <div class="clip">
            <div class="shadow">
              <span class="digit thirdDigit"></span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit secondDigit"></span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit firstDigit"></span>
            </div>
          </div>
          <div class="msg">OH!
            <span class="triangle"></span>
          </div>
        </Col>
        <Col>
          <h2 class="h1">很抱歉，你访问的页面找不到了</h2>
          <p style="text-align: center">
            <a class="tohome" href="#" @click="$router.push('/article')">返回首页</a>
          </p>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import '../common/stylus/404.css'
  import '../common/js/404'
    export default {
        name: "notFound"
    }
</script>

<style scoped>

</style>
