require('dotenv').config();

const test = require('ava');
const { api } = require('..');

const appUsers = api['app-users'];

const projectId = 17;

let appUserId = 0;
test.serial('#createAppUser() creates an app user', async (t) => {
  const name = 'Integration Test App User';
  const user = await appUsers.createAppUser(projectId, name);

  t.is(user.displayName, name);
  appUserId = user.id;
});

test.serial('#listAllAppUsers() lists all app users', async (t) => {
  const users = await appUsers.listAllAppUsers(projectId);
  t.is(users.length, 1);
});

test.serial('#deleteAppUser() delete an app user', async (t) => {
  const { success } = await appUsers.deleteAppUser(projectId, appUserId);
  t.is(success, true);

  const users = await appUsers.listAllAppUsers(projectId);
  t.is(users.length, 0);
});
