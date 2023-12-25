import React, { useState } from 'react';
import QueryForm from './QueryForm'; // Fahd makes sure for the path 

function TestDataFetchComponent() {
  // State to store the latest entry
  const [latestEntry, setLatestEntry] = useState(null);

  const handleQuerySubmit = () => {
    const query = `
      query {
        latestEntries {
          timestamp
          heartRate {
            BPM
            Anomaly
          }
          noiseLevel {
            Decibels
            Anomaly
          }
        }
      }
    `;

    // Send the request to the GraphQL server
    fetch('https://us-central1-final-project-1-408101.cloudfunctions.net/processingdata/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ query }),
    })
    .then(response => response.json())
    .then(data => {
      
      const latest = data.data.latestEntries[0];
      setLatestEntry(latest); // Store the latest entry in the state
    })
    .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <h2>Data Fetch Form</h2>
      <QueryForm onQuerySubmit={handleQuerySubmit} />
      {latestEntry && ( // Conditionally render the latest entry if it exists
        <div>
          <h3>Latest Entry</h3>
          <p>Timestamp: {latestEntry.timestamp}</p>
          <p>Heart Rate: {latestEntry.heartRate.BPM} BPM - Anomaly: {latestEntry.heartRate.Anomaly ? 'Yes' : 'No'}</p>
          <p>Noise Level: {latestEntry.noiseLevel.Decibels} dB - Anomaly: {latestEntry.noiseLevel.Anomaly ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default TestDataFetchComponent;
