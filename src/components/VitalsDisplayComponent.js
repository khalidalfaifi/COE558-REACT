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

      console.log('API Response:', response.data);

      if (response.data && response.data.HeartRate && typeof response.data.HeartRate.BPM === 'number') {
        setHeartRate(`${response.data.HeartRate.BPM} BPM`);
      } else {
        setHeartRate('No data');
      }

      if (response.data && response.data.NoiseLevel && typeof response.data.NoiseLevel.Decibels === 'number') {
        setNoiseLevel(`${response.data.NoiseLevel.Decibels} dB`);
      } else {
        setNoiseLevel('No data');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data');
      setHeartRate('Error fetching data');
      setNoiseLevel('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId); // Clean up
  }, []);

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
