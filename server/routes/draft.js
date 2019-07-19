const express = require('express');
const router = express.Router();
//Draft模型
const Draft = require('../models/draft');

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

//获取文章列表
router.get('/list', (req, res, next) => {
    Draft.find().sort({id:-1}).then((articleList) => {
        responseData.success = true;
        responseData.data = articleList;
        responseData.message = '请求成功'
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
});

//获取单篇文章
router.get('/detail', (req, res, next) => {
    Draft.findById(req.query.id).then(article => {
        responseData.success = true;
        responseData.data = article;
        responseData.message = '请求成功';
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false;
        res.json(responseData)
    })
})

//发布文章
router.post('/publish', (req, res, next) => {

    if (req.body.id) {
        if (req.body.instence === 'true') {
            console.log(req.body)
            let article = new Draft({
                _id:req.body.id,
                kind: req.body.kind,
                title: req.body.title,
                subTitle: req.body.subTitle,
                author: req.body.author,
                content: req.body.content,
                tags: req.body.tags,
                publishDate: req.body.publishDate,
                img:req.body.img,
                draft:true
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
        else{

            Draft.findByIdAndUpdate(req.body.id, {
                title: req.body.title,
                subTitle: req.body.subTitle,
                author: req.body.author,
                content: req.body.content,
                tags: req.body.tags,
                img:req.body.img,
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

    } else {
        let article = new Draft({
            kind: req.body.kind,
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

});


//删除文章
router.delete('/drop', (req, res, next) => {
    Draft.findByIdAndDelete(req.query.id, (err) => {
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
})


module.exports = router;