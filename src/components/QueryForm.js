import React from 'react';

function QueryForm({ onQuerySubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onQuerySubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Fetch Latest Entry</button>
    </form>
  );
}

export default QueryForm;
