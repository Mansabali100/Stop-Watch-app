import { useState, useEffect } from 'react';
import './App.css';
import Btndisplay from './Components/Btndisplay';
import DisplayData from './Components/DisplayData';

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [intervalId, setIntervalId] = useState(null);
  const [status, setStatus] = useState(0);

  // Not started = 0
  // Started = 1
  // Paused = 2

  useEffect(() => {
    const run = () => {
      setTime((prevTime) => {
        let updatedMS = prevTime.ms,
          updatedS = prevTime.s,
          updatedM = prevTime.m,
          updatedH = prevTime.h;

        if (updatedM === 60) {
          updatedH++;
          updatedM = 0;
        }
        if (updatedS === 60) {
          updatedM++;
          updatedS = 0;
        }
        if (updatedMS === 100) {
          updatedS++;
          updatedMS = 0;
        }
        updatedMS++;
        return { ms: updatedMS, s: updatedS, m: updatedM, h: updatedH };
      });
    };

    if (status === 1) {
      const id = setInterval(run, 10);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [status]);

  const start = () => {
    setStatus(1);
  };

  const stop = () => {
    clearInterval(intervalId);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(intervalId);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  return (
    <div className='main-section'>
      <div className='clock-holder'>
        <div className='stop-watch'>
          <DisplayData time={time} />
          <Btndisplay stop={stop} resume={start} reset={reset} status={status} start={start} />
        </div>
      </div>
    </div>
  );
}

export default App;
