# Single Sign-On (SSO)

## What is SSO?
**Single sign-on (SSO)** enables a user to authenticate once and access multiple applications without having to log in again.  

This is typically achieved through an **identity provider (IdP)** using protocols such as **OIDC** or **SAML 2.0**.

As long as the user’s IdP session remains valid, 
they can seamlessly access any connected application without reauthentication.

---

## How SSO Works
- **Browser-based applications:** Multiple web apps accessed via the same browser share the IdP session.  
- **Native applications:** Authentication is often delegated through a browser-based flow to the same IdP.
- **SSO session lifecycle:** Access continues until the IdP session expires or is terminated.

---

## Benefits of SSO
- **Convenience:** Users log in once and move across applications without repeated prompts.  
- **Security:** Credentials are only provided to the identity provider, reducing exposure to individual apps.  
- **Centralized control:** Organizations can enforce consistent authentication policies from the IdP.  
- **Developer efficiency:** Application developers avoid building and maintaining custom login pages, account recovery, and related mechanisms.  

---

## Real-World Scenarios
- **Consumer apps:** Logging into multiple apps with **Google Sign-In**.  
- **Enterprise environments:** Employees accessing internal and cloud apps through a corporate IdP.  
- **Universities:** Students, faculty, and staff accessing academic systems through a university IdP.  

---

## Key Points
- SSO allows a user to authenticate once and access multiple applications connected to the same IdP.  
- By centralizing authentication, user credentials are not directly exposed to individual applications.  
- Session characteristics (duration, authentication strength, etc.) should align with application and security requirements.  
- Identity providers simplify application development by handling login and account recovery flows.  
