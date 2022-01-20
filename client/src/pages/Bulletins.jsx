import { React, Fragment } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import Feed from '../components/Feed';
import Bulletin from '../components/Bulletin';
import Actions from '../components/Actions';
import MessageArea from '../components/MessageArea';

function Bulletins(props) {
  const keyMap = {
    APPROVE: 'space',
    DECLINE: 'del',
    ESCALATE: 'shift+enter',
    SAVE: 'f7',
    LEFT: 'left',
    RIGHT: 'right',
  };

  const hotkeyHandlers = {
    APPROVE: props.handlers.handleApprove,
    DECLINE: props.handlers.handleDecline,
    ESCALATE: props.handlers.handleEscalate,
    SAVE: props.handlers.handleSave,
    LEFT: () => props.handlers.handleIndexChange(props.states.currentIndex - 1),
    RIGHT: () =>
      props.handlers.handleIndexChange(props.states.currentIndex + 1),
  };

  return (
    <Fragment>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={hotkeyHandlers}
        allowChanges={true}
      />
      <div className='feed'>
        <Feed
          bulletins={props.states.bulletins}
          currentIndex={props.states.currentIndex}
          setIndex={props.handlers.handleIndexChange}
        />
        <p
          className={`text-red error ${
            props.states.saveError ? '' : 'visually-hidden'
          }`}
        >
          Пожалуйста, примите решения по всем объявлениям
        </p>
      </div>
      <div className='working-area'>
        <Bulletin
          bulletin={props.states.bulletins[props.states.currentIndex]}
        />
        <Actions
          handleApprove={props.handlers.handleApprove}
          handleDecline={props.handlers.handleDecline}
          handleEscalate={props.handlers.handleEscalate}
          handleSave={props.handlers.handleSave}
        />
        <MessageArea
          hidden={!props.states.reasonFieldState.displayed}
          tip={props.states.reasonFieldState.tip}
          onChange={props.handlers.handleReasonChange}
          value={props.states.currentReason}
          onConfirm={props.handlers.handleReasonConfirm}
          required={props.states.reasonFieldState.required}
        />
      </div>
    </Fragment>
  );
}

export default Bulletins;
