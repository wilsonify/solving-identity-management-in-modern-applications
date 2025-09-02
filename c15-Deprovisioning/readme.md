# Deprovisioning

## What is Deprovisioning?
**Deprovisioning** is the final stage in the lifecycle of an identity, where an account and its associated attributes are **deleted or disabled** so they can no longer be used to access protected resources.  

This process ensures that when a relationship with a user ends—whether a customer, student, or employee—the account is properly secured and removed in compliance with organizational, legal, and privacy requirements.

---

## Why Accounts Are Terminated
Accounts may be deprovisioned for various reasons:  
- **User-initiated:** A customer chooses to delete their account.  
- **Administrator-initiated:** An abandoned or abusive account is removed.  
- **Business rules:**  
  - Subscription service: user stops paying.  
  - University: student graduates.  
  - Enterprise: employee leaves the company.  

Regardless of the reason, the account must be disabled so it cannot be used again.

---

## Key Design Considerations
- **Disable vs. Delete:** Sometimes disabling an account (soft delete) is preferable to outright deletion, reducing the risk of accidental loss.  
- **Identifier preservation:** Old account identifiers should not be reassigned to new users.  
- **Audit and retention:** Certain identity data must be retained for legal, regulatory, or security audit purposes.  
- **Secure deletion:** Sensitive information may require certified deletion procedures to prevent recovery.  
- **Data portability:** Customers may need the ability to download their data before termination.  
- **Reprovisioning:** Define policies for whether accounts can be reinstated, and under what process.  

---

## Best Practices
- Automate deprovisioning where possible.  
- Perform regular **account reviews** to detect inactive or unnecessary accounts.  
- Develop **data retention policies** with legal and privacy experts.  
- Offer **certificates of deletion** or evidence of secure removal when required.  

---

## Key Points
- Deprovisioning ensures accounts and identity attributes can no longer be used.  
- Can be initiated by either the **account owner** or the **service provider**.  
- Use automation and reviews to identify unused accounts.  
- Soft delete reduces risk of accidental removals.  
- Reserve identifiers from deprovisioned accounts to prevent reuse.  
- Define data retention, secure delete, and reprovisioning policies.  
- Provide users with options for data export before deletion.  
