function getDate() {
    let time=new Date();
    return time.getFullYear()+'-'+time.getMonth()+1+'-'+time.getDay()
}
module.exports.time=getDate;