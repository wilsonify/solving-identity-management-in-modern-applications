// src/Auth/hook.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import { useErrors } from "../Error/hook";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const OIDCContext = createContext();

/**
 * AuthProvider sets up a generic OIDC client (Dex, Keycloak, Auth0, etc.)
 */
export function AuthProvider({ config, children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const init = async () => {
      const userManager = new UserManager({
        authority: config.issuer, // e.g. http://127.0.0.1:5556/dex
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        post_logout_redirect_uri: config.postLogoutRedirectUri || window.location.origin,
        response_type: "code",
        scope: config.scope || "openid profile email",
        audience: config.audience,
        userStore: new WebStorageStateStore({ store: window.localStorage }),
      });

      // Try to restore an existing user session
      const user = await userManager.getUser();
      setAuth({ userManager, user });
    };

    init();
  }, [config]);

  if (!auth) {
    return <Spinner />;
  }

  return (
    <OIDCContext.Provider value={auth}>
      {children}
    </OIDCContext.Provider>
  );
}

export function useAuth() {
  return useContext(OIDCContext);
}

/**
 * Get an access token (refresh if needed)
 */
export function useToken() {
  const { userManager, user } = useAuth();
  const [token, setToken] = useState(user?.access_token);

  useEffect(() => {
    (async () => {
      if (!user || user.expired) {
        const newUser = await userManager.signinSilent().catch(() => null);
        if (newUser) {
          setToken(newUser.access_token);
        }
      } else {
        setToken(user.access_token);
      }
    })();
  }, [user, userManager]);

  return [!token, token];
}

/**
 * Get user profile info
 */
export function useUser() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user?.profile);
  const [, publishError] = useErrors();

  useEffect(() => {
    try {
      setProfile(user?.profile || null);
    } catch (e) {
      publishError(e);
    }
  }, [user, publishError]);

  return [!profile, profile];
}
