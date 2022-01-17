import React from 'react';
import BulletinImageWrapper from './BulletinImageWrapper';
import '../style/BulletinBody.css';

function BulletinBody(props) {
  return (
    <div className='bulletin-body'>
      <div>
        <h2 className='bulletin-subject'>
          {props.bulletinSubject || 'bulletinSubject'}
        </h2>
        <div className='bulletin-text'>
          {props.bulletinText || 'bulletinText'}
        </div>
      </div>
      <BulletinImageWrapper />
    </div>
  );
}

export default BulletinBody;
