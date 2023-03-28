export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  avatar: string;
  student: boolean;
  newUser?: boolean;
  schoolId?: string;
  inCall?: boolean;
};
export type Library = {
  id: string;
  lessons: Lesson[];
  Notes: File; // need to change according to how we save in agora
  userId: string;
  notes: NoteBook[];
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
  schoolId: number;
};
export type NoteBook = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  note: string;
  libraryId: string;
  lessonId: string;
};
export type Lesson = {
  id: string;
  name: string;
  video?: string;
  drawing?: string;
  scheduledDate: string;
  subjectId: number;
  library?: Library[];
  user?: User[];
  notes?: NoteBook[];
};
