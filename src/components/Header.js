import React, { useState, useEffect } from 'react';
import { FaClock, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for routing

const Header = () => {
  const [currentTime, setCurrentTime] = useState({ time: '', date: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <header className="relative flex items-center justify-between py-6 px-8 bg-gradient-to-b from-[#009965] to-[#180046] text-white shadow-lg backdrop-blur-lg">
      {/* Left side: Dropdown Button */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
        >
          <FaBars className="text-white" /> {/* Icon for the dropdown */}
        </button>

        {/* Dropdown Menu as Full Height Vertical Column */}
        {isDropdownOpen && (
          <div className="absolute left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0a0034] to-[#180046] text-white z-20 shadow-lg">
            <ul className="flex flex-col h-full justify-center space-y-8 p-6">
              <li>
                <Link
                  to="/home"
                  className="block text-lg px-4 py-2 hover:bg-gray-600 rounded-md"
                  onClick={toggleDropdown} // Close dropdown on click
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/MoodCalendarPage"
                  className="block text-lg px-4 py-2 hover:bg-gray-600 rounded-md"
                  onClick={toggleDropdown}
                >
                  Mood Calendar
                </Link>
              </li>
              <li>
                <Link
                  to="/AIFriend"
                  className="block text-lg px-4 py-2 hover:bg-gray-600 rounded-md"
                  onClick={toggleDropdown}
                >
                  AI Friend
                </Link>
              </li>
              <li>
                <Link
                  to="/Tables"
                  className="block text-lg px-4 py-2 hover:bg-gray-600 rounded-md"
                  onClick={toggleDropdown}
                >
                  Tables
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Center: DayTalks title */}
      <div className="text-left ml-8"> {/* Added left margin to separate title from menu */}
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
