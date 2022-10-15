const { port, host } = require('./config');

const { createServer } = require('./server');
const { getKeyPair } = require('./key');

const { authorize } = require('./routes/authorize');
const { createTokenHandler } = require('./routes/token');
const { createJwskHandler } = require('./routes/jwks');


function startServer() {
  const { privateKey, publicKey } = getKeyPair();
  const app = createServer();

  app.get('/authorize', authorize);
  app.post('/token', createTokenHandler(privateKey));
  app.get('/jwks.json', createJwskHandler(publicKey));
  
  app.listen(port, host, async () => {
      console.log(`Discord OIDC Wrapper at ${host}:${port} started...`)
  });
}

startServer();
