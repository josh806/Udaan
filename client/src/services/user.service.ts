/*
Add try/catch blocks on each request --------------
*/

import { Lesson, NoteBook, User } from '../types/types';

const usersDomain = import.meta.env.VITE_SERVER_DOMAIN;

export const getUser = async (userId: string) => {
  const response = await fetch(`${usersDomain}/user/userId/${userId}`, {
    method: 'GET',
  });
  return response.json();
};

export const createUser = async (user: User) => {
  const response = await fetch(`${usersDomain}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (user: User) => {
  const response = await fetch(`${usersDomain}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await fetch(`${usersDomain}/user/username/${username}`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getLessonsbyUserId = async (userId: string) => {
  try {
    const response = await fetch(`${usersDomain}/library/${userId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getNotebyUserLesson = async (userId: string, lessonId: string) => {
  try {
    const response = await fetch(
      `${usersDomain}/noteBook/${userId}/${lessonId}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllLessons = async (schoolId: string) => {
  try {
    const response = await fetch(`${usersDomain}/lesson/school/${schoolId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubjects = async (schoolId: string) => {
  try {
    const response = await fetch(`${usersDomain}/subject/${schoolId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const postNewLesson = async (lesson: Lesson) => {
  try {
    const response = await fetch(`${usersDomain}/lesson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lesson),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const editNote = async (
  userId: string,
  lessonId: string,
  note: string
) => {
  console.log(note);
  try {
    const response = await fetch(`${usersDomain}/noteBook`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note, userId, lessonId }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
