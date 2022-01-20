import React from 'react';

function ErrorPage() {
  return (
    <div className='centered'>
      <div className='info'>
        <h2>Ошибка</h2>
        <p>
          Вероятно, я где-то накосячил :( <br />
          Попробуйте перезагрузить страницу.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
