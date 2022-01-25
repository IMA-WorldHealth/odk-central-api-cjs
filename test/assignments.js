require('dotenv').config();

const test = require('ava');
const { assignments } = require('..').api;

test.skip('#listAllAssignments() lists all assignments', async (t) => {
  const assigns = await assignments.listAllAssignments();
  console.log('Assignments:', assigns);
  t.is(assigns.length, 1);
});

test.skip('#listAllAssignedUsers() lists all assignments for a particular role', async (t) => {
  const users = await assignments.listAllAssignedUsers(1);
  t.is(users.length, 1);
});
