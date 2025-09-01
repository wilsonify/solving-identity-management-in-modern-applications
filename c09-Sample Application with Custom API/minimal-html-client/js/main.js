import { login, logout, handleCallback } from './auth.js';

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
  if (sessionStorage.getItem('access_token')) {
    logout(loginBtn);
  } else {
    login();
  }
});

// Check for OIDC callback
handleCallback(loginBtn);
