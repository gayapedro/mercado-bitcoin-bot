import './style.css';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

function Time() {
  const [time, setTime] = useState(0);
  const { isStarted } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStarted) {
        setTime((prevValue) => prevValue + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="time">
      <p className="decorrido">Tempo decorrido:</p>
      <p>{`${String(Math.floor(time / 3600)).padStart(2, '0')}:${String(Math.floor(time / 60) - Math.floor(time / 3600) * 60).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}</p>
    </div>
  );
}

export default Time;
