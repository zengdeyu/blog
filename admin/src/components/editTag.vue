<template>
  <div class="editTag">
    <Row class="info">
      <Col class="info-input" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
        <Input v-model="tagName" placeholder="输入标签名"/>
      </Col>
      <Col class="info-input" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
        <Input v-model="tagAuthor" placeholder="输入作者"/>
      </Col>
    </Row>
    <Row type="flex" justify="center">
      <Col>
        <Button type="warning" @click="submit">保存</Button>
      </Col>
    </Row>
  </div>

</template>

<script>
  import Markdowm from '../../base/markdowm'
  import {addTag,getTagDetail} from "../../api/tag";

  export default {
    name: "Edit",
    components: {
      Markdowm
    },
    data() {
      return {
        tagName: '',
        tagAuthor: '',
        id:'',
        isNew:true
      }
    },
    mounted() {
      if(this.$route.params.id!=='new'){
        let params={
          id:this.$route.params.id
        }
        getTagDetail(params).then(res=>{
            this.tagName=res.data.tagName;
          this.tagAuthor=res.data.tagAuthor;
          this.id=res.data._id
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    methods: {
      submit() {
        if (this.tagName === '') {
          this.$Message.error('请输入标签名');
          return;
        }
        if (this.tagAuthor === '') {
          this.$Message.error('请输入编辑人');
          return;
        }
        let body={
          'tagName':this.tagName,
          'tagAuthor': this.tagAuthor,
          'id':this.id
        }
        addTag(body).then((res)=>{
          this.$Message.success(res.message);
          this.$router.push({
            path:'/tag'
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .editTag {
    .info {
      .info-input {
        padding 10px 0
      }
    }
  }
</style>
