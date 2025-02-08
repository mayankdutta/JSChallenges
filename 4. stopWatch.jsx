import { useEffect, useState } from "react";

const ACTION = {
  START: "start",
  STOP: "stop",
  RESET: "reset",
};

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeValue, setTimeValue] = useState();

  const handleTimer = (action) => {
    setTime(parseInt(timeValue));
    if (action === ACTION.START || action === ACTION.RESET) {
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
  });

  const giveTime = (time) => {
    let hrs = Math.floor(time / 3600);
    let mns = Math.floor((time % 3600) / 60);
    let sec = Math.floor(time % 60);

    return `${hrs}:${mns}:${sec}`;
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>{giveTime(time)}</h2>
      <input
        type={"number"}
        placeholder="Enter time"
        value={timeValue}
        onChange={(e) => setTimeValue(e.target.value)}
      />
      <button onClick={() => handleTimer(ACTION.START)}> start </button>
      <button onClick={() => handleTimer(ACTION.STOP)}> stop </button>
      <button onClick={() => handleTimer(ACTION.RESET)}> reset </button>
    </div>
  );
};

export default App;
