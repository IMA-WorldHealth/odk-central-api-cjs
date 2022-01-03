import { got } from 'got';
import debugr from 'debug';

const debug = debugr('odk-central-api:auth');

let agent = got.extend({
  prefixUrl: `${process.env.ODK_CENTRAL_SERVER}/v1/`,
  headers: { 'X-Extended-Metadata': true },
});

function isLoggedIn(client) {
  return !!(client.defaults.options?.headers?.authorization);
}

async function getAuthorizationToken() {
  if (isLoggedIn(agent)) {
    return agent;
  }

  const parameters = {
    email: process.env.ODK_CENTRAL_WEB_EMAIL,
    password: process.env.ODK_CENTRAL_WEB_PASSWORD,
  };

  debug(`Querying session on ${process.env.ODK_CENTRAL_SERVER}`);
  const response = await agent.post('sessions', { json : parameters }).json();

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
export async function client() {
  if (!isLoggedIn(agent)) {
    const token = await getAuthorizationToken();
    agent = agent.extend({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return agent;
}

/**
 * @function logout()
 *
 * @description
 * Logs a client out of an ODK Central session.
 */
export async function logout() {
  if (isLoggedIn(agent)) {
    const token = agent.defaults.options.headers.authorization.replace('Bearer ', '').trim();
    const response = await agent.delete(`sessions/${token}`).json();

    // replace the agent with a logged out one
    agent = got.extend({
      prefixUrl: `${process.env.ODK_CENTRAL_SERVER}/v1/`,
      headers: { 'X-Extended-Metadata': true },
    });

    return response;
  }
}

