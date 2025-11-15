<template>
  <main class="auth-shell">
    <section class="card" aria-live="polite">
      <header class="card__header">
        <h1 class="card__title">Welcome back</h1>
        <p class="card__subtitle">Sign in to access your account.</p>
      </header>

      <div id="status" class="status status--hidden" role="status"></div>

      <div id="user-block" class="user user--hidden">
        <img id="user-picture" class="user__avatar" alt="" />
        <div class="user__meta">
          <div id="user-name" class="user__name"></div>
          <div id="user-email" class="user__email"></div>
        </div>
      </div>

      <div class="actions">
        <button id="btn-login" class="btn btn--primary">Sign in</button>
        <button id="btn-signup" class="btn btn--ghost">Create account</button>

        <button id="btn-dashboard" class="btn btn--primary btn--hidden">Go to app</button>
        <button id="btn-logout" class="btn btn--ghost btn--hidden">Sign out</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import '/pages/auth/auth.css';

async function getSession() {
  const res = await fetch('/api/user', { credentials: 'include' });
  return res.json();
}

function wireLoginButton() {
  document.querySelector('#btn-login')?.addEventListener('click', async () => {
    const session = await getSession();
    // eslint-disable-next-line no-console
    console.log('Session data:', session);
    if (session.isAuthenticated) {
      // eslint-disable-next-line no-console
      console.log('User is already authenticated:', session.user);
    } else {
      window.location.href = '/auth/login?returnTo=' + encodeURIComponent('/auth');
    }
  });
}

async function checkAuth() {
  try {
    wireLoginButton();
    const res = await fetch('/api/user', { credentials: 'include' });
    // eslint-disable-next-line no-console
    console.log('response, ', res);
    const data = await res.json();
    // eslint-disable-next-line no-console
    console.log('data', data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Auth check failed:', err);
  }
}

onMounted(() => {
  checkAuth();
});
</script>

<style scoped>
/* minimal spacing to account for fixed nav */
.auth-shell { padding-top: 60px; }
</style>
