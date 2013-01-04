var crypto = require("crypto")
    ,algorithm = 'RSA-SHA1'
    ,publicKeyString = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/sAN9MnVKWjoreKuUxogticxto59KGz/b/SlIrubPzNSy+GCLOsfhd9uv+sjevdfJPc1HFYi1KhUSt32kHcpr+vq9ZgEP6QfusFm+cAQcPtcjRFvRDvSk/MT3nviP+/m7kuYthBIO6sLYKE7r67DtzE9jjkU28MQuitmJxmB2M9NhSePP7qKKAR52hl4DmImdoSYRbqrTr1AubMSr9X7QF/lBJRRPEpjmId3GoXCOTXfMJR/+/El7MxBqve63GdaOHxqnQ/O9mJjwfzM2hQlUqkcETALUZnjvFwJalbHTEeivYKKmaQ9Xho6guq4oh4yEuG+P1b2Vnh5U9IKmxyQwIDAQAB'
    ,base64EncodedPublicKey = '';

var generateFormattedPublickey = function(publicKeyStr) {
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

base64EncodedPublicKey = generateFormattedPublickey(publicKeyString);

var data = '{"nonce":5915322660470439860,"orders":[{"notificationId":"-4072623435984954389","orderId":"12999763169054705758.1387973655560891","packageName":"gree.gii.mlbfulldeck","productId":"gree.gii.mlbfulldeck.item.baseball_diamond_120","purchaseTime":1357268060000,"purchaseState":0,"developerPayload":"InAppPurchaseManager.transaction59","purchaseToken":"dnmyilafoxbaxmaipaajsvsj"}]}';
var signature = "jnf7yrptjz7IeRZwY0KgXLnWYGXHv39Ro7DiC/1yB3qCZxxtmA9oPO38UO+NR2pS5Yf3FY7eV/0B5HE1KkIBdeCzriHdZmFrIy2sNTS9ZZAjF308Y4bQbC33hPWw4hFO1Mp44sFpGW0siIJgrd5jnl/ISUN6vaE2nO3G6bEmQenvQYYzcDMc5rZiPolGBsaZMxypRSh4NfSJqAGuH8JueDuGnqikPmGKRaPssYqTdv/UmSMHnMYKUAe/hezt9spdUXFsT8hiNVkb7Hwi9iJ6blmFgoe+RdQH7zO2zwcX+xm8MT6wULLxtxKlCzYhBTWlm9Atq0B/56kJJf7oe37/gg==";

var result = verify(data, signature);

console.log(result);