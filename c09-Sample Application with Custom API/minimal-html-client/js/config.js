// config.js
import { ENV } from './env.js';

export const oidcConfig = {
  clientId: ENV.REACT_APP_OIDC_CLIENT_ID,
  authority: ENV.REACT_APP_OIDC_ISSUER,
  redirectUri: ENV.REACT_APP_OIDC_REDIRECT_URI,
  responseType: 'code',
  scope: ENV.REACT_APP_OIDC_SCOPE,
};
