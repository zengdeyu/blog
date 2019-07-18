let mongoose=require('mongoose');

let tagSchema=require('../schemas/tag');

module.exports=mongoose.model('Tag',tagSchema,'tag');