
function readFromEnvironment(varName) {
    const envVar = process.env[varName];
    if (!envVar || envVar === '') {
        throw new Error(`EnvVar ${varName} not set!`);
    }
    return envVar;
}


const config = {
    clientId: readFromEnvironment('CLIENT_ID'),
    clientSecret: readFromEnvironment('CLIENT_SECRET'),
    redirectURL: readFromEnvironment('REDIRECT_URL'),
    host: readFromEnvironment('HOST'),
    port: readFromEnvironment('PORT'),
    debug: process.env.DEBUG || false,
};

module.exports = config;
