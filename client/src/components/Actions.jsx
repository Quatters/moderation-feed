import { React } from 'react';
import '../style/Actions.css';

function Actions(props) {
  return (
    <div className='actions-wrapper'>
      <div className='approve-action action'>
        <button className='action-button' onClick={props.handleApprove}>
          Одобрить &nbsp;
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>Пробел</span>
      </div>
      <div className='decline-action action'>
        <button className='action-button' onClick={props.handleDecline}>
          Отклонить
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>Del</span>
      </div>
      <div className='escalate-action action'>
        <button className='action-button' onClick={props.handleEscalate}>
          Эскалация
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>Shift+Enter</span>
      </div>
      <div className='save-action action'>
        <button className='action-button' onClick={props.handleSave}>
          Сохранить
        </button>
        <span className='bullet no-select'>&bull;</span>
        <span className='key-hint'>F7</span>
      </div>
    </div>
  );
}

export default Actions;
