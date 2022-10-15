# General
discord-oidc-node is a NodeJS application which wraps Discord OAuth2 to adapt it for OpenID Connect.
This uses a modified version of kimcore's discord-oidc from https://github.com/kimcore/discord-oidc.

## Config
Set environment variables before running the app and insert your ClientID, Client Secret, Redirect URL, Port, and Host.
```.env
CLIENT_ID=<YOUR_CLIENT_ID>
CLIENT_SECRET=<YOUR_CLIENT_SECRET>
REDIRECT_URL=<https://YOUR_GATEWAY.cloudflareaccess.com/cdn-cgi/access/callback>
HOST=<127.0.0.1>
PORT=<1214>
```

CLIENT_ID and CLIENT_SECRET can be setup in Discord's developer portal (refer to Discord's documentation for details).

The REDIRECT_URL is composed of your Cloudflare team name prepended to `.cloudflareaccess.com` (more detailed instructions can be found in Cloudflare's setup page for a new OIDC authorization method).

HOST and PORT refer to the bind address and listening port.

## Running discord-oidc-node
### Directly
Install dependencies with `npm ci` first.
Then either start it by executing `npm start` or `node src/start.js`.
It is recommended to use a reverse proxy to secure the connection to the application.

### Docker
There is a Github action configured to build and push this repository's main branch to https://hub.docker.com/repository/docker/dopingus/discord-oidc-node.
The image is based on the official nodejs image using Alpine (see `Dockerfile`).

### Kubernetes
The image used for docker can be integrated into a K8s deployment.
It is recommended to provide all environment variables apart from the client secret as a `ConfigMap` to the pod spec.
The client secret can be mounted through a K8s `Secret` in the pod.

## Cloudflare Configuration
![](https://i.imgur.com/6EtG21Y.png)

(Source: https://github.com/kimcore/discord-oidc)
