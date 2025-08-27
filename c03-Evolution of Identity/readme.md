Evolution of Identity Management

Identity management has undergone significant changes over time, evolving from simple application-specific solutions to
standardized protocols that support secure, seamless access across applications and domains. Understanding this
progression helps us evaluate the trade-offs of past designs and apply modern solutions effectively.

Purpose

This guide helps new team members:

Recognize how identity management approaches have evolved.

Understand the limitations of earlier models and why newer standards emerged.

Gain context for modern protocols (SAML, OAuth 2.0, OpenID Connect) that we use today.

Key Points

Application-Specific Identities – Early systems required separate credentials for each application.

Centralized Directories – Enabled single identity/credential across apps, but users still logged in separately.

Single Sign-On (SSO) – Allowed users to log in once per domain and access multiple applications via session management.

Federated Identity – Protocols like SAML 2.0 and WS-Fed enabled cross-domain SSO.

OAuth 2.0 – Designed for authorizing applications to call APIs on behalf of a user.

OpenID Connect (OIDC) – Extends OAuth 2.0 to provide authentication and standardized user information.

```mermaid
timeline
    title History of Identity Solutions
    1980s: App-Specific Accounts: Each application manages its own user repository and credentials.
    1990s: Centralized Directories: Directory services centralize identity data across applications.
    2000s: SSO Servers: Single Sign-On servers enable one login per domain with session management.
    2005: Federated Identity (SAML 2.0, WS-Fed): Cross-domain authentication and single sign-on.
    2010: OAuth 2.0: Standard protocol for secure API authorization.
    2014: OpenID Connect (OIDC): Authentication layer on top of OAuth 2.0, returning standardized user identity data.
```
