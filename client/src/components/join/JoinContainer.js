import React from 'react';

import Register from './Register';
import Login from './Login';

const JoinContainer = () => {
  return (
    <div className="mt-5 row justify-content-center">
      <div className="col-5">
        <Register />
      </div>
      <div className="vertical-divider" />
      <div className="col-5">
        <Login />
      </div>
    </div>
  );
};

export default JoinContainer;
