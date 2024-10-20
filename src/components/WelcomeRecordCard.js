import React from 'react';
import { Link } from 'react-router-dom'; 

const WelcomeRecordCard = ({ name, onRecord, onSeeCalendar }) => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #001f4d, #6baeff)',
        width: '100%', 
        height: '100%', 
        borderRadius: '16px',
      }}
    >
      <div 
        style={{
          backgroundImage: 'url("/iCal.webp")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '20px',
          borderRadius: '0px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'space-between', 
        }}
      >
        {/* Welcome text */}
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ opacity: 0.8, fontSize: '24px', marginBottom: '0' }}>
            Welcome back,
          </h1>
          <h1 style={{ color: '#28a745', fontSize: '28px', marginTop: '0' }}>
            {name}
          </h1>
          <p style={{ fontSize: '16px', marginTop: '10px' }}>
            Glad to see you again. Let's talk!
          </p>
        </div>

        {/* Buttons at the bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: 'auto' }}>
          <Link to="/AIFriend"> {/* Use Link for in-page navigation */}
            <button 
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                width: '100%', 
                maxWidth: '150px',
                textAlign: 'center'
              }}
            >
              Tap to Talk
            </button>
          </Link>
          
          <button 
            onClick={onSeeCalendar} 
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              width: '100%', 
              maxWidth: '150px',
              textAlign: 'center'
            }}
          >
            See Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeRecordCard;
