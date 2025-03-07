import { useState, useEffect } from "react";

export const useCountDown = (min: number, sec: number) => {
  const [seconds, setSeconds] = useState<number>(sec);
  const [minutes, setMinutes] = useState<number>(min);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          // If seconds reach 0, decrease minute and reset seconds
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          } else {
            clearInterval(interval); // Stop countdown when minutes reach 0
            return 0;
          }
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes]); // Re-run effect if minutes change

  return {
    minutes,
    seconds,
  };
};
