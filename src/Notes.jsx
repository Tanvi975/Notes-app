import React, {useState} from 'react';
import './Notes.css';

function Notes() {
  const [text, setText] = useState('');   
  const [list, setList] = useState([]);
  const [subText, setSubText] = useState('');   
  const [addingTo, setAddinng] = useState(null); 
  function add() {
    if (text.trim() === '') return;
  
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
  return (
   <div className='Box'>
    <h1>My Notes App</h1>
    <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="write here"
        className="input-box"
      />
       <button onClick={add} className="add-button">
        Add Note
      </button>

      <ul className="note-list">
        {list.map((note) => (
          <li key={note.id} className="note-item">
            <strong>{note.title}</strong>

            <ul>
              {note.items.map((task, i) => (
                <li key={i}>✓ {task}</li>
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