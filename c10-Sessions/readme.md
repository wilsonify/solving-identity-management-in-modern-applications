# Understanding Sessions in Applications

A **session** represents a user’s interaction with an application over a period of time. 

After authentication, users expect to navigate and perform transactions without re-authenticating for every action. 

To support this, applications must track session state — information about whether, when, and how a user has authenticated.

Sessions are essential for usability and security, but their management varies across platforms:
- **Web applications**
- **Single-page applications (SPAs)**
- **Native applications (e.g., mobile apps)**

## Where Sessions Exist
- **Application sessions:** Managed directly by the app to track user activity.  
- **Identity provider sessions:** Created when authentication is delegated externally.  
- **Multiple layers of sessions:** In single sign-on (SSO) solutions, 
a user may simultaneously have app-level and identity-provider-level sessions.  

## Session Expiration and Renewal
- **Idle timeout:** Ends the session after inactivity.  
- **Maximum timeout:** Ends the session after a fixed period, regardless of activity.  
- **Continuous authentication:** Some systems can remember and reconstitute expired sessions.  

## Security Considerations
- Session length depends on:
  - Sensitivity of resources accessed.  
  - Application delivery platform.  
  - Type of application.  
- Careful timeout design balances usability with security.  

## Key Points
- A user’s interaction over time is called a **session**.  
- **Session state** contains user and authentication event data.  
- With SSO, users may have **multiple active sessions**.  
- Sessions are controlled by **idle** and **maximum timeouts**.  
- **Continuous authentication** can re-establish expired sessions.  
