<template>
    <div class="dashboard" v-if="isAuthenticated">
        <h1>Welcome to the Dashboard, {{ username }}!</h1>
        <!-- Add your dashboard content here -->
        <button @click="logoutUser">Logout</button>
    </div>
    <div class="login-prompt" v-else>
        <p>Please log in to access the dashboard.</p>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
        username() {
            // Example: Get username from Vuex state or API
            return this.$store.state.auth.username || 'Guest';
        },
    },
    methods: {
        ...mapActions('auth', ['logout']),
        logoutUser() {
            this.logout(); // Dispatch the logout action
            // Redirect to the login page
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.dashboard {
    padding: 20px;
    background-color: #f0f0f0;
}

.login-prompt {
    padding: 20px;
    background-color: #fff;
}
</style>