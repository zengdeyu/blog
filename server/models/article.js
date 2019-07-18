let mongoose=require('mongoose');

let articleSchema=require('../schemas/article');

module.exports=mongoose.model('Article',articleSchema,'article');