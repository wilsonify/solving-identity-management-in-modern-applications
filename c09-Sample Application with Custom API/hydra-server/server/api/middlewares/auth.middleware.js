import ExpressJWT from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { oidcIssuer, apiUrl } from '../../common/env';

/**
 * Configure the JWKS client for OIDC
 * Dex exposes a JWKS endpoint at <issuer>/keys
 */
const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${oidcIssuer}/keys`,
});

const config = {
  // Dynamically provide a signing key based on the kid in the JWT header
  secret,

  // Validate the audience and issuer
  audience: apiUrl,         // your API identifier
  issuer: oidcIssuer,       // OIDC issuer
  algorithms: ['RS256'],    // enforce RS256
};

/**
 * Middleware to allow optional authentication
 * Credentials not required; unauthenticated users can access
 */
export const allowAnonymous = ExpressJWT({
  ...config,
  credentialsRequired: false,
});

/**
 * Middleware to enforce authentication
 * Rejects requests without valid access tokens
 */
export const ensureUser = ExpressJWT({ ...config });
