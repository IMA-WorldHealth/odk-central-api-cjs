import * as fs from 'fs/promises';
import { client } from '../auth.js';

export async function createFormFromXLSX(projectId, xlsxPath) {
  await client.post(`projects/${projectId}/forms`, {
    headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    body: fs.createReadStream(xlsxPath),
  });
}
