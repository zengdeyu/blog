var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//代理插件
var proxy=require('http-proxy-middleware');
//跨域插件
var cors=require('cors');


//路由配置
var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');
var commentRouter = require('./routes/comment');
var draftRouter = require('./routes/draft');
var tagRouter = require('./routes/tag');
var toolRouter = require('./routes/tool');
var userRouter = require('./routes/user');
var timeRouter = require('./routes/servertime');


var app = express();
//设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.use(logger('dev'));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/netease',proxy({
    target:'http://23333333.itooi.cn',
    changeOrigin:true
}));
app.use('/tencent',proxy({
    target:'http://23333333.itooi.cn',
    changeOrigin:true
}));
app.use('/kugou',proxy({
    target:'http://23333333.itooi.cn',
    changeOrigin:true
}));
app.use('/kuwo',proxy({
    target:'http://23333333.itooi.cn',
    changeOrigin:true
}));
app.use('/kuwo',proxy({
    target:'http://23333333.itooi.cn',
    changeOrigin:true
}));
app.use('/one',proxy({
    target:'http://23333333.itooi.cn',
    changeOrigin:true
}))

app.use('/', indexRouter);
app.use('/article',articleRouter);
app.use('/comment', commentRouter);
app.use('/draft', draftRouter);
app.use('/tag', tagRouter);
app.use('/tool', toolRouter);
app.use('/user', userRouter);
app.use('/time', timeRouter);




//加载数据库模块
const mongoose=require("mongoose");
let opt={
    server:{
        socketOptions:{keepAlive:1}
    }
}
mongoose.connect('mongodb://132.232.14.150:27017/blog',opt,function (err) {
    if(err){
        console.log('数据库连接失败');
    }
    else{
        console.log('数据库连接成功')
    }
})



module.exports = app;
