const fs = require('fs/promises');
const { client } = require('../auth');

exports.createFormFromXLSX = async function createFormFromXLSX(projectId, xlsxPath) {
  await client.post(`projects/${projectId}/forms`, {
    headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    body: fs.createReadStream(xlsxPath),
  });
};
