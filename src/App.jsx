import {useState} from 'react';
import Notes from "./Notes";
import useNotes from './useNotes';
import Sidebar from './sidebar';
import './App.css';

function App() { const { notes, addNote, updateNote, deleteNote, addTask , updateContent} = useNotes(); 
const [activeNote, setActiveNote] = useState(null);
  return (
    <div className="app">
       <Sidebar notes={notes}
        addNote={addNote} 
        deleteNote={deleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        /> 
       <main className="workspace"> 
       <Notes
          notes={notes}
          activeNote={activeNote}
          updateContent={updateContent}
        />
       </main>
          </div>
  );
}

export default App;