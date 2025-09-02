# Stronger Authentication

## Why Authentication Strength Matters
Not all authentication methods provide the same level of security.  
- **Static passwords** are widely used but are considered **weak authentication** because they can be easily compromised and often without detection.  
- Stronger authentication mechanisms provide better protection for sensitive resources and reduce the likelihood of account compromise.  

---

## Stronger Forms of Authentication
- **One-Time Passwords (OTPs):** Temporary codes generated on a device.  
- **Cryptographic devices:** Hardware or software-based tokens that provide unique cryptographic challenges.  
- **Multi-Factor Authentication (MFA):** Combines multiple factors:  
  - *Something you know* (password, PIN)  
  - *Something you have* (token, phone, smart card)  
  - *Something you are* (biometrics)  

By requiring more than one factor, MFA makes it significantly harder for attackers to impersonate a user.

---

## Step-Up Authentication
**Step-up authentication** occurs when a user is required to re-authenticate with a stronger method to gain access to more sensitive resources.  
- Example: A user logged in with a password may be asked to use a one-time code or biometric factor to approve a high-value transaction.  
- Both **OIDC** and **SAML 2.0** support requesting specific **authentication context classes**, allowing applications to ensure stronger methods are used when needed.  

---

## Session Management Considerations
- Elevated sessions should **expire sooner** than normal sessions to limit exposure.  
- Logout should terminate high-assurance sessions promptly.  
- This supports the principle of **least privilege**, ensuring users only maintain elevated access when strictly necessary.  

---

## Key Points
- Static passwords are weak and often compromised without detection.  
- Stronger authentication relies on physical devices or multiple factors.  
- Multi-factor authentication combines knowledge, possession, and biometric factors.  
- Step-up authentication increases assurance when accessing sensitive resources.  
- OIDC and SAML 2.0 enable applications to request specific authentication levels.  
- Shorter timeouts for elevated sessions reduce risk and enforce least privilege.  
