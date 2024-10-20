import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import '../styles/styles.css'; // Your custom styles from src/styles/styles.css

const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null); // State to track selected date
  const [transcript, setTranscript] = useState(''); // State to store transcript

  // Mock transcript data
  const transcriptData = {
    '2024-10-20': 'Transcript for October 20, 2024: You discussed project progress.',
    '2024-10-21': 'Transcript for October 21, 2024: Focused on learning Tailwind CSS.',
    // Add more transcripts as needed
  };

  // Function to handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    setTranscript(transcriptData[dateString] || 'No transcript available for this date.');
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md w-full max-w-6xl">
      {/* Calendar Section */}
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="text-2xl font-bold mb-4">Mood Calendar</h1>
        <Calendar
          onClickDay={handleDateClick} // Triggered when a day is clicked
          value={selectedDate} // Value of the selected date
          className="fancy-calendar" // Add class if needed for customization
        />
        <div className="mt-4 text-center">
          {selectedDate && <p className="text-lg">Selected date: {selectedDate.toDateString()}</p>}
        </div>
      </div>

      {/* Transcript Section */}
      <div className="lg:w-1/2 w-full bg-gray-100 p-6 rounded-lg text-black">
        {selectedDate ? (
          <>
            <h3 className="text-xl font-bold">Transcript for {selectedDate.toDateString()}</h3>
            <p className="mt-4">{transcript}</p> {/* Display the transcript */}
          </>
        ) : (
          <p>Select a date to view the transcript.</p> // Placeholder text if no date is selected
        )}
      </div>
    </div>
  );
};

export default MoodCalendar;
