import React from 'react';
import { NoteBook } from '../types/types';

type NoteProps = {
  notes: NoteBook[] | undefined;
};

const Notes: React.FunctionComponent<NoteProps> = ({ notes }) => {
  return (
    <>
      <h4>Notes:</h4>
      {notes &&
        notes.map((note: NoteBook) => <div key={note.id}>{note.name}</div>)}
    </>
  );
};

export default Notes;
