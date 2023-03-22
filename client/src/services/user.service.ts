import { User } from '../types/user';

const usersDomain = import.meta.env.VITE_SERVER_DOMAIN;

export const createUser = async (user: User) => {
  const response = await fetch(`${usersDomain}/user`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response.json();
};

export const getUser = async (id = '', username = '') => {
  if (!id && !username) {
    console.log('ID or username required');
    return;
  }

  const searchValue = id ? id : username;

  const response = await fetch(`${usersDomain}/user/${searchValue}`);
  return response.json();
};
