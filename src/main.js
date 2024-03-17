import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowUp);

const app = createApp(App);

app.use(router);
app.use(store);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');