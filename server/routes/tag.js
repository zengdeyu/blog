const express=require('express');
const router=express.Router();
const Tag=require('../models/tag');

//统一返回格式
let responseData;
router.use((req, res, next) => {
    responseData = {
        //主要根据success来判断是否请求成功，code是一个预留的参数
        //code默认情况下都是0，只有在特殊接口中才返回不同的值，代表不同的意义
        success: true,
        code: 0,
        message: '',
        data: {},
        total: 0,
        totalPage: 0
    }
    next()
})

//新增标签
router.post('/add',function (req,res,next) {
    if(req.body.id){
        Tag.findByIdAndUpdate(req.body.id,{
            tagName:req.body.tagName,
            tagAuthor:req.body.tagAuthor,
        },function (err) {
            if (err) {
                responseData.success = false;
                responseData.message = err.message;
                res.json(responseData)
            } else {
                responseData.success = true;
                responseData.message = '更新成功';
                res.json(responseData);
                console.log('更新数据成功！')
            }
        })
    }
    else{

        let tag=new Tag({
            tagName:req.body.tagName,
            tagAuthor:req.body.tagAuthor,
            createDate:new Date()
        });
        tag.save(function (err) {
            if(err){
                responseData.success = false
                responseData.message = err.message
                res.json(responseData)
            }
            else{
                responseData.success = true;
                responseData.message = '发布成功';
                res.json(responseData);
                console.log('保存成功！')
            }
        })
    }

})

//获取标签
router.get('/taglist',function (req,res,next) {
    Tag.find().then((tagList) => {
        responseData.success = true;
        responseData.data = tagList;
        responseData.message='请求成功'
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
});


//获取单个标签
router.get('/detail',(req,res,next)=>{
    Tag.findById(req.query.id).then(tag=>{
        responseData.success = true;
        responseData.data = tag;
        responseData.message='请求成功';
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
});

//删除标签
router.delete('/drop',(req,res,next)=>{
    Tag.findByIdAndDelete(req.query.id,(err)=>{
        if (err) {
            responseData.success = false;
            responseData.message = err.message;
            res.json(responseData)
        } else {
            responseData.success = true;
            responseData.message = '删除成功';
            res.json(responseData);
            console.log('删除数据成功！')
        }
    })
})

module.exports=router;