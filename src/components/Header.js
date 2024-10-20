import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

const Header = () => {
  const [currentTime, setCurrentTime] = useState({ time: '', date: '' });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      setCurrentTime({ time: formattedTime, date: formattedDate });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="relative flex items-center justify-between py-6 px-8 bg-gradient-to-b from-[#009965] to-[#180046] text-white shadow-lg backdrop-blur-lg">
      {/* Center: DayTalks title */}
      <div className="text-left ml-8"> {/* Added left margin to separate title */}
        <h1 className="text-5xl font-extrabold tracking-wide uppercase">
          DayTalks
        </h1>
      </div>

      {/* Right side: Date, Time */}
      <div className="flex items-center space-x-4">
        {/* Date and time */}
        <div className="flex items-center space-x-2 bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 shadow-md">
          <FaClock className="text-white" />
          <p className="text-lg font-semibold">{currentTime.time}</p>
        </div>
        <p className="text-md bg-gray-700 bg-opacity-75 px-3 py-1 rounded-lg shadow-sm">
          {currentTime.date}
        </p>
      </div>
    </header>
  );
};

export default Header;
