<template>
  <main class="profile-shell">
    <section class="profile-card" v-if="isAuthenticated">
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

    <section class="profile-card" v-else>
      <p>You are not logged in. Please log in to view your profile.</p>
      <button @click="handleLogin" class="btn-login">Log In</button>
    </section>
  </main>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

const handleLogin = () => {
  loginWithRedirect();
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
</script>

<style scoped>

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

.btn-logout,
.btn-login {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
}

.btn-logout:hover {
  background-color: #c82333;
}

.btn-login {
  background-color: #007bff;
  color: white;
}

.btn-login:hover {
  background-color: #0056b3;
}
</style>
