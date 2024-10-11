import logo from './logo.svg';
import './App.css';
import LoginPage from './login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './login/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
