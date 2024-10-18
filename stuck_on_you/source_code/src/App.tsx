import "./styles/App.css";
import Buttons from "./components/buttons.component";
import MotionArea from "./components/MotionArea.component";
import { useState } from "react";
import { NotesProvider } from "./components/notes.context";
import Start from "./components/start";

function App() {
  const [ isPress, setIsPressMain ] = useState(false)
  if(!isPress)
    return (
            <Start setIsPressMain={setIsPressMain} />
    );
  

  return(
        <NotesProvider>
            <main className="App">

                <MotionArea/>
                <Buttons />
            </main>
        </NotesProvider>
    );
}

export default App;
