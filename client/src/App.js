import { React, useState } from 'react';
import { getBulletins, saveBulletins, resetBulletins } from './api-calls';
import Error from './pages/Error';
import Loading from './pages/Loading';
import NoMoreBulletins from './pages/NoMoreBulletins';
import Start from './pages/Start';
import Bulletins from './pages/Bulletins';
import './style/shared.css';
import './style/App.css';

function App() {
  const [bulletins, setBulletins] = useState([]);
  const [error, setError] = useState(false);
  const [hasMoreBulletins, setHasMoreBulletins] = useState(true);
  const [requestCompleted, setRequestCompleted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allBulletinsAreMarked, setAllBulletinsAreMarked] = useState(false);
  const [currentReason, setCurrentReason] = useState('');
  const [reasonFieldState, setReasonFieldState] = useState({
    displayed: false,
    required: false,
    tip: '',
  });
  const [saveError, setSaveError] = useState(false);
  const [firstStart, setFirstStart] = useState(true);

  function start() {
    callGetBulletins();
    setFirstStart(false);
  }

  function callGetBulletins() {
    setRequestCompleted(false);
    getBulletins()
      .then(response => {
        if (response.status === 200) {
          setCurrentIndex(0);
          setHasMoreBulletins(true);
          setBulletins(response.data);
        } else if (response.status === 204) {
          setHasMoreBulletins(false);
          setBulletins([]);
        }
      })
      .catch(error => {
        setError(true);
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
        setError(true);
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
    if (reasonFieldState.required && currentReason.trim() === '') return;

    setBulletins(bulletins);
    changeStatus(
      currentIndex,
      reasonFieldState.required ? 'declined' : 'escalated',
      currentReason.trim()
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
        setError(true);
      });
  }

  const handlers = {
    handleIndexChange,
    handleApprove,
    handleDecline,
    handleEscalate,
    handleSave,
    handleReasonChange,
    handleReasonConfirm,
  };

  const states = {
    bulletins,
    currentIndex,
    reasonFieldState,
    currentReason,
    saveError,
  };

  let page;

  if (error) page = <Error />;
  else if (firstStart) page = <Start onStart={start} />;
  else if (!hasMoreBulletins)
    page = <NoMoreBulletins onReset={callResetBulletins} />;
  else if (!requestCompleted && hasMoreBulletins) page = <Loading />;
  else page = <Bulletins handlers={handlers} states={states} />;

  return <div className='App'>{page}</div>;
}

export default App;
