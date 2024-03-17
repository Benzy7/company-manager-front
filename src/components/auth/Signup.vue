<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center mb-4">
              Créer un compte
            </h2>
            <form @submit.prevent="signupUser">
              <div class="mb-3">
                <label for="username" class="form-label">Nom d'utilisateur</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="name" v-model="name" required>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Nom</label>
                <input type="text" class="form-control" id="lastName" v-model="lastName" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary w-100">
                  S'inscrire
                </button>
              </div>
              <div class="text-center">
                <p class="mb-0">
                  Vous avez déjà un compte? 
                  <router-link to="/login" class="">
                    Se connecter
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
import apiClient from "../../services/api";

export default {
  data() {
    return {
      username: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async signupUser() {
      try {
        const response = await apiClient.post("/auth/users/", {
          username: this.username,
          first_name: this.name,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
