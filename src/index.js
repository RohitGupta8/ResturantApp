import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './Components/LoginForm/LoginPage';
import RegistrationPage from './Components/RegistrationForm/RegistrationPage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <RegistrationPage/> */}
    <LoginPage />
  </React.StrictMode>
);
reportWebVitals();
