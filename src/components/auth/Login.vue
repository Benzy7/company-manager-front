<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <h2 class="text-center mb-4">
                            Connexion
                        </h2>
                        <h6>
                            Bonjour, bienvenue 👋
                        </h6>
                        <div class="mb-3">
                            <button @click="loginWithGoogle" class="btn btn-google w-100">
                                <img src="https://img.icons8.com/color/16/000000/google-logo.png">
                                Se connecter avec Google
                            </button>
                        </div>
                        <div class="separator">
                            <hr>
                            <p class="separator-text">
                                ou Se connecter avec l'email
                            </p>
                            <hr>
                        </div>
                        <form @submit.prevent="loginUser">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="email">
                                <!-- <div v-if="!$v.email.required" class="text-danger">Email is required.</div>
                                <div v-else-if="!$v.email.email" class="text-danger">Invalid email format.</div> -->
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Mot de passe</label>
                                <input type="password" class="form-control" id="password" v-model="password">
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="rememberMe"
                                        v-model="rememberMe">
                                    <label class="form-check-label" for="rememberMe">Se souvenir de moi</label>
                                </div>
                                <a href="#" class="text-decoration-none">Mot de passe oublié?</a>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary w-100">
                                    Se connecter
                                </button>
                            </div>
                            <div class="text-center">
                                <p class="mb-0">
                                    Pas encore inscrit?
                                    <router-link to="/signup" class="">
                                        Créer un compte
                                        <font-awesome-icon :icon="['fas', 'arrow-up']" class="rotate-45" size="xs" />
                                    </router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import apiClient from '@/services/api';
import { required, email } from '@vuelidate/validators';

export default {
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
        };
    },
    validations() {
        return {
            email: { required, email },
            password: { required },
        };
    },
    methods: {
        ...mapActions('auth', ['login']),
        async loginUser() {
            try {
                console.log(this.$v);
                console.log(this.$v.email); 
                if (this.$v.$invalid) {
                    return;
                }
                const response = await apiClient.post('/auth/login/', {
                    email: this.email,
                    password: this.password,
                });
                const token = response.data.access;
                console.log(token);
                await this.login(token);
                this.$router.push('/dashboard/company');
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style>
.card {
    border: none !important;
}

.separator {
    display: flex;
    align-items: center;
}

.separator-text {
    margin: 0 10px;
}

.separator hr {
    flex-grow: 1;
    border: none;
    border-top: 1px solid #ccc;
}

.btn-google {
    color: #545454;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 1px #ddd;
}

.rotate-45 {
    transform: rotate(45deg);
}
</style>
