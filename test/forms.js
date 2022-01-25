require('dotenv').config();
const test = require('ava');
const path = require('path');
const { forms } = require('..').api;
const { api } = require('..');

const xmlFormId = 'bhima_pv_reception';

test.serial('#api.forms.createFormFromXLSX() creates a new form', async (t) => {
  const filePath = path.join(__dirname, 'fixtures/test-form.xlsx');
  const form = await forms.createFormFromXLSX(17, filePath, Date.now());

  t.is(form.xmlFormId, xmlFormId);
});

test.serial('#api.forms.addAttachmentToDraftForm() adds an attachment to a draft form', async (t) => {
  const attachmentPath = path.join(__dirname, 'fixtures/lots.csv');
  await forms.addAttachmentToDraftForm(17, xmlFormId, attachmentPath);
  t.pass();
});

// ensure that we now have another form
test.serial('#getFormByProjectIdAndFormId() returns the form JSON object by the xmlFormId', async (t) => {
  const form = await api.getFormByProjectIdAndFormId(17, xmlFormId);

  t.is(form.projectId, 17);
  t.is(form.xmlFormId, xmlFormId);
  t.is(form.submissions, 0);
});

test.serial('#api.forms.publishDraftForm() publishes the form', async (t) => {
  const { success } = await forms.publishDraftForm(17, xmlFormId);
  t.true(success);
});

test('#api.forms.deleteForm() deletes the newly created form', async (t) => {
  const { success } = await forms.deleteForm(17, xmlFormId);
  t.true(success);
});
