// Grants management
let grants = [];
const grantsList = document.getElementById('grants-list');

function renderGrants() {
  grantsList.innerHTML = '';
  grants.forEach((grant, idx) => {
    const div = document.createElement('div');
    div.className = 'grant';
    div.innerHTML = `
      <div>
        <strong>${grant.identifier}</strong>
        <button class="btn-close btn-close-sm float-end" onclick="removeGrant(${idx})"></button>
      </div>
      <div>${grant.permissions.map(p => `<span class="badge bg-secondary">${p}</span>`).join('')}</div>
    `;
    grantsList.appendChild(div);
  });
}

function removeGrant(idx) {
  grants.splice(idx, 1);
  renderGrants();
}

document.getElementById('add-grant-form').addEventListener('submit', e => {
  e.preventDefault();
  const identifier = document.getElementById('grant-identifier').value;
  const permissions = Array.from(document.querySelectorAll('#add-grant-form input[name="permissions"]:checked')).map(cb => cb.value);
  if (!identifier || permissions.length === 0) return alert('Provide identifier and permissions.');
  grants.push({ identifier, permissions });
  renderGrants();
  e.target.reset();
});
