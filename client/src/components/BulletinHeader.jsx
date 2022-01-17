import React from 'react';
import '../style/BulletinHeader.css';

function BulletinHeader(props) {
  return (
    <div className='bulletin-header'>
      <div className='id-area'>
        <a href='#'>{props.id || '1234567'}</a>
        <span>&nbsp;—&nbsp;</span>
        <span>{props.publishDateString || '08:46, сегодня'}</span>
      </div>
      <div className='owner-area'>
        <a href='#'>{props.ownerLogin || 'Quatters'}</a>
      </div>
    </div>
  );
}

export default BulletinHeader;
