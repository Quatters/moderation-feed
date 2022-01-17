import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import '../style/Actions.css';

function Actions() {
  useHotkeys('space', handleApprove);
  useHotkeys('delete', handleDecline);
  useHotkeys('shift+enter', handleEscalate);
  useHotkeys('f7', handleSave);

  function handleApprove() {
    console.log('approve');
  }

  function handleDecline() {
    console.log('decline');
  }

  function handleEscalate() {
    console.log('escalate');
  }

  function handleSave() {
    console.log('save');
  }

  return (
    <div className='actions-wrapper'>
      <div className='approve-action action'>
        <button className='action-button' onClick={handleApprove}>
          Одобрить &nbsp;
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>Пробел</span>
      </div>
      <div className='decline-action action'>
        <button className='action-button' onClick={handleDecline}>
          Отклонить
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>Del</span>
      </div>
      <div className='escalate-action action'>
        <button className='action-button' onClick={handleEscalate}>
          Эскалация
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>Shift+Enter</span>
      </div>
      <div className='save-action action'>
        <button className='action-button' onClick={handleSave}>
          Сохранить
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>F7</span>
      </div>
    </div>
  );
}

export default Actions;
