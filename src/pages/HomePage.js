import React, { useState } from 'react';
import '../styles/styles.css'; 
import WelcomeRecordCard from '../components/WelcomeRecordCard';
import MoodOverview from '../components/MoodOverview';
import Header from '../components/Header'; 
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles
import { FaTimes } from 'react-icons/fa'; // Import icon for close button
import ReferralTrackingCard from '../components/ReferralTrackingCard';
import { FaBars, FaUser, FaSignOutAlt, FaClipboardList, FaTable } from 'react-icons/fa'; // Importing icons
import CustomCalendar from '../components/Calendar';


const HomePage = () => {
  const [showCalendar, setShowCalendar] = useState(false); // Manage calendar visibility
  const loggedDays = 20;

  // Sample data for emotions from backend
  const emotions = [
    { name: 'Happiness', percentage: 60 },
    { name: 'Sadness', percentage: 25 },
    { name: 'Surprise', percentage: 10 },
    { name: 'Nostalgia', percentage: 5 },
  ];

  // Function to handle "See Calendar" click
  const handleSeeCalendar = () => {
    setShowCalendar(true); // Show the calendar
  };

  // Function to close the full-screen calendar
  const handleCloseCalendar = () => {
    setShowCalendar(false); // Hide the calendar
  };
  {showCalendar && (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <CustomCalendar />  {/* Use the imported calendar component */}
    </div>
  )}
 
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0a0034] to-[#180046]">
      <Header />
  
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#1e1e2d] text-white flex flex-col space-y-4 h-screen p-5">
          <div className="space-y-8">
            {/* Dashboard title with icon */}
            <div className="flex items-center space-x-2 mb-8">
              <FaBars className="text-xl" />  {/* Icon for Dashboard */}
              <h2 className="text-2xl font-bold">DASHBOARD</h2>
            </div>
  
            {/* Navigation */}
            <nav>
              <ul className="space-y-4">
                <li>
                  <a href="/AIFriend" className="flex items-center p-2 hover:bg-[#38385d] rounded">
                    <FaClipboardList className="mr-2" /> {/* Icon for MyPals */}
                    MyPals
                  </a>
                </li>
                
              </ul>
            </nav>
  
            {/* Account Section */}
            <div className="mt-8">
              <p className="text-l mb-4">Your Account</p>
              <ul className="space-y-4">
                <li>
                  <a href="/Profile" className="flex items-center p-2 hover:bg-[#38385d] rounded">
                    <FaUser className="mr-2" /> {/* Icon for Profile */}
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/Logout" className="flex items-center p-2 hover:bg-[#38385d] rounded">
                    <FaSignOutAlt className="mr-2" /> {/* Icon for Logout */}
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap to avoid overlap */}
            {/* Conditionally render the WelcomeRecordCard or Calendar */}
            <div className="bg-white rounded-lg shadow-lg h-full flex items-center justify-center">
              {!showCalendar ? (
                <WelcomeRecordCard 
                  name="Liza" 
                  onRecord={() => console.log('Recording...')} 
                  onSeeCalendar={handleSeeCalendar} // Pass the handler for "See Calendar"
                />
              ) : null}
            </div>
  
            {/* Mood Overview Card */}
            <div className="bg-[#234759] rounded-lg shadow-lg flex flex-col justify-center">
              <MoodOverview loggedDays={loggedDays} />
            </div>
  
            {/* Referral Tracking */}
            <div className="rounded-lg shadow-lg flex flex-col">
              <ReferralTrackingCard 
                currentMonth="October" 
                totalDaysInMonth={31} 
                daysLoggedInMonth={15} 
                totalDaysLoggedYear={250} 
                totalDaysLoggedEver={600} 
                emotions={emotions} 
              />
            </div>
          </div>
        </div>
      </div>
    
  
  
      {/* Full-Screen Calendar Overlay */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative bg-[#1a1b2d] p-10 rounded-lg shadow-lg w-full max-w-4xl"> {/* Dark background for calendar */}
            {/* Close Button */}
            <button 
              onClick={handleCloseCalendar} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-2xl" />
            </button>
            
            {/* Full-Screen Calendar */}
            <Calendar 
              className="custom-calendar" // Add a custom class to apply our styles
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
