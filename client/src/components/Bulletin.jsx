import React from 'react';
import BulletinBody from './BulletinBody';
import BulletinHeader from './BulletinHeader';
import '../style/Bulletin.css';

function Bulletin(props) {
  return (
    <div className='bulletin'>
      <BulletinHeader />
      <BulletinBody
        bulletinSubject='Название объявления'
        bulletinText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium aspernatur recusandae molestiae distinctio? Quis beatae sed quaerat, magni consectetur architecto repellendus velit deserunt. Id fuga tempore omnis! Quod, totam nostrum.'
      />
    </div>
  );
}

export default Bulletin;
