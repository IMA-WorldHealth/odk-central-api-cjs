const fs = require('fs/promises');
const path = require('path');
const { client } = require('../auth');

exports.createFormFromXLSX = async function createFormFromXLSX(projectId, xlsxPath, fallbackId) {
  const headers = { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };

  if (fallbackId) {
    headers['X-XlsForm-FormId-Fallback'] = fallbackId;
  }

  const data = await fs.readFile(xlsxPath);

  return (await client()).post(`projects/${projectId}/forms?publish=false&ignoreWarnings=true`, {
    headers,
    body: data,
  }).json();
};

exports.addAttachmentToDraftForm = async function addAttachmentToDraftForm(
  projectId,
  xmlFormId,
  attachmentPath,
) {
  const data = await fs.readFile(attachmentPath);
  const { base } = path.parse(attachmentPath);

  return (await client()).post(`projects/${projectId}/forms/${xmlFormId}/draft/attachments/${base}`, {
    body: data,
  }).json();
};

/**
 * @function publishDraftForm
 *
 * @description
 * Publishes the draft form.
 */
exports.publishDraftForm = async function publishDraftForm(projectId, xmlFormId, newVersion) {
  const version = newVersion || Date.now();
  return (await client())
    .post(`projects/${projectId}/forms/${xmlFormId}/draft/publish?version=${version}`).json();
};

exports.deleteForm = async function deleteForm(projectId, xmlFormId) {
  return (await client()).delete(`projects/${projectId}/forms/${xmlFormId}`).json();
};
