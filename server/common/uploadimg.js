const multer=require('multer');

//获取时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate.toString();
}
var datatime = 'uploads/'+getNowFormatDate();


var storage = multer.diskStorage({
    destination:datatime ,
    filename: function (req, file, cb) {
        let fileformat=(file.originalname).split('.');
        cb(null,Date.now()+'.'+fileformat[fileformat.length-1]);
    }
})
module.exports = multer({ storage: storage })