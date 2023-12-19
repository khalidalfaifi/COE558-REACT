import React, { useState } from 'react';

function QueryForm({ onQuerySubmit }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dataType, setDataType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onQuerySubmit({ startDate, endDate, dataType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Start Date (YYYY-MM-DD):
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Date (YYYY-MM-DD):
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Data Type:
          <select value={dataType} onChange={e => setDataType(e.target.value)}>
            <option value="HeartRate">Heart Rate</option>
            <option value="NoiseLevel">Noise Level</option>
            {/* Add other data types as needed */}
          </select>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QueryForm;
