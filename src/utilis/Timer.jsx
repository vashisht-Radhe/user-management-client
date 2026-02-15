import { useEffect, useState } from "react";

const Timer = ({ initialSeconds = 60, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  return <span className="text-blue-500">{seconds}s</span>;
};

export default Timer;
