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
