var fs = require('fs');
var path = require('path');
var parse = require('co-busboy');

function PostAction() {}

PostAction.prototype.parseForm = function*(parts) {
    var _parts = parse(parts),
    	_params = {},
        part;
    while (part = yield _parts) {
        try {
            if (part.length) {
                _params[part[0]] = part[1];
            } else {
                fileRec = part;
                var filePath = global.uploadPath + "/" + Math.random().toString() + part.filename;
                var stream = fs.createWriteStream(global.basepath + filePath);
                fileRec.pipe(stream);
                var writeStatus = yield writeStreamFinish(stream);
                if (writeStatus.error === 0 && writeStatus.msg.status === "finish") {
                    _params.filePath = filePath.replace("/public","");
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    return _params;
}

var writeStreamFinish = function(stream) {
    return new Promise(function(resolve, reject) {
        stream.on("finish", function() {
            resolve({ "error": 0, "msg": { "status": "finish" } });
        });
    });
};

module.exports = new PostAction();
