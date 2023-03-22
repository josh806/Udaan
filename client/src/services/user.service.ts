import { User } from '../types/user';

const domain = 'http://localhost:3001';

export const createUser = async (user: User) => {
  const response = await fetch(`${domain}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response.json();
};

export const getUser = async (id = '', email = '') => {
  if (!id && !email) {
    console.log('ID or email required');
    return;
  }

  const data = { id, email };

  const response = await fetch(`${domain}/users`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};
