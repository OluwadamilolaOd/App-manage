import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import {PublicClientApplication} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './Auth/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
      <App />
      </Provider>
    </MsalProvider>
    </BrowserRouter>

  </React.StrictMode>
);


