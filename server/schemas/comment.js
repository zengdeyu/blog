let mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    //评论人
    userName:String,
    //内容
    content:String,
    //回复数组
    replyArr:Array,
    //评论时间
    commentTime:Date,
})