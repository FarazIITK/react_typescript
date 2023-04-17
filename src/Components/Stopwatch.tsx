import { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const buttonTags = {
    start: 'Start',
    resume: 'Resume',
    pause: 'Pause',
    reset: 'Reset'
  };

  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isTimerPaused, setIsTimerPaused] =
    useState<boolean>(true);

  const intervalId = useRef<NodeJS.Timer | null>(null);

  const playPauseHandler = () => {
    setIsTimerPaused((prevState) => !prevState);
  };

  useEffect(() => {
    if (isTimerPaused && intervalId.current) {
      clearInterval(intervalId.current);
    } else if (!isTimerPaused) {
      intervalId.current = setInterval(() => {
        setTimeElapsed((prevValue) => prevValue + 1);
      }, 1000);
    }
  }, [isTimerPaused]);

  return (
    <div>
      <h1>Time: {timeElapsed}</h1>
      <div>
        <button onClick={playPauseHandler}>
          {isTimerPaused
            ? buttonTags.resume
            : buttonTags.pause}
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
