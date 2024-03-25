import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faBuilding, faBars, faTimes, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useVuelidate } from '@vuelidate/core'
import { formatDate } from './filters/filters';

library.add([faArrowUp, faBuilding, faBars, faTimes, faRightFromBracket]);

const app = createApp(App);

app.config.globalProperties.$v = useVuelidate();

app.config.globalProperties.$filters = {
    formatDate
};
  
app.use(router);
app.use(store);

app.component('font-awesome-icon', FontAwesomeIcon);


app.mount('#app');
