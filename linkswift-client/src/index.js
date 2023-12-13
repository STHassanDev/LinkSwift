import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDHTy7vIg7KkBQ7PP7sQbTZksPM4wS7DWE",
  authDomain: "linkswift-a7be9.firebaseapp.com",
  projectId: "linkswift-a7be9",
  storageBucket: "linkswift-a7be9.appspot.com",
  messagingSenderId: "307445384333",
  appId: "1:307445384333:web:d24369e1a5d50d57b28ec4",
  measurementId: "G-WM98E0K0L0"
};

initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/app' element={<App />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
