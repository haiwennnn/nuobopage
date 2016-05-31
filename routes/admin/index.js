var router = require('koa-router')();
var fs = require('fs');
var path = require('path');
var parse = require('co-busboy');
var postAction = require(global.basepath + '/lib/PostAction.js');

//admin index
router.get('/', function*(next) {
    yield this.render("admin/index", {

    });
});

//admin login
router.get('/login', function*(next) {
    yield this.render("admin/login", {

    });
});

//admin upload
router.get('/upload', function*(next) {
    yield this.render("admin/uploadImage", {

    });
});

//admin upload
router.post('/uploadFile', function*(next) {
    var params = yield postAction.parseForm(this);
    this.body = {
        "error": 0,
        "msg": params
    };
});

router.get('/getData', function*(next) {
	var query = this.request.query;
	var params = {
		title:query.title,
		path:query.path
	};
	this.body = {
        "error": 0,
        "msg": params
    };
});

router.post('/getData', function*(next) {
    var params = yield postAction.parseForm(this);
    this.body = {
        "error": 0,
        "msg": params
    };
});



module.exports = router;
