/**
 * Created by Akun on 2015/12/15.
 */



/*var str='2015/01/14T21:50:56';
var strBack;//返回的字符串
var time = new Date(str.replace('T',' ').replace(/-/g, '/')).getTime();//该时间的时间戳
var remain = parseInt((new Date().getTime() - time) / 1000);//剩余秒数
switch(true){
    case  remain < 60:strBack = remain+'秒前';break;
    case  remain < 60*60:strBack = parseInt(remain/60)+'分钟前';break;
    case  remain < 24*60*60:strBack = parseInt(remain/(60*60))+'小时前';break;
    case  remain < 28*24*60*60:strBack = parseInt(remain/(24*60*60))+'天前';break;
    default :strBack=str.substring(0,str.indexOf('T')).replace(/\//g,'-');break;
}
console.log(strBack)*/

var obj = {"type":"all","page":1,"limit":40};
var str = '';
for(var o in obj){
    str += o+'='+obj[o];
}
console.log(str)