import React from 'react';
import './styles/styles.css'; 
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomeRecordCard from './components/WelcomeRecordCard';
import SatisfactionRateCard from './components/SatisfactionRateCard';
import ReferralTrackingCard from './components/ReferralTrackingCard';
import MoodCalendar from './pages/MoodCalendar';
import HomePage from './pages/HomePage';
import AIFriend from './pages/AIFriend';
import Tables from './pages/Tables';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

const App = () => {
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/MoodCalendar" element={<MoodCalendar />} />
      <Route path="/AIFriend" element={<AIFriend />} />
      <Route path="/Tables" element={<Tables />} />
      <Route path="/Profile" element={<Profile />}  />
      <Route path="/Logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>

  );
};

export default App;
export default App;