import React from 'react';
import ReactDOM from 'react-dom';
import './components/styles/styles.css';
import './components/styles/header.css';
import './components/styles/Profile.css';
import './components/styles/Overlay.css';
import './components/styles/RegLogForEng.css';
import './components/styles/Settings.css'
import './components/styles/post.css'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index_Reducer'

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  ,
  document.getElementById('root')
);
