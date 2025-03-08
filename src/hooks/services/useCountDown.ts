import { useState, useEffect, useCallback } from "react";

export const useCountDown = (
  initialMinutes: number,
  initialSeconds: number
) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [key, setKey] = useState<number>(0);

  const resetCountdown = useCallback(() => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setKey((prev) => prev + 1);
  }, [initialMinutes, initialSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          } else {
            clearInterval(interval);
            return 0;
          }
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [key, minutes]);

  return { minutes, seconds, resetCountdown };
};
