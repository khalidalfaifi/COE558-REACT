// DataFetchComponent.js

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_DATA = gql`
  query GetData($options: DataOptionsType) {
    fetchData(options: $options) {
      timestamp
      heartRate {
        BPM
      }
      noiseLevel {
        Decibels
      }
    }
  }
`;

const DataFetchComponent = () => {
  const [options, setOptions] = useState({});
  const { loading, error, data } = useQuery(GET_DATA, {
    variables: { options },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  // Component render logic...
  // (e.g., input fields for user options, display data)

  return <div>{/* Add your input fields and data display logic here */}</div>;
};

export default DataFetchComponent;
