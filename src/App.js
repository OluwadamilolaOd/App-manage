import './App.css';
import {Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Pages/Home/Home'
import User from './Pages/User/User'
import Organizations from './Pages/Organization/Organization'
import LandingPage from './Pages/LandingPage/LandingPage';


function App() {
  return (
    <div className="App">
      <LandingPage />
      <Dashboard >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<User />} />
          <Route path='/organization' element={<Organizations />} />
        </Routes>
        </Dashboard>
    </div>
  );
}

export default App;
