import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/styles.css';// Import the flip animation styles
import '../styles/Referrals.css';

const ReferralTrackingCard = ({
  currentMonth,
  totalDaysInMonth,
  daysLoggedInMonth,
  totalDaysLoggedYear,
  totalDaysLoggedEver,
  emotions,
}) => {
  const [isFlipped, setIsFlipped] = useState(false); // Track whether the card is flipped
  const [apiData, setApiData] = useState(''); // Store API text data


  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload part of the token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Fetch data from API
const fetchDataFromAPI = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('Token not found');
    }

    const decodedToken = decodeToken(token);
    const userId = decodedToken ? decodedToken.sub : null; // Extract user_id from the sub field
    if (!userId) {
      throw new Error('User ID not found in token');
    }

    const response = await fetch(`https://13e2-199-115-241-193.ngrok-free.app/api/diary-analysis/${userId}`); // Use the user_id in the API URL
    const data = await response.json();
    setApiData(data.message || 'No data available'); // Assuming the API returns a 'message' field
  } catch (error) {
    console.error('Error fetching API data:', error);
    setApiData('Error loading data');
  }
};


  // Handle flip and fetch data on the back of the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      fetchDataFromAPI(); // Fetch data when flipping to the back
    }
  };

  // Calculate percentage for the circular progress bar
  const percentageLogged = (daysLoggedInMonth / totalDaysInMonth) * 100;

  return (
    <div className="flip-card-container" onClick={handleFlip}>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side of the Card */}
        <div className="flip-card-front">
          <div
            style={{
              backgroundColor: '#1a1b2d', // Dark blue background
              padding: '20px',
              borderRadius: '15px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
            }}
          >
            {/* Circular Progress for Days Logged */}
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#a1a4c5', fontSize: '14px' }}>Total Days Logged This Year</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalDaysLoggedYear}</p>
                <p style={{ color: '#a1a4c5', fontSize: '14px' }}>Total Days Logged Ever</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalDaysLoggedEver}</p>
              </div>

              <div style={{ width: '100px' }}>
                <CircularProgressbar
                  value={percentageLogged}
                  text={`${daysLoggedInMonth}/${totalDaysInMonth}`}
                  styles={buildStyles({
                    textColor: '#fff',
                    pathColor: '#00cc88',
                    trailColor: '#2b2c3b',
                    textSize: '16px',
                    strokeLinecap: 'round',
                  })}
                />
              </div>
            </div>

            {/* Emotions Section */}
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '10px' }}>Top 4 Emotions</h3>
              {emotions.map((emotion, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <p style={{ color: '#a1a4c5', fontSize: '14px', marginBottom: '5px' }}>
                    {emotion.name}: {emotion.percentage}%
                  </p>
                  <div
                    style={{
                      backgroundColor: '#2b2c3b',
                      borderRadius: '10px',
                      height: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${emotion.percentage}%`,
                        backgroundColor: '#00cc88',
                        height: '100%',
                        borderRadius: '10px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Side of the Card (API Data) */}
        <div className="flip-card-back">
          <p className="api-text">{apiData}</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralTrackingCard;
