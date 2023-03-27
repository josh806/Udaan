/*
Add try/catch blocks on each request --------------
*/

// import { User } from '../types/user';

const whiteboardDomain = import.meta.env.VITE_SERVER_DOMAIN;

export const createWhiteboard = async (lessonId: string) => {
  const response = await fetch(
    `${whiteboardDomain}/roomToken/teacher/${lessonId}`,
    {
      method: 'GET',
    }
  );
  return response.json();
};

export const joinWhiteboard = async (lessonId: string) => {
  const response = await fetch(
    `${whiteboardDomain}/roomToken/student/${lessonId}`,
    {
      method: 'GET',
    }
  );
  return response.json();
};
