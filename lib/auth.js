const { got } = require('got-cjs');
const debug = require('debug')('odk-central-api:auth');

const config = {
  serverUrl: process.env.ODK_CENTRAL_SERVER,
  userEmail: process.env.ODK_CENTRAL_WEB_EMAIL,
  userPassword: process.env.ODK_CENTRAL_WEB_PASSWORD,
};

const DEFAULT_AUTH_TIMEOUT = 1000 * 60 * 59; // 59 minutes

/**
 * @function generateAgentConfig
 *
 * @description
 * Regenerates a new agent configuration
 */
function generateAgentConfig() {
  return got.extend({
    prefixUrl: `${config.serverUrl}/v1/`,
    headers: { 'X-Extended-Metadata': true },
  });
}

let agent = generateAgentConfig();

function isLoggedIn(clientCfg) {
  return !!(clientCfg.defaults.options?.headers?.authorization);
}

exports.setConfig = function setConfig(serverUrl, userEmail, userPassword) {
  config.serverUrl = serverUrl;
  config.userEmail = userEmail;
  config.userPassword = userPassword;
  agent = generateAgentConfig();
};

exports.getConfig = function getConfig() {
  return config;
};

async function getAuthorizationToken() {
  if (isLoggedIn(agent)) {
    return agent;
  }

  const parameters = {
    email: config.userEmail,
    password: config.userPassword,
  };

  debug(`Querying session on ${config.serverUrl}`);
  const response = await agent.post('sessions', { json: parameters }).json();

  debug(`Received: ${response}`);
  return response.token;
}

/**
 * @function client
 *
 * @description
 * Returns a fully configured got client to make queries against the
 * ODK Central API.
 *
 * @returns agent
 */
module.exports.client = async function client() {
  if (!isLoggedIn(agent)) {
    const token = await getAuthorizationToken();
    agent = agent.extend({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return agent;
};

/**
 * @function logout()
 *
 * @description
 * Logs a client out of an ODK Central session.
 */
module.exports.logout = async function logout() { // eslint-disable-line
  if (isLoggedIn(agent)) {
    const token = agent.defaults.options.headers.authorization.replace('Bearer ', '').trim();
    const response = await agent.delete(`sessions/${token}`).json();

    // replace the agent with a logged out one
    agent = got.extend({
      prefixUrl: `${config.serverUrl}/v1/`,
      headers: { 'X-Extended-Metadata': true },
    });

    return response;
  }
};

// try to load
process.nextTick(() => {
  generateAgentConfig(
    process.env.ODK_CENTRAL_SERVER,
    process.env.ODK_CENTRAL_WEB_EMAIL,
    process.env.ODK_CENTRAL_WEB_PASSWORD,
  );
});

/**
 * @description
 * ODK Central does not automatically refresh session tokens, so we need
 * to manually log out and let the system figure out how to log back
 * in periodically.  This functionally refreshes the token.
 */
setInterval(async () => {
  debug('Hit DEFAULT_AUTH_TIMEOUT interval.  Clearing sessions..');

  try {
    await module.exports.logout();
  } catch (e) {
    debug('A session clearing error occurred:', e);
  }

  debug('Session cleared.');
}, DEFAULT_AUTH_TIMEOUT);
