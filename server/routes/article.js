const express = require('express');
const router = express.Router();
const upload=require('../common/uploadimg');

//引入article模型
const Article = require('../models/article');

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
    };
    next()
});

//上传图片
router.post('/uploads',upload.single('img'),(req,res,next)=>{
    res.send(req.file)
})



//获取文章列表
router.get('/list', (req, res, next) => {
    if(req.query.lastId){
        Article.find({'_id':{$lt:req.query.lastId}}).sort({id:-1}).limit(10).then((articleList) => {
            responseData.success = true;
            responseData.data = articleList;
            responseData.message = '请求成功';
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false;
            res.json(responseData)
        })
    }
    else{
        Article.find().sort({id:-1}).limit(10).then((articleList)=> {
            responseData.success = true;
            responseData.data = articleList;
            responseData.message = '请求成功';
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false;
            res.json(responseData)
        })
    }
});

//获取所有文章列表
router.get('/all', (req, res, next) => {
        Article.find().sort({id:-1}).then((articleList)=> {
            responseData.success = true;
            responseData.data = articleList;
            responseData.message = '请求成功';
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false;
            res.json(responseData)
        })
});

//获取单篇文章
router.get('/detail', (req, res, next) => {
    Article.findById(req.query.id).then(article => {
        responseData.success = true;
        responseData.data = article;
        responseData.message = '请求成功'
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
})

//发布文章
router.post('/publish', (req, res, next) => {
    console.log(req.body)
    if (req.body.id && !req.body.kind) {
            Article.findByIdAndUpdate(req.body.id, {
                id: req.body.id,
                title: req.body.title,
                subTitle: req.body.subTitle,
                author: req.body.author,
                content: req.body.content,
                tags: req.body.tags,
                img:req.body.img
            }, function (err) {
                if (err) {
                    responseData.success = false;
                    responseData.message = err.message;
                    res.json(responseData)
                } else {
                    responseData.success = true;
                    responseData.message = '更新成功';
                    res.json(responseData);
                }
            })
    } else {

        //从草稿页面更新
        if(req.body.draft==="true"){
            console.log(req.body)
            Article.findByIdAndUpdate(req.body.id, {
                id: req.body.id,
                title: req.body.title,
                subTitle: req.body.subTitle,
                author: req.body.author,
                content: req.body.content,
                tags: req.body.tags,
                img:req.body.img
            }, function (err) {
                if (err) {
                    responseData.success = false;
                    responseData.message = err.message;
                    res.json(responseData)
                } else {
                    responseData.success = true;
                    responseData.message = '更新成功';
                    res.json(responseData);
                }
            })
        }
        else{
            let article = new Article({
                title: req.body.title,
                subTitle: req.body.subTitle,
                author: req.body.author,
                content: req.body.content,
                tags: req.body.tags,
                img:req.body.img,
                publishDate: new Date()
            });
            article.save(function (err) {
                if (err) {
                    responseData.success = false;
                    responseData.message = err.message;
                    res.json(responseData)
                } else {
                    responseData.success = true;
                    responseData.message = '发布成功';
                    res.json(responseData);
                }
            })
        }

    }

});


//删除文章
router.delete('/drop', (req, res, next) => {
    Article.findByIdAndDelete(req.query.id, (err) => {
        if (err) {
            responseData.success = false;
            responseData.message = err.message;
            res.json(responseData)
        } else {
            responseData.success = true;
            responseData.message = '删除成功';
            res.json(responseData);
        }
    })
});

//根据标签查找文章
router.get('/find',(req,res,next)=>{
    Article.find({tags:req.query.tags}).then(req=>{
        responseData.success = true;
        responseData.data = req;
        responseData.message = '请求成功';
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
})

//获取同种标签文章总数
router.get('/eachtotal',(req,res,next)=>{
    Article.aggregate([{$group : {_id : "$tags", num : {$sum : 1}}}]).then(req=>{
        responseData.success = true;
        responseData.data = req;
        responseData.message = '请求成功';
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
})

//搜索文章
router.get('/search',(req,res,next)=>{
    var query={};
    if(req.query.title) {
        query['title']=new RegExp(req.query.title,'i');//模糊查询参数
    }
    Article.find(query).then(req=>{
        responseData.success = true;
        responseData.data = req;
        responseData.message = '请求成功';
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
})

module.exports = router;