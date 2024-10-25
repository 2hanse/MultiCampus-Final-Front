import './App.css';
import LoginPage from './component/pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinPage from './component/pages/JoinPage';
import BoardMainPage from './component/pages/BoardMainPage';
import FindEmailPage from './component/pages/find/email/FindEmailPage';
import FindResultEmailPage from './component/pages/find/email/FindResultEmailPage';
import FindPasswordPage from './component/pages/find/password/FindPasswordPage';
import PhoneIdentificationPage from './component/pages/find/password/PhoneIdentificationPage';
import ResetPasswordPage from './component/pages/find/password/ResetPasswordPage';
import ResetPasswordResultPage from './component/pages/find/password/ResetPasswordResultPage';
import MyLocationPage from './component/pages/MyLocationPage';
import MapPage from './component/pages/MapPage';

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
        <Route path='/user/phone-identification' element={<PhoneIdentificationPage />} />
        <Route path='/user/resetPassword' element={<ResetPasswordPage />} />
        <Route path='/user/resetPasswordResult' element={<ResetPasswordResultPage />} />
        <Route path="/mylocation" element={<MyLocationPage />} />
        <Route path="/homepage" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
