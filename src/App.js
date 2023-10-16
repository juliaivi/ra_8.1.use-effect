import Lists from './components/Lists/Lists';
import './App.css';

const url = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/';
function App() {
  return (
    <div className="App">
      <Lists url={url} />
    </div>
  );
}

export default App;
