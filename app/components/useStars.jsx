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

<<<<<<< HEAD
  return Rate
=======
  return (
    <div className='text-yellow-500 text-[25px]'>
      {Rate}
    </div>
  );
>>>>>>> 985cc6c46b724af8f1a0c35f197163c679cb6664
}

export default Stars;
