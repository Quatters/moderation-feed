import React from 'react';
import '../style/Feed.css';

function Feed(props) {
  return (
    <div className='feed-wrapper'>
      <button className='arrow-button'>&larr;</button>
      {[...Array(10)].map((x, i) => (
        <button className='page-button' key={i}>
          {i + 1}
        </button>
      ))}
      <button className='arrow-button'>&rarr;</button>
    </div>
  );
}

export default Feed;
