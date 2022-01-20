const { client } = require('../auth.js');

exports.listAllUsers = async function listAllUsers() {
  return (await client()).get('users').json();
};

exports.getCurrentUserDetails = async function getCurrentUserDetails() {
  return (await client()).get('users/current').json();
};

exports.getUserDetails = async function getUserDetails(userId) {
  return (await client()).get(`users/${userId}`).json();
};

exports.createUser = async function createUser(email) {
  return (await client()).post('users', { json: { email } }).json();
};

exports.createUserWithPassword = async function createUserWithPassword(email, password) {
  return (await client()).post('users', { json: { email, password } }).json();
};

exports.deleteUser = async function deleteUser(userId) {
  return (await client()).delete(`users/${userId}`).json();
};

// ENHANCEMENT FOR THE API

// This code has to be organized according the API standards

// APP USERS
exports.listAllAppUsers = async function listAllAppUsers(projectId) {
  return (await client()).get(`projects/${projectId}/app-users`).json();
};
exports.createAppUser = async function createAppUser(projectId, displayName) {
  return (await client()).post(`projects/${projectId}/app-users`, { json : { displayName } }).json();
};
exports.deleteAppUser = async function deleteAppUser(projectId, appUserId) {
  return (await client()).delete(`projects/${projectId}/app-users/${appUserId}`).json();
};
// END OF APP USERS

// ROLES
exports.listAllRoles = async function listAllRoles() {
  return (await client()).get('roles').json();
};
exports.getRoleDetails = async function getRoleDetails(roleId) {
  return (await client()).get(`roles/${roleId}`).json();
};
// END OF ROLES

// ASSIGNMENT
exports.listAllAssignments = async function listAllAssignments() {
  return (await client()).get('assignments').json();
};
exports.listAllAssignedUsers = async function listAllAssignedUsers(roleId) {
  return (await client()).get(`assignments/${roleId}`).json();
};
exports.assignRoleToUser = async function assignRoleToUser(roleId, userId) {
  return (await client()).post(`assignments/${roleId}/${userId}`).json();
};
exports.revokeRoleToUser = async function revokeRoleToUser(roleId, userId) {
  return (await client()).delete(`assignments/${roleId}/${userId}`).json();
};
exports.listAllProjectRoleAssignments = async function listAllProjectRoleAssignments(projectId) {
  return (await client()).get(`projects/${projectId}/assignments`).json();
};
exports.listAllUsersWithProjectRole = async function listAllUsersWithProjectRole(projectId, roleId) {
  return (await client()).get(`projects/${projectId}/assignments/${roleId}`).json();
};
exports.assingUserToProjectRole = async function assingUserToProjectRole(projectId, roleId, userId) {
  return (await client()).post(`projects/${projectId}/assignments/${roleId}/${userId}`).json();
};
exports.revokeUserToProjectRole = async function assingUserToProjectRole(projectId, roleId, userId) {
  return (await client()).delete(`projects/${projectId}/assignments/${roleId}/${userId}`).json();
};
// END OF ASSIGNMENT

// END OF ENHANCEMENT
