const express = require('express');
const router = express.Router();
const createTime=new Date();

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

module.exports = router;