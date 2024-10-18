import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, ReactElement, SetStateAction } from "react";
import "../styles/App.css"

interface SelectedNoteProps  {
    noteId: string|null
    setSelectedId: Dispatch<SetStateAction<string | null>>
}

const SelectedNote : FC<SelectedNoteProps>= ({noteId, setSelectedId}) => {

    return (
        <div className="selectedNote">
        <AnimatePresence>
            {noteId && (
                <motion.div layoutId={noteId}>

                    <motion.button onClick={() => setSelectedId(null)} />
                </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
}
export default SelectedNote