import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ startTime }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const endDate = new Date(startTime);
    const timeLeft = endDate - now;

    if (isNaN(timeLeft) || timeLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, completed: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="bg-black p-4 rounded-lg shadow-md text-center mb-4">
      {timeLeft.completed ? (
        <p className="text-green-400 text-lg font-semibold">Service is completed!</p>
      ) : (
        <>
          <p className="text-white text-lg font-semibold">Service Complete Time</p>
          <p className="text-white text-3xl font-bold">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
