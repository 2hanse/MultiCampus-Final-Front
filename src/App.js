import './App.css';
import LoginPage from './component/pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinPage from './component/pages/JoinPage';
import FindEmailPage from './component/pages/find/FindEmailPage';
import FindResultEmailPage from './component/pages/find/FindResultEmailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path='/user/join' element={<JoinPage />} />
        <Route path='/user/find-email' element={<FindEmailPage />} />
        <Route path='/user/findResultEmailPage' element={<FindResultEmailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
