import React, { useEffect, useState } from 'react';
import { NoteBook } from '../types/types';
import { Typography, IconButton, Tooltip } from '@mui/material';
import * as userService from '../services/user.service';
import { Edit, Close, Save } from '@mui/icons-material';
import './Notes.css';

type NoteProps = {
  userId: string;
  lessonId: string;
  setOpenNotesModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Note: React.FC<NoteProps> = ({ userId, lessonId, setOpenNotesModal }) => {
  const [note, setNote] = useState<NoteBook>();
  const [edit, setEdit] = useState(false);

  const getNote = async () => {
    const response = await userService.getNotebyUserLesson(userId, lessonId);
    setNote(response);
  };

  const editNote = async () => {
    const noteText = document.getElementsByClassName('note-text')[0].innerHTML;
    setEdit(false);
    if (note) {
      await userService.editNote(userId, lessonId, noteText);
    }
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
      <div className='buttons-notes'>
        {!edit ? (
          <Tooltip title='Enable Edit'>
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Save Edit'>
            <IconButton onClick={() => editNote()}>
              <Save />
            </IconButton>
          </Tooltip>
        )}

        <IconButton onClick={() => setOpenNotesModal(false)}>
          <Close />
        </IconButton>
      </div>
      <Typography variant='h6' mb={2} align='left'>
        Notes:
      </Typography>
      {note && (
        <div className='note-container'>
          {note.name && <h3 className='note-title'>{note.name}</h3>}
          <div
            className='note-text'
            contentEditable={edit}
            suppressContentEditableWarning={true}
          >
            {note.note}
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
