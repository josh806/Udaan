export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  student: boolean;
  newUser?: boolean;
  schoolId?: number;
  inCall?: boolean;
};
export type Library = {
  id: number;
  lessons: Lesson[];
  notes: File; // need to change according to how we save in agora
  user: User;
  userId: string;
};
export type School = {
  id: number;
  name: string;
  email: string;
  users: User[];
  subjects: Subject[];
};
export type Subject = {
  id: number;
  name: string;
  lessons: Lesson[];
  school: School;
  schoolId: number;
};
export type Lesson = {
  id: number;
  name: string;
  material: string;
  date: string;
  recording: boolean;
  subject: Subject;
  subjectId: number;
  library: Library[];
  user: User[];
};
