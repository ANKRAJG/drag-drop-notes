import { createRef, useCallback, useEffect, useRef, useState } from "react";
import Note from "./Note";

const notesObjs = [
    { id: 1, text: "Curran stars in tricky chase to condemn Royals to fourth straight loss." },
    { id: 2, text: "We let ourselves down as a fielding unit - Shubman Gill." },
    { id: 3, text: "T20 World Cup: No Reserve day for 2nd semifinal; match can be extended by 4 hrs. Bengaluru, Chennai to host South Africa Women series." }
  ];

const NotesList = () => {
    const [notes, setNotes] = useState(notesObjs);
    const noteRefs = useRef([]); 

    const determineNewPosition = useCallback(() => {
        const maxX = window.innerWidth - 350;
        const maxY = window.innerHeight - 250;

        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY),
        };
    }, []);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.map(note => {
            const savedNote = savedNotes.find(n => n.id===note.id);
            if(savedNote) {
                return { ...note, position: savedNote.position };
            } else {
                const position = determineNewPosition();
                return { ...note, position };
            }
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, [determineNewPosition]);

    const updateNotePosition = (id, newPosition) => {
        const updatedNotes = notes.map(n => {
            return (n.id === id ? { ...n, position: newPosition } : n);
        }); 
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    const checkForOverlap = (id) => {
        const currentRef = noteRefs.current[id].current;
        const currRect = currentRef.getBoundingClientRect();

        return notes.some(note => {
            if(id === note.id) 
                return false;

            const otherRef = noteRefs.current[note.id].current;
            const otherRect = otherRef.getBoundingClientRect();

            const overlap = !(
                currRect.left > otherRect.right 
                || currRect.right < otherRect.left
                || currRect.top > otherRect.bottom
                || currRect.bottom < otherRect.top
            );

            return overlap;
        });
    };

    const handleDragStart = (ev, note) => {
        const noteRef = noteRefs.current[note.id].current;
        const rect = noteRef.getBoundingClientRect();
        const initialOffsetX = ev.clientX - rect.left;
        const initialOffsetY = ev.clientY - rect.top;

        const startPosition = note.position;

        const onMouseMove = (e) => {
            const newX = e.clientX - initialOffsetX;
            const newY = e.clientY - initialOffsetY;

            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            const finalRect = noteRef.getBoundingClientRect();
            const newPostion = { x: finalRect.left, y: finalRect.top };

            if(checkForOverlap(note.id)) {
                noteRef.style.left = `${startPosition.x}px`;
                noteRef.style.top = `${startPosition.y}px`;
            } else  {
                updateNotePosition(note.id, newPostion);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    return (
        <div>
            {notes.map(note => (
                <Note 
                    key={note.id} 
                    ref={noteRefs.current[note.id] ?? (noteRefs.current[note.id] = createRef())}
                    position={note.position} 
                    content={note.text} 
                    onMouseDown={(e) => handleDragStart(e, note)}
                />
            ))}
        </div>
    );
};

export default NotesList;