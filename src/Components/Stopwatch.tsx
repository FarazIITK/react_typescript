import { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const buttonTags = {
    start: 'Start',
    resume: 'Resume',
    pause: 'Pause',
    reset: 'Reset'
  };

  const initialTime: number = 0;
  const timerInterval: number = 10;

  const [timeElapsed, setTimeElapsed] =
    useState<number>(initialTime);
  const [isTimerPaused, setIsTimerPaused] =
    useState<boolean>(true);
  const [isTimerStarted, setIsTimerStarted] =
    useState<boolean>(false);
  const [formattedTime, setFormattedTime] = useState<
    string | null
  >(null);

  const intervalId = useRef<NodeJS.Timer | null>(null);

  const playPauseHandler = () => {
    setIsTimerStarted(true);
    setIsTimerPaused((prevState) => !prevState);
  };

  const resetTimer = () => {
    setIsTimerStarted(false);
    setIsTimerPaused(true);
    setTimeElapsed(initialTime);
  };

  useEffect(() => {
    if (isTimerPaused && intervalId.current) {
      clearInterval(intervalId.current);
    } else if (!isTimerPaused) {
      intervalId.current = setInterval(() => {
        setTimeElapsed(
          (prevValue) => prevValue + timerInterval
        );
      }, timerInterval);
    }
  }, [isTimerPaused]);

  useEffect(() => {
    const minutes: number = Math.floor(
      timeElapsed / 1000 / 60
    );
    const seconds: number = Math.floor(
      (timeElapsed / 1000) % 60
    );
    const secondHundredthFraction: number = Math.floor(
      (timeElapsed % 1000) / 10
    );

    setFormattedTime(
      `${minutes} : ${seconds} : ${secondHundredthFraction}`
    );
  }, [timeElapsed]);

  return (
    <div>
      <h1>{formattedTime}</h1>
      <div>
        <button onClick={playPauseHandler}>
          {!isTimerStarted
            ? buttonTags.start
            : isTimerPaused
            ? buttonTags.resume
            : buttonTags.pause}
        </button>

        <button onClick={resetTimer}>
          {buttonTags.reset}
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
