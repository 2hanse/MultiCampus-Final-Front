import './App.css';
import LoginPage from './component/pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinPage from './component/pages/JoinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path='/user/join' element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
