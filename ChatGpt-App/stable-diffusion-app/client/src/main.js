import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

import router from './router';
app.use(router);

import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "/node_modules/primeflex/primeflex.css";
app.use(PrimeVue);

app.mount('#app')
