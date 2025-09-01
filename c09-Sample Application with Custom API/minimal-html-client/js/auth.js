import { oidcConfig } from './config.js';
import { generatePKCE } from './pkce.js';

export async function login() {
  const codeChallenge = await generatePKCE();
  const url = new URL(`${oidcConfig.authority}/authorize`);
  url.searchParams.set('client_id', oidcConfig.clientId);
  url.searchParams.set('redirect_uri', oidcConfig.redirectUri);
  url.searchParams.set('response_type', oidcConfig.responseType);
  url.searchParams.set('scope', oidcConfig.scope);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');

  window.location.href = url.toString();
}

export async function handleCallback(loginBtn) {
  const params = new URLSearchParams(window.location.search);
  if (params.has('code')) {
    const code = params.get('code');
    const codeVerifier = sessionStorage.getItem('pkce_verifier');

    const tokenResponse = await fetch(`${oidcConfig.authority}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: oidcConfig.clientId,
        code: code,
        redirect_uri: oidcConfig.redirectUri,
        code_verifier: codeVerifier
      })
    }).then(r => r.json());

    sessionStorage.setItem('access_token', tokenResponse.access_token);
    sessionStorage.setItem('id_token', tokenResponse.id_token);

    window.history.replaceState({}, document.title, window.location.pathname);
    loginBtn.textContent = 'Logout';
  }
}

export function logout(loginBtn) {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('id_token');
  loginBtn.textContent = 'Login';
}
