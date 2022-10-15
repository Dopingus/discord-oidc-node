const { clientId, clientSecret, redirectURL, debug } = require('../config');

const DISCORD_OAUTH_AUTHORIZE_URL = 'https://discord.com/oauth2/authorize?';


async function authorize(request, response) {
  const params = new URLSearchParams({
      'client_id': clientId,
      'client_secret': clientSecret,
      'redirect_uri': redirectURL,
      'response_type': 'code',
      'scope': 'identify email',
      'state': request.query['state']
  }).toString();

  if (debug) {
    console.log(`Received authorize request with parameters: ${params}`);
  }

  response.redirect(DISCORD_OAUTH_AUTHORIZE_URL + params);
}


module.exports = { authorize };
