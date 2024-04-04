import './App.css';
import HeaderPage from './components/header/HeaderPage';
import HomePage from './components/home/HomePage';
import HeaderPage2 from './components/header copy/HeaderPage2';

function App() {
  return (
    <div className="App">
      <div className='laptopview'>
        <HeaderPage2 />
      </div>
      <div className='mobileView'>
          <HeaderPage />
      </div>
      <HomePage/>
    </div>
  );
}

export default App;
