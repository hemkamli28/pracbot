import React, { useState, useEffect } from 'react';

const ExamTiming = ({ deadline }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(deadline));

  function calculateTimeRemaining(endTimeUTC) {
    const endTimeUTCDate = new Date(endTimeUTC); // Convert endTime (UTC) to Date object
    const now = new Date(); // Current time in local time zone

    const endTimeIST = convertUTCtoIST(endTimeUTCDate); // Convert deadline to IST
    const nowIST = convertUTCtoIST(now); // Convert current time to IST

    const difference = endTimeIST - nowIST;

    if (difference <= 0) {
      // If the deadline has passed, return 0
      return 0;
    }

    // Calculate remaining time in hours, minutes, and seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Log current time and difference for debugging
    console.log('Current Time (IST):', nowIST);
    console.log('Deadline Time (IST):', endTimeIST);
    console.log('Time Remaining (ms):', difference);

    return { hours, minutes, seconds };
  }

  // Function to convert UTC date to IST date
  function convertUTCtoIST(dateUTC) {
    return new Date(dateUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeRemaining(deadline);
      setTimeRemaining(remainingTime);
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [deadline]);

  return (
    <span>
      {timeRemaining === 0 ? (
        <span>Exam Ended</span>
      ) : (
        <span>
          {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
        </span>
      )}
    </span>
  );
};

export default ExamTiming;
