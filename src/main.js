import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';

// import global styles from project root
import '../styles.css';
import '../reset.css';

createApp(App)
    .use(router)
    .use(
        createAuth0({
            domain: "dev-bscikzimgp8254nw.us.auth0.com",
            clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
            authorizationParams: {
            redirect_uri: window.location.origin
            }
        })
    )
    .mount('#app');
