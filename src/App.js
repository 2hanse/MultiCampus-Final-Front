import './App.css';
import LoginPage from './component/login/LoginPage';
import BoardMainPage from './component/boardmain/BoardMainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/boardmain" element={<BoardMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
