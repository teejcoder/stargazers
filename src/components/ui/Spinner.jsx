import React from 'react';
import spinner from './assets/spinner.svg';

function Spinner() {
  return (
    <div className="spinner-container">
      <img src={spinner} alt="Loading..." className="spinner" />
    </div>
  );
}

export default Spinner;