import { FaCirclePlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import "../styles/Buttons.css"
import useNotes from "./notes.context";
import { colors } from "./noteConstants";
export default function Buttons() {
    const {setNotesValues} = useNotes()

    const createNote = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setNotesValues((prevState) => (
            [
                ...prevState,
                {
                    text: "!*___NEW_NOTE___*!",
                    color: randomColor
                }
            ]
        ))
    }
    const deleteNotes= () => {
        setNotesValues([])
    }
    return (
        <aside>
            <div className="wrapper">
                <img className="flowers" src="/flowers.png" />

                <div className="buttons">
                    <FaCirclePlus
                     onClick={createNote}
                        className="removeBluBox button"
                    />
                        
                    <GrPowerReset  onClick={deleteNotes} className="removeBluBox button" />
                </div>
            </div>
        </aside>
    );
}


