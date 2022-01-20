import React from 'react';
import '../style/BulletinImageWrapper.css';

function BulletinImageWrapper(props) {
  return (
    <div className='bulletin-image-wrapper'>
      {props.images.map((image, i) => (
        <div key={i}>
          <img src={image} alt='' />
        </div>
      ))}
    </div>
  );
}

export default BulletinImageWrapper;
