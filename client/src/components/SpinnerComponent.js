import React from 'react';
import { Spinner } from 'reactstrap';

const SpinnerComponent = () => {
  return (
    <div
      style={{ overflowY: 'hidden', height: '75vh' }}
      className="d-flex align-items-center justify-content-center"
    >
      <Spinner
        style={{ width: '6rem', height: '6rem', color: '#ff6361' }}
        className="mx-auto"
      />
    </div>
  );
};

export default SpinnerComponent;
