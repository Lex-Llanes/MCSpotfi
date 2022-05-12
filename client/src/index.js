import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
        domain='lex-llanes.us.auth0.com'
        clientId='GYn5eMURkelbSnPtt4qPsLnku0xD5GJc'
        redirectUri={window.location.origin}
        audience="Just a unique string of words for unique purposes"
        //This informs Auth0Provider server that the client is making an openid connect request (oidc)
        //The client is requesting profile information
        //Email means email is provided and must be authenticated by the Auth0Provider server
        scope="openid profile email"
    >
      <App />
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
