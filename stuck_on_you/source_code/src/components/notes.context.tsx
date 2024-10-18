import { createContext, useState, ReactNode, useContext } from "react";
import { Color } from "./noteConstants";

interface NotesContextProps {
    notesValues: NoteValue[];
    setNotesValues: React.Dispatch<React.SetStateAction<NoteValue[]>>;
}

export const NotesContext = createContext<NotesContextProps | undefined>(
    undefined
);

export type NoteValue = {
    text:string,
    color: Color
}
export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notesValues, setNotesValues] = useState<NoteValue[]>([]);

    return (
        <NotesContext.Provider value={{ notesValues, setNotesValues }}>
            {children}
        </NotesContext.Provider>
    );
};
const useNotes = () => {
    const context = useContext(NotesContext);

    if (!context) {
        throw new Error("useNotes must be used within a NotesProvider");
    }

    return context;
};

export default useNotes;