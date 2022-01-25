require('dotenv').config();
const test = require('ava');
const { api } = require('..');

test('#users.getCurrentUserDetails() returns details of the current user', async (t) => {
  const user = await api.users.getCurrentUserDetails();

  t.is(user.id, 140);
  t.is(user.email, process.env.ODK_CENTRAL_WEB_EMAIL);
  t.is(user.type, 'user');
});

test('#users.getUserDetails() returns details of a user', async (t) => {
  const user = await api.users.getUserDetails(140);

  t.is(user.id, 140);
  t.is(user.email, process.env.ODK_CENTRAL_WEB_EMAIL);
  t.is(user.type, 'user');
});

test('#getProjectAssignments() returns project assignments', async (t) => {
  const assignments = await api.getProjectAssignments(17);

  // only one actor is assigned
  t.is(assignments.length, 1);

  const [assignment] = assignments;

  // the test user (140) should be assigned.
  t.is(assignment.actorId, 140);
  t.is(assignment.roleId, 5);
  t.is(assignment.actor.displayName, 'Integration Test User');
});

test('#getProjectAssignmentsByRole() returns project assignments by role', async (t) => {
  const assignments = await api.getProjectAssignmentsByRole(17, 5);

  // only one actor is assigned for this role
  t.is(assignments.length, 1);
  const [assignment] = assignments;

  // the test user (140) should be assigned.
  t.is(assignment.id, 140);
  t.is(assignment.type, 'user');
  t.is(assignment.displayName, 'Integration Test User');
});

test('#getProjectAssignmentsForForms() returns project assignments for a form', async (t) => {
  const assignments = await api.getProjectAssignmentsForForms(17, 'umkc_lab_v1');

  // two actors (sync actor and one device actor) should be assigned
  t.is(assignments.length, 1);

  const assignment = assignments.pop();

  // the app user should be assigned
  t.is(assignment.actorId, 142);
  t.is(assignment.roleId, 7);
  t.is(assignment.xmlFormId, 'umkc_lab_v1');
  t.is(assignment.actor.displayName, 'Enketo sync token for 6292d312-ea57-41b3-b83e-5521d6502bec');
});

test('#getFormsByProjectId() returns forms in the project id', async (t) => {
  const forms = await api.getFormsByProjectId(17);

  // can't use the t.is() because we may have asynchronously created a new form.
  t.true(forms.length >= 1);

  const [form] = forms;
  t.is(form.projectId, 17);
  t.is(form.xmlFormId, 'umkc_lab_v1');
  t.is(form.submissions, 2);
});

test('#getFormByProjectIdAndFormId() returns the form JSON object by the xmlFormId', async (t) => {
  const form = await api.getFormByProjectIdAndFormId(17, 'umkc_lab_v1');

  t.is(form.projectId, 17);
  t.is(form.xmlFormId, 'umkc_lab_v1');
  t.is(form.submissions, 2);
});

test('#getFormXMLByProjectIdAndFormId() returns the XML defn file for a form', async (t) => {
  const xml = await api.getFormXMLByProjectIdAndFormId(17, 'umkc_lab_v1');

  t.is(typeof xml, 'string');
  t.true(xml.startsWith('<?xml'));
  t.true(xml.includes('nodeset'));
});

test('#getFormXLXSByProjectIdAndFormId() returns the XLSX file for a form', async (t) => {
  const xlsx = await api.getFormXMLByProjectIdAndFormId(17, 'umkc_lab_v1');
  t.is(typeof xlsx, 'string');
});

test('#getFormAttachmentsByProjectIdAndFormId() returns the form attachments by project and form id', async (t) => {
  const attachments = await api.getFormAttachmentsByProjectIdAndFormId(17, 'umkc_lab_v1');

  t.is(attachments.length, 1);

  const [attachment] = attachments;

  t.is(attachment.type, 'file');
  t.is(attachment.name, 'supervisors.csv');
});

test.skip('#getFormAttachmentByProjectIdAndFormId() returns the attachment by name', async (t) => {
  const attachment = await api.getFormAttachmentByProjectIdAndFormId(17, 'umkc_lab_v1', 'supervisors.csv');
  t.is(typeof attachment, 'string');
});

test('#getFormSchemaByProjectIdAndFormId() returns the form schema by project and form id', async (t) => {
  const schema = await api.getFormSchemaByProjectIdAndFormId(17, 'umkc_lab_v1');
  t.is(typeof schema, 'object');
  t.is(schema.length, 13);

  const [field] = schema;
  t.is(field.path, '/device_id');
  t.is(field.type, 'string');
});

test('#getSubmissionsByProjectAndFormId() returns the submissions for a form', async (t) => {
  const submissions = await api.getSubmissionsByProjectIdAndFormId(17, 'umkc_lab_v1');

  t.is(submissions.length, 2);

  const [submission] = submissions;

  t.is(submission.submitterId, 143);
  t.is(submission.instanceId, 'uuid:255c9f3c-db95-48e7-af81-343783a578bc');
  t.is(submission.submitter.displayName, 'Integration Test App User');
});

test('#getSubmissionByProjectAndFormId() returns the instance of a submission for a form', async (t) => {
  const submission = await api.getSubmissionByProjectIdAndFormId(17, 'umkc_lab_v1', 'uuid:255c9f3c-db95-48e7-af81-343783a578bc');

  t.is(submission.instanceId, 'uuid:255c9f3c-db95-48e7-af81-343783a578bc');
  t.is(submission.submitterId, 143);
});
