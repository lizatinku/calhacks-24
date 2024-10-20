import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/styles.css';// Import the flip animation styles
import '../styles/Referrals.css';
import { jwtDecode } from 'jwt-decode'; // Correct way to import the named export


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
  const [loading, setLoading] = useState(false); // Manage loading state

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

// Fetch data from API
const fetchDataFromAPI = async () => {
  try {

    const tokenObject = localStorage.getItem('token'); // Assuming you stored the whole object in localStorage
    console.log(tokenObject)

    const decodedToken = decodeToken(tokenObject); // Decode the access token
    console.log('Decoded Token:', decodedToken);
    const userId = decodedToken.sub; // Assuming 'sub' contains the user ID
    console.log('User ID:', userId);


    setLoading(true); // Start loading
    console.log(`Fetching data for user ID: ${userId}`); // Debugging step

   

    const response = await fetch(`https://13e2-199-115-241-193.ngrok-free.app/api/diary-analysis/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenObject}`,
      },
    });

    console.log('API Response URL:', response.url); // This will log the URL of the API request
    
    if (!response.ok) {
      // If the response is not OK, throw an error to handle it in the catch block
      throw new Error(`Error in API request: ${response.statusText}`);
    }


    const data = await response.url;
    console.log('API data:', data); // Debugging step

    if (data && data.message) {
      setApiData(data.message);
    } else {
      setApiData('No message field found in API response');
    }

  } catch (error) {
    console.error('Error fetching API data:', error);
    setApiData(`Error loading data: ${error.message}`);
  } finally {
    setLoading(false); // Stop loading, regardless of success or failure
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