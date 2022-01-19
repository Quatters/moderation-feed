import React from 'react';
import BulletinBody from './BulletinBody';
import BulletinHeader from './BulletinHeader';
import '../style/Bulletin.css';

function Bulletin(props) {
  return (
    <div className='bulletin'>
      <BulletinHeader
        id={props.bulletin.id}
        publishDateString={props.bulletin.publishDateString}
        ownerLogin={props.bulletin.ownerLogin}
      />
      <BulletinBody
        bulletinSubject={props.bulletin.bulletinSubject}
        bulletinText={props.bulletin.bulletinText}
      />
    </div>
  );
}

export default Bulletin;
