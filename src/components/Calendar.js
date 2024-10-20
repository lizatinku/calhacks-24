import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null); // State to track the selected date
  const [transcript, setTranscript] = useState(''); // State to store the speech transcript

  // Example transcript data. Replace this with your real transcript data.
  const transcriptData = {
    '2024-10-20': 'Transcript for October 20, 2024: You discussed your project progress today.',
    '2024-10-21': 'Transcript for October 21, 2024: You focused on learning Tailwind CSS.',
    // Add more transcripts here as needed
  };

  // Function to handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
    setTranscript(transcriptData[dateString] || 'No transcript available for this date.');
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#1a1b2d] p-10 rounded-lg shadow-lg w-full max-w-6xl"> {/* Adjusted layout */}
      {/* Calendar Section */}
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <Calendar 
          onClickDay={handleDateClick} // Trigger when a day is clicked
          className="custom-calendar" // Add a custom class to apply our styles
        />
      </div>

      {/* Transcript Section */}
      <div className="lg:w-1/2 w-full bg-[#232b2f] p-6 rounded-lg text-white">
        {selectedDate ? (
          <>
            <h3 className="text-xl font-bold">Transcript for {selectedDate.toDateString()}</h3>
            <p className="mt-4">{transcript}</p> {/* Display the transcript */}
          </>
        ) : (
          <p>Select a date to view the transcript.</p> // Placeholder when no date is selected
        )}
      </div>
    </div>
  );
};

export default CustomCalendar;
