import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutismKidStatusComponent = () => {
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      // Khalid, update URL
      const url =
        'https://gw-1jxz5puc.uc.gateway.dev/getAutismStatus';
      const response = await axios.get(url);
      setStatus(response.data.status); // if field
    } catch (err) {
      setError(err);
      setStatus('Error');
    }
  };

  useEffect(() => {
    fetchStatus(); // Fetch initial status

    const interval = setInterval(fetchStatus, 5000); // Polling every 5 seconds, Khalid

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (error) {
    return <p>Error fetching status: {error.message}</p>;
  }

  return (
    <div>
      <h2>Kid's Status</h2>
      <p>Status: {status}</p>
    </div>
  );
};

export default AutismKidStatusComponent;
