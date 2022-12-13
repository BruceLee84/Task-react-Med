import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


//  redux
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userSlice from './components/redux/data/user';
import cartSlice from './components/hookcom/cartSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();