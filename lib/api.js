import _ from 'dotenv/config';
import { got } from 'got';
import { debug as debugr } from 'debug';

import { client } from './auth.js';

const debug = debugr('odk-central-api:api');

function getUserDetails() {
  return client().get('users/current').json();
}

function getUserProjects() {
  return client().get('users/current').json();
}

function getProjectById(id) {
  return client().get('users/current').json();

}

const currentUserProjects = async () => {
  const response = await axios.get(`${api.projects}`, config);
  return response.data;
};

const forms = async (projectId) => {
  const response = await axios.get(`${api.projects}/${projectId}/forms`, config);
  return response.data;
};

/**
 * // Official route gives only submissions summary, for real data sent you MUST use the synthax bellow
 * // Route for more information on data submitted
 * // Note that the form unique name MUST finished with .svc and capital S for Submissions
 * @example /v1/projects/2/forms/ima_foyers_ameliores.svc/Submissions?$top=250&$skip=0&$count=true&$wkt=true
 * @param {number} projectId the project id
 * @param {string} formId the form unique name
 * @returns {object}
 */
const submissions = async (projectId, formId) => {
  const options = { ...config, params : { $expand : '*' } };
  const response = await axios.get(
    `${api.projects}/${projectId}/forms/${formId}.svc/Submissions`,
    options,
  );
  return response.data;
};

