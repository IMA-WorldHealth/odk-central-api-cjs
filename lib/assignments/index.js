const { client } = require('../auth.js');

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

exports.listAllUsersWithRole = async function listAllUsersWithRole(projectId, roleId) {
  return (await client()).get(`projects/${projectId}/assignments/${roleId}`).json();
};

exports.assignUserRole = async function assignUserRole(projectId, roleId, userId) {
  return (await client()).post(`projects/${projectId}/assignments/${roleId}/${userId}`).json();
};

exports.revokeUserRole = async function revokeUserRole(projectId, roleId, userId) {
  return (await client()).delete(`projects/${projectId}/assignments/${roleId}/${userId}`).json();
};
