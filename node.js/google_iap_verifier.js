// https://github.com/nothing2lose/node-InAppBilling

var crypto = require("crypto")
    ,algorithm = 'RSA-SHA1'
    ,publicKeyString = 'rsa public key'
    ,base64EncodedPublicKey = '';

var generateBase64EncodedPublicKey = function(publicKeyStr) {
    var KEY_PREFIX, KEY_SUFFIX, chunkSize, chunks, str;
    KEY_PREFIX = "-----BEGIN PUBLIC KEY-----\n";
    KEY_SUFFIX = '\n-----END PUBLIC KEY-----';
    str = publicKeyStr;
    chunks = [];
    chunkSize = 64;
    while (str) {
        if (str.length < chunkSize) {
            chunks.push(str);
            break;
        } else {
            chunks.push(str.substr(0, chunkSize));
            str = str.substr(chunkSize);
        }
    }
    str = chunks.join("\n");
    str = KEY_PREFIX + str + KEY_SUFFIX;
    return str;
};

var verify = function(signedData, signature) {
    var verifier;
    verifier = crypto.createVerify(algorithm);
    verifier.update(signedData);
    return verifier.verify(base64EncodedPublicKey, signature, 'base64');
};

base64EncodedPublicKey = generateBase64EncodedPublicKey(publicKeyString);

var data = '{"nonce":5915322660470439860,"orders":[{"notificationId":"-4072623435984954389","orderId":"12999763169054705758.1387973655560891","packageName":"gree.gii.mlbfulldeck","productId":"gree.gii.mlbfulldeck.item.baseball_diamond_120","purchaseTime":1357268060000,"purchaseState":0,"developerPayload":"InAppPurchaseManager.transaction59","purchaseToken":"dnmyilafoxbaxmaipaajsvsj"}]}';
var signature = "jnf7yrptjz7IeRZwY0KgXLnWYGXHv39Ro7DiC/1yB3qCZxxtmA9oPO38UO+NR2pS5Yf3FY7eV/0B5HE1KkIBdeCzriHdZmFrIy2sNTS9ZZAjF308Y4bQbC33hPWw4hFO1Mp44sFpGW0siIJgrd5jnl/ISUN6vaE2nO3G6bEmQenvQYYzcDMc5rZiPolGBsaZMxypRSh4NfSJqAGuH8JueDuGnqikPmGKRaPssYqTdv/UmSMHnMYKUAe/hezt9spdUXFsT8hiNVkb7Hwi9iJ6blmFgoe+RdQH7zO2zwcX+xm8MT6wULLxtxKlCzYhBTWlm9Atq0B/56kJJf7oe37/gg==";

var result = verify(data, signature);

console.log(result);
