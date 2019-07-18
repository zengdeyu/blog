<template>
  <div class="comment">
    <Row>
      <Col class="bar">
        <Row type="flex" align="middle">
          <Col :xs="4" :md="4" :xl="2">日期</Col>
          <Col :xs="12" :md="4" :xl="14">内容</Col>
          <Col :xs="4" :md="12" :xl="4"></Col>
          <Col :xs="4" :md="4" :xl="4">
            <Button type="primary">
              <Icon type="md-checkmark"/>
              全部通过
            </Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row class="list" type="flex" align="middle">
          <Col :xs="4" :md="4" :xl="2">2019-6-20</Col>
          <Col class="title" :xs="12" :md="12" :xl="14">评论内容评论内容评论内容评论内容评论内容评论内容</Col>
          <Col :xs="4" :md="4" :xl="4">评论人</Col>
          <Col :xs="4" :md="4" :xl="4">
            <Button type="info">
              <Icon type="ios-plus-empty"></Icon>
              通过
            </Button>
            <Button type="error">
              <Icon type="ios-plus-empty"></Icon>
              删除
            </Button>
          </Col>
        </Row>

      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "articlelist"
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
    .title{
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    }
  }
</style>
