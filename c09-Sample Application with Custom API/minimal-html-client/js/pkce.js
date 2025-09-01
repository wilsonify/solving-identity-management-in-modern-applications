// Helper: Generate random string
export function randomString(length = 43) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

// Helper: SHA256 and base64url encode
export async function sha256Base64url(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  const bytes = new Uint8Array(hash);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// PKCE: Generate code verifier and challenge
export async function generatePKCE() {
  const codeVerifier = randomString(64);
  const codeChallenge = await sha256Base64url(codeVerifier);
  sessionStorage.setItem('pkce_verifier', codeVerifier);
  return codeChallenge;
}
