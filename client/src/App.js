import { React, useEffect, useState } from 'react';
import Actions from './components/Actions';
import Bulletin from './components/Bulletin';
import Feed from './components/Feed';
import './style/shared.css';
import { getBulletins, saveBulletins, resetBulletins } from './api-calls';
import MessageArea from './components/MessageArea';

function App() {
  const [bulletins, setBulletins] = useState([]);
  const [apiError, setApiError] = useState(false);
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
        setApiError(true);
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
        setApiError(true);
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
    setCurrentReason(event.target.value);
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
        setApiError(true);
      });
  }

  if (apiError) {
    return <div>Ошибка сервера</div>;
  }

  if (!hasMoreBulletins) {
    return (
      <div>
        <p>Объявления закончились</p>
        <p>Нажмите на кнопку, чтобы вернуть объявления к исходному состоянию</p>
        <button onClick={callResetBulletins}>Вернуть</button>
      </div>
    );
  }

  if (!requestCompleted && hasMoreBulletins) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className='App'>
      <Feed
        bulletins={bulletins}
        currentIndex={currentIndex}
        setIndex={handleIndexChange}
      />
      <div className='working-area'>
        <Bulletin bulletin={bulletins[currentIndex]} />
        <Actions
          handleApprove={handleApprove}
          handleDecline={handleDecline}
          handleEscalate={handleEscalate}
          handleSave={handleSave}
          hidden={!saveError}
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
