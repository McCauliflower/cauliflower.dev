// auth.js
import './auth.css'


async function getSession() {
  const res = await fetch('/api/user', { credentials: 'include' });
  return res.json();
}

function wireLoginButton() {
  document.querySelector('#btn-login')?.addEventListener('click', async () => {
    const session = await getSession();
    console.log('Session data:', session);
    if (session.isAuthenticated) {
      console.log('User is already authenticated:', session.user);
    } else {
      console.log('redirect to login')
      window.location.href = '/auth/login?returnTo=' + encodeURIComponent('/auth');
    }
  });
}

async function checkAuth() {
  try {
    wireLoginButton();
    const res = await fetch('/api/user', { credentials: 'include' });
    console.log('response, ', res);
    const data = await res.json();
    console.log('data', data);
  } catch (err) {
    console.error('Auth check failed:', err);
  }
}

checkAuth();
