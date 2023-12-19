import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VitalsDisplayComponent = () => {
  const [heartRate, setHeartRate] = useState('No data available');
  const [noiseLevel, setNoiseLevel] = useState('No data available');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const url = 'https://us-central1-final-project-1-408101.cloudfunctions.net/processingdata/latest-vitals';
      const response = await axios.get(url);

      // Log the response for debugging
      console.log('Response data:', response.data);

      if (!response.data) {
        // If the response doesn't have data, set a default message
        setHeartRate('No data available');
        setNoiseLevel('No data available');
        return; // Stop execution if there's no data
      }

      // Safely attempt to read BPM and Decibels using optional chaining
      const bpmValue = response.data.HeartRate?.BPM;
      const decibelsValue = response.data.NoiseLevel?.Decibels;

      // Update the state only if values are numbers
      setHeartRate(typeof bpmValue === 'number' ? `${bpmValue} BPM` : 'No data');
      setNoiseLevel(typeof decibelsValue === 'number' ? `${decibelsValue} dB` : 'No data');
    } catch (err) {
      // If there's an error, log it and set the error state
      console.error('Error fetching vitals:', err);
      setError('Error fetching data');
      // Optionally, keep the last known good values or set them to a default message
      // setHeartRate('No data available');
      // setNoiseLevel('No data available');
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    // Set up a polling interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData().catch((err) => {
        // Handle any errors that might occur during the fetch
        console.error('Error during polling:', err);
        setError('Error fetching data');
        // Optionally, keep the last known good values or set them to a default message
        // setHeartRate('No data available');
        // setNoiseLevel('No data available');
      });
    }, 5000);
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Render the component UI
  return (
    <div>
      <h2>Vitals</h2>
      <p>Heart Rate: {heartRate}</p>
      <p>Noise Level: {noiseLevel}</p>
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default VitalsDisplayComponent;
