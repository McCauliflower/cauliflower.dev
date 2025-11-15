import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import global styles from project root
import '../styles.css';
import '../reset.css';

createApp(App).use(router).mount('#app');
