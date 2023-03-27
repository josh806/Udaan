import React, { useEffect, useState } from 'react';
import { NoteBook } from '../types/types';
import { Typography } from '@mui/material';
import * as userService from '../services/user.service';

type NoteProps = {
  userId: string;
  lessonId: string;
};

const Note: React.FC<NoteProps> = ({ userId, lessonId }) => {
  const [note, setNote] = useState<NoteBook>();
  const getNote = async () => {
    const response = await userService.getNotebyUserLesson(userId, lessonId);
    setNote(response);
    console.log(note);
  };

  useEffect(() => {
    try {
      getNote();
      console.log(note);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Typography>
        <h4>Notes:</h4>
      </Typography>
      {/* <div>{note.name}</div> */}
    </>
  );
};

export default Note;
