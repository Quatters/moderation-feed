import { React, useEffect, useReducer } from 'react';
import '../style/Feed.css';

function Feed(props) {
  function handleLeft() {
    props.setIndex(props.currentIndex - 1);
  }

  function handleRight() {
    props.setIndex(props.currentIndex + 1);
  }

  function handleSelect(event) {
    props.setIndex(event.target.innerText - 1);
  }

  return (
    <div className='feed-wrapper'>
      <button onClick={handleLeft} className='arrow-button'>
        &larr;
      </button>
      {props.bulletins.map(({ status }, i) => (
        <button
          onClick={handleSelect}
          className={`page-button ${status} ${
            props.currentIndex === i ? 'active' : ''
          }`}
          key={i}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={handleRight} className='arrow-button'>
        &rarr;
      </button>
    </div>
  );
}

export default Feed;
