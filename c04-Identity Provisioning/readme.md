# Identity Provisioning

Provisioning is the process of creating an account and its associated identity information.  

It’s the first step in the life cycle of a user identity, 
forming the foundation for authentication and authorization.

## Summary

We’ve reviewed several approaches to provisioning identities, including:

- **Self-registration** (users sign up directly)  
- **Progressive profiling** (gradually collecting attributes over time)  
- **User migration** (importing from another system)  
- **Administrative provisioning** (manual or automated account creation)  
- **Identity provider integration** (leveraging existing trusted providers)  

When selecting a provisioning strategy, it’s important to match the **strength of the identity** with the **sensitivity of your application** and its target audience.  

Once identities are provisioned, the next steps are **authentication and access control**. Since many modern applications are API-first, this naturally leads to exploring **OAuth 2.0** for securing APIs.

## Key Points

- Provisioning establishes the **source of truth** for user identities.  
- Applications can either:
  - Create new accounts, or  
  - Reuse existing identities from external providers.  
- **Progressive profiling** enables building richer profiles without overwhelming users upfront.  
- **Validation** is crucial — especially for attributes like email addresses used for notifications.  
- **Identity strength matters**:
  - **Weak identities**: based on unvalidated or easily forged information.  
  - **Strong identities**: validated, secure, and issued by trusted authorities.  
- Identity providers should be chosen based on the **strength of identity validation required**.  
- Application design should decouple and assign user attributes appropriately:
  - **Login identifiers**  
  - **Display attributes**  
  - **Notification channels**  
  - **Internal tracking**  

