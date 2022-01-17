import _ from 'dotenv/config';

import { client } from './auth.js';
import * as users from './users/index.js';

export { users };

export async function getProjects() {
  return (await client()).get('projects').json();
}

export async function getProjectById(projectId) {
  return (await client()).get(`projects/${projectId}`).json();
}

export async function getProjectAssignments(projectId) {
  return (await client()).get(`projects/${projectId}/assignments`).json();
}

export async function getProjectAssignmentsByRole(projectId, roleId) {
  return (await client()).get(`projects/${projectId}/assignments/${roleId}`).json();
}

export async function getProjectAssignmentsForForms(projectId) {
  return (await client()).get(`projects/${projectId}/assignments/forms`).json();
}

export async function getFormsByProjectId(projectId) {
  return (await client()).get(`projects/${projectId}/forms`).json();
}

export async function getFormByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}`).json();
}

export async function getFormXMLByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}.xml`).text();
}

export async function getFormXLSXByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}.xlsx`).buffer();
}

export async function getFormAttachmentsByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/attachments`).json();
}

export async function getFormAttachmentByProjectIdAndFormId(projectId, formId, fname) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/attachment/${fname}`).buffer();
}

export async function getFormSchemaByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/fields`, { searchParams: { odata: false } }).json();
}

export async function getSubmissionsByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/submissions`).json();
}

export async function getSubmissionByProjectIdAndFormId(projectId, formId, instanceId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/submissions/${instanceId}`).json();
}

export async function getSubmissionXMLByProjectIdAndFormId(projectId, formId, instanceId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/submissions/${instanceId}.xml`).text();
}

/**
 * // Official route gives only submissions summary, for real data sent you MUST use the synthax bellow
 * // Route for more information on data submitted
 * // Note that the form unique name MUST finished with .svc and capital S for Submissions
 * @example /v1/projects/2/forms/ima_foyers_ameliores.svc/Submissions?$top=250&$skip=0&$count=true&$wkt=true
 * @param {number} projectId the project id
 * @param {string} formId the form unique name
 * @returns {object}
const submissions = async (projectId, formId) => {
  const options = { ...config, params : { $expand : '*' } };
  const response = await axios.get(
    `${api.projects}/${projectId}/forms/${formId}.svc/Submissions`,
    options,
  );
  return response.data;
};

 */
