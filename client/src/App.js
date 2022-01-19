import { React, useEffect, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import Actions from './components/Actions';
import Bulletin from './components/Bulletin';
import Feed from './components/Feed';
import './style/shared.css';
import './style/App.css';
import { getBulletins, saveBulletins, resetBulletins } from './api-calls';
import MessageArea from './components/MessageArea';

function App() {
  const [bulletins, setBulletins] = useState([]);
  const [error, seterror] = useState(false);
  const [hasMoreBulletins, setHasMoreBulletins] = useState(true);
  const [requestCompleted, setRequestCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allBulletinsAreMarked, setAllBulletinsAreMarked] = useState(false);
  const [currentReason, setCurrentReason] = useState('');
  const [reasonFieldState, setReasonFieldState] = useState({
    displayed: false,
    required: false,
    tip: '',
  });
  const [saveError, setSaveError] = useState(false);

  const keyMap = {
    APPROVE: 'space',
    DECLINE: 'del',
    ESCALATE: 'shift+enter',
    SAVE: 'f7',
    LEFT: 'left',
    RIGHT: 'right',
  };

  const hotkeyHandlers = {
    APPROVE: handleApprove,
    DECLINE: handleDecline,
    ESCALATE: handleEscalate,
    SAVE: handleSave,
    LEFT: () => handleIndexChange(currentIndex - 1),
    RIGHT: () => handleIndexChange(currentIndex + 1),
  };

  useEffect(() => {
    callGetBulletins();
  }, []);

  function callGetBulletins() {
    setRequestCompleted(false);
    getBulletins()
      .then(response => {
        if (response.status === 200) {
          setBulletins(response.data);
          setCurrentIndex(0);
          setHasMoreBulletins(true);
        } else if (response.status === 204) {
          setHasMoreBulletins(false);
          setBulletins([]);
        }
      })
      .catch(error => {
        seterror(true);
      })
      .finally(() => {
        setRequestCompleted(true);
      });
  }

  function handleIndexChange(newIndex) {
    if (newIndex < 0 || newIndex >= bulletins.length) return;
    setCurrentIndex(newIndex);
    if (
      bulletins[newIndex].status === 'declined' ||
      bulletins[newIndex].status === 'escalated'
    ) {
      showReasonField(bulletins[newIndex]);
    } else {
      hideReasonField();
    }
  }

  function showReasonField({ status, message }) {
    setCurrentReason(message);
    setReasonFieldState({
      displayed: true,
      required: status === 'declined',
      tip: status === 'declined' ? 'Причина отклонения' : 'Комментарий',
    });
  }

  function hideReasonField() {
    setCurrentReason('');
    setReasonFieldState({ displayed: false, required: false, tip: '' });
  }

  function handleApprove() {
    changeStatus(currentIndex, 'approved');
    bulletins[currentIndex].status = 'approved';
    setBulletins(bulletins);
    hideReasonField();
    moveToNext();
  }

  function handleDecline() {
    setReasonFieldState({
      displayed: true,
      required: true,
      tip: 'Причина отклонения',
    });
  }

  function handleEscalate() {
    setReasonFieldState({
      displayed: true,
      required: false,
      tip: 'Комментарий',
    });
  }

  function changeStatus(index, status, message) {
    bulletins[index].status = status;
    if (message) bulletins[index].message = message;
    setBulletins(bulletins);
  }

  function handleSave() {
    if (bulletins.find(bulletin => !bulletin.hasOwnProperty('status'))) {
      setSaveError(true);
      setTimeout(() => {
        setSaveError(false);
      }, 5000);
      return;
    }
    setRequestCompleted(false);
    saveBulletins(bulletins)
      .then(() => {
        callGetBulletins();
        setAllBulletinsAreMarked(false);
      })
      .catch(error => {
        seterror(true);
      })
      .finally(() => {
        setRequestCompleted(true);
      });
  }

  function moveToNext() {
    if (allBulletinsAreMarked) return;
    let i = currentIndex + 1 < bulletins.length ? currentIndex + 1 : 0;
    while (bulletins[i].status) {
      i = i + 1 < bulletins.length ? i + 1 : 0;
      if (i === currentIndex) {
        setAllBulletinsAreMarked(true);
        return;
      }
    }
    setCurrentIndex(i);
  }

  function handleReasonChange(event) {
    setCurrentReason(event.target.value.trim());
  }

  function handleReasonConfirm() {
    if (reasonFieldState.required && currentReason === '') return;

    setBulletins(bulletins);
    changeStatus(
      currentIndex,
      reasonFieldState.required ? 'declined' : 'escalated',
      currentReason
    );

    setCurrentReason('');
    setReasonFieldState({ required: false, displayed: false, tip: '' });

    moveToNext();
  }

  function callResetBulletins() {
    resetBulletins()
      .then(() => {
        callGetBulletins();
      })
      .catch(error => {
        seterror(true);
      });
  }

  if (error) {
    return (
      <div className='centered'>
        <div className='error-info'>
          <h2>Ошибка</h2>
          <p>
            Вероятно, я где-то накосячил :( <br />
            Попробуйте перезагрузить страницу.
          </p>
        </div>
      </div>
    );
  }

  if (!hasMoreBulletins) {
    return (
      <div className='centered'>
        <div className='reset-info'>
          <h2>Объявления закончились</h2>
          <p>
            Нажмите Enter или на кнопку ниже, чтобы вернуть объявления к
            исходному состоянию.
          </p>
          <button onClick={callResetBulletins}>Вернуть</button>
        </div>
      </div>
    );
  }

  if (!requestCompleted && hasMoreBulletins) {
    return <div className='centered'>Загрузка...</div>;
  }

  return (
    <div className='App'>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={hotkeyHandlers}
        allowChanges={true}
      />
      <div className='feed'>
        <Feed
          bulletins={bulletins}
          currentIndex={currentIndex}
          setIndex={handleIndexChange}
        />
        <p className={`text-red error ${saveError ? '' : 'hidden'}`}>
          Пожалуйста, примите решения по всем объявлениям
        </p>
      </div>
      <div className='working-area'>
        <Bulletin bulletin={bulletins[currentIndex]} />
        <Actions
          handleApprove={handleApprove}
          handleDecline={handleDecline}
          handleEscalate={handleEscalate}
          handleSave={handleSave}
        />
        <MessageArea
          hidden={!reasonFieldState.displayed}
          tip={reasonFieldState.tip}
          onChange={handleReasonChange}
          value={currentReason}
          onConfirm={handleReasonConfirm}
          required={reasonFieldState.required}
        />
      </div>
    </div>
  );
}

export default App;
