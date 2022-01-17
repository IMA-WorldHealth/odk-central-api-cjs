import { client } from '../auth.js';

export async function getCurrentUserDetails() {
  return (await client()).get('users/current').json();
}

export async function getUserDetails(userId) {
  return (await client()).get(`users/${userId}`).json();
}

export async function createUser(email) {
  return (await client()).post('users', { json: { email } }).json();
}

export async function createUserWithPassword(email, password) {
  return (await client()).post('users', { json: { email, password } }).json();
}

export async function deleteUser(userId) {
  return (await client()).delete(`users/${userId}`).json();
}
