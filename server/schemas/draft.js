let mongoose=require('mongoose');
const Schema=mongoose.Schema;

module.exports=new mongoose.Schema({
    //草稿来源类型article/tool
    kind:String,
    //文章标题
    title:String,
    //文章简介
    subTitle:String,
    //作者
    author:String,
    //文章内容
    content:String,
    //文章标签
    tags:Array,
    //发布时间
    publishDate:Date,
    //查看次数
    lookNum:{type:Number,default:0},
    //评论次数
    commentNum:{type:Number,default:0},
    //所有评论
    commentList:Array,
    //判断是否是已有文章的草稿
    draft:{type:Boolean,default:false},
    //文章图片
    img:String
});