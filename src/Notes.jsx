import React, {useState} from 'react';
import './Notes.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function Notes({ notes, activeNote , updateContent }) {
  const note = notes.find((n) => n.id === activeNote);

  if (!note) {
    return <h2>Select a module</h2>;
  }

  return (
    <div className="box">

    <h1>{note.title}</h1>

    <ReactQuill
      theme="snow"
      value={note.content || ''}
      onChange={(value) => updateContent(note.id, value)}
      className="edit-box"
    />

  </div>
  );
}

export default Notes;