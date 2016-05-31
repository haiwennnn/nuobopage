var router = require('koa-router')();

router.get('test', function*(next) {
	var user = "yhw";
    yield this.render('views/test', {
        user: user,
        page: {
            name: '极客识别云平台',
            version: '0.101',
            current: 'index'
        }
    });
});

module.exports = router;
