import React from 'react';
import QueryForm from './QueryForm'; // Adjust the import path as necessary

function TestDataFetchComponent() {
  const handleQuerySubmit = ({ startDate, endDate, dataType }) => {
    // For testing, just log the input values to the console
    console.log("Form Submitted with the following values:");
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Data Type:", dataType);

    // Here you would typically send a request to your server or perform some action with these values
  };

  return (
    <div>
      <h2>Test Data Fetch Form</h2>
      <QueryForm onQuerySubmit={handleQuerySubmit} />
    </div>
  );
}

export default TestDataFetchComponent;
