import _ from 'dotenv/config';
import test from 'ava';

import { auth } from '../index.js';

test('auth.client() returns an authenticated client', async (t) => {
  const client = await auth.client();

  t.true(client.defaults.options.headers.authorization.includes('Bearer'));

  // ensure we always generate a correct length token
  t.is(client.defaults.options.headers.authorization.length, 71);
});

test('auth.client() returns the same client on multiple calls', async (t) => {
  const client = await auth.client();

  // ensure we always generate a correct length token
  t.is(client.defaults.options.headers.authorization.length, 71);

  const dupe = await auth.client();

  // check if they are the same object
  t.is(client, dupe);
});

test('auth.logout() logs the agent out', async (t) => {
  const client = await auth.client();

  t.true(client.defaults.options.headers.authorization.includes('Bearer'));

  // ensure we always generate a correct length token
  t.is(client.defaults.options.headers.authorization.length, 71);

  const { success } = await auth.logout();

  // the API returns success when logout works
  t.true(success);
});

test('auth.logout() ignores successive calls', async (t) => {
  await auth.client();
  const { success } = await auth.logout();

  // the API returns success when logout works
  t.true(success);

  const result = await auth.logout();

  t.is(result, undefined);
});
