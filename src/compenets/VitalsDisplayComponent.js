import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VitalsDisplayComponent = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [noiseLevel, setNoiseLevel] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch the latest data
  const fetchData = async () => {
    try {
      // Replace with the actual endpoint URL
      const url = 'https://us-central1-final-project-1-408101.cloudfunctions.net/function-1';
      const response = await axios.get(url);
      setHeartRate(response.data.HeartRate.BPM);
      setNoiseLevel(response.data.NoiseLevel.Decibels);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    const pollingInterval = 5000; // Interval in milliseconds

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, pollingInterval); // Set up polling

    return () => clearInterval(intervalId); // Clean up
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Vitals</h2>
      <p>
        Heart Rate: {heartRate !== null ? `${heartRate} BPM` : 'Loading...'}
      </p>
      <p>
        Noise Level: {noiseLevel !== null ? `${noiseLevel} dB` : 'Loading...'}
      </p>
    </div>
  );
};

export default VitalsDisplayComponent;
