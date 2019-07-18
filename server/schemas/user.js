let mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    //用户名
    userName:String,
    //密码
    password:String,
    //注册日期
    createDate:Date
})