
import { useState } from 'react';
import './App.css';
import EmployeeRegistration from './pages/EmployeeRegistration';
import WeatherInfo from './pages/WeatherInfo';

function App() {
  const [activePage, setActivePage] = useState('employee');

  return (
    <div className="App">
      <div className="page-buttons">
        <button
          className={activePage === 'employee' ? 'active' : ''}
          onClick={() => setActivePage('employee')}
        >
          Employee Registration
        </button>
        <button
          className={activePage === 'weather' ? 'active' : ''}
          onClick={() => setActivePage('weather')}
        >
          Weather Infomation
        </button>
      </div>

      <div className="page-content">
        {activePage === 'employee' && <EmployeeRegistration />}
        {activePage === 'weather' && <WeatherInfo />}
      </div>
    </div>
  );
}

export default App;

