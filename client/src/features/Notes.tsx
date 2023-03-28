import React, { useEffect, useState } from 'react';
import { NoteBook } from '../types/types';
import { Typography } from '@mui/material';
import * as userService from '../services/user.service';
import './Notes.css';

type NoteProps = {
  userId: string;
  lessonId: string;
};

const Note: React.FC<NoteProps> = ({ userId, lessonId }) => {
  const [note, setNote] = useState<NoteBook>();
  const getNote = async () => {
    const response = await userService.getNotebyUserLesson(userId, lessonId);
    setNote(response);
  };

  useEffect(() => {
    try {
      getNote();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='note-content'>
      <Typography variant='h6' mb={2} align='left'>
        Notes:
      </Typography>
      {note && (
        <div className='note-container'>
          <h3 className='note-title'>{note.name}</h3>
          <div className='note-text'>{note.note}</div>
        </div>
      )}
    </div>
  );
};

export default Note;
