let mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    //回复人
    replyUser:String,
    //接受回复的人
    acceptUser:String,
    //回复内容
    content:String,
    //回复时间
    replyTime:String,
})