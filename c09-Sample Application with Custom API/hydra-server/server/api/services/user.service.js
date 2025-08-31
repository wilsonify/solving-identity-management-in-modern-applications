import l from '../../common/logger';
import fetch from 'node-fetch';
import { oidcIssuer, oidcClientId, oidcClientSecret } from '../../common/env';

/**
 * Generic OIDC User Service.
 *
 * Fetches user info from OIDC provider's UserInfo endpoint.
 * Updating users depends on provider; here we assume an admin API exists.
 */
class UserService {
  constructor() {
    this.issuer = oidcIssuer;
    this.clientId = oidcClientId;
    this.clientSecret = oidcClientSecret;
    this.userInfoEndpoint = `${this.issuer}/userinfo`;
    this.tokenEndpoint = `${this.issuer}/token`; // for client credentials
  }

  /**
   * Fetch an access token using client credentials
   */
  async getAccessToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);

    const res = await fetch(this.tokenEndpoint, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to get token: ${data.error_description || data.error}`);
    }
    return data.access_token;
  }

  /**
   * Get user info
   * @param {string} userId
   */
  async get(userId) {
    l.info(`${this.constructor.name}.get(${userId})`);
    const token = await this.getAccessToken();

    const res = await fetch(`${this.userInfoEndpoint}?sub=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Failed to get user: ${err.error_description || err.error}`);
    }

    return res.json();
  }

  /**
   * Update user info (requires OIDC admin API)
   * @param {string} userId
   * @param {Object} updatedData
   */
  async update(userId, updatedData) {
    l.info(`${this.constructor.name}.update(${userId}, ${JSON.stringify(updatedData)})`);
    const token = await this.getAccessToken();

    // Replace with your provider's admin endpoint for updating users
    const updateEndpoint = `${this.issuer}/admin/users/${userId}`;

    const res = await fetch(updateEndpoint, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Failed to update user: ${err.error_description || err.error}`);
    }

    return res.json();
  }
}

export default new UserService();
