import { useState } from "react";
function Sidebar({ notes, addNote, deleteNote,updateNote, activeNote, setActiveNote , activeItem, setActiveItem, addTask}) {

    function add() {
        const title = prompt('Enter module name');

        if (title) {
            const id = addNote(title);
            setActiveNote(id);
            setActiveItem(null);
        }
    }

    function del(e, id) {
        e.stopPropagation();
        deleteNote(id);

        if (activeNote === id) {
            setActiveNote(null);
            setActiveItem(null);
        }
    }
    function addSub(id) {
        const title = prompt('Enter submodule name');
    
        if (title) {
            addTask(id, title);
        }
    }
    function edit(e, id, title) {
        e.stopPropagation();
        const newTitle = prompt('Enter new module name', title);
        if (newTitle) {
            updateNote(id, newTitle);
        }
    }
    const activeModule = notes.find((note) => note.id === activeNote);
    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <h2>My Notes</h2>
                <button onClick={add}>+ New</button>
            </div>

            <div className="module-list">

                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={`module ${activeNote === note.id ? 'active' : ''}`}
                        onClick={() =>
                            {setActiveNote(note.id);
                            setActiveItem(null);
                        }
                    }
                    >   
                     <div className="module-info">
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
                    </div>
                ))}
                </div>
<div className="submodules-panel">

<div className="submodules-header">
    <h2>Submodules</h2>

    {activeModule && (
        <button
            onClick={() => addSub(activeModule.id)}
        >
            + Add
        </button>
    )}
</div>

{activeModule ? (
    <div className="sub-list">

        {activeModule.items?.map((item) => (
            <div
                key={item.id}
                className={`sub ${
                    activeItem === item.id ? 'active' : ''
                }`}
                onClick={() => {
                    setActiveItem(item.id);
                }}
            >
                {item.title}
            </div>
        ))}

    </div>
) : (
    <p className="empty-submodules">
        Select a module
    </p>
)}

            </div>

        </aside>
    );
}

export default Sidebar;

