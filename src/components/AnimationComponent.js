import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const GET_LATEST_DATA = gql`
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

const AnimationComponent = () => {
  const { loading, error, data, refetch } = useQuery(GET_LATEST_DATA);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.latestEntries && data.latestEntries.length > 0) {
      const transformedData = data.latestEntries.map((entry) => ({
        timestamp: new Date(entry.timestamp).toLocaleTimeString(),
        heartRate: entry.heartRate.BPM,
        noiseLevel: entry.noiseLevel.Decibels,
      }));
      setChartData(transformedData);
    }
  }, [data]);

  // Function to handle the click of the refresh button
  const handleRefreshClick = () => {
    refetch(); // Refetch the data
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Data Animation</h2>
      <button onClick={handleRefreshClick}>Refresh Data</button> {/* Refresh button */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left" domain={['dataMin - 10', 'dataMax + 10']} />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="heartRate"
              stroke="#FF2929"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="noiseLevel"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for the chart.</p>
      )}
    </div>
  );
};

export default AnimationComponent;
