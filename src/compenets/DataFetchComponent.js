import React, { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';

function QueryForm({ onQuerySubmit }) {
  const [timeRange, setTimeRange] = useState('');
  const [dataType, setDataType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onQuerySubmit({ timeRange, dataType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Time Range:
        <input
          type="text"
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
        />
      </label>
      <label>
        Data Type:
        <select value={dataType} onChange={e => setDataType(e.target.value)}>
          <option value="HeartRate">Heart Rate</option>
          <option value="NoiseLevel">Noise Level</option>
          {/* Add other data types as needed */}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

function DataFetchComponent() {
  const client = useApolloClient();
  const [fetchedData, setFetchedData] = useState(null);

  const handleQuerySubmit = async ({ timeRange, dataType }) => {
    try {
      const { data } = await client.query({
        query: gql`
          query GetAutismData($timeRange: String!, $dataType: String!) {
            getAutismData(timeRange: $timeRange, dataType: $dataType) {
              // Define the fields you want to fetch
              // For example:
              // _id
              // UserId
              // Timestamp
              // HeartRate { BPM, Anomaly }
              // NoiseLevel { Decibels, Anomaly }
            }
          }
        `,
        variables: { timeRange, dataType },
      });
      setFetchedData(data.getAutismData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <QueryForm onQuerySubmit={handleQuerySubmit} />
      {fetchedData && (
        <div>
          {/* Render your fetched data here */}
          {/* This is an example, adjust it according to your data structure */}
          <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DataFetchComponent;
