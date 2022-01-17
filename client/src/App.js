import Actions from './components/Actions';
import Bulletin from './components/Bulletin';
import Feed from './components/Feed';
import './style/shared.css';

function App() {
  return (
    <div className='App'>
      <Feed />
      <div className='working-area'>
        <Bulletin />
        <Actions />
      </div>
    </div>
  );
}

export default App;
