import React from 'react';
import '../style/BulletinHeader.css';

function BulletinHeader(props) {
  return (
    <div className='bulletin-header'>
      <div className='id-area'>
        <a href='#'>{props.id}</a>
        <span>&nbsp;—&nbsp;</span>
        <span>{props.publishDateString}</span>
      </div>
      <div className='owner-area'>
        <a href='#'>{props.ownerLogin}</a>
      </div>
    </div>
  );
}

export default BulletinHeader;
