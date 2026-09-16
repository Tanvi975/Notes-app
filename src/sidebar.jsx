import { useState } from "react";
function Sidebar({ notes, addNote, deleteNote, activeNote, setActiveNote }) {

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

                        <button onClick={(e) => del(e, note.id)}>
                            Delete
                        </button>
                    </div>
                ))}

            </div>

        </aside>
    );
}

export default Sidebar;

