let mongoose=require('mongoose');

let toolSchema=require('../schemas/tool');

module.exports=mongoose.model('Tool',toolSchema,'tool');