import { createContext, useState, useEffect, useRef, type ReactNode } from 'react';

interface TimerContextType {
  timeInSeconds: number;
  isRunning: boolean;
  startTimer: (seconds: number) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const cleanupInterval = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    if (isRunning && timeInSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);

      // --- დროის კორექტული კონვერტაცია სათაურისთვის ---
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;

      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      const titleTime = hours > 0 
        ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}` 
        : `${formattedMinutes}:${formattedSeconds}`;

      document.title = `${titleTime} - ტაიმერი`;

    } else if (timeInSeconds === 0 && isRunning) {
      setIsRunning(false);
      document.title = "დრო ამოიწურა!";
    } else {
      document.title = "ტაიმერი";
    }

    return cleanupInterval;
  }, [isRunning, timeInSeconds]);

  const startTimer = (seconds: number) => {
    if (isRunning) return;
    setTimeInSeconds(seconds);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
  };

  const value = { timeInSeconds, isRunning, startTimer, pauseTimer, resetTimer };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};