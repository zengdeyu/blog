<template>
    <Row type="flex">
        <Col class="search" :xs="{span:20,offset:2}" :md="{span:20,offset:2}" :xl="{span:20,offset:2}">
           <Input search placeholder="搜索文章" />
        </Col>
    </Row>
</template>

<script>
    export default {
        name: "ArticleSearch"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

        .search{
            padding-top 40px
            padding-bottom 20px
        }
</style>