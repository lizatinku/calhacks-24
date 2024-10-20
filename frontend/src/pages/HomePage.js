import React from 'react';
import '../styles/styles.css'; 
import WelcomeRecordCard from '../components/WelcomeRecordCard';
import ReferralTrackingCard from '../components/ReferralTrackingCard';

const HomePage = () => {
    return(
        <div className="flex min-h-screen bg-[#0a0034]">
        {/* Sidebar */}
        <div className="w-64 bg-[#1e1e2d] p-5 text-white flex flex-col space-y-4">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav>
            <ul className="space-y-2">
            <li><a href="/MoodCalendarPage" className="block p-2 hover:bg-[#38385d] rounded">Mood Calendar</a></li>  
            <li><a href="/AIFriend" className="block p-2 hover:bg-[#38385d] rounded">AI Friend</a></li>            
            <li><a href="/Tables" className="block p-2 hover:bg-[#38385d] rounded">Tables</a></li>
          </ul>
        </nav>
        <h3 className="mt-8 text-xl">Account Pages</h3>
        <ul className="space-y-2">
          <li><a href="/Profile" className="block p-2 hover:bg-[#38385d] rounded">Profile</a></li>
          <li><a href="/Logout" className="block p-2 hover:bg-[#38385d] rounded">Logout</a></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Record Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <WelcomeRecordCard name="Liza" onRecord={() => console.log('Recording...')} />
          </div>

          {/* Satisfaction Rate */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <SatisfactionRateCard />
          </div>

          {/* Referral Tracking */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ReferralTrackingCard />
          </div>
        </div>
      </div>
    </div>








    );
};

export default HomePage;