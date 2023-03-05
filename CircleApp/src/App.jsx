import "./App.css";
import { useState } from "react";

function App() {

  const [points, setPoints] = useState([]);
  const undoArr = [];

  const handleClick = (event) => {
    console.log(points)
    return setPoints([...points, {
      x: event.clientX,                     // event.clientX/Y outputs the screen coords for the mouseclick
      y: event.clientY,
    }]);
  };

  const handleUndo = () => {
    return setPoints(points.slice(0, -1))
  }

   return (
    <div className="App">
      <div>
        <button
          type="button"
         onClick={handleUndo}
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Redo");
          }}
        >
          Redo
        </button>
      </div>
      <div className="area" onClick={handleClick}>
       {points.map((point, index) => {
        if(point) {
          return (
            <div
            key={index}
            className="point"
            style={{top: point.y, left: point.x}}/>
          );
        }
       })}
      </div>
    </div>
  );
}

export default App;
