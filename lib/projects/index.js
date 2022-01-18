import { client } from '../auth.js';

export async function getProjects() {
  return (await client()).get('projects').json();
}

export async function getProjectById(projectId) {
  return (await client()).get(`projects/${projectId}`).json();
}

export async function createProject(name) {
  return (await client()).post('projects', { json: { name } }).json();
}
