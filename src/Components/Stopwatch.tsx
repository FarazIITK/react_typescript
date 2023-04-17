import { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const buttonTags = {
    start: 'Start',
    resume: 'Resume',
    pause: 'Pause',
    reset: 'Reset'
  };

  const initialTime: number = 0;
  const timerInterval: number = 1000;

  const [timeElapsed, setTimeElapsed] =
    useState<number>(initialTime);
  const [isTimerPaused, setIsTimerPaused] =
    useState<boolean>(true);
  const [isTimerStarted, setIsTimerStarted] =
    useState<boolean>(false);

  const intervalId = useRef<NodeJS.Timer | null>(null);

  const playPauseHandler = () => {
    setIsTimerStarted(true);
    setIsTimerPaused((prevState) => !prevState);
  };

  useEffect(() => {
    if (isTimerPaused && intervalId.current) {
      clearInterval(intervalId.current);
    } else if (!isTimerPaused) {
      intervalId.current = setInterval(() => {
        setTimeElapsed((prevValue) => prevValue + 1);
      }, timerInterval);
    }
  }, [isTimerPaused]);

  return (
    <div>
      <h1>Time: {timeElapsed}</h1>
      <div>
        <button onClick={playPauseHandler}>
          {!isTimerStarted
            ? buttonTags.start
            : isTimerPaused
            ? buttonTags.pause
            : buttonTags.resume}
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
