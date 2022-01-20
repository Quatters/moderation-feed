import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

function Start(props) {
  const keyMap = {
    ENTER: 'enter',
  };

  const hotkeyHandlers = {
    ENTER: props.onStart,
  };

  return (
    <div className='centered'>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={hotkeyHandlers}
        allowChanges={true}
      />
      <div className='info'>
        <h2>Приветствуем модератора!</h2>
        <p>Нажмите Enter или на кнопку ниже, чтобы приступить к работе.</p>
        <button onClick={props.onStart}>Начать</button>
      </div>
    </div>
  );
}

export default Start;
