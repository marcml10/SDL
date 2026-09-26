import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage         from './components/LoginPage';
import SignUpPage        from './components/SignUpPage';
import SignUpSuccessPage from './components/SignUpSuccessPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                element={<LoginPage />}  />
        <Route path="/signup"          element={<SignUpPage />} />
        <Route path="/signup/success"  element={<SignUpSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}