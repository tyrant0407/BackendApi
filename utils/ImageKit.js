
var ImageKit = require("imagekit");

exports.initImageKit = function () {
    var imagekit = new ImageKit({
        publicKey: process.env.PUBLICKEY_IMAGEKIT,
        privateKey: process.env.PRIVATEKEY_IMAGEKIT,
        urlEndpoint: process.env.ENDPOINTURL_IMAGEKIT,
    });

    return imagekit
}

