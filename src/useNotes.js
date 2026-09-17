import { useState, useEffect } from 'react';

function useNotes() {
    const [notes, setNotes] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('notes');
        if (saved) {
            setNotes(JSON.parse(saved));
        }
        setLoad(true);
    }, []);

    useEffect(() => {
        if (load) {
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }, [notes, load]);

    function addNote(title) {
        const newNote = {
            id: Date.now(),
            title,
            content: '',
            items: [],
        };
        setNotes([...notes, newNote]);
        return newNote.id;
    }

    function updateNote(id, title) {
        setNotes(notes.map((n) => (n.id === id ? {...n, title } : n)));
    }

    function updateContent(id, content) {
        setNotes(
            notes.map((n) =>
                n.id === id ? {...n, content } : n
            )
        );
    }

    function deleteNote(id) {
        setNotes(notes.filter((n) => n.id !== id));
    }

    function addTask(noteId, taskText) {
        setNotes(
            notes.map((n) =>
                n.id === noteId ? {...n, items: [...n.items, taskText] } :
                n
            )
        );
    }

    return { notes, addNote, updateNote, deleteNote, addTask, updateContent };
}

export default useNotes;