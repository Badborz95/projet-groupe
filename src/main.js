import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap (CSS + icons + JS)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Initialisation Firebase (déjà configuré dans ./firebase/index.js)
import './firebase';

const app = createApp(App);
app.use(router);
app.mount('#app');
