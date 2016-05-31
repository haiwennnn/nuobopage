var router = require('koa-router')();

router.get('/', function*(next) {
    yield this.render("views/index", {
        title: "诺博",
        page: "index"
    });
});

router.get("trends", function*(next) {
    yield this.render("views/trends", {
        title: "诺博-行业动态",
        page: "trends"
    });
});

router.get("solution", function*(next) {
    yield this.render("views/solution", {
        title: "诺博-解决方案",
        page: "solution"
    });
});

router.get("case", function*(next) {
    yield this.render("views/case", {
        title: "诺博-成功案例",
        page: "case"
    });
});

router.get("solution/series", function*(next) {

    yield this.render("views/solution_series", {
        title: "诺博-全新移动工作站",
        page: "series"
    });
});

router.get("solution/chest", function*(next) {

    yield this.render("views/solution_chest", {
        title: "诺博-智能药柜",
        page: "chest"
    });
});

router.get("about", function*(next) {
    yield this.render("views/about", {
        title: "诺博-关于我们",
        page: "about"
    });
});

module.exports = router;
