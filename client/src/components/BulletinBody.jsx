import React from 'react';
import BulletinImageWrapper from './BulletinImageWrapper';
import '../style/BulletinBody.css';

function BulletinBody(props) {
  return (
    <div className='bulletin-body'>
      <div>
        <h2 className='bulletin-subject'>
          {props.subject || 'bulletinSubject'}
        </h2>
        <div className='bulletin-text'>{props.text || 'bulletinText'}</div>
      </div>
      <BulletinImageWrapper images={props.images} />
    </div>
  );
}

export default BulletinBody;
