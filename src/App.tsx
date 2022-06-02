import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./App.css";
import TacticsBoard from "./components/TacticsBoard/TacticsBoard";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <TacticsBoard />
      </div>
    </DndProvider>
  );
}

export default App;
