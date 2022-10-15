const jwk = require('json-web-key');


function createJwskHandler(publicKey) {
  return jwsk.bind(this, publicKey);
}

function jwsk(publicKey, request, response) {
    return response.json({
        keys: [{
            alg: 'RS256',
            kid: 'jwtRS256',
            ...jwk.fromPEM(publicKey).toJSON()
        }]
    });
}


module.exports = { createJwskHandler };
