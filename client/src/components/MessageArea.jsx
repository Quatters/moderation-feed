import { React } from 'react';
import '../style/MessageArea.css';

function MessageArea(props) {
  return (
    <div className={`message-area ${props.hidden ? 'hidden' : ''}`}>
      <p className='tip'>
        {props.tip} {props.required ? <span className='text-red'>*</span> : ''}
      </p>
      <textarea value={props.value} onChange={props.onChange}>
        {props.text}
      </textarea>
      <button onClick={props.onConfirm}>Подтвердить</button>
    </div>
  );
}

export default MessageArea;
