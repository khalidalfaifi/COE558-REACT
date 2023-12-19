import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VitalsDisplayComponent = () => {
  const [heartRate, setHeartRate] = useState('Loading...');
  const [noiseLevel, setNoiseLevel] = useState('Loading...');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const url = 'https://us-central1-final-project-1-408101.cloudfunctions.net/processingdata/latest-vitals';
      const response = await axios.get(url);

      // Debug: Log the entire response
      console.log('Full response data:', response.data);

      // Enhanced check for HeartRate and NoiseLevel
      if (response.data) {
        const { HeartRate, NoiseLevel } = response.data;

        if (HeartRate && typeof HeartRate.BPM === 'number') {
          setHeartRate(`${HeartRate.BPM} BPM`);
        } else {
          setHeartRate('No data');
        }

        if (NoiseLevel && typeof NoiseLevel.Decibels === 'number') {
          setNoiseLevel(`${NoiseLevel.Decibels} dB`);
        } else {
          setNoiseLevel('No data');
        }
      } else {
        setHeartRate('No data');
        setNoiseLevel('No data');
      }
    } catch (err) {
      console.error(err);
      setError(err);
      setHeartRate('Error fetching data');
      setNoiseLevel('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Set up polling
    return () => clearInterval(intervalId); // Clean up
  }, []);

  return (
    <div>
      <h2>Vitals</h2>
      <p>Heart Rate: {heartRate}</p>
      <p>Noise Level: {noiseLevel}</p>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default VitalsDisplayComponent;
