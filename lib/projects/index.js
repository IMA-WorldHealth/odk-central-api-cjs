const { client } = require('../auth.js');

exports.getProjects = async function getProjects() {
  return (await client()).get('projects').json();
};

exports.getProjectById = async function getProjectById(projectId) {
  return (await client()).get(`projects/${projectId}`).json();
};

exports.createProject = async function createProject(name) {
  return (await client()).post('projects', { json: { name } }).json();
};

exports.deleteProject = async function deleteProject(projectId) {
  return (await client()).delete(`projects/${projectId}`).json();
};
