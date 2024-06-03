// src/LoadingSpinner.js

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-[2rem]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
    </div>
  );
};

export default LoadingSpinner;
