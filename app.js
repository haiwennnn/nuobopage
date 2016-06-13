var koa = require('koa');
var app = module.exports = koa();
var router = require('koa-router')();
var serve = require('koa-static');
var render = require('koa-ejs');
var session = require('koa-session');
var path = require('path');
var mongoose = require('mongoose');
var gzip = require('koa-gzip');

//自定义库
var uploadImg = require('./lib/uploadImg.js');

global.basepath = __dirname;
global.uploadPath = "/public/uploads";

app.use(gzip());

//载入路由文件
//前台界面路由
var Index = require('./routes/views/index');
//后台界面路由
var Admin_index = require("./routes/admin/index");

//连接一次，需要预先创建好数据库
mongoose.connect('mongodb://119.29.235.112:27017/nuobo');
var db = mongoose.connection;
var Schema = mongoose.Schema;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("open db success");

    var userSchema = Schema({
        username: String,
        password: String,
        nickname: String,
        avatar: String,
        rank: Number, //设置权限{1:管理员,2:开发者账号}
        lastLogin: Date, //最后登录时间
        logins: Number, //登录次数
        createAt: Date,
        updateAt: Date
    }, { collection: 'user' });

    mongoose.model('user', userSchema);
});

//设置模板引擎
render(app, {
    root: path.join(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

app.keys = ['haha'];

//开启服务器session
app.use(session({
    maxAge:1000 * 60 * 10
},app));

//装载自定义库
app.use(uploadImg());

//设置静态路径
app.use(serve(__dirname + '/public')); //静态文件路径
//设置前端路由
router.use('/', Index.routes(), Index.allowedMethods());
//设置后台路由
router.use("/admin", Admin_index.routes(), Admin_index.allowedMethods());

// 插入根路由  
app.use(router.routes());

if (!module.parent) app.listen(3000);
