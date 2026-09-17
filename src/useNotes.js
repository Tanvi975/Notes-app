import { useState, useEffect } from 'react';

function useNotes() {
    const [notes, setNotes] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('notes');

        if (saved) {
            const savedNotes = JSON.parse(saved);

            const fixedNotes = savedNotes.map((note) => ({
                ...note,
                items: note.items || []
            }));

            setNotes(fixedNotes);
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
        setNotes((prevNotes) => [...prevNotes, newNote]);
        return newNote.id;
    }


    function updateNote(id, title) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? {...note, title } :
                note)
        );
    }

    function updateContent(itemId, content) {
        setNotes((prevNotes) =>
            prevNotes.map((note) => ({
                ...note,
                items: (note.items || []).map((item) =>
                    item.id === itemId ? {...item, content } :
                    item
                )
            }))
        );
    }

    function deleteNote(id) {
        setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== id)
        );
    }

    function addTask(noteId, taskText) {
        const item = {
            id: Date.now(),
            title: taskText,
            content: ''
        };

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === noteId ? {
                    ...note,
                    items: [...(note.items || []), item]
                } : note
            )
        );
        return item.id;
    }

    return { notes, addNote, updateNote, deleteNote, addTask, updateContent };
}

export default useNotes;