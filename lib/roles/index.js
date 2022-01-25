const { client } = require('../auth.js');

exports.listAllRoles = async function listAllRoles() {
  return (await client()).get('roles').json();
};
exports.getRoleDetails = async function getRoleDetails(roleId) {
  return (await client()).get(`roles/${roleId}`).json();
};
