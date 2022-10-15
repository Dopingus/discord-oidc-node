const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const { clientId, clientSecret, redirectURL, debug } = require('../config');
const CLOUDFLARE_URL = 'https://cloudflare.com';
const DISCORD_API_BASE_URL = 'https://discord.com/api';

function createTokenHandler(privateKey) {
  return token.bind(this, privateKey);
}

async function token(privateKey, request, response) {
  const code = request.body.code;

  const token = await requestToken(code);
  if (token == null) {
    return response.sendStatus(400);
  }

  const userInfo = await requestUserInfo(token.access_token);
  if (!userInfo || !userInfo.verified) {
    return response.sendStatus(400);
  }

  const idToken = jwt.sign({
    iss: CLOUDFLARE_URL,
    aud: clientId,
    email: userInfo.email
  }, privateKey, {
    expiresIn: '1h',
    algorithm: 'RS256',
    keyid: 'jwtRS256'
  });
  const tokenResponse = {
    ...token,
    scope: 'identify email',
    id_token: idToken
  };
  if (debug) {
    console.log(`OIDC Token response: ${JSON.stringify(tokenResponse, null, 2)}`);
  }
  return response.json(tokenResponse);
}

async function requestToken(code) {
  const params = new URLSearchParams({
    'client_id': clientId,
    'client_secret': clientSecret,
    'redirect_uri': redirectURL,
    'code': code,
    'grant_type': 'authorization_code',
    'scope': 'identify email'
  }).toString();

  if (debug) {
    console.log(`Requesting token with: ${params}`);
  }

  try {
    const tokenResponse = await fetch(`${DISCORD_API_BASE_URL}/oauth2/token`, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (tokenResponse) {
      const tokenResponseJson = await tokenResponse.json();
      if (debug) {
        console.log(`Token response: ${JSON.stringify(tokenResponseJson, null, 2)}`);
      }
      return tokenResponseJson;
    } else {
      throw new Error('Empty token response.');
    }
  } catch (err) {
    console.error(`Failed to retrieve token for code: ${code} (Error: ${err})`);
    return null;
  }
}

async function requestUserInfo(accessToken) {
  try {
    const userInfoResponse = await fetch(`${DISCORD_API_BASE_URL}/users/@me`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (userInfoResponse) {
      const userInfoJson = await userInfoResponse.json();
      if (debug) {
        console.log(`User info response: ${JSON.stringify(userInfoJson, null, 2)}`);
      }
      return userInfoJson;
    } else {
      throw new Error('User info response was empty');
    }
  } catch (err) {
    console.error(`Failed to retrieve user info. (Error: ${err})`);
    return null;
  }
}


module.exports = { createTokenHandler };
