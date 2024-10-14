import './App.css';
import SignUpForm from './component/join/SignUpForm';
import LoginPage from './component/login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/join' element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
