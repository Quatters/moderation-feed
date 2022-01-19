import { React, useRef, useEffect } from 'react';
import '../style/MessageArea.css';

function MessageArea(props) {
  const textarea = useRef(null);

  useEffect(() => {
    if (textarea.current) {
      textarea.current.focus();
    }
  }, [textarea.current]);

  function submitOnEnter(event) {
    if (event.which === 13 && !event.shiftKey) {
      event.preventDefault();
      props.onConfirm();
    }
  }

  return (
    <div className={`message-area ${props.hidden ? 'hidden' : ''}`}>
      <p className='tip'>
        {props.tip} {props.required ? <span className='text-red'>*</span> : ''}
      </p>
      <textarea
        value={props.value}
        onChange={props.onChange}
        onKeyUp={submitOnEnter}
        ref={textarea}
      >
        {props.text}
      </textarea>
      <button onClick={props.onConfirm}>Подтвердить</button>
    </div>
  );
}

export default MessageArea;
