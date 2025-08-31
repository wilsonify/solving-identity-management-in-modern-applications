/**
 * Returns matching claim from the access token payload to test against
 *
 * @param {Object} accessTokenPayload - contents from AT
 * @param {string} identifier - identifier to test against
 */
function getQualifyingClaim(accessTokenPayload, identifier) {
  // Use OIDC claims
  if (identifier === 'sub' || identifier === accessTokenPayload.sub) {
    return accessTokenPayload.sub;
  }
  if (identifier.startsWith('@')) {
    return accessTokenPayload.teamId;
  }

  if (identifier.includes('@')) {
    return accessTokenPayload.email;
  }
  // You can add other OIDC claims like 'groups' or 'roles'
  if (accessTokenPayload.roles && accessTokenPayload.roles.includes(identifier)) {
    return identifier;
  }
  if (accessTokenPayload.groups && accessTokenPayload.groups.includes(identifier)) {
    return identifier;
  }
}

/**
 * Determine if user has a grant allowing the action
 * generic method in order for ABAC, this is false by default.
 * if we cannot determine the permissions, then access is not granted.
 */
export function getQualifyingGrantToPerform(accessTokenPayload, grants, action) {
  for (const grant of grants) {
    const { identifier, permissions } = grant;

    if (identifier === 'anonymous') return true;

    const testIdentifier = getQualifyingClaim(accessTokenPayload, identifier);
    if (testIdentifier === identifier) {
      if (canPerformAction(permissions, action)) return grant;
    }
  }

  return null;
}

/**
 * Helper to determine given a permissions array if said action can be performed
 * @param {permissions: "read"|"write"|"share"|"owner"[]} permissions
 * @param {"read"|"write"} action
 */
function canPerformAction(permissions, action) {
  // owners can perform all actions
  if (permissions.includes('owner')) return true;
  // owner is allowed to share
  if (action !== 'share') return permissions.includes(action);
  return false;
}

/**
 * Determine if user can grant certain permissions
 * ABAC, false by default.
 * @param {{userId: String, teamId: String}} accessTokenPayload Access Token Payload
 * @param {{identifier: String, permissions: "read"|"write"|"share"|"owner"[]}[]} grants Permissions Object
 * @param {"read"|"write"|"share"[]} permissionsToGrant - Which permissions are being granted
 * @returns {boolean} result

 */
export function getQualifyingGrantToGrant(accessTokenPayload, grants, permissionsToGrant) {
  for (const grant of grants) {
    const { identifier, permissions } = grant;
    if (identifier === 'anonymous') continue;

    const testIdentifier = getQualifyingClaim(accessTokenPayload, identifier);
    if (testIdentifier === identifier) {
      if (canGrantPermissions(permissions, permissionsToGrant)) return grant;
    }
  }
  return null;
}

/**
 * Helper given a permissions array, determine if action can be performed
 * @param {permissions: "read"|"write"|"share"|"owner"[]} permissionsOwned
 * @param {"read"|"write"|"share"[]} permissionsToGrant
 */
function canGrantPermissions(permissionsOwned, permissionsToGrant) {
  // owners can grant all permissions
  if (permissionsOwned.includes('owner')) return true;
  // If you have the share permission you can grant read|write to other users, but not share
  if (!permissionsToGrant.includes('share') && permissionsOwned.includes('share')) {
    return true;
  }

  return false;
}
