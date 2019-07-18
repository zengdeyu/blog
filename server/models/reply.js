let mongoose=require('mongoose');

let replySchema=require('../schemas/reply');

module.exports=mongoose.model('Reply',replySchema);