/*
    解析带上传图片的表单数据并格式化的数据结果
*/

var fs = require('fs');
var path = require('path');
var parse = require('co-busboy');

module.exports = function() {
    var _params = {};
    return function* uploadImg(next) {
        //解析表单数据
        this.parseForm = function*(parts) {
            var _parts = parse(parts),
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
                            _params.filePath = filePath;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            return _params;
        }
        yield next;
    }
};

var writeStreamFinish = function (stream){
    return new Promise(function (resolve, reject){
        stream.on("finish",function(){
            resolve({"error":0,"msg":{"status":"finish"}});
        });
    });
};
