import "./App.css";
import { useState } from "react";
import fart from './Sounds/fart-2.wav'
import flush from './Sounds/bath-flush1.wav'
import tooter from './Sounds/toot.wav'

function App() {
  const [points, setPoints] = useState([]);
  const [deletedPoints, setDeletedPoints] = useState([]);
  const fartSound = new Audio(fart)
  const flushSound = new Audio(flush)
  const tootSound = new Audio(tooter)



  const handleClick = (event) => {
 
    setPoints([
      ...points,
      {
        x: event.clientX, // event.clientX/Y outputs the screen coords for the mouseclick
        y: event.clientY,
      },
    ]);
    fartSound.play();
    console.log(points);
  };

  const handleUndo = () => {
   
    setDeletedPoints([...deletedPoints, points[points.length-1]])
    setPoints(points.slice(0, -1));
    flushSound.play()
    console.log(deletedPoints[deletedPoints.length-1])

  };

  const handleRedo = () => {
    if(deletedPoints.length > 0)tootSound.play()
    setDeletedPoints(deletedPoints.slice(0, -1));
    setPoints([...points, deletedPoints[deletedPoints.length-1]])
  }

  return (
    <div className="App">
      <div>
        <button type="button" onClick={handleUndo}>
          Undo
        </button>
        <button
          type="button"
          onClick={handleRedo}
        >
          Redo
        </button>
      </div>
      <div className="area" onClick={handleClick}>
        {points.map((point, index) => {
          if (point) {
            return (
              <div
                key={index}
                className="point"
                style={{ top: point.y, left: point.x }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
