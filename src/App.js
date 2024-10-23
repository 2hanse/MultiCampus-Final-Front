import './App.css';
import LoginPage from './component/pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinPage from './component/pages/JoinPage';
import FindEmailPage from './component/pages/find/FindEmailPage';
import FindResultEmailPage from './component/pages/find/FindResultEmailPage';
import FindPasswordPage from './component/pages/find/FindPasswordPage';
import BoardMainPage from './component/pages/BoardMainPage';
import MyLocationPage from './component/pages/MyLocationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path='/user/join' element={<JoinPage />} />
        <Route path='/user/find-email' element={<FindEmailPage />} />
        <Route path='/user/findResultEmailPage' element={<FindResultEmailPage />} />
        <Route path='/user/find-password' element={<FindPasswordPage />} />
        <Route path="/boardmain" element={<BoardMainPage />} />
        <Route path="/mylocation" element={<MyLocationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
