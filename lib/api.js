/* eslint-disable max-len */
const { client } = require('./auth');

const users = require('./users');
const projects = require('./projects');
const forms = require('./forms');
const roles = require('./roles');
const assignments = require('./assignments');
const appUsers = require('./app-users');

Object.assign(module.exports, {
  users,
  projects,
  forms,
  roles,
  assignments,
  'app-users': appUsers,
});

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

exports.getSubmissionsJSONByProjectIdAndFormId = async function getSubmissionsJSON(projectId, formId) {
  const searchParams = { $expand: '*', $count: true };
  const submissions = await (await client()).get(`projects/${projectId}/forms/${formId}.svc/Submissions`, { searchParams }).json();
  return submissions.value;
};

exports.querySubmissionSince = async function querySubmissionsSince(projectId, formId, date = new Date()) {
  const searchParams = { $expand: '*', $count: true, $filter: `__system/submissionDate gt ${date.toJSON()}` };
  const submissions = await (await client()).get(`projects/${projectId}/forms/${formId}.svc/Submissions`, { searchParams }).json();
  return submissions.value;
};
