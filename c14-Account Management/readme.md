# Account Management and Identity Updates

## Why Identity Information Changes
Contrary to the idea that people rarely change, **identity attributes change often**.  
Users may need to update personal details such as:
- Email address  
- Phone number  
- Street address  
- Name  

In addition, administrators or automated processes may update identity attributes like job role, department, or group membership, which often influence access control decisions.

---

## Privacy and Compliance
- Regulations such as **GDPR (Article 15)** require that users can **view and correct personal information**.  
- Applications must provide mechanisms for updating identity data, either directly or via the identity provider (IdP).  

---

## Where and How Updates Occur
- **Identity Provider (IdP):** Updates to attributes managed centrally (e.g., enterprise or social login providers).  
- **Application:** Updates to attributes collected or stored locally.  
- **Hybrid Model:** Some attributes are sourced from the IdP, while others are managed by the application itself.  

For such cases, it must be **clear to users and administrators where updates should be made**.

---

## Synchronization and Caching
- Applications often cache profile attributes from the IdP.  
- Cached data can become stale if the IdP data changes and users do not log in frequently.  
- Options to keep data fresh:  
  - Query IdP APIs for updated attributes.  
  - Periodic synchronization.  
  - Use of standards like **SCIM (System for Cross-domain Identity Management)** for cross-domain synchronization.  

---

## Identifier Changes
- If a user changes the **identifier** at their IdP (e.g., username or email), the application may lose the mapping to the existing account.  
- Solutions include:  
  - Using **stable internal identifiers** from the IdP that never change.  
  - Implementing **explicit account linking** so users can reconnect old and new identifiers.  

---

## Credentials and Recovery
- Credentials must sometimes be **reset** (e.g., when forgotten, compromised, or expired).  
- Credential reset and recovery can be **delegated to an IdP**, but:  
  - Applications should validate the integrity of the IdP’s reset mechanisms.  
  - Exceptional cases like account takeover may require application-level intervention.  

---

## Key Points
- Identity attributes change over time and must be updatable.  
- Privacy regulations mandate that users can **view and correct their data**.  
- Applications should direct updates to the right place (IdP or application).  
- Changing a user’s IdP identifier can disrupt account access unless mitigated.  
- SCIM provides a standard for synchronizing identity updates across systems.  
- Credential resets and recovery should be secure, validated, and occasionally involve the application owner.  
