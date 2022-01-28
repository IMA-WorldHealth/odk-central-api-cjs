/**
 * @module app-users
 *
 * @description
 * App Users may only be created, fetched, and manipulated within the nested Projects subresource,
 * as App Users themselves are limited to the Project in which they are created. Through the
 * App Users API, you can create, list, and delete the App Users of any given Project. Because
 * they have extremely limited permissions, App Users cannot manage themselves; only Users
 * may access this API.
 *
 * Ref: https://odkcentral.docs.apiary.io/#reference/accounts-and-users/app-users
 */

const qrcode = require('qrcode');
const pako = require('pako');

const { client, getConfig } = require('../auth.js');
const projects = require('../projects');

async function listAllAppUsers(projectId) {
  return (await client()).get(`projects/${projectId}/app-users`).json();
}

exports.listAllAppUsers = listAllAppUsers;

exports.createAppUser = async function createAppUser(projectId, displayName) {
  return (await client()).post(`projects/${projectId}/app-users`, { json: { displayName } }).json();
};

exports.deleteAppUser = async function deleteAppUser(projectId, appUserId) {
  return (await client()).delete(`projects/${projectId}/app-users/${appUserId}`).json();
};

async function buildQRCode(projectId, token) {
  const config = getConfig();
  const project = await projects.getProjectById(projectId);

  const data = {
    general: {
      protocol: 'odk_default',
      server_url: `${config.serverUrl}/v1/key/${token}/projects/${projectId}`,
      constraint_behavior: 'on_swipe',
      autosend: 'wifi_and_cellular',
      analytics: false,
      image_size: 'small',
      high_resolution: false,
    },
    admin: {
      edit_saved: false,
      send_finalized: true,
      automatic_update: true,
    },
    project: {
      name: project.name,
      icon: 'P',
      color: '#ff0000',
    },
  };

  const Uint8Array = new TextEncoder('utf-8').encode(JSON.stringify(data));
  const compressedSettings = pako.deflate(Uint8Array, { to: 'string' });
  const encodedS64 = Buffer.from(compressedSettings).toString('base64');

  return qrcode.toDataURL(encodedS64);
}

exports.getQRCode = async function getQRCode(projectId, appUserId) {
  // there is no direct API for app users by ID. We will list all of them and pluck out
  // the correct app user to get their token.
  const appUserToken = (await listAllAppUsers(projectId))
    .filter((appUser) => appUser.id === appUserId)
    .map((appUser) => appUser.token)
    .pop();

  if (!appUserToken) {
    return '';
  }

  return buildQRCode(projectId, appUserToken);
};
