Authorization and Access Policy Enforcement
====

This document is a quick reference to understand 
how authorization and access policy enforcement work in SAML2.

# Core Concepts

Authorization

Definition: Granting privileges to access protected resources.

# Scope: 

Applies to both:

Users (what a person can do in the application)

Applications (what an app can request from an API)

# Access Policy Enforcement

Definition: The runtime check when a resource is 
requested to confirm the requestor has the necessary privileges.

## Example:

A user tries to view admin settings → system checks if their token includes the admin role.

An app requests /payments API → system checks if its access token has the payments:read scope.

# User vs. Application Authorization

| Category     | 	Basis for Authorization                                                                       | 	Delivered In         |
|--------------|------------------------------------------------------------------------------------------------|-----------------------|
| User         | - Profile attributes | ID Token (claims)     | 
| Application  | - Scopes approved 	 | Access Token (scopes) | 

# Security Tokens

ID Token

Used for authentication and user identity.

Contains claims about the user (e.g., sub, email, groups).

Access Token

Used for API authorization.

Contains scopes (what the app is allowed to do).

Applications and APIs consume these tokens to decide whether to allow or deny requests.


Levels of Enforcement

Authorization and access policies can be enforced at multiple layers:

Application UI – what buttons/menus a user sees.

Application backend – business logic checks before performing an action.

API Gateway / Service Mesh – blocking unauthorized API calls before they reach backend services.

Key Points (Quick Recap)

Authorization = granting privileges.

Access policy enforcement = validating privileges at request time.

Both users and applications are subject to these checks.

Claims and scopes in tokens drive enforcement decisions.

Policies can be enforced at multiple layers in the stack.

Would you like me to also add a Mermaid diagram to visually show how an ID Token vs. Access Token flows into authorization checks for both users and applications? That could make this README even more “at a glance” friendly.