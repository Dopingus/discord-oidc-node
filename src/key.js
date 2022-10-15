const fs = require('fs')

function getKeyPair() {
  if (!fs.existsSync('./jwtRS256.key') || !fs.existsSync('./jwtRS256.key.pub')) {
    console.log('Key pair not found, generating one now...');
    return generateKeyPair();
  } else {
    const privateKey = fs.readFileSync('./jwtRS256.key', 'utf8');
    const publicKey = fs.readFileSync('./jwtRS256.key.pub', 'utf8');
    return { privateKey, publicKey };
  }
}

function generateKeyPair() {
  const crypto = require('crypto');
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });
  return { privateKey: keyPair.privateKey, publicKey: keyPair.publicKey };
}

module.exports = { getKeyPair };
