import { login, logout, handleCallback } from './auth.js';
const loginBtn = document.getElementById('login-btn');
console.debug('[main] loginBtn is:', loginBtn);
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    if (sessionStorage.getItem('access_token')) {
      logout(loginBtn);
    } else {
      login();
    }
  });

  // Check for OIDC callback
  handleCallback(loginBtn);
} else {
  console.error('[main] Could not find login button in DOM');
}
