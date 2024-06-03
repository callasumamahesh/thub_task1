import React from 'react';

function Stars({ rating }) {
  let Rate = '';

  while (rating > 0) {
    if (rating >= 1) {
      Rate += '★';
    } else {
      Rate += '☆';
    }
    rating = rating - 1;
  }

  // Fill with empty stars if less than 5 stars are displayed
  while (Rate.length < 5) {
    Rate += '☆';
  }

  return (
    <div className='text-yellow-500 text-[25px]'>
      {Rate}
    </div>
  );
}

export default Stars;
