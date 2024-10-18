import { FC, useEffect, useRef, useState } from "react";
import "../styles/Note.css";
import {
    motion,
    useAnimate,
    useMotionValue,
} from "framer-motion";
import {
    DraggableAnimations,
    NoteProps,
    SelectedNoteProps,
    UnSelectedNoteProps,
} from "./noteConstants";
import useNotes from "./notes.context";

const Note: FC<NoteProps> = ({ constraint, index }) => {
    const [selected, setSelected] = useState(false);
    const {notesValues} = useNotes()
    const [isDragging, setIsDragging] = useState(false);
    const [scope, animate] = useAnimate();
    const x = useMotionValue(300);
    const y = useMotionValue(300);
    const scale = useMotionValue(1);
    const width = useMotionValue(250);
    const height = useMotionValue(250);


    const [screenCenter, setScreenCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        
        const updateScreenCenter = () => {
            const screenX = window.innerWidth / 2;
            const screenY = window.innerHeight / 2;
            setScreenCenter({ x: screenX, y: screenY });
            
        };

        // Calcola il centro dello schermo inizialmente
        updateScreenCenter();
        
        // Aggiungi un listener per l'evento resize
        window.addEventListener("resize", updateScreenCenter);

        if (notesValues[index] && notesValues[index].text == "!*___NEW_NOTE___*!"){
            notesValues[index].text = "NUOVA NOTA!";
            setSelected(true)
        }
            // Rimuovi il listener quando il componente viene smontato
            return () => {
                window.removeEventListener("resize", updateScreenCenter);
            };
    }, [index, notesValues]);

    const onClick = () => {
        if (!isDragging) setSelected(true);;
    };

    useEffect(() => {
        if (!selected) {
            const elementWidth = 250;
            const elementHeight = 250;
            const margin = 50; // Margine minimo dai bordi dello schermo
            const randomX =
                Math.random() *
                    (window.innerWidth - elementWidth - 2 * margin) +
                margin;
            const randomY =
                Math.random() *
                    (window.innerHeight - elementHeight - 2 * margin) +
                margin;
            animate(width, elementWidth);
            animate(height, elementHeight);
            animate(x, randomX);
            animate(y, randomY);
        }else{
             const selectedElementWidth = 320;
             const selectedElementHeight = 220;
             animate(scale, 1.05);
             animate(width, selectedElementWidth);
             animate(height, selectedElementHeight);
             animate(x, screenCenter.x - selectedElementWidth / 2);
             animate(y, screenCenter.y - selectedElementHeight / 2);
        }
    }, [
        selected,
        screenCenter.x,
        screenCenter.y,
        animate,
        width,
        height,
        scale,
        x,
        y,
    ]);

    return (
        <motion.div
            layout
            style={{ x, y, width, height, scale, display: "block" }}
            ref={scope}
            {...(!selected ? DraggableAnimations : null)}
            dragConstraints={constraint}
            className="note"
            data-selected={selected}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onClick={onClick}

            exit={{
                width: 250,
                height: 250,
                scale: [1, 2.5, 2, 1, 1, 0.5, 0.5, 0],
                rotate: [0, 0, 270, 270, 360, -360, 0],
                zIndex: 10000,
                backgroundColor: "white",
                boxShadow: [
                    "0px 0px 0px rgba(0, 0, 0, 0)",
                    "0px 0px 10px rgba(255, 0, 0, 0.3)",
                    "0px 0px 20px rgba(0, 255, 0, 0.5)",
                    "0px 0px 40px rgba(0, 0, 255, 0.7)",
                    "0px 0px 80px rgba(255, 255, 0, 0.8)",
                    "0px 0px 110px rgba(0, 255, 255, 0.9)",
                    "0px 0px 140px rgba(255, 0, 255, 0.9)",
                    "0px 0px 160px rgba(255, 255, 255, 1)",
                ],
                borderRadius: ["20%", "100%", "25%", "75%", "20%", "100%"],
            }}
        >
            <img
                className="flowers"
                style={{
                    opacity: notesValues[index] ? 1 : 0,
                }}
                alt="fiori"
                src="/flowers.png"
            />
            {selected ? (
                <SelectedNote i={index} setSelected={setSelected} />
            ) : (
                <UnSelectedNote i={index} />
            )}
        </motion.div>
    );
};

const UnSelectedNote: FC<UnSelectedNoteProps> = ({ i }) => {
    const { notesValues } = useNotes();
    if (!notesValues[i]) return <></>;
    const thisNote = notesValues[i];

    return (
        <p className="noteContent" style={{ backgroundColor: thisNote.color }}>
            {thisNote.text}
        </p>
    );
};

const SelectedNote: FC<SelectedNoteProps> = ({ i, setSelected }) => {
    const { notesValues, setNotesValues } = useNotes();
    let thisNote = notesValues[i]
    if (!thisNote) {
        thisNote = {
            text: "NULL",
            color:"rgba(128, 38, 39, 0.40)"
        }

    }

    const [newText, setNewText] = useState(thisNote.text);

    const noteRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                noteRef.current &&
                !noteRef.current.contains(event.target as Node)
            ) {
                const newNotes = [...notesValues];
                newNotes[i].text = newText;
                setNotesValues(newNotes);
                setSelected(false);
            }
        };

        const timeoutId = setTimeout(
            () => document.addEventListener("click", handleClickOutside),
            500
        );

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [noteRef, notesValues, setSelected, setNotesValues, newText, i]);

    if(thisNote.text == "NULL")
        return <></>
    return (
        <textarea
            ref={noteRef}
            autoFocus={true}
            maxLength={5000}
            className="noteInput"
            value={newText}
            style={{ backgroundColor: thisNote.color}}
            onChange={(e) => setNewText(e.target.value)}
        ></textarea>
    );
};

export default Note;
