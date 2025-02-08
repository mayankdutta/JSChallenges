import { useEffect, useState } from "react";

const ACTION = {
  START: "start",
  STOP: "stop",
  RESET: "reset",
};

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleTimer = (action) => {
    if (action === ACTION.START) {
        setIsRunning(true);
    } else if (action === ACTION.STOP) {
        setIsRunning(false);
    } else {
        setIsRunning(false);
        setTime(0);
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const getTime = (time) => {
    let hrs = Math.floor(time / 3600);
    let mns = Math.floor((time % 3600) / 60);
    let sec = Math.floor(time % 60);

    return `${hrs}:${mns}:${sec}`;
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>{getTime(time)}</h2>
      <input
        type={"number"}
        placeholder="Enter time"
        onChange={(e) => {
            setTime(parseInt(e.target.value) || 0);
        }}
      />
      <button onClick={() => handleTimer(ACTION.START)}> start </button>
      <button onClick={() => handleTimer(ACTION.STOP)}> stop </button>
      <button onClick={() => handleTimer(ACTION.RESET)}> reset </button>
    </div>
  );
};

export default App;
