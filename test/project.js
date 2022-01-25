require('dotenv').config();

const test = require('ava');
const { projects } = require('..').api;

test('#getProjects() lists all projects', async (t) => {
  const list = await projects.getProjects();
  t.is(list.length, 1);
  const [p] = list;
  t.is(p.id, 17);
  t.is(p.name, 'Integration Test Project');
});

test('#getProjectById() loads a project by its id', async (t) => {
  const p = await projects.getProjectById(17);
  t.is(p.id, 17);
  t.is(p.name, 'Integration Test Project');
});

/**
 * TODO(@jniles) - test user does not have permissions to create projects

let newProjectId;
test.serial('#createProject() creates a new project', async (t) => {
  const p = await projects.createProject('Second Int. Project');

  t.true(p.id > 0);

  newProjectId = p.id;
  t.is(p.name, 'Second Int. Project');

  const list = await projects.getProjects();
  t.is(list.length, 2);
});

test.serial('#deleteProject() deletes a new project', async (t) => {
  const { success } = await projects.deleteProject(newProjectId);
  t.true(success);

  const list = await projects.getProjects();
  t.is(list.length, 1);
});
*/
