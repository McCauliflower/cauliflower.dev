<template>
  <header>
    <nav id="cssmenu">
      <div class="logo">
        <a href="#" @click.prevent="go('/')">
          <img width="50" src="/assets/images/Cauliflower.png" alt="Cauliflower Logo" />
        </a>
      </div>
      <ul>
        <li><a href="#" id="one" @click.prevent="go('/art')">Art</a></li>
        <li><a href="#" id="two" @click.prevent="go('/code')">Code</a></li>
      </ul>
    </nav>
    <div id="login">
      <ul>
        <li>
          <a href="#" id="three" :class="{ authenticated: isValidSession }" @click.prevent="go('/auth')">{{ (isValidSession) ? 'PROFILE' : 'LOGIN' }}</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref, onMounted, computed } from 'vue';

const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
const router = useRouter();
const sessionNotExpired = ref(true);

const isValidSession = computed(() => {
  return isAuthenticated.value && sessionNotExpired.value;
});

onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      await getAccessTokenSilently();
    } catch (error) {
      sessionNotExpired.value = false;
      await logout({ logoutParams: { returnTo: window.location.origin } });
    }
  }
});

function go(path) {
  router.push(path);
}
</script>

<style scoped>
/* nav-menu styles (scoped) */
.logo{
  position: fixed;
  top: 0;
  left: 6px;
  transition: all 0.3s ease;
}
.logo:hover{
  transform: rotate(360deg);
}
#cssmenu {
  font-family: 'Iceberg', Arial, sans-serif;
  z-index: 2;
  width: 100%;
  position: fixed !important;
  top: 0;
  min-width: 240px;
  width: 100%;
  line-height: 1;
  height: 46px;
  background: white;
  box-shadow: 3px 4px 6px 6px lightgrey;
}

#cssmenu ul li {
  min-width: 120px;
  margin-left: auto;
  margin-right: auto;
}
#cssmenu ul {
  text-align: center;
  margin: 0 auto;
  padding: 0;
  border: 0;
  list-style: none;
  line-height: 1;
  display: block;
  position: relative;
  margin-left: calc(50% - 120px) !important;
  z-index: 2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
#cssmenu>ul>li {
  float: left;
  perspective: 1000px;
}
#cssmenu>ul>li>a {
  display: block;
  border: none;
  box-sizing: border-box;
  padding: 16px 20px;
  font-size: 12pt;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all .3s;
  transform-origin: 50% 0;
  transform-style: preserve-3d;
  background: rgb(226, 217, 217);
  color: rgb(126, 117, 117);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid white;
  height: 46px;
}
#cssmenu:after,
#cssmenu>ul:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}
#cssmenu>ul>li:hover>a,
#cssmenu>ul>li>a:hover {
  color: #8C8479;
  transform: rotateX(90deg) translateY(-23px);
  position: relative;
}
#cssmenu>ul>li>a::before {
  position: absolute;
  top: 100%;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  color: #8C8479;
  content: attr(data-title);
  transition: background .2s;
  transform: rotateX(-90deg);
  transform-origin: 50% 0;
}
#cssmenu>ul>li>a[id="one"]::before {
  content: "ART";
}
#cssmenu>ul>li>a[id="two"]::before {
  content: "CODE";
}
#cssmenu>ul>li:hover>a::before,
#cssmenu>ul>li>a:hover::before {
  background: rgb(153, 153, 153);
  color: #ebe2d6;
}
#cssmenu:after,
#cssmenu>ul>li>ul:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}

#login {
  font-family: 'Iceberg', Arial, sans-serif;
  position: absolute;
  right: 0;
  top: 0;
}

#login ul {
  text-align: center;
  margin: 0 auto;
  padding: 0;
  border: 0;
  list-style: none;
  line-height: 1;
  position: absolute;
  right: 0;
  z-index: 2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
#login>ul>li {
  perspective: 1000px;
}
#login>ul>li>a {
  display: block;
  border: none;
  box-sizing: border-box;
  padding: 16px 20px;
  font-size: 12pt;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all .3s;
  transform-origin: 50% 0;
  transform-style: preserve-3d;
  background: rgb(226, 217, 217);
  color: rgb(126, 117, 117);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid white;
  height: 46px;
}
#login:after,
#login>ul:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}
#login>ul>li:hover>a,
#login>ul>li>a:hover {
  color: #8C8479;
  transform: rotateX(90deg) translateY(-23px);
  position: relative;
}
#login>ul>li>a::before {
  position: absolute;
  top: 100%;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  color: #8C8479;
  content: attr(data-title);
  transition: background .2s;
  transform: rotateX(-90deg);
  transform-origin: 50% 0;
}
#login>ul>li>a[id="three"]::before {
  content: "LOGIN";
}
#login>ul>li>a[id="three"].authenticated::before {
  content: "PROFILE";
}
</style>
