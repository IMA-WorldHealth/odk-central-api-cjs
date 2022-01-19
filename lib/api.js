/* eslint-disable max-len */
const { client } = require('./auth');

const users = require('./users');
const projects = require('./projects');
const forms = require('./forms');

Object.assign(module.exports, { users, projects, forms });

exports.getProjectAssignments = async function getProjectAssignments(projectId) {
  return (await client()).get(`projects/${projectId}/assignments`).json();
};

exports.getProjectAssignmentsByRole = async function getProjectAssignmentsByRole(projectId, roleId) {
  return (await client()).get(`projects/${projectId}/assignments/${roleId}`).json();
};

exports.getProjectAssignmentsForForms = async function getProjectAssignmentsForForms(projectId) {
  return (await client()).get(`projects/${projectId}/assignments/forms`).json();
};

exports.getFormsByProjectId = async function getFormsByProjectId(projectId) {
  return (await client()).get(`projects/${projectId}/forms`).json();
};

exports.getFormByProjectIdAndFormId = async function getFormByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}`).json();
};

exports.getFormXMLByProjectIdAndFormId = async function getFormXMLByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}.xml`).text();
};

exports.getFormXLSXByProjectIdAndFormId = async function getFormXLSXByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}.xlsx`).buffer();
};

exports.getFormAttachmentsByProjectIdAndFormId = async function getFormAttachmentsByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/attachments`).json();
};

exports.getFormAttachmentByProjectIdAndFormId = async function getFormAttachmentByProjectIdAndFormId(projectId, formId, fname) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/attachment/${fname}`).buffer();
};

exports.getFormSchemaByProjectIdAndFormId = async function getFormSchemaByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/fields`, { searchParams: { odata: false } }).json();
};

exports.getSubmissionsByProjectIdAndFormId = async function getSubmissionsByProjectIdAndFormId(projectId, formId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/submissions`).json();
};

exports.getSubmissionByProjectIdAndFormId = async function getSubmissionByProjectIdAndFormId(projectId, formId, instanceId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/submissions/${instanceId}`).json();
};

exports.getSubmissionXMLByProjectIdAndFormId = async function getSubmissionXMLByProjectIdAndFormId(projectId, formId, instanceId) {
  return (await client()).get(`projects/${projectId}/forms/${formId}/submissions/${instanceId}.xml`).text();
};

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
