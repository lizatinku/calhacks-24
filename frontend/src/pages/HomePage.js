import React from 'react';
import '../styles/styles.css'; 
import WelcomeRecordCard from '../components/WelcomeRecordCard';
import ReferralTrackingCard from '../components/ReferralTrackingCard';

import MoodOverview from '../components/MoodOverview';
import Header from '../components/Header'; 

const HomePage = () => {
  const loggedDays = 20; 
    return(
      <div className="min-h-screen bg-gradient-to-r from-[#0a0034] to-[#180046]">
      <Header />  

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#1e1e2d] p-5 text-white flex flex-col space-y-4">
          <h2 className="text-2xl font-bold mb-8">DASHBOARD</h2>
          <nav>
            <ul className="space-y-2">
              <li><a href="/MoodCalendarPage" className="block p-2 hover:bg-[#38385d] rounded">Mood Calendar</a></li>  
              <li><a href="/AIFriend" className="block p-2 hover:bg-[#38385d] rounded">AI Friend</a></li>            
              <li><a href="/Tables" className="block p-2 hover:bg-[#38385d] rounded">Tables</a></li>
            </ul>
          </nav>
          <p className="mt-8 text-l">Your Account</p>
          <ul className="space-y-2">
            <li><a href="/Profile" className="block p-2 hover:bg-[#38385d] rounded">Profile</a></li>
            <li><a href="/Logout" className="block p-2 hover:bg-[#38385d] rounded">Logout</a></li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Grid layout for the 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* WelcomeRecordCard */}
            <div className="bg-white h-full flex items-center justify-center rounded-lg shadow-lg aspect-square">
              <WelcomeRecordCard name="Liza" onRecord={() => console.log('Recording...')} />
            </div>

            {/* Mood Overview Card */}
            <div className="bg-[#234759] p-6 rounded-lg relative">
              <MoodOverview loggedDays={loggedDays} />
            </div>

            {/* Referral Tracking */}
            <div className="bg-gradient-to-br from-[#1e1e2d] to-[#38385d] p-6 rounded-lg shadow-2xl relative">
              <div className="flex flex-col justify-center items-center text-white">
                <h2 className="text-lg mb-2">Referral Tracking</h2>
                <div className="w-24 h-24 rounded-full border-4 border-green-500 flex justify-center items-center">
                  <p className="text-xl">Placeholder</p>
                </div>
                <p className="text-gray-300 mt-2">Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
};

export default HomePage;