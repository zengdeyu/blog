<template>
  <div class="edit">
    <Row class="info">
      <Col class="info-input" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
        <Input v-model="title" placeholder="输入文章标题"/>
      </Col>
      <Col class="info-input" :xs="{span:22,offset:1}" :md="{span:22,offset:1}" :xl="{span:22,offset:1}">
        <Input v-model="subTitle" placeholder="输入文章简介"/>
      </Col>
      <Col class="info-input" :xs="{span:7,offset:1}" :md="{span:10,offset:1}" :xl="{span:10,offset:1}">
        <Input v-model="author" placeholder="输入作者"/>
      </Col>
      <Col class="info-input" :xs="{span:8,offset:1}" :md="{span:10,offset:1}" :xl="{span:6,offset:1}">
        <Select v-model="model1" v-if="tag" placeholder="选择标签">
          <Option v-for="(item,index) in tag" :key="index" :value="item.tagName">{{item.tagName}}</Option>
        </Select>
      </Col>
      <Col class="info-input" :xs="4" :md="4" :xl="4">
        <Upload action="//jsonplaceholder.typicode.com/posts/" >
          <Button icon="ios-cloud-upload-outline" disabled>文章图片</Button>
        </Upload>
      </Col>
    </Row>
    <Row class="markdowm">
      <textarea id="simplemde"></textarea>
      <!-- 隐藏的上传文件按钮 -->
      <Upload style="display: none;"  action="http://132.232.14.150:3000/article/uploads"
              name="img"
              :on-success="imgSuccess"
      >
        <Button id="upInput" icon="ios-cloud-upload-outline">文章图片</Button>
      </Upload>
    </Row>
    <Row type="flex" justify="center">
      <Col>
        <Button type="warning" disabled>保存至草稿</Button>
      </Col>
      <Col :xs="{offset:1}" :md="{offset:1}" :xl="{offset:1}">
        <Button type="success" @click="sure">发表</Button>
      </Col>
    </Row>
  </div>

</template>

<script>

  import SimpleMDE from "simplemde";
  import "simplemde/dist/simplemde.min.css";
  import {publishDraft, getDraftById, dropDraft} from "../../api/draft"
  import {publishArticle} from "../../api/aritcle";
  import {publishTool} from "../../api/tool";
  import {getTags} from "../../api/tag";

  export default {
    name: "Edit",
    data() {
      return {
        title: '',
        subTitle: '',
        content: '',
        tags: '',
        author: '',
        img:'',
        isNew:true,
        id:'',
        kind:'',
        draft:false,
        tag:[],
        model1:'',
        simpled:''
      }
    },
    mounted() {
      let simplemde = new SimpleMDE({
        el: document.getElementById(simplemde),
        showIcons: ["code"],
      });
      simplemde.codemirror.on("change", () => {
        this.content = simplemde.value();
      });
      this.simpled=simplemde
      if(this.$route.params.id!=='new'){
        getDraftById({id:this.$route.params.id}).then(res=>{
          this.title=res.data.title;
          this.subTitle=res.data.subTitle;
          this.author=res.data.author;
          this.id=res.data._id;
          this.kind=res.data.kind;
          this.draft=res.data.draft;
          this.model1=res.data.tags;
          this.img=res.data.img
          simplemde.value(res.data.content)
        }).catch(err=>{
          console.log('请求失败')
        })
      }
    },
    created(){
      getTags().then(res=>{
        this.tag=res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    methods: {
      sure() {
        if (this.title === '') {
          this.$Message.error('请输入标题');
          return;
        }
        if (this.subTitle === '') {
          this.$Message.error('请输入简介');
          return;
        }
        if (this.content === '') {
          this.$Message.error('请输入内容');
          return;
        }
        if(this.model1===''){
          this.$Message.error('请选择标签');
          return;
        }
        let body = {
          'title': this.title,
          'subTitle': this.subTitle,
          'author': this.author,
          'content': this.content,
          'tags': this.model1,
          'id':this.id,
          'kind':this.kind,
          'draft':this.draft,
          'img':this.img
        };
        if(this.kind==='article'){
          publishArticle(body).then((res) => {
            this.$router.push({
              path:'/articlelist'
            })
          });
          dropDraft({id:this.id}).then(res=>{
            this.$Message.success(res.message);
          })
        }
        else if(this.kind==='tool'){
          publishTool(body).then((res) => {
            this.$Message.success(res.message);
            this.$router.push({
              path:'/tool'
            })
          });
          dropDraft({id:this.id}).then(res=>{
          })
        }
        else{
          publishDraft(body).then((res) => {
            this.$Message.success(res.message);
            this.$router.push({
              path:'/draft'
            })
          })
        }
      },
      imgSuccess(res){
        var urlname=`![](http://132.232.14.150:3000/${res.path.slice(7)})`
        this.simpled.value(`${this.content}\n${urlname}\n`)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .edit {
    .info {
      .info-input {
        padding 10px 0
      }
    }
  }
</style>
