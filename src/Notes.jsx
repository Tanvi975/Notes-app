import React, {useState} from 'react';
import './Notes.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function Notes() {
  const [text, setText] = useState('');   
  const [list, setList] = useState([]);
  const [subText, setSubText] = useState('');   
  const [addingTo, setAddinng] = useState(null); 
  const [content, setcontent] = useState('');
  function add() {
    const node1 = {
      id: Date.now(),
      title: text,
      items: [],
    };
  
    setList([...list, node1]);
    setText('');
  }
  function addtask(noteid) {
    if (subText.trim() === '') return;
  
    setList(
      list.map((n) =>
        n.id === noteid
          ? { ...n, items: [...n.items, subText] }
          : n
      )
    );
  
    setSubText('');
    setAddinng(null);
  }
  function deleteNote(id) {
    setList(list.filter((note) => note.id !== id));
  }

  return (
   <div className='box'>
    <h1>My Notes App</h1>
    <ReactQuill 
    theme="snow" 
    value={text} 
    onChange={setText} 
    className="edit-box"
     />
       <button onClick={add} className="add-button">
        Add Note
      </button>

      <ul className="note-list">
        {list.map((note) => (
          <li key={note.id} className="note-item">
           <div dangerouslySetInnerHTML={{ __html: note.title }} />

           <button onClick={() => deleteNote(note.id) } className='delete'>
             Delete Note
           </button>

            <ul>
              {note.items.map((task, i) => (
                <li key={i}> {task}</li>
              ))}
            </ul>

            {addingTo === note.id ? (
              <div>
                <input
                  type="text"
                  value={subText}
                  onChange={(e) => setSubText(e.target.value)}
                  placeholder="add task in list"
                />
                <button onClick={() => addtask(note.id)}>Add</button>
              </div>
            ) : (
              <button onClick={() => setAddinng(note.id)}>+ Add task</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;