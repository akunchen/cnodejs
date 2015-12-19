/**
 * Created by Akun on 2015/12/15.
 */
var isDevelopment = false;
var _baseUrl = isDevelopment ? 'http://192.168.1.100:3000/APICloud/cnodejs/' : 'widget://';
//api准备完成
apiready = function () {
    //处理顶部状态栏
    var header = $api.byId('header');
    $api.fixIos7Bar(header);
    $api.fixStatusBar(header);
    //设备准备完成
    try {
        deviceReady();
    } catch (e) {
    }
};

$(function () {
    //快速点击，去除300ms延迟
    try {
        FastClick.attach(document.body);
    } catch (e) {
    }
});

//ajax请求
function ajaxRequest(options, callback) {
    var requestUrl = 'https://cnodejs.org/api/v1/' + options.url;
    console.log('requestUrl:---' + requestUrl);
    api.ajax({
        url: requestUrl,
        method: options.method || 'get',
        timeout: 30,
        dataType: 'json',
        returnAll: false,
        data: {
            values: options.values,
            files: options.files
        }
    }, function (ret, err) {
        callback(ret, err);
    });
}
//ajaxGET请求获取数据
function ajaxGET(options, callback) {
    var str = '?';
    for (var o in options.values) {
        str += o + '=' + options.values[o] + '&';
    }
    ajaxRequest({
        url: options.url + str,
        method: 'get',
        values: options.values,
        files: options.files
    }, callback);
}
//ajaxPOST请求数据
function ajaxPOST(options, callback) {
    ajaxRequest({
        url: options.url,
        method: 'post',
        values: options.values,
        files: options.files
    }, callback);
}
//公用方法
var com = {};
//调试刷新
com.refresh = function () {
    if (isDevelopment) {
        location.reload();
    }
};
//调用打开frame方法，设置一些默认值
com.openFrame = function (options) {
    if (options.vScrollBarEnabled == undefined) {//设置垂直滚动条不显示
        options.vScrollBarEnabled = false;
    }
    if (options.vScrollBarEnabled == undefined) {//设置页面可以弹动
        options.bounces = true;
    }
    api.openFrame(options);
};
//处理时间
com.timeFormate = function (str) {
    //时差
    var timeDifference = 0;
    if (str.indexOf('Z') > -1) {
        str = str.substring(0, str.indexOf('.'));
        timeDifference = 8 * 60 * 60;
    }
    var time = new Date(str.replace(/-/g, '/').replace('T', ' ')).getTime();//该时间的时间戳
    var remain = parseInt((new Date().getTime() - time) / 1000) - timeDifference;//剩余秒数
    var strBack;//返回的字符串
    switch (true) {
        case  remain < 60:
            strBack = remain + '秒前';
            break;
        case  remain < 60 * 60:
            strBack = parseInt(remain / 60) + '分钟前';
            break;
        case  remain < 24 * 60 * 60:
            strBack = parseInt(remain / (60 * 60)) + '小时前';
            break;
        case  remain < 28 * 24 * 60 * 60:
            strBack = parseInt(remain / (24 * 60 * 60)) + '天前';
            break;
        default :
            strBack = str.substring(0, str.indexOf('T')).replace(/\//g, '-');
            break;
    }
    return strBack;
};
//监听安卓双击返回键退出
com.exitApp = function () {
    api.addEventListener({
        name: 'keyback'
    }, function () {
        api.addEventListener({
            name: 'keyback'
        }, api.toLauncher);
        setTimeout(com.exitApp, 3000);
    });
};
//获取数据模块
var getData = {};
//获取首页列表
getData.mainTopicList = function (options, callback) {
    ajaxGET({
        url: 'topics',
        values: options
    }, callback);
};
//验证token
getData.userToken = function (options, callback) {
    ajaxPOST({
        url: '/accesstoken',
        values: options
    }, callback);
};