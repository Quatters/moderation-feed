import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

function NoMoreBulletins(props) {
  const keyMap = {
    ENTER: 'enter',
  };

  const hotkeyHandlers = {
    ENTER: props.onReset,
  };

  return (
    <div className='centered'>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={hotkeyHandlers}
        allowChanges={true}
      />
      <div className='info'>
        <h2>Объявления закончились</h2>
        <p>
          Нажмите Enter или на кнопку ниже, чтобы вернуть объявления к исходному
          состоянию.
        </p>
        <button onClick={props.onReset}>Вернуть</button>
      </div>
    </div>
  );
}

export default NoMoreBulletins;
