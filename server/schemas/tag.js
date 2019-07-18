let mongoose=require('mongoose');


module.exports= new mongoose.Schema({
    //标签名
    tagName:String,
    //创建者
    tagAuthor:String,
    //创建时间
    createDate:Date,
})