// Import three.js library files FIRST to ensure they execute and set up globals before anything else
import '../lib/three.js';
import '../lib/perlin.js';
import '../lib/OrbitControls.js';

// Suppress Three.js multiple instance warning (AttractionCursor from CDN includes its own Three.js)
if (typeof THREE !== 'undefined') {
  THREE.REVISION = undefined;
}

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';

// import global styles from project root
import '@/styles.css';
import '@/reset.css';

createApp(App)
    .use(router)
    .use(
        createAuth0({
            domain: "dev-bscikzimgp8254nw.us.auth0.com",
            clientId: "PXUwz6fKHgsaNUQy36Uy6Zj1Sn7XlRdQ",
            authorizationParams: {
                redirect_uri: window.location.origin
            },
            cacheLocation: 'localstorage',
            useRefreshTokens: true
        })
    )
    .mount('#app');
