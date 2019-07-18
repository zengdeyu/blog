let mongoose=require('mongoose');

let draftSchema=require('../schemas/draft');

module.exports=mongoose.model('Draft',draftSchema,'draft');