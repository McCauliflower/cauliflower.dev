<template>
  <main class="auth-shell">
    <section v-if="!isAuthenticated" class="card" aria-live="polite">
      <header class="card__header">
        <h1 class="card__title">Welcome back</h1>
        <p class="card__subtitle">Sign in to access your account.</p>
      </header>
      <div>
        <button @click="handleLogin">Log in</button>
      </div>
    </section>
    <section v-if="isAuthenticated" class="profile-card">
      <header class="profile-header">
        <img v-if="user.picture" :src="user.picture" :alt="user.name" class="profile-avatar" />
        <div class="profile-info">
          <h1>{{ user.name }}</h1>
          <p class="profile-email">{{ user.email }}</p>
        </div>
      </header>

      <div class="profile-details">
        <div class="detail-group">
          <h2>Profile Information</h2>
          <dl>
            <dt>Email:</dt>
            <dd>{{ user.email }}</dd>
            <dt>Email Verified:</dt>
            <dd>{{ user.email_verified ? 'Yes' : 'No' }}</dd>
            <dt>Last Updated:</dt>
            <dd>{{ formatDate(user.updated_at) }}</dd>
          </dl>
        </div>

        <div class="detail-group" v-if="user.identities && user.identities.length">
          <h2>Connected Identities</h2>
          <ul>
            <li v-for="identity in user.identities" :key="identity.provider">
              {{ identity.provider }}
            </li>
          </ul>
        </div>
      </div>

      <div class="profile-actions">
        <button @click="handleLogout" class="btn-logout">Log Out</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { logout } = useAuth0();
const { loginWithRedirect, user, isAuthenticated } = useAuth0();

const handleLogin = () => {
  loginWithRedirect({
    appState: { target: '/auth' }
  });
};

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

onMounted(() => {
});
</script>

<style scoped>
/* minimal spacing to account for fixed nav */
.auth-shell { 
  padding-top: 60px; 
}

.auth-shell .card{
  position: relative;
}

.auth-shell .profile-card{
  position: relative;
}

.profile-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
}

.profile-info h1 {
  margin: 0 0 5px 0;
  font-size: 24px;
  color: #333;
}

.profile-email {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.profile-details {
  margin-bottom: 30px;
}

.detail-group {
  margin-bottom: 25px;
}

.detail-group h2 {
  font-size: 16px;
  margin: 0 0 12px 0;
  color: #333;
  font-weight: 600;
}

.detail-group dl {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 12px;
  margin: 0;
}

.detail-group dt {
  font-weight: 600;
  color: #555;
}

.detail-group dd {
  margin: 0;
  color: #666;
}

.detail-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.detail-group li {
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  color: #555;
}

.profile-actions {
  display: flex;
  gap: 10px;
}
.card{
  padding: 2rem;
  color: black;
  margin-top: 10vh;
}
.card h1{
  color: black;
}
</style>
