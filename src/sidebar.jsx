import { useState } from "react";
function Sidebar({ notes, addNote, deleteNote,updateNote, activeNote, setActiveNote }) {

    function add() {
        const title = prompt('Enter module name');

        if (title) {
            const id = addNote(title);
            setActiveNote(id);
        }
    }

    function del(e, id) {
        e.stopPropagation();
        deleteNote(id);

        if (activeNote === id) {
            setActiveNote(null);
        }
    }
    function edit(e, id, title) {
        e.stopPropagation();
        const newTitle = prompt('Enter new module name', title);
        if (newTitle) {
            updateNote(id, newTitle);
        }
    }

    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <h2>Modules</h2>
                <button onClick={add}>+ New</button>
            </div>

            <div className="module-list">

                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={`module ${activeNote === note.id ? 'active' : ''}`}
                        onClick={() => setActiveNote(note.id)}
                    >   
                        <span>{note.title}</span>
                        <div>
                        <button onClick={(e) => edit(e, note.id, note.title)}>
                           Edit
                        </button>

                        <button onClick={(e) => del(e, note.id)}>
                            Delete
                        </button>
                        </div>
                    </div>
                ))}

            </div>

        </aside>
    );
}

export default Sidebar;

