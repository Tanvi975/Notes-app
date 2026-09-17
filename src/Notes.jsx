import React, {useState} from 'react';
import './Notes.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function Notes({ notes, activeNote ,activeItem, updateContent }) {
  const note = notes.find((n) => n.id === activeNote);
  const item = note?.items?.find(
    (i) => i.id === activeItem
);

  if (!note) {
    return (
        <div className="box empty-editor">
            <h2>Select a module</h2>
            <p>Select a module from the left.</p>
        </div>
    );
}


if (!item) {
    return (
        <div className="box empty-editor">
            <h2>{note.title}</h2>
            <p>Select a submodule to start writing.</p>
        </div>
    );
}

  return (
    <div className="box">

<h1>{item.title}</h1>
    <ReactQuill
     key={item.id}
      theme="snow"
      value={item.content || ''}
      onChange={(value) => updateContent(item.id, value)}
      className="edit-box"
    />

  </div>
  );
}

export default Notes;