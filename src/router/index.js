import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/auth';
import Login from '@/components/auth/Login.vue';
import Signup from '@/components/auth/Signup.vue';
import Main from '@/components/pages/Main.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/dashboard', component: Main, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.isAuthenticated; 
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
