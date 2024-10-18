import {  FC,  useRef, CSSProperties} from "react";
import Note from "./note.component";
import { AnimatePresence, motion } from "framer-motion";
import useNotes from "./notes.context";


const style:CSSProperties = {
    height: "100%",
    width: "100%",
    position: "relative"
}

const MotionArea: FC = () => {
    const constraintsRef = useRef(null);
    const { notesValues } = useNotes();
    
    return (
        <motion.div ref={constraintsRef} style={style}>
            <AnimatePresence>
            {notesValues.map((_, i) => {
                    return (
                        <Note key={i} index={i} constraint={constraintsRef} />
                    );
            }
                    
            )}
            </AnimatePresence>
        </motion.div>
    );
};
export default MotionArea;
