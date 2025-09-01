
import { generatePKCE } from './pkce.js';

export const ENV = {
  OIDC_ISSUER: "http://dex:5556/dex",
  OIDC_CLIENT_ID: "markdown-editor-client",
  OIDC_REDIRECT_URI: window.location.origin + window.location.pathname,
  OIDC_SCOPE: "openid profile email",
  API_URL: "http://localhost:3001"  // optional if you call your API
};

console.debug('ENV is:', ENV);
export async function login() {
  console.debug('[login] Starting login flow');

  try {
    const codeChallenge = await generatePKCE();
    console.debug('[login] Generated code challenge:', codeChallenge);

    const url = new URL(`${ENV.OIDC_ISSUER}/authorize`);
    url.searchParams.set('client_id', ENV.OIDC_CLIENT_ID);
    url.searchParams.set('redirect_uri', ENV.OIDC_REDIRECT_URI);
    url.searchParams.set('response_type', ENV.responseType);
    url.searchParams.set('scope', ENV.OIDC_SCOPE);
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');

    console.debug('[login] Redirecting to authorization URL:', url.toString());
    window.location.href = url.toString();
  } catch (err) {
    console.error('[login] Error during login:', err);
  }
}

export async function handleCallback(loginBtn) {
  console.debug('[handleCallback] Checking for authorization code');
  const params = new URLSearchParams(window.location.search);

  if (params.has('code')) {
    const code = params.get('code');
    console.debug('[handleCallback] Found code:', code);

    const codeVerifier = sessionStorage.getItem('pkce_verifier');
    if (!codeVerifier) {
      console.warn('[handleCallback] No PKCE verifier found in sessionStorage');
    } else {
      console.debug('[handleCallback] Loaded PKCE verifier from sessionStorage');
    }

    try {
      console.debug('[handleCallback] Exchanging code for tokens at:', `${ENV.authority}/token`);
      const tokenResponse = await fetch(`${ENV.authority}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: ENV.clientId,
          code: code,
          redirect_uri: ENV.redirectUri,
          code_verifier: codeVerifier
        })
      });

      console.debug('[handleCallback] Token endpoint response status:', tokenResponse.status);

      const json = await tokenResponse.json();
      console.debug('[handleCallback] Token response body:', json);

      if (json.access_token && json.id_token) {
        sessionStorage.setItem('access_token', json.access_token);
        sessionStorage.setItem('id_token', json.id_token);
        console.debug('[handleCallback] Tokens stored in sessionStorage');
      } else {
        console.warn('[handleCallback] Token response missing access_token or id_token');
      }

      window.history.replaceState({}, document.title, window.location.pathname);
      console.debug('[handleCallback] Cleaned up URL query params');

      if (loginBtn) {
        loginBtn.textContent = 'Logout';
        console.debug('[handleCallback] Updated login button to Logout');
      }
    } catch (err) {
      console.error('[handleCallback] Error exchanging code for tokens:', err);
    }
  } else {
    console.debug('[handleCallback] No code param found in URL');
  }
}

export function logout(loginBtn) {
  console.debug('[logout] Clearing tokens from sessionStorage');
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('id_token');

  if (loginBtn) {
    loginBtn.textContent = 'Login';
    console.debug('[logout] Updated login button to Login');
  }
}
